/* Caso Clínica Santa Maria dos Olivais (IT), nello stile di Datura e Album AI (14/10/2026).
   Stessi fatti e stesse cifre dell'articolo lungo (components/use-cases/clinica/story.it.js, generato dal secondo cervello,
   clients/clinica-santa-maria-olivais/case-study-site.md): qui il testo è accorciato e ogni passaggio ha la sua scena.
   Finestra dei dati: dal 1° febbraio al 9 settembre 2026 (le chiamate di novembre-gennaio sono test di Automis e non si contano).
   Metadati e JSON-LD restano quelli di components/use-cases/clinica/meta.js. EN e PT: use-case-clinica.en.js / .pt.js, stesse chiavi. */
export default {
  ui: {
    read: "Leggi il caso",
    book: "Prenota una call",
    keyTag: "In sette mesi",
    keyTitle: "prime visite per impianti",
    sep: ".",
  },

  hero: {
    eyebrow: "Caso studio",
    title: "7 mesi al telefono di una clinica dentale",
    highlight: "7 mesi",
    lead: "Al 30 ottobre: 1.211 chiamate, 148 appuntamenti e 702 telefonate chiuse dall'assistente senza passare dalla segretaria. Qui sotto, i primi sette mesi nel dettaglio.",
    client: "Clínica Santa Maria dos Olivais",
    logo: "/assets/images/client-logos/clinica-santa-maria.png",
  },

  start: {
    eyebrow: "1 · Il punto di partenza",
    title: "Per uno studio dentistico il telefono è tutto",
    lead: "Chi chiama e non trova risposta spesso non richiama, e prova dal dentista successivo.",
    cards: [
      { figure: "6", label: "dentisti", line: "Ognuno con le sue specializzazioni e i suoi giorni." },
      { figure: "1", label: "segretaria sola", line: "Una sola, per sei dentisti." },
      { figure: "Una decina", label: "di chiamate perse al giorno", line: "È la stima della clinica: prima nessuno le contava." },
    ],
    trust: {
      tag: "Il vero ostacolo",
      title: "La titolare non si fidava a mettere un'intelligenza artificiale al telefono con i suoi pazienti",
      lines: ["E come darle torto: se l'assistente sbaglia, la brutta figura la fa lei."],
    },
  },

  trust: {
    eyebrow: "2 · La fiducia",
    title: "Siamo partiti in piccolo, poi la titolare si è fidata",
    lead: "Non abbiamo provato a convincerla con una presentazione.",
    chart: {
      title: "Chiamate al mese",
      total: "872 in totale",
      ariaLabel: "Chiamate arrivate all'assistente ogni mese del 2026: febbraio 81, marzo 45, aprile 50, maggio 34, giugno 154, luglio 168, agosto 275, settembre 65 (fino al 9).",
      months: [
        { label: "feb", value: 81 },
        { label: "mar", value: 45 },
        { label: "apr", value: 50 },
        { label: "mag", value: 34 },
        { label: "giu", value: 154 },
        { label: "lug", value: 168 },
        { label: "ago", value: 275 },
        { label: "set", value: 65 },
      ],
      markAt: 4,
      mark: "Giugno · Google Maps",
      year: "2026",
      note: "Settembre fino al 9.",
    },
    phases: [
      {
        tag: "Da febbraio a maggio",
        title: "Solo il numero degli annunci",
        line: "Chi chiama lì ha già visto la pubblicità e sa cosa cerca. Se qualcosa fosse andato storto, l'avremmo spento in un pomeriggio senza che in clinica se ne accorgesse nessuno.",
      },
      {
        tag: "Da giugno",
        title: "Il numero su Google Maps",
        line: "La titolare si è affidata completamente al sistema: il numero dell'assistente è finito su Google Maps, cioè quello che trova chiunque cerchi la clinica.",
      },
    ],
    note: "A maggio l'assistente rispondeva a 34 chiamate al mese. Ad agosto a 275. Non è diventato otto volte più bravo: è cambiato il numero che la gente chiama.",
  },

  numbers: {
    eyebrow: "In numeri",
    title: "Dal 1° febbraio al 9 settembre 2026",
    lead: "Dati di produzione.",
    label: "I numeri del caso",
    items: [
      { figure: "872", label: "chiamate arrivate all'assistente", basis: "in sette mesi" },
      { figure: "527", label: "chiuse dall'assistente, senza passare dalla segretaria", basis: "il 60% delle chiamate" },
      { figure: "114", label: "appuntamenti presi", basis: "finiti in agenda" },
    ],
    split: {
      title: "Dove sono finite le 872 chiamate",
      parts: [
        { value: 527, label: "Chiuse dall'assistente", pct: "60%" },
        { value: 223, label: "Passate alla segretaria", pct: "26%" },
        { value: 122, label: "Riattaccate nei primi 10 secondi", pct: "14%" },
      ],
    },
    more: [
      { figure: "193", label: "arrivate fuori orario o con un'altra chiamata in corso", basis: "il 22%" },
      { figure: "385", label: "persone diverse con cui ha parlato" },
      { figure: "1 min 37 s", label: "durata media di una conversazione" },
      { figure: "20,2", label: "ore di telefono gestite" },
    ],
  },

  languages: {
    eyebrow: "Le lingue",
    title: "Sei lingue, e cambia da solo",
    lead: "Lisbona è una capitale multiculturale, e il portoghese da solo non basta a coprire chi chiama.",
    chips: ["Portoghese europeo", "Inglese", "Italiano", "Spagnolo", "Francese", "Tedesco"],
    chipsNote: "E volendo anche altre lingue.",
    steps: [
      { n: "1", title: "Parte in portoghese", line: "La chiamata comincia sempre in portoghese." },
      { n: "2", title: "Cambia subito", line: "Se chi chiama passa a un'altra lingua, o la chiede, l'assistente la cambia nella risposta successiva." },
      { n: "3", title: "Senza fare rumore", line: "Non lo annuncia, non chiede il permesso e non passa la chiamata a nessuno." },
    ],
  },

  agenda: {
    eyebrow: "L'agenda",
    title: "Trovare un posto libero era già un lavoro",
    lead: "Sei dentisti, e nessuno a tempo pieno. Lavorano a mezze giornate e ognuno fa cose diverse.",
    week: {
      title: "Chi c'è e quando",
      ariaLabel: "Giorni della settimana in cui è presente ogni trattamento: ortodonzia il mercoledì, dentista per i bambini il martedì, devitalizzazioni il martedì, il giovedì e il venerdì, implantologia il lunedì, il martedì, il giovedì e il venerdì.",
      days: ["lun", "mar", "mer", "gio", "ven"],
      rows: [
        { name: "Ortodonzia", on: [2] },
        { name: "Dentista per i bambini", on: [1] },
        { name: "Devitalizzazioni", on: [1, 3, 4] },
        { name: "Implantologia", on: [0, 1, 3, 4] },
      ],
      note: "Dal lunedì al venerdì, tutti a mezze giornate. L'implantologia segue gli orari della direttrice.",
    },
    match: {
      title: "Devono combaciare quattro cose",
      lead: "Alcuni trattamenti esistono in un solo giorno della settimana. Per trovare il primo posto libero non basta guardare l'agenda.",
      items: ["Il trattamento", "Il dentista che lo fa", "Il giorno in cui c'è", "Un orario ancora libero"],
    },
    words: {
      tag: "Prima ancora",
      title: "Capire di cosa si parla",
      lines: [
        "Al telefono nessuno dice «endodonzia»: dice che ha male, che gli è caduta una capsula, che vuole l'apparecchio o una pulizia.",
        "I tipi di trattamento sono ventuno, e vanno riconosciuti da come parla la gente, perché è quella parola a decidere da quale dentista si va.",
      ],
      figure: "21",
      figureLabel: "tipi di trattamento",
    },
    search: {
      tag: "Come cerca un posto",
      title: "Due orari alla volta, e poi si ferma",
      steps: [
        "Propone sempre due orari: mai uno solo, mai una lista.",
        "Se non vanno bene, ne cerca altri due più avanti nel tempo, e non ripropone quelli già scartati.",
        "Se l'agenda restituisce gli stessi orari, orari precedenti o niente, lo considera un fallimento logico e si ferma dopo due tentativi.",
        "A quel punto non insiste: in orario passa la chiamata alla segretaria, fuori orario propone di essere richiamati.",
      ],
      note: "Un sistema che interroga un'agenda piena finché non trova qualcosa è facilissimo da scrivere, ed è il peggiore da mettere al telefono.",
    },
  },

  urgent: {
    eyebrow: "Le urgenze",
    title: "Dove bisogna dire una cosa scomoda",
    lead: "La clinica lavora solo su appuntamento e non ha posti per le urgenze.",
    case: {
      tag: "Dolore forte, dente rotto, gonfiore, sanguinamento",
      title: "Non promette niente",
      line: "Quando l'assistente capisce che chi chiama ha un'urgenza, lo riconosce in una frase e spiega che il primo posto potrebbe essere domani come fra una settimana.",
    },
    ways: [
      { n: "A", title: "Il primo posto libero", line: "L'assistente propone il primo posto libero." },
      { n: "B", title: "La segretaria", line: "Se la clinica è aperta, la chiamata passa a lei." },
    ],
    note: "Promettere un posto subito a chi ha male è facile da programmare e impossibile da mantenere. È la differenza fra una demo e un sistema che lavora da sette mesi.",
  },

  call: {
    eyebrow: "3 · Una chiamata",
    title: "Una chiamata vera, dalla richiesta all'appuntamento",
    lead: "Una telefonata di giugno, tradotta dal portoghese e resa anonima. L'assistente capisce cosa serve, trova il posto giusto e propone due orari.",
    tag: "Chiamata vera, resa anonima",
    live: "Una chiamata",
    ariaLabel: "Una chiamata vera, tradotta in italiano: una persona chiede una pulizia dentale per sabato, l'assistente chiede se è già paziente, raccoglie nome e telefono, propone due orari e fissa l'appuntamento.",
    lines: [
      { who: "p", text: "Vorrei prenotare una pulizia per sabato prossimo." },
      { who: "a", text: "Certo, posso aiutarla a prenotare una pulizia dentale. È la sua prima visita da noi o è già un nostro paziente?" },
      { who: "p", text: "Mi chiamo [[Mario Bianchi]]." },
      { who: "a", text: "Grazie. Mi dice il suo numero di telefono, per favore?" },
      { who: "p", text: "[[+351 957 41]] 847" },
      { who: "a", text: "Verifico la disponibilità per sabato. Ho posto per una pulizia dentale con la dottoressa sabato 6 giugno alle dieci oppure alle undici. Uno di questi orari va bene?" },
      { who: "p", text: "Sì, alle dieci va bene." },
      { who: "a", text: "La sua pulizia dentale è fissata per sabato 6 giugno alle dieci del mattino, con la dottoressa. Posso aiutarla con altro?" },
    ],
    who: { p: "Chi chiama", a: "Assistente" },
    checksLabel: "Devono combaciare quattro cose",
    checks: ["Il trattamento", "Il dentista che lo fa", "Il giorno in cui c'è", "Un orario ancora libero"],
    checkAt: [1, 5.4, 5.8, 6.2],
    done: "In agenda",
  },

  detail: {
    eyebrow: "Nel dettaglio",
    title: "Il retroscena, per chi vuole vederlo",
    lead: "Le lingue, l'agenda dei dentisti e le urgenze.",
  },

  handoff: {
    eyebrow: "4 · La segretaria",
    title: "Una chiamata su quattro passa alla segretaria",
    lead: "223 su 872. L'assistente non passa la chiamata a chi la chiede: prima domanda il motivo, e se è una cosa che sa gestire prova a gestirla lui. La passa solo se la persona insiste.",
    table: {
      title: "Perché passa la chiamata",
      rows: [
        { label: "Insiste per parlare con una persona, dopo che l'assistente ha provato", value: 111 },
        { label: "Pulizia degli impianti: per regola della clinica la prenota solo la segretaria", value: 26 },
        { label: "Non vuole che la chiamata venga registrata", value: 25 },
        { label: "Urgenza o dolore", value: 21 },
        { label: "Motivo non classificabile", value: 40 },
      ],
      note: "La classificazione è automatica, fatta sui riassunti delle chiamate: va presa come indicativa.",
    },
    own: {
      tag: "Tutto il resto",
      title: "Lo fa da solo",
      line: "Compreso annullare e spostare un appuntamento, che di solito si pensa debbano passare per forza da una persona.",
    },
    hidden: {
      tag: "Un caso che non si riesce a contare",
      line: "L'assistente propone gli orari, la persona li rifiuta uno dopo l'altro, e dopo qualche tentativo la chiamata passa alla segretaria. Nei riassunti compare troppo di rado per dargli un numero.",
    },
  },

  mistakes: {
    eyebrow: "5 · Gli errori",
    title: "Cosa abbiamo sbagliato, e sistemato",
    lead: "Se raccontassimo solo quello che è andato bene, sarebbe pubblicità.",
    tags: { found: "Il problema", fix: "Com'è finita" },
    items: [
      {
        title: "«Valutazione» era troppo generica",
        found: "La parola nel menu degli appuntamenti era troppo generica, e l'assistente prenotava col dentista sbagliato.",
        fix: "Ce ne siamo accorti al secondo reclamo e l'abbiamo sistemata.",
      },
      {
        title: "Una rassicurazione che faceva dubitare",
        found: "Quando qualcuno chiedeva di parlare con una persona, la frase con cui l'assistente lo rassicurava diceva che era un'intelligenza artificiale, e faceva venire proprio il dubbio che voleva togliere.",
        fix: "L'abbiamo riscritta in modo neutro.",
      },
      {
        title: "Un aggiornamento al terzo tentativo",
        found: "L'ultimo aggiornamento è partito al terzo tentativo.",
        fix: "I primi due li hanno bocciati i test, prima che arrivassero alle chiamate vere.",
      },
    ],
  },

  estimate: {
    eyebrow: "6 · I conti a listino",
    title: "Quanto valgono, a prezzo di listino",
    lead: "Questi sono i prezzi di listino della clinica, applicati a quello che l'assistente ha registrato: per ogni appuntamento, il trattamento e se il paziente era nuovo. Il fatturato che ne risulta è calcolato, quindi presunto: quello vero lo conosce solo la clinica.",
    max: 57000,
    steps: [
      { label: "Appuntamenti presi, a prezzo di listino", value: 5200, text: "5.200 €" },
      { label: "Trattamenti chiesti dai pazienti nuovi", value: 1400, text: "+1.400 €" },
      { label: "Impianti, nell'ipotesi che metà delle 23 prime visite diventi un trattamento", value: 25400, text: "+25.400 €" },
    ],
    total: { label: "Totale a listino in sette mesi", value: 32000, text: "circa 32.000 €" },
    ceiling: "Se tutte le visite per impianti diventassero un trattamento: circa 57.000 €",
    note: "Conti sul listino della clinica. Le visite per impianti valgono la media dei trattamenti del programma della clinica, circa 2.200 € l'una: si va da 745 € per un impianto singolo a 4.800 € per un'arcata completa. Prima visita dei pazienti nuovi a 20 €, e non è tolto chi non si è presentato. La parte sugli impianti dipende da quante visite diventano trattamento, ed è l'unica ipotesi del conto.",
    key: {
      figure: "23",
      label: "prime visite per impianti in sette mesi",
      line: "Secondo noi è il numero che conta di più. È la parte più cara del listino, e basta che una diventi un'arcata completa per valere quasi 5.000 euro.",
    },
  },

  faq: {
    eyebrow: "Domande frequenti",
    title: "Quello che ci chiedono di più",
    items: [
      {
        q: "Quante chiamate ha gestito l'assistente vocale?",
        a: "Dal 1° febbraio al 9 settembre 2026 ha risposto a 872 chiamate: 527 si sono chiuse senza passare dalla segretaria, 223 sono passate a lei e 122 si sono chiuse nei primi 10 secondi. Gli appuntamenti presi sono 114.",
      },
      {
        q: "In quali lingue risponde?",
        a: "Può rispondere in portoghese europeo, inglese, italiano, spagnolo, francese e tedesco, e volendo anche in altre lingue. La chiamata parte in portoghese, e se chi chiama usa un'altra lingua l'assistente la cambia nella risposta successiva, senza passare la chiamata a nessuno.",
      },
      {
        q: "Cosa fa se un paziente chiama per un'urgenza?",
        a: "La clinica non ha posti per le urgenze, e l'assistente non ne promette. Riconosce il problema, spiega che il primo posto potrebbe essere domani come fra una settimana e propone il primo posto libero oppure la segretaria, se la clinica è aperta.",
      },
      {
        q: "Quando passa la chiamata a una persona?",
        a: "Quando chi chiama insiste per parlare con una persona dopo che l'assistente ha provato a gestire la richiesta, per la pulizia degli impianti, quando qualcuno non vuole che la chiamata venga registrata e per le urgenze. È successo con 223 chiamate su 872.",
      },
      {
        q: "Da dove conviene partire con un assistente vocale?",
        a: "Secondo noi da una linea sola, come abbiamo fatto qui con il numero degli annunci: se qualcosa va storto la spegni in un pomeriggio, e se funziona la allarghi.",
      },
    ],
  },

  cta: {
    title: "Hai una clinica o uno studio? Vediamo da quale parte del telefono farlo partire",
    line: "Trenta minuti, e ti diciamo da dove partiremmo noi.",
    more: { text: "Se vuoi capire come lavora prima di parlarne,", label: "qui trovi come funziona l'assistente vocale", href: "/voice-ai" },
  },
};
