/* AI E-commerce Manager (EN). Prodotto dei Sistemi di Marketing: la pagina descrive il prodotto e
   porta, per piattaforma, alle due landing già fatte (solo in italiano, servite come file statici).
   Moduli e angolo per piattaforma ripresi dalle landing, senza le promesse da non ripetere.
   Nessun prezzo finché Luca non decide il «da». Percorsi senza prefisso di lingua, tranne le due landing. */
export default {
  meta: {
    title: "AI E-commerce Manager for Shopify and WooCommerce | Automis",
    description:
      "AI agents that watch your online store day and night: ads, customers, catalog and sales. Choose your platform, Shopify or WooCommerce.",
  },

  hero: {
    eyebrow: "Marketing systems",
    title: "AI E-commerce Manager",
    lead: "AI agents that watch your online store day and night, and write to you only when it matters.",
    cta: "Choose your platform",
    visual: {
      title: "Your store, tonight",
      caption: "Illustrative example.",
      rows: [
        { icon: "target", area: "Ads", text: "A size sold out: the ad stop is ready.", state: "Waiting for your OK", tone: "wait" },
        { icon: "chat", area: "Customers", text: "A customer writes about a delicate case.", state: "Sent to you", tone: "wait" },
        { icon: "database", area: "Catalog", text: "Prices compared with what Meta sees.", state: "Checked", tone: "done" },
        { icon: "web", area: "Site", text: "The site is still responding.", state: "Checked", tone: "done" },
      ],
    },
  },

  platforms: {
    title: "Choose your platform",
    note: "The platform pages are written in Italian.",
    langTag: "Page in Italian",
    modulesSummary: "what we look after",
    items: [
      {
        id: "shopify",
        name: "Shopify",
        tagline: "Where Sidekick stops, we start.",
        line: "Ads, customers, catalog and revenue, looked after day and night.",
        modules: [
          { title: "Ads", line: "Every night we cross-check campaigns and stock. A size sold out? The ad stop is already prepared, and you confirm it." },
          { title: "Customers", line: "We answer on WhatsApp, Instagram and email by your rules. Delicate cases come to you." },
          { title: "Catalog", line: "Every night we compare catalog, prices and availability with what Meta sees. Differences arrive with the fix ready." },
          { title: "Revenue", line: "Each month we divide what you collected on Shopify by what you spent on ads: the real return, not the one Meta credits itself." },
        ],
        cta: "See the Shopify page",
        href: "/it/ecommerce/shopify",
      },
      {
        id: "woocommerce",
        name: "WooCommerce",
        tagline: "Who watches your WooCommerce while you sleep?",
        line: "Scheduled tasks, plugin updates, your Meta catalog and the site itself, checked around the clock.",
        modules: [
          { title: "Scheduled tasks", line: "Every night we check that emails, catalog updates and deadlines actually go out." },
          { title: "Updates", line: "We update plugins at night and check the site after each one. If something breaks, it rolls back, decided by a fixed rule and not by an AI." },
          { title: "Catalog", line: "Every night we rebuild the catalog and check products, prices and discounts." },
          { title: "Site", line: "A sentinel keeps checking that the site responds. If it stops, we read the server logs to find the cause." },
        ],
        cta: "See the WooCommerce page",
        href: "/it/ecommerce/woocommerce",
      },
    ],
    other: "Another platform? Tell us about your store.",
  },

  control: {
    title: "You stay in control",
    items: [
      { title: "Fixed rules", line: "Prices, refunds and returns are never left to an AI." },
      { title: "Your approval", line: "Anything that costs money or touches the store waits for your OK." },
      { title: "A trial run", line: "At the start we check every action ourselves. Safe ones then become automatic, one at a time." },
    ],
  },

  cta: {
    title: "Tell us about your store",
    line: "Which platform you use, and where the store loses time or money.",
    button: "Tell us about your store",
  },

  legal: "Shopify and Sidekick are trademarks of Shopify Inc. WooCommerce is a trademark of Automattic Inc. Automis is not affiliated with Shopify or Automattic.",
};
