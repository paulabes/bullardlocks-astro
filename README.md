# Bullard Locks — Astro Website

Professional locksmith website for **Bullard Locks** (bullardlocks.com), built with Astro 6 SSR and deployed on Vercel.

## About

Bullard Locks is an independent locksmith service based in Crouch End, North London (N8 9TA), run by William Bullard. The site covers three core services:

- **Auto Locksmith** — Car key replacement, programming & vehicle lockout (10 London boroughs)
- **Emergency Locksmith** — 24/7 lockout, break-in repair & lock changes (North London only)
- **Safe Engineer** — Safe opening, installation & repair (UK-wide by appointment)

## Tech stack

- **Framework**: Astro 6 (SSR) on `@astrojs/vercel` v10
- **Hosting**: Vercel with Speed Insights and Web Analytics
- **Chatbot**: Google Gemini 2.5 Flash + DVLA Vehicle Enquiry API
- **Email**: Resend (transactional, supports up to 5 photo attachments at 10MB each)
- **SEO**: `@astrojs/sitemap` with priority serializer + IndexNow ping

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in keys (file does not exist — create from the table below)
npm run dev                  # http://localhost:3000
npm run build                # production build to dist/
npm run preview              # serve production build locally
npm run indexnow             # ping Bing/Yandex/Naver/Seznam after a deploy
```

## Environment variables

Create a `.env.local` file (or set in Vercel dashboard).

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | yes | Chatbot AI — aistudio.google.com |
| `RESEND_API_KEY` | yes | Email sender — resend.com |
| `DVLA_API_KEY` | optional | Vehicle reg lookup. Without it, the chat falls back to manual make/model |
| `PUBLIC_SITE_URL` | yes | `https://www.bullardlocks.com` |

Never commit any `.env*` file — covered by `.gitignore`.

## Project structure

```
src/
├── components/      # Header, Footer, ChatWidget, GoogleReviews, ServiceCard(s),
│                    # CTASection, MobileBottomCTA, CookieConsent, AuthorBio,
│                    # PageHero, TrustCredentials, HighlightsBar, GuidesSidebar
├── data/            # locations.ts (10 boroughs × services + FAQs)
│                    # area-content.ts (per-borough copy)
│                    # borough-geo.ts (polygon coords)
│                    # guides.ts (guide list shared by hub + sidebar)
├── layouts/         # BaseLayout.astro (only layout, auto-injects WebPage schema)
├── pages/
│   ├── api/         # chat.ts (Gemini), send-email.ts (Resend), dvla-lookup.ts
│   ├── services/    # 3 service detail pages + /services hub
│   ├── locations/[borough]/        # 10 borough hubs + 28 borough×service combos
│   ├── locations/uk-wide/          # UK-wide safe engineer
│   ├── guides/                     # 6 long-form guides + /guides hub
│   └── index, about, contact, reviews, privacy-policy, terms, 404
├── styles/          # design-tokens.css, global.css
└── utils/           # api-security.ts (per-IP rate limit + origin check)
public/
├── ad21e825…txt     # IndexNow ownership-proof key file
├── robots.txt
├── site.webmanifest
└── images/
scripts/
└── indexnow-ping.mjs
```

## SEO

- Unique meta title (50–60 chars) and description (150–160 chars) per page
- Schema.org: `LocksmithBusiness`, `Service`, `FAQPage` with `speakable`, `BreadcrumbList`, `HowTo`, `Article`, `Review`, `Person`, `Place` — all wired
- Hreflang `en-GB` + `x-default`
- OG + Twitter card images per service type
- Auto-generated sitemap at `/sitemap-index.xml`
- Canonical URLs on every page (borough × safe-engineer canonicalises to `/services/safe-engineer`)
- IndexNow pings Bing, Yandex, Naver, Seznam after deploys

## Key features

- **AI chatbot** — Gemini-powered lead capture with DVLA vehicle lookup, coverage verification, photo upload prompts
- **~50 pages** — 10 boroughs × 3 services with unique borough-specific content, FAQs, schema
- **Email pipeline** — contact form, callback form, chatbot leads → Resend → William's inbox
- **Photo upload** — drag/drop on contact form, max 5 × 10MB, sent as Resend attachments
- **Spam protection** — server-side validation, profanity filtering, gibberish detection, per-IP rate limit, origin check
- **Reviews marquee** — 6 latest verified Google reviews on every page, slow auto-scroll, pause on hover, respects `prefers-reduced-motion`
- **Cookie consent** — banner with privacy policy link
- **AbortController timeouts** on every upstream fetch (Gemini 15s, DVLA 8s, Resend 15s) with graceful fallbacks

## Deployment

1. Push to `main` — Vercel builds and deploys automatically.
2. After production deploy: `npm run indexnow` to ping Bing/Yandex/Naver/Seznam (Google reads the sitemap directly).
3. Verify `bullardlocks.com` is still authenticated in resend.com/domains for outbound mail.

## Known limitations

- **3 high-severity `path-to-regexp` advisories** flagged by `npm audit` come via `@astrojs/vercel → @vercel/routing-utils`. No clean v10.x patch is available yet; risk accepted, monitor `npm audit` periodically.
- **Rate limit is per-instance memory** (in `src/utils/api-security.ts`). Fine at current traffic; swap to Upstash Redis or Vercel KV if cross-instance limiting becomes necessary.
- **CSP includes `script-src 'unsafe-inline'`** in `vercel.json`. Required because Astro emits inline hydration / view-transition / Speed Insights scripts during SSR. Tightening this to a nonce-based CSP would mean moving CSP injection into Astro middleware and propagating a per-request nonce to every inline script — a half-day of work that's not justified while the site has no user-generated HTML rendering surface. Revisit if a CMS, review submission, or comment system is added.

## Contact

- **Business**: William Bullard — 07809 887 883 — william@bullardlocks.com
- **Development**: Paul — paul@crouchendmedia.co.uk
