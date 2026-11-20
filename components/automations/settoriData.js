// Idee di automazione per settore (in italiano). Stessi settori e stesse guide del catalogo guide (/it/guide).
// aiuto = sistemi che costruiamo noi (schede del catalogo) · solo = lo fai da solo seguendo la guida del settore.
// pagina = il settore ha una pagina dedicata (slug in italiano, esattamente la frase che si cerca).
const A = "aiuto";
const S = "solo";

export const SETTORI = [
  {
    id: "commercialisti", guida: "S4", nome: "Commercialisti",
    pagina: {
      slug: "intelligenza-artificiale-per-commercialisti", breve: "commercialisti",
      h1: "Intelligenza artificiale per commercialisti",
      title: "Intelligenza artificiale per commercialisti: cosa automatizzare | Automis",
      description: "Sei idee per usare l'IA nello studio di un commercialista: documenti dei clienti, posta e PEC, telefono, scadenze. Cosa fai da solo e cosa costruiamo con te.",
      intro: "Documenti da rincorrere, posta che si accumula, scadenze che non perdonano. Qui trovi cosa può fare l'IA nel tuo studio, cosa puoi provare da solo con la guida e cosa costruiamo insieme.",
    },
    idee: [
      [A, "Ritrovare un documento di un cliente", "Chiedi dov'è la visura o il contratto di quel cliente e ricevi il file, il punto esatto e la frase. Funziona anche sui documenti scansionati."],
      [A, "Smistare PEC, posta e scansioni", "Ogni documento che arriva viene riconosciuto e messo nella cartella del cliente giusto."],
      [A, "Rispondere al telefono quando sei sommerso", "Un'assistente IA risponde alle chiamate, capisce chi chiama e fissa l'appuntamento nella tua agenda."],
      [A, "Filtrare le richieste di nuovi clienti", "Chi scrive riceve subito una risposta. Tu vedi solo le richieste in linea con le tue regole di accettazione."],
      [S, "Documenti dei clienti", "Un elenco dei documenti che mancano per ogni cliente e il messaggio per chiederli."],
      [S, "Scadenze, promemoria e solleciti", "Promemoria automatici per le scadenze e un sollecito ai clienti che non hanno ancora mandato i documenti."],
    ],
  },
  {
    id: "avvocati", guida: "S4", nome: "Avvocati",
    pagina: {
      slug: "intelligenza-artificiale-per-avvocati", breve: "avvocati",
      h1: "Intelligenza artificiale per avvocati",
      title: "Intelligenza artificiale per avvocati: cosa automatizzare | Automis",
      description: "Sei idee per usare l'IA nello studio legale: ricerca nei fascicoli, contratti e clausole, bozze di atti, telefono. Cosa fai da solo e cosa costruiamo con te.",
      intro: "Fascicoli da ritrovare, contratti da leggere, atti da preparare. Qui trovi cosa può fare l'IA nel tuo studio, dentro il segreto professionale, cosa puoi provare da solo con la guida e cosa costruiamo insieme.",
    },
    idee: [
      [A, "Ritrovare un documento nei fascicoli", "Chiedi dov'è il contratto di quel cliente e ricevi il file, il punto esatto e la frase. L'archivio resta tuo e privato."],
      [A, "Rispondere al telefono quando sei in udienza", "Un'assistente IA risponde alle chiamate, capisce chi chiama e fissa l'appuntamento nella tua agenda."],
      [A, "Filtrare le richieste di nuovi clienti", "Chi scrive riceve subito una risposta. Tu vedi solo le richieste in linea con le tue regole di accettazione."],
      [S, "Preparare bozze di atti e pareri", "Una bozza di partenza da rivedere tu, con le istruzioni da dare e le regole da seguire sui dati dei clienti."],
      [S, "Controllare contratti e clausole", "Fai evidenziare le clausole da guardare e confronti due versioni dello stesso contratto. La decisione resta a te."],
      [S, "Scadenze, promemoria e solleciti", "Promemoria automatici per le scadenze e un sollecito ai clienti che non hanno ancora saldato."],
    ],
  },
  {
    id: "manifattura", guida: "S7", nome: "Aziende manifatturiere",
    idee: [
      [A, "Rispondere ai questionari dei clienti", "Arriva un questionario su qualità o sicurezza: l'IA cerca le risposte nelle schede e nelle procedure che hai già e ti propone il testo."],
      [A, "Ordini da email e PDF", "L'ordine viene letto e inserito, e al cliente parte la conferma. I casi dubbi li guarda un collega."],
      [A, "Assistenza e ricambi", "Il cliente chiede un ricambio: l'assistente trova il codice giusto nei tuoi documenti e risponde."],
      [S, "Preventivi e distinta base", "Una prima bozza del preventivo a partire dalla distinta base, da rivedere prima di inviarla."],
      [S, "Qualità e non conformità", "Descrivi il problema e ottieni una scheda di non conformità in ordine, con le cause da verificare."],
      [S, "Manutenzione", "Il registro dei guasti diventa un elenco di interventi da programmare."],
    ],
  },
  {
    id: "ingrosso", guida: "S8", nome: "Commercio all'ingrosso",
    idee: [
      [A, "Ordini da email, WhatsApp e PDF", "Gli ordini arrivano su tre canali diversi. Vengono letti, messi in ordine e inseriti, con i dubbi segnalati a un collega."],
      [A, "Assistenza e resi", "Le domande ripetitive su resi e consegne ricevono risposta subito. I casi particolari arrivano a te."],
      [S, "Preventivi e listini", "Una bozza di preventivo dal listino aggiornato, da controllare prima di mandarla."],
      [S, "Recupero crediti e solleciti", "Il testo giusto per ogni fase del sollecito, dal promemoria gentile all'ultimo avviso."],
      [S, "Riordino e scorte", "Un elenco di cosa riordinare e quando, partendo dalle vendite degli ultimi mesi."],
    ],
  },
  {
    id: "logistica", guida: "S9", nome: "Logistica e trasporti",
    idee: [
      [A, "Richieste di preventivo", "La richiesta arriva per email o WhatsApp, viene letta e ti ritrovi una quotazione da rivedere."],
      [A, "Dov'è la mia merce?", "Il cliente chiede lo stato di una consegna e riceve risposta con le informazioni che hai già, anche di sera."],
      [A, "Documenti di trasporto in ordine", "I documenti dei viaggi vengono letti e archiviati, pronti per la fatturazione."],
      [S, "Reclami e danni", "Una risposta ordinata al reclamo, con i punti da verificare prima di rispondere."],
      [S, "Manutenzione dei mezzi", "Tagliandi e revisioni raccolti in un solo calendario, con il promemoria prima della scadenza."],
    ],
  },
  {
    id: "sanita", guida: "S1", nome: "Dentisti e studi medici",
    pagina: {
      slug: "intelligenza-artificiale-per-dentisti", breve: "dentisti",
      h1: "Intelligenza artificiale per dentisti",
      title: "Intelligenza artificiale per dentisti: cosa automatizzare | Automis",
      description: "Sei idee per usare l'IA nello studio dentistico: telefono, promemoria, pazienti che non tornano, recensioni. Cosa fai da solo e cosa costruiamo con te.",
      intro: "Il telefono squilla mentre sei in poltrona, i pazienti dimenticano la visita, qualcuno non torna più. Qui trovi cosa può fare l'IA nel tuo studio, cosa puoi provare da solo con la guida e cosa costruiamo insieme.",
    },
    idee: [
      [A, "Il telefono in studio", "Un'assistente IA risponde quando sei in poltrona o lo studio è chiuso, prenota la visita e ti lascia il riepilogo."],
      [A, "Promemoria prima della visita", "Un messaggio ricorda l'appuntamento. Chi non può venire lo dice subito."],
      [A, "Pazienti che non tornano", "Un messaggio a chi non viene da tempo, per fissare il controllo."],
      [A, "Recensioni dopo la visita", "A chi è soddisfatto arriva l'invito a lasciare una recensione."],
      [S, "Preventivi e convenzioni", "Un testo chiaro per spiegare il preventivo al paziente, con i dati da non inserire."],
      [S, "Informazioni ai pazienti", "Testi chiari per sito e social, scritti in pochi minuti e da rivedere tu."],
    ],
  },
  {
    id: "immobiliare", guida: "S2", nome: "Agenzie immobiliari",
    idee: [
      [A, "Rispondere subito a chi cerca casa", "Chi scrive per un annuncio riceve risposta in pochi minuti. Le richieste serie arrivano a te già qualificate."],
      [A, "Abbinare richieste e immobili", "Ogni nuovo immobile viene confrontato con le richieste che hai in archivio, così sai chi chiamare."],
      [A, "Note vocali dopo la visita", "Registri una nota vocale e finisce nella scheda del contatto, senza ricopiarla."],
      [A, "Documenti dell'immobile", "Visure, planimetrie e contratti ritrovati con una domanda."],
      [S, "Annunci e schede degli immobili", "Il testo dell'annuncio scritto in pochi minuti, a partire dai dati dell'immobile."],
    ],
  },
  {
    id: "estetica", guida: "S3", nome: "Centri estetici e attività locali",
    idee: [
      [A, "Il telefono in cabina", "Un'assistente IA risponde mentre sei con una cliente e fissa l'appuntamento in agenda."],
      [A, "Promemoria e assenze", "Un messaggio prima dell'appuntamento ricorda la data e riduce i posti lasciati vuoti."],
      [A, "Clienti che non tornano", "Un messaggio a chi non viene da un po', per riportarla in cabina."],
      [A, "Recensioni", "Dopo il trattamento arriva l'invito a lasciare una recensione."],
      [S, "Listino e domande delle clienti", "Le risposte alle domande che si ripetono, scritte una volta sola e riusate."],
      [S, "Instagram e offerte", "Idee e testi per i post della settimana, in pochi minuti."],
    ],
  },
  {
    id: "ecommerce", guida: "M4", nome: "E-commerce",
    idee: [
      [A, "Assistenza su ordini e resi", "Dov'è il mio ordine? Come faccio il reso? Le domande ripetitive ricevono risposta subito, il resto arriva a te."],
      [A, "Carrelli abbandonati", "Un messaggio a chi ha lasciato il carrello, per ricordargli cosa aveva scelto."],
      [A, "Recensioni dei prodotti", "Dopo l'acquisto arriva l'invito a lasciare una recensione."],
      [S, "Schede prodotto e titoli", "Titoli e descrizioni scritti a partire dalle caratteristiche reali del prodotto."],
      [S, "Riordino e magazzino", "Un elenco di cosa riordinare, partendo dalle vendite recenti."],
    ],
  },
  {
    id: "ristoranti", guida: "S5", nome: "Ristoranti",
    idee: [
      [A, "Il telefono durante il servizio", "Un'assistente IA risponde mentre sei in sala o in cucina e prenota il tavolo."],
      [A, "Tavoli che saltano", "Un messaggio di conferma prima della serata riduce i tavoli lasciati vuoti."],
      [A, "Recensioni", "A chi ha cenato da te arriva l'invito a lasciare una recensione."],
      [S, "Menù e allergeni", "Una tabella degli allergeni firmata dal cuoco, per rispondere agli ospiti sempre allo stesso modo."],
      [S, "Acquisti, scorte e spreco", "Dagli incassi recenti, un'idea di cosa ordinare per la settimana."],
    ],
  },
  {
    id: "hotel", guida: "S6", nome: "Hotel e strutture ricettive",
    idee: [
      [A, "Telefono e prenotazioni dirette", "Un'assistente IA risponde e raccoglie le prenotazioni che altrimenti si perdono al telefono."],
      [A, "Messaggi prima dell'arrivo", "L'ospite riceve le informazioni utili e la risposta alle sue domande, nella sua lingua."],
      [A, "Recensioni e reputazione", "A fine soggiorno arriva l'invito a lasciare una recensione."],
      [S, "Gruppi, eventi e preventivi", "Una bozza di preventivo per gruppi ed eventi, da rivedere prima di inviarla."],
      [S, "Upselling e concierge", "Proposte di camere, colazioni e servizi extra scritte in modo semplice."],
    ],
  },
  {
    id: "palestre", guida: "I3", nome: "Palestre",
    idee: [
      [A, "Prove gratuite senza risposta", "Chi chiede una prova riceve subito risposta, con gli orari liberi per fissarla."],
      [A, "Iscritti che spariscono", "Un messaggio a chi non viene da un po', per capire cosa è successo e riportarlo in sala."],
      [A, "Corsi e no-show", "Un promemoria prima del corso per chi si è prenotato."],
      [S, "Avvisi e promozioni", "Testi per avvisi e offerte, dentro le regole sulle promozioni."],
      [S, "Instagram, Google e recensioni", "Idee per i post e risposte alle recensioni, in pochi minuti."],
    ],
  },
  {
    id: "veterinari", guida: "I4", nome: "Veterinari",
    idee: [
      [A, "Il telefono in visita", "Un'assistente IA risponde mentre sei con un animale e fissa l'appuntamento."],
      [A, "Richiami di vaccini e controlli", "Un messaggio al proprietario quando il richiamo sta per scadere."],
      [A, "Urgenze fuori orario", "Fuori orario l'assistente raccoglie i dati e ti avvisa se è un'urgenza."],
      [A, "Recensioni", "Dopo la visita arriva l'invito a lasciare una recensione."],
      [S, "Preventivi e comunicazioni ai proprietari", "Un testo chiaro per spiegare le cure e i costi."],
    ],
  },
  {
    id: "auto", guida: "I5", nome: "Autofficine e concessionarie",
    idee: [
      [A, "Messaggi senza risposta in giornata", "Chi scrive su WhatsApp o Instagram riceve subito una risposta. I casi da preventivo arrivano a te."],
      [A, "Recensioni dopo la consegna", "A fine lavoro arriva l'invito a lasciare una recensione."],
      [S, "Promozioni ai clienti", "Testi per offerte e avvisi, dentro le regole su dati dei clienti e promozioni."],
    ],
  },
  {
    id: "negozi", guida: "I6", nome: "Negozi",
    idee: [
      [A, "Messaggi su WhatsApp e Instagram", "Le domande dei clienti ricevono risposta subito, anche quando sei al banco."],
      [A, "Recensioni e Profilo Google", "Dopo l'acquisto arriva l'invito a lasciare una recensione sul Profilo Google."],
      [S, "Schede prodotto e vetrina social", "Testi e idee per i prodotti nuovi, scritti in pochi minuti."],
      [S, "Riordino e magazzino", "Un elenco di cosa riordinare, partendo dalle vendite recenti."],
      [S, "Promozioni e newsletter", "Una newsletter pronta da rivedere e mandare."],
    ],
  },
  {
    id: "tecnici", guida: "I7", nome: "Architetti e ingegneri",
    idee: [
      [A, "Normativa e capitolati", "Capitolati, norme e vecchi progetti ritrovati con una domanda."],
      [S, "Preventivi e parcelle", "Una bozza di preventivo dalla descrizione dell'incarico, da rivedere tu."],
      [S, "Messaggi ai committenti", "Aggiornamenti chiari ai committenti, scritti in pochi minuti."],
      [S, "Relazioni e documenti tecnici", "Una prima stesura da completare con i dati del progetto."],
      [S, "Pratiche e scadenze", "Le scadenze delle pratiche in un unico elenco, con il promemoria."],
    ],
  },
  {
    id: "assicurazioni", guida: "I8", nome: "Agenzie assicurative",
    idee: [
      [A, "Scadenze e rinnovi", "Un promemoria al cliente prima della scadenza della polizza."],
      [A, "Telefono e WhatsApp", "Le domande dei clienti ricevono risposta subito, con i casi complessi passati a te."],
      [A, "Sinistri e prima assistenza", "Il cliente segnala il sinistro e riceve i passi da fare, con i dati già raccolti per te."],
      [S, "Preventivi e confronto di offerte", "Un confronto ordinato tra le offerte, da spiegare al cliente."],
      [S, "Recensioni e social", "Idee e testi per i post, scritti in pochi minuti."],
    ],
  },
  {
    id: "scuole", guida: "I9", nome: "Scuole e formazione",
    idee: [
      [A, "Richieste di informazioni e iscrizioni", "Chi chiede informazioni riceve subito una risposta e i passi per iscriversi."],
      [A, "Orari, assenze e scadenze", "Le domande delle famiglie su orari e scadenze ricevono risposta subito."],
      [A, "Recuperi e disdette", "Chi disdice una lezione riceve le date di recupero disponibili."],
      [S, "Materiali e programmi", "Una prima stesura di materiali e programmi, da rivedere tu."],
      [S, "Recensioni e social", "Idee e testi per i post, scritti in pochi minuti."],
    ],
  },
  {
    id: "marketing", guida: "I10", nome: "Agenzie di marketing",
    idee: [
      [A, "Calendario dei contenuti", "Un flusso che prepara bozze e calendario dei post, con approvazione prima della pubblicazione."],
      [A, "Ads e creatività", "Un agente che propone varianti di testi e immagini per le campagne dei tuoi clienti."],
      [S, "Proposte e preventivi", "Dal brief a una prima bozza di proposta, da rifinire tu."],
      [S, "Report mensili ai clienti", "Il report parte dai dati e arriva scritto in modo chiaro."],
      [S, "Ricerca e idee", "Una ricerca veloce su settore e concorrenti, con le fonti da controllare."],
    ],
  },
];


// Prima le idee che puoi fare da solo, poi quelle con il nostro aiuto (a parità, resta l'ordine scritto sopra).
for (const s of SETTORI) s.idee.sort((a, b) => (a[0] === S ? 0 : 1) - (b[0] === S ? 0 : 1));
