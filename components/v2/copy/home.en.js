/* Home v2 (EN), giro 2. Ordine di Luca (§13 del brief):
   hero centrata, categorie (con l'animazione «journey» sotto il titolo), come lavoriamo, casi studio,
   Opportunity Finder, founder, call in fondo.
   «Come lavoriamo», Finder, founder e call sono i componenti originali del sito: portano i loro testi.
   Qui stanno hero, categorie e casi. I percorsi dei link sono senza prefisso di lingua. */
export default {
  meta: {
    title: "Automis | AI Agency for Marketing, Sales and Admin Systems",
    description:
      "We listen to how your business works, then build the AI automation systems it is missing: marketing, sales, customer service, admin and HR.",
  },

  hero: {
    eyebrow: "AI agency",
    title: "We build the systems your business is missing.",
    highlight: ["systems"],
    lead: "First we listen to how you work. Then we build it around you, with systems already running for our clients.",
    cta: "Tell us about your business",
    ctaSecondary: "See the systems",
  },

  categories: {
    title: "A system for every area of your business",
    lead: "Start with the area where you lose the most time.",
    journeyLabel: "Animation: from first contact to customer, with Automis systems at work",
    items: [
      { slug: "marketing", title: "AI Systems for Marketing", line: "Ads, search, content and reviews." },
      { slug: "sales", title: "AI Systems for Sales", line: "Every contact answered and tracked." },
      { slug: "support", title: "AI Systems for Customer Service", line: "Calls and chats, day and night." },
      { slug: "admin", title: "AI Systems for Admin", line: "Documents and data on autopilot." },
      { slug: "company-brain", title: "Company Brain", line: "A private archive for new colleagues." },
    ],
  },

  cases: {
    eyebrow: "Proof, not promises",
    title: "Real businesses, real numbers, each with the period it covers.",
    readCase: "Read the case study",
    items: [
      {
        key: "clinica",
        stat: "872",
        statLabel: "calls in seven months",
        client: "Clínica Santa Maria dos Olivais",
        meta: "Dental clinic · Lisbon, PT",
        tag: "Voice AI receptionist",
        result: "A voice assistant on the clinic's phone line: 872 calls in seven months and 114 appointments booked.",
        href: "/use-cases/clinica-santa-maria",
      },
      {
        key: "adifesa",
        stat: "2,329",
        statLabel: "conversations from 1 May to 16 Sep 2026",
        client: "ADifesa",
        meta: "Banking and financial protection association · Lissone, IT",
        tag: "Meta automation",
        result: "Comments and DMs on Facebook and Instagram, handled and qualified: 2,329 conversations from 1 May to 16 Sep 2026.",
        href: "/use-cases/adifesa",
      },
      {
        key: "album",
        stat: "280",
        approx: true,
        statLabel: "photos picked from 1,200–1,800 shots",
        client: "A professional photographer",
        meta: "Professional photography",
        tag: "Album tool",
        result: "From 1,200 to 1,800 shots of one event, it picks about 280 photos, then lays out the album.",
        href: "/use-cases/album-ai",
      },
      {
        key: "datura",
        stat: "10",
        statLabel: "faults found in 28 days",
        client: "Datura Clothing",
        meta: "Clothing e-commerce",
        tag: "Monitoring and campaigns",
        result: "We watch over the store and run the Meta campaigns: 10 distinct faults found in 28 days, 100 ads created in 6 weeks, 46 went live.",
        href: "/use-cases/datura-clothing",
      },
    ],
  },
};
