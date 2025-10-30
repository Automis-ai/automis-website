"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "L'AI suona robotica?",
      answer:
        "No. Usiamo le tecnologie text-to-speech più avanzate con voci italiane naturali, pause realistiche ed espressioni emotive. Molti clienti non si accorgono di parlare con un'AI.",
    },
    {
      question: "Quanto tempo serve per configurare il sistema?",
      answer:
        "72 ore. Il nostro team fa onboarding guidato: raccogli informazioni, crea script, testa con il tuo team e lancia.",
    },
    {
      question: "Posso integrare con il mio CRM attuale?",
      answer:
        "Sì. Abbiamo integrazioni native con HubSpot, Salesforce, Zoho, Pipedrive, Monday, e gestionali italiani come TeamSystem e Fatture in Cloud. API disponibile per software custom.",
    },
    {
      question: "Cosa succede se l'AI non capisce una domanda?",
      answer:
        "L'AI è addestrata per gestire anche domande complesse. Se incontra una richiesta che non può risolvere, trasferisce la chiamata al tuo team oppure prende un messaggio e invia notifica immediata.",
    },
    {
      question: "È conforme al GDPR?",
      answer:
        "Assolutamente. Server in UE, crittografia end-to-end, consensi automatici, diritto all'oblio implementato. Forniamo documentazione completa per il privacy officer.",
    },
    {
      question: "Quanto costa?",
      answer:
        "Il prezzo varia in base alla complessità del caso specifico. Offriamo sempre 14 giorni di prova gratuita. Contattaci per un preventivo su misura.",
    },
    {
      question: "L'AI può chiamare i miei lead oppure solo rispondere?",
      answer:
        "Entrambi! L'AI può fare outbound calls (riattivazione lead, follow-up, reminder appuntamenti) e rispondere a chiamate in entrata. Tu scegli il flusso.",
    },
    {
      question: "Funziona per il mio settore?",
      answer:
        "Lavoriamo con successo in: immobiliare, automotive, e-commerce, studi professionali, ristorazione, healthcare, recruiting, SaaS, logistica e altro. Contattaci per casi studio specifici.",
    },
    {
      question: "Posso personalizzare lo script delle conversazioni?",
      answer:
        "Sì, completamente. Durante l'onboarding definiamo insieme: tono di voce, domande da porre, risposte a FAQ, quando trasferire al team umano e altro. È il TUO assistente.",
    },
    {
      question: "Cosa include il supporto?",
      answer:
        "Assistenza in italiano via email, chat e telefono. Account manager dedicato per piani Business ed Enterprise. Ottimizzazione script mensile inclusa.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section-padding relative bg-bg-primary text-white py-24 overflow-hidden"
    >
      {/* Glow & overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-darkest/30 via-transparent to-bg-primary z-0"></div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        {/* Headline */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex justify-center items-center gap-2">
            <MessageCircleQuestion className="w-8 h-8 text-blue-400" />
            Domande Frequenti
          </h2>
          <p className="text-[#EAEAEA] text-lg max-w-2xl mx-auto">
            Tutto ciò che devi sapere prima di iniziare con Automis.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border border-blue-500/30 backdrop-blur-md bg-gradient-to-br from-blue-darkest/40 to-blue-darkest/10 py-3 px-4 transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] ${
                openIndex === index ? "scale-[1.02]" : ""
              }`}
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-400 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-blue-400 transition-transform duration-300" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-96 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-[#EAEAEA] leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
