/* Caso Album AI (IT). Solo i fatti della §3 del brief: da 1.200 a 1.800 scatti di un evento il
   sistema sceglie circa 280 foto, poi impagina l'album; il fotografo lo usa dal browser sul suo Mac.
   Nessun risultato (tempo, soddisfazione), nessun evento o data del cliente. Dal 14/10/2026 Simone Casillo ha dato l'ok a comparire col nome.
   Percorso proposto: /use-cases/album-ai. */
export default {
  meta: {
    title: "Album AI: da 6 ore a 50 minuti per un album | Automis",
    description:
      "Album AI sceglie le foto e impagina l'album per uno studio fotografico: da circa 6 ore a circa 50 minuti, revisione compresa. Tempi indicati dallo studio.",
  },

  hero: {
    eyebrow: "Caso studio",
    title: "Un album in circa 50 minuti, non in 6 ore",
    highlight: "circa 50 minuti",
    lead: "Album AI sceglie le foto e impagina l'album del fotografo. Lui rivede e corregge, e il sistema impara dalle sue correzioni.",
    client: "Studio fotografico Simone Casillo",
    logo: "/assets/images/client-logos/simone-casillo-white.png",
    tag: "Strumento per album",
  },

  flow: {
    title: "Cosa fa il sistema",
    from: { figure: "Da 1.200 a 1.800", label: "scatti di un evento entrano nel sistema" },
    to: { figure: "Circa 280", label: "foto che il sistema sceglie" },
    then: "Poi il sistema impagina l'album.",
  },

  scene: {
    title: "Come lavora il sistema",
    lead: "Dalle centinaia di scatti di un evento all'album, con il fotografo che ha l'ultima parola. Le foto sono immagini di esempio.",
    label: "Animazione: gli scatti dell'evento arrivano, il sistema scarta quelli sfocati, doppi o con gli occhi chiusi, tiene le migliori e le impagina nell'album; il fotografo cambia una foto e il sistema impara.",
    photos: ["sposi-coriandoli", "bouquet-luce", "sposi-palloncini", "fedi-mani", "tavolo", "mani-bouquet", "famiglia-tramonto", "fedi-peonie", "sedie-prato", "ritratto"].map(
      (n) => `/media/use-cases/album-ai/photos/${n}.jpg`
    ),
    steps: [
      "Arrivano gli scatti dell'evento: da 1.200 a 1.800",
      "Il sistema li guarda: sfocate, doppie, occhi chiusi",
      "Restano circa 280 foto",
      "Le impagina nell'album",
      "Il fotografo rivede e il sistema impara",
    ],
  },

  time: {
    title: "Prima e dopo",
    lead: "Il tempo di un album di eventi, scelta e impaginazione, prima a mano e adesso con il sistema.",
    before: {
      label: "A mano",
      figure: "Circa 6 ore",
      bar: 100,
      rows: [
        ["Scelta delle foto", "circa 3 ore"],
        ["Impaginazione", "2-3 ore"],
      ],
    },
    after: {
      label: "Con Album AI",
      figure: "Circa 50 minuti",
      bar: 14,
      badge: "Oltre l'80% di tempo in meno",
      line: "Il sistema fa il lavoro lungo. Al fotografo resta la revisione.",
      rows: [
        ["Scelta delle foto", "circa 20 minuti"],
        ["Impaginazione", "circa 15 minuti"],
        ["Revisione del fotografo", "circa 15 minuti"],
      ],
    },
  },

  online: {
    title: "Online da zero, in tre pezzi",
    lead: "Per lo studio fotografico abbiamo costruito il sistema per gli album, il sito e il CRM.",
    site: {
      status: "Online",
      title: "Il sito",
      line: "Il sito dello studio, con la prenotazione su WhatsApp: si sceglie lo studio e il giorno tra le date disponibili, e il messaggio parte già compilato.",
      features: ["Prenotazione su WhatsApp", "Date e giorni di ogni studio", "Tre formule con i prezzi", "Due studi con mappa", "Gallerie e foto di Natale"],
      cta: "Vai al sito",
      url: "https://simonecasillo.com",
      links: [
        { label: "Home", href: "https://simonecasillo.com/" },
        { label: "Foto di Natale", href: "https://simonecasillo.com/natale/" },
      ],
      shots: [
        { src: "/media/use-cases/album-ai/sito-home.jpg", alt: "La home del sito dello studio su computer", kind: "desktop" },
        { src: "/media/use-cases/album-ai/sito-mobile.jpg", alt: "La home del sito dello studio su telefono", kind: "mobile" },
      ],
      note: "Foto segnaposto, in attesa degli scatti dello studio.",
    },
    items: [
      { title: "Album AI", line: "Sceglie le foto e impagina l'album, con il fotografo che rivede.", status: "In uso" },
      { title: "Il CRM", line: "Richieste e clienti in un posto solo, dal primo contatto alla consegna dell'album.", status: "In consegna" },
    ],
  },

  cta: {
    title: "Meno ore sugli album, più tempo per i clienti",
    line: "Album AI toglie allo studio il lavoro più lungo e ripetitivo: si consegna prima e resta più tempo per seguire chi aspetta. Raccontaci quale lavoro ripetitivo ti porta via più ore e ti diciamo da dove partiremmo.",
  },
};
