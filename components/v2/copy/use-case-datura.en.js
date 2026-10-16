/* Caso Datura Clothing (EN). Stessa struttura e stessi numeri dell'IT (fonte), come «AI WooCommerce Manager» (14/10/2026).
   In pagina niente date: solo durate e «over the last 4 months». Numeri dalla raccolta fatti del cliente e dal registro dei lavori;
   i 20 minuti per la scheda di un prodotto e i 5 per tutto il catalogo sono dichiarati dal negozio, non misurati. Niente ore risparmiate misurate, niente fatturato.
   Percorso: /use-cases/datura-clothing (stesso slug in tutte le lingue). La descrizione prodotto è tradotta dall'italiano del negozio. */
export default {
  meta: {
    title: "Datura Clothing: 10 Faults Found in 28 Days | Automis",
    description:
      "Site monitoring, Meta campaigns, creatives and a monthly report for an online clothing store: 10 distinct faults found in 28 days, 100 ads created in 6 weeks.",
  },

  hero: {
    eyebrow: "Case study",
    title: "AI WooCommerce Manager: one system for the whole store",
    highlight: "AI WooCommerce Manager:",
    titleLogo: { word: "WooCommerce", src: "/assets/images/logos/woocommerce-mark-white.svg", alt: "WooCommerce" },
    lead: "A clothing store that runs on its own. Over the last four months the AI has taken over round-the-clock monitoring, sped up the catalog and made the ads work harder.",
    client: "Datura Clothing",
    logo: "/assets/images/client-logos/datura-clothing-white.png",
  },

  presidio: {
    eyebrow: "1 · Monitoring",
    title: "The store stays up even when nobody is watching",
    lead: "An online store breaks without making a sound. Here an AI checks it day and night, finds the errors, fixes them and writes to you only when needed.",
    ops: {
      title: "Monitoring",
      live: "always on",
      ariaLabel: "Monitoring checks the store and fixes five errors, one after another.",
      checksLabel: "What it checks",
      checks: ["Scheduled tasks", "Instagram connection", "Home and pages", "Meta catalog", "Payments", "Plugin updates"],
      tags: { found: "Found", fix: "Fix", done: "Resolved" },
      incidents: [
        {
          name: "Scheduled tasks",
          figure: "23",
          unit: "days",
          title: "Scheduled tasks were stuck",
          found: "313 events out of 318 were overdue.",
          fix: "An outside check restarts the cycle every 10 minutes. Every night a second check looks at whether the work was really done, not just whether the page responds.",
          done: "Backlog cleared. If it stops again, an alert arrives.",
        },
        {
          name: "Instagram connection",
          figure: "37",
          unit: "days",
          title: "The Instagram connection had expired",
          found: "The site's showcase still displayed May's posts.",
          fix: "A new access, connected to the site, that never expires.",
          done: "Connection renewed. It no longer expires.",
        },
        {
          name: "Home and pages",
          figure: "111",
          unit: "errors in one day",
          title: "Meta's bursts of requests were taking the site down",
          found: "The site answered with a 503 error and went down.",
          fix: "The most requested pages are served from cache, Meta's crawler included.",
          done: "After two days, zero errors.",
        },
        {
          name: "Meta catalog",
          figure: "2×",
          unit: "the real price",
          title: "The catalog was publishing full prices",
          found: "Some outlet items appeared in the ads at double the real price.",
          fix: "The discounted price goes into the catalog, which regenerates and is checked every night.",
          done: "Ad prices match the site's.",
        },
        {
          name: "Payments",
          figure: "28",
          unit: "installment purchases lost",
          title: "Nobody wrote to people who left a payment halfway",
          found: "In four months, 28 installment purchases lost because the payment was left halfway. No email to customers.",
          fix: "Every payment cancelled in time triggers an email with the items still available and a link that puts them back in the cart.",
          done: "Live. Results still to be measured.",
        },
      ],
    },
  },

  catalog: {
    eyebrow: "2 · Catalog",
    title: "From photo to online listing, much faster",
    lead: "The AI optimizes the photos and writes each product's description from the photo. We wrote the prompts: the store uses them and uploads the result to the site.",
    steps: {
      photo: { n: "1 · Photo", title: "Optimized photos", ready: "Photo ready", alt: "Pullover Camionneur Full Zip, product photo" },
      desc: {
        n: "2 · Description",
        title: "Every product detail",
        label: "Written by the AI",
        lines: [
          "Rib-knit viscose pullover that adds depth and character to the knit. ",
          "The trucker collar can be worn up or open, while the full-length front zip means you can also wear it as an alternative to a cardigan. ",
          "The viscose gives the knit a soft hand and a fluid drape, pleasant to wear and easy to fit into everyday outfits.",
        ],
        chips: ["How to wear it", "What it goes with", "Composition"],
      },
      card: { n: "3 · Listing", title: "Online on the site", name: "Pullover Camionneur Full Zip", site: "daturaclothing.it", status: "Published" },
    },
    time: {
      title: "How long it takes",
      before: { label: "Before", figure: "20 min", pre: "to write the listing for", strong: "just 1 product" },
      after: { label: "Now", figure: "5 min", pre: "to write the listings for", strong: "the whole catalog" },
    },
  },

  ads: {
    eyebrow: "3 · Ads",
    title: "Sharper analysis, new concepts, campaigns that start from the catalog",
    lead: "The AI reads the numbers, suggests what to change and prepares the creatives. Campaigns are switched on only after a person's go-ahead.",
    analysis: {
      n: "Analysis",
      title: "What the data say",
      lead: "Two different readings, one question: what is worth pushing today?",
      past: {
        tag: "Previous creatives",
        title: "Every creative has its own job",
        lines: [
          "Catalog carousels sell but don't build an audience. Sponsored organic posts build an audience but don't sell.",
          "Judging them all on return would shut down the machine that feeds the profile. The real return is calculated on the store's revenue, not on the number Meta reports.",
        ],
        matrix: {
          cols: ["Sell", "Build an audience"],
          rows: [
            { name: "Catalog carousels", v: [true, false] },
            { name: "Sponsored organic posts", v: [false, true] },
          ],
        },
        costTitle: "Cost of a follower",
        cost: [
          { label: "Sponsored posts", text: "€1.45", w: "6%" },
          { label: "Sales campaigns", text: "€8 to €26", w: "100%" },
        ],
      },
      dynamic: {
        tag: "Dynamic groups",
        title: "Products come in and go out on their own",
        lines: [
          "A dynamic product group fills and empties itself: an item enters the ads when it has the right sizes and leaves when they run out.",
          "Availability is read on the sizes, not on the product. With a single size in stock the product still shows as available and the ads keep paying: it happened with a suit that had 3 sizes in stock out of 66 and was the top for visits from the ads.",
        ],
        group: {
          chip: "Dynamic group",
          name: "Available new arrivals",
          tag: "illustrative example",
          inLabel: "In the ads",
          outLabel: "Out",
          unit: "sizes in stock",
          rows: [
            { name: "Pullover Camionneur Full Zip", text: "5 of 5", pct: 100 },
            { name: "Giacca Cardigan Con Tasche", cycle: true, text: "5 of 5", textLow: "1 of 5" },
            { name: "Abito Blu", text: "3 of 66", pct: 5, out: true },
            { name: "Pullover Full Zip Cappuccio", text: "5 of 5", pct: 100 },
          ],
        },
      },
    },
    concepts: {
      n: "Concepts",
      title: "A series of new creative concepts",
      ariaLabel: "A series of creative concepts for the ads: jeans, suits, sizing, the brand.",
      images: [
        { src: "/media/use-cases/datura/concepts/jeans-toru.jpg", alt: "Concept: Jeans Toru Lavaggio Zero", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/jeans-misura.jpg", alt: "Concept: the leg opening of the jeans, 22 centimeters", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/jeans-moodboard.jpg", alt: "Jeans moodboard: the video frames", w: 900, h: 352 },
        { src: "/media/use-cases/datura/ad-camionneur.jpg", alt: "Concept: Pullover Camionneur Full Zip", w: 640, h: 640 },
        { src: "/media/use-cases/datura/concepts/abito-gessato.jpg", alt: "Concept: Abito Gessato Blu", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/abito-revers.jpg", alt: "Concept: the lapel of the Abito Blu, 12 centimeters", w: 520, h: 650 },
        { src: "/media/use-cases/datura/ad-cappuccio.jpg", alt: "Concept: Full Zip pullover with hood", w: 640, h: 640 },
        { src: "/media/use-cases/datura/concepts/abito-herringbone.jpg", alt: "Concept: Abito Herringbone Terra", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/marchio-dieci-anni.jpg", alt: "Concept: a suit you will still wear in ten years", w: 520, h: 650 },
      ],
    },
    campaigns: {
      n: "Campaigns",
      title: "Campaigns from the catalog",
      items: [
        { figure: "4", label: "campaigns" },
        { figure: "100", label: "ads created", bar: 100 },
        { figure: "46", label: "went live", bar: 46 },
      ],
      note: "In six weeks. We don't judge the return of the most recent campaigns yet.",
    },
  },

  numbers: {
    eyebrow: "In numbers",
    title: "Over the last 4 months",
    label: "The case in numbers",
    items: [
      { figure: "10", label: "distinct faults found", basis: "in 28 days" },
      { figure: "100", label: "ads created in 4 campaigns, 46 went live", basis: "in 6 weeks" },
      { figure: "19", label: "plugin updates checked one by one, all without problems", basis: "in 4 days" },
    ],
    product: { label: "The product behind the case: AI E-commerce Manager", href: "/ecommerce" },
  },

  site: {
    eyebrow: "The website",
    title: "Rebuilt from top to bottom",
    lead: "In these months we rebuilt the website too.",
    items: [
      { title: "Design", line: "A new look, built on the brand's identity. Here, the new product page." },
      { title: "Menu", line: "Nine entries: garment types, new arrivals and outlet. Whoever is searching finds the right category right away." },
      { title: "Checkout", line: "An improved purchase process." },
    ],
    shots: {
      menu: { src: "/media/use-cases/datura/sito-menu.jpg", alt: "The new Datura Clothing menu, with the knitwear submenu open" },
      phone: { src: "/media/use-cases/datura/sito-scheda-telefono.jpg", alt: "The new product page on a phone: Pullover Camionneur Full Zip" },
    },
  },

  cta: {
    title: "Want an AI teammate that monitors your website around the clock and helps you keep optimizing it?",
    line: "",
  },
};
