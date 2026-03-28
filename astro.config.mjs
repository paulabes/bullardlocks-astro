// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { boroughs } from './src/data/locations.ts';

const siteUrl = 'https://bullardlocks.com';
const lastmod = new Date().toISOString();

const dynamicPages = boroughs.flatMap(({ slug, services }) => [
  `${siteUrl}/locations/${slug}`,
  ...services.map(s => `${siteUrl}/locations/${slug}/${s}`),
]);

import os from 'node:os';
import path from 'node:path';

// https://astro.build/config
export default defineConfig({
  vite: {
    cacheDir: path.join(os.tmpdir(), 'bullardlocks-vite'),
  },
  site: siteUrl,
  integrations: [
    sitemap({
      customPages: dynamicPages,
      serialize(item) {
        const url = item.url;

        // Homepage
        if (url === `${siteUrl}/` || url === siteUrl) {
          return { ...item, lastmod, priority: 1.0, changefreq: 'weekly' };
        }

        // Main service pages
        if (url.match(/\/services\/(auto-locksmith|emergency-locksmith|safe-engineer)\/?$/)) {
          return { ...item, lastmod, priority: 0.8, changefreq: 'monthly' };
        }

        // Services hub
        if (url === `${siteUrl}/services` || url === `${siteUrl}/services/`) {
          return { ...item, lastmod, priority: 0.8, changefreq: 'monthly' };
        }

        // Borough index pages
        if (url.match(/\/locations\/[^/]+\/?$/) && !url.endsWith('/locations/') && !url.endsWith('/locations')) {
          return { ...item, lastmod, priority: 0.7, changefreq: 'monthly' };
        }

        // Borough + service combo pages
        if (url.match(/\/locations\/[^/]+\/[^/]+\/?$/)) {
          return { ...item, lastmod, priority: 0.7, changefreq: 'monthly' };
        }

        // Locations hub
        if (url === `${siteUrl}/locations` || url === `${siteUrl}/locations/`) {
          return { ...item, lastmod, priority: 0.8, changefreq: 'monthly' };
        }

        // About, contact
        if (url.includes('/about') || url.includes('/contact')) {
          return { ...item, lastmod, priority: 0.6, changefreq: 'monthly' };
        }

        // Default for all other pages
        return { ...item, lastmod, priority: 0.5, changefreq: 'monthly' };
      },
    }),
  ],
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  trailingSlash: 'never',
  output: 'server',
  server: { port: 3000 }
});
