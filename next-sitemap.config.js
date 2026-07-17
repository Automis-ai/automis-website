/** @type {import('next-sitemap').IConfig} */

// IMPORTANT: next-sitemap v4 auto-detection returns 0 routes for this site because
// every page renders dynamically (the root layout reads request headers to set the
// per-locale <html lang>), so the prerender manifest is empty. That produced an
// empty sitemap.xml index and a stale sitemap-0.xml. Until/if that is revisited,
// this list is the source of truth for indexable routes. Add a line when you add a
// page. Keep excluded (redirect / noindex / voice-only) URLs OUT of this list.
const INDEXABLE_PATHS = [
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
  "/blog/voice-ai-receptionists",
  "/blog/ai-automations",
  "/blog/ai-optimized-paid-ads",
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
  "/it/blog/voice-ai-receptionists",
  "/it/blog/ai-automations",
  "/it/blog/ai-optimized-paid-ads",
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
];

module.exports = {
  siteUrl: "https://automis.ai",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  // Redirecting, transactional, and voice.automis.ai-only lander URLs are kept out
  // of the sitemap (each paired with the real fix at its source). These are simply
  // never added to INDEXABLE_PATHS above; the exclude list is a second safety net
  // for any that auto-detection might one day surface.
  exclude: [
    "/consultation", // 302 -> /jumpstart-audit
    "/ita", // 302 -> /it; the real page lives on voice.automis.ai
    "/en", "/fr", "/de", "/es", "/pt", // Voice-AI landers, noindex (prospect-only)
    "/roadmap", // transactional finder-results page, noindex
    "/luca-ig", // Instagram bio lander (traffic comes from IG, not search)
  ],
  // Explicitly feed the route list (auto-detection is empty, see note above).
  additionalPaths: async (config) => {
    const results = await Promise.all(
      INDEXABLE_PATHS.map((path) => config.transform(config, path))
    );
    return results.filter(Boolean);
  },
};
