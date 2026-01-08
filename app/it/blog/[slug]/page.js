import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTAButton from "@/components/CTAButton";
import FAQSection from "@/components/FAQSection";

const blogPosts = {
  "ai-automations": {
    title: "Automazioni AI <br/> Scala senza aumentare lo staff",
    metaTitle: "Automazioni AI per aziende | CRM, workflow & nurturing contatto",
    metaDescription:
      "Scala più velocemente con automazioni AI. Collega CRM, calendario, ads e follow-up con i workflow Automis. Risparmia tempo, riduci i costi e aumenta gli appuntamenti prenotati.",
    author: "Team Automis",
    date: "Gennaio 2025",
    category: "Automazione AI",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    content: {
      intro:
        "Le automazioni AI collegano CRM, calendario, ads e strumenti di comunicazione in un unico sistema. Invece di dipendere dal follow-up manuale del team, Automis costruisce workflow guidati dall’AI che qualificano i contatti, prenotano appuntamenti e inviano promemoria in automatico. Il risultato? Ore risparmiate ogni settimana, meno errori umani e una crescita più rapida grazie all’efficienza dell’AI. Per i business basati su appuntamenti, fa davvero la differenza tra contatti persi e crescita costante.",
      sections: [
        { type: "heading", level: 2, content: "Cosa sono le automazioni AI?" },
        {
          type: "paragraph",
          content:
            "Le automazioni AI sono workflow intelligenti che sostituiscono attività ripetitive con processi automatici. Invece di copiare contatto a mano, inviare promemoria e aggiornare il CRM manualmente, l’automazione lo fa in modo istantaneo e affidabile. Automis crea sistemi end-to-end che collegano ads, CRM, calendario e comunicazioni per non sprecare nessun contatto.",
        },
        {
          type: "heading",
          level: 2,
          content: "Perché le aziende hanno bisogno di automazioni",
        },
        {
          type: "list",
          items: [
            "**La velocità è tutto**: il 70% dei contatti “si raffredda” se non viene contattato entro 5 minuti",
            "**Il carico sul team costa**: 10–20 ore/settimana sprecate in attività amministrative",
            "**La coerenza vince**: l’AI garantisce a ogni contatto la stessa esperienza rapida e di qualità",
          ],
        },
        {
          type: "heading",
          level: 2,
          content: "Come funzionano le automazioni AI (step-by-step)",
        },
        {
          type: "numbered-list",
          items: [
            "Contatto acquisito da ads/form",
            "Qualifica immediata tramite receptionist AI o chatbot",
            "Sync nel CRM (HubSpot, Salesforce, GoHighLevel)",
            "Prenotazione nel calendario",
            "Promemoria via SMS, email, WhatsApp",
            "Sequenze di follow-up fino alla conversione",
          ],
        },
        {
          type: "heading",
          level: 2,
          content: "Vantaggi principali delle automazioni AI",
        },
        {
          type: "benefits-grid",
          items: [
            { icon: "fa-clock", title: "Risparmio di tempo", desc: "10–20 ore/settimana" },
            { icon: "fa-chart-line", title: "Più conversioni", desc: "30–40% più prenotazioni" },
            { icon: "fa-money-bill-wave", title: "Riduzione costi", desc: "Meno carico sul team" },
            { icon: "fa-expand", title: "Scalabilità", desc: "da 50 a 5.000 contatti" },
            { icon: "fa-check-double", title: "Dati accurati", desc: "Sincronizzazione 100% " },
            { icon: "fa-lightbulb", title: "Dati migliori", desc: "Analytics in tempo reale" },
          ],
        },
        { type: "heading", level: 2, content: "Use case per settore" },
        {
          type: "use-cases",
          items: [
            {
              title: "Sanità",
              icon: "fa-heartbeat",
              description: "Prenotazioni, conferme, promemoria",
              image:
                "https://images.unsplash.com/photo-1559328002-7092c0b3b50a?w=600&h=400&fit=crop",
            },
            {
              title: "Pronto Intervento h24",
              icon: "fa-tools",
              description: "Pianificazione interventi, lavori, promemoria",
              image:
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            },
            {
              title: "Immobiliare",
              icon: "fa-home",
              description:
                "Chiamate immediate, follow-up continui, prenotazione visite",
              image:
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
            },
          ],
        },
        { type: "heading", level: 2, content: "Confronto costi – Manuale vs Automatizzato" },
        {
          type: "table",
          headers: ["Attività", "Team manuale", "Con automazione AI"],
          rows: [
            ["Follow-up contatto", "5–10 min ciascuno", "Immediato, 24/7"],
            ["Inserimento CRM", "Soggetto a errori", "Sync automatizzato"],
            ["Promemoria", "Messaggi/chiamate manuali", "Multi-canale automatizzato"],
            ["Costo mensile", "€3K–€5K personale", "€200–€500 strumenti"],
          ],
        },
        { type: "heading", level: 2, content: "Case study – Automazione follow-up pazienti" },
        {
          type: "case-study",
          title:
            "MedSpa in California perdeva il 40% dei contatti da ads. Dopo le automazioni Automis:",
          metrics: [
            { value: "100%", label: "lead contattati in <1 minuto" },
            { value: "65%", label: "prenotazioni (da 35%)" },
            { value: "15", label: "ore/settimana risparmiate dal team" },
            { value: "2x", label: "ROI in 60 giorni" },
          ],
        },
        { type: "heading", level: 2, content: "Strumenti & stack migliori (edizione 2025)" },
        {
          type: "tools-grid",
          categories: [
            {
              title: "Workflow tools",
              tools: [
                "Make – workflow avanzati",
                "Zapier – setup rapido",
                "n8n – open-source custom",
                "Automis Voice AI & Chat",
              ],
            },
            {
              title: "CRM",
              tools: [
                "HubSpot",
                "GoHighLevel",
                "Salesforce",
                "Integrazioni custom disponibili",
              ],
            },
          ],
        },
      ],
    },
    faqs: [
      {
        question: "Quali attività posso automatizzare?",
        answer:
          "Acquisizione contatto, inserimento nel CRM, promemoria, riprogrammazione, follow-up, reportistica.",
      },
      {
        question: "Le automazioni sostituiscono il team?",
        answer: "No, lo potenziano: eliminano le attività ripetitive e liberano tempo.",
      },
      {
        question: "I dati sono al sicuro?",
        answer: "Sì, con impostazioni e processi allineati a GDPR e contesti HIPAA-adjacent.",
      },
      { question: "In quanto tempo si vede ROI?", answer: "In media 10–30 giorni." },
    ],
    tags: [],
    relatedPosts: [],
  },

  "voice-ai-receptionists": {
    title: "Receptionist Voice AI <br/> Il futuro di chiamate e prenotazioni",
    metaTitle: "Receptionist Voice AI | Risposta 24/7 & prenotazioni",
    metaDescription:
      "Scopri come i receptionist Voice AI rispondono 24/7, qualificano i contatti e aumentano gli appuntamenti prenotati. Mai più chiamate perse con receptionist AI.",
    author: "Team Automis",
    date: "Gennaio 2025",
    category: "Voice AI",
    image:
      "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=800&h=600&fit=crop",
    content: {
      intro:
        "Un receptionist Voice AI è un agente telefonico basato su intelligenza artificiale che risponde a ogni chiamata 24/7, qualifica i contatti e prenota appuntamenti direttamente nel CRM. A differenza di personale interno o call center, garantisce zero chiamate perse, tempi di risposta più rapidi e un tasso contatto→ prenotazione più alto. È il modo più affidabile per i business basati su appuntamenti (dentisti, HVAC, agenzie immobiliari) di scalare senza aumentare i costi di staffing.",
      sections: [
        { type: "heading", level: 2, content: "Cos’è un receptionist Voice AI?" },
        {
          type: "paragraph",
          content:
            "Un receptionist Voice AI è un agente vocale intelligente, basato su conversational AI, che gestisce chiamate inbound e outbound. Risponde subito, gestisce le domande frequenti e prenota o riprogramma appuntamenti. A differenza dei vecchi IVR, è naturale, conversazionale e comprende il contesto.",
        },
        { type: "heading", level: 2, content: "Perché le aziende ne hanno bisogno" },
        {
          type: "paragraph",
          content:
            "Chiamate perse = ricavi persi. In sanità e home services, spesso il 40–60% delle chiamate inbound viene perso nelle ore di punta. Nell’HVAC, una chiamata persa può significare perdere un lavoro da $500+. Nell’immobiliare, un contatto “si raffredda” se non viene contattato entro 5 minuti. La Voice AI elimina le opportunità perse. Rispetto a personale o call center, è più economica, più veloce e scalabile.",
        },
        { type: "heading", level: 2, content: "Come funziona un receptionist Voice AI" },
        {
          type: "list",
          items: [
            "**Risposta e instradamento chiamate** – accoglie il chiamante, gestisce FAQ, smista urgenze.",
            "**Qualifica contatto e prenotazione** – raccoglie dati, qualifica e prenota direttamente nel CRM.",
            "**Integrazione CRM & calendario** – sync con GoHighLevel, HubSpot, Salesforce, Google Calendar.",
          ],
        },
        { type: "heading", level: 2, content: "Vantaggi principali" },
        {
          type: "benefits-grid",
          items: [
            { icon: "fa-clock", title: "Disponibile 24/7", desc: "Mai più chiamate perse" },
            { icon: "fa-rocket", title: "Contatto →prenotazione più veloce", desc: "Risposta e booking immediati" },
            { icon: "fa-dollar-sign", title: "Costi ridotti", desc: "Fino all’80% in meno vs staff tradizionale" },
            { icon: "fa-expand-arrows-alt", title: "Scalabile", desc: "50 o 5.000 chiamate" },
            { icon: "fa-chart-bar", title: "Dati & insight", desc: "Tracciamento di ogni interazione" },
          ],
        },
        { type: "heading", level: 2, content: "Use case per settore" },
        {
          type: "use-cases",
          items: [
            {
              title: "Sanità",
              icon: "fa-heartbeat",
              description: "Prenotazioni e promemoria con setup HIPAA-adjacent",
              image:
                "https://images.unsplash.com/photo-1559328002-7092c0b3b50a?w=600&h=400&fit=crop",
            },
            {
              title: "Home Services",
              icon: "fa-tools",
              description: "Prenota urgenze subito e riduce tempi morti",
              image:
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            },
            {
              title: "Immobiliare",
              icon: "fa-home",
              description: "Come un ISA immediato, prenota visite direttamente",
              image:
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
            },
          ],
        },
        { type: "heading", level: 2, content: "Confronto costi – AI vs receptionist live" },
        {
          type: "table",
          headers: ["Caratteristica", "Receptionist live", "Call center", "Receptionist Voice AI"],
          rows: [
            ["Disponibilità", "9–17 (feriali)", "24/7", "24/7"],
            ["Costo (annuo)", "$35K–$50K", "$1.50+/min", "$500–$1000/mese"],
            ["Tempo di risposta", "3–5 squilli", "2–3 squilli", "Immediato"],
            ["Qualifica Contatti", "Variabile", "Limitata", "Coerente, con script"],
            ["Integrazione CRM", "Manuale", "Rara", "Nativa + automatizzata"],
            ["Scalabilità", "Bassa", "Media", "Alta"],
          ],
        },
        { type: "heading", level: 2, content: "Case study – Studio dentistico con Voice AI" },
        {
          type: "case-study",
          title:
            "Uno studio dentistico in California perdeva il 40% delle chiamate. Dopo Automis Voice AI:",
          metrics: [
            { value: "100%", label: "chiamate risposte" },
            { value: "30%", label: "più appuntamenti prenotati" },
            { value: "$3,000", label: "/mese risparmiati" },
            { value: "5★", label: "soddisfazione pazienti" },
          ],
        },
        { type: "heading", level: 2, content: "Come ottimizzare i call flow per la Voice AI" },
        {
          type: "numbered-list",
          items: [
            "Definisci lo script di qualifica",
            "Integra CRM/calendario",
            "Imposta regole di handover",
            "Usa dashboard per ottimizzare",
            "Aggiungi promemoria",
          ],
        },
      ],
    },
    faqs: [
      {
        question: "Cos’è un receptionist Voice AI?",
        answer:
          "Un agente telefonico AI che risponde 24/7, qualifica i contatti e prenota appuntamenti direttamente nel tuo CRM.",
      },
      { question: "Si integra con il mio CRM?", answer: "Sì, con i principali CRM e calendari." },
      { question: "È conveniente?", answer: "Sì: costa molto meno di staff o call center." },
      { question: "Sostituirà il team?", answer: "No, lo potenzia gestendo le attività ripetitive." },
    ],
    tags: [],
    relatedPosts: [],
  },

  "ai-optimized-paid-ads": {
    title: "Paid Ads ottimizzate con AI <br/> Dai click agli appuntamenti",
    metaTitle: "Paid Ads ottimizzate con AI | Campagne più smart, più appuntamenti",
    metaDescription:
      "Campagne adv potenziate dall’AI. Automis ottimizza bidding, creatività e follow-up per trasformare il budget in chiamate prenotate — non solo contatti.",
    author: "Team Automis",
    date: "Gennaio 2025",
    category: "Paid Ads",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    content: {
      intro:
        "Le Paid Ads ottimizzate con AI usano l’intelligenza artificiale per creare campagne più efficaci, ridurre sprechi e aumentare gli appuntamenti prenotati. Invece di fermarsi a click e impression, Automis costruisce campagne che misurano performance fino a chiamate e prenotazioni. Con smart bidding, test creativi guidati dall’AI e integrazioni CRM, ottieni più ricavi con lo stesso budget.",
      sections: [
        { type: "heading", level: 2, content: "Cosa sono le Paid Ads ottimizzate con AI?" },
        {
          type: "paragraph",
          content:
            "Sono campagne pubblicitarie potenziate da machine learning e automazioni per ridurre sprechi, aumentare la precisione del targeting e migliorare il tasso di conversione.",
        },
        {
          type: "paragraph",
          content:
            "A differenza delle campagne tradizionali, che valutano il successo con click, impression o vanity metrics, le campagne AI-optimized misurano ciò che conta davvero: appuntamenti prenotati e ricavi generati.",
        },
        {
          type: "paragraph",
          content:
            "In Automis andiamo oltre l’automazione standard di Google Ads o Meta Advantage+. Costruiamo sistemi end-to-end che collegano:",
        },
        {
          type: "list",
          items: [
            "Campagne adv (Google, Meta, TikTok, LinkedIn)",
            "CRM (HubSpot, GoHighLevel, Salesforce)",
            "Receptionist AI (Voice & Chat)",
            "Dashboard analytics",
          ],
        },
        {
          type: "paragraph",
          content:
            "Così ogni euro speso è tracciabile da click → contatto → chiamata → prenotazione.",
        },
        { type: "heading", level: 2, content: "Perché serve l’AI nella pubblicità" },
        { type: "heading", level: 3, content: "Costi adv in crescita:" },
        {
          type: "list",
          items: [
            "Negli ultimi 3 anni, CPC su Google e Meta sono aumentati del 30–50%.",
            "Senza ottimizzazione, paghi di più per ottenere meno.",
            "L’AI ottimizza le offerte per ridurre sprechi e migliorare il costo per contatto.",
          ],
        },
        { type: "heading", level: 3, content: "Contatti sprecati senza follow-up:" },
        {
          type: "list",
          items: [
            "Oltre il 50% dei contatti da ads va perso perché non viene contattato in tempo",
            "L’AI collega ads e Voice AI, garantendo un contatto immediato",
          ],
        },
        { type: "heading", level: 3, content: "Mancanza di attribuzione" },
        {
          type: "paragraph",
          content:
            "Molti report si fermano ai “contatti generati”. Con AI + integrazione CRM, mostriamo il ROI reale: costo per appuntamento, non costo per lead.",
        },
        { type: "heading", level: 2, content: "Come funzionano le Paid Ads ottimizzate con AI" },
        {
          type: "numbered-list",
          items: [
            "Setup campagne – l’AI analizza i dati audience per un targeting migliore.",
            "Smart bidding – aggiustamenti delle offerte in tempo reale.",
            "Creatività dinamiche – test continui su headline, immagini, CTA.",
            "Passaggio contatto – i contatti vengono assegnati a receptionist AI o chatbot.",
            "Attribuzione – integrazione CRM traccia ads → chiamata → prenotazione.",
          ],
        },
        { type: "heading", level: 2, content: "Vantaggi principali" },
        {
          type: "benefits-grid",
          items: [
            { icon: "fa-dollar-sign", title: "Costo per appuntamento più basso", desc: "Smart bidding = meno sprechi" },
            { icon: "fa-chart-line", title: "Attribuzione full-funnel", desc: "Dal budget alla prenotazione" },
            { icon: "fa-expand", title: "Campagne scalabili", desc: "Si scala solo quando il ROI è provato" },
            { icon: "fa-tachometer-alt", title: "Ciclo di vendita più corto", desc: "Contatto immediato = conversione più veloce" },
            { icon: "fa-magic", title: "Creatività migliori", desc: "Ottimizzazione continua di copy e visual" },
          ],
        },
        { type: "heading", level: 2, content: "Use case per settore" },
        {
          type: "use-cases",
          items: [
            {
              title: "Sanità",
              icon: "fa-heartbeat",
              description: "Campagne ottimizzate per prenotazioni nuovi pazienti",
              image:
                "https://images.unsplash.com/photo-1559328002-7092c0b3b50a?w=600&h=400&fit=crop",
            },
            {
              title: "Home Services",
              icon: "fa-tools",
              description: "Le campagne scalano in base alla capacità dei tecnici",
              image:
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            },
            {
              title: "Immobiliare",
              icon: "fa-home",
              description:
                "Campagne buyer/seller + follow-up immediato stile ISA",
              image:
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
            },
          ],
        },
        { type: "heading", level: 2, content: "Confronto – Ads tradizionali vs AI-optimized" },
        {
          type: "table",
          headers: ["Caratteristica", "Ads tradizionali", "Ads ottimizzate con AI"],
          rows: [
            ["Targeting", "Regole manuali", "Segmentazione guidata dall’AI"],
            ["Bidding", "Fisso", "Smart bidding in tempo reale"],
            ["Test creativi", "A/B manuale", "Multivariato continuo"],
            ["Attribuzione", "Basata su click", "Basata su prenotazioni"],
            ["Visibilità ROI", "Limitata", "Vista full-funnel"],
          ],
        },
        { type: "heading", level: 2, content: "Case study – Scaling campagne immobiliare" },
        {
          type: "paragraph",
          content:
            "Un’agenzia immobiliare spendeva $15K/mese in Facebook ads.",
        },
        {
          type: "case-study",
          title: "Risultati dopo l’implementazione delle ads AI-optimized Automis:",
          metrics: [
            { value: "$100", label: "CPL (da $150)" },
            { value: "20%", label: "visite prenotate (da 10%)" },
            { value: "2.5x", label: "ROI in 60 giorni" },
            { value: "$15K", label: "spesa adv mensile" },
          ],
        },
        { type: "heading", level: 2, content: "Migliori strategie adv AI (2025)" },
        {
          type: "list",
          items: [
            "Smart bidding AI (Google Ads, Meta Advantage+)",
            "Creazione dinamica di annunci con AI generativa",
            "Segmentazione audience guidata dall’AI",
            "Scaling automatico con regole",
            "Integrazione CRM + ads per attribuzione",
          ],
        },
      ],
    },
    faqs: [
      { question: "L’AI può ridurre i costi adv?", answer: "Sì, ottimizza le offerte per ridurre sprechi." },
      { question: "Funziona anche con piccoli budget?", answer: "Sì, anche con campagne da $2K–$3K/mese." },
      { question: "Come tracciate il ROI?", answer: "Collegando il CRM ai dati adv e misurando gli appuntamenti prenotati." },
      { question: "Perdo il controllo lasciando fare all’AI?", answer: "No: l’AI lavora dentro le tue regole, con supervisione." },
    ],
    tags: [],
    relatedPosts: [],
  },
};

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts[params.slug];

  if (!post) {
    return {
      title: "Articolo non trovato",
      description: "L’articolo richiesto non è disponibile.",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const BlogPostPage = ({ params }) => {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  const renderContent = (section) => {
    switch (section.type) {
      case "heading": {
        const HeadingTag = `h${section.level}`;
        return (
          <HeadingTag
            className={
              section.level === 2
                ? "section-heading text-white mb-6"
                : "card-heading text-white mb-3 mt-6"
            }
          >
            {section.content}
          </HeadingTag>
        );
      }

      case "paragraph":
        return <p className="body-text text-white/90 mb-6">{section.content}</p>;

      case "list":
        return (
          <ul className="space-y-3 mb-6">
            {section.items.map((item, index) => (
              <li key={index} className="text-white/90 flex items-start">
                <i className="far fa-check-circle text-yellow-light mr-3 mt-1 flex-shrink-0" />
                <span
                  className="body-text"
                  dangerouslySetInnerHTML={{
                    __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              </li>
            ))}
          </ul>
        );

      case "numbered-list":
        return (
          <ol className="space-y-3 mb-6 list-decimal list-inside">
            {section.items.map((item, index) => (
              <li key={index} className="text-white/90 body-text" key={index}>
                {item}
              </li>
            ))}
          </ol>
        );

      case "benefits-grid":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {section.items.map((benefit, index) => (
              <div
                key={index}
                className="group bg-blue-middle/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                  <i
                    className={`far ${benefit.icon} text-blue-middle group-hover:text-yellow-light text-xl transition-all duration-300`}
                  />
                </div>
                <h3 className="card-heading text-white mb-2">{benefit.title}</h3>
                <p className="body-text text-white/90">{benefit.desc}</p>
              </div>
            ))}
          </div>
        );

      case "use-cases":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {section.items.map((useCase, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                    <i
                      className={`far ${useCase.icon} text-blue-middle group-hover:text-yellow-light text-xl transition-all duration-300`}
                    />
                  </div>
                  <h3 className="card-heading text-white mb-2">{useCase.title}</h3>
                  <p className="body-text text-white/90">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "table":
        return (
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-blue-middle/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden">
              <thead className="bg-blue-middle/30">
                <tr>
                  {section.headers.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-white font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-middle/20">
                {section.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-yellow-light/10 transition-colors">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-6 py-4 ${
                          cellIndex === row.length - 1
                            ? "text-yellow-light font-medium"
                            : "text-white/90"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "case-study":
        return (
          <div className="bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 mb-8">
            <h3 className="card-heading text-white mb-4">{section.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-medium text-yellow-light mb-2">
                    {metric.value}
                  </div>
                  <div className="small-text text-white/90">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "tools-grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {section.categories.map((category, index) => (
              <div
                key={index}
                className="bg-blue-middle/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-6"
              >
                <h3 className="card-heading text-white mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex} className="text-white/90 flex items-start">
                      <i className="far fa-check-circle text-yellow-light mr-3 mt-1" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AkpagerLayout>
      {/* HERO */}
      <section
        className="hero-padding bg-bg-primary relative z-1 bgs-cover text-center"
        style={{
          backgroundImage: `url(${post.image || "/assets/images/backgrounds/banner.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="relative">
            <h2
              className="hero-heading text-white mb-6 "
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            <div
              className="text-yellow-light text-lg"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              {post.category}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-padding bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="px-4 lg:w-full max-w-4xl mx-auto">
              <div>
                <div className="mb-8">
                  <p className="body-text text-white/90">{post.content.intro}</p>
                </div>

                {post.content.sections.map((section, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={50}>
                    {renderContent(section)}
                  </div>
                ))}

                {/* CTA */}
                <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay={100}>
                  <div className="bg-gradient-to-r from-blue-middle/20 to-blue-lightest/20 backdrop-blur-lg border border-blue-middle/30 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
                    <h2 className="section-heading text-white mb-4">
                      Pronto a trasformare il tuo business?
                    </h2>
                    <p className="body-text text-white/90 mb-8 max-w-xl mx-auto">
                      Scopri come le nostre soluzioni basate su AI possono aiutarti a scalare più
                      velocemente, convertire più contatti e automatizzare i tuoi processi.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                        external={true}
                        variant="primary"
                        size="large"
                      >
                        Prenota una Discovery Call
                      </CTAButton>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="mt-12">
                    <FAQSection
                      sectionTitle="Domande frequenti"
                      sectionSubtitle="FAQ"
                      sectionDescription=""
                      iconClass="fas fa-robot"
                      bgColor="bg-black"
                      accentColor="var(--blue-middle)"
                      faqs={post.faqs}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default BlogPostPage;
