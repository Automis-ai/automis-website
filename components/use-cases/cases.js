/*
  Shared case-study data for the use-cases list + detail pages.
  Two live Automis clients. Clínica Santa Maria now carries production figures
  (aggregates only: no caller, patient or calendar data ever leaves the client's
  systems); Adifesa's metrics are still conservative, clearly-labeled estimates.
  Keep this the single source of truth for both /use-cases and /use-cases/[slug].

  A case with `longForm: true` has its own written page and is rendered by a
  dedicated component instead of the shared challenge/solution/results template,
  so it only needs the list-card fields here (see components/use-cases/clinica).

  Localization: each case carries an `it` (Italian) and `pt` (European
  Portuguese) object with the translated version of every user-facing field.
  Non-translatable logic keys (slug, client, shortClient, logo) stay
  language-neutral. Use getCases(locale) / getCase(slug, locale);
  localize() shallow-merges the matching locale object over the base object
  for locale === "it" or "pt".
*/

export const CASES = [
  {
    slug: "clinica-santa-maria",
    client: "Clínica Dentária Santa Maria dos Olivais",
    shortClient: "Clínica Santa Maria dos Olivais",
    industry: "Dental clinic",
    location: "Lisbon, Portugal",
    tag: "Voice AI receptionist",
    logo: "/assets/images/client-logos/clinica-santa-maria.png",
    // Written case study with production figures: rendered by ClinicaStory, not the template.
    longForm: true,
    summary:
      "872 calls in seven months, 527 closed without reaching the front desk and 114 appointments booked. What changed month by month, once the clinic started trusting it.",
    headline: "7 months on a dental clinic's phone line",
    metaDescription:
      "872 calls, 527 closed without reaching the front desk and 114 appointments: how a voice assistant answers the phone at a Lisbon dental clinic.",
    it: {
      industry: "Clinica dentale",
      location: "Lisbona, Portogallo",
      tag: "Segretaria IA",
      summary:
        "872 chiamate in sette mesi, 527 chiuse senza passare dalla segretaria e 114 appuntamenti presi. Cosa è cambiato mese per mese, da quando la clinica si è fidata.",
      headline: "7 mesi al telefono di una clinica dentale",
      metaDescription:
        "872 chiamate, 527 chiuse senza passare dalla segretaria e 114 appuntamenti: come un assistente vocale risponde al telefono di una clinica dentale a Lisbona.",
    },
    pt: {
      industry: "Clínica dentária",
      location: "Lisboa, Portugal",
      tag: "Assistente de voz IA",
      summary:
        "872 chamadas em sete meses, 527 resolvidas sem passar pela receção e 114 marcações. O que mudou mês a mês, desde que a clínica passou a confiar.",
      headline: "7 meses ao telefone de uma clínica dentária",
      metaDescription:
        "872 chamadas, 527 resolvidas sem passar pela receção e 114 marcações: como um assistente de voz atende o telefone de uma clínica dentária em Lisboa.",
    },
  },
  {
    slug: "adifesa",
    client: "Adifesa",
    shortClient: "Adifesa",
    industry: "Finance - cessione del quinto",
    location: "Italy",
    tag: "Meta automation",
    logo: "/assets/images/client-logos/adifesa.png",
    summary:
      "Meta automation that auto-replies to every Facebook and Instagram comment and DM, qualifies the interest, and routes clean leads to the sales team.",
    headline:
      "Every Facebook and Instagram lead answered and qualified, automatically.",
    metaDescription:
      "Meta automation for an Italian finance business: auto-replies to every Facebook and Instagram comment and DM, qualifies interest, routes clean leads.",
    challenge: {
      lead: "A finance business running salary-backed loan campaigns on Meta was drowning in comments and DMs.",
      points: [
        "High-volume ad comments and direct messages arrived faster than the team could reply, and slow replies lose warm leads.",
        "Genuine loan enquiries were buried in a noisy inbox alongside spam and off-topic messages.",
        "No consistent way to qualify interest before a human stepped in, so the sales team spent time on unready contacts.",
      ],
    },
    solution: {
      lead: "We built an Automis Meta automation that meets every prospect the moment they engage.",
      points: [
        "Automatic replies to Facebook and Instagram comments and DMs, in the brand's voice.",
        "Lead qualification that gathers the key details for a cessione del quinto enquiry.",
        "Clean routing of qualified leads to the sales team, out of the noisy public inbox.",
        "A steady, organized flow of leads instead of a manual scramble under each ad.",
      ],
    },
    results: {
      lead: "Figures below are conservative estimates from comparable Meta automation deployments. Actual results vary with ad spend, audience, and setup.",
      metrics: [
        { value: "<30s", label: "average response to a new comment or DM (estimate)" },
        { value: "24/7", label: "coverage, so no lead waits for office hours" },
        { value: "100%", label: "of inbound comments and DMs answered automatically" },
      ],
    },
    quote:
      "Leads are captured and qualified before anyone lifts a finger, and the sales team only sees the ones worth a call.",
    quoteAttribution: "Client story - quote placeholder, pending approval",
    it: {
      industry: "Finanza, cessione del quinto",
      location: "Monza, Italia",
      tag: "Automazione Meta",
      summary:
        "Automazione Meta che risponde in automatico a ogni commento e DM su Facebook e Instagram, qualifica l'interesse e smista i contatti puliti al team commerciale.",
      headline:
        "Ogni contatto da Facebook e Instagram gestito e qualificato, in automatico.",
      metaDescription:
        "Automazione Meta per una finanziaria italiana: risponde a ogni commento e DM su Facebook e Instagram, qualifica l'interesse e smista i contatti.",
      challenge: {
        lead: "Un'azienda finanziaria che gestiva campagne di cessione del quinto su Meta era sommersa da commenti e DM.",
        points: [
          "Commenti agli annunci e messaggi diretti arrivavano in gran volume, più in fretta di quanto il team riuscisse a rispondere, e le risposte lente fanno perdere i contatti caldi.",
          "Le richieste di finanziamento reali finivano sepolte in una casella rumorosa, insieme a spam e messaggi fuori tema.",
          "Nessun modo coerente di qualificare l'interesse prima dell'intervento di una persona, così il team commerciale perdeva tempo su contatti non pronti.",
        ],
      },
      solution: {
        lead: "Abbiamo costruito un'automazione Meta di Automis che intercetta ogni potenziale cliente nel momento in cui interagisce.",
        points: [
          "Risposte automatiche ai commenti e ai DM su Facebook e Instagram, con il tono dell'azienda.",
          "Qualificazione dei contatti che raccoglie i dati chiave per una richiesta di cessione del quinto.",
          "Smistamento pulito dei contatti qualificati al team commerciale, fuori dalla casella pubblica rumorosa.",
          "Un flusso di contatti costante e organizzato, invece della corsa manuale sotto ogni annuncio.",
        ],
      },
      results: {
        lead: "I dati qui sotto sono stime prudenti basate su implementazioni comparabili di automazione Meta. I risultati reali variano in base a budget pubblicitario, pubblico e configurazione.",
        metrics: [
          { value: "<30s", label: "risposta media a un nuovo commento o DM (stima)" },
          { value: "24/7", label: "copertura, così nessun contatto aspetta gli orari d'ufficio" },
          { value: "100%", label: "dei commenti e DM in entrata gestiti in automatico" },
        ],
      },
      quote:
        "I contatti vengono raccolti e qualificati prima ancora di muovere un dito, e il team commerciale vede solo quelli che meritano una call.",
      quoteAttribution: "Storia del cliente, citazione provvisoria in attesa di approvazione",
    },
    pt: {
      industry: "Finanças, cessione del quinto",
      location: "Monza, Itália",
      tag: "Automação Meta",
      summary:
        "Automação Meta que responde automaticamente a cada comentário e DM no Facebook e no Instagram, qualifica o interesse e encaminha os contactos qualificados para a equipa comercial.",
      headline:
        "Todos os contactos do Facebook e do Instagram atendidos e qualificados, automaticamente.",
      metaDescription:
        "Automação Meta para uma financeira italiana: responde a cada comentário e DM no Facebook e no Instagram, qualifica e encaminha os contactos.",
      challenge: {
        lead: "Uma empresa financeira que geria campanhas de crédito com garantia salarial na Meta estava a afogar-se em comentários e DMs.",
        points: [
          "Os comentários aos anúncios e as mensagens diretas chegavam em grande volume, mais depressa do que a equipa conseguia responder, e as respostas lentas fazem perder os contactos mais quentes.",
          "Os pedidos de crédito genuínos ficavam soterrados numa caixa de entrada ruidosa, ao lado de spam e mensagens fora do tema.",
          "Não havia uma forma consistente de qualificar o interesse antes de uma pessoa intervir, por isso a equipa comercial perdia tempo com contactos que ainda não estavam prontos.",
        ],
      },
      solution: {
        lead: "Construímos uma automação Meta da Automis que aborda cada potencial cliente no momento em que este interage.",
        points: [
          "Respostas automáticas aos comentários e DMs no Facebook e no Instagram, com o tom da marca.",
          "Qualificação dos contactos que reúne os dados essenciais para um pedido de cessione del quinto.",
          "Encaminhamento limpo dos contactos qualificados para a equipa comercial, fora da caixa de entrada pública ruidosa.",
          "Um fluxo de contactos constante e organizado, em vez da correria manual por baixo de cada anúncio.",
        ],
      },
      results: {
        lead: "Os dados abaixo são estimativas prudentes baseadas em implementações comparáveis de automação Meta. Os resultados reais variam consoante o investimento em anúncios, o público e a configuração.",
        metrics: [
          { value: "<30s", label: "resposta média a um novo comentário ou DM (estimativa)" },
          { value: "24/7", label: "cobertura, para que nenhum contacto espere pelo horário de expediente" },
          { value: "100%", label: "dos comentários e DMs recebidos atendidos automaticamente" },
        ],
      },
      quote:
        "Os contactos são captados e qualificados antes de alguém mexer um dedo, e a equipa comercial só vê aqueles que valem uma chamada.",
      quoteAttribution: "História de cliente, citação provisória a aguardar aprovação",
    },
  },
];

function localize(c, locale) {
  if (locale === "it") return { ...c, ...c.it };
  if (locale === "pt") return { ...c, ...c.pt };
  return c;
}

export function getCases(locale) {
  return CASES.map((c) => localize(c, locale));
}

export function getCase(slug, locale) {
  const c = CASES.find((x) => x.slug === slug);
  return c ? localize(c, locale) : undefined;
}
