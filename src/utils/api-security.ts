/**
 * Shared API security utilities: rate limiting and origin validation
 */

// --- Rate Limiting (in-memory, per-IP) ---

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 60_000);

/**
 * Check if a request is within its rate limit.
 * Returns null if allowed, or a Response if blocked.
 */
export function checkRateLimit(
  request: Request,
  { maxRequests = 10, windowMs = 60_000, prefix = 'global' } = {}
): Response | null {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const key = `${prefix}:${ip}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count++;

  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again shortly.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
        },
      }
    );
  }

  return null;
}

// --- Origin / CSRF Validation ---

const ALLOWED_ORIGINS = [
  'https://bullardlocks.com',
  'https://www.bullardlocks.com',
];

// In development, also allow localhost
if (import.meta.env.DEV) {
  ALLOWED_ORIGINS.push('http://localhost:3000', 'http://localhost:4321');
}

/**
 * Validate that the request originated from our own site.
 * Returns null if valid, or a Response if rejected.
 */
export function checkOrigin(request: Request): Response | null {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // At least one must be present
  if (!origin && !referer) {
    return new Response(
      JSON.stringify({ error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check origin header first (most reliable)
  if (origin) {
    if (ALLOWED_ORIGINS.some(allowed => origin === allowed)) {
      return null;
    }
    return new Response(
      JSON.stringify({ error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Fall back to referer
  if (referer) {
    if (ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed))) {
      return null;
    }
    return new Response(
      JSON.stringify({ error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return null;
}
