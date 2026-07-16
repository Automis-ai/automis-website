/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://automis.ai',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  // Keep redirecting, transactional, and voice.automis.ai-only lander URLs out of
  // the automis.ai sitemap so Google is never pointed at a 3XX, a duplicate, or a
  // noindex page. Each exclusion is paired with the real fix at its source:
  exclude: [
    '/consultation', // 302 -> /jumpstart-audit (was a "3XX in sitemap")
    '/ita',          // 302 -> /it on automis.ai; the real page lives on voice.automis.ai
    '/en', '/fr', '/de', '/es', '/pt', // Voice-AI landers, noindex (prospect-only)
    '/roadmap',      // transactional finder-results page, noindex
    '/luca-ig',      // Instagram bio lander (traffic comes from IG, not search)
  ],
}