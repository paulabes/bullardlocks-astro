# Bullard Locks — Astro Website

Professional locksmith website for **Bullard Locks** (bullardlocks.com), built with Astro v5 and deployed on Vercel.

## About

Bullard Locks is an independent locksmith service based in Crouch End, North London (N8 9TA), run by William Bullard. The site covers three core services:

- **Auto Locksmith** — Car key replacement, programming & vehicle lockout (North & Central London)
- **Emergency Locksmith** — 24/7 lockout, break-in repair & lock changes (North London)
- **Safe Engineer** — Safe opening, installation & repair (UK-wide by appointment)

## Tech Stack

- **Framework:** Astro v5 (SSR mode)
- **Adapter:** Vercel with Web Analytics
- **Chatbot:** Gemini 1.5 Flash API
- **Email:** Resend API
- **Vehicle Lookup:** DVLA Vehicle Enquiry API
- **Sitemap:** @astrojs/sitemap
- **React:** @astrojs/react (for interactive components)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key          # Required — AI chatbot (aistudio.google.com)
RESEND_API_KEY=re_xxxxxxxxxxxxx             # Required — email delivery (resend.com)
DVLA_API_KEY=your_dvla_api_key              # Optional — vehicle registration lookup
PUBLIC_SITE_URL=https://bullardlocks.com    # Site URL
```

## Project Structure

```
src/
├── components/       # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ChatWidget.astro     # AI chatbot widget
│   ├── CTASection.astro
│   ├── GoogleReviews.astro
│   ├── PageHero.astro
│   ├── ServiceCard.astro
│   └── ServiceCards.astro
├── data/
│   ├── locations.ts         # Borough & service data (10 boroughs x 3 services)
│   └── area-content.ts      # Localised content blocks per borough/service
├── layouts/
│   └── BaseLayout.astro     # Base HTML layout with SEO meta tags
├── pages/
│   ├── index.astro          # Homepage
│   ├── about.astro          # About William Bullard
│   ├── contact.astro        # Contact form with photo upload
│   ├── 404.astro            # Error page
│   ├── privacy-policy.astro
│   ├── terms.astro
│   ├── services/            # Service hub + detail pages
│   ├── locations/           # Location hub + dynamic borough/service pages
│   └── api/                 # Server endpoints (chat, email, DVLA)
├── styles/
│   ├── design-tokens.css    # CSS custom properties
│   └── global.css           # Global styles & utilities
public/
├── images/                  # Optimised WebP images
├── robots.txt
├── favicon.svg
└── site.webmanifest
```

## Key Features

- **AI Chatbot** — Gemini-powered lead qualification with DVLA vehicle lookup
- **30 location pages** — Dynamic borough x service combinations with unique content
- **Schema.org markup** — LocksmithBusiness, FAQPage, BreadcrumbList, Service schemas
- **Form validation** — Client-side + server-side with spam/profanity/gibberish detection
- **Photo upload** — Drag & drop on contact form, sent as email attachments via Resend
- **Service matrix** — Interactive borough x service availability grid

## Deployment

The site deploys automatically to Vercel. Ensure all environment variables are set in the Vercel project settings.

## Contact

- **Business:** William Bullard — 07809 887 883
- **Development:** Paul — paul@crouchendmedia.co.uk
