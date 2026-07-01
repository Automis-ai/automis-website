"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading, Grad } from "./_ui";

const faqs = [
  {
    question: "L'AI suona robotica?",
    answer:
      "No. Usiamo le tecnologie text-to-speech più avanzate con voci italiane naturali, pause realistiche ed espressioni emotive. Molti clienti non si accorgono di parlare con un'AI.",
  },
  {
    question: "Quanto tempo serve per configurare il sistema?",
    answer:
      "72 ore. Il nostro team fa un onboarding guidato: raccogliamo le informazioni, creiamo gli script, testiamo con il tuo team e lanciamo.",
  },
  {
    question: "Posso integrare con il mio CRM attuale?",
    answer:
      "Sì. Abbiamo integrazioni native con HubSpot, Salesforce, Zoho, Pipedrive, Monday e gestionali italiani come TeamSystem e Fatture in Cloud. API disponibile per software custom.",
  },
  {
    question: "Cosa succede se l'AI non capisce una domanda?",
    answer:
      "L'AI è addestrata per gestire anche domande complesse. Se incontra una richiesta che non può risolvere, trasferisce la chiamata al tuo team oppure prende un messaggio e invia una notifica immediata.",
  },
  {
    question: "È conforme al GDPR?",
    answer:
      "Assolutamente. Server in UE, crittografia end-to-end, raccolta automatica dei consensi e diritto all'oblio implementato. Forniamo documentazione completa per il responsabile della protezione dei dati.",
  },
  {
    question: "Quanto costa?",
    answer:
      "Il prezzo varia in base alla complessità del caso specifico. Prenota una chiamata per un preventivo su misura per il tuo business.",
  },
  {
    question: "L'AI può chiamare i miei lead oppure solo rispondere?",
    answer:
      "Entrambi. L'AI può fare chiamate in uscita (riattivazione lead, follow-up, promemoria appuntamenti) e rispondere alle chiamate in entrata. Scegli tu il flusso che preferisci.",
  },
  {
    question: "Funziona per il mio settore?",
    answer:
      "Lavoriamo con immobiliare, automotive, e-commerce, studi professionali, ristorazione, healthcare, recruiting, SaaS, logistica e altro. Contattaci per casi studio specifici.",
  },
  {
    question: "Posso personalizzare lo script delle conversazioni?",
    answer:
      "Sì, completamente. Durante l'onboarding definiamo insieme il tono di voce, le domande da porre, le risposte alle FAQ e quando trasferire al team umano. È il TUO assistente.",
  },
  {
    question: "Cosa include il supporto?",
    answer:
      "Assistenza in italiano via email, chat e telefono. Account manager dedicato per i piani Business ed Enterprise. Ottimizzazione mensile degli script inclusa.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-bright-blue/8 blur-[130px]" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="Domande"
          title={
            <>
              Domande <Grad>frequenti</Grad>
            </>
          }
          subtitle="Tutto ciò che devi sapere prima di iniziare con Automis."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={index}
                className="av-gradient-border overflow-hidden rounded-xl backdrop-blur-md"
              >
                <button
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="font-plex-mono text-xs text-bright-blue/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-montserrat text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-bright-blue transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[3.25rem] font-open-sans text-[0.95rem] leading-relaxed text-white/65">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
