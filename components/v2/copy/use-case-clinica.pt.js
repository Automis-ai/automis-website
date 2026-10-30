/* Caso Clínica Santa Maria dos Olivais (PT, pt-PT). Mesmas chaves, mesmos factos e mesmas cifras de use-case-clinica.it.js (a fonte de verdade).
   Janela dos dados: de 1 de fevereiro a 9 de setembro de 2026 (as chamadas de novembro a janeiro eram testes da Automis e não contam).
   Metadados e JSON-LD (com as FAQ) vêm de components/use-cases/clinica/meta.js, locale "pt"; as FAQ abaixo são palavra por palavra
   as desse schema. */
export default {
  ui: {
    read: "Ler o caso",
    book: "Marcar uma chamada",
    keyTag: "Em sete meses",
    keyTitle: "primeiras consultas de implantes",
    sep: ".",
  },

  hero: {
    eyebrow: "Caso de estudo",
    title: "7 meses ao telefone de uma clínica dentária",
    highlight: "7 meses",
    lead: "Até 30 de outubro: 1.211 chamadas, 148 marcações e 702 chamadas resolvidas pelo assistente sem passar pela rececionista. Abaixo, os primeiros sete meses em detalhe.",
    client: "Clínica Santa Maria dos Olivais",
    logo: "/assets/images/client-logos/clinica-santa-maria.png",
  },

  start: {
    eyebrow: "1 · O ponto de partida",
    title: "Numa clínica dentária, o telefone é tudo",
    lead: "Quem liga e não é atendido muitas vezes não volta a ligar e tenta o dentista seguinte.",
    cards: [
      { figure: "6", label: "dentistas", line: "Cada um com as suas especialidades e os seus dias." },
      { figure: "1", label: "rececionista sozinha", line: "Uma só, para seis dentistas." },
      { figure: "Uma dezena", label: "de chamadas perdidas por dia", line: "É a estimativa da clínica: antes ninguém as contava." },
    ],
    trust: {
      tag: "O verdadeiro obstáculo",
      title: "A diretora não confiava em pôr uma inteligência artificial ao telefone com os seus pacientes",
      lines: ["E não lhe faltava razão: se o assistente se engana, quem fica mal é ela."],
    },
  },

  trust: {
    eyebrow: "2 · A confiança",
    title: "Começámos pequeno, depois a diretora passou a confiar",
    lead: "Não tentámos convencê-la com uma apresentação.",
    chart: {
      title: "Chamadas por mês",
      total: "872 no total",
      ariaLabel: "Chamadas recebidas pelo assistente em cada mês de 2026: fevereiro 81, março 45, abril 50, maio 34, junho 154, julho 168, agosto 275, setembro 65 (até ao dia 9).",
      months: [
        { label: "fev", value: 81 },
        { label: "mar", value: 45 },
        { label: "abr", value: 50 },
        { label: "mai", value: 34 },
        { label: "jun", value: 154 },
        { label: "jul", value: 168 },
        { label: "ago", value: 275 },
        { label: "set", value: 65 },
      ],
      markAt: 4,
      mark: "Junho · Google Maps",
      year: "2026",
      note: "Setembro até ao dia 9.",
    },
    phases: [
      {
        tag: "De fevereiro a maio",
        title: "Só o número dos anúncios",
        line: "Quem liga para esse número já viu a publicidade e sabe o que procura. Se alguma coisa corresse mal, desligávamo-lo numa tarde sem que ninguém na clínica desse por isso.",
      },
      {
        tag: "Desde junho",
        title: "O número no Google Maps",
        line: "A diretora entregou tudo ao sistema: o número do assistente foi para o Google Maps, o número que encontra quem procura a clínica.",
      },
    ],
    note: "Em maio o assistente atendia 34 chamadas por mês. Em agosto, 275. Não ficou oito vezes melhor: mudou o número para onde as pessoas ligam.",
  },

  numbers: {
    eyebrow: "Em números",
    title: "De 1 de fevereiro a 9 de setembro de 2026",
    lead: "Dados de produção.",
    label: "Os números do caso",
    items: [
      { figure: "872", label: "chamadas recebidas pelo assistente", basis: "em sete meses" },
      { figure: "527", label: "resolvidas pelo assistente, sem passar pela rececionista", basis: "60% das chamadas" },
      { figure: "114", label: "marcações feitas", basis: "todas na agenda" },
    ],
    split: {
      title: "Para onde foram as 872 chamadas",
      parts: [
        { value: 527, label: "Resolvidas pelo assistente", pct: "60%" },
        { value: 223, label: "Passadas à rececionista", pct: "26%" },
        { value: 122, label: "Desligadas nos primeiros 10 segundos", pct: "14%" },
      ],
    },
    more: [
      { figure: "193", label: "chegaram fora de horas ou com outra chamada a decorrer", basis: "22%" },
      { figure: "385", label: "pessoas diferentes com quem falou" },
      { figure: "1 min 37 s", label: "duração média de uma conversa" },
      { figure: "20,2", label: "horas de telefone tratadas" },
    ],
  },

  languages: {
    eyebrow: "As línguas",
    title: "Seis línguas, e muda sozinho",
    lead: "Lisboa é uma capital multicultural, e só o português não chega para quem liga.",
    chips: ["Português europeu", "Inglês", "Italiano", "Espanhol", "Francês", "Alemão"],
    chipsNote: "E outras línguas, se for preciso.",
    steps: [
      { n: "1", title: "Começa em português", line: "A chamada começa sempre em português." },
      { n: "2", title: "Muda logo", line: "Se quem liga passa para outra língua, ou a pede, o assistente muda de língua logo na resposta seguinte." },
      { n: "3", title: "Sem fazer barulho", line: "Não o anuncia, não pede autorização e não passa a chamada a ninguém." },
    ],
  },

  agenda: {
    eyebrow: "A agenda",
    title: "Encontrar um horário livre já era um trabalho",
    lead: "Seis dentistas, e nenhum a tempo inteiro. Trabalham em meios dias e cada um faz coisas diferentes.",
    week: {
      title: "Quem está e quando",
      ariaLabel: "Dias da semana em que existe cada tratamento: ortodontia à quarta-feira, dentista das crianças à terça, desvitalizações à terça, à quinta e à sexta, implantologia à segunda, à terça, à quinta e à sexta.",
      days: ["seg", "ter", "qua", "qui", "sex"],
      rows: [
        { name: "Ortodontia", on: [2] },
        { name: "Dentista das crianças", on: [1] },
        { name: "Desvitalizações", on: [1, 3, 4] },
        { name: "Implantologia", on: [0, 1, 3, 4] },
      ],
      note: "De segunda a sexta, todos em meios dias. A implantologia segue os horários da diretora.",
    },
    match: {
      title: "Têm de coincidir quatro coisas",
      lead: "Alguns tratamentos existem num só dia da semana. Para encontrar o primeiro horário livre não basta olhar para a agenda.",
      items: ["O tratamento", "O dentista que o faz", "O dia em que esse dentista está", "Uma hora ainda livre"],
    },
    words: {
      tag: "Antes disso",
      title: "Perceber do que se fala",
      lines: [
        "Ao telefone ninguém diz «endodontia»: diz que tem dores, que lhe caiu uma coroa, que quer o aparelho ou uma limpeza.",
        "Os tipos de tratamento são vinte e um, e têm de ser reconhecidos pela forma como as pessoas falam, porque é essa palavra que decide a que dentista se vai.",
      ],
      figure: "21",
      figureLabel: "tipos de tratamento",
    },
    search: {
      tag: "Como procura um horário",
      title: "Duas horas de cada vez, e depois para",
      steps: [
        "Propõe sempre duas horas: nunca uma só, nunca uma lista.",
        "Se não servirem, procura outras duas mais à frente, e nunca repete as que já foram recusadas.",
        "Se a agenda devolver as mesmas horas, horas anteriores ou nada, considera isso uma falha lógica e para ao fim de duas tentativas.",
        "A partir daí não insiste: dentro do horário passa a chamada à rececionista, fora de horas propõe ligar de volta.",
      ],
      note: "Um sistema que interroga uma agenda cheia até encontrar alguma coisa é facílimo de escrever, e é o pior de pôr ao telefone.",
    },
  },

  urgent: {
    eyebrow: "As urgências",
    title: "Onde é preciso dizer uma coisa incómoda",
    lead: "A clínica trabalha só por marcação e não tem vagas para urgências.",
    case: {
      tag: "Dores fortes, dente partido, inchaço, hemorragia",
      title: "Não promete nada",
      line: "Quando o assistente percebe que quem liga tem uma urgência, reconhece-o numa frase e explica que a primeira vaga tanto pode ser amanhã como daqui a uma semana.",
    },
    ways: [
      { n: "A", title: "O primeiro horário livre", line: "O assistente propõe o primeiro horário livre." },
      { n: "B", title: "A rececionista", line: "Se a clínica estiver aberta, a chamada passa para ela." },
    ],
    note: "Prometer uma vaga imediata a quem tem dores é fácil de programar e impossível de cumprir. É a diferença entre uma demonstração e um sistema a trabalhar há sete meses.",
  },

  call: {
    eyebrow: "3 · Uma chamada",
    title: "Uma chamada real, do pedido à marcação",
    lead: "Uma chamada de junho, anonimizada e encurtada. O assistente percebe o que é preciso, encontra a vaga certa e propõe duas horas.",
    tag: "Chamada real, anonimizada",
    live: "Uma chamada",
    ariaLabel: "Uma chamada real: uma pessoa pede uma limpeza dentária para sábado, o assistente pergunta se já é paciente, recolhe nome e telefone, propõe duas horas e marca a consulta.",
    lines: [
      { who: "p", text: "Queria marcar uma limpeza para o próximo sábado." },
      { who: "a", text: "Claro, posso ajudá-lo a marcar uma limpeza dentária. É a sua primeira consulta connosco ou já é nosso paciente?" },
      { who: "p", text: "Chamo-me [[João Silva]]." },
      { who: "a", text: "Obrigado. Pode dizer-me o seu número de telefone, por favor?" },
      { who: "p", text: "[[+351 957 41]] 847" },
      { who: "a", text: "Vou verificar a disponibilidade para sábado. Tenho vaga para uma limpeza dentária com a doutora no sábado, 6 de junho, às dez ou às onze. Alguma destas horas lhe serve?" },
      { who: "p", text: "Sim, às dez serve." },
      { who: "a", text: "A sua limpeza dentária fica marcada para sábado, 6 de junho, às dez da manhã, com a doutora. Posso ajudar em mais alguma coisa?" },
    ],
    who: { p: "Quem liga", a: "Assistente" },
    checksLabel: "Têm de coincidir quatro coisas",
    checks: ["O tratamento", "O dentista que o faz", "O dia em que esse dentista está", "Uma hora ainda livre"],
    checkAt: [1, 5.4, 5.8, 6.2],
    done: "Na agenda",
  },

  detail: {
    eyebrow: "Em detalhe",
    title: "Os bastidores, para quem os quer ver",
    lead: "As línguas, a agenda dos dentistas e as urgências.",
  },

  handoff: {
    eyebrow: "4 · A rececionista",
    title: "Uma chamada em quatro passa à rececionista",
    lead: "223 em 872. O assistente não passa a chamada a quem a pede: primeiro pergunta o motivo, e se for uma coisa que sabe resolver tenta resolvê-la. Só a passa se a pessoa insistir.",
    table: {
      title: "Porque passa a chamada",
      rows: [
        { label: "Insiste em falar com uma pessoa, depois de o assistente ter tentado", value: 111 },
        { label: "Limpeza de implantes: por regra da clínica só a receção marca", value: 26 },
        { label: "Não quer que a chamada seja gravada", value: 25 },
        { label: "Urgência ou dores", value: 21 },
        { label: "Motivo não classificável", value: 40 },
      ],
      note: "A classificação é automática, feita sobre os resumos das chamadas: deve ser lida como indicativa.",
    },
    own: {
      tag: "Tudo o resto",
      title: "Trata sozinho",
      line: "Incluindo cancelar e remarcar uma consulta, que normalmente se pensa terem de passar por uma pessoa.",
    },
    hidden: {
      tag: "Um caso que não se consegue contar",
      line: "O assistente propõe horas, a pessoa recusa-as uma a uma, e ao fim de algumas tentativas a chamada passa à rececionista. Nos resumos aparece demasiado poucas vezes para lhe dar um número.",
    },
  },

  mistakes: {
    eyebrow: "5 · Os erros",
    title: "O que corremos mal, e corrigimos",
    lead: "Se contássemos só o que correu bem, era publicidade.",
    tags: { found: "O problema", fix: "Como acabou" },
    items: [
      {
        title: "«Avaliação» era demasiado vaga",
        found: "A palavra no menu das marcações era demasiado vaga, e o assistente marcava com o dentista errado.",
        fix: "Demos por isso à segunda reclamação e corrigimo-la.",
      },
      {
        title: "Uma frase tranquilizadora que levantava dúvidas",
        found: "Quando alguém pedia para falar com uma pessoa, a frase com que o assistente o tranquilizava dizia que era uma inteligência artificial, e levantava exatamente a dúvida que queria tirar.",
        fix: "Reescrevemo-la de forma neutra.",
      },
      {
        title: "Uma atualização à terceira tentativa",
        found: "A última atualização entrou à terceira tentativa.",
        fix: "As duas primeiras foram chumbadas pelos testes, antes de chegarem a chamadas reais.",
      },
    ],
  },

  estimate: {
    eyebrow: "6 · As contas a preço de tabela",
    title: "Quanto valem, a preço de tabela",
    lead: "Estes são os preços de tabela da clínica, aplicados ao que o assistente registou: em cada marcação, o tratamento e se o paciente era novo. A faturação que daí resulta é calculada, por isso é presumida: a verdadeira só a clínica a conhece.",
    max: 57000,
    steps: [
      { label: "Marcações feitas, a preço de tabela", value: 5200, text: "5.200 €" },
      { label: "Tratamentos pedidos pelos pacientes novos", value: 1400, text: "+1.400 €" },
      { label: "Implantes, na hipótese de metade das 23 primeiras consultas virar tratamento", value: 25400, text: "+25.400 €" },
    ],
    total: { label: "Total a preço de tabela em sete meses", value: 32000, text: "cerca de 32.000 €" },
    ceiling: "Se todas as consultas de implantes virassem tratamento: cerca de 57.000 €",
    note: "Contas sobre a tabela de preços da clínica. As consultas de implantes valem a média dos tratamentos do programa da clínica, cerca de 2.200 € cada: de 745 € por um implante unitário a 4.800 € por uma arcada completa. Primeira consulta dos pacientes novos a 20 €, e não foram descontadas as faltas. A parte dos implantes depende de quantas consultas viram tratamento, e é a única hipótese da conta.",
    key: {
      figure: "23",
      label: "primeiras consultas de implantes em sete meses",
      line: "Para nós é o número que mais conta. É a parte mais cara da tabela, e basta que uma vire uma arcada completa para valer quase 5.000 euros.",
    },
  },

  faq: {
    eyebrow: "Perguntas frequentes",
    title: "O que mais nos perguntam",
    items: [
      {
        q: "Quantas chamadas tratou o assistente de voz?",
        a: "De 1 de fevereiro a 9 de setembro de 2026 atendeu 872 chamadas: 527 ficaram resolvidas sem passar pela receção, 223 passaram à rececionista e 122 foram desligadas nos primeiros 10 segundos. As marcações feitas são 114.",
      },
      {
        q: "Em que línguas atende?",
        a: "Pode atender em português europeu, inglês, italiano, espanhol, francês e alemão, e noutras línguas, se for preciso. A chamada começa em português e, se quem liga usar outra língua, o assistente muda na resposta seguinte, sem passar a chamada a ninguém.",
      },
      {
        q: "O que faz se um paciente ligar com uma urgência?",
        a: "A clínica não tem vagas para urgências, e o assistente não promete nenhuma. Reconhece o problema, explica que a primeira vaga tanto pode ser amanhã como daqui a uma semana e propõe o primeiro horário livre ou a receção, se a clínica estiver aberta.",
      },
      {
        q: "Quando passa a chamada a uma pessoa?",
        a: "Quando quem liga insiste em falar com uma pessoa depois de o assistente ter tentado resolver, para limpezas de implantes, quando alguém não quer a chamada gravada e nas urgências. Aconteceu em 223 chamadas em 872.",
      },
      {
        q: "Por onde vale a pena começar com um assistente de voz?",
        a: "Para nós por uma linha só, como fizemos aqui com o número dos anúncios: se alguma coisa correr mal desliga-se numa tarde, e se resultar alarga-se.",
      },
    ],
  },

  cta: {
    title: "Tem uma clínica ou um consultório? Vamos ver por que parte do telefone começar",
    line: "Trinta minutos, e dizemos-lhe por onde começaríamos.",
    more: { text: "Se quiser perceber como trabalha antes de falarmos,", label: "aqui fica como funciona o assistente de voz", href: "/voice-ai" },
  },
};
