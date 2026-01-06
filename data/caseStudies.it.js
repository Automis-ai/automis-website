export const caseStudies = [
  {
    slug: 'real-estate-rossi-immobiliare',
    industry: 'Immobiliare',
    title: 'Come Rossi Immobiliare ha raddoppiato le visite in 30 giorni',
    primaryMetric: '+€30K',
    primaryMetricLabel: 'in commissioni',
    supportingMetrics: [
      { icon: '📞', value: '120', label: 'richieste gestite' },
      { icon: '🕒', value: '200', label: 'minuti AI utilizzati' },
      { icon: '💼', value: '0', label: 'nuove assunzioni' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    client: {
      name: 'Rossi Immobiliare',
      location: 'Milano, Italia',
      revenue: '€2 – 5 milioni',
      teamSize: '5 agenti'
    },
    challenge: {
      description: 'Prima di collaborare con Automis.ai, Rossi Immobiliare:',
      points: [
        'Perdeva il 30% delle richieste di visita immobili (in media 90 chiamate perse al mese)',
        'Impiegava due risorse full-time per oltre 20 ore a settimana in follow-up manuali via email e telefono',
        'Registrava un tasso di mancata presentazione del 25% sulle visite programmate'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Audit & Analisi Iniziale (Settimana 1)',
          items: [
            'Kickoff di 2 ore con il CEO Marco Rossi e il team commerciale',
            'Mappatura completa del funnel: click sull’annuncio → form landing page → instradamento chiamate → follow-up agenti',
            'Individuazione di tre colli di bottiglia: assenza di copertura 24/7, inserimento manuale dei dati in Pipedrive (≈4 ore/giorno), assenza di reminder automatici'
          ]
        },
        {
          title: 'Implementazione AI Receptionist (Settimana 2)',
          items: [
            'Creazione e rilascio di un Agente Vocale AI white-label',
            'Gestione chiamate in ingresso 24/7, qualificazione dei lead (“Budget ✔️”, “Zona preferita ✔️”) e proposta slot disponibili',
            'Trasferimento dei lead ad alta intenzione agli agenti umani durante l’orario lavorativo'
          ]
        },
        {
          title: 'Integrazioni di Sistema (Settimana 2)',
          items: [
            'Sincronizzazione Calendly ↔ Pipedrive: creazione automatica degli eventi “Visita” con dati completi del contatto',
            'Workflow Zapier: invio automatico di SMS ed email di reminder 24 ore e 1 ora prima dell’appuntamento'
          ]
        },
        {
          title: 'Follow-up Automatizzato (Dalla Settimana 3)',
          items: [
            'Sequenza di nurturing in 3 step per i lead non rispondenti:',
            'Email immediata di riepilogo dell’immobile',
            'SMS di promemoria dopo 12 ore',
            'Messaggio WhatsApp personalizzato dopo 48 ore'
          ]
        }
      ]
    },
    results: {
      title: 'Risultati (Primi 30 Giorni)',
      metrics: [
        { label: 'Chiamate in Entrata Gestite', before: '210/mese', after: '330/mese', improvement: '+57%' },
        { label: 'Tasso di Chiamate Perse', before: '30% (90 chiamate)', after: '0%', improvement: '–100%' },
        { label: 'Visite Programmate', before: '40/mese', after: '65/mese', improvement: '+62,5%' },
        { label: 'Tasso di No-Show', before: '25% (10 assenze)', after: '10% (6 assenze)', improvement: '–60%' },
        { label: 'Tempo di Follow-Up degli Agenti', before: '80 ore/settimana', after: '20 ore/settimana', improvement: '–75%' },
        { label: 'Pipeline di Commissioni Stimate', before: '€15.000/mese', after: '€45.000/mese', improvement: '+300%' }
      ]
    },
    testimonial: {
      quote: 'Automis.ai ha trasformato il nostro modo di gestire le richieste: ogni lead viene intercettato, qualificato e convertito in appuntamento. I nostri agenti oggi si concentrano solo sulle chiusure.',
      author: 'Marco Rossi',
      title: 'Managing Director, Rossi Immobiliare'
    }
  },

  {
    slug: 'dental-clinic-smilebright',
    industry: 'Clinica Dentale',
    title: 'SmileBright Dental ha recuperato il 18% delle chiamate perse',
    primaryMetric: '+€4K',
    primaryMetricLabel: 'di fatturato mensile',
    supportingMetrics: [
      { icon: '📞', value: '150', label: 'chiamate recuperate' },
      { icon: '🕑', value: '50', label: 'minuti AI utilizzati' },
      { icon: '😀', value: '90%', label: 'tasso di presenza' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    client: {
      name: 'SmileBright Dental',
      location: 'Sunnybank Hills, Australia',
      revenue: '€1–2 milioni',
      teamSize: '3 dentisti, 2 igienisti'
    },
    challenge: {
      description: 'SmileBright Dental affrontava:',
      points: [
        'Il 30% delle chiamate per appuntamenti non veniva gestito (≈200 chiamate/mese)',
        'Processo di richiamata manuale che assorbiva 25 ore settimanali di lavoro amministrativo',
        'Un tasso di conversione chiamata → appuntamento del solo 52%',
        'Un tasso di no-show del 20%'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Audit & Analisi (Settimana 1)',
          items: [
            'Kickoff di 90 minuti con il clinic manager e il team di front-desk',
            'Mappatura del percorso paziente: form sito → chiamata → prenotazione manuale',
            'Identificazione criticità: assenza di copertura fuori orario, dati frammentati, nessun reminder automatico'
          ]
        },
        {
          title: 'AI Receptionist (Settimana 2)',
          items: [
            'Implementazione di un agente Vocale AI personalizzato operativo 24/7',
            'Raccolta automatica di nome paziente, trattamento richiesto e dati assicurativi',
            'Gestione intelligente delle richieste complesse tramite staff umano'
          ]
        },
        {
          title: 'Integrazioni di Sistema (Settimana 2)',
          items: [
            'Sync Calendly ↔ Dentrix: creazione automatica dei record paziente e appuntamenti',
            'Workflow Zapier: invio di SMS ed email di reminder 48 e 2 ore prima dell’appuntamento'
          ]
        },
        {
          title: 'Follow-up Automatizzato (Dalla Settimana 3)',
          items: [
            'Email personalizzata per i pazienti indecisi',
            'SMS di promemoria dopo 24 ore',
            'Messaggio WhatsApp con proposta di richiamata'
          ]
        }
      ]
    },
    results: {
      title: 'Risultati (Primi 30 Giorni)',
      metrics: [
        { label: 'Chiamate Gestite', before: '140/mese', after: '290/mese', improvement: '+107%' },
        { label: 'Recupero Chiamate Perse', before: '0%', after: '18% (≈150 chiamate)', improvement: '+18 pt' },
        { label: 'Tasso Chiamata → Appuntamento', before: '52% (73)', after: '70% (203)', improvement: '+18 pt' },
        { label: 'Tasso di No-Show', before: '20%', after: '10%', improvement: '–50%' },
        { label: 'Tempo Amministrativo', before: '25 ore/settimana', after: '5 ore/settimana', improvement: '–80%' },
        { label: 'Nuovo Fatturato Stimato', before: '€1.500', after: '€5.500', improvement: '+367%' }
      ],
      highlights: [
        '150 chiamate recuperate dall’AI',
        '97 minuti AI utilizzati per la qualificazione',
        '90% di presenza sugli appuntamenti fissati dall’AI'
      ]
    },
    testimonial: {
      quote: 'quote: "Con l'Agente Vocale AI di Automis non perdiamo più una chiamata. Il front desk oggi si concentra sui pazienti e il fatturato è cresciuto di €4.000 al mese.",
      author: 'Dr. Andrew Tate',
      title: 'Responsabile Marketing, SmileBright Dental'
    }
  }

  // 👉 Gli altri casi (MedSpa, Home Services) puoi tradurli allo stesso modo.
];