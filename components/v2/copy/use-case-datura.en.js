/* Datura Clothing case (EN). Numbers and windows from the client fact sheet (sections A, B, D).
   Every number carries its window. No hours saved (nothing was measured), no revenue figures.
   Path: /use-cases/datura-clothing (same slug in all languages). */
export default {
  meta: {
    title: "Datura Clothing: 10 Faults Found in 28 Days | Automis",
    description:
      "Site monitoring, Meta campaigns, creatives and a monthly report for an online clothing store: 10 distinct faults found in 28 days, 100 ads created in 6 weeks.",
  },

  hero: {
    eyebrow: "Case study",
    title: "Ten faults found in 28 days in the Datura Clothing store",
    highlight: "Ten faults found",
    lead: "Site monitoring, Meta campaigns, creatives and a monthly report: four modules of one system, with real numbers and the period each one covers.",
    client: "Datura Clothing",
    tag: "Monitoring and campaigns",
    statsLabel: "The numbers in this case",
    stats: [
      { figure: "10", label: "distinct faults found", basis: "13 Aug to 9 Sep 2026, 28 days" },
      { figure: "100", label: "ads created in 4 campaigns, 46 went live", basis: "in 6 weeks, 25 Aug to 8 Oct 2026" },
      { figure: "19", label: "plugin updates checked one by one, all without problems", basis: "20 to 23 Aug 2026" },
    ],
  },

  problem: {
    eyebrow: "The problem",
    title: "An online store breaks without making a sound",
    lead: "We don't count hours saved, because nobody measured them. We count how long a fault sat there before we found it.",
    items: [
      {
        figure: "23",
        unit: "days",
        label: "of scheduled tasks stuck",
        line: "313 events out of 318 were overdue.",
        basis: "20 Jul to 12 Aug 2026",
        days: 23,
      },
      {
        figure: "37",
        unit: "days",
        label: "with the Instagram connection expired",
        line: "The site's showcase still displayed May's posts.",
        basis: "19 Jul to 25 Aug 2026",
        days: 37,
      },
      {
        figure: "111",
        unit: "errors in one day",
        label: "from bursts of requests from Meta",
        line: "On 10 Aug the site answered with a 503 error and went down. Since 15 Aug, zero.",
        basis: "10 to 15 Aug 2026",
        spikes: [
          { value: 111, label: "10 Aug" },
          { value: 101, label: "12 Aug" },
          { value: 0, label: "15 Aug" },
        ],
      },
    ],
    barLabel: "days",
  },

  system: {
    eyebrow: "The system",
    title: "One store, four connected modules",
    lead: "Monitoring watches the store, the feed carries it to Meta, campaigns start from the catalog, the report tells what happened.",
    hub: "The store",
    nodes: ["Site monitoring", "Feed and catalog", "Campaigns and creatives", "Monthly report"],
    ariaLabel: "Diagram: the store at the centre, linked to the four modules of the system.",
  },

  results: {
    eyebrow: "The results",
    title: "Three numbers, each with its own basis",
    items: [
      {
        figure: "10",
        label: "distinct faults found in 28 days",
        line: "13 Aug to 9 Sep 2026. For some, like the scheduled tasks and the Instagram showcase, we added a dedicated check.",
      },
      {
        figure: "100",
        label: "ads created in 6 weeks",
        line: "In 4 campaigns, 25 Aug to 8 Oct 2026. 46 went live. The 100 include tests and posts already published, reused as ads.",
        lit: 46,
        dotsLabel: "100 ads, 46 went live",
      },
      {
        figure: "19",
        label: "plugin updates checked one by one",
        line: "20 to 23 Aug 2026, all without problems. Each one with a copy before, a check after and a rollback ready. The site has 39 active plugins.",
      },
    ],
    note: "We don't judge the return of the most recent campaigns yet: it's early, and we wrote the rules for judging it before switching them on.",
  },

  modules: {
    eyebrow: "What each module does",
    title: "Four modules, each with its own job",
    detailLabel: "In detail",
    items: [
      {
        icon: "shield",
        since: "Since 13 Aug",
        title: "Site monitoring",
        line: "Every 5 minutes a sentinel requests the home page. Every night at 02:30 a round of checks starts. Plugins are updated one at a time, with a rollback if a check turns red.",
        more: [
          "The sentinel tells a site that is down apart from a Cloudflare block, and also reads error spikes within a single minute. It alerts us only when something is red: green sends no notification.",
          "The nightly round started on 13 Aug with 46 checks: 25 on pages, opened in a real browser, 6 on discounted prices, 10 on emails, followed all the way to the inbox, 5 on the defences against the crawler. We have added more since.",
          "Rolling back an update is triggered by a rule written in code, not by a model's judgement. Payments and WooCommerce wait for a person's go-ahead.",
          "The product page answers Meta's crawler in 57 ms instead of 1,742 (measured on 13 Aug 2026).",
        ],
      },
      {
        icon: "database",
        since: "Since 25 Aug",
        title: "Feed and catalog",
        line: "Discounted prices reach Meta through the product feed. Since 31 Aug the feed regenerates every night at 02:30 and the result is checked.",
        more: [
          "On 8 Oct 2026 we forced Meta to read the feed and checked the result: 105 products out of 105 registered.",
        ],
      },
      {
        icon: "target",
        since: "Since 25 Aug",
        title: "Campaigns and creatives",
        line: "Campaigns with dynamic products from the catalog, switched on only after a person's go-ahead. Catalog carousels, static images, videos and posts already published become ads.",
        more: [
          "We write the rules for judging a campaign before switching it on.",
          "Before pushing a product we check which sizes are still available, counted on the variants.",
          "The copy follows the brand's tone of voice.",
          "100 ads created from 25 Aug to 8 Oct 2026, in 4 campaigns: 46 went live.",
        ],
      },
      {
        icon: "chart",
        since: "Since 1 Sep",
        title: "Monthly report",
        line: "A two-page PDF for the owner: four store numbers, each with its comparison, the campaigns with their return as a percentage, the content that sold.",
        more: [
          "The return is the store's real revenue divided by the Meta spend, not the number Meta reports.",
          "The first one, for August, was generated on 1 Sep. Alongside the PDF we prepare an internal sheet for ourselves.",
        ],
      },
    ],
  },

  basis: {
    summary: "How we counted",
    items: [
      "10 faults: a count on our fault log, 13 Aug to 9 Sep 2026. One chain of causes counts as one fault. We write \"found\": not all of them were caught by an automatic check, some came out of an analysis or from a person looking.",
      "100 ads: \"ad created\" events in Meta's activity log, 25 Aug to 8 Oct 2026. They include tests and posts already published, reused as ads. 46 spent money, and those are the ones that went live. Of the 4 campaigns, 3 went live.",
      "19 updates: distinct plugins, 20 to 23 Aug 2026, done with a person at Automis following every step. They are not autonomous updates.",
      "Hours saved: no measurement, so no number.",
    ],
  },

  cta: {
    title: "What is breaking in your store without anyone seeing it?",
    line: "Tell us about your business and we will tell you where we would start.",
  },
};
