// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { boroughs } from './src/data/locations.ts';

const dynamicPages = boroughs.flatMap(({ slug, services }) => [
  `https://bullardlocks.com/locations/${slug}`,
  ...services.map(s => `https://bullardlocks.com/locations/${slug}/${s}`),
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://bullardlocks.com',
  integrations: [sitemap({ customPages: dynamicPages })],
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  output: 'server',
  server: { port: 3000 }
});