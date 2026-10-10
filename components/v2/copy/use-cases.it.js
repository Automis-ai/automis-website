/* Indice dei casi studio (IT). Tre casi: Clínica Santa Maria, ADifesa, Album AI.
   I numeri sono solo quelli della §3 del brief, con la loro base. Le sintesi di Clínica e ADifesa
   sono quelle già pubblicate in components/use-cases/cases.js. Album AI: solo cosa fa il sistema, nessun nome. */
export default {
  meta: {
    title: "Casi studio: sistemi IA al lavoro in aziende vere | Automis",
    description:
      "Un assistente vocale in una clinica dentale, un'automazione su Facebook e Instagram, uno strumento per album di un fotografo: ecco cosa fa ognuno.",
  },

  hero: {
    eyebrow: "Casi studio",
    title: "Sistemi al lavoro in aziende vere",
    lead: "Cosa fa ogni sistema, con numeri reali e il periodo a cui si riferiscono.",
  },

  items: [
    {
      slug: "clinica-santa-maria",
      client: "Clínica Santa Maria dos Olivais",
      tag: "Receptionist vocale IA",
      title: "7 mesi al telefono di una clinica dentale",
      figure: "872",
      figureLabel: "chiamate in sette mesi",
      href: "/use-cases/clinica-santa-maria",
    },
    {
      slug: "adifesa",
      client: "ADifesa",
      tag: "Automazione Meta",
      title: "Cinque mesi nei commenti di Facebook e Instagram",
      figure: "2.329",
      figureLabel: "conversazioni in cinque mesi",
      href: "/use-cases/adifesa",
    },
    {
      slug: "album-ai",
      client: "Un fotografo professionista",
      tag: "Strumento per album",
      title: "Uno strumento per album su misura",
      figure: "Circa 280",
      figureLabel: "foto scelte fra 1.200 e 1.800 scatti",
      href: "/use-cases/album-ai",
    },
  ],

  cta: {
    title: "Come sarebbe il tuo caso?",
    line: "Raccontaci la tua attività e ti diciamo da dove partiremmo.",
  },
};
