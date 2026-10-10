/* Formazione (IT). Contenuto deciso da Luca il 10/10: come integrare Claude o ChatGPT nei flussi
   di lavoro dell'azienda (agenti, second brain), oppure, più semplicemente, come usare l'IA nei
   processi di tutti i giorni. Nessun prezzo; formato e durata non decisi, quindi non scritti.
   In fondo, la sezione breve sulla conformità: art. 4 del Regolamento (UE) 2024/1689 NEL TESTO
   IN VIGORE, cioè come sostituito dall'art. 1, punto 5, del Regolamento (UE) 2026/1744 (Gazzetta
   ufficiale del 24/7/2026, in vigore dal 27/7/2026). Testo italiano letto su EUR-Lex il 10/10/2026.
   Attenzione: il testo originale del 2024 («garantire un livello sufficiente di alfabetizzazione»)
   non vale più; ora l'obbligo è «adottare misure volte a sostenere lo sviluppo» e non impone un
   livello specifico a nessuno. */
export default {
  meta: {
    title: "Formazione IA per team: Claude e ChatGPT al lavoro | Automis",
    description:
      "Formazione pratica per usare Claude o ChatGPT nel lavoro di ogni giorno della tua azienda, dagli usi semplici agli agenti e al second brain.",
  },

  hero: {
    eyebrow: "Formazione",
    title: "Fai entrare l'IA nel lavoro della tua azienda",
    lead: "Formazione pratica per usare Claude o ChatGPT nel lavoro di ogni giorno, dagli usi semplici agli agenti e al second brain.",
    map: {
      ariaLabel: "Dagli usi di ogni giorno ai processi dell'azienda",
      from: {
        label: "Ogni giorno",
        chips: ["Scrivere", "Riassumere", "Cercare", "Preparare documenti"],
      },
      to: {
        label: "Nei processi dell'azienda",
        chips: ["Agenti", "Second brain"],
      },
    },
  },

  paths: {
    title: "Due modi per partire",
    moreLabel: "Cosa vediamo",
    items: [
      {
        id: "everyday",
        title: "L'IA nel lavoro di ogni giorno",
        line: "Modi semplici per usare Claude o ChatGPT nelle attività che ripeti ogni giorno.",
        more: "Scrivere, riassumere, cercare informazioni, preparare documenti. Partiamo da quello che fai tu ogni giorno.",
      },
      {
        id: "workflows",
        title: "L'IA nei processi dell'azienda",
        line: "Come portare Claude o ChatGPT nei tuoi processi, come agenti e come second brain.",
        more: "Come dare a un assistente i documenti e gli strumenti dell'azienda, cosa può fare da solo e dove interviene una persona a controllare.",
      },
    ],
  },

  audience: {
    title: "A chi serve",
    items: [
      "Ai titolari che vogliono capire dove l'IA aiuta davvero.",
      "Ai team che usano già ChatGPT o Claude e vogliono usarli meglio.",
      "Alle aziende che vogliono l'IA nei processi, con regole chiare.",
    ],
  },

  compliance: {
    eyebrow: "AI Act",
    badge: "Articolo 4",
    moreLabel: "Cosa dice l'articolo",
    title: "Ti mettiamo in regola con la normativa sull'IA",
    line: "L'articolo 4 dell'AI Act chiede alle aziende che usano l'IA di sostenere l'alfabetizzazione in materia di IA del loro personale. La formazione è un modo per farlo.",
    more: "Fornitori e deployer di sistemi di IA adottano misure volte a sostenere lo sviluppo dell'alfabetizzazione in materia di IA del loro personale e di chi usa i sistemi per loro conto, tenendo conto di conoscenze tecniche, esperienza, istruzione e formazione, del contesto d'uso e delle persone su cui i sistemi vengono usati. L'obbligo non fissa un livello preciso da raggiungere. È il testo in vigore dal 27 luglio 2026, introdotto dal Regolamento (UE) 2026/1744. Informazione generale, non consulenza legale.",
    sourceLabel: "Leggi il Regolamento su EUR-Lex",
    sourceHref: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/ita",
  },

  cta: {
    title: "Cosa farebbe il tuo team con l'IA?",
    line: "Raccontaci del tuo team e del lavoro che fa ogni giorno.",
    button: "Raccontaci del tuo team",
  },
};
