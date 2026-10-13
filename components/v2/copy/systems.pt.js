/* Sistemi v2 (PT, pt-PT): l'hub /systems e le cinque categorie /systems/<slug>.
   Il meta di primo livello è quello dell'hub; ogni categoria ha il suo meta.
   Scheda = { id, kicker, title, short, line, more, href, caseHref, price }.
   href = pagina propria della scheda (solo prodotti); caseHref = caso studio (badge «Caso real →»).
   short è la riga visibile (al massimo ~9 parole); line (cosa fa) e more (il problema) si aprono a richiesta (Disclosure). Percorsi senza prefisso di lingua.
   Scritta dagli intenti, non tradotta dall'inglese. */
export default {
  meta: {
    title: "Sistemas de IA para Marketing, Vendas e Back Office | Automis",
    description:
      "Cinco áreas onde a IA lhe tira trabalho das mãos: marketing, vendas, apoio ao cliente, administração e RH. Sistemas feitos à medida do seu negócio.",
  },

  labels: {
    more: "Ler mais",
  },

  hub: {
    hero: {
      eyebrow: "Sistemas de IA",
      title: "Os sistemas que faltam ao seu negócio",
      highlight: "que faltam",
      lead: "Escolha uma área. Cada sistema é construído sobre a forma como já trabalha.",
    },
    categories: {
      items: [
        { slug: "marketing", title: "Sistemas de IA para Marketing", line: "Anúncios, pesquisas, conteúdos, avaliações e loja online." },
        { slug: "sales", title: "Sistemas de IA para Vendas", line: "Cada contacto recebe resposta e acompanhamento." },
        { slug: "support", title: "Sistemas de IA para Apoio ao Cliente", line: "Chamadas, chats e mensagens respondidos a toda a hora." },
        { slug: "admin", title: "Sistemas de IA para Administração", line: "Documentos, dados e rotina a cargo do sistema." },
        { slug: "company-brain", title: "Company Brain", line: "Um arquivo privado para os novos colegas." },
      ],
    },
    products: {
      title: "Dois produtos para começar",
      items: [
        {
          id: "voice",
          name: "Voice AI",
          line: "Uma rececionista que atende todas as chamadas, 24/7, e trata da marcação.",
          price: "A partir de 297 €/mês",
          cta: "Ver a Voice AI",
          href: "/voice-ai",
        },
        {
          id: "ecommerce",
          name: "AI E-commerce Manager",
          line: "Agentes de IA que acompanham a sua loja online. Escolha a sua plataforma.",
          price: null,
          cta: "Ver o produto",
          href: "/ecommerce",
        },
      ],
    },
    cta: {
      title: "Não sabe por onde começar?",
      line: "Conte-nos como trabalha. Propomos-lhe os sistemas que contam para si.",
    },
  },

  marketing: {
    meta: {
      title: "Sistemas de IA para Marketing: Anúncios, SEO e Lojas Online | Automis",
      description:
        "Sistemas de IA para o seu marketing: anúncios e criativos, SEO e GEO, avaliações, conteúdos, reativação de clientes e um gestor de IA para a loja online.",
    },
    hero: {
      eyebrow: "Sistemas de IA para Marketing",
      title: "Sistemas que gerem o seu marketing",
      highlight: "o seu marketing",
      lead: "Anúncios, visibilidade nas pesquisas, conteúdos, avaliações e loja online, geridos por uma IA feita à medida do seu negócio.",
    },
    moment: {
      label: "Do primeiro anúncio às redes sociais: a cadeia do marketing",
      steps: [
        { card: "ads-creative", glyph: "target", label: "Anúncios" },
        { card: "seo-geo", glyph: "search", label: "Pesquisa" },
        { card: "reviews", glyph: "star", label: "Avaliações" },
        { card: "content-social", glyph: "pen", label: "Social" },
      ],
    },
    cards: [
      {
        id: "ads-creative",
        kicker: null,
        title: "Agente de anúncios e criativos",
        short: "Testa criativos e investe no que converte.",
        line: "Gera e testa criativos no Meta e Google e investe no que converte.",
        more: "O orçamento dos anúncios escoa-se em criativos desgastados e em campanhas que ninguém tem tempo de otimizar.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "seo-geo",
        kicker: null,
        title: "Agente de SEO e GEO",
        short: "Páginas pensadas para o Google e para a IA.",
        line: "Escreve e publica páginas para subir no Google e ser citadas pela IA.",
        more: "Os clientes já pesquisam no Google e nas respostas da IA. Sem conteúdos constantes, não aparece em nenhum dos dois.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "reviews",
        kicker: null,
        title: "Avaliações e reputação",
        short: "Pede avaliações e redige as respostas públicas.",
        line: "Pede avaliações no momento certo, envia-lhe em privado o feedback negativo e redige as respostas públicas.",
        more: "Os clientes satisfeitos raramente deixam avaliações, e a negativa de vez em quando fica sem resposta.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "content-social",
        kicker: null,
        title: "Conteúdos e redes sociais",
        short: "De um material de partida a publicações agendadas.",
        line: "Transforma um material de partida em publicações coerentes com a marca, agendadas nos seus canais.",
        more: "Publicar com regularidade é a primeira coisa a falhar quando o trabalho aperta.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "ecommerce-manager",
        kicker: null,
        title: "AI E-commerce Manager",
        short: "Agentes de IA que vigiam a loja, dia e noite.",
        line: "Agentes de IA que vigiam a loja online dia e noite. Escolha a sua plataforma.",
        more: "Alojamento, site, anúncios e email controlam cada um a sua parte. Ninguém controla a loja inteira. Este sistema controla.",
        href: "/ecommerce",
        caseHref: null,
        price: null,
      },
      {
        id: "product-listings",
        kicker: null,
        title: "Fichas de produto a partir de fotografias",
        short: "Fichas de produto escritas a partir das fotografias.",
        line: "Descrições e fichas de produto escritas a partir das fotografias dos seus produtos.",
        more: "Escrever uma página para cada produto leva tempo, e a fotografia já mostra grande parte do que a página tem de dizer.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "video-editing",
        kicker: null,
        title: "Edição de vídeo",
        short: "Do material bruto ao vídeo final, com legendas.",
        line: "Do material bruto ao vídeo final: escolhe os melhores takes, corta as pausas e põe legendas.",
        more: "Editar leva mais tempo do que filmar, e é muitas vezes o que impede de publicar vídeos.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "reactivation",
        kicker: null,
        title: "Campanhas de reativação da base de dados",
        short: "SMS e emails para fazer voltar os clientes antigos.",
        line: "Sequências de SMS e email personalizadas para fazer voltar os clientes antigos.",
        more: "A sua lista de antigos clientes é uma mina de ouro por explorar.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "animated-sites",
        kicker: "Plataformas",
        title: "Sites animados e 3D",
        short: "Sites com animação e 3D que mostram o que faz.",
        line: "Sites com animação e 3D, pensados para mostrar o seu negócio da melhor forma.",
        more: "O site é a primeira coisa que muitos clientes veem. Com movimento e 3D, percebe-se num relance o que a sua empresa faz.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: null,
    faq: {
      title: "Perguntas frequentes",
      items: [
        {
          q: "Quem trata das campanhas, vocês ou o sistema?",
          a: "O sistema faz o trabalho de todos os dias: testa criativos e passa o orçamento para os que convertem. Todos os meses revemos os resultados e melhoramo-lo, com uma pessoa a supervisionar.",
        },
        {
          q: "O que é o GEO?",
          a: "São conteúdos escritos para serem citados nas respostas do ChatGPT, do Perplexity e de ferramentas semelhantes, além de se posicionarem no Google. Ninguém pode garantir uma citação, mas trabalhamos para que os seus conteúdos estejam claros e prontos para a merecer.",
        },
        {
          q: "O AI E-commerce Manager pode mudar preços ou fazer reembolsos?",
          a: "Não. Preços, reembolsos e devoluções nunca ficam entregues a uma IA, e tudo o que custa dinheiro ou mexe na loja espera pela sua aprovação.",
        },
        {
          q: "Quanto custa?",
          a: "Orçamentamos depois de ouvirmos como trabalha, porque construímos sobre os seus processos e não sobre um pacote standard. Conte-nos o seu caso e dizemos-lhe por onde começaríamos.",
        },
      ],
    },
    cta: {
      title: "Qual destes ajudaria mais?",
      line: "Conte-nos o seu negócio e dizemos-lhe por onde começaríamos.",
    },
  },

  sales: {
    meta: {
      title: "Sistemas de IA para Vendas: CRM, Qualificação e DMs | Automis",
      description:
        "Sistemas de IA para vendas: CRM à medida, dashboards, qualificação de contactos, comentários e DMs do Instagram e Facebook no CRM, imóveis e notas de voz.",
    },
    hero: {
      eyebrow: "Sistemas de IA para Vendas",
      title: "Sistemas que acompanham cada contacto",
      highlight: "cada contacto",
      lead: "Da primeira mensagem ao CRM, os contactos recebem resposta, são qualificados e ficam registados.",
    },
    moment: {
      label: "Da mensagem ao painel: a cadeia das vendas",
      steps: [
        { card: "social-dms", glyph: "chat", label: "Mensagem" },
        { card: "lead-qualification", glyph: "sales", label: "Triagem" },
        { card: "custom-crm", glyph: "contact", label: "CRM" },
        { card: "dashboards-pipeline", glyph: "chart", label: "Painel" },
      ],
      result: { value: "2.329", unit: "conversas tratadas", src: "ADifesa · de 1/5 a 16/9/2026" },
    },
    cards: [
      {
        id: "social-dms",
        kicker: null,
        title: "Comentários e DMs do Instagram e Facebook no CRM",
        short: "Responde a comentários e DMs e atualiza o CRM.",
        line: "Responde a cada comentário e DM, qualifica o contacto e regista-o no seu CRM.",
        more: "Os contactos chegam pelos comentários e DMs das redes sociais e ficam soterrados antes de alguém lhes dar seguimento.",
        href: null,
        caseHref: "/use-cases/adifesa",
        price: null,
      },
      {
        id: "lead-qualification",
        kicker: null,
        title: "Qualificação e encaminhamento de contactos",
        short: "Avalia contactos pelos seus critérios e encaminha-os.",
        line: "Avalia cada contacto segundo os seus critérios e passa os bons à pessoa certa.",
        more: "A sua equipa perde tempo com contactos não qualificados e demora a responder aos bons.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "custom-crm",
        kicker: null,
        title: "CRM à medida",
        short: "Um CRM feito à medida da sua equipa de vendas.",
        line: "Um CRM moldado à forma como a sua equipa vende, e não o contrário.",
        more: "Contactos e clientes acabam espalhados por folhas de cálculo, caixas de email e pela memória das pessoas.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "dashboards-pipeline",
        kicker: null,
        title: "Dashboards e pipeline",
        short: "Um ecrã com cada contacto, negociação e próximo passo.",
        line: "Um ecrã com o ponto de situação de cada contacto e negociação, e os próximos passos.",
        more: "Sem uma visão clara do pipeline, os follow-ups falham e as decisões baseiam-se em palpites.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "sales-management",
        kicker: null,
        title: "Software de gestão comercial",
        short: "Gestão comercial sobre o seu processo de vendas.",
        line: "Software de gestão para o seu processo de vendas, construído sobre a forma como já vende.",
        more: "As ferramentas de prateleira obrigam a adaptar o processo a elas. Aqui, é o software que se adapta ao seu.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "property-matching",
        kicker: null,
        title: "Cruzamento de pedidos e imóveis",
        short: "Cruza cada pedido com os imóveis novos, sozinho.",
        line: "Cruza o pedido de cada comprador com os seus imóveis assim que entra um novo.",
        more: "Cruzar à mão os novos pedidos com os seus imóveis é lento e fácil de falhar.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "voice-notes",
        kicker: null,
        title: "Notas de voz no CRM",
        short: "Uma nota de voz passa a ficha no CRM.",
        line: "Grave uma nota de voz: fica transcrita, estruturada e escrita na ficha certa do CRM.",
        more: "As notas de chamadas e de visitas ficam na sua cabeça ou em papelinhos e nunca chegam ao sistema.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: {
      eyebrow: "Caso real",
      title: "ADifesa",
      line: "Comentários e DMs no Facebook e no Instagram, tratados e qualificados: 2.329 conversas de 1 de maio a 16 de setembro de 2026 e 524 fichas completas.",
      cta: "Ler o caso",
      href: "/use-cases/adifesa",
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        {
          q: "Funciona com o CRM que já uso?",
          a: "Se a sua ferramenta tiver API, ligamo-nos a ela: o HubSpot e o GoHighLevel, por exemplo. Se nenhuma servir, construímos o CRM à medida da forma como a sua equipa vende.",
        },
        {
          q: "Quem responde aos comentários e às DMs, a IA ou uma pessoa?",
          a: "A IA responde com as suas regras e escreve o contacto qualificado no CRM. Os casos delicados passam para uma pessoa da sua equipa.",
        },
        {
          q: "Os dados dos meus contactos estão seguros?",
          a: "Trabalhamos alinhados com o RGPD desde o início. Os dados podem ficar em servidores na UE e, antes de começar, dizemos-lhe que fornecedores tratam o quê e onde.",
        },
        {
          q: "Quanto custa?",
          a: "Orçamentamos depois de ouvirmos como trabalha, porque construímos sobre os seus processos e não sobre um pacote standard. Conte-nos o seu caso e dizemos-lhe por onde começaríamos.",
        },
      ],
    },
    cta: {
      title: "Onde se perdem os seus contactos?",
      line: "Diga-nos como os contactos chegam até si hoje e mostramos-lhe onde um sistema ajuda.",
    },
  },

  support: {
    meta: {
      title: "Sistemas de IA para Apoio ao Cliente: Voz, Chat e Mensagens | Automis",
      description:
        "Sistemas de IA que respondem aos seus clientes dia e noite: rececionista de voz, recuperação de chamadas perdidas, respostas 24/7 e apoio a lojas online.",
    },
    hero: {
      eyebrow: "Sistemas de IA para Apoio ao Cliente",
      title: "Sistemas que respondem aos seus clientes",
      highlight: "aos seus clientes",
      lead: "Ao telefone, no chat e por mensagem, dia e noite, com uma pessoa pronta para o que precisar dela.",
    },
    moment: {
      label: "Da chamada à resposta: a cadeia do apoio ao cliente",
      steps: [
        { card: "voice-receptionist", glyph: "voice", label: "Chamada" },
        { card: "missed-call-recovery", glyph: "phone", label: "Retorno" },
        { card: "answers-247", glyph: "clock", label: "Respostas" },
        { card: "ecommerce-support", glyph: "cart", label: "Loja" },
      ],
      result: { value: "872", unit: "chamadas", src: "Clínica Santa Maria dos Olivais · de 1/2 a 9/9/2026" },
    },
    cards: [
      {
        id: "voice-receptionist",
        kicker: null,
        title: "Rececionista de voz IA",
        short: "Atende todas as chamadas, 24/7, e trata das marcações.",
        line: "Atende cada chamada 24/7, marca e passa à equipa o que exige uma pessoa.",
        more: "As chamadas entram quando está com um cliente, fora de horas ou ao fim de semana, e acabam no voicemail.",
        href: "/voice-ai",
        caseHref: "/use-cases/clinica-santa-maria",
        price: "A partir de 297 €/mês",
      },
      {
        id: "missed-call-recovery",
        kicker: null,
        title: "Recuperação de chamadas perdidas",
        short: "A uma chamada perdida responde logo um SMS.",
        line: "Uma chamada perdida dispara um SMS que propõe ligar de volta ou um link para marcar.",
        more: "Uma chamada perdida costuma ser um cliente perdido, que liga ao negócio seguinte da lista.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "answers-247",
        kicker: null,
        title: "Respostas 24/7",
        short: "Responde logo por formulário, chat e WhatsApp.",
        line: "Responde logo aos pedidos por formulário, chat e WhatsApp, de dia e de noite, e encaminha-os.",
        more: "Quem responde primeiro costuma ficar com o cliente, mas os pedidos chegam a todas as horas.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "ecommerce-support",
        kicker: null,
        title: "Apoio ao cliente de e-commerce",
        short: "Responde no WhatsApp, Instagram e email com as suas regras.",
        line: "Responde no WhatsApp, Instagram e email segundo as suas regras. Os casos delicados passam para si.",
        more: "Os clientes escrevem onde querem, a qualquer hora, e uma loja raramente tem alguém em todos os canais.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    chat: {
      title: "Como se lê num chat",
      header: "Assistente do escritório",
      caption: "Já é tarde, e o escritório fechou há horas.",
      messages: [
        { role: "customer", text: "Boa noite, têm algum horário livre esta semana para marcar?" },
        { role: "assistant", text: "Boa noite. Sou o assistente virtual do escritório, uma IA que responde quando está fechado. Tenho quinta de manhã ou sexta à tarde. Qual prefere?" },
        { role: "customer", text: "Sexta à tarde, por favor." },
        { role: "assistant", text: "Feito, sexta à tarde fica reservada. Vai receber a confirmação por aqui. Posso ajudar em mais alguma coisa?" },
        { role: "customer", text: "Sim, queria o reembolso de uma fatura do mês passado." },
        { role: "assistant", text: "Isso precisa de uma pessoa. Já passei o pedido à equipa, com os detalhes, e respondem-lhe quando o escritório abrir." },
      ],
    },
    case: {
      eyebrow: "Caso real",
      title: "Clínica Santa Maria dos Olivais",
      line: "Um assistente de voz no telefone de uma clínica dentária: 872 chamadas de 1 de fevereiro a 9 de setembro de 2026, 527 resolvidas pelo assistente e 114 marcações.",
      cta: "Ler o caso",
      href: "/use-cases/clinica-santa-maria",
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        {
          q: "Quanto custa a rececionista de voz?",
          a: "A Voice AI custa a partir de 297 €/mês. Os outros sistemas de apoio ao cliente são orçamentados depois de ouvirmos como trabalha, sem pacotes standard.",
        },
        {
          q: "Em quanto tempo fica a funcionar?",
          a: "Cerca de 7 dias para a Voice AI e as automações simples. Nos sistemas complexos, combinamos consigo os prazos antes de começar.",
        },
        {
          q: "O que acontece com as chamadas delicadas?",
          a: "Passam para uma pessoa da sua equipa. A IA trata dos pedidos repetitivos e os casos delicados chegam até si.",
        },
        {
          q: "E se não funcionar para nós?",
          a: "Todos os planos Voice AI têm garantia de desempenho de 30 dias. O risco do primeiro passo é nosso.",
        },
      ],
    },
    cta: {
      title: "Quem atende quando não pode?",
      line: "Diga-nos onde os clientes o procuram e mostramos-lhe o que um sistema poderia assumir.",
    },
  },

  admin: {
    meta: {
      title: "Sistemas de IA para Administração: Documentos e Back Office | Automis",
      description:
        "Sistemas de IA para o back office: software de contabilidade, Scan-to-Brain para papel, receção e triagem de documentos e automação administrativa.",
    },
    hero: {
      eyebrow: "Sistemas de IA para Administração",
      title: "Sistemas que tratam do seu back office",
      highlight: "do seu back office",
      lead: "Documentos, dados e tarefas de rotina tratados pela IA, para a sua equipa se dedicar ao que importa.",
    },
    moment: {
      label: "Do documento à ficha: a cadeia da administração",
      steps: [
        { card: "document-intake", glyph: "inbox", label: "Documentos" },
        { card: "scan-to-brain", glyph: "scan", label: "Leitura" },
        { card: "accounting-software", glyph: "receipt", label: "Faturas" },
        { card: "back-office", glyph: "repeat", label: "Back office" },
      ],
    },
    cards: [
      {
        id: "accounting-software",
        kicker: null,
        title: "Software de gestão contabilística",
        short: "Contabilidade sobre as suas regras, incluindo o 74-ter.",
        line: "Contabilidade feita sobre as suas regras, como o regime de IVA italiano 74-ter das agências de viagens.",
        more: "Os regimes especiais, como o 74-ter, exigem regras que as ferramentas de contabilidade genéricas nem sempre seguem.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "scan-to-brain",
        kicker: null,
        title: "Scan-to-Brain",
        short: "Lê os documentos digitalizados e torna-os pesquisáveis.",
        line: "Lê os documentos digitalizados, extrai os campos-chave e arquiva-os como dados onde pode pesquisar.",
        more: "Formulários em papel, contratos e PDFs acumulam-se como dados onde ninguém consegue pesquisar.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "document-intake",
        kicker: null,
        title: "Receção e triagem de documentos",
        short: "Classifica, renomeia e arquiva cada documento que chega.",
        line: "Lê cada documento que chega, classifica-o, renomeia-o e envia-o para o sítio certo.",
        more: "Os documentos que chegam precisam de alguém que os abra, nomeie e arquive um a um.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "back-office",
        kicker: null,
        title: "Automação do back office",
        short: "Faturas, lembretes e fichas atualizados sozinhos.",
        line: "Trata dos fluxos de rotina: prepara faturas, envia lembretes e atualiza fichas nas suas ferramentas.",
        more: "Faturas, lembretes e atualizações de estado consomem o dia em pequenas tarefas repetitivas.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: null,
    brain: {
      title: "Pergunte aos seus documentos",
      caption: "Documentos de exemplo, já digitalizados e arquivados. Toque numa pergunta.",
      windowTitle: "Arquivo de documentos",
      sourceLabel: "Fonte",
      queries: [
        {
          q: "Quando termina o contrato de arrendamento do armazém?",
          a: "O contrato termina no fim do ano e renova-se sozinho, salvo denúncia com seis meses de antecedência.",
          sources: [{ doc: "Contrato de arrendamento do armazém", where: "Digitalização · cláusula 4, duração" }],
        },
        {
          q: "Onde arquivei a fatura do fornecedor de junho?",
          a: "Está em Faturas de fornecedores, na pasta de junho. Mudei-lhe o nome para data e fornecedor, e os dados principais estão na ficha.",
          sources: [{ doc: "Faturas de fornecedores", where: "Arquivo · junho" }],
        },
        {
          q: "O fornecedor já enviou a guia de remessa?",
          a: "Já, chegou por email esta manhã. Li-a, classifiquei-a como guia de remessa e arquivei-a com as outras.",
          sources: [{ doc: "Guias de remessa", where: "Recebidas por email" }],
        },
      ],
    },
    crossLink: {
      title: "Company Brain",
      line: "Um arquivo privado sobre os seus documentos, a que a equipa pergunta e recebe uma resposta com a fonte. Encontra-o nos Sistemas de IA para Recursos Humanos.",
      cta: "Ver o Company Brain",
      href: "/systems/company-brain",
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        {
          q: "Os meus documentos estão seguros?",
          a: "Trabalhamos alinhados com o RGPD desde o início. Os dados podem ficar em servidores na UE e, antes de começar, dizemos-lhe que fornecedores tratam o quê e onde.",
        },
        {
          q: "Funciona com documentos em papel?",
          a: "Sim. O sistema lê os documentos digitalizados, extrai os campos principais e arquiva-os como dados onde pode pesquisar.",
        },
        {
          q: "Funciona com o software que já uso?",
          a: "Se o seu software tiver API, ligamo-nos a ele. Quando as ferramentas standard não seguem as suas regras, como no regime 74-ter, construímos o software de gestão à medida.",
        },
        {
          q: "Alguém verifica o trabalho da IA?",
          a: "Sim. Uma pessoa supervisiona os resultados, os casos delicados vão para a sua equipa e todos os meses melhoramos o sistema.",
        },
      ],
    },
    cta: {
      title: "Que papelada lhe consome a semana?",
      line: "Conte-nos o que a sua equipa faz à mão. Mostramos-lhe o que um sistema poderia assumir.",
    },
  },

  "company-brain": {
    meta: {
      title: "Sistemas de IA para Recursos Humanos: Company Brain e Integração | Automis",
      description:
        "Um Company Brain privado sobre os seus documentos. Os novos colegas perguntam-lhe em vez de perguntarem a um colega, e cada resposta vem com a fonte.",
    },
    hero: {
      eyebrow: "Sistemas de IA para Recursos Humanos",
      title: "Sistemas que acompanham os novos colegas",
      highlight: "os novos colegas",
      lead: "Um arquivo privado que responde com a fonte: os novos colegas encontram sozinhos as respostas.",
    },
    cards: [
      {
        id: "company-brain",
        kicker: null,
        title: "Company Brain para a integração",
        short: "O novo colega pergunta, o Brain responde com a fonte.",
        line: "Um arquivo privado sobre os seus documentos: o novo colega pergunta e recebe a resposta com a fonte.",
        more: "A resposta a qualquer pergunta está enterrada numa pasta, numa caixa de email ou na memória de uma só pessoa.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    brain: {
      title: "Pergunte ao Brain",
      caption: "Empresa e documentos de exemplo. Toque numa pergunta.",
      placeholder: "Pergunte o que quiser sobre a empresa",
      sourceLabel: "Fonte",
      queries: [
        {
          q: "Como peço um dia de folga?",
          a: "Envie o pedido na ferramenta de RH. O responsável da equipa aprova e depois a administração confirma.",
          sources: [{ doc: "Manual do colaborador", where: "Férias e ausências" }],
        },
        {
          q: "A quem envio a fatura de um fornecedor?",
          a: "As faturas de fornecedores vão para a administração. Envie o PDF com a referência da encomenda e ela trata do resto.",
          sources: [{ doc: "Procedimentos administrativos", where: "Faturas de fornecedores" }],
        },
        {
          q: "Preciso de autorização para reembolsar um cliente?",
          a: "Até ao limite habitual, o apoio ao cliente aprova diretamente. Acima desse limite, é preciso o responsável.",
          sources: [{ doc: "Política de reembolsos", where: "Aprovações" }],
        },
      ],
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        {
          q: "De onde vêm as respostas do Brain?",
          a: "Dos documentos da sua empresa. Cada resposta indica a fonte, para o novo colega a poder confirmar.",
        },
        {
          q: "Os meus documentos ficam privados?",
          a: "Sim, o Brain é privado e trabalha sobre os seus documentos. Trabalhamos alinhados com o RGPD desde o início, os dados podem ficar em servidores na UE e, antes de começar, dizemos-lhe que fornecedores tratam o quê e onde.",
        },
        {
          q: "Preciso de pessoal técnico?",
          a: "Não. Somos nós que construímos, ativamos e mantemos o sistema. O que entregamos é seu.",
        },
        {
          q: "Quanto custa e quanto tempo demora?",
          a: "Orçamentamos depois de ouvirmos como trabalha e combinamos consigo o prazo antes de começar. Não há pacote standard.",
        },
      ],
    },
    cta: {
      title: "Tem um caso para esta área?",
      line: "Conte-nos o seu negócio e construímos um sistema à sua medida.",
    },
  },
};
