#!/usr/bin/env node
/**
 * SEO regression check — the technical half of an Ahrefs Site Audit, run on demand.
 *
 * Why this exists: in July 2026 every issue Ahrefs flagged was fixed by hand and the
 * project hit a 100 health score. Nothing enforced those rules afterwards, so the PT
 * site, the tools hub and the nightly blog bot each re-introduced them one page at a
 * time, and the next crawl came back at 62. A one-off sweep cannot hold a site that
 * publishes five articles a week; a check that runs on every push can.
 *
 * Each rule below maps to an issue Ahrefs actually reported on this project. Errors
 * fail the run; warnings are printed but do not, because they are judgement calls
 * (a 62-character title is fine if the extra words earn their place).
 *
 * Usage:
 *   node scripts/seo-check.mjs                          # check production
 *   node scripts/seo-check.mjs --base http://localhost:3000
 *   node scripts/seo-check.mjs --json                   # machine-readable report
 *   node scripts/seo-check.mjs --min-pages 5            # smaller expected sitemap
 *
 * URLs come from the sitemap, with the origin rewritten to --base, so the same run
 * works against production, a Vercel preview, or a local `next start`.
 */

const SITE = "https://automis.ai";
const MAX_DESCRIPTION = 155; // Ahrefs: "Meta description too long"
const MAX_TITLE = 60; // Ahrefs: "Title too long" (warning here, it is a judgement call)
const MIN_DESCRIPTION = 70; // Ahrefs: "Meta description too short"
const CONCURRENCY = 8;
// A guard that silently checks nothing still reports success — that is how the CI
// workflow went green 8 times while skipping every run. If the sitemap ever returns
// a handful of URLs (empty index, broken generator, wrong base), that is a failure,
// not a clean bill of health.
const MIN_PAGES = 20;
const UA = "Mozilla/5.0 (compatible; AutomisSeoCheck/1.0; +https://automis.ai)";

const args = process.argv.slice(2);
const base = (argValue("--base") || SITE).replace(/\/$/, "");
const asJson = args.includes("--json");

// Preview deployments sit behind Vercel's deployment protection and answer 302 to
// vercel.com/sso-api, which would read as "every page is broken". The bypass secret
// (Vercel project settings -> Deployment Protection) is sent only to the base host,
// never to third-party assets.
// Deliberately NOT sending x-vercel-set-bypass-cookie: that asks Vercel to hand back
// a 307 that sets a cookie (it exists so a browser can stop sending the header), which
// made the very first request — the sitemap — fail with a redirect. The header alone is
// sent on every request, so no cookie is needed.
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "";
const headersFor = (url) =>
  bypass && url.startsWith(base)
    ? { "User-Agent": UA, "x-vercel-protection-bypass": bypass }
    : { "User-Agent": UA };

function argValue(flag) {
  const i = args.indexOf(flag);
  return i === -1 ? null : args[i + 1];
}

const errors = [];
const warnings = [];
const err = (url, rule, detail) => errors.push({ url, rule, detail });
const warn = (url, rule, detail) => warnings.push({ url, rule, detail });

/* ── fetching ─────────────────────────────────────────────────────────────── */

const statusCache = new Map();

async function fetchText(url) {
  const res = await fetch(url, { headers: headersFor(url), redirect: "manual" });
  const body = res.status < 300 ? await res.text() : "";
  return { status: res.status, location: res.headers.get("location"), body };
}

/** Status of any URL, fetched at most once. One retry, so a blip is not a failure. */
async function statusOf(url) {
  if (statusCache.has(url)) return statusCache.get(url);
  const p = (async () => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(url, {
          headers: headersFor(url),
          redirect: "follow",
          signal: AbortSignal.timeout(20000),
        });
        return res.status;
      } catch {
        if (attempt === 1) return 0; // 0 = unreachable
      }
    }
  })();
  statusCache.set(url, p);
  return p;
}

async function mapLimit(items, limit, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx], idx);
      }
    })
  );
  return out;
}

/* ── parsing ──────────────────────────────────────────────────────────────── */

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
};

function metaContent(html, name, key = "name") {
  const re = new RegExp(`<meta[^>]*\\b${key}="${name}"[^>]*>`, "i");
  const tag = html.match(re);
  return tag ? attr(tag[0], "content") : null;
}

/** Production URL -> the base being checked. Identity when checking production. */
const toBase = (url) => url.replace(/^https?:\/\/[^/]+/, base);

async function sitemapUrls() {
  const seen = new Set();
  const queue = [`${base}/sitemap.xml`];
  const urls = [];
  while (queue.length) {
    const sm = queue.shift();
    let { status, body, location } = await fetchText(sm);
    // Follow one redirect: the sitemap URL itself is plumbing, not a page under audit.
    if (status >= 300 && status < 400 && location) {
      ({ status, body } = await fetchText(new URL(location, sm).href));
    }
    if (status !== 200) {
      console.error(
        `✗ ${sm} returned ${status}.\n` +
          (status === 401 || status === 403 || status === 307
            ? "  Looks like Vercel deployment protection: check VERCEL_AUTOMATION_BYPASS_SECRET."
            : "  Check the sitemap generator or --base.")
      );
      process.exit(1);
    }
    const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    const isIndex = /<sitemapindex/.test(body);
    for (const loc of locs) {
      const url = toBase(loc).replace(/\/$/, "") || base;
      if (isIndex) queue.push(url);
      else if (!seen.has(url)) (seen.add(url), urls.push(url));
    }
  }
  return urls;
}

/* ── rules ────────────────────────────────────────────────────────────────── */

const localeOf = (url) => {
  const path = url.slice(base.length);
  if (path.startsWith("/it")) return "it";
  if (path.startsWith("/pt")) return "pt";
  return "en";
};

const DASH = /[—–]/; // brand rule: no em/en dashes in any language

async function checkPage(url) {
  const { status, location, body: html } = await fetchText(url);

  // Ahrefs: "4XX page", "5XX page", "3XX redirect in sitemap"
  if (status !== 200) {
    err(url, "sitemap-url-not-200", `returned ${status}${location ? ` -> ${location}` : ""}`);
    return null;
  }

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  const description = metaContent(html, "description");
  const canonical = (html.match(/<link[^>]*rel="canonical"[^>]*>/i) || []).map?.call
    ? attr((html.match(/<link[^>]*rel="canonical"[^>]*>/i) || [""])[0], "href")
    : null;
  const lang = attr((html.match(/<html[^>]*>/i) || [""])[0], "lang");
  const ogImage = metaContent(html, "og:image", "property") || metaContent(html, "og:image");
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];

  // Ahrefs: "Title tag missing or empty" / "Meta description tag missing or empty"
  if (!title || !title.trim()) err(url, "title-missing", "no <title>");
  if (!description || !description.trim()) err(url, "description-missing", "no meta description");

  if (description) {
    // Ahrefs: "Meta description too long" — the rule the PT site and the bot broke.
    if (description.length > MAX_DESCRIPTION)
      err(url, "description-too-long", `${description.length} chars (max ${MAX_DESCRIPTION})`);
    else if (description.length < MIN_DESCRIPTION)
      warn(url, "description-short", `${description.length} chars`);
    if (DASH.test(description)) err(url, "dash-in-description", description.trim());
  }
  if (title) {
    const t = decode(title).trim();
    if (t.length > MAX_TITLE) warn(url, "title-long", `${t.length} chars`);
    if (DASH.test(t)) err(url, "dash-in-title", t);
  }

  // Ahrefs: "H1 tag missing or empty" / "Multiple H1 tags"
  if (h1s.length === 0) err(url, "h1-missing", "page has no <h1>");
  if (h1s.length > 1) err(url, "h1-multiple", `${h1s.length} <h1> tags`);

  // Ahrefs: "Canonical points to a different page". A canonical is always absolute
  // and always production, so off-production runs compare it origin-normalised —
  // otherwise every page on a preview or a local build would fail this rule.
  if (!canonical) err(url, "canonical-missing", "no rel=canonical");
  else if (toBase(canonical).replace(/\/$/, "") !== url.replace(/\/$/, ""))
    err(url, "canonical-not-self", `canonical -> ${canonical}`);

  // Ahrefs: "Hreflang and HTML lang mismatch" — regressed once already (July 2026).
  const expected = localeOf(url);
  if (!lang) err(url, "lang-missing", "<html> has no lang");
  else if (!lang.toLowerCase().startsWith(expected))
    err(url, "lang-mismatch", `lang="${lang}" on a ${expected} URL`);

  // Ahrefs: "Open Graph tags incomplete". Next shallow-merges nested openGraph, so a
  // page that declares its own block silently loses the root default image.
  if (!ogImage) err(url, "og-image-missing", "no og:image");

  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = images.filter((tag) => !attr(tag, "alt")).length;
  if (noAlt) warn(url, "img-no-alt", `${noAlt} of ${images.length} images have no alt`);

  const assets = images
    .map((tag) => attr(tag, "src"))
    .concat(ogImage ? [ogImage] : [])
    .filter((src) => src && !src.startsWith("data:"))
    .map((src) => new URL(src, url).href);

  const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/gi)]
    .map((m) => decode(m[1]))
    .filter((h) => h && !/^(#|mailto:|tel:|javascript:)/i.test(h))
    .map((h) => new URL(h, url).href);

  return { url, title: title && decode(title).trim(), description, assets, links };
}

/* ── run ──────────────────────────────────────────────────────────────────── */

const urls = await sitemapUrls();
const minPages = Number(argValue("--min-pages") ?? MIN_PAGES);
if (urls.length < minPages) {
  console.error(
    `✗ Only ${urls.length} URL(s) in ${base}/sitemap.xml, expected at least ${minPages}.\n` +
      `  Refusing to report a pass on a crawl this small — check the sitemap generator or --base.`
  );
  process.exit(1);
}
const pages = (await mapLimit(urls, CONCURRENCY, checkPage)).filter(Boolean);

// Ahrefs: "Duplicate title tag" / "Duplicate meta description"
for (const [field, rule] of [["title", "duplicate-title"], ["description", "duplicate-description"]]) {
  const groups = new Map();
  for (const p of pages) {
    if (!p[field]) continue;
    const key = p[field];
    groups.set(key, [...(groups.get(key) || []), p.url]);
  }
  for (const [value, group] of groups) {
    if (group.length > 1)
      err(group.join(", "), rule, `${group.length} pages share "${value.slice(0, 70)}..."`);
  }
}

// Ahrefs: "Broken image" (this is what a dead partner badge looks like: it was on all
// 78 pages) and "Page has links to a broken page".
const assetUsers = new Map();
const linkUsers = new Map();
for (const p of pages) {
  for (const a of p.assets) assetUsers.set(a, [...(assetUsers.get(a) || []), p.url]);
  for (const l of p.links) linkUsers.set(l, [...(linkUsers.get(l) || []), p.url]);
}

const assetList = [...assetUsers.keys()];
const assetStatuses = await mapLimit(assetList, CONCURRENCY, statusOf);
assetList.forEach((a, i) => {
  if (assetStatuses[i] !== 200) {
    const users = assetUsers.get(a);
    err(users[0], "broken-image", `[${assetStatuses[i] || "unreachable"}] ${a} (on ${users.length} page${users.length > 1 ? "s" : ""})`);
  }
});

const linkList = [...linkUsers.keys()];
const linkStatuses = await mapLimit(linkList, CONCURRENCY, statusOf);
linkList.forEach((l, i) => {
  const status = linkStatuses[i];
  if (status === 200) return;
  const users = linkUsers.get(l);
  const internal = l.startsWith(base);
  const detail = `[${status || "unreachable"}] ${l} (on ${users.length} page${users.length > 1 ? "s" : ""})`;
  // Internal breakage is ours to fix; an external host can flake or block bots, so it
  // is reported without failing the run.
  if (internal) err(users[0], "broken-internal-link", detail);
  else warn(users[0], "broken-external-link", detail);
});

/* ── report ───────────────────────────────────────────────────────────────── */

if (asJson) {
  console.log(JSON.stringify({ base, pages: pages.length, errors, warnings }, null, 2));
} else {
  const print = (list, label) => {
    if (!list.length) return;
    console.log(`\n${label} (${list.length})`);
    const byRule = list.reduce((acc, e) => ({ ...acc, [e.rule]: [...(acc[e.rule] || []), e] }), {});
    for (const [rule, items] of Object.entries(byRule)) {
      console.log(`\n  ${rule}  ×${items.length}`);
      for (const item of items) console.log(`    ${item.url}\n      ${item.detail}`);
    }
  };
  console.log(`Checked ${pages.length} pages from ${base}/sitemap.xml`);
  print(warnings, "WARNINGS");
  print(errors, "ERRORS");
  console.log(
    errors.length
      ? `\n✗ ${errors.length} error${errors.length > 1 ? "s" : ""}. These are what drop the Ahrefs health score.`
      : `\n✓ No errors.${warnings.length ? ` ${warnings.length} warning(s) above.` : ""}`
  );
}

process.exit(errors.length ? 1 : 0);
