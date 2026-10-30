/* Indice dei casi studio (PT, pt-PT). Quattro casi: Clínica Santa Maria, ADifesa, Album AI, Datura Clothing.
   I numeri sono solo quelli della §3 del brief, con la loro base. Le sintesi di Clínica e ADifesa
   riprendono parola per parola quelle già online in components/use-cases/cases.js (campo pt).
   Album AI: solo cosa fa il sistema, nessun nome. */
export default {
  meta: {
    title: "Casos de Estudo: Sistemas de IA em Negócios Reais | Automis",
    description:
      "Sistemas de IA a trabalhar: assistente de voz numa clínica dentária, automação Meta, álbuns para um fotógrafo e uma loja online vigiada.",
  },

  hero: {
    eyebrow: "Casos de estudo",
    title: "Sistemas a trabalhar em negócios reais",
    highlight: "negócios reais",
    lead: "O que mudou em cada negócio, com números reais.",
  },

  items: [
    {
      slug: "clinica-santa-maria",
      client: "Clínica Santa Maria dos Olivais",
      tag: "Rececionista de voz IA",
      title: "7 meses ao telefone de uma clínica dentária",
      figure: "0",
      figureLabel: "chamadas enviadas para o voicemail em nove meses",
      href: "/use-cases/clinica-santa-maria",
    },
    {
      slug: "adifesa",
      client: "ADifesa",
      tag: "Automação Meta",
      title: "Comentários e mensagens no Facebook e no Instagram",
      figure: "4 horas",
      figureLabel: "por dia devolvidas à equipa",
      href: "/use-cases/adifesa",
    },
    {
      slug: "album-ai",
      client: "Estúdio fotográfico Simone Casillo",
      tag: "Album AI",
      title: "Album AI: as fotografias escolhidas, o álbum paginado",
      figure: "1 hora",
      figureLabel: "por álbum, não 4 a 5",
      href: "/use-cases/album-ai",
    },
    {
      slug: "datura-clothing",
      client: "Datura Clothing",
      tag: "AI WooCommerce Manager",
      title: "Um só sistema para toda a loja",
      figure: "5 min",
      figureLabel: "para as fichas de todo o catálogo, quando uma só demorava 20",
      href: "/use-cases/datura-clothing",
    },
  ],

  cta: {
    title: "Como seria o seu caso?",
    line: "Conte-nos o seu negócio e dizemos-lhe por onde começaríamos.",
  },
};
