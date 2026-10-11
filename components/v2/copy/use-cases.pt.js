/* Indice dei casi studio (PT, pt-PT). Quattro casi: Clínica Santa Maria, ADifesa, Album AI, Datura Clothing.
   I numeri sono solo quelli della §3 del brief, con la loro base. Le sintesi di Clínica e ADifesa
   riprendono parola per parola quelle già online in components/use-cases/cases.js (campo pt).
   Album AI: solo cosa fa il sistema, nessun nome. */
export default {
  meta: {
    title: "Casos de Estudo: Sistemas de IA em Negócios Reais | Automis",
    description:
      "Um assistente de voz numa clínica dentária, uma automação no Facebook e Instagram, uma ferramenta de álbuns para um fotógrafo e a vigilância de uma loja online. O que cada um faz.",
  },

  hero: {
    eyebrow: "Casos de estudo",
    title: "Sistemas a trabalhar em negócios reais",
    highlight: "negócios reais",
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
      title: "Comentários e mensagens no Facebook e no Instagram",
      figure: "2.329",
      figureLabel: "conversas de 1/5 a 16/9/2026",
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
    {
      slug: "datura-clothing",
      client: "Datura Clothing",
      tag: "Vigilância e campanhas",
      title: "Datura Clothing: vigilância, campanhas e relatórios",
      figure: "10",
      figureLabel: "falhas encontradas em 28 dias",
      href: "/use-cases/datura-clothing",
    },
  ],

  cta: {
    title: "Como seria o seu caso?",
    line: "Conte-nos o seu negócio e dizemos-lhe por onde começaríamos.",
  },
};
