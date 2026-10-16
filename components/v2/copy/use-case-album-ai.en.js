/* Caso Album AI (EN). Stessa struttura e stessi numeri dell'IT (fonte): 1.200-1.800 scatti, circa 280 foto, circa 6 ore a mano
   contro circa 50 minuti con il sistema (tempi dichiarati dallo studio, non misurati). Percorso: /use-cases/album-ai. */
export default {
  meta: {
    title: "Album AI: from 6 hours to 50 minutes per album | Automis",
    description:
      "Album AI picks the photos and lays out the album for a photo studio: from about 6 hours to about 50 minutes, review included. Times reported by the studio.",
  },

  hero: {
    eyebrow: "Case study",
    title: "An album in about 50 minutes, not 6 hours",
    highlight: "about 50 minutes",
    lead: "Album AI chooses the photos and lays out the photographer's album. He reviews and corrects, and the system learns from his corrections.",
    client: "Simone Casillo photo studio",
    logo: "/assets/images/client-logos/simone-casillo-white.png",
    tag: "Album tool",
  },

  flow: {
    title: "What the system does",
    from: { figure: "1,200 to 1,800", label: "shots from one event go into the system" },
    to: { figure: "About 280", label: "photos the system chooses" },
    then: "Then the system lays out the album.",
  },

  scene: {
    title: "How the system works",
    lead: "From the event shots to the album, with the photographer having the final say.",
    note: "The photos are sample images.",
    label: "Animation: the event shots arrive, the system discards the blurry, duplicate or closed-eyes ones, keeps the best and lays them out in a real album, ready to print; the photographer swaps one photo, the system learns and the pages turn.",
    photos: ["sposi-coriandoli", "bouquet-luce", "sposi-palloncini", "fedi-mani", "tavolo", "mani-bouquet", "famiglia-tramonto", "fedi-peonie", "sedie-prato", "ritratto"].map(
      (n) => `/media/use-cases/album-ai/photos/${n}.jpg`
    ),
    steps: [
      "The event shots arrive: 1,200 to 1,800",
      "The system looks at them: blurry, duplicates, closed eyes",
      "About 280 photos are left",
      "It lays them out in the album",
      "The photographer reviews and the system learns",
      "The album is ready to print",
    ],
  },

  time: {
    title: "Before and after",
    lead: "The time an event album takes, first by hand and now with the system.",
    before: {
      label: "By hand",
      figure: "About 6 hours",
      bar: 100,
      rows: [
        ["Choosing the photos", "about 3 hours"],
        ["Layout", "2-3 hours"],
      ],
    },
    after: {
      label: "With Album AI",
      figure: "About 50 minutes",
      bar: 14,
      badge: "Over 80% less time",
      line: "The system does the long work. The photographer is left with the review.",
      rows: [
        ["Choosing the photos", "about 20 minutes"],
        ["Layout", "about 15 minutes"],
        ["Photographer's review", "about 15 minutes"],
      ],
    },
  },

  online: {
    title: "Online from scratch, in three pieces",
    lead: "For the photo studio we built the albums, the website and the CRM.",
    site: {
      status: "Online",
      title: "The website",
      line: "The studio's website, with booking on WhatsApp: you pick the studio and the day from the available dates, and the message arrives already filled in.",
      features: ["Booking on WhatsApp", "Dates and days for each studio", "Three packages with prices", "Two studios with a map", "Galleries and Christmas photos"],
      cta: "Go to the website",
      url: "https://simonecasillo.com",
      links: [
        { label: "Home", href: "https://simonecasillo.com/" },
        { label: "Christmas photos", href: "https://simonecasillo.com/natale/" },
      ],
      shots: [
        { src: "/media/use-cases/album-ai/sito-home.jpg", alt: "The studio's website home page on a computer", kind: "desktop" },
        { src: "/media/use-cases/album-ai/sito-mobile.jpg", alt: "The studio's website home page on a phone", kind: "mobile" },
      ],
      note: "Placeholder photos, waiting for the studio's shots.",
    },
    items: [
      { title: "Album AI", line: "Chooses the photos and lays out the album, with the photographer reviewing.", status: "In use" },
      { title: "The CRM", line: "Requests and clients in one place, from first contact to album delivery.", status: "Being delivered" },
    ],
  },

  cta: {
    title: "Are you a photographer? Try Album AI in your studio",
    line: "Fewer hours on albums, faster deliveries, more time for clients. If you shoot weddings, 18th birthday parties or ceremonies and spend hours choosing and laying out, tell us how you work: we will see together if it is right for you.",
  },
};
