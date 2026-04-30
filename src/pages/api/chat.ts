import type { APIRoute } from 'astro';
import { checkRateLimit, checkOrigin } from '../../utils/api-security';
import { SYSTEM_PROMPT } from '../../data/chat-system-prompt';

export const prerender = false;

// UK postcode patterns - full and partial (outcode only like N8, SW1, EC1)
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
const UK_OUTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?$/i;

// UK registration plate pattern - minimum 5 chars to avoid matching postcodes/outcodes
const REG_PLATE_REGEX = /\b([A-Z]{2}\d{2}\s?[A-Z]{3}|[A-Z]\d{1,3}\s?[A-Z]{3}|[A-Z]{3}\s?\d{1,3}[A-Z])\b/i;

async function lookupVehicle(registration: string): Promise<string | null> {
  const DVLA_API_KEY = import.meta.env.DVLA_API_KEY;
  if (!DVLA_API_KEY) return null;

  const cleanReg = registration.replace(/\s/g, '').toUpperCase();

  try {
    const res = await fetch('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', {
      method: 'POST',
      headers: {
        'x-api-key': DVLA_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ registrationNumber: cleanReg }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) return null;

    const v = await res.json();
    return `[DVLA VEHICLE DATA for ${cleanReg}] Make: ${v.make || 'Unknown'}, Colour: ${v.colour || 'Unknown'}, Year: ${v.yearOfManufacture || 'Unknown'}, Fuel: ${v.fuelType || 'Unknown'}, Engine: ${v.engineCapacity ? v.engineCapacity + 'cc' : 'Unknown'}, Tax: ${v.taxStatus || 'Unknown'}, MOT: ${v.motStatus || 'Unknown'}`;
  } catch {
    return null;
  }
}


// --- Validation helpers ---
const spamPatterns = [
  /\[url=/i,
  /\[link=/i,
  /<a\s+href/i,
  /viagra|cialis|casino|crypto|bitcoin|lottery|winner|congratulations.*won/i,
  /click here|buy now|act now|limited time|free money/i,
  /(.)\1{10,}/, // Repeated characters (aaaaaaaaaa)
  /\b(porn|xxx|nude|naked|sex\s*chat)\b/i,
  /make\s*money\s*fast|work\s*from\s*home\s*scam/i,
];

const profanityPatterns = [
  /\b(fu+ck|f+u+k|fuk|fck|fcuk|phuck|phuk)/i,
  /\b(sh[i1]+t|sh[i1]te|bullsh)/i,
  /\b(a+ss\s*ho+le|arsehole|arse)/i,
  /\b(bastard|wanker|tosser|bellend|prick|dick\s*head|twat|cunt)/i,
  /\b(bitch|slut|whore)/i,
  /\bfuck\s*(off|you|u|ya|this|that|ing)/i,
  /\bgo\s*f\s*yourself/i,
  /\bpi+ss\s*(off|ed)/i,
  /\bscrew\s*(you|u|ya|off)/i,
];

const profanityResponses = [
  "I'm here to help with locksmith enquiries - let's keep things friendly. What can I do for you?",
  "I'll be here when you're ready to chat properly. Need help with a lock, key, or safe?",
  "That's not quite the language William would approve of! I'm here to help with locksmith services whenever you're ready.",
  "Let's park that one. If you need a locksmith, I'm your bot. Otherwise, I hear fresh air works wonders.",
  "Right then. When you'd like to discuss locks, keys, or safes, I'm all ears. Well, all code - but you get the idea.",
];

function isKeyboardMash(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.includes(' ')) return false;
  const cleaned = trimmed.replace(/[^a-z]/gi, '').toLowerCase();
  if (cleaned.length < 6) return false;
  if (!/[aeiou]/i.test(cleaned)) return true;
  if (/^(.)\1+$/.test(cleaned)) return true;
  if (/^(.{1,3})\1{3,}$/.test(cleaned)) return true;
  if (cleaned.length >= 10) {
    const vowelRatio = (cleaned.match(/[aeiou]/gi) || []).length / cleaned.length;
    if (vowelRatio < 0.08) return true;
  }
  return false;
}

const mashResponses = [
  "Looks like the keyboard had a moment there. When it's feeling better, I'm here to help with locks and keys!",
  "I think your cat walked across the keyboard. Let me know if you need a locksmith!",
  "That's... creative. If you need help with a lock, key, or safe, just say the word.",
  "Not sure I caught that one. Try again - I'm here to help with locksmith services.",
];

function getRandomResponse(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)];
}

export const POST: APIRoute = async ({ request }) => {
  // Security: rate limit and origin check
  const rateLimited = checkRateLimit(request, { maxRequests: 15, windowMs: 60_000, prefix: 'chat' });
  if (rateLimited) return rateLimited;
  const originBlocked = checkOrigin(request);
  if (originBlocked) return originBlocked;

  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get latest user message for validation
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === 'user');
    const lastUserText = lastUserMsg?.content || '';

    // --- Chat message validation ---

    // Check message length
    if (lastUserText.length > 2000) {
      return new Response(
        JSON.stringify({ message: "That's quite a lot of text! Could you summarise what you need help with? I'm here for locks, keys, and safes." }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check conversation length
    if (messages.length > 60) {
      return new Response(
        JSON.stringify({ message: "We've had quite a thorough chat! For detailed discussions, it's best to call William directly on 07809 887 883 or use the contact form." }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for spam patterns
    for (const pattern of spamPatterns) {
      if (pattern.test(lastUserText)) {
        return new Response(
          JSON.stringify({ message: "I'm here to help with locksmith enquiries. How can I assist you with a lock, key, or safe today?" }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check for profanity
    if (profanityPatterns.some(p => p.test(lastUserText))) {
      return new Response(
        JSON.stringify({ message: getRandomResponse(profanityResponses) }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for keyboard mashing
    if (isKeyboardMash(lastUserText)) {
      return new Response(
        JSON.stringify({ message: getRandomResponse(mashResponses) }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- End validation ---

    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Chat service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check the latest user message for a registration plate
    let vehicleContext = '';

    if (lastUserMsg) {
      const regMatch = lastUserMsg.content.match(REG_PLATE_REGEX);
      if (regMatch) {
        // Don't send postcodes to DVLA - check for full or partial postcodes
        const fullText = lastUserMsg.content.trim();
        const matched = regMatch[0].trim();
        const isPostcode = UK_POSTCODE_REGEX.test(fullText) || UK_POSTCODE_REGEX.test(matched) || UK_OUTCODE_REGEX.test(fullText) || UK_OUTCODE_REGEX.test(matched);
        if (!isPostcode) {
          const dvlaResult = await lookupVehicle(regMatch[0]);
          if (dvlaResult) {
            vehicleContext = dvlaResult;
          }
        }
      }
    }

    // Build Gemini messages - inject vehicle data as a system-style context message if found
    const geminiContents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    if (vehicleContext) {
      // Insert vehicle data just before the last user message so Gemini sees it in context
      const lastIndex = geminiContents.length - 1;
      geminiContents.splice(lastIndex, 0, {
        role: 'model',
        parts: [{ text: vehicleContext }],
      });
    }

    let response: Response;
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: geminiContents,
            generationConfig: {
              maxOutputTokens: 400,
              temperature: 0.7,
              topP: 0.9,
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            ],
          }),
          signal: AbortSignal.timeout(15_000),
        }
      );
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === 'TimeoutError';
      console.error(aborted ? 'Gemini timeout' : 'Gemini fetch error', aborted ? '' : err);
      return new Response(
        JSON.stringify({ message: "I'm having trouble responding right now. For the fastest help, please call William directly on 07809 887 883." }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!response.ok) {
      const errorStatus = response.status;
      console.error('Gemini API error status:', errorStatus);
      return new Response(
        JSON.stringify({ error: 'Chat service unavailable' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I could not generate a response. Please call us directly on 07809 887 883.';

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
