/* Indice dei casi studio (PT, pt-PT). Tre casi: Clínica Santa Maria, ADifesa, Album AI.
   I numeri sono solo quelli della §3 del brief, con la loro base. Le sintesi di Clínica e ADifesa
   riprendono parola per parola quelle già online in components/use-cases/cases.js (campo pt).
   Album AI: solo cosa fa il sistema, nessun nome. */
export default {
  meta: {
    title: "Casos de Estudo: Sistemas de IA em Negócios Reais | Automis",
    description:
      "Um assistente de voz numa clínica dentária, uma automação no Facebook e Instagram e uma ferramenta de álbuns para um fotógrafo. O que cada um faz.",
  },

  hero: {
    eyebrow: "Casos de estudo",
    title: "Sistemas a trabalhar em negócios reais",
    lead: "O que faz cada sistema, com números reais e o período a que se referem.",
  },

  items: [
    {
      slug: "clinica-santa-maria",
      client: "Clínica Santa Maria dos Olivais",
      tag: "Rececionista de voz IA",
      title: "7 meses ao telefone de uma clínica dentária",
      figure: "872",
      figureLabel: "chamadas em sete meses",
      href: "/use-cases/clinica-santa-maria",
    },
    {
      slug: "adifesa",
      client: "ADifesa",
      tag: "Automação Meta",
      title: "Cinco meses nos comentários do Facebook e do Instagram",
      figure: "2.329",
      figureLabel: "conversas em cinco meses",
      href: "/use-cases/adifesa",
    },
    {
      slug: "album-ai",
      client: "Um fotógrafo profissional",
      tag: "Ferramenta de álbuns",
      title: "Uma ferramenta de álbuns à medida",
      figure: "Cerca de 280",
      figureLabel: "fotografias escolhidas de um total de 1.200 a 1.800",
      href: "/use-cases/album-ai",
    },
  ],

  cta: {
    title: "Como seria o seu caso?",
    line: "Conte-nos o seu negócio e dizemos-lhe por onde começaríamos.",
  },
};
