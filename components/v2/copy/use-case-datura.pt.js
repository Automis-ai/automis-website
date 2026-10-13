/* Caso Datura Clothing (PT, pt-PT). Números e janelas da ficha de factos do cliente (secções A, B, D).
   Cada número leva a sua janela. Sem horas poupadas (não houve medição), sem faturação.
   Caminho: /use-cases/datura-clothing (o mesmo slug em todas as línguas). Escrito a partir dos intentos, não traduzido. */
export default {
  meta: {
    title: "Datura Clothing: 10 falhas encontradas em 28 dias | Automis",
    description:
      "Vigilância do site, campanhas Meta, criativos e relatório mensal para uma loja online de vestuário: 10 falhas distintas encontradas em 28 dias, 100 anúncios criados em 6 semanas.",
  },

  hero: {
    eyebrow: "Caso de estudo",
    title: "Dez falhas encontradas em 28 dias na loja da Datura Clothing",
    highlight: "Dez falhas encontradas",
    lead: "Vigilância do site, campanhas Meta, criativos e relatório mensal: quatro módulos de um só sistema, com números reais e o período a que se referem.",
    client: "Datura Clothing",
    tag: "Vigilância e campanhas",
    statsLabel: "Os números deste caso",
    stats: [
      { figure: "10", label: "falhas distintas encontradas", basis: "de 13/8 a 9/9/2026, 28 dias" },
      { figure: "100", label: "anúncios criados em 4 campanhas, 46 foram para o ar", basis: "em 6 semanas, de 25/8 a 8/10/2026" },
      { figure: "19", label: "atualizações de plugins verificadas uma a uma, todas sem problemas", basis: "de 20 a 23/8/2026" },
    ],
  },

  problem: {
    eyebrow: "O problema",
    title: "Uma loja online avaria sem fazer barulho",
    lead: "Não contamos as horas poupadas, porque ninguém as mediu. Contamos há quanto tempo uma falha estava parada antes de a encontrarmos.",
    items: [
      {
        figure: "23",
        unit: "dias",
        label: "de tarefas programadas paradas",
        line: "313 eventos em 318 estavam em atraso.",
        basis: "De 20/7 a 12/8/2026",
        days: 23,
      },
      {
        figure: "37",
        unit: "dias",
        label: "com a ligação ao Instagram expirada",
        line: "A montra do site ainda mostrava as publicações de maio.",
        basis: "De 19/7 a 25/8/2026",
        days: 37,
      },
      {
        figure: "111",
        unit: "erros num só dia",
        label: "por rajadas de pedidos da Meta",
        line: "A 10/8 o site respondia com erro 503 e ia abaixo. Desde 15/8, zero.",
        basis: "De 10 a 15/8/2026",
        spikes: [
          { value: 111, label: "10/8" },
          { value: 101, label: "12/8" },
          { value: 0, label: "15/8" },
        ],
      },
    ],
    barLabel: "dias",
  },

  system: {
    eyebrow: "O sistema",
    title: "Uma loja, quatro módulos ligados",
    lead: "A vigilância olha pela loja, o feed leva-a à Meta, as campanhas partem do catálogo, o relatório conta o que aconteceu.",
    hub: "A loja",
    nodes: ["Vigilância do site", "Feed e catálogo", "Campanhas e criativos", "Relatório mensal"],
    ariaLabel: "Esquema: a loja ao centro, ligada aos quatro módulos do sistema.",
  },

  results: {
    eyebrow: "Os resultados",
    title: "Três números, cada um com a sua base",
    items: [
      {
        figure: "10",
        label: "falhas distintas encontradas em 28 dias",
        line: "De 13/8 a 9/9/2026. Para algumas, como as tarefas programadas e a montra do Instagram, juntámos uma verificação dedicada.",
      },
      {
        figure: "100",
        label: "anúncios criados em 6 semanas",
        line: "Em 4 campanhas, de 25/8 a 8/10/2026. 46 foram para o ar. Os 100 incluem testes e publicações já feitas, reutilizadas como anúncios.",
        lit: 46,
        dotsLabel: "100 anúncios, 46 foram para o ar",
      },
      {
        figure: "19",
        label: "atualizações de plugins verificadas uma a uma",
        line: "De 20 a 23/8/2026, todas sem problemas. Cada uma com cópia antes, verificação depois e reposição pronta. O site tem 39 plugins ativos.",
      },
    ],
    note: "O retorno das campanhas mais recentes ainda não o avaliamos: é cedo, e as regras para o avaliar escrevemo-las antes de as ligar.",
  },

  modules: {
    eyebrow: "O que faz cada módulo",
    title: "Quatro módulos, cada um com a sua tarefa",
    detailLabel: "Em detalhe",
    items: [
      {
        icon: "shield",
        since: "Desde 13/8",
        title: "Vigilância do site",
        line: "De 5 em 5 minutos, uma sentinela pede a página inicial. Todas as noites, às 02:30, começa uma ronda de verificações. Os plugins atualizam-se um de cada vez, com reposição se uma verificação ficar vermelha.",
        more: [
          "A sentinela distingue um site em baixo de um bloqueio da Cloudflare e lê também os picos de erros num só minuto. Só nos avisa quando algo está vermelho: o verde não envia notificações.",
          "A ronda noturna arrancou a 13/8 com 46 verificações: 25 nas páginas, abertas num browser a sério, 6 nos preços com desconto, 10 nos emails, seguidos até à caixa de entrada, 5 nas defesas contra o crawler. Desde então juntámos mais.",
          "A reposição de uma atualização dispara por uma regra escrita no código, não por um juízo de um modelo. Pagamentos e WooCommerce esperam o aval de uma pessoa.",
          "A página de produto responde ao crawler da Meta em 57 ms, em vez de 1.742 (medição de 13/8/2026).",
        ],
      },
      {
        icon: "database",
        since: "Desde 25/8",
        title: "Feed e catálogo",
        line: "Os preços com desconto chegam à Meta no feed de produtos. Desde 31/8 o feed regenera-se todas as noites às 02:30 e o resultado é verificado.",
        more: [
          "A 8/10/2026 forçámos a leitura do feed pela Meta e verificámos o resultado: 105 produtos em 105 registados.",
        ],
      },
      {
        icon: "target",
        since: "Desde 25/8",
        title: "Campanhas e criativos",
        line: "Campanhas com produtos dinâmicos do catálogo, ligadas só depois do aval de uma pessoa. Carrosséis de catálogo, imagens estáticas, vídeos e publicações já feitas passam a anúncios.",
        more: [
          "As regras para avaliar uma campanha escrevemo-las antes de a ligar.",
          "Antes de empurrar um produto, vemos que tamanhos ainda há, contados nas variantes.",
          "Os textos seguem o tom de voz da marca.",
          "100 anúncios criados de 25/8 a 8/10/2026, em 4 campanhas: 46 foram para o ar.",
        ],
      },
      {
        icon: "chart",
        since: "Desde 1/9",
        title: "Relatório mensal",
        line: "Um PDF de duas páginas para o titular: quatro números da loja, cada um com a sua comparação, as campanhas com o retorno em percentagem, os conteúdos que venderam.",
        more: [
          "O retorno calcula-se dividindo a faturação real da loja pelo gasto na Meta, e não pelo número que a Meta declara.",
          "O primeiro, o de agosto, foi gerado a 1 de setembro. Junto com o PDF, preparamos uma ficha interna para nós.",
        ],
      },
    ],
  },

  basis: {
    summary: "Como contámos",
    items: [
      "10 falhas: contagem no nosso registo de falhas, de 13/8 a 9/9/2026. Uma mesma cadeia de causas conta como uma só falha. Escrevemos «encontradas»: nem todas foram descobertas por uma verificação automática, algumas saíram de uma análise ou de uma pessoa a olhar.",
      "100 anúncios: eventos «anúncio criado» no registo de atividade da Meta, de 25/8 a 8/10/2026. Incluem testes e publicações já feitas, reutilizadas como anúncios. 46 gastaram dinheiro, e são os que foram para o ar. Das 4 campanhas, 3 foram para o ar.",
      "19 atualizações: plugins distintos, de 20 a 23/8/2026, feitas com uma pessoa da Automis a acompanhar cada passo. Não são atualizações autónomas.",
      "Horas poupadas: sem medição, por isso sem número.",
    ],
  },

  cta: {
    title: "O que se avaria na sua loja sem que ninguém veja?",
    line: "Conte-nos o seu negócio e dizemos-lhe por onde começaríamos.",
  },
};
