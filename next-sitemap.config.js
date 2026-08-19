/** @type {import('next-sitemap').IConfig} */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// IMPORTANT: next-sitemap v4 auto-detection returns 0 routes for this site because
// every page renders dynamically (the root layout reads request headers to set the
// per-locale <html lang>), so the prerender manifest is empty. That produced an
// empty sitemap.xml index. So the route list is fed explicitly, from two sources:
//
//   1. STATIC_PATHS below — pages that are hand-built. Add a line when you add one.
//   2. Blog articles — DISCOVERED from content/blog/**/*.md at build time (see
//      blogPosts()). They are deliberately NOT listed by hand: the publishing bot
//      used to append each new article here, which worked but had no way to fail
//      loudly. If an append were ever missed the article would go live and quietly
//      never enter the sitemap. Reading the folder removes that failure mode.
//
// Keep excluded (redirect / noindex / voice-only) URLs out of both.

// Mirrors BLOG_BASE_PATH in lib/blog.js — same mapping, but that file is ESM and
// this config is CommonJS, so it cannot be imported here. Keep the two in sync.
const BLOG_BASE_PATH = { en: "/blog", it: "/it/blog", pt: "/pt/blog" };

/**
 * Every article on disk, with its real publication date.
 *
 * Mirrors getAllPosts() in lib/blog.js: the slug is the filename minus ".md", and
 * every .md in the folder is published (there is no draft flag). If that ever
 * changes, filter here too or the sitemap will advertise unpublished URLs.
 */
function blogPosts() {
  const posts = [];
  for (const [lang, base] of Object.entries(BLOG_BASE_PATH)) {
    const dir = path.join(process.cwd(), "content/blog", lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      posts.push({ loc: `${base}/${slug}`, date: toIsoDay(data.date), lang });
    }
  }
  return posts;
}

/**
 * "2026-08-11" (or a YAML-parsed Date) -> "2026-08-11". Null when unusable, so a
 * malformed date omits lastmod rather than inventing one.
 */
function toIsoDay(value) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

// Hand-maintained pages. Blog ARTICLES do not belong here (they are discovered);
// the three blog index pages do, since they are real routes with no .md of their own.
const STATIC_PATHS = [
  // English
  "/",
  "/about",
  "/ai-automations",
  "/voice-ai",
  "/jumpstart-audit",
  "/use-cases",
  "/use-cases/clinica-santa-maria",
  "/use-cases/adifesa",
  "/blog",
  "/blog/ai-receptionist-for-medspas",
  "/blog/private-ai-vs-chatgpt-for-company-documents",
  "/blog/where-to-start-with-ai-automation",
  "/playbook",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  // English tools
  "/tools",
  "/tools/missed-call-revenue-calculator",
  "/tools/no-show-cost-calculator",
  "/tools/google-review-link-generator",
  "/tools/whatsapp-link-generator",
  // Italian
  "/it",
  "/it/about",
  "/it/ai-automations",
  "/it/voice-ai",
  "/it/jumpstart-audit",
  "/it/use-cases",
  "/it/use-cases/clinica-santa-maria",
  "/it/use-cases/adifesa",
  "/it/blog",
  "/it/blog/centralino-con-risponditore-automatico",
  "/it/blog/centralino-virtuale-studio-dentistico",
  "/it/contact",
  "/it/privacy-policy",
  "/it/terms-of-service",
  "/it/cookie-policy",
  // Italian tools
  "/it/tools",
  "/it/tools/calcolatore-chiamate-perse",
  "/it/tools/calcolatore-appuntamenti-mancati",
  "/it/tools/generatore-link-recensioni-google",
  "/it/tools/generatore-link-whatsapp",
  // Portuguese (European Portuguese main site; served at /pt via the middleware
  // rewrite to app/pt-site). The voice.automis.ai/pt lander is a different host
  // and is not part of this automis.ai sitemap.
  "/pt",
  "/pt/about",
  "/pt/ai-automations",
  "/pt/voice-ai",
  "/pt/jumpstart-audit",
  "/pt/use-cases",
  "/pt/use-cases/clinica-santa-maria",
  "/pt/use-cases/adifesa",
  "/pt/contact",
  "/pt/privacy-policy",
  "/pt/terms-of-service",
  "/pt/cookie-policy",
  "/pt/blog",
  "/pt/blog/gestao-documental-com-ia",
  // Portuguese tools
  "/pt/tools",
  "/pt/tools/calculadora-chamadas-perdidas",
  "/pt/tools/calculadora-faltas-consultas",
  "/pt/tools/gerador-link-avaliacoes-google",
  "/pt/tools/gerador-link-whatsapp",
];

const POSTS = blogPosts();

/**
 * Per-URL lastmod.
 *
 * Previously every URL got `new Date()` at build time, so each deploy told Google
 * that all ~76 pages had just changed. That is a signal Google learns to distrust,
 * and it buried the one page that genuinely was new. Now only pages whose real
 * modification date we actually know carry a lastmod:
 *   - articles      -> the `date` in their frontmatter
 *   - blog indexes  -> the newest article date in that language
 *   - everything else -> no lastmod at all, which is honest and permitted.
 * Never reintroduce a build-time fallback here; an absent lastmod beats a fake one.
 */
const LASTMOD = new Map();
for (const post of POSTS) {
  if (post.date) LASTMOD.set(post.loc, post.date);
}
for (const [lang, base] of Object.entries(BLOG_BASE_PATH)) {
  const dates = POSTS.filter((p) => p.lang === lang && p.date).map((p) => p.date);
  if (dates.length) LASTMOD.set(base, dates.sort().at(-1));
}

// Deduplicated on purpose. The publishing bot's writer prompt still appends each new
// article's path by hand (it predates this file reading the folder), and until that
// prompt is updated on the box the same article can arrive from both sources. Without
// the Set that would ship a sitemap listing the URL twice.
const INDEXABLE_PATHS = [...new Set([...STATIC_PATHS, ...POSTS.map((p) => p.loc)])];

module.exports = {
  siteUrl: "https://automis.ai",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  // Redirecting, transactional, and voice.automis.ai-only lander URLs are kept out
  // of the sitemap (each paired with the real fix at its source). These are simply
  // never added to the lists above; the exclude list is a second safety net for any
  // that discovery might one day surface.
  exclude: [
    "/consultation", // 302 -> /jumpstart-audit
    "/ita", // 302 -> /it; the real page lives on voice.automis.ai
    "/en", "/fr", "/de", "/es", // Voice-AI landers, noindex (prospect-only)
    // NB: /pt is NO LONGER excluded — on automis.ai it is the European-Portuguese
    // main site (indexable, listed above). The /pt Voice-AI lander lives only on
    // voice.automis.ai (a different host, noindex, not in this sitemap).
    "/roadmap", // transactional finder-results page, noindex
    "/luca-ig", // 308 -> /it/luca-ig
    "/it/luca-ig", // Instagram bio lander (traffic comes from IG, not search)
  ],
  // Attach the real lastmod (or none) instead of next-sitemap's build-time default.
  transform: async (config, loc) => ({
    loc,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: LASTMOD.get(loc) || undefined,
    alternateRefs: config.alternateRefs || [],
  }),
  // Explicitly feed the route list (auto-detection is empty, see note above).
  additionalPaths: async (config) => {
    const results = await Promise.all(
      INDEXABLE_PATHS.map((p) => config.transform(config, p))
    );
    return results.filter(Boolean);
  },
};
