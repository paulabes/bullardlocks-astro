# Bullard Locks - Astro Website

Professional locksmith website for **Bullard Locks** (bullardlocks.com), built with Astro v5 and deployed on Vercel.

## About

Bullard Locks is an independent locksmith service based in Crouch End, North London (N8 9TA), run by William Bullard. The site covers three core services:

- **Auto Locksmith** - Car key replacement, programming & vehicle lockout (North & Central London)
- **Emergency Locksmith** - 24/7 lockout, break-in repair & lock changes (North London)
- **Safe Engineer** - Safe opening, installation & repair (UK-wide by appointment)

## Tech Stack

- **Framework:** Astro v5 (SSR mode)
- **Hosting:** Vercel with Web Analytics
- **Chatbot:** Gemini 2.5 Flash API
- **Email:** Resend API
- **Vehicle Lookup:** DVLA Vehicle Enquiry API
- **Sitemap:** @astrojs/sitemap (auto-generated)
- **React:** @astrojs/react (interactive components)

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and add your keys
cp .env.example .env.local

# Start dev server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env.local` file (or set in Vercel dashboard):

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | AI chatbot - get from aistudio.google.com |
| `RESEND_API_KEY` | Yes | Email delivery - get from resend.com |
| `DVLA_API_KEY` | No | Vehicle reg lookup for auto locksmith chatbot |
| `PUBLIC_SITE_URL` | Yes | Site URL (https://bullardlocks.com) |

## Project Structure

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ChatWidget.astro        # AI chatbot (Gemini + DVLA lookup)
│   ├── CTASection.astro
│   ├── CookieConsent.astro
│   ├── GoogleReviews.astro
│   ├── ServiceCard.astro
│   └── ServiceCards.astro
├── data/
│   ├── locations.ts            # 10 boroughs x 3 services
│   └── area-content.ts         # Localised content per borough/service
├── layouts/
│   └── BaseLayout.astro        # SEO meta, OG, Twitter cards, schema, hreflang
├── pages/
│   ├── index.astro             # Homepage
│   ├── about.astro
│   ├── contact.astro           # Contact form with photo upload
│   ├── services.astro          # Services hub
│   ├── locations.astro         # Locations hub
│   ├── 404.astro
│   ├── privacy-policy.astro
│   ├── terms.astro
│   ├── services/               # Auto locksmith, emergency, safe engineer
│   ├── locations/[borough]/    # Dynamic borough + service pages
│   └── api/                    # chat, send-email, dvla-lookup
└── styles/
    ├── design-tokens.css
    └── global.css
```

## SEO

- Unique meta titles (50-60 chars) and descriptions per page
- Schema.org: LocksmithBusiness, Service, FAQPage, BreadcrumbList
- Hreflang (en-GB + x-default)
- OG + Twitter card images per service type
- Auto-generated sitemap at /sitemap-index.xml
- Canonical URLs on all pages

## Key Features

- **AI Chatbot** - Gemini-powered lead capture with DVLA vehicle lookup, coverage verification, photo upload suggestions
- **~50 pages** - 10 boroughs x 3 services with unique content, FAQs, and schema
- **Email system** - Contact form, callback form, and chatbot leads via Resend (to william@bullardlocks.com)
- **Photo upload** - Drag & drop on contact form, sent as email attachments
- **Spam protection** - Server-side validation, profanity filtering, gibberish detection

## Deployment (Vercel)

1. Connect repo to Vercel
2. Set environment variables in Vercel project settings:
   - `GEMINI_API_KEY`
   - `RESEND_API_KEY`
   - `DVLA_API_KEY`
   - `PUBLIC_SITE_URL=https://bullardlocks.com`
3. Verify `bullardlocks.com` domain in Resend (resend.com/domains) for email sending
4. Deploy - builds automatically on push

## Contact

- **Business:** William Bullard - 07809 887 883
- **Development:** Paul - paul@crouchendmedia.co.uk
