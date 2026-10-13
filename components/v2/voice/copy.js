/*
  Testi della pagina Voice AI (v2), nelle tre lingue. Sono ESATTAMENTE i testi della pagina precedente (components/voice-ai/*:
  stesse parole, stessi prezzi, stessa garanzia): qui sono solo raccolti in un unico file. Cambia la forma, non il contenuto.
  Aggiunte: `ui` (etichette dei nuovi elementi: catena finale, riproduzione del video, «Leggi di più»).
  Niente numeri nuovi: i prezzi (297 / 497 / 697 €), i minuti e la garanzia a 30 giorni sono quelli della pagina di prima.
*/
export default {
  "en": {
    "hero": {
      "eyebrow": "Flagship · Automis Voice AI",
      "title": "The AI receptionist that turns every call into a booked appointment.",
      "highlight": "booked appointment",
      "subtitle": "Automis Voice AI answers every call 24/7, qualifies the lead, books it on your calendar, and syncs it to your CRM. Nights, weekends, holidays. No missed calls, no lost revenue.",
      "cta": "Book a Discovery Call",
      "videoTitle": "How Automis Voice AI works"
    },
    "problem": {
      "eyebrow": "The problem",
      "title": "Every missed call and cold lead is a booking you never see.",
      "lead": "Calls come in when no one is free to answer, on nights, weekends, and busy afternoons. New leads come in faster than anyone can call back. Either way, the appointment goes to whoever picks up first.",
      "pains": [
        {
          "title": "Missed calls are lost customers",
          "body": "Every unanswered call is a prospect who dials the next business on the list. Voicemail rarely gets a callback, and the booking is gone before you even know it rang."
        },
        {
          "title": "Nobody answers after hours",
          "body": "Most inquiries land outside 9-to-5, on nights and weekends. If there is no one to pick up, the after-hours demand you paid to generate quietly leaks away."
        },
        {
          "title": "Slow follow-up kills the deal",
          "body": "Leads go cold in minutes. When it takes hours to call back, the intent is gone and the appointment goes to whoever answered first."
        }
      ]
    },
    "modes": {
      "eyebrow": "Inbound and outbound",
      "title": "One system, two specialized agents.",
      "highlight": "two specialized agents",
      "lead": "One agent answers the calls coming in like a 24/7 receptionist. A second works the calls going out, turning the leads you already paid for into booked appointments.",
      "inbound": {
        "eyebrow": "Inbound",
        "title": "Your 24/7 receptionist",
        "intro": "Answers every incoming call in a natural voice, day or night, so no caller hits voicemail or dials a competitor.",
        "items": [
          {
            "title": "Answer every call instantly",
            "what": "Picks up on the first ring in a natural voice, so callers are helped right away instead of waiting on hold or hitting voicemail.",
            "outcome": "No caller lost to a busy or ringing phone"
          },
          {
            "title": "After-hours and weekend cover",
            "what": "Handles calls on nights, weekends, and holidays, capturing the inquiries that would go unanswered when the office is closed.",
            "outcome": "Coverage when your team is offline"
          },
          {
            "title": "Book and reschedule appointments",
            "what": "Checks live calendar availability and books, moves, or cancels appointments, then confirms and syncs to your scheduling system.",
            "outcome": "More slots filled without staff effort"
          },
          {
            "title": "Answer common questions",
            "what": "Responds to routine questions like hours, location, services, and typical pricing, so your staff are not interrupted.",
            "outcome": "Fewer routine calls tying up your team"
          },
          {
            "title": "Qualify and route callers",
            "what": "Asks a few qualifying questions, captures why the person is calling, and routes hot or urgent callers to the right person.",
            "outcome": "The right caller reaches the right person"
          },
          {
            "title": "Catch missed and overflow calls",
            "what": "Steps in when staff are on another line or with a client, taking the caller's details so nothing slips through when it is busy.",
            "outcome": "Every inquiry captured, not lost"
          }
        ]
      },
      "outbound": {
        "eyebrow": "Outbound",
        "title": "Your growth engine",
        "intro": "Calls the leads you already paid for: new leads in seconds, cold ones revived, and follow-ups so nothing goes cold.",
        "items": [
          {
            "title": "Instant speed-to-lead callback",
            "what": "The moment a form, ad, or web lead comes in, the agent calls back within seconds to qualify and book while interest is hot.",
            "outcome": "Reach leads before your competitors do"
          },
          {
            "title": "Reactivate cold leads",
            "what": "Works through old or dormant CRM lists, re-engages past inquiries in a natural voice, and re-books the ones still interested.",
            "outcome": "New appointments from leads already in your database"
          },
          {
            "title": "Reminders and confirmations",
            "what": "Calls ahead of each appointment to confirm, answer quick questions, and reschedule instead of losing the slot.",
            "outcome": "Fewer no-shows, a fuller calendar"
          },
          {
            "title": "Quote and estimate follow-up",
            "what": "After a quote, proposal, or treatment plan goes out, the agent follows up by phone to handle objections and move it forward.",
            "outcome": "More estimates turn into signed clients"
          },
          {
            "title": "Missed-call auto-callback",
            "what": "Every missed or abandoned call triggers an automatic callback, so the caller is reached in minutes, not lost to voicemail.",
            "outcome": "Recover revenue that would walk to a competitor"
          },
          {
            "title": "Review and re-booking calls",
            "what": "After a visit the agent asks for feedback or a review, and reaches out to lapsed customers to bring them back in.",
            "outcome": "More reviews and repeat business"
          }
        ]
      }
    },
    "how": {
      "eyebrow": "How it works",
      "title": "From ring to booked appointment, on autopilot.",
      "lead": "One connected flow that runs every call the same way, every time.",
      "steps": [
        {
          "title": "Answers every call",
          "body": "Picks up on the first ring, 24/7, in a natural voice. No hold music, no voicemail, no missed calls."
        },
        {
          "title": "Qualifies the lead",
          "body": "Asks your questions, understands the request, and captures the details that matter before booking."
        },
        {
          "title": "Books the appointment",
          "body": "Checks live availability and books directly onto your calendar, with confirmation to the caller."
        },
        {
          "title": "Syncs to your CRM",
          "body": "Contact, outcome, and notes flow straight into your CRM, so nothing is retyped and nothing is lost."
        },
        {
          "title": "Recovers missed calls",
          "body": "If a call ever slips through, it calls the number back automatically to win the booking anyway."
        }
      ]
    },
    "dash": {
      "eyebrow": "You see everything",
      "title": "Full transparency into every call your AI handles.",
      "lead": "No black box. Start with a live overview of your calls, success rate, and trends, then open any single call for the recording, transcript, and AI summary.",
      "leadCaption": "Your dashboard overview: calls, success rate, and trends, live",
      "detailTitle": "Open any call to see the whole story",
      "detailBody": "Click into a single call and you get the full recording, a searchable transcript, and an AI summary of what happened and what to do next. Nothing is hidden, so you always know exactly how your front desk is performing.",
      "tagRecording": "Recording",
      "tagTranscript": "Transcript",
      "tagSummary": "AI summary",
      "callDetailAlt": "One call opened: recording, transcript, and AI summary",
      "callDetailCaption": "One call, opened: recording, transcript, and AI summary"
    },
    "crm": {
      "eyebrow": "The CRM",
      "title": "Three levels of visibility, from booked to closed.",
      "lead": "Start with a clean view of your bookings and grow into a full pipeline as your sales operation does.",
      "privacy": "Customer names and numbers are blurred for privacy.",
      "tiers": [
        {
          "kicker": "Level 1",
          "title": "Bookings",
          "body": "Every appointment the AI booked, in one place. See what is on the calendar without touching a spreadsheet.",
          "points": [
            "Every AI-booked appointment",
            "Date, time, and contact at a glance",
            "Synced to your calendar"
          ],
          "caption": "Bookings, every AI-booked appointment, with call outcome"
        },
        {
          "kicker": "Level 2",
          "title": "Light CRM",
          "body": "Contacts with the outcome and sentiment of every call, so you know who to follow up with and why.",
          "points": [
            "Contacts + call outcomes",
            "Sentiment on every interaction",
            "Follow-up context, ready to act on"
          ],
          "caption": "Light CRM, call outcomes and sentiment on every contact"
        },
        {
          "kicker": "Level 3",
          "title": "Pipeline",
          "body": "A full kanban sales board. Drag deals through your stages and watch the AI feed the top of the funnel.",
          "points": [
            "Kanban sales stages",
            "Deals moved as they progress",
            "AI keeps the funnel full"
          ],
          "caption": "Pipeline, a kanban board the AI keeps feeding from the top"
        }
      ]
    },
    "pricing": {
      "eyebrow": "Pricing",
      "title": "Simple plans that pay for themselves in booked appointments.",
      "lead": "Pick the level that matches how you sell. Upgrade any time as you grow.",
      "mostPopular": "Most popular",
      "bookCta": "Book a Discovery Call",
      "enterprise": {
        "label": "Enterprise / Custom",
        "heading": "High volume, multiple locations, or bespoke integrations?",
        "body": "Custom call volume, dedicated support, and a system scoped and priced around exactly how your business runs.",
        "cta": "Let's talk"
      },
      "guarantee": {
        "title": "30-day performance guarantee",
        "body": "Every plan is backed by our 30-day performance guarantee. If it does not perform, you are covered."
      },
      "tiers": [
        {
          "name": "Starter",
          "price": "€297",
          "period": "/mo",
          "tagline": "Everything you need to stop missing calls.",
          "features": [
            "200 minutes / month",
            "24/7 inbound call answering",
            "Booking + calendar sync",
            "Missed-call recovery",
            "Call notifications"
          ],
          "featured": false
        },
        {
          "name": "Growth",
          "price": "€497",
          "period": "/mo",
          "tagline": "Turn answered calls into a follow-up machine.",
          "features": [
            "600 minutes / month",
            "Everything in Starter",
            "CRM sync (GoHighLevel / HubSpot)",
            "SMS & WhatsApp reminders",
            "Automated follow-ups",
            "Multi-calendar / multi-staff"
          ],
          "featured": true
        },
        {
          "name": "Scale",
          "price": "€697",
          "period": "/mo",
          "tagline": "A full acquisition engine, voice and beyond.",
          "features": [
            "1,500 minutes / month",
            "Everything in Growth",
            "WhatsApp chatbot",
            "Outbound campaigns",
            "Custom integrations",
            "Priority + human-in-the-loop",
            "Advanced analytics"
          ],
          "featured": false
        }
      ]
    },
    "faq": {
      "eyebrow": "FAQ",
      "title": "Questions, answered.",
      "faqs": [
        {
          "q": "So, what is this Voice AI thing all about?",
          "a": "Think of Automis Voice AI as a super-smart virtual receptionist for your business. It handles customer calls, books appointments, answers questions, and even makes outbound calls, all while sounding surprisingly human. It is like an extra team member who never sleeps."
        },
        {
          "q": "Can it really understand what customers are saying?",
          "a": "Yes. Our Voice AI uses advanced speech tech to understand context, accents, and even industry jargon. It is not just hearing words, it is getting the meaning behind them. So whether your customer has a strong accent or uses a lot of technical terms, the AI has it covered."
        },
        {
          "q": "Will it work with the systems we already use?",
          "a": "Absolutely. Voice AI integrates with your CRM, calendar, and other business tools. Our team sets everything up so it fits right into your current workflow, no need to overhaul your entire system."
        },
        {
          "q": "What if the AI gets stumped by a question?",
          "a": "While the AI is smart, we know it cannot handle everything. If it hits a question it cannot answer, it smoothly hands the call to a human. Your customers always get the help they need, one way or another."
        },
        {
          "q": "How do we keep track of how well it is doing?",
          "a": "You get a full analytics dashboard: call volumes, resolution rates, customer satisfaction, and more. It is a bird's-eye view of your customer interactions that helps you spot trends and areas to improve, with every call recorded, transcribed, and summarized."
        }
      ]
    },
    "booking": {
      "eyebrow": "Put it to work",
      "headingPre": "Get your AI voice agent ",
      "headingGrad": "answering, qualifying, and booking 24/7",
      "headingPost": ".",
      "paragraph": "Book a discovery call and we will set up a voice agent that picks up every call, qualifies the lead, and books it straight onto your calendar, day, night, and weekend. No missed calls, no lost revenue.",
      "bullets": [
        "A 30-minute call, hear your AI voice agent live",
        "We map your calls, hours, and where bookings slip away",
        "Leave with a plan for a voice agent that answers 24/7"
      ],
      "cta": "Book a Discovery Call",
      "calHeader": "Live availability · 30-min call",
      "calConfirm": "Instant confirmation",
      "calLoading": "Loading live calendar…",
      "iframeTitle": "Book a discovery call with Automis",
      "guarantee": "30-day performance guarantee",
      "gdpr": "GDPR-aligned",
      "noObligation": "No obligation"
    }
  },
  "it": {
    "hero": {
      "eyebrow": "Prodotto di punta · Assistente Vocale Automis",
      "title": "L'assistente vocale che trasforma ogni chiamata in un appuntamento fissato.",
      "highlight": "appuntamento fissato",
      "subtitle": "L'assistente vocale di Automis risponde a ogni chiamata 24/7, qualifica il contatto, lo fissa sul tuo calendario e lo sincronizza con il tuo CRM. Notti, weekend, festivi. Nessuna chiamata persa, nessun fatturato perso.",
      "cta": "Prenota una call",
      "videoTitle": "Come funziona l'assistente vocale di Automis"
    },
    "problem": {
      "eyebrow": "Il problema",
      "title": "Ogni chiamata persa e ogni contatto lasciato raffreddare è una prenotazione che non vedrai mai.",
      "lead": "Le chiamate arrivano quando non c'è nessuno libero a rispondere: di sera, nei weekend, nei pomeriggi più intensi. E i nuovi contatti arrivano più in fretta di quanto chiunque riesca a richiamarli. In entrambi i casi, l'appuntamento va a chi risponde per primo.",
      "pains": [
        {
          "title": "Una chiamata persa è un cliente perso",
          "body": "Ogni chiamata senza risposta è un potenziale cliente che chiama subito il prossimo nome della lista. Alla segreteria quasi nessuno lascia un messaggio, e la prenotazione è già sfumata prima ancora che tu sappia che il telefono ha squillato."
        },
        {
          "title": "Fuori orario non risponde nessuno",
          "body": "La maggior parte delle richieste arriva fuori dal 9-18, di sera e nei weekend. Se non c'è nessuno a rispondere, la domanda fuori orario che hai pagato per generare si disperde in silenzio."
        },
        {
          "title": "Un follow-up lento fa saltare la trattativa",
          "body": "I contatti si raffreddano in pochi minuti. Se per richiamare ci vogliono ore, l'interesse è già svanito e l'appuntamento va a chi ha risposto per primo."
        }
      ]
    },
    "modes": {
      "eyebrow": "Inbound e outbound",
      "title": "Un sistema, due agenti specializzati.",
      "highlight": "due agenti specializzati",
      "lead": "Un agente risponde alle chiamate in entrata come un assistente vocale attivo 24/7. Un secondo lavora le chiamate in uscita, trasformando i contatti che hai già pagato in appuntamenti fissati.",
      "inbound": {
        "eyebrow": "Inbound",
        "title": "Il tuo assistente vocale attivo 24/7",
        "intro": "Risponde a ogni chiamata in entrata con una voce naturale, giorno e notte, così nessuno finisce in segreteria o chiama un concorrente.",
        "items": [
          {
            "title": "Rispondi a ogni chiamata all'istante",
            "what": "Risponde al primo squillo con una voce naturale, così chi chiama viene aiutato subito invece di restare in attesa o finire in segreteria.",
            "outcome": "Nessuna chiamata persa per il telefono occupato o che squilla a vuoto"
          },
          {
            "title": "Copertura di sere e weekend",
            "what": "Gestisce le chiamate di sera, nei weekend e nei giorni festivi, intercettando le richieste che resterebbero senza risposta a ufficio chiuso.",
            "outcome": "Copertura anche quando il tuo team è offline"
          },
          {
            "title": "Prenota e sposta gli appuntamenti",
            "what": "Controlla in tempo reale la disponibilità del calendario e prenota, sposta o annulla gli appuntamenti, poi conferma e sincronizza con il tuo sistema di prenotazione.",
            "outcome": "Più slot riempiti senza sforzo per il team"
          },
          {
            "title": "Rispondi alle domande più comuni",
            "what": "Risponde alle domande di routine come orari, indirizzo, servizi e prezzi indicativi, così il tuo personale non viene interrotto.",
            "outcome": "Meno chiamate di routine che intasano il tuo team"
          },
          {
            "title": "Qualifica e smista chi chiama",
            "what": "Fa qualche domanda di qualifica, capisce il motivo della chiamata e indirizza i contatti caldi o urgenti alla persona giusta.",
            "outcome": "Chi chiama arriva sempre alla persona giusta"
          },
          {
            "title": "Recupera le chiamate perse e in eccesso",
            "what": "Interviene quando il personale è già al telefono o con un cliente, raccogliendo i dati di chi chiama così nulla va perso nei momenti di picco.",
            "outcome": "Ogni richiesta intercettata, non persa"
          }
        ]
      },
      "outbound": {
        "eyebrow": "Outbound",
        "title": "Il tuo motore di crescita",
        "intro": "Chiama i contatti che hai già pagato: i nuovi in pochi secondi, quelli freddi riattivati e i follow-up per non lasciare raffreddare nulla.",
        "items": [
          {
            "title": "Richiamo immediato al nuovo contatto",
            "what": "Nel momento in cui arriva un contatto da un form, un'inserzione o dal sito, l'agente richiama in pochi secondi per qualificarlo e fissare l'appuntamento mentre l'interesse è alto.",
            "outcome": "Raggiungi i contatti prima dei tuoi concorrenti"
          },
          {
            "title": "Riattiva i contatti freddi",
            "what": "Lavora le liste CRM vecchie o dormienti, riaccende i contatti passati con una voce naturale e riprenota chi è ancora interessato.",
            "outcome": "Nuovi appuntamenti da contatti già presenti nel tuo database"
          },
          {
            "title": "Promemoria e conferme",
            "what": "Chiama prima di ogni appuntamento per confermare, rispondere a domande veloci e riprogrammare invece di perdere lo slot.",
            "outcome": "Meno assenze, un calendario più pieno"
          },
          {
            "title": "Follow-up su preventivi e stime",
            "what": "Dopo l'invio di un preventivo, una proposta o un piano di trattamento, l'agente fa follow-up al telefono per gestire le obiezioni e far avanzare la trattativa.",
            "outcome": "Più preventivi che diventano clienti acquisiti"
          },
          {
            "title": "Richiamo automatico alle chiamate perse",
            "what": "Ogni chiamata persa o abbandonata attiva un richiamo automatico, così chi chiama viene raggiunto in pochi minuti invece di finire in segreteria.",
            "outcome": "Recuperi fatturato che sarebbe finito a un concorrente"
          },
          {
            "title": "Chiamate per recensioni e nuove prenotazioni",
            "what": "Dopo una visita l'agente chiede un parere o una recensione, e ricontatta i clienti persi per farli tornare.",
            "outcome": "Più recensioni e clienti che tornano"
          }
        ]
      }
    },
    "how": {
      "eyebrow": "Come funziona",
      "title": "Dallo squillo all'appuntamento prenotato, in automatico.",
      "lead": "Un unico flusso connesso che gestisce ogni chiamata allo stesso modo, sempre.",
      "steps": [
        {
          "title": "Risponde a ogni chiamata",
          "body": "Risponde al primo squillo, 24/7, con una voce naturale. Niente attese, niente segreteria, nessuna chiamata persa."
        },
        {
          "title": "Qualifica il contatto",
          "body": "Fa le tue domande, capisce la richiesta e raccoglie i dettagli che contano prima di prenotare."
        },
        {
          "title": "Prenota l'appuntamento",
          "body": "Controlla la disponibilità in tempo reale e prenota direttamente sul tuo calendario, con conferma a chi chiama."
        },
        {
          "title": "Si sincronizza col tuo CRM",
          "body": "Contatto, esito e note finiscono dritti nel tuo CRM: niente da ridigitare, niente che va perso."
        },
        {
          "title": "Recupera le chiamate perse",
          "body": "Se una chiamata sfugge, richiama il numero in automatico per conquistare comunque la prenotazione."
        }
      ]
    },
    "dash": {
      "eyebrow": "Vedi tutto",
      "title": "Trasparenza totale su ogni chiamata che gestisce la tua IA.",
      "lead": "Nessuna scatola nera. Parti da una panoramica in tempo reale di chiamate, tasso di successo e andamento, poi apri una singola chiamata per registrazione, trascrizione e riepilogo IA.",
      "leadCaption": "La panoramica della tua dashboard: chiamate, tasso di successo e andamento, in tempo reale",
      "detailTitle": "Apri una chiamata e vedi tutta la storia",
      "detailBody": "Apri una singola chiamata e trovi la registrazione completa, una trascrizione consultabile e un riepilogo IA di cosa è successo e cosa fare dopo. Niente è nascosto, così sai sempre esattamente come sta lavorando la tua reception.",
      "tagRecording": "Registrazione",
      "tagTranscript": "Trascrizione",
      "tagSummary": "Riepilogo IA",
      "callDetailAlt": "Una chiamata aperta: registrazione, trascrizione e riepilogo IA",
      "callDetailCaption": "Una chiamata, aperta: registrazione, trascrizione e riepilogo IA"
    },
    "crm": {
      "eyebrow": "Il CRM",
      "title": "Tre livelli di visibilità, dalla prenotazione alla chiusura.",
      "lead": "Parti da una vista pulita delle tue prenotazioni e cresci fino a una pipeline completa, man mano che cresce la tua attività di vendita.",
      "privacy": "Nomi e numeri dei clienti sono oscurati per privacy.",
      "tiers": [
        {
          "kicker": "Livello 1",
          "title": "Prenotazioni",
          "body": "Ogni appuntamento fissato dall'IA, in un unico posto. Vedi cosa c'è in calendario senza toccare un foglio di calcolo.",
          "points": [
            "Ogni appuntamento fissato dall'IA",
            "Data, ora e contatto a colpo d'occhio",
            "Sincronizzati con il tuo calendario"
          ],
          "caption": "Prenotazioni: ogni appuntamento fissato dall'IA, con l'esito della call"
        },
        {
          "kicker": "Livello 2",
          "title": "CRM leggero",
          "body": "Contatti con l'esito e il sentiment di ogni call, così sai chi ricontattare e perché.",
          "points": [
            "Contatti + esiti delle call",
            "Sentiment su ogni interazione",
            "Contesto del follow-up, pronto all'uso"
          ],
          "caption": "CRM leggero: esiti delle call e sentiment su ogni contatto"
        },
        {
          "kicker": "Livello 3",
          "title": "Pipeline",
          "body": "Una vera board kanban delle vendite. Trascina le trattative tra le fasi e guarda l'IA riempire la parte alta del funnel.",
          "points": [
            "Fasi di vendita in kanban",
            "Trattative che avanzano fase dopo fase",
            "L'IA mantiene il funnel pieno"
          ],
          "caption": "Pipeline: una board kanban che l'IA alimenta dall'alto"
        }
      ]
    },
    "pricing": {
      "eyebrow": "Prezzi",
      "title": "Piani semplici che si ripagano da soli in appuntamenti prenotati.",
      "lead": "Scegli il livello adatto a come vendi. Passa a un piano superiore quando vuoi, man mano che cresci.",
      "mostPopular": "Il più scelto",
      "bookCta": "Prenota una call",
      "enterprise": {
        "label": "Enterprise / Su misura",
        "heading": "Grandi volumi, più sedi o integrazioni su misura?",
        "body": "Volume di chiamate personalizzato, supporto dedicato e un sistema progettato e quotato esattamente su come lavora la tua azienda.",
        "cta": "Parliamone"
      },
      "guarantee": {
        "title": "Garanzia sui risultati a 30 giorni",
        "body": "Ogni piano è coperto dalla nostra garanzia sui risultati a 30 giorni. Se non funziona, sei coperto."
      },
      "tiers": [
        {
          "name": "Starter",
          "price": "€297",
          "period": "al mese",
          "tagline": "Tutto ciò che ti serve per non perdere più chiamate.",
          "features": [
            "200 minuti / mese",
            "Risposta alle chiamate inbound 24/7",
            "Prenotazioni + sincronizzazione del calendario",
            "Recupero delle chiamate perse",
            "Notifiche delle chiamate"
          ],
          "featured": false
        },
        {
          "name": "Growth",
          "price": "€497",
          "period": "al mese",
          "tagline": "Trasforma le chiamate in una macchina di follow-up.",
          "features": [
            "600 minuti / mese",
            "Tutto ciò che include Starter",
            "Sincronizzazione CRM (GoHighLevel / HubSpot)",
            "Promemoria via SMS e WhatsApp",
            "Follow-up automatici",
            "Multi-calendario / multi-operatore"
          ],
          "featured": true
        },
        {
          "name": "Scale",
          "price": "€697",
          "period": "al mese",
          "tagline": "Un motore di acquisizione completo: voce e non solo.",
          "features": [
            "1.500 minuti / mese",
            "Tutto ciò che include Growth",
            "Chatbot WhatsApp",
            "Campagne outbound",
            "Integrazioni su misura",
            "Priorità + supervisione umana",
            "Statistiche avanzate"
          ],
          "featured": false
        }
      ]
    },
    "faq": {
      "eyebrow": "Domande frequenti",
      "title": "Le tue domande, con risposta.",
      "faqs": [
        {
          "q": "Allora, di cosa si tratta esattamente questo assistente vocale?",
          "a": "Immagina l'assistente vocale di Automis come una segretaria virtuale super intelligente per il tuo business. Gestisce le chiamate dei clienti, prende appuntamenti, risponde alle domande e fa persino chiamate in outbound, il tutto con una voce sorprendentemente umana. È come avere un membro del team in più che non dorme mai."
        },
        {
          "q": "Capisce davvero cosa dicono i clienti?",
          "a": "Sì. Il nostro assistente vocale usa tecnologie di riconoscimento vocale avanzate per capire il contesto, gli accenti e persino il gergo del settore. Non si limita a sentire le parole: ne coglie il significato. Così, che il tuo cliente abbia un accento marcato o usi tanti termini tecnici, l'IA se la cava senza problemi."
        },
        {
          "q": "Funziona con i sistemi che già usiamo?",
          "a": "Assolutamente. L'assistente vocale si integra con il tuo CRM, il calendario e gli altri strumenti aziendali. Il nostro team configura tutto in modo che si inserisca perfettamente nel tuo flusso di lavoro attuale, senza bisogno di rivoluzionare l'intero sistema."
        },
        {
          "q": "E se l'IA si trova spiazzata da una domanda?",
          "a": "Per quanto sia intelligente, sappiamo che l'IA non può gestire tutto. Quando incontra una domanda a cui non sa rispondere, passa la chiamata a una persona in modo naturale, senza attriti. I tuoi clienti ricevono sempre l'aiuto di cui hanno bisogno, in un modo o nell'altro."
        },
        {
          "q": "Come teniamo traccia dei risultati?",
          "a": "Hai a disposizione una dashboard di analisi completa: volume delle chiamate, tassi di risoluzione, soddisfazione dei clienti e molto altro. È una visione d'insieme delle interazioni con i tuoi clienti che ti aiuta a individuare tendenze e aree da migliorare, con ogni chiamata registrata, trascritta e riassunta."
        }
      ]
    },
    "booking": {
      "eyebrow": "Mettila al lavoro",
      "headingPre": "Fai in modo che il tuo assistente vocale ",
      "headingGrad": "risponda, qualifichi e prenoti 24/7",
      "headingPost": ".",
      "paragraph": "Prenota una call e configuriamo un assistente vocale che risponde a ogni chiamata, qualifica il contatto e lo prenota direttamente sul tuo calendario, di giorno, di notte e nel weekend. Nessuna chiamata persa, nessun fatturato perso.",
      "bullets": [
        "Una call di 30 minuti: senti il tuo assistente vocale dal vivo",
        "Analizziamo le tue chiamate, gli orari e dove perdi prenotazioni",
        "Esci con un piano per un assistente vocale che risponde 24/7"
      ],
      "cta": "Prenota una call",
      "calHeader": "Disponibilità in tempo reale · call di 30 min",
      "calConfirm": "Conferma immediata",
      "calLoading": "Caricamento del calendario…",
      "iframeTitle": "Prenota una call con Automis",
      "guarantee": "Garanzia sui risultati a 30 giorni",
      "gdpr": "Conforme al GDPR",
      "noObligation": "Senza impegno"
    }
  },
  "pt": {
    "hero": {
      "eyebrow": "Produto de referência · Assistente de Voz Automis",
      "title": "O assistente de voz que transforma cada chamada numa consulta marcada.",
      "highlight": "consulta marcada",
      "subtitle": "O assistente de voz da Automis atende cada chamada 24/7, qualifica o contacto, marca-o na sua agenda e sincroniza-o com o seu CRM. Noites, fins de semana, feriados. Sem chamadas perdidas, sem receita perdida.",
      "cta": "Agende uma chamada",
      "videoTitle": "Como funciona o assistente de voz da Automis"
    },
    "problem": {
      "eyebrow": "O problema",
      "title": "Cada chamada perdida e cada contacto deixado a arrefecer é uma marcação que nunca chega a ver.",
      "lead": "As chamadas entram quando não há ninguém livre para atender: à noite, aos fins de semana, nas tardes mais preenchidas. E os novos contactos entram mais depressa do que qualquer pessoa consegue ligar de volta. Em ambos os casos, a consulta fica para quem atende primeiro.",
      "pains": [
        {
          "title": "Uma chamada perdida é um cliente perdido",
          "body": "Cada chamada sem resposta é um potencial cliente que liga logo para o próximo nome da lista. Quase ninguém deixa mensagem no atendedor, e a marcação já se perdeu antes mesmo de saber que o telefone tocou."
        },
        {
          "title": "Fora de horário não atende ninguém",
          "body": "A maioria dos pedidos chega fora do 9-18, à noite e aos fins de semana. Se não há ninguém para atender, a procura fora de horas que pagou para gerar dissipa-se em silêncio."
        },
        {
          "title": "Um follow-up lento faz perder o negócio",
          "body": "Os contactos arrefecem em poucos minutos. Quando demora horas a ligar de volta, o interesse já desapareceu e a consulta fica para quem atendeu primeiro."
        }
      ]
    },
    "modes": {
      "eyebrow": "Inbound e outbound",
      "title": "Um sistema, dois agentes especializados.",
      "highlight": "dois agentes especializados",
      "lead": "Um agente atende as chamadas que entram, como uma rececionista ativa 24/7. Um segundo trabalha as chamadas que saem e transforma os contactos que já pagou em consultas marcadas.",
      "inbound": {
        "eyebrow": "Inbound",
        "title": "A sua rececionista ativa 24/7",
        "intro": "Atende cada chamada que entra com uma voz natural, de dia ou de noite, para que ninguém caia no atendedor nem ligue a um concorrente.",
        "items": [
          {
            "title": "Atender cada chamada de imediato",
            "what": "Atende ao primeiro toque com uma voz natural, para que quem liga seja ajudado logo em vez de ficar em espera ou cair no atendedor.",
            "outcome": "Nenhuma chamada perdida por telefone ocupado ou a tocar em vazio"
          },
          {
            "title": "Cobertura fora de horário e ao fim de semana",
            "what": "Trata as chamadas à noite, aos fins de semana e nos feriados, e capta os pedidos que ficariam sem resposta com o consultório fechado.",
            "outcome": "Cobertura mesmo quando a sua equipa está offline"
          },
          {
            "title": "Marcar e remarcar consultas",
            "what": "Verifica a disponibilidade da agenda em tempo real e marca, muda ou cancela consultas, depois confirma e sincroniza com o seu sistema de marcações.",
            "outcome": "Mais horários preenchidos sem esforço da equipa"
          },
          {
            "title": "Responder às perguntas mais comuns",
            "what": "Responde a perguntas de rotina como horários, morada, serviços e preços indicativos, para que a sua equipa não seja interrompida.",
            "outcome": "Menos chamadas de rotina a ocupar a sua equipa"
          },
          {
            "title": "Qualificar e encaminhar quem liga",
            "what": "Faz algumas perguntas de qualificação, percebe o motivo da chamada e encaminha os contactos quentes ou urgentes para a pessoa certa.",
            "outcome": "Quem liga chega sempre à pessoa certa"
          },
          {
            "title": "Recuperar chamadas perdidas e em excesso",
            "what": "Entra em ação quando a equipa já está ao telefone ou com um paciente e recolhe os dados de quem liga, para que nada se perca nos momentos de pico.",
            "outcome": "Cada pedido captado, não perdido"
          }
        ]
      },
      "outbound": {
        "eyebrow": "Outbound",
        "title": "O seu motor de crescimento",
        "intro": "Liga aos contactos que já pagou: os novos em poucos segundos, os frios reativados e os follow-ups para não deixar nada arrefecer.",
        "items": [
          {
            "title": "Retorno imediato ao novo contacto",
            "what": "No momento em que entra um contacto por um formulário, um anúncio ou pelo site, o agente liga de volta em poucos segundos para qualificar e marcar enquanto o interesse está alto.",
            "outcome": "Chega aos contactos antes dos seus concorrentes"
          },
          {
            "title": "Reativar contactos frios",
            "what": "Trabalha as listas antigas ou adormecidas do CRM, reacende os contactos anteriores com uma voz natural e volta a marcar quem ainda tem interesse.",
            "outcome": "Novas consultas a partir de contactos já presentes na sua base de dados"
          },
          {
            "title": "Lembretes e confirmações",
            "what": "Liga antes de cada consulta para confirmar, responder a perguntas rápidas e remarcar em vez de perder o horário.",
            "outcome": "Menos faltas, uma agenda mais cheia"
          },
          {
            "title": "Follow-up de orçamentos e estimativas",
            "what": "Depois de enviado um orçamento, uma proposta ou um plano de tratamento, o agente faz follow-up por telefone para responder a objeções e fazer avançar o negócio.",
            "outcome": "Mais orçamentos que se tornam clientes fechados"
          },
          {
            "title": "Retorno automático a chamadas perdidas",
            "what": "Cada chamada perdida ou abandonada aciona um retorno automático, para que quem liga seja contactado em poucos minutos em vez de cair no atendedor.",
            "outcome": "Recupera receita que iria para um concorrente"
          },
          {
            "title": "Chamadas de avaliação e reativação",
            "what": "Depois de uma visita o agente pede uma opinião ou uma avaliação, e volta a contactar os pacientes perdidos para os trazer de volta.",
            "outcome": "Mais avaliações e clientes que voltam"
          }
        ]
      }
    },
    "how": {
      "eyebrow": "Como funciona",
      "title": "Do toque à consulta marcada, em piloto automático.",
      "lead": "Um único fluxo ligado que trata cada chamada da mesma forma, sempre.",
      "steps": [
        {
          "title": "Atende cada chamada",
          "body": "Atende ao primeiro toque, 24/7, com uma voz natural. Sem música de espera, sem atendedor, sem chamadas perdidas."
        },
        {
          "title": "Qualifica o contacto",
          "body": "Faz as suas perguntas, percebe o pedido e recolhe os dados que importam antes de marcar."
        },
        {
          "title": "Marca a consulta",
          "body": "Verifica a disponibilidade em tempo real e marca diretamente na sua agenda, com confirmação para quem liga."
        },
        {
          "title": "Sincroniza com o seu CRM",
          "body": "Contacto, resultado e notas seguem direto para o seu CRM, sem nada para reescrever e sem nada que se perca."
        },
        {
          "title": "Recupera chamadas perdidas",
          "body": "Se alguma chamada escapar, liga de volta ao número automaticamente para conquistar a marcação na mesma."
        }
      ]
    },
    "dash": {
      "eyebrow": "Vê tudo",
      "title": "Transparência total sobre cada chamada que a sua IA trata.",
      "lead": "Sem caixa negra. Comece por uma visão geral em tempo real das suas chamadas, taxa de sucesso e tendências, depois abra qualquer chamada para ouvir a gravação, ler a transcrição e ver o resumo da IA.",
      "leadCaption": "A visão geral da sua dashboard: chamadas, taxa de sucesso e tendências, em tempo real",
      "detailTitle": "Abra qualquer chamada para ver a história completa",
      "detailBody": "Abra uma única chamada e tem a gravação completa, uma transcrição pesquisável e um resumo da IA do que aconteceu e do que fazer a seguir. Nada fica escondido, por isso sabe sempre exatamente como está a trabalhar a sua receção.",
      "tagRecording": "Gravação",
      "tagTranscript": "Transcrição",
      "tagSummary": "Resumo IA",
      "callDetailAlt": "Uma chamada aberta: gravação, transcrição e resumo da IA",
      "callDetailCaption": "Uma chamada, aberta: gravação, transcrição e resumo da IA"
    },
    "crm": {
      "eyebrow": "O CRM",
      "title": "Três níveis de visibilidade, da marcação ao negócio fechado.",
      "lead": "Comece com uma vista limpa das suas marcações e cresça até uma pipeline completa, à medida que cresce a sua operação de vendas.",
      "privacy": "Nomes e números dos clientes estão desfocados por privacidade.",
      "tiers": [
        {
          "kicker": "Nível 1",
          "title": "Marcações",
          "body": "Cada consulta que a IA marcou, num único sítio. Veja o que está na agenda sem tocar numa folha de cálculo.",
          "points": [
            "Cada consulta marcada pela IA",
            "Data, hora e contacto num relance",
            "Sincronizadas com a sua agenda"
          ],
          "caption": "Marcações: cada consulta marcada pela IA, com o resultado da chamada"
        },
        {
          "kicker": "Nível 2",
          "title": "CRM leve",
          "body": "Contactos com o resultado e o sentimento de cada chamada, para saber quem contactar e porquê.",
          "points": [
            "Contactos + resultados das chamadas",
            "Sentimento em cada interação",
            "Contexto de follow-up, pronto a usar"
          ],
          "caption": "CRM leve: resultados das chamadas e sentimento em cada contacto"
        },
        {
          "kicker": "Nível 3",
          "title": "Pipeline",
          "body": "Um verdadeiro quadro kanban de vendas. Arraste os negócios pelas fases e veja a IA a alimentar o topo do funnel.",
          "points": [
            "Fases de venda em kanban",
            "Negócios que avançam fase a fase",
            "A IA mantém o funnel cheio"
          ],
          "caption": "Pipeline: um quadro kanban que a IA alimenta a partir do topo"
        }
      ]
    },
    "pricing": {
      "eyebrow": "Preços",
      "title": "Planos simples que se pagam a si próprios em consultas marcadas.",
      "lead": "Escolha o nível que corresponde à forma como vende. Passe a um plano superior quando quiser, à medida que cresce.",
      "mostPopular": "O mais escolhido",
      "bookCta": "Agende uma chamada",
      "enterprise": {
        "label": "Enterprise / À medida",
        "heading": "Grandes volumes, várias localizações ou integrações à medida?",
        "body": "Volume de chamadas personalizado, suporte dedicado e um sistema pensado e orçamentado exatamente à volta de como o seu negócio funciona.",
        "cta": "Vamos falar"
      },
      "guarantee": {
        "title": "Garantia de resultados de 30 dias",
        "body": "Cada plano é coberto pela nossa garantia de resultados de 30 dias. Se não funcionar, está protegido."
      },
      "tiers": [
        {
          "name": "Starter",
          "price": "€297",
          "period": "/mês",
          "tagline": "Tudo o que precisa para deixar de perder chamadas.",
          "features": [
            "200 minutos / mês",
            "Atendimento de chamadas inbound 24/7",
            "Marcação + sincronização da agenda",
            "Recuperação de chamadas perdidas",
            "Notificações de chamadas"
          ],
          "featured": false
        },
        {
          "name": "Growth",
          "price": "€497",
          "period": "/mês",
          "tagline": "Transforme as chamadas atendidas numa máquina de follow-up.",
          "features": [
            "600 minutos / mês",
            "Tudo o que inclui o Starter",
            "Sincronização com CRM (GoHighLevel / HubSpot)",
            "Lembretes por SMS e WhatsApp",
            "Follow-ups automáticos",
            "Multi-agenda / multi-profissional"
          ],
          "featured": true
        },
        {
          "name": "Scale",
          "price": "€697",
          "period": "/mês",
          "tagline": "Um motor de aquisição completo: voz e muito mais.",
          "features": [
            "1.500 minutos / mês",
            "Tudo o que inclui o Growth",
            "Chatbot WhatsApp",
            "Campanhas outbound",
            "Integrações à medida",
            "Prioridade + supervisão humana",
            "Estatísticas avançadas"
          ],
          "featured": false
        }
      ]
    },
    "faq": {
      "eyebrow": "Perguntas frequentes",
      "title": "As suas perguntas, respondidas.",
      "faqs": [
        {
          "q": "Então, o que é ao certo este assistente de voz?",
          "a": "Imagine o assistente de voz da Automis como uma rececionista virtual super inteligente para o seu negócio. Trata as chamadas dos clientes, marca consultas, responde a perguntas e até faz chamadas outbound, tudo com uma voz surpreendentemente humana. É como ter um membro da equipa a mais que nunca dorme."
        },
        {
          "q": "Percebe mesmo o que os clientes estão a dizer?",
          "a": "Sim. O nosso assistente de voz usa tecnologia de reconhecimento de voz avançada para perceber o contexto, os sotaques e até o jargão do setor. Não se limita a ouvir as palavras: capta o significado por detrás delas. Por isso, quer o seu cliente tenha um sotaque marcado ou use muitos termos técnicos, a IA safa-se sem problemas."
        },
        {
          "q": "Funciona com os sistemas que já usamos?",
          "a": "Sem dúvida. O assistente de voz integra-se com o seu CRM, a agenda e as restantes ferramentas do negócio. A nossa equipa configura tudo para que encaixe perfeitamente no seu fluxo de trabalho atual, sem necessidade de revolucionar todo o sistema."
        },
        {
          "q": "E se a IA ficar sem resposta para uma pergunta?",
          "a": "Por muito inteligente que seja, sabemos que a IA não consegue tratar de tudo. Quando encontra uma pergunta a que não sabe responder, passa a chamada a uma pessoa de forma natural, sem atritos. Os seus clientes recebem sempre a ajuda de que precisam, de uma maneira ou de outra."
        },
        {
          "q": "Como acompanhamos os resultados?",
          "a": "Tem à disposição uma dashboard de análise completa: volume de chamadas, taxas de resolução, satisfação dos clientes e muito mais. É uma visão de conjunto das interações com os seus clientes que o ajuda a identificar tendências e áreas a melhorar, com cada chamada gravada, transcrita e resumida."
        }
      ]
    },
    "booking": {
      "eyebrow": "Ponha-o a trabalhar",
      "headingPre": "Ponha o seu agente de voz IA ",
      "headingGrad": "a atender, qualificar e marcar 24/7",
      "headingPost": ".",
      "paragraph": "Agende uma chamada e configuramos um agente de voz que atende cada chamada, qualifica o contacto e marca-o diretamente na sua agenda, de dia, de noite e ao fim de semana. Sem chamadas perdidas, sem receita perdida.",
      "bullets": [
        "Uma chamada de 30 minutos: ouça o seu agente de voz IA ao vivo",
        "Analisamos as suas chamadas, os horários e onde perde marcações",
        "Sai com um plano para um agente de voz que atende 24/7"
      ],
      "cta": "Agende uma chamada",
      "calHeader": "Disponibilidade em tempo real · chamada de 30 min",
      "calConfirm": "Confirmação imediata",
      "calLoading": "A carregar a agenda…",
      "iframeTitle": "Agende uma chamada com a Automis",
      "guarantee": "Garantia de resultados de 30 dias",
      "gdpr": "Conforme ao RGPD",
      "noObligation": "Sem compromisso"
    }
  }
};

/* Etichette dei nuovi elementi (catena finale, video a richiesta, passi della catena). Brevi, senza numeri. */
export const UI = {
  en: {
    chain: ["Call", "Appointment", "Calendar", "CRM"],
    chainTitle: "A call, an appointment, a contact in your CRM.",
    chainLabel: "From the call to the CRM",
    play: "Watch the video",
    modeLabels: { inbound: "Inbound", outbound: "Outbound" },
    detailLabel: "What it does, in detail",
  },
  it: {
    chain: ["Chiamata", "Appuntamento", "Calendario", "CRM"],
    chainTitle: "Una chiamata, un appuntamento, un contatto nel CRM.",
    chainLabel: "Dalla chiamata al CRM",
    play: "Guarda il video",
    modeLabels: { inbound: "Inbound", outbound: "Outbound" },
    detailLabel: "Cosa fa, nel dettaglio",
  },
  pt: {
    chain: ["Chamada", "Marcação", "Agenda", "CRM"],
    chainTitle: "Uma chamada, uma marcação, um contacto no CRM.",
    chainLabel: "Da chamada ao CRM",
    play: "Ver o vídeo",
    modeLabels: { inbound: "Inbound", outbound: "Outbound" },
    detailLabel: "O que faz, em detalhe",
  },
};

/* Link di prenotazione per lingua (gli stessi della pagina precedente). */
export const BOOKING_URL = {
  en: "https://api.leadconnectorhq.com/widget/bookings/discover-automis",
  it: "https://api.leadconnectorhq.com/widget/bookings/automis-it",
  pt: "https://api.leadconnectorhq.com/widget/bookings/pt-automis",
};

/* Video «come funziona» per lingua (pt usa quello inglese finché non ce n'è uno in portoghese). */
export const VIDEO_ID = { en: "qWSaK2kS7uo", it: "ViE-j9SqENA", pt: "qWSaK2kS7uo" };

/* Schermate della dashboard per lingua, con le misure vere (larghezza e altezza: la pagina riserva lo spazio e non si sposta).
   Sono aggregati, senza dati personali (nomi e numeri dei clienti sono oscurati). pt usa le schermate inglesi finché non ci sono quelle in portoghese. */
const EN_SHOTS = {
  overview: { src: "/assets/images/dashboard/clean/overview-en.png", w: 3362, h: 1634 },
  callDetail: { src: "/assets/images/dashboard/clean/call-detail.png", w: 1370, h: 1500 },
  tiers: [
    { src: "/assets/images/dashboard/clean/bookings.png", w: 3392, h: 1662 },
    { src: "/assets/images/dashboard/clean/light-crm.png", w: 3382, h: 1628 },
    { src: "/assets/images/dashboard/clean/pipeline.png", w: 1802, h: 641 },
  ],
};
export const SHOTS = {
  en: EN_SHOTS,
  it: {
    overview: { src: "/assets/images/dashboard/clean/it/overview.png", w: 1806, h: 637 },
    callDetail: { src: "/assets/images/dashboard/clean/it/call-detail.png", w: 675, h: 600 },
    tiers: [
      { src: "/assets/images/dashboard/clean/it/bookings.png", w: 1806, h: 646 },
      { src: "/assets/images/dashboard/clean/it/light-crm.png", w: 1809, h: 646 },
      { src: "/assets/images/dashboard/clean/it/pipeline.png", w: 1820, h: 645 },
    ],
  },
  pt: EN_SHOTS,
};
