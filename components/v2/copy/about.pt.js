/* Sobre nós (PT, pt-PT): founder, garanzia, privacy. Testi ripresi dalla pagina About pubblicata
   (components/about/*, app/pt-site/about), senza le cifre non verificate (CAC e ROAS).
   Link social e foto restano nel codice. Scritta dagli intenti, non tradotta dall'inglese. */
export default {
  meta: {
    title: "Sobre a Automis | Dois Fundadores em Cada Projeto de IA",
    description:
      "A Automis é uma agência de IA liderada pelos fundadores. Conheça quem desenha, constrói e lança os sistemas que faltam ao seu negócio.",
  },

  hero: {
    eyebrow: "Sobre nós",
    title: "Dois fundadores, a trabalhar no seu projeto",
    lead: "A Automis é um integrador estratégico de IA. Quem desenha o seu sistema é quem o constrói.",
    accent: "Dois fundadores",
  },

  founders: {
    title: "Os fundadores",
    profileLabel: "{name} no {network}",
    items: [
      {
        name: "Vincenzo Luca Casillo",
        role: "Crescimento e marketing orientados por IA",
        line: "Gere anúncios com IA no Meta e Google, SEO e funnels que transformam atenção em procura.",
        more: "Alia à aquisição paga um follow-up orientado por IA, para que o tráfego que gera nunca arrefeça. Os clientes recebem um motor de marketing que traz procura real e qualificada, não métricas de vaidade.",
      },
      {
        name: "Arcangelo Bianco",
        role: "Automação de IA e auditoria",
        line: "Trabalha em todas as camadas de um projeto de IA, dos agentes à medida aos second brains.",
        more: "Entra num negócio, mapeia onde se perdem tempo e dinheiro e identifica os processos prontos para automatizar: a tarefa repetitiva, a passagem de testemunho lenta, o follow-up que nunca acontece.",
      },
    ],
  },

  principles: {
    title: "Como construímos",
    items: [
      {
        title: "Sistemas que são seus",
        line: "O que construímos é seu. Sem caixa negra, sem ficar preso a nós.",
        more: "Quando terminamos, a infraestrutura é sua. Não há nenhuma subscrição cujo interior não consiga ver.",
      },
      {
        title: "Privacidade primeiro",
        line: "Cumprimos o RGPD desde o primeiro dia, com alojamento na UE para os dados sensíveis.",
        more: "Os dados sensíveis podem ficar em servidores na UE. Parte do processamento de IA é feita com fornecedores fora da UE, ao abrigo de cláusulas contratuais-tipo. Antes de começar, dizemos-lhe quem faz o quê.",
      },
      {
        title: "Uma pessoa no processo",
        line: "A IA trata do volume, as pessoas das nuances.",
        more: "Os casos complexos ou delicados chegam diretamente à sua equipa, para que nada de importante se perca na automação.",
      },
    ],
  },

  guarantee: {
    title: "A nossa garantia",
    number: "30",
    unit: "dias",
    line: "Garantia de desempenho de 30 dias em todos os planos Voice AI e reembolso da configuração nos projetos à medida que a incluem.",
  },

  cta: {
    title: "Conte-nos como funciona o seu negócio",
    line: "Começamos por ouvir. Depois dizemos-lhe por onde partiríamos para construir.",
  },
};
