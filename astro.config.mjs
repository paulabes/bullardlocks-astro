// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://bullardlocks.com',
  integrations: [react(), sitemap()],
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  output: 'server',
  server: { port: 3000 }
});