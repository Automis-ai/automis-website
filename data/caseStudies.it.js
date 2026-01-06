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
  quote: "Con l'Agente Vocale AI di Automis non perdiamo più una chiamata. Il front desk oggi si concentra sui pazienti e il fatturato è cresciuto di €4.000 al mese.",
  author: "Dr. Andrew Tate",
  title: "Responsabile Marketing, SmileBright Dental"
}
  },
  {
  slug: "medspa-glow-go-aesthetics",
  industry: "Medical Spa",
  title: "Glow & Go Aesthetics ha recuperato 120 consulenze perse",
  primaryMetric: "+267%",
  primaryMetricLabel: "di fatturato incrementale",
  supportingMetrics: [
    { icon: "📞", value: "120", label: "richieste recuperate" },
    { icon: "📈", value: "+20pt", label: "tasso di prenotazione" },
    { icon: "⏰", value: "73%", label: "meno tempo amministrativo" }
  ],
  heroImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  client: {
    name: "Glow & Go Aesthetics",
    location: "Roma, Italia",
    revenue: "€1,5 – 3 milioni",
    teamSize: "4 specialisti estetici, 2 coordinatori front-desk"
  },
  challenge: {
    description: "Glow & Go Aesthetics affrontava i seguenti problemi:",
    points: [
      "Il 25% delle richieste di consulenza rimaneva senza risposta fuori dall’orario di ufficio (≈120 richieste perse al mese)",
      "Il team di front-desk impiegava 30 ore a settimana per confermare e riprogrammare i trattamenti",
      "Un tasso di conversione prenotazioni pari solo al 48% dalle richieste alle consulenze fissate",
      "Un tasso di no-show del 15%, con conseguente perdita di slot e fatturato"
    ]
  },
  solution: {
    phases: [
      {
        title: "Audit & Discovery (Settimana 1)",
        items: [
          "Kickoff di 90 minuti con la responsabile della clinica e due coordinatori",
          "Mappatura del percorso di richiesta: form sul sito → email automatica → richiamata → prenotazione",
          "Individuazione dei colli di bottiglia: assenza di copertura fuori orario, reminder manuali e dati frammentati tra i sistemi di prenotazione"
        ]
      },
      {
        title: "Implementazione Agente Vocale AI (Settimana 2)",
        items: [
          "Sviluppo di un agente vocale AI brandizzato attivo 24/7",
          "Raccolta di nome cliente, trattamento desiderato e data/orario preferiti",
          "Suggerimento degli slot disponibili tramite calendario live su Acuity Scheduling",
          "Escalation delle richieste complesse al personale umano in orario di ufficio"
        ]
      },
      {
        title: "Integrazioni di Sistema (Settimana 2)",
        items: [
          "Integrazione Acuity Scheduling ↔ Pipedrive per la creazione automatica di contatti e appuntamenti",
          "Reminder automatici via SMS ed email inviati 48 ore e 2 ore prima dell’appuntamento"
        ]
      },
      {
        title: "Follow-up Automatizzato (Dalla Settimana 3)",
        items: [
          "Invio di email personalizzata di ringraziamento con i dettagli del trattamento",
          "Reminder via SMS dopo 24 ore",
          "Messaggio WhatsApp con guida skincare gratuita e link per essere richiamati"
        ]
      }
    ]
  },
  results: {
    title: "Risultati (Primi 30 giorni)",
    metrics: [
      { label: "Copertura richieste consulenza", before: "75%", after: "100%", improvement: "+25 pt" },
      { label: "Recupero richieste perse", before: "0%", after: "18% (≈120 richieste)", improvement: "+18 pt" },
      { label: "Tasso di conversione prenotazioni", before: "48% (144 prenotazioni)", after: "68% (382 prenotazioni)", improvement: "+20 pt" },
      { label: "Tasso di no-show", before: "15%", after: "6%", improvement: "–60%" },
      { label: "Ore amministrative front-desk", before: "30 ore/settimana", after: "8 ore/settimana", improvement: "–73%" },
      { label: "Fatturato incrementale", before: "€4.800/mese", after: "€12.800/mese", improvement: "+267%" }
    ],
    highlights: [
      "120 richieste perse recuperate dall’AI",
      "40 minuti AI al giorno per qualificazione e prenotazione",
      "94% di show-rate sugli appuntamenti fissati dall’AI"
    ]
  },
  testimonial: {
    quote: "La soluzione di Automis.ai è stata come assumere due coordinatori in più, senza i costi del personale. Abbiamo recuperato oltre 100 consulenze in un solo mese e oggi i nostri specialisti si concentrano esclusivamente sui clienti.",
    author: "Laura Bianchi",
    title: "Titolare & Responsabile Estetica"
  }
},
{
  slug: "home-services-coolhome-hvac",
  industry: "Servizi per la Casa",
  title: "CoolHome HVAC ha aumentato gli appuntamenti del 120%",
  primaryMetric: "+120%",
  primaryMetricLabel: "appuntamenti prenotati",
  supportingMetrics: [
    { icon: "📊", value: "+7pt", label: "tasso di lead qualificati" },
    { icon: "📅", value: "110", label: "prenotazioni mensili" },
    { icon: "⏱️", value: "-80%", label: "tempo di pianificazione" }
  ],
  heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
  client: {
    name: "CoolHome HVAC",
    location: "Torino, Italia",
    revenue: "€1 – 3 milioni",
    serviceArea: "Installazioni residenziali e interventi di emergenza"
  },
  challenge: {
    description: "CoolHome HVAC affrontava le seguenti criticità:",
    points: [
      "ROI basso sulle Ads: 1.200 click/mese ma solo 60 lead qualificati (5%)",
      "40% delle chiamate di emergenza perse fuori orario",
      "15 ore a settimana spese dal personale per pianificare appuntamenti e follow-up"
    ]
  },
  solution: {
    phases: [
      {
        title: "Advertising Mirato (Settimane 1–2)",
        items: [
          "Ottimizzazione delle campagne Meta verso utenti ad alta intenzione (proprietari entro 5 km)",
          "Test A/B su 3 creatività: emergenze, manutenzione stagionale, nuove installazioni",
          "Incremento del lead rate dal 5% al 12% in due settimane"
        ]
      },
      {
        title: "Agente Vocale AI & Automazione Chiamate (Settimana 2)",
        items: [
          "Agente vocale AI attivo 24/7 per richieste urgenti e standard",
          "Raccolta di tipo di intervento, località e urgenza con assegnazione automatica degli slot"
        ]
      },
      {
        title: "Automazioni di Workflow (Settimana 3)",
        items: [
          "Integrazione CRM: lead da Ads e chiamate registrati automaticamente in Pipedrive",
          "Flussi appuntamenti: SMS di conferma immediata, reminder 2 ore prima e email post-intervento per recensioni"
        ]
      },
      {
        title: "Ottimizzazione Continua (Settimane 4–6)",
        items: [
          "Ottimizzazione settimanale dei budget Ads sulle audience più performanti",
          "Sequenza di nurturing AI per i lead non convertiti (email → SMS → WhatsApp)"
        ]
      }
    ]
  },
  results: {
    title: "Risultati (Primi 30 giorni)",
    metrics: [
      { label: "Lead qualificati", before: "5% (60 su 1.200)", after: "12% (180 su 1.500)", improvement: "+7 pt" },
      { label: "Richieste gestite", before: "180/mese", after: "310/mese", improvement: "+72%" },
      { label: "Minuti AI utilizzati", before: "—", after: "120 minuti", improvement: "—" },
      { label: "Appuntamenti fissati", before: "50/mese", after: "110/mese", improvement: "+120%" },
      { label: "Tempo pianificazione admin", before: "15 ore/settimana", after: "3 ore/settimana", improvement: "–80%" },
      { label: "Nuovo fatturato stimato", before: "€8.000/mese", after: "€18.000/mese", improvement: "+125%" }
    ]
  },
  testimonial: {
    quote: "Combinando advertising intelligente, automazioni AI e l’agente vocale di Automis.ai abbiamo raddoppiato gli interventi programmati in un solo mese, senza assumere nuovo personale.",
    author: "Marco Bianchi",
    title: "Operations Manager, CoolHome HVAC"
  }
}