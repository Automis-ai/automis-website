/* Caso Datura Clothing (IT). Numeri e finestre dalla raccolta fatti del cliente (sezioni A, B, D).
   Ogni numero porta la sua finestra. Niente ore risparmiate (non c'è una misura), niente fatturato.
   Percorso: /use-cases/datura-clothing (lo stesso slug in tutte le lingue). */
export default {
  meta: {
    title: "Datura Clothing: 10 guasti trovati in 28 giorni | Automis",
    description:
      "Presidio del sito, campagne Meta, creatività e report mensile per un negozio online di abbigliamento: 10 guasti distinti trovati in 28 giorni, 100 inserzioni create in 6 settimane.",
  },

  hero: {
    eyebrow: "Caso studio",
    title: "Dieci guasti trovati in 28 giorni nel negozio di Datura Clothing",
    highlight: "Dieci guasti trovati",
    lead: "Presidio del sito, campagne Meta, creatività e report mensile: quattro moduli di un solo sistema, con i numeri veri e il periodo a cui si riferiscono.",
    client: "Datura Clothing",
    tag: "Presidio e campagne",
    statsLabel: "I numeri del caso",
    stats: [
      { figure: "10", label: "guasti distinti trovati", basis: "dal 13/8 al 9/9/2026, 28 giorni" },
      { figure: "100", label: "inserzioni create in 4 campagne, 46 andate in onda", basis: "in 6 settimane, dal 25/8 all'8/10/2026" },
      { figure: "19", label: "aggiornamenti di plugin verificati uno per uno, tutti senza problemi", basis: "dal 20 al 23/8/2026" },
    ],
  },

  problem: {
    eyebrow: "Il problema",
    title: "Un negozio online si rompe senza fare rumore",
    lead: "Non contiamo le ore risparmiate: nessuno le ha misurate. Contiamo da quanto un guasto restava fermo prima che lo trovassimo.",
    items: [
      {
        figure: "23",
        unit: "giorni",
        label: "di attività programmate ferme",
        line: "313 eventi su 318 erano in ritardo.",
        basis: "Dal 20/7 al 12/8/2026",
        days: 23,
      },
      {
        figure: "37",
        unit: "giorni",
        label: "con il collegamento a Instagram scaduto",
        line: "La vetrina del sito mostrava ancora i post di maggio.",
        basis: "Dal 19/7 al 25/8/2026",
        days: 37,
      },
      {
        figure: "111",
        unit: "errori in un giorno",
        label: "per le raffiche di richieste di Meta",
        line: "Il 10/8 il sito rispondeva con errore 503 e andava giù. Dal 15/8, zero.",
        basis: "Dal 10 al 15/8/2026",
        spikes: [
          { value: 111, label: "10/8" },
          { value: 101, label: "12/8" },
          { value: 0, label: "15/8" },
        ],
      },
    ],
    barLabel: "giorni",
  },

  system: {
    eyebrow: "Il sistema",
    title: "Un negozio, quattro moduli collegati",
    lead: "Il presidio guarda il negozio, il feed lo porta a Meta, le campagne partono dal catalogo, il report racconta cosa è successo.",
    hub: "Il negozio",
    nodes: ["Presidio del sito", "Feed e catalogo", "Campagne e creatività", "Report mensile"],
    ariaLabel: "Schema: il negozio al centro, collegato ai quattro moduli del sistema.",
  },

  results: {
    eyebrow: "I risultati",
    title: "Tre numeri, ognuno con la sua base",
    items: [
      {
        figure: "10",
        label: "guasti distinti trovati in 28 giorni",
        line: "Dal 13/8 al 9/9/2026. Per alcuni, come le attività programmate e la vetrina Instagram, abbiamo aggiunto un controllo dedicato.",
      },
      {
        figure: "100",
        label: "inserzioni create in 6 settimane",
        line: "In 4 campagne, dal 25/8 all'8/10/2026. 46 sono andate in onda. Le 100 comprendono prove e post già pubblicati, riusati come inserzioni.",
        lit: 46,
        dotsLabel: "100 inserzioni, 46 andate in onda",
      },
      {
        figure: "19",
        label: "aggiornamenti di plugin verificati uno per uno",
        line: "Dal 20 al 23/8/2026, tutti senza problemi. Ognuno con copia prima, verifica dopo e ripristino pronto. Il sito ha 39 plugin attivi.",
      },
    ],
    note: "Il ritorno delle campagne più recenti non lo giudichiamo ancora: è presto, e le regole per giudicarlo le abbiamo scritte prima di accenderle.",
  },

  modules: {
    eyebrow: "Cosa fa ogni modulo",
    title: "Quattro moduli, ognuno con il suo compito",
    detailLabel: "Nel dettaglio",
    items: [
      {
        icon: "shield",
        since: "Dal 13/8",
        title: "Presidio del sito",
        line: "Ogni 5 minuti una sentinella chiede la home. Ogni notte alle 02:30 parte un giro di controlli. I plugin si aggiornano uno alla volta, con ripristino se un controllo è rosso.",
        more: [
          "La sentinella distingue un sito giù da un blocco di Cloudflare e legge anche i picchi di errori in un solo minuto. Ci avvisa solo quando qualcosa è rosso: il verde non manda notifiche.",
          "Il giro notturno è partito il 13/8 con 46 controlli: 25 sulle pagine, aperte in un browser vero, 6 sui prezzi scontati, 10 sulle email, seguite fino alla casella, 5 sulle difese contro il crawler. Da allora ne abbiamo aggiunti altri.",
          "Il ripristino di un aggiornamento scatta da una regola scritta nel codice, non dal giudizio di un modello. Pagamenti e WooCommerce aspettano l'ok di una persona.",
          "La scheda prodotto risponde al crawler di Meta in 57 ms invece di 1.742 (misura del 13/8/2026).",
        ],
      },
      {
        icon: "database",
        since: "Dal 25/8",
        title: "Feed e catalogo",
        line: "I prezzi scontati arrivano a Meta nel feed dei prodotti. Dal 31/8 il feed si rigenera ogni notte alle 02:30 e il risultato viene verificato.",
        more: [
          "L'8/10/2026 abbiamo forzato la lettura del feed da parte di Meta e controllato il risultato: 105 prodotti su 105 registrati.",
        ],
      },
      {
        icon: "target",
        since: "Dal 25/8",
        title: "Campagne e creatività",
        line: "Campagne con prodotti dinamici dal catalogo, accese solo dopo l'ok di una persona. Caroselli di catalogo, immagini statiche, video e post già pubblicati diventano inserzioni.",
        more: [
          "Le regole per giudicare una campagna le scriviamo prima di accenderla.",
          "Prima di spingere un prodotto controlliamo quali taglie sono ancora disponibili, calcolate sulle varianti.",
          "I testi seguono il tono di voce del marchio.",
          "100 inserzioni create dal 25/8 all'8/10/2026, in 4 campagne: 46 sono andate in onda.",
        ],
      },
      {
        icon: "chart",
        since: "Dal 1/9",
        title: "Report mensile",
        line: "Un PDF di due pagine per il titolare: quattro numeri del negozio, ognuno con il suo confronto, le campagne con il ritorno in percentuale, i contenuti che hanno venduto.",
        more: [
          "Il ritorno si calcola dividendo il fatturato vero del negozio per la spesa su Meta, non con il numero che dichiara Meta.",
          "Il primo, quello di agosto, è stato generato il 1° settembre. Insieme al PDF prepariamo una scheda interna per noi.",
        ],
      },
    ],
  },

  basis: {
    summary: "Come abbiamo contato",
    items: [
      "10 guasti: conteggio sul nostro registro dei guasti, dal 13/8 al 9/9/2026. Una stessa catena di cause vale un guasto solo. Scriviamo «trovati»: non tutti li ha scoperti un controllo automatico, alcuni sono usciti da un'analisi o da una persona che guardava.",
      "100 inserzioni: eventi «inserzione creata» nel registro attività di Meta, dal 25/8 all'8/10/2026. Comprendono prove e post già pubblicati, riusati come inserzioni. 46 hanno speso, e sono quelle andate in onda. Delle 4 campagne, 3 sono andate in onda.",
      "19 aggiornamenti: plugin distinti, dal 20 al 23/8/2026, fatti con una persona di Automis a seguire ogni passo. Non sono aggiornamenti autonomi.",
      "Ore risparmiate: nessuna misura, quindi nessun numero.",
    ],
  },

  cta: {
    title: "Cosa si rompe nel tuo negozio senza che nessuno lo veda?",
    line: "Raccontaci la tua attività e ti diciamo da dove partiremmo.",
  },
};
