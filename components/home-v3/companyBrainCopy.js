// Pagina Company Brain (solo IT, 14/10/2026). Scritta con copywriter + humanizer. Titolo e sottotitolo: scelta di Luca.
// Titolo e demo restano in components/v2/copy/systems.it.js (hero, brain, meta).
// ATTENZIONE prima di andare online: il livello «Tutto nell'UE» va confermato (fornitore e regioni) e l'intera pagina
// va letta da Arcangelo. Nessun prezzo e nessun numero in pagina: oggi non c'è un cliente reale da citare.
export const CB = {
  hero: { cta: "Vedi come funziona" },
  who: {
    eyebrow: "Per chi è",
    title: "Ti riconosci?",
    items: [
      {
        icon: "contact",
        title: "Sei la persona a cui tutti chiedono tutto.",
        line: "Permessi, fatture, regole sui rimborsi: la risposta la sai tu, e ogni volta ti interrompono.",
      },
      {
        icon: "clock",
        title: "Un collega va in ferie e il lavoro si ferma.",
        line: "Quello che sa resta nella sua testa. Se manca o se ne va, manca anche quello.",
      },
      {
        icon: "doc",
        title: "I documenti ci sono, ma nessuno sa dove.",
        line: "Manuali, procedure e contratti sparsi tra cartelle, email e PDF.",
      },
    ],
    noteTitle: "Si parte dai documenti.",
    note: "Se una procedura non è scritta da nessuna parte, il Brain non ha da dove rispondere.",
  },
  work: {
    eyebrow: "Cosa facciamo noi",
    title: "Lo prepariamo noi, tu lo usi",
    lead: "La parte difficile non è il programma. È avere i documenti in ordine, risposte controllate e un archivio che resta aggiornato.",
    items: [
      {
        icon: "scan",
        title: "Mettiamo in ordine i documenti",
        line: "Leggiamo quello che hai, anche le scansioni. Togliamo duplicati e versioni vecchie e diamo a ogni documento un titolo e un'area.",
      },
      {
        icon: "shield",
        title: "Decidiamo con te chi vede cosa",
        line: "Ognuno vede solo la sua parte. Un dipendente non legge un contratto che non è suo.",
      },
      {
        icon: "check",
        title: "Lo proviamo su domande vere",
        line: "Prima di aprirlo al team facciamo le domande che fate ogni giorno e correggiamo dove sbaglia. Se non trova la risposta, lo dice invece di inventarla.",
      },
      {
        icon: "repeat",
        title: "Lo teniamo aggiornato",
        line: "I documenti nuovi entrano nell'archivio. Ogni mese vedi le domande rimaste senza risposta: sono i documenti che mancano.",
      },
    ],
  },
  data: {
    eyebrow: "I tuoi dati",
    title: "Decidi tu dove stanno i tuoi dati",
    lead: "Tre modi di averlo, in base a quanto sono riservati i tuoi documenti.",
    items: [
      {
        tag: "Il più semplice",
        title: "Nel cloud",
        line: "L'archivio sta nell'UE. Il modello che scrive la risposta lavora fuori dall'UE, con clausole contrattuali standard.",
        who: "Per procedure, manuali e listini.",
      },
      {
        tag: "Più riservato",
        title: "Tutto nell'UE",
        line: "Archivio e modello lavorano dentro l'UE: i documenti non escono dall'Europa.",
        who: "Per chi tratta dati di clienti o del personale.",
      },
      {
        tag: "Massima riservatezza",
        title: "Nei tuoi locali",
        line: "Un server tuo, con modelli che girano lì: nessuna richiesta esce dalla tua rete. Le risposte possono essere meno precise e serve un server adatto.",
        who: "Per i dati più sensibili. Su preventivo.",
      },
    ],
    note: "Prima di partire ti diciamo per iscritto quali fornitori trattano quali dati e dove. Rispettiamo il GDPR dal primo giorno.",
  },
  place: {
    eyebrow: "Come lavoriamo",
    title: "Da remoto o in sede",
    lead: "Quasi tutto si fa da remoto. La sede serve in pochi casi.",
    cols: ["Da remoto", "In sede"],
    rows: [
      {
        label: "Quando va bene",
        remote: "Cloud e tutto nell'UE. Anche il server locale, se è già collegato alla rete.",
        onsite: "Server locale con rete isolata, o se preferisci avere qualcuno in azienda.",
      },
      {
        label: "Cosa fai tu",
        remote: "Ci dai l'accesso in sola lettura ai documenti. Per il server locale, il tuo IT ci apre un accesso.",
        onsite: "Prepari il server e il posto dove metterlo.",
      },
      {
        label: "Cosa facciamo noi",
        remote: "Configuriamo, proviamo e aggiorniamo da qui.",
        onsite: "Installiamo di persona, proviamo con il tuo team e lo formiamo.",
      },
      {
        label: "Il tuo controllo",
        remote: "Accesso a tempo e registrato, che puoi revocare quando vuoi.",
        onsite: "Nessun collegamento esterno: gli aggiornamenti li portiamo noi.",
      },
    ],
  },
  faq: {
    title: "Domande frequenti",
    items: [
      {
        q: "Chi vede cosa?",
        a: "Lo decidiamo insieme prima di partire. Ogni persona vede solo i documenti della sua area.",
      },
      {
        q: "Cosa succede se non trova la risposta?",
        a: "Lo dice. Non inventa, e la domanda finisce nell'elenco mensile: così sai quale documento manca.",
      },
      {
        q: "Serve un tecnico in azienda?",
        a: "No. Costruiamo, attiviamo e manteniamo tutto noi. Per il server locale ci serve solo qualcuno del tuo IT che apra l'accesso.",
      },
      {
        q: "Quello che costruite è mio?",
        a: "Sì, quello che consegniamo è tuo.",
      },
      {
        q: "E se ho già un team tecnico?",
        a: "Può costruirlo anche da solo. Il lavoro che non si improvvisa è ordinare i documenti, provare le risposte e tenerlo aggiornato: lì possiamo affiancarlo.",
      },
      {
        q: "Quanto costa e quanto ci vuole?",
        a: "Lo preventiviamo dopo aver capito come lavori e i tempi li concordiamo con te prima di iniziare. Non esiste un pacchetto standard.",
      },
    ],
  },
};
