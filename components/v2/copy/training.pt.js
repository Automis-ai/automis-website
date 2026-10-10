/* Formação (PT, pt-PT). Contenuto deciso da Luca il 10/10: come integrare Claude o ChatGPT nei flussi
   di lavoro dell'azienda (agenti, second brain), oppure, più semplicemente, come usare l'IA nei
   processi di tutti i giorni. Nessun prezzo; formato e durata non decisi, quindi non scritti.
   In fondo, la sezione breve sulla conformità: art. 4 del Regolamento (UE) 2024/1689 NEL TESTO
   IN VIGORE, cioè come sostituito dal Regolamento (UE) 2026/1744 (in vigore dal 27/7/2026), con la
   terminologia della versione portoghese ufficiale su EUR-Lex («literacia no domínio da IA»,
   «responsáveis pela implantação»). Il testo originale del 2024 («garantir um nível suficiente»)
   non vale più. Scritta dagli intenti, non tradotta dall'inglese. */
export default {
  meta: {
    title: "Formação em IA para Equipas: Claude e ChatGPT | Automis",
    description:
      "Formação prática para usar o Claude ou o ChatGPT no trabalho de todos os dias da empresa, dos usos simples aos agentes e ao second brain.",
  },

  hero: {
    eyebrow: "Formação",
    title: "Faça da IA parte do trabalho da sua empresa",
    lead: "Formação prática para usar o Claude ou o ChatGPT no dia a dia, dos usos simples aos agentes e ao second brain.",
    map: {
      ariaLabel: "Dos usos de todos os dias aos processos da empresa",
      from: {
        label: "Todos os dias",
        chips: ["Escrever", "Resumir", "Pesquisar", "Preparar documentos"],
      },
      to: {
        label: "Nos processos da empresa",
        chips: ["Agentes", "Second brain"],
      },
    },
  },

  paths: {
    title: "Duas formas de começar",
    moreLabel: "O que vemos",
    items: [
      {
        id: "everyday",
        title: "A IA no trabalho de todos os dias",
        line: "Formas simples de usar o Claude ou o ChatGPT nas tarefas que repete todos os dias.",
        more: "Escrever, resumir, pesquisar, preparar documentos. Partimos das suas próprias tarefas, não de uma visita guiada à ferramenta.",
      },
      {
        id: "workflows",
        title: "A IA nos fluxos de trabalho da empresa",
        line: "Levar o Claude ou o ChatGPT para os seus processos, como agentes e como second brain.",
        more: "Como dar a um assistente os documentos e as ferramentas da empresa, o que pode fazer sozinho e onde uma pessoa verifica.",
      },
    ],
  },

  audience: {
    title: "A quem se destina",
    items: [
      "Empresários e gestores que querem perceber onde a IA ajuda mesmo.",
      "Equipas que já usam ChatGPT ou Claude e querem usá-los melhor.",
      "Empresas que querem a IA dentro dos processos, com regras claras.",
    ],
  },

  compliance: {
    eyebrow: "AI Act",
    badge: "Artigo 4.º",
    moreLabel: "O que diz o artigo",
    title: "Ajudamos a empresa a cumprir as regras da IA",
    line: "O artigo 4.º do Regulamento da IA da UE pede às empresas que usam IA que promovam a literacia no domínio da IA do seu pessoal. A formação é um caminho.",
    more: "Os prestadores e os responsáveis pela implantação de sistemas de IA adotam medidas para promover a literacia no domínio da IA do seu pessoal e de outras pessoas envolvidas na operação e utilização desses sistemas em seu nome, tendo em conta conhecimentos técnicos, experiência, educação e formação, o contexto de utilização e as pessoas visadas. A obrigação não exige que se garanta um nível específico de literacia a ninguém. É o texto em vigor desde 27 de julho de 2026, introduzido pelo Regulamento (UE) 2026/1744. Informação geral, não aconselhamento jurídico.",
    sourceLabel: "Ler o Regulamento no EUR-Lex",
    sourceHref: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/por",
  },

  cta: {
    title: "O que faria a sua equipa com IA?",
    line: "Fale-nos da sua equipa e do trabalho que faz todos os dias.",
    button: "Fale-nos da sua equipa",
  },
};
