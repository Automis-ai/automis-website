/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://automis.ai",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  // Keep the noindex localized landings and retired URLs out of the sitemap.
  exclude: ["/de", "/es", "/fr", "/pt", "/ita", "/consultation"],
  transform: async (config, path) => {
    let priority = 0.6;
    if (path === "/") priority = 1.0;
    else if (["/voice-ai", "/ai-automations", "/jumpstart-audit", "/use-cases"].includes(path)) priority = 0.9;
    else if (path.startsWith("/use-cases/") || path.startsWith("/blog/")) priority = 0.8;
    else if (["/blog", "/about", "/contact"].includes(path)) priority = 0.7;
    else if (["/privacy-policy", "/terms-of-service"].includes(path)) priority = 0.3;
    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
