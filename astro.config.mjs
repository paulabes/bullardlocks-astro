// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { boroughs } from './src/data/locations.ts';

const siteUrl = 'https://www.bullardlocks.com';

const dynamicPages = [
  ...boroughs.flatMap(({ slug, services }) => [
    `${siteUrl}/locations/${slug}`,
    ...services.map(s => `${siteUrl}/locations/${slug}/${s}`),
  ]),
  `${siteUrl}/locations/uk-wide/safe-engineer`,
  `${siteUrl}/guides`,
  `${siteUrl}/guides/locksmith-cost-london`,
  `${siteUrl}/guides/lost-all-car-keys-what-to-do`,
  `${siteUrl}/guides/auto-locksmith-vs-dealer`,
  `${siteUrl}/guides/home-insurance-lock-requirements`,
  `${siteUrl}/guides/anti-snap-cylinders-explained`,
  `${siteUrl}/guides/what-to-do-after-burglary-london`,
];

import os from 'node:os';
import path from 'node:path';

// https://astro.build/config
export default defineConfig({
  vite: {
    cacheDir: path.join(os.tmpdir(), 'bullardlocks-vite'),
  },
  site: siteUrl,
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      customPages: dynamicPages,
      serialize(item) {
        const url = item.url;

        // Homepage
        if (url === `${siteUrl}/` || url === siteUrl) {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }

        // Main service pages
        if (url.match(/\/services\/(auto-locksmith|emergency-locksmith|safe-engineer)\/?$/)) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }

        // Services hub
        if (url === `${siteUrl}/services` || url === `${siteUrl}/services/`) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }

        // Borough index pages
        if (url.match(/\/locations\/[^/]+\/?$/) && !url.endsWith('/locations/') && !url.endsWith('/locations')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }

        // UK-wide safe engineer page
        if (url.includes('/locations/uk-wide/safe-engineer')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }

        // Borough + service combo pages
        if (url.match(/\/locations\/[^/]+\/[^/]+\/?$/)) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }

        // Locations hub
        if (url === `${siteUrl}/locations` || url === `${siteUrl}/locations/`) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }

        // Guides hub
        if (url === `${siteUrl}/guides` || url === `${siteUrl}/guides/`) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }

        // Individual guide articles
        if (url.match(/\/guides\/[^/]+\/?$/)) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }

        // About, contact, reviews
        if (url.includes('/about') || url.includes('/contact') || url.endsWith('/reviews')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }

        // Default for all other pages
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },
    }),
  ],
  redirects: {
    '/index.html': '/',
    '/about.html': '/about',
    '/services.html': '/services',
    '/contact.html': '/contact',
    '/locations.html': '/locations',
    '/privacy-policy.html': '/privacy-policy',
    '/services/emergency-locksmith.html': '/services/emergency-locksmith',
    '/services/auto-locksmith.html': '/services/auto-locksmith',
    '/services/safe-engineer.html': '/services/safe-engineer',
  },
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  trailingSlash: 'never',
  server: { port: 3000 }
});
