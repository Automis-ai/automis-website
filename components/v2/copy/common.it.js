/* Testi condivisi del sito v2 (IT). Fonte unica dei nomi fissi: menu, categorie, prodotti,
   badge dei casi, etichette dell'interfaccia e dettagli del calendario.
   Le altre pagine non li ripetono: li leggono da qui (getCopy("common", "it")). */
export default {
  nav: {
    systems: "Sistemi",
    allSystems: "Tutti i sistemi",
    training: "Formazione",
    cases: "Casi studio",
    about: "Chi siamo",
  },
  cta: "Raccontaci il tuo caso",
  categories: {
    marketing: "Sistemi di Marketing",
    sales: "Sistemi di Vendita",
    support: "Sistemi di Assistenza",
    admin: "Sistemi di Amministrazione",
    hr: "Sistemi di Risorse umane",
  },
  products: {
    voice: "Voice AI",
    ecommerce: "AI E-commerce Manager",
  },
  caseBadge: "Caso reale →",
  ui: {
    more: "Altro",
    less: "Meno",
    replay: "Rivedi",
    scriptNote: "Esempio scritto in anticipo: qui non risponde nessuna IA dal vivo.",
    home: "Home",
    allCases: "Tutti i casi studio",
    readCase: "Leggi il caso",
  },
  booking: {
    cta: "Prenota una call",
    availability: "Disponibilità aggiornata · call da 30 minuti",
    instant: "Conferma immediata",
    noObligation: "Senza impegno",
    loading: "Sto caricando il calendario…",
    iframeTitle: "Prenota una call con Automis",
    bullets: [
      "Una call di 30 minuti, senza pressioni",
      "Capiamo dove la tua attività perde tempo e soldi",
      "Esci con le idee chiare su dove l'IA ti serve di più",
    ],
  },
};
