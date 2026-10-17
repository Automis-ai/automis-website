/* Caso Datura Clothing (PT, pt-PT). Stessa struttura e stessi numeri dell'IT (fonte), come «AI WooCommerce Manager» (14/10/2026).
   In pagina niente date: solo durate e «nos últimos 4 meses». Numeri dalla raccolta fatti del cliente e dal registro dei lavori;
   i 20 minuti per la scheda di un prodotto e i 5 per tutto il catalogo sono dichiarati dal negozio, non misurati. Niente ore risparmiate misurate, niente fatturato.
   Percorso: /use-cases/datura-clothing (stesso slug in tutte le lingue). Scritta pensando in portoghese europeo; descrizione prodotto tradotta dall'italiano del negozio. */
export default {
  meta: {
    title: "Datura Clothing: 10 falhas encontradas em 28 dias | Automis",
    description:
      "Uma IA vigia a loja WooCommerce dia e noite e melhora os anúncios Meta: 10 falhas encontradas em 28 dias, 100 anúncios criados em 6 semanas.",
  },

  hero: {
    eyebrow: "Caso de estudo",
    title: "AI WooCommerce Manager: um só sistema para toda a loja",
    highlight: "AI WooCommerce Manager:",
    titleLogo: { word: "WooCommerce", src: "/assets/images/logos/woocommerce-mark-white.svg", alt: "WooCommerce" },
    lead: "Uma loja de roupa que funciona sozinha. Nos últimos quatro meses, a IA assumiu a vigilância dia e noite, tornou o catálogo mais rápido e fez os anúncios render mais.",
    client: "Datura Clothing",
    logo: "/assets/images/client-logos/datura-clothing-white.png",
  },

  presidio: {
    eyebrow: "1 · Vigilância",
    title: "A loja fica de pé mesmo quando ninguém a está a ver",
    lead: "Uma loja online avaria sem fazer barulho. Aqui, uma IA vigia-a dia e noite, encontra os erros, resolve-os e só lhe escreve quando é preciso.",
    ops: {
      title: "Vigilância",
      live: "sempre ligada",
      ariaLabel: "A vigilância verifica a loja e resolve cinco erros, um após outro.",
      checksLabel: "O que verifica",
      checks: ["Tarefas programadas", "Ligação ao Instagram", "Página inicial e páginas", "Catálogo da Meta", "Pagamentos", "Atualizações de plugins"],
      tags: { found: "Encontrado", fix: "Intervenção", done: "Resolvido" },
      incidents: [
        {
          name: "Tarefas programadas",
          figure: "23",
          unit: "dias",
          title: "As tarefas programadas estavam paradas",
          found: "313 eventos em 318 estavam em atraso.",
          fix: "Uma verificação externa volta a pôr o ciclo a andar de 10 em 10 minutos. Todas as noites, uma segunda verificação confirma se o trabalho foi mesmo feito, e não apenas se a página responde.",
          done: "Atraso recuperado. Se voltar a parar, chega um aviso.",
        },
        {
          name: "Ligação ao Instagram",
          figure: "37",
          unit: "dias",
          title: "A ligação ao Instagram tinha expirado",
          found: "A montra do site ainda mostrava as publicações de maio.",
          fix: "Um novo acesso, ligado ao site, que não expira.",
          done: "Ligação renovada. Já não expira.",
        },
        {
          name: "Página inicial e páginas",
          figure: "111",
          unit: "erros num só dia",
          title: "As rajadas da Meta deitavam o site abaixo",
          found: "O site respondia com erro 503 e ia abaixo.",
          fix: "As páginas mais pedidas servem-se a partir da cache, também ao crawler da Meta.",
          done: "Passados dois dias, zero erros.",
        },
        {
          name: "Catálogo da Meta",
          figure: "2×",
          unit: "o preço real",
          title: "O catálogo publicava os preços inteiros",
          found: "Algumas peças do outlet apareciam nos anúncios ao dobro do preço real.",
          fix: "O preço com desconto entra no catálogo, que todas as noites se regenera e se verifica.",
          done: "Os preços dos anúncios são os do site.",
        },
        {
          name: "Pagamentos",
          figure: "28",
          unit: "compras a prestações perdidas",
          title: "Ninguém escrevia a quem deixava o pagamento a meio",
          found: "Em quatro meses, 28 compras a prestações perdidas porque o pagamento ficou a meio. Nenhum email aos clientes.",
          fix: "Cada pagamento cancelado a tempo envia um email com as peças ainda disponíveis e uma ligação que as volta a pôr no carrinho.",
          done: "Ativo. Resultados ainda por medir.",
        },
      ],
    },
  },

  catalog: {
    eyebrow: "2 · Catálogo",
    title: "Da fotografia à ficha online, muito mais depressa",
    lead: "A IA otimiza as fotografias e escreve a descrição de cada produto a partir da fotografia. Os prompts escrevemo-los nós: a loja usa-os e carrega o resultado no site.",
    steps: {
      photo: { n: "1 · Fotografia", title: "Fotografias otimizadas", ready: "Fotografia pronta", alt: "Pullover Camionneur Full Zip, fotografia do produto" },
      desc: {
        n: "2 · Descrição",
        title: "Todos os detalhes do produto",
        label: "Escrita pela IA",
        lines: [
          "Pullover em viscose com trabalho de canelado, que dá profundidade e carácter à malha. ",
          "A gola camionneur pode usar-se subida ou aberta, e o fecho que percorre toda a frente permite vesti-lo também como alternativa ao casaco de malha. ",
          "A viscose dá à malha um toque macio e uma queda fluida, agradável de vestir e fácil de combinar no dia a dia.",
        ],
        chips: ["Como se veste", "Com o que combina", "Composição"],
      },
      card: { n: "3 · Ficha", title: "Online no site", name: "Pullover Camionneur Full Zip", site: "daturaclothing.it", status: "Publicada" },
    },
    time: {
      title: "Quanto tempo demora",
      before: { label: "Antes", figure: "20 min", pre: "para escrever a ficha de", strong: "um só produto" },
      after: { label: "Agora", figure: "5 min", pre: "para escrever as fichas de", strong: "todo o catálogo" },
    },
  },

  ads: {
    eyebrow: "3 · Anúncios",
    title: "Análises mais precisas, conceitos novos, campanhas que partem do catálogo",
    lead: "A IA lê os números, propõe o que mudar e prepara os criativos. As campanhas só se ligam depois do aval de uma pessoa.",
    analysis: {
      n: "Análise",
      title: "O que dizem os dados",
      lead: "Duas leituras diferentes, uma só pergunta: o que compensa promover hoje?",
      past: {
        tag: "Criativos anteriores",
        title: "Cada criativo tem a sua função",
        lines: [
          "Os carrosséis de catálogo vendem e não criam público. As publicações orgânicas patrocinadas criam público e não vendem.",
          "Avaliá-los todos pelo retorno desligaria a máquina que alimenta o perfil. O retorno verdadeiro calcula-se sobre a faturação da loja, não sobre o número que a Meta declara.",
        ],
        matrix: {
          cols: ["Vendem", "Criam público"],
          rows: [
            { name: "Carrosséis de catálogo", v: [true, false] },
            { name: "Publicações orgânicas patrocinadas", v: [false, true] },
          ],
        },
        costTitle: "Custo de um seguidor",
        cost: [
          { label: "Publicações patrocinadas", text: "1,45 €", w: "6%" },
          { label: "Campanhas de vendas", text: "de 8 a 26 €", w: "100%" },
        ],
      },
      dynamic: {
        tag: "Grupos dinâmicos",
        title: "Os produtos entram e saem sozinhos",
        lines: [
          "Um grupo de produtos dinâmico enche-se e esvazia-se sozinho: uma peça entra nos anúncios quando tem os tamanhos certos e sai quando acabam.",
          "A disponibilidade lê-se nos tamanhos, não no produto. Com um só tamanho disponível, o produto continua a aparecer como disponível e os anúncios continuam a pagar: aconteceu com um fato que tinha 3 tamanhos disponíveis em 66 e era o primeiro em visitas vindas dos anúncios.",
        ],
        group: {
          chip: "Grupo dinâmico",
          name: "Novidades disponíveis",
          tag: "exemplo ilustrativo",
          inLabel: "Nos anúncios",
          outLabel: "Fora",
          unit: "tamanhos disponíveis",
          rows: [
            { name: "Pullover Camionneur Full Zip", text: "5 de 5", pct: 100 },
            { name: "Giacca Cardigan Con Tasche", cycle: true, text: "5 de 5", textLow: "1 de 5" },
            { name: "Abito Blu", text: "3 de 66", pct: 5, out: true },
            { name: "Pullover Full Zip Cappuccio", text: "5 de 5", pct: 100 },
          ],
        },
      },
    },
    concepts: {
      n: "Conceitos",
      title: "Uma série de conceitos criativos novos",
      ariaLabel: "Uma série de conceitos criativos para os anúncios: jeans, fatos, medidas, a marca.",
      images: [
        { src: "/media/use-cases/datura/concepts/jeans-toru.jpg", alt: "Conceito: Jeans Toru Lavaggio Zero", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/jeans-misura.jpg", alt: "Conceito: a boca dos jeans, 22 centímetros", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/jeans-moodboard.jpg", alt: "Moodboard dos jeans: as imagens do vídeo", w: 900, h: 352 },
        { src: "/media/use-cases/datura/ad-camionneur.jpg", alt: "Conceito: Pullover Camionneur Full Zip", w: 640, h: 640 },
        { src: "/media/use-cases/datura/concepts/abito-gessato.jpg", alt: "Conceito: Abito Gessato Blu", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/abito-revers.jpg", alt: "Conceito: a lapela do Abito Blu, 12 centímetros", w: 520, h: 650 },
        { src: "/media/use-cases/datura/ad-cappuccio.jpg", alt: "Conceito: pullover Full Zip com capuz", w: 640, h: 640 },
        { src: "/media/use-cases/datura/concepts/abito-herringbone.jpg", alt: "Conceito: Abito Herringbone Terra", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/marchio-dieci-anni.jpg", alt: "Conceito: um fato que vai usar daqui a dez anos", w: 520, h: 650 },
      ],
    },
    campaigns: {
      n: "Campanhas",
      title: "Campanhas a partir do catálogo",
      items: [
        { figure: "4", label: "campanhas" },
        { figure: "100", label: "anúncios criados", bar: 100 },
        { figure: "46", label: "foram para o ar", bar: 46 },
      ],
      note: "Em seis semanas. O retorno das campanhas mais recentes ainda não o avaliamos.",
    },
  },

  numbers: {
    eyebrow: "Em números",
    title: "Nos últimos 4 meses",
    label: "Os números do caso",
    items: [
      { figure: "10", label: "falhas distintas encontradas", basis: "em 28 dias" },
      { figure: "100", label: "anúncios criados em 4 campanhas, 46 foram para o ar", basis: "em 6 semanas" },
      { figure: "19", label: "atualizações de plugins verificadas uma a uma, todas sem problemas", basis: "em 4 dias" },
    ],
    product: { label: "O produto por trás do caso: AI E-commerce Manager", href: "/ecommerce" },
  },

  site: {
    eyebrow: "O site",
    title: "Refeito de alto a baixo",
    lead: "Nestes meses refizemos também o site.",
    items: [
      { title: "Grafismo", line: "Um aspeto novo, construído sobre a identidade da marca. Aqui, a nova ficha de produto." },
      { title: "Menu", line: "Nove entradas: tipos de peça, novidades e outlet. Quem procura encontra logo a categoria certa." },
      { title: "Checkout", line: "Um processo de compra melhorado." },
    ],
    shots: {
      menu: { src: "/media/use-cases/datura/sito-menu.jpg", alt: "O novo menu do site da Datura Clothing, com o submenu de malhas aberto" },
      phone: { src: "/media/use-cases/datura/sito-scheda-telefono.jpg", alt: "A nova ficha de produto no telemóvel: Pullover Camionneur Full Zip" },
    },
  },

  cta: {
    title: "Quer também um colaborador de IA que vigie o seu site 24 horas por dia e o ajude a otimizá-lo constantemente?",
    line: "",
  },
};
