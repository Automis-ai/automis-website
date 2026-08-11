#!/usr/bin/env node
/**
 * IndexNow submitter — tells search engines a URL is new or changed, instead of
 * waiting for the next crawl.
 *
 * Reaches Bing, Yandex, Seznam and Naver (one POST is shared between them). It does
 * NOT reach Google: Google never joined IndexNow, retired its sitemap ping in 2023,
 * and limits its Indexing API to job postings and livestreams. For Google the levers
 * are an accurate lastmod (see next-sitemap.config.js) and, for a piece that really
 * matters, "Request indexing" by hand in Search Console. Bing is still worth the
 * five minutes: it also feeds Copilot, which matters for the GEO side.
 *
 * Usage:
 *   node scripts/indexnow.mjs --since <git-sha>   # articles changed since that commit
 *   node scripts/indexnow.mjs --all               # every article (one-off backfill)
 *   node scripts/indexnow.mjs <url> [<url>...]    # explicit URLs
 *
 *   --dry-run   print what would be submitted, send nothing
 *   --no-wait   skip the "is it actually live?" check
 *
 * By default each URL is polled until it returns 200 before being submitted:
 * announcing a URL that 404s (because the deploy has not landed yet) is worse than
 * announcing it a minute later.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SITE = "https://automis.ai";
const HOST = "automis.ai";

// Must match the filename of the key file in public/. Search engines fetch
// https://automis.ai/<KEY>.txt and check it contains exactly this string; if the two
// ever drift apart every submission is silently rejected, so we assert it below.
const KEY = "8d028c20d0a904d3852935b2ea204b75";

// Mirrors BLOG_BASE_PATH in lib/blog.js and next-sitemap.config.js.
const BLOG_BASE_PATH = { en: "/blog", it: "/it/blog", pt: "/pt/blog" };

const ENDPOINT = "https://api.indexnow.org/indexnow";
const WAIT_TIMEOUT_MS = 6 * 60 * 1000; // a Vercel deploy of this site takes ~1 min
const WAIT_INTERVAL_MS = 15 * 1000;

function assertKeyFile() {
  const file = path.join(process.cwd(), "public", `${KEY}.txt`);
  if (!fs.existsSync(file)) {
    fail(`Key file missing: public/${KEY}.txt\nIndexNow verifies the key by fetching ${SITE}/${KEY}.txt — without it every submission is rejected.`);
  }
  const contents = fs.readFileSync(file, "utf8").trim();
  if (contents !== KEY) {
    fail(`Key mismatch: public/${KEY}.txt contains "${contents}" but KEY is "${KEY}".`);
  }
}

/** "content/blog/it/foo.md" -> "https://automis.ai/it/blog/foo". Null if not an article. */
function urlForFile(file) {
  const m = file.match(/^content\/blog\/(en|it|pt)\/(.+)\.md$/);
  return m ? `${SITE}${BLOG_BASE_PATH[m[1]]}/${m[2]}` : null;
}

function articlesChangedSince(sha) {
  // Added or modified only: a deleted article must not be announced.
  const out = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=AM", `${sha}..HEAD`, "--", "content/blog"],
    { encoding: "utf8" }
  );
  return out.split("\n").map((f) => f.trim()).filter(Boolean).map(urlForFile).filter(Boolean);
}

function allArticles() {
  const urls = [];
  for (const [lang, base] of Object.entries(BLOG_BASE_PATH)) {
    const dir = path.join(process.cwd(), "content/blog", lang);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      urls.push(`${SITE}${base}/${f.replace(/\.md$/, "")}`);
    }
  }
  return urls;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Poll until the URL is actually served, so we never announce a 404. */
async function waitUntilLive(url) {
  const deadline = Date.now() + WAIT_TIMEOUT_MS;
  for (;;) {
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow" });
      if (res.ok) return true;
    } catch {
      // network hiccup — treat as not-yet-live and retry
    }
    if (Date.now() >= deadline) return false;
    await sleep(WAIT_INTERVAL_MS);
  }
}

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const noWait = argv.includes("--no-wait");
  const sinceIdx = argv.indexOf("--since");

  let urls;
  if (sinceIdx !== -1) {
    const sha = argv[sinceIdx + 1];
    if (!sha) fail("--since needs a git sha");
    urls = articlesChangedSince(sha);
  } else if (argv.includes("--all")) {
    urls = allArticles();
  } else {
    urls = argv.filter((a) => a.startsWith("http"));
  }

  urls = [...new Set(urls)];

  if (urls.length === 0) {
    console.log("Nothing to submit.");
    return;
  }

  assertKeyFile();

  console.log(`${urls.length} URL(s) to submit:`);
  for (const u of urls) console.log(`  ${u}`);

  if (!noWait && !dryRun) {
    console.log("\nWaiting for each URL to be live…");
    const live = [];
    for (const u of urls) {
      const ok = await waitUntilLive(u);
      console.log(`  ${ok ? "live" : "NOT live (skipped)"}  ${u}`);
      if (ok) live.push(u);
    }
    urls = live;
    if (urls.length === 0) fail("No URL became live before the timeout — nothing submitted.");
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  };

  if (dryRun) {
    console.log("\n--dry-run, sending nothing. Payload:");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // 200 = accepted, 202 = accepted but the key is still being verified.
  if (res.status === 200 || res.status === 202) {
    console.log(`\n✓ Submitted ${urls.length} URL(s) — HTTP ${res.status}`);
    return;
  }
  fail(`IndexNow returned HTTP ${res.status}: ${await res.text()}`);
}

main().catch((e) => fail(e.stack || String(e)));
