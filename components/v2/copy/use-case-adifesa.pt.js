/* Caso ADifesa (PT, pt-PT). Mesmas chaves, mesmos factos e mesmas cifras de use-case-adifesa.it.js (a fonte de verdade).
   Janela dos dados: de 1 de maio a 16 de setembro de 2026. O desfecho comercial (3 fichas em 10 tornam-se clientes) é um dado
   da associação, não nosso. Nenhuma faturação nem reembolsos: não são dados nossos.
   Metadados e JSON-LD (com as FAQ) vêm de components/use-cases/adifesa/meta.js, locale "pt"; as FAQ abaixo são palavra por palavra
   as desse schema. */
export default {
  ui: {
    read: "Ler o caso",
    book: "Marcar uma chamada",
    openShot: "Abrir a captura completa",
    hoursTitle: "1.377 mensagens privadas fora de horas",
    sep: ".",
  },

  hero: {
    eyebrow: "Caso de estudo",
    title: "Cinco meses nos comentários do Facebook e do Instagram",
    highlight: "Cinco meses",
    lead: "2.329 conversas tratadas e 524 fichas completas com nome, telefone e email. Dessas, 3 em cada 10 tornam-se clientes.",
    client: "Associação ADifesa",
    logo: "/assets/images/client-logos/adifesa-mark.png",
  },

  start: {
    eyebrow: "1 · O ponto de partida",
    title: "Por baixo de cada anúncio há uma fila de pessoas a perguntar",
    lead: "A ADifesa é uma associação italiana de tutela bancária e financeira, com sede em Lissone. Acompanha quem pagou custos que não devia num crédito com garantia salarial, num cartão revolving ou num empréstimo vendido com uma apólice, e tenta reaver esse dinheiro.",
    cards: [
      { tag: "Quem são", title: "Só se paga sobre o recuperado", line: "A peritagem e o recurso são gratuitos, e a comissão só chega sobre o que for recuperado. A sede fica em Lissone, na Brianza, e os processos são acompanhados em toda a Itália." },
      { tag: "O que já funcionava", title: "Os formulários preenchidos", line: "As campanhas na Meta trazem formulários preenchidos, e essa parte corria bem." },
      { tag: "O problema", title: "Tudo à volta dos formulários", line: "Por baixo de cada anúncio acumulam-se comentários, e na caixa de mensagens chegam pedidos diretos. São pessoas que contam em público uma coisa privada: quanto devem a um banco." },
    ],
    who: {
      title: "Quem escreve ali não está a passear",
      line: "Acabou de ler o anúncio e quer saber uma coisa só: se o seu caso se enquadra. Se ninguém responder durante um dia, leva essa pergunta para outro lado.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-2-messenger-apertura.png",
      alt: "Captura da caixa de mensagens da ADifesa, em italiano: o assistente responde a um comentário e pede telefone, email e horários de contacto; a pessoa responde num sábado à noite.",
      caption: "Captura real da caixa de entrada da ADifesa, em italiano. No topo é a própria Meta a declarar que a conversa nasceu de um comentário. A pessoa responde às 23:07 de um sábado e deixa telefone, email e horários de contacto. Nome, foto e contactos estão destruídos nos pixels.",
    },
  },

  flow: {
    eyebrow: "2 · Do comentário à ficha",
    title: "O que acontece depois de um comentário",
    lead: "Uma pessoa comenta sob um anúncio. A automação responde em público, abre a conversa privada e recolhe os dados de que a consultora precisa.",
    label: "O percurso, em quatro passos",
    steps: [
      { n: "1", title: "O comentário", line: "A pessoa escreve sob um anúncio ou uma publicação, no Facebook ou no Instagram." },
      { n: "2", title: "A resposta pública", line: "Depois de uma espera propositada de três minutos, a automação responde. Se o comentário tiver um número de telefone, esconde-o." },
      { n: "3", title: "A mensagem privada", line: "Em paralelo abre a conversa privada e pede telefone, email e os horários em que ligar de volta." },
      { n: "4", title: "A ficha", line: "Nome, telefone, email e produto: o que uma consultora precisa para pegar no telefone." },
    ],
  },

  detail: {
    eyebrow: "Em detalhe",
    title: "Os bastidores, para quem os quer ver",
    lead: "Os números à vista de todos, o Instagram e o custo de uma publicação viral.",
  },

  rules: {
    eyebrow: "3 · As regras",
    title: "O trabalho é perceber se o processo se enquadra",
    lead: "Responder «escreva-nos em privado» qualquer um sabe. O valor está em perceber se há caso, e as regras da associação são apertadas.",
    stats: [
      { figure: "10", label: "regras de elegibilidade ativas" },
      { figure: "5", label: "tipos de produto" },
      { figure: "11", label: "bancos e financeiras nomeados" },
    ],
    list: {
      title: "Cada regra tem as suas condições",
      lead: "Não é uma lista de palavras: cada uma tem a sua janela de anos e as suas condições.",
      rows: [
        ["Cartões revolving", "ativados entre 2000 e 2017, com uma janela mais larga para dois emitentes"],
        ["Empréstimo Compass", "de 2011 a 2020"],
        ["Empréstimo Deutsche Bank ou Findomestic", "de 2017 a 2022, acima de certo valor"],
        ["Crédito em conta", "só para empresas, com cinco anos de atividade e acima de vinte mil euros"],
        ["Perdas em investimentos", "sim"],
        ["Criptomoedas", "não"],
      ],
    },
    words: {
      title: "Antes disso, perceber do que se fala",
      lead: "Nos comentários ninguém escreve «crédito com garantia salarial renovado em 2016». Escreve como fala, e é a partir dessas palavras que o sistema tem de chegar ao produto certo, porque é o produto que decide se o caso existe.",
      pairs: [
        ["«Retêm-me um quinto do salário»", "Crédito com garantia salarial"],
        ["«Tenho um cartão que nunca mais acaba»", "Cartão revolving"],
        ["«Venderam-me um seguro junto com o empréstimo»", "Empréstimo com apólice"],
      ],
    },
  },

  numbers: {
    eyebrow: "Em números",
    title: "De 1 de maio a 16 de setembro de 2026",
    lead: "Dados de produção.",
    label: "Os números do caso",
    funnel: [
      { figure: "2.329", label: "conversas tratadas entre comentários e mensagens privadas" },
      { figure: "1.033", label: "contactos qualificados" },
      { figure: "524", label: "fichas completas: nome, telefone, email, produto" },
      { figure: "3 em 10", label: "dessas fichas torna-se cliente, com pelo menos um processo", note: "dado da associação" },
    ],
    funnelNote: "Do comentário ao processo. O último passo é um dado da associação, não nosso.",
    focus: "O primeiro número que olhamos não é o total. São as 524 fichas completas, que é o que uma consultora precisa para pegar no telefone já a saber do que se trata.",
    chart: {
      title: "Conversas por mês",
      total: "2.329 no total",
      ariaLabel: "Conversas tratadas em cada mês de 2026: maio 523, junho 470, julho 760, agosto 355, setembro 221 (até ao dia 16).",
      months: [
        { label: "mai", value: 523 },
        { label: "jun", value: 470 },
        { label: "jul", value: 760 },
        { label: "ago", value: 355 },
        { label: "set", value: 221 },
      ],
      markAt: 2,
      mark: "Julho · Instagram",
      year: "2026",
      note: "A partir de julho chegam também as mensagens diretas do Instagram. O volume acompanha as campanhas da associação, reduzidas desde agosto. Setembro até ao dia 16.",
    },
    rows: [
      ["Pessoas diferentes", "1.794"],
      ["Passadas a uma pessoa", "111 (4,8%)"],
      ["Mensagens privadas recebidas", "2.951"],
      ["Respostas privadas escritas pela automação", "1.676"],
      ["Respostas públicas sob comentários", "1.262"],
    ],
    origin: {
      title: "De onde nasceram as 2.329 conversas",
      parts: [
        { value: 1065, label: "De um comentário sob um anúncio" },
        { value: 232, label: "De um comentário sob uma publicação" },
        { value: 1032, label: "De uma mensagem direta" },
      ],
    },
  },

  hours: {
    eyebrow: "4 · Fora de horas",
    title: "Metade destas pessoas escreve com o escritório fechado",
    lead: "Das 2.951 mensagens privadas recebidas, 1.377 chegaram fora do horário de trabalho: 46,7%.",
    figure: "46,7%",
    figureLabel: "das mensagens privadas chega fora de horas",
    parts: [
      { value: 850, label: "Em dias úteis", line: "antes das nove ou depois das seis" },
      { value: 527, label: "Ao fim de semana", line: "sábado e domingo" },
    ],
    night: { value: 267, label: "entre as dez da noite e as sete da manhã" },
    line: "É o número mais fácil de subestimar em todo o projeto. Diz que quase metade dos pedidos chega quando não está lá ninguém para os ler. Chegam nas noites e nos domingos em que alguém se senta a olhar para as contas, e é exatamente aí que decide escrever.",
  },

  privacy: {
    eyebrow: "Os números à vista de todos",
    title: "Um número de telefone debaixo de uma publicação é um problema, não um contacto",
    lead: "Acontece muitas vezes: a pessoa escreve o seu número de telefone dentro do comentário, à vista de todos, e quer que lhe liguem. Entretanto aquele número é lido por quem ali passar.",
    steps: [
      { n: "1", title: "O comentário", line: "Tem um número de telefone ou um detalhe sensível." },
      { n: "2", title: "Esconde-o", line: "A automação trata-o como um incidente a fechar, não como um contacto a arrecadar." },
      { n: "3", title: "Passa para o privado", line: "A conversa segue para as mensagens privadas." },
    ],
    note: "Vale sob os anúncios e sob as publicações orgânicas, no Facebook e no Instagram.",
    wait: {
      figure: "3 minutos",
      title: "Uma espera propositada",
      line: "Sob os comentários a resposta pública chega ao fim de três minutos. Não é lentidão: uma resposta que aparece no mesmo segundo em que alguém acabou de escrever diz a toda a gente que por baixo está uma máquina.",
    },
  },

  handoff: {
    eyebrow: "5 · A pessoa",
    title: "111 conversas em 2.329 passaram para uma pessoa",
    lead: "Menos de uma em vinte. Todo o resto foi fechado pela automação sozinha.",
    figure: "4,8%",
    figureLabel: "passadas a uma pessoa",
    control: {
      tag: "O controlo fica do lado do cliente",
      title: "Desliga-se conversa a conversa",
      line: "É a parte que numa demonstração nunca se vê. A partir do painel de controlo, a associação desliga a automação numa conversa específica e continua à mão, sem tocar nas outras. A partir daí aquela conversa é dela e o bot não volta a escrever.",
    },
    fee: {
      tag: "Sobre a comissão não se dão voltas",
      title: "Responde em público",
      line: "A associação recebe, em percentagem sobre o recuperado. Nos comentários, a pergunta «quanto me custa» aparece todos os dias, muitas vezes em tom hostil. A resposta diz que a peritagem e o recurso são gratuitos e que só se paga se o reembolso chegar, e não tenta empurrar a pergunta para o privado. Num público que já ouviu promessas a mais, uma resposta evasiva vale menos do que nada.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-1-facebook-commenti.png",
      alt: "Comentários sob uma publicação da ADifesa, em italiano: a pergunta sobre o custo e a resposta pública do assistente.",
      zoom: { ratio: "779 / 330", z: 1.12, x: 100, y: 90 },
      caption: "Comentários reais sob uma publicação de 18 de setembro de 2026, em italiano. A pergunta sobre o custo aparece em público, e a resposta fica em público. Nomes e fotos estão destruídos nos pixels.",
    },
  },

  instagram: {
    eyebrow: "Instagram",
    title: "O Instagram chegou depois, e nota-se",
    lead: "O projeto nasceu no Facebook. As mensagens diretas do Instagram exigiram um passo a mais: cinco permissões para aprovação da Meta, cada uma com um vídeo demonstrativo.",
    steps: [
      { n: "Maio", title: "O primeiro envio", line: "Não passou." },
      { n: "28 de maio", title: "Cinco vídeos repetidos", line: "Com outro método, mostrando a cadeia de identidade entre o portal da Meta e o sistema. Dessa vez correu bem." },
    ],
    odd: {
      tag: "Um detalhe que vale por si",
      line: "A Meta pediu a demonstração de uma função que não existe na própria API: editar um comentário do Instagram. Pode criar-se, esconder-se ou apagar-se; editar não. A demonstração foi reescrita sobre aquilo que a API faz de facto.",
    },
    chart: {
      title: "Contactos qualificados vindos do Instagram",
      ariaLabel: "Contactos qualificados vindos do Instagram: maio 6, junho 29, julho 117, agosto 22, setembro 6 (até ao dia 16).",
      months: [
        { label: "mai", value: 6 },
        { label: "jun", value: 29 },
        { label: "jul", value: 117 },
        { label: "ago", value: 22 },
        { label: "set", value: 6 },
      ],
      note: "Setembro até ao dia 16.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-3-instagram-dm.png",
      alt: "Mensagem direta do Instagram, em italiano, com as respostas do assistente: a ficha completa-se em três respostas.",
      caption: "Mensagem direta do Instagram, 24 de agosto de 2026, em italiano. As bolhas roxas são a forma como a caixa da Meta distingue o Instagram do Messenger. A ficha completa-se em três respostas: primeiro telefone e horários, depois o email.",
    },
  },

  cost: {
    eyebrow: "O custo",
    title: "A publicação que custava dezoito dólares por dia",
    lead: "Em julho uma publicação da associação tornou-se viral da pior maneira: milhares de comentários de desabafo político, nenhum deles um caso para acompanhar.",
    problem: {
      figure: "cerca de 18 $",
      label: "por dia, a responder a ninguém",
      line: "A automação lia-os um a um e classificava-os corretamente como irrelevantes, mas para o saber tinha primeiro de chamar o modelo.",
    },
    fix: {
      tag: "A solução",
      title: "Um contador, não filtros mais apertados",
      line: "Cada publicação guarda a conta dos comentários vistos e de quantos foram spam. Passado um limite, aquela publicação fica em silêncio e os seus comentários deixam de chegar ao modelo.",
    },
    stats: [
      { figure: "257", label: "publicações seguidas, na janela observada" },
      { figure: "37", label: "silenciadas, na janela observada" },
    ],
    safe: {
      tag: "Não fica cego",
      line: "Uma publicação em silêncio deixa passar as palavras que apontam para um produto real, como o nome de uma financeira ou «crédito com garantia salarial».",
      test: "A verificação foi feita sobre comentários reais e não sobre exemplos inventados, antes de entrar em produção: nenhum caso bom perdido em trinta e cinco testados, e os dez casos bons reconhecidos todos.",
    },
  },

  mistakes: {
    eyebrow: "6 · Os erros",
    title: "O que corremos mal, e corrigimos",
    lead: "Se contássemos só o que correu bem, era publicidade.",
    tags: { found: "O problema", fix: "Como acabou" },
    items: [
      {
        title: "«Retêm-me um quinto do salário» ia para spam",
        found: "O filtro descartava quem falava de uma fração do salário, para travar os desabafos genéricos. Mas um quinto é literalmente um quinto: o principal produto da associação estava a ser confundido com ruído.",
        fix: "Corrigido.",
      },
      {
        title: "A mensagem de abertura saía duas vezes",
        found: "Alguém já em conversa, que voltava a comentar sob um anúncio, recebia um segundo «como podemos ajudar?».",
        fix: "Agora, se a conversa já está aberta, a segunda mensagem não sai.",
      },
      {
        title: "Os reels partilhados em privado faziam o bot arrancar de novo",
        found: "O Instagram envia um vídeo partilhado como mensagem sem texto, e a automação respondia a cada partilha.",
        fix: "Agora um anexo sem palavras não recebe resposta.",
      },
      {
        title: "No Instagram os contactos chamavam-se todos «Utilizador c168f1»",
        found: "O nome era lido de um campo que no Instagram não existe.",
        fix: "Corrigido, e os nomes antigos recuperados: de 33 sem nome para 4.",
      },
    ],
  },

  clients: {
    eyebrow: "7 · Os clientes",
    title: "Quantos desses contactos se tornam clientes",
    lead: "A nossa base de dados para na ficha completa. O que acontece depois, quando a consultora liga, só a associação sabe: perguntámos-lhe.",
    figure: "3 em 10",
    figureLabel: "fichas completas que se tornam clientes, com pelo menos um processo aberto",
    line: "É um número deles, que sai do sistema deles e não do nosso, e reproduzimo-lo tal como no-lo deram. Não são 30% de quem comenta: são 30% de quem chegou ao fim da conversa e deixou nome, telefone, email e produto.",
    limits: {
      tag: "O que estes números não dizem",
      lines: [
        "Não contamos o trabalho das pessoas depois da passagem de mão, porque a partir daí a conversa continua dentro das ferramentas da Meta e não no nosso sistema. E o resultado da verificação de elegibilidade não fica registado como tal: quem decide é a consultora, com os documentos na mão.",
        "Quantos reembolsos chegaram depois, e de que valores, não é um dado nosso e não entra aqui. Um caso de estudo que promete faturação sem ter o número da faturação é um anúncio disfarçado.",
      ],
    },
  },

  faq: {
    eyebrow: "Perguntas frequentes",
    title: "O que mais nos perguntam",
    items: [
      {
        q: "Quantas conversas tratou a automação?",
        a: "De 1 de maio a 16 de setembro de 2026 tratou 2.329 conversas entre comentários e mensagens privadas no Facebook e no Instagram, com 1.794 pessoas diferentes. Delas saíram 1.033 contactos qualificados e 524 fichas completas com nome, telefone e email.",
      },
      {
        q: "Responde também aos comentários públicos ou só às mensagens privadas?",
        a: "A ambos. Sob o comentário público responde depois de uma espera propositada de três minutos, e em paralelo abre a conversa privada. Na janela observada escreveu 1.262 respostas públicas e 1.676 mensagens privadas.",
      },
      {
        q: "O que acontece se alguém escrever o número de telefone num comentário?",
        a: "O comentário é escondido e a conversa passa para as mensagens privadas. Um número de telefone à vista de todos sob um anúncio é um risco para quem o escreveu, não um contacto a recolher.",
      },
      {
        q: "Quando entra uma pessoa?",
        a: "Quando o cliente decide: a partir do painel de controlo a automação é desligada naquela conversa e a equipa continua à mão. Aconteceu em 111 conversas em 2.329, menos de uma em vinte.",
      },
      {
        q: "Quantos desses contactos se tornam clientes?",
        a: "Segundo a associação, 3 em cada 10 fichas completas tornam-se clientes com pelo menos um processo aberto. É um dado deles, do sistema deles: a nossa base de dados para na ficha completa, ou seja nome, telefone, email e produto.",
      },
      {
        q: "Quanto tempo demora a montar?",
        a: "Depende de quão definidas estão as regras. A parte demorada não é o software, é pôr por escrito quando um caso se enquadra e quando não: aqui foram dez regras com janelas de anos, valores mínimos e nomes de financeiras. Para as mensagens diretas do Instagram, há que contar também com a aprovação das permissões pela Meta.",
      },
    ],
  },

  cta: {
    title: "Faz campanhas na Meta? Por baixo dos seus anúncios já há uma fila de pessoas a perguntar-lhe alguma coisa",
    line: "A questão é se as suas regras estão escritas suficientemente bem para que outra pessoa possa responder no seu lugar. Trinta minutos, e dizemos-lhe por onde começaríamos.",
    more: { text: "Se quiser perceber como trabalhamos antes de falarmos,", label: "aqui fica como construímos as automações", href: "/how-we-work" },
  },
};
