/* Testi condivisi del sito v2 (EN). Fonte unica dei nomi fissi: menu, categorie, prodotti,
   badge dei casi, etichette dell'interfaccia e dettagli del calendario.
   Le altre pagine non li ripetono: li leggono da qui (getCopy("common", lang)). */
export default {
  nav: {
    systems: "Systems",
    allSystems: "All systems",
    training: "Training",
    cases: "Case studies",
    about: "About",
  },
  cta: "Tell us about your business",
  categories: {
    marketing: "Marketing systems",
    sales: "Sales systems",
    support: "Customer service systems",
    admin: "Admin systems",
    hr: "HR systems",
  },
  products: {
    voice: "Voice AI",
    ecommerce: "AI E-commerce Manager",
  },
  caseBadge: "Real case →",
  ui: {
    more: "More",
    less: "Less",
    replay: "Replay",
    scriptNote: "Scripted example. No live AI runs on this page.",
    home: "Home",
    allCases: "All case studies",
    readCase: "Read the case",
  },
  booking: {
    cta: "Book a call",
    availability: "Live availability · 30-minute call",
    instant: "Instant confirmation",
    noObligation: "No obligation",
    loading: "Loading live calendar…",
    iframeTitle: "Book a call with Automis",
    bullets: [
      "A 30-minute call, no pressure",
      "We map where your business loses time and money",
      "You leave with a clear view of your best AI opportunities",
    ],
  },
};
