/* Home v2 (PT, pt-PT). Sette sezioni, nell'ordine della §6 del brief:
   hero, proof, categories, how, cases, finder (il componente esistente porta i suoi testi), chiusura (founders, guarantee, faq, book).
   Scritta dagli intenti (scheda dei messaggi), non tradotta dall'inglese.
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
    ctaSecondary: "Ver casos reais",
    call: {
      title: "Chamada de demonstração",
      status: "Oiça como atende",
      play: "Ouvir a chamada",
      pause: "Pausar",
      replay: "Ouvir de novo",
      agent: "Automis",
      caller: "Cliente",
      transcript: "Ler a conversa",
      note: "Demonstração com vozes de exemplo.",
      aria: "Chamada de demonstração: um assistente de voz marca uma consulta",
      lines: [
        "Automis, boa noite. Em que posso ajudar?",
        "Boa noite. Queria marcar uma consulta.",
        "Com certeza. Tenho uma vaga na quinta-feira, às dez e meia. Fica-lhe bem?",
        "Sim, é perfeito.",
        "Combinado. Acabei de lhe enviar um SMS com a confirmação. Mais alguma coisa?",
        "Não, muito obrigado.",
        "De nada. Tenha uma excelente noite!",
      ],
    },
  },

  proof: {
    label: "Já a trabalhar para",
    figure: "872",
    figureLabel: "chamadas atendidas pelo assistente de voz numa clínica dentária de Lisboa, em sete meses",
  },

  categories: {
    title: "Sistemas para cada parte do seu negócio",
    lead: "Comece pela área onde perde mais tempo.",
    items: [
      { slug: "marketing", title: "Sistemas de Marketing" },
      { slug: "sales", title: "Sistemas de Vendas" },
      { slug: "support", title: "Sistemas de Apoio ao Cliente" },
      { slug: "admin", title: "Sistemas de Administração" },
      { slug: "hr", title: "Sistemas de Recursos Humanos" },
    ],
    cta: "Ver todos os sistemas",
  },

  how: {
    title: "Como trabalhamos",
    steps: [
      { title: "Ouvir e diagnosticar", line: "Percebemos como trabalha e onde se perde tempo." },
      { title: "Desenhar e lançar", line: "Construímos à sua medida. Testa antes de arrancar." },
      { title: "Gerir e melhorar", line: "Acompanhamos o sistema e melhoramo-lo todos os meses." },
    ],
    cta: "Ver como trabalhamos",
  },

  cases: {
    title: "Sistemas já a trabalhar",
    items: [
      {
        slug: "clinica-santa-maria",
        client: "Clínica Santa Maria dos Olivais",
        tag: "Rececionista de voz IA",
        system: "Um assistente de voz atende e marca as consultas.",
        figure: "872",
        figureLabel: "chamadas em sete meses",
        cta: "Ler o caso",
        href: "/use-cases/clinica-santa-maria",
      },
      {
        slug: "adifesa",
        client: "ADifesa",
        tag: "Automação Meta",
        system: "Uma automação responde no Facebook e Instagram e recolhe os dados de cada pessoa.",
        figure: "2.329",
        figureLabel: "conversas em cinco meses",
        cta: "Ler o caso",
        href: "/use-cases/adifesa",
      },
    ],
    all: "Ver todos os casos",
  },


  founders: {
    title: "Dois fundadores que põem as mãos na massa",
    line: "Quem desenha o seu sistema é quem o constrói.",
    items: [
      { name: "Vincenzo Luca Casillo", role: "Crescimento e marketing orientados por IA" },
      { name: "Arcangelo Bianco", role: "Automação de IA e auditoria" },
    ],
  },

  guarantee: {
    title: "A nossa garantia",
    line: "Garantia de desempenho de 30 dias em todos os planos Voice AI.",
  },

  faq: {
    title: "Respostas diretas",
    items: [
      {
        q: "Em quanto tempo fica a funcionar?",
        a: "A Voice AI e as automações simples ficam a funcionar em cerca de 7 dias. Nos sistemas complexos, combinamos consigo os prazos antes de começar.",
      },
      {
        q: "Quanto custa?",
        a: "A Voice AI custa a partir de 297 €/mês. Tudo o resto é orçamentado depois de ouvirmos como trabalha, porque construímos sobre os seus processos e não sobre um pacote standard.",
      },
      {
        q: "Os meus dados estão seguros?",
        a: "Trabalhamos alinhados com o RGPD desde o início. Os dados podem ficar em servidores na UE, os casos delicados passam para uma pessoa, e antes de começar dizemos-lhe que fornecedores tratam o quê e onde.",
      },
      {
        q: "Preciso de pessoal técnico?",
        a: "Não. Somos nós que construímos, ativamos e mantemos o sistema. O que entregamos é seu, não uma caixa negra alugada.",
      },
      {
        q: "O que acontece depois do lançamento?",
        a: "Não desaparecemos. Todos os meses vemos como o sistema está a correr e melhoramo-lo, com uma pessoa a supervisionar.",
      },
      {
        q: "E se não funcionar para nós?",
        a: "Todos os planos Voice AI têm garantia de desempenho de 30 dias, e os projetos à medida com custo de configuração preveem o reembolso desse custo. O risco do primeiro passo é nosso.",
      },
    ],
  },

  book: {
    title: "Conte-nos como funciona o seu negócio",
    lead: "Trinta minutos, sem compromisso. Ouvimos e depois dizemos-lhe por onde começaríamos.",
  },
};
