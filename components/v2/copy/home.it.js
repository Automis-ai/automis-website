/* Home v2 (IT), giro 2. Ordine di Luca (§13 del brief):
   hero centrata, categorie (con l'animazione «journey» sotto il titolo), come lavoriamo, casi studio,
   Opportunity Finder, founder, call in fondo.
   «Come lavoriamo», Finder, founder e call sono i componenti originali del sito: portano i loro testi.
   Qui stanno hero, categorie e casi. I percorsi dei link sono senza prefisso di lingua. */
export default {
  meta: {
    title: "Automis | Agenzia IA per marketing, vendite e amministrazione",
    description:
      "Ascoltiamo come lavori, poi costruiamo i sistemi IA che mancano alla tua azienda: marketing, vendite, assistenza, amministrazione e risorse umane.",
  },

  hero: {
    eyebrow: "Agenzia IA",
    // «sistema IA» con uno spazio che non va a capo: il titolo non si spezza fra le due parole evidenziate.
    title: "Costruiamo il sistema\u00a0IA che manca alla tua azienda.",
    highlight: ["sistema\u00a0IA"],
    lead: "Prima ascoltiamo come lavori, poi lo costruiamo su misura. E i sistemi che costruiamo funzionano già, ogni giorno, per i nostri clienti.",
    cta: "Raccontaci il tuo caso",
    ctaSecondary: "Scopri i sistemi",
  },

  categories: {
    title: "Un sistema per ogni area della tua azienda",
    lead: "Parti dall'area in cui perdi più tempo.",
    journeyLabel: "Animazione: dal primo contatto al cliente, con i sistemi Automis al lavoro",
    items: [
      { slug: "marketing", title: "Sistemi IA per il Marketing", line: "Ads, SEO, contenuti e recensioni." },
      { slug: "sales", title: "Sistemi IA per la Vendita", line: "Ogni contatto riceve risposta." },
      { slug: "support", title: "Sistemi IA per l'Assistenza", line: "Chiamate e chat, a ogni ora." },
      { slug: "admin", title: "Sistemi IA per l'Amministrazione", line: "Documenti e dati in automatico." },
      { slug: "company-brain", title: "Company Brain", line: "Tutto ciò che sa la tua azienda, a portata di tutti." },
    ],
  },

  cases: {
    eyebrow: "Casi studio",
    title: "Cosa hanno ottenuto i nostri clienti",
    lead: "Ogni numero con il suo periodo.",
    approxWord: "circa",
    readCase: "Leggi il caso studio",
    items: [
      {
        key: "clinica",
        stat: "872",
        statLabel: "chiamate in sette mesi",
        client: "Clínica Santa Maria dos Olivais",
        meta: "Clinica dentale · Lisbona, PT",
        tag: "Segretaria IA",
        result: "Un assistente vocale sul telefono della clinica: 872 chiamate in sette mesi e 114 appuntamenti presi.",
        href: "/use-cases/clinica-santa-maria",
      },
      {
        key: "adifesa",
        stat: "2.329",
        statLabel: "conversazioni dal 1/5 al 16/9/2026",
        client: "ADifesa",
        meta: "Associazione di tutela bancaria e finanziaria · Lissone, Italia",
        tag: "Automazione Meta",
        result: "Commenti e messaggi su Facebook e Instagram, gestiti e qualificati: 2.329 conversazioni dal 1/5 al 16/9/2026.",
        href: "/use-cases/adifesa",
      },
      {
        key: "album",
        stat: "280",
        approx: true,
        statLabel: "foto scelte da 1.200–1.800 scatti",
        client: "Un fotografo professionista",
        meta: "Fotografia professionale",
        tag: "Strumento per album",
        result: "Lo strumento sceglie circa 280 foto tra le 1.200 e le 1.800 scattate a un evento, poi impagina l'album.",
        href: "/use-cases/album-ai",
      },
      {
        key: "datura",
        stat: "10",
        statLabel: "guasti trovati in 28 giorni",
        client: "Datura Clothing",
        meta: "E-commerce di abbigliamento",
        tag: "Presidio e campagne",
        result: "Controlliamo il negozio e gestiamo le campagne Meta: 10 guasti distinti trovati in 28 giorni, 100 inserzioni create in 6 settimane, 46 andate in onda.",
        href: "/use-cases/datura-clothing",
      },
    ],
  },
};
