#!/usr/bin/env node
/**
 * Puppeteer link & image checker
 *
 * - Crawls same-origin pages starting from BASE_URL (arg or env)
 * - Validates all <a href> (HTTP/HTTPS) return 2xx/3xx
 * - Scrolls to trigger lazy loads and validates all <img> render (naturalWidth > 0)
 * - Optional args:
 *   --maxPages=50  --timeout=30000  --concurrency=8  --depth=2
 *
 * Usage:
 *   node scripts/test-links.mjs http://localhost:3000
 *   BASE_URL=https://yoursite.com npm run test:links
 */

import puppeteer from 'puppeteer';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    if (!a.startsWith('--')) return ['base', a];
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? 'true'];
  })
);

const BASE_URL = process.env.BASE_URL || args.base || 'http://localhost:3000';
const MAX_PAGES = Number(args.maxPages ?? 50);
const DEPTH = Number(args.depth ?? 2);
const TIMEOUT = Number(args.timeout ?? 30000);
const CONCURRENCY = Number(args.concurrency ?? 8);
// External link handling: 'warn' (default) | 'skip' | 'check'
// - warn: check external links but do NOT fail exit code; print warnings (incl. 403 hints)
// - skip: do not check external links
// - check: treat external failures as fatal like internal links
const EXTERNAL_MODE = (args.external ?? 'warn');
// Spoof a realistic browser UA for fetch-based link checks (helps reduce 403s)
const DEFAULT_UA = args.ua || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';
// Normalization flags for dedupe
const IGNORE_QUERY = String(args.ignoreQuery || 'false') === 'true';
const IGNORE_HASH = String(args.ignoreHash || 'true') === 'true';

function isHttpUrl(u) {
  try {
    const url = new URL(u);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeForKey(u) {
  try {
    const x = new URL(u);
    if (IGNORE_HASH) x.hash = '';
    if (IGNORE_QUERY) x.search = '';
    return x.toString();
  } catch {
    return u;
  }
}

// Reporting helpers
function uniqByTo(arr) {
  const map = new Map();
  for (const item of arr) {
    const key = normalizeForKey(item.to);
    if (!map.has(key)) map.set(key, item);
  }
  return Array.from(map.values());
}

function countByStatus(arr) {
  return arr.reduce((acc, x) => {
    const s = x.status ?? 0;
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
}

async function waitUntilReachable(url, totalTimeoutMs = 30000) {
  const start = Date.now();
  let attempt = 0;
  while (Date.now() - start < totalTimeoutMs) {
    const res = await fetchStatus(url, 5000);
    if (res.ok) return true;
    attempt++;
    await sleep(Math.min(2000, 200 + attempt * 200));
  }
  return false;
}

function isSameOrigin(u) {
  try {
    const a = new URL(u, BASE_URL);
    const b = new URL(BASE_URL);
    return a.origin === b.origin;
  } catch {
    return false;
  }
}

function toAbs(u, base) {
  try { return new URL(u, base).href; } catch { return null; }
}

// Small helpers
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchStatus(url, timeoutMs) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': DEFAULT_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    return { ok: res.status >= 200 && res.status < 400, status: res.status, redirected: res.redirected, url: res.url };
  } catch (e) {
    return { ok: false, status: 0, error: String(e) };
  } finally {
    clearTimeout(t);
  }
}

async function promisePool(items, limit, worker) {
  const results = [];
  let i = 0;
  const run = async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx);
    }
  };
  const runners = Array.from({ length: Math.min(limit, items.length) }, run);
  await Promise.all(runners);
  return results;
}

async function scrollToBottom(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.scrollingElement || document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) return resolve();
        const delta = Math.min(600, scrollHeight - (scrollTop + clientHeight));
        window.scrollBy(0, delta);
        total += delta;
        setTimeout(step, 80);
      };
      step();
    });
  });
}

async function collectOnPage(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: TIMEOUT });
  await scrollToBottom(page);
  await sleep(600);

  const { links, imgs } = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    const imgs = Array.from(document.querySelectorAll('img'));
    const links = anchors
      .map((a) => a.getAttribute('href'))
      .filter(Boolean)
      .map((href) => ({ href, text: (a => (a?.innerText || '').trim())(anchors.find(x => x.getAttribute('href') === href)) }));
    const images = imgs.map((img) => ({
      src: img.currentSrc || img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth || 0,
      alt: img.alt || ''
    }));
    return { links, imgs: images };
  });
  return { links, imgs };
}

async function main() {
  console.log(`Starting crawl at ${BASE_URL} (maxPages=${MAX_PAGES}, depth=${DEPTH})`);
  // Preflight: ensure BASE_URL is reachable before launching browser
  const reachable = await waitUntilReachable(BASE_URL, TIMEOUT);
  if (!reachable) {
    console.error(`Base URL not reachable within ${TIMEOUT}ms: ${BASE_URL}`);
    process.exit(1);
  }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const queue = [{ url: BASE_URL, depth: 0 }];
  const visited = new Set();
  const allLinkChecks = [];
  const allImgChecks = [];
  const checkedTargets = new Set(); // avoid checking same absolute URL multiple times across pages

  while (queue.length && visited.size < MAX_PAGES) {
    const { url, depth } = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    console.log(`→ Visiting: ${url}`);

    try {
      const { links, imgs } = await collectOnPage(page, url);

      // Image checks from this page
      imgs.forEach((img) => {
        allImgChecks.push({ page: url, ...img });
      });

      // Prepare link targets and enqueue internal links
      const base = url;
      const linkTargets = new Set();
      for (const { href } of links) {
        const abs = toAbs(href, base);
        if (!abs) continue;
        // Queue same-origin links
        if (depth < DEPTH && isSameOrigin(abs)) {
          if (!visited.has(abs)) queue.push({ url: abs, depth: depth + 1 });
        }
        linkTargets.add(abs);
      }

      // Check all http(s) links from this page
      const targets = Array.from(linkTargets)
        .filter(isHttpUrl)
        .filter((t) => isSameOrigin(t) || EXTERNAL_MODE !== 'skip')
        .filter((t) => !checkedTargets.has(normalizeForKey(t)));
      targets.forEach((t) => checkedTargets.add(normalizeForKey(t)));
      const results = await promisePool(targets, CONCURRENCY, (t) => fetchStatus(t, TIMEOUT));
      results.forEach((res, i) => {
        allLinkChecks.push({ from: url, to: targets[i], ...res });
      });
    } catch (e) {
      console.error(`× Error visiting ${url}:`, e?.message || e);
      allLinkChecks.push({ from: 'crawler', to: url, ok: false, status: 0, error: String(e) });
    }
  }

  await browser.close();

  // Evaluate images
  const imgFailures = allImgChecks.filter((i) => isHttpUrl(i.src) && i.naturalWidth <= 0);
  // Evaluate links
  const internalFailuresRaw = allLinkChecks.filter((l) => isSameOrigin(l.to) && !l.ok);
  const externalFailuresRaw = allLinkChecks.filter((l) => !isSameOrigin(l.to) && !l.ok);
  // Unique by target URL
  const internalFailures = uniqByTo(internalFailuresRaw);
  const externalFailures = uniqByTo(externalFailuresRaw);
  // For exit code, internal are always fatal; externals only fatal if EXTERNAL_MODE==='check'
  const linkFailures = EXTERNAL_MODE === 'check'
    ? internalFailures.concat(externalFailures)
    : internalFailures;

  // Report
  const uniq = (arr) => Array.from(new Set(arr));
  console.log('\n===== Results =====');
  console.log(`Pages visited: ${visited.size}`);
  console.log(`Links checked: ${allLinkChecks.length}  (failures: ${linkFailures.length})`);
  console.log(`Images observed: ${allImgChecks.length}  (failures: ${imgFailures.length})`);

  if (internalFailures.length) {
    console.log('\nBroken internal links:');
    internalFailures.slice(0, 50).forEach((l) => console.log(` - ${l.to} [${l.status}] ← from ${l.from}`));
    if (internalFailures.length > 50) console.log(` ... and ${internalFailures.length - 50} more`);
    const sumInt = countByStatus(internalFailures);
    console.log('Summary (internal):', Object.entries(sumInt).map(([k,v]) => `${k}:${v}`).join(', '));
  }
  if (EXTERNAL_MODE !== 'skip' && externalFailures.length) {
    console.log('\nExternal link warnings (ignored for exit code unless --external=check):');
    externalFailures.slice(0, 50).forEach((l) => console.log(` - ${l.to} [${l.status}] ← from ${l.from}`));
    if (externalFailures.length > 50) console.log(` ... and ${externalFailures.length - 50} more`);
    const sumExt = countByStatus(externalFailures);
    console.log('Summary (external):', Object.entries(sumExt).map(([k,v]) => `${k}:${v}`).join(', '));
    const cf403 = sumExt[403] || 0;
    if (cf403) {
      console.log(`Note: ${cf403} external link(s) returned 403. This often indicates Cloudflare or other bot-protection challenges. It does not necessarily mean the link is bad; consider verifying manually in a browser.`);
    }
  }
  if (imgFailures.length) {
    console.log('\nBroken images (naturalWidth=0):');
    uniq(imgFailures.map((i) => `${i.src} ← ${i.page}`)).slice(0, 50).forEach((l) => console.log(' -', l));
    if (imgFailures.length > 50) console.log(` ... and ${imgFailures.length - 50} more`);
  }

  const exitCode = linkFailures.length || imgFailures.length ? 1 : 0;
  if (exitCode) {
    console.log('\n✗ Some links or images failed.');
  } else {
    console.log('\n✓ All checked links and images look good.');
  }
  process.exit(exitCode);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
