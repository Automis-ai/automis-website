/* Home v2 (PT, pt-PT), giro 2. Ordine di Luca (§13 del brief):
   hero centrata, categorie (con l'animazione «journey» sotto il titolo), come lavoriamo, casi studio,
   Opportunity Finder, founder, call in fondo.
   «Come lavoriamo», Finder, founder e call sono i componenti originali del sito: portano i loro testi.
   Qui stanno hero, categorie e casi. Scritta pensando in portoghese europeo, non tradotta dall'inglese.
   I percorsi dei link sono senza prefisso di lingua. */
export default {
  meta: {
    title: "Automis | Agência de IA para Marketing, Vendas e Administração",
    description:
      "Ouvimos como funciona o seu negócio e construímos os sistemas de automação com IA que lhe faltam: marketing, vendas, apoio ao cliente, administração e RH.",
  },

  hero: {
    eyebrow: "Agência de IA",
    title: "Construímos os sistemas que faltam ao seu negócio.",
    highlight: ["sistemas"],
    lead: "Primeiro ouvimos como trabalha. Depois construímos à sua medida, com sistemas que já estão a trabalhar todos os dias para os nossos clientes.",
    cta: "Conte-nos o seu caso",
    ctaSecondary: "Ver os sistemas",
  },

  categories: {
    title: "Um sistema para cada área do seu negócio",
    lead: "Comece pela área onde perde mais tempo.",
    journeyLabel: "Animação: do primeiro contacto ao cliente, com os sistemas da Automis em ação",
    items: [
      { slug: "marketing", title: "Sistemas de IA para Marketing", line: "Anúncios, conteúdos e avaliações." },
      { slug: "sales", title: "Sistemas de IA para Vendas", line: "Cada contacto recebe resposta." },
      { slug: "support", title: "Sistemas de IA para Apoio ao Cliente", line: "Chamadas e chats, a toda a hora." },
      { slug: "admin", title: "Sistemas de IA para Administração", line: "Documentos e dados a cargo do sistema." },
      { slug: "company-brain", title: "Company Brain", line: "Um arquivo privado para os novos colegas." },
    ],
  },

  cases: {
    eyebrow: "Casos de estudo",
    title: "O que os nossos clientes conseguiram",
    lead: "Cada número com o seu período.",
    approxWord: "cerca de",
    readCase: "Ler o caso de estudo",
    items: [
      {
        key: "clinica",
        stat: "872",
        statLabel: "chamadas em sete meses",
        client: "Clínica Santa Maria dos Olivais",
        meta: "Clínica dentária · Lisboa, PT",
        tag: "Rececionista de voz IA",
        result: "Um assistente de voz no telefone da clínica: 872 chamadas em sete meses e 114 marcações.",
        href: "/use-cases/clinica-santa-maria",
      },
      {
        key: "adifesa",
        stat: "2.329",
        statLabel: "conversas de 1/5 a 16/9/2026",
        client: "ADifesa",
        meta: "Associação de tutela bancária e financeira · Lissone, IT",
        tag: "Automação Meta",
        result: "Comentários e mensagens no Facebook e no Instagram, tratados e qualificados: 2.329 conversas de 1/5 a 16/9/2026.",
        href: "/use-cases/adifesa",
      },
      {
        key: "album",
        stat: "280",
        approx: true,
        statLabel: "fotografias escolhidas entre 1.200 e 1.800",
        client: "Um fotógrafo profissional",
        meta: "Fotografia profissional",
        tag: "Ferramenta de álbuns",
        result: "De 1.200 a 1.800 fotografias de um evento, escolhe cerca de 280 e faz a paginação do álbum.",
        href: "/use-cases/album-ai",
      },
      {
        key: "datura",
        stat: "10",
        statLabel: "falhas encontradas em 28 dias",
        client: "Datura Clothing",
        meta: "Loja online de vestuário",
        tag: "Monitorização e campanhas",
        result: "Monitorizamos a loja e gerimos as campanhas Meta: 10 falhas distintas encontradas em 28 dias, 100 anúncios criados em 6 semanas, 46 foram para o ar.",
        href: "/use-cases/datura-clothing",
      },
    ],
  },
};
