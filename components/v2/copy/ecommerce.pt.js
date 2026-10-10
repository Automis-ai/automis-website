/* AI E-commerce Manager (PT, pt-PT). Prodotto dei Sistemi di Marketing: la pagina descrive il prodotto e
   porta, per piattaforma, alle due landing già fatte (solo in italiano, servite come file statici).
   Moduli e angolo per piattaforma ripresi dalle landing, senza le promesse da non ripetere.
   Nessun prezzo finché Luca non decide il «da». Percorsi senza prefisso di lingua, tranne le due landing.
   Scritta dagli intenti, non tradotta dall'inglese. */
export default {
  meta: {
    title: "AI E-commerce Manager para Shopify e WooCommerce | Automis",
    description:
      "Agentes de IA que acompanham a sua loja online dia e noite: anúncios, clientes, catálogo e receitas. Escolha a plataforma, Shopify ou WooCommerce.",
  },

  hero: {
    eyebrow: "Sistemas de Marketing",
    title: "AI E-commerce Manager",
    lead: "Agentes de IA que vigiam a sua loja online dia e noite e só lhe escrevem quando é preciso.",
    cta: "Escolha a plataforma",
    visual: {
      title: "A sua loja, esta noite",
      caption: "Exemplo ilustrativo.",
      rows: [
        { icon: "target", area: "Anúncios", text: "Acabou um tamanho: a paragem do anúncio está pronta.", state: "Espera pelo seu OK", tone: "wait" },
        { icon: "chat", area: "Clientes", text: "Um cliente escreve com um caso delicado.", state: "Chega até si", tone: "wait" },
        { icon: "database", area: "Catálogo", text: "Preços comparados com o que o Meta vê.", state: "Verificado", tone: "done" },
        { icon: "web", area: "Site", text: "O site continua a responder.", state: "Verificado", tone: "done" },
      ],
    },
  },

  platforms: {
    title: "Escolha a sua plataforma",
    note: "As páginas das plataformas estão escritas em italiano.",
    langTag: "Página em italiano",
    modulesSummary: "o que acompanhamos",
    items: [
      {
        id: "shopify",
        name: "Shopify",
        tagline: "Onde o Sidekick termina, começamos nós.",
        line: "Anúncios, clientes, catálogo e receitas acompanhados dia e noite.",
        modules: [
          { title: "Anúncios", line: "Todas as noites cruzamos campanhas e stock. Acabou um tamanho? A paragem do anúncio já está preparada e a confirmação é sua." },
          { title: "Clientes", line: "Respondemos no WhatsApp, Instagram e email com as suas regras. Os casos delicados chegam até si." },
          { title: "Catálogo", line: "Todas as noites comparamos catálogo, preços e disponibilidade com o que o Meta vê. As diferenças chegam com a correção já pronta." },
          { title: "Receitas", line: "Todos os meses dividimos o que cobrou na Shopify pelo que gastou em anúncios: o retorno verdadeiro, não aquele que o Meta se atribui." },
        ],
        cta: "Ver a página da Shopify",
        href: "/it/ecommerce/shopify",
      },
      {
        id: "woocommerce",
        name: "WooCommerce",
        tagline: "Quem vigia o seu WooCommerce enquanto dorme?",
        line: "Tarefas agendadas, atualizações de plugins, catálogo Meta e o próprio site, verificados sem pausas.",
        modules: [
          { title: "Tarefas agendadas", line: "Todas as noites verificamos se os emails, as atualizações do catálogo e os prazos saem mesmo." },
          { title: "Atualizações", line: "Atualizamos os plugins à noite e verificamos o site depois de cada um. Se algo se partir, volta-se atrás: decide uma regra fixa, e não uma IA." },
          { title: "Catálogo", line: "Todas as noites regeneramos o catálogo e verificamos produtos, preços e descontos." },
          { title: "Site", line: "Uma sentinela verifica continuamente se o site responde. Se parar, lemos os registos do servidor e encontramos a causa." },
        ],
        cta: "Ver a página da WooCommerce",
        href: "/it/ecommerce/woocommerce",
      },
    ],
    other: "Outra plataforma? Fale-nos da sua loja.",
  },

  control: {
    title: "A decisão é sua",
    items: [
      { title: "Regras fixas", line: "Preços, reembolsos e devoluções nunca ficam entregues a uma IA." },
      { title: "A sua aprovação", line: "Tudo o que custa dinheiro ou mexe na loja espera pelo seu OK." },
      { title: "Período de rodagem", line: "No início verificamos nós cada ação. Depois, as ações seguras passam a automáticas, uma de cada vez." },
    ],
  },

  cta: {
    title: "Fale-nos da sua loja",
    line: "Que plataforma usa e onde a loja perde tempo ou dinheiro.",
    button: "Fale-nos da loja",
  },

  legal: "Shopify e Sidekick são marcas da Shopify Inc. WooCommerce é uma marca da Automattic Inc. A Automis não é afiliada da Shopify nem da Automattic.",
};
