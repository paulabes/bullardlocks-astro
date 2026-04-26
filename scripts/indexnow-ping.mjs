#!/usr/bin/env node
/**
 * IndexNow ping — submits all sitemap URLs to api.indexnow.org so Bing/Yandex
 * pick up new and changed pages instantly rather than on their next crawl cycle.
 *
 * Run after deploy:  node scripts/indexnow-ping.mjs
 *
 * IndexNow is supported by Bing, Yandex, Naver and Seznam. Google does NOT
 * use it (Google sticks to its own crawl schedule), so this is purely an
 * incremental win for the smaller engines — useful but not load-bearing.
 */

const KEY = 'ad21e825eb56ad3c303f28ae7ddf2aa6';
const HOST = 'www.bullardlocks.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap-0.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submit(urls) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  return { status: res.status, body: await res.text() };
}

async function main() {
  console.log(`Fetching ${SITEMAP_URL}…`);
  const urls = await fetchSitemapUrls();
  console.log(`Submitting ${urls.length} URLs to IndexNow…`);
  const result = await submit(urls);
  console.log(`Status: ${result.status}`);
  if (result.body) console.log(`Body: ${result.body}`);
  // 200 = accepted; 202 = received and being processed; 400/422 = malformed
  if (result.status >= 400) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
