/* Caso Album AI (EN). Stessa struttura e stessi numeri dell'IT (fonte): 1.200-1.800 scatti, circa 280 foto, da 4 a 5 ore a mano
   contro 1 ora con il sistema (tempi dichiarati dallo studio, non misurati). Percorso: /use-cases/album-ai. */
export default {
  meta: {
    title: "Album AI: from 4-5 hours to 1 hour per album | Automis",
    description:
      "Album AI picks the photos and lays out the album for a photo studio: from 4-5 hours to 1 hour, review included. Times reported by the studio.",
  },

  hero: {
    eyebrow: "Case study",
    title: "An album in 1 hour, not 4-5",
    highlight: "1 hour",
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
      figure: "4-5 hours",
      bar: 100,
      line: "The photographer chooses every photo and lays out every page by hand.",
    },
    after: {
      label: "With Album AI",
      figure: "1 hour",
      bar: 22,
      badge: "Up to 80% less time",
      line: "The system does the long work. The photographer is left with the review.",
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
