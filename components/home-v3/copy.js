// Testi della home v3. Per ora solo IT (13/10: prima l'italiano, poi EN e PT con gli stessi contenuti).
// Scritti con la skill copywriter e ripassati con humanizer. I numeri dei casi sono quelli verificati del sito.

export const HOME_V3 = {
  it: {
    hero: {
      eyebrow: "Agenzia IA",
      titlePre: "Costruiamo i ",
      titleAccent: "sistemi IA",
      titlePost: " che mancano alla tua azienda.",
      lead: "Prima ascoltiamo come lavori, poi lo costruiamo su misura. E i sistemi che costruiamo funzionano già, ogni giorno, per i nostri clienti.",
      cta: "Prenota una call",
      ctaSecondary: "Scopri i sistemi IA",
    },
    journey: {
      eyebrow: "Un sistema al lavoro",
      title: "Dall'annuncio all'appuntamento, senza che il tuo team ci metta mano.",
      videoLabel: "Animazione: un annuncio porta un contatto, l'IA risponde in chat, fissa l'appuntamento e compila la scheda cliente",
    },
    systems: {
      eyebrow: "Sistemi IA",
      title: "Un sistema per ogni area della tua azienda",
      chapters: { m: "Marketing", v: "Vendite", a: "Amministrazione" },
      pain: "Il problema",
      more: "Scopri di più",
      go: "Vedi i sistemi",
      items: [
        {
          slug: "marketing",
          chapter: "m",
          title: "Sistemi IA per il Marketing",
          line: "Annunci, SEO, contenuti e recensioni.",
          pain: "Spendi in pubblicità e contenuti senza sapere cosa ti porta clienti.",
          more: "Il sistema prova più versioni dello stesso annuncio e sposta il budget su quella che porta prenotazioni. Contenuti e recensioni li segue ogni giorno, senza che tu debba rincorrerli.",
        },
        {
          slug: "sales",
          chapter: "v",
          title: "Sistemi IA per la Vendita",
          line: "Ogni contatto riceve risposta.",
          pain: "I contatti si raffreddano prima che qualcuno risponda.",
          more: "Quasi tutte le attività rispondono dopo ore. Ma passati i primi 5 minuti, le probabilità di chiudere quel contatto crollano.",
        },
        {
          slug: "support",
          chapter: "v",
          title: "Sistemi IA per l'Assistenza",
          line: "Chiamate e chat, a ogni ora.",
          pain: "Le chiamate restano senza risposta.",
          more: "Dal 30 al 50% delle chiamate a un'attività locale finisce in segreteria. E ogni chiamata persa è un cliente che prenota dal tuo concorrente.",
        },
        {
          slug: "admin",
          chapter: "a",
          title: "Sistemi IA per l'Amministrazione",
          line: "Documenti e dati in automatico.",
          pain: "Il tuo team perde ore tra pratiche e scartoffie.",
          more: "Ogni settimana se ne vanno ore tra dati da inserire, appuntamenti da fissare e documenti da rincorrere, invece di occuparsi dei clienti.",
        },
      ],
    },
    hub: {
      hero: {
        eyebrow: "Sistemi IA",
        title: "I sistemi che mancano alla tua azienda",
        highlight: "che mancano",
        lead: "Scegli un'area. Ogni sistema nasce dal tuo modo di lavorare.",
        cta: "Scopri le aree",
      },
      areas: { eyebrow: "Sistemi IA", title: "Un sistema per ogni area della tua azienda" },
      products: { eyebrow: "Prodotti", title: "Tre prodotti da cui partire", tagFallback: "Shopify · WooCommerce" },
      cta: {
        eyebrow: "Non sai da dove partire?",
        title: "Dicci come lavori: ti diciamo cosa ti serve davvero.",
        line: "Rispondi a sei domande veloci e ti indichiamo da quali sistemi partire.",
        button: "Trova le tue opportunità di IA",
      },
    },
    cases: {
      eyebrow: "I risultati dei nostri clienti",
      title: "Business veri. Sistemi veri. Già attivi.",
      lead: "Ogni numero con il suo periodo.",
      approx: "circa",
      read: "Leggi il caso studio",
      items: [
        { slug: "clinica-santa-maria", logo: "/assets/images/client-logos/clinica-santa-maria.png", stat: "872", label: "chiamate in sette mesi", client: "Clínica Santa Maria dos Olivais", tag: "Segretaria IA", meta: "Clinica dentale · Lisbona" },
        { slug: "adifesa", logo: "/assets/images/client-logos/adifesa.png", stat: "2.329", label: "conversazioni dal 1/5 al 16/9/2026", client: "ADifesa", tag: "Automazione Meta", meta: "Associazione di tutela bancaria e finanziaria · Lissone" },
        { slug: "album-ai", logo: "/assets/images/client-logos/simone-casillo.png", stat: "280", approx: true, label: "foto scelte tra 1.200 e 1.800 scatti", client: "Studio fotografico Simone Casillo", tag: "Album AI", meta: "Fotografia · Album scelti e impaginati dall'IA" },
        { slug: "datura-clothing", logo: "/assets/images/client-logos/datura-clothing.png", stat: "10", label: "guasti trovati in 28 giorni", client: "Datura Clothing", tag: "AI WooCommerce Manager", meta: "E-commerce di abbigliamento · Negozio WooCommerce" },
      ],
    },
  },
};

export function homeCopy(locale) {
  return HOME_V3[locale] || HOME_V3.it;
}
