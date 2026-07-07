export const caseStudies = [
  {
    slug: 'real-estate-rossi-realty',
    industry: 'Immobiliare',
    title: 'Come Rossi Realty ha raddoppiato le visite in 30 giorni',
    primaryMetric: '+€30K',
    primaryMetricLabel: 'in commissioni',
    supportingMetrics: [
      { icon: '📞', value: '120', label: 'richieste gestite' },
      { icon: '🕒', value: '200', label: 'minuti AI utilizzati' },
      { icon: '💼', value: '0', label: 'personale aggiuntivo' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    client: {
      name: 'Rossi Realty',
      location: 'Milano, Italia',
      revenue: '€2 – 5 milioni',
      teamSize: '5 agenti'
    },
    challenge: {
      description: 'Prima di collaborare con Automis.ai, Rossi Realty:',
      points: [
        'Perdeva il 30% delle richieste di visite immobiliari in ingresso (in media 90 chiamate perse al mese)',
        'Si affidava a due dipendenti full-time che dedicavano 20 ore/settimana a follow-up manuali via email e richiamate',
        'Registrava un tasso di no-show del 25% per le visite programmate'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Audit & Discovery (Settimana 1)',
          items: [
            'Kickoff di 2 ore con il CEO Marco Rossi e il team vendite',
            'Mappatura completa del funnel: click annuncio → form landing page → instradamento chiamata → follow-up agente',
            'Individuati tre punti critici: assenza di copertura 24/7, inserimento manuale dei dati in Pipedrive (≈4 ore/giorno), nessun reminder automatico per le visite'
          ]
        },
        {
          title: 'Implementazione Receptionist AI (Settimana 2)',
          items: [
            'Scripting e rilascio di un agente Voice AI white-label',
            'Gestione chiamate inbound 24/7, qualificazione dei chiamanti (“Budget? ✔️” / “Zona preferita? ✔️”) e proposta slot disponibili',
            'Trasferimento dei contatti ad alta intenzione agli agenti live in orario d’ufficio'
          ]
        },
        {
          title: 'Integrazioni di Sistema (Settimana 2)',
          items: [
            'Sync Calendly ↔ Pipedrive: creazione automatica degli eventi “Visita” con dati completi del contatto',
            'Workflow Zapier: invio automatico di SMS ed email di promemoria 24 ore e 1 ora prima dell’appuntamento'
          ]
        },
        {
          title: 'Follow-Up Automatizzato (Da Settimana 3)',
          items: [
            'Per i contatti senza risposta, avviata una sequenza nurture in 3 step:',
            'Email immediata con riepilogo dell’immobile',
            'SMS di promemoria dopo 12 ore',
            'Messaggio WhatsApp personalizzato dopo 48 ore'
          ]
        }
      ]
    },
    results: {
      title: 'Risultati (Primi 30 Giorni)',
      metrics: [
        { label: 'Chiamate Inbound Risposte', before: '210/mese', after: '330/mese', improvement: '+57%' },
        { label: 'Tasso di Chiamate Perse', before: '30% (90 chiamate)', after: '0%', improvement: '–100%' },
        { label: 'Visite Programmate', before: '40/mese', after: '65/mese', improvement: '+62,5%' },
        { label: 'Tasso di No-Show', before: '25% (10 no-show)', after: '10% (6 no-show)', improvement: '–60%' },
        { label: 'Tempo di Follow-Up Agenti', before: '80 ore/settimana', after: '20 ore/settimana', improvement: '–75%' },
        { label: 'Nuovo Pipeline Commissioni Stimato', before: '€15.000/mese', after: '€45.000/mese', improvement: '+300%' }
      ]
    },
    testimonial: {
      quote: 'Automis.ai ha trasformato il nostro modo di gestire le richieste: ogni contatto viene acquisito, qualificato e prenotato. I nostri agenti si concentrano sulla chiusura, non sulle chiamate.',
      author: 'Marco Rossi',
      title: 'Direttore Generale, Rossi Realty'
    }
  },
  {
    slug: 'dental-clinic-smilebright',
    industry: 'Clinica Dentale',
    title: 'SmileBright Dental ha recuperato il 18% delle chiamate perse',
    primaryMetric: '+€4K',
    primaryMetricLabel: 'fatturato mensile',
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
        'Il 30% delle chiamate per appuntamenti perse (≈200 chiamate/mese)',
        'Processo manuale di richiamata che consumava 25 ore/settimana di tempo amministrativo',
        'Un tasso chiamata→prenotazione di solo il 52%',
        'Un tasso di no-show del 20%'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Audit & Discovery (Settimana 1)',
          items: [
            'Kickoff di 90 minuti con il clinic manager e il team di front desk',
            'Mappatura del percorso paziente: form sito → chiamata → pianificazione manuale',
            'Identificati gap chiave: nessuna copertura fuori orario, dati frammentati, assenza di reminder automatici'
          ]
        },
        {
          title: 'Implementazione Receptionist AI (Settimana 2)',
          items: [
            'Rilascio di un agente Voice AI personalizzato attivo 24/7',
            'Raccolta nome paziente, interesse per la procedura e dettagli assicurativi',
            'Proposta di slot disponibili basati sul calendario in tempo reale',
            'Gestione delle richieste complesse passate allo staff in orario d’ufficio'
          ]
        },
        {
          title: 'Integrazioni di Sistema (Settimana 2)',
          items: [
            'Sync Calendly ↔ Gestionale Clinico (Dentrix): creazione automatica dei record paziente e prenotazioni',
            'Workflow Zapier: SMS ed email di promemoria 48 ore e 2 ore prima dell’appuntamento'
          ]
        },
        {
          title: 'Follow-Up Automatizzato (Da Settimana 3)',
          items: [
            'Email personalizzata ai pazienti che non prenotavano subito',
            'SMS di promemoria dopo 24 ore',
            'Messaggio WhatsApp con proposta di richiamata'
          ]
        }
      ]
    },
    results: {
      title: 'Risultati (Primi 30 Giorni)',
      metrics: [
        { label: 'Chiamate Inbound Risposte', before: '140/mese', after: '290/mese', improvement: '+107%' },
        { label: 'Recupero Chiamate Perse', before: '0%', after: '18% (≈150 chiamate)', improvement: '+18 pt' },
        { label: 'Tasso Chiamata→Prenotazione', before: '52% (73 prenotazioni)', after: '70% (203 prenotazioni)', improvement: '+18 pt' },
        { label: 'Tasso di No-Show', before: '20% (15 no-show)', after: '10% (20 no-show)', improvement: '–50%' },
        { label: 'Tempo Follow-Up Amministrativo', before: '25 ore/settimana', after: '5 ore/settimana', improvement: '–80%' },
        { label: 'Nuovo Fatturato Mensile Stimato', before: '€1.500', after: '€5.500', improvement: '+367%' }
      ],
      highlights: [
        '150 chiamate recuperate gestite dall’AI',
        '97 minuti AI utilizzati per qualificazione',
        '90% di presenza sugli appuntamenti prenotati dall’AI'
      ]
    },
    testimonial: {
      quote: 'Con la receptionist Voice AI di Automis.ai non perdiamo più una chiamata. Il front desk si concentra sulla cura e il fatturato è cresciuto di €4K/mese.',
      author: 'Dr. Andrew Tate',
      title: 'Responsabile Marketing Clinica, SmileBright Dental'
    }
  },
  {
    slug: 'medspa-glow-go-aesthetics',
    industry: 'Medical Spa',
    title: 'Glow & Go Aesthetics ha recuperato 120 consulenze perse',
    primaryMetric: '+267%',
    primaryMetricLabel: 'ricavi incrementali',
    supportingMetrics: [
      { icon: '📞', value: '120', label: 'richieste recuperate' },
      { icon: '📈', value: '+20pt', label: 'tasso di prenotazione' },
      { icon: '⏰', value: '73%', label: 'meno tempo amministrativo' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    client: {
      name: 'Glow & Go Aesthetics',
      location: 'Roma, Italia',
      revenue: '€1,5 – 3 milioni',
      teamSize: '4 specialisti estetici, 2 coordinatori front desk'
    },
    challenge: {
      description: 'Glow & Go Aesthetics aveva difficoltà con:',
      points: [
        'Il 25% delle richieste di consulenza senza risposta fuori orario (≈120/mese)',
        '30 ore/settimana spese dal front desk per conferme e riprogrammazioni',
        'Tasso di conversione prenotazioni del 48%',
        'Tasso di no-show del 15%'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Audit & Discovery (Settimana 1)',
          items: [
            'Kickoff di 90 minuti con clinic manager e coordinatori',
            'Mappatura percorso richieste: form sito → email automatica → richiamata → prenotazione',
            'Individuati punti critici: assenza supporto fuori orario, reminder manuali, dati frammentati'
          ]
        },
        {
          title: 'Implementazione Receptionist AI (Settimana 2)',
          items: [
            'Sviluppo di un agente Voice AI brandizzato attivo 24/7',
            'Raccolta nome cliente, trattamento desiderato, data/orario preferiti',
            'Suggerimento slot disponibili basati su Acuity Scheduling',
            'Escalation delle richieste complesse allo staff'
          ]
        },
        {
          title: 'Integrazioni di Sistema (Settimana 2)',
          items: [
            'Sync Acuity Scheduling ↔ Pipedrive',
            'Reminder automatici via SMS ed email 48 ore e 2 ore prima'
          ]
        },
        {
          title: 'Follow-Up Automatizzato (Da Settimana 3)',
          items: [
            'Email di ringraziamento personalizzata',
            'SMS dopo 24 ore',
            'WhatsApp con guida skincare gratuita e link richiamata'
          ]
        }
      ]
    },
    results: {
      title: 'Risultati (Primi 30 Giorni)',
      metrics: [
        { label: 'Copertura Richieste', before: '75%', after: '100%', improvement: '+25 pt' },
        { label: 'Recupero Richieste Perse', before: '0%', after: '18% (≈120)', improvement: '+18 pt' },
        { label: 'Tasso di Conversione Prenotazioni', before: '48% (144)', after: '68% (382)', improvement: '+20 pt' },
        { label: 'Tasso di No-Show', before: '15%', after: '6%', improvement: '–60%' },
        { label: 'Ore Amministrative Front Desk', before: '30 ore/settimana', after: '8 ore/settimana', improvement: '–73%' },
        { label: 'Ricavi Incrementali', before: '€4.800/mese', after: '€12.800/mese', improvement: '+267%' }
      ],
      highlights: [
        '120 richieste recuperate dall’AI',
        '40 minuti AI/giorno per qualificazione e prenotazione',
        '94% di presenza sugli appuntamenti prenotati dall’AI'
      ]
    },
    testimonial: {
      quote: 'La soluzione Automis.ai è come assumere due coordinatori in più, senza costi di personale. Abbiamo recuperato oltre 100 consulenze in un mese.',
      author: 'Laura Bianchi',
      title: 'Titolare & Lead Aesthetician'
    }
  },
  {
    slug: 'home-services-coolhome-hvac',
    industry: 'Servizi per la Casa',
    title: 'CoolHome HVAC ha aumentato gli appuntamenti del 120%',
    primaryMetric: '+120%',
    primaryMetricLabel: 'appuntamenti prenotati',
    supportingMetrics: [
      { icon: '📊', value: '+7pt', label: 'tasso lead' },
      { icon: '📅', value: '110', label: 'prenotazioni mensili' },
      { icon: '⏱️', value: '-80%', label: 'tempo di pianificazione' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    client: {
      name: 'CoolHome HVAC',
      location: 'Torino, Italia',
      revenue: '€1 – 3 milioni',
      serviceArea: 'Installazioni residenziali e riparazioni urgenti'
    },
    challenge: {
      description: 'CoolHome HVAC aveva difficoltà con:',
      points: [
        'ROI ads basso: 1.200 click/mese → 60 lead qualificati (5%)',
        'Chiamate fuori orario perse: 40% delle richieste di emergenza',
        'Pianificazione manuale: 15 ore/settimana'
      ]
    },
    solution: {
      phases: [
        {
          title: 'Advertising Mirato (Settimane 1–2)',
          items: [
            'Ottimizzazione campagne Meta verso pubblico ad alta intenzione',
            'Test A/B di 3 creatività',
            'Incremento lead rate dal 5% al 12%'
          ]
        },
        {
          title: 'Receptionist AI & Automazione Vocale (Settimana 2)',
          items: [
            'Agente Voice AI 24/7 per richieste urgenti e standard',
            'Raccolta tipo servizio, posizione e urgenza'
          ]
        },
        {
          title: 'Automazioni di Workflow (Settimana 3)',
          items: [
            'Integrazione CRM Pipedrive',
            'SMS di conferma, reminder 2 ore prima e email post-intervento'
          ]
        },
        {
          title: 'Ottimizzazione Continua (Settimane 4–6)',
          items: [
            'Ottimizzazione budget ads settimanale',
            'Sequenza nurture AI (email → SMS → WhatsApp)'
          ]
        }
      ]
    },
    results: {
      title: 'Risultati (Primi 30 Giorni)',
      metrics: [
        { label: 'Tasso Lead Qualificati', before: '5% (60 su 1.200)', after: '12% (180 su 1.500)', improvement: '+7 pt' },
        { label: 'Richieste Gestite', before: '180/mese', after: '310/mese', improvement: '+72%' },
        { label: 'Minuti AI Utilizzati', before: '—', after: '120 minuti', improvement: '—' },
        { label: 'Appuntamenti Programmati', before: '50/mese', after: '110/mese', improvement: '+120%' },
        { label: 'Tempo Amministrativo', before: '15 ore/settimana', after: '3 ore/settimana', improvement: '–80%' },
        { label: 'Nuovi Ricavi Stimati', before: '€8.000/mese', after: '€18.000/mese', improvement: '+125%' }
      ]
    },
    testimonial: {
      quote: 'Unendo advertising intelligente e automazioni AI, Automis.ai ha raddoppiato i lavori programmati senza assumere nuovo personale.',
      author: 'Marco Bianchi',
      title: 'Operations Manager, CoolHome HVAC'
    }
  }
];