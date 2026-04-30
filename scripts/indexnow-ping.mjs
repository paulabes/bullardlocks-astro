#!/usr/bin/env node
// Submits every URL in the live sitemap to IndexNow.
// Run via `npm run indexnow` after a production deploy.

const HOST = 'www.bullardlocks.com';
const KEY = 'ad21e825eb56ad3c303f28ae7ddf2aa6';
const SITEMAP_URL = `https://${HOST}/sitemap-0.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};

console.log(`Fetching ${SITEMAP_URL}…`);
const sitemapRes = await fetch(SITEMAP_URL);
if (!sitemapRes.ok) {
  fail(`Sitemap fetch failed: ${sitemapRes.status} ${sitemapRes.statusText}`);
}
const xml = await sitemapRes.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (urlList.length === 0) {
  fail('No <loc> entries found in sitemap.');
}

console.log(`Submitting ${urlList.length} URLs to IndexNow…`);

const submitRes = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

console.log(`Status: ${submitRes.status}`);

if (submitRes.status >= 400) {
  const body = await submitRes.text();
  fail(`IndexNow rejected the submission. Body: ${body}`);
}
