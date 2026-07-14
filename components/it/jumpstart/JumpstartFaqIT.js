"use client";
import { useState } from "react";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Che differenza c'e' tra la call gratuita e l'audit a pagamento?",
    a: "La call conoscitiva gratuita di 30 minuti e' il primo passo a basso attrito: una chiamata veloce per mappare i tuoi colli di bottiglia principali e vedere cosa e' possibile, senza costi e senza impegno. Il Jumpstart Audit (1.450 euro) e' l'analisi profonda: due audit completi, un piano e una previsione pronti per il management, e un'automazione quick win attivata in live in 14 giorni.",
  },
  {
    q: "Quanto velocemente vedremo impatto?",
    a: "Entro 14 giorni sull'audit a pagamento. Entro il giorno 10 avrai baseline, mappa delle perdite e una shortlist prioritaria. Il giorno 14 attiviamo il tuo quick win in live, cosi' chiudi la call finale con qualcosa gia' operativo. Segnali iniziali tipici: speed-to-lead piu' rapido, recupero delle chiamate perse, o piu' risposte e prenotazioni da reminder e riattivazioni, a seconda del quick win che installiamo.",
  },
  {
    q: "Eseguite voi il piano 90 giorni?",
    a: "Si', se lo desideri. L'audit e' completo di per se': ricevi piano, previsioni e pacchetto di consegna. Se vuoi che sia il nostro team a implementare, offriamo un retainer e accreditiamo 500 euro del costo dell'audit se inizi entro 14 giorni. In ogni caso il tuo quick win include 14 giorni di supporto, cosi' continua a generare risultati.",
  },
  {
    q: "Che accessi vi servono?",
    a: "Accessi in sola lettura per analizzare senza modificare nulla. Piattaforme ads (Google, Meta, LinkedIn, in vista), CRM (stati contatti, timestamp, esiti, export o vista), sistema telefonico e call log (chiamate perse, metriche base, registrazioni opzionali) e calendario o scheduling (prenotazioni e no-show, vista o API). In piu' un referente per domande e approvazioni rapide. Forniamo una checklist breve al kickoff.",
  },
  {
    q: "Healthcare o compliance? I miei dati sono al sicuro?",
    a: "Si'. Supportiamo configurazioni conformi al GDPR dove serve. Progettiamo le automazioni per minimizzare l'esposizione dei dati, limitare la retention e usare canali sicuri, con opzioni come nessuna registrazione o trascrizioni redatte, accessi a privilegi minimi e linguaggio di consenso chiaro. Segnaliamo cosa e' sicuro e cosa no nel tuo stack e condividiamo una checklist compliance su richiesta.",
  },
  {
    q: "E se non potete aiutarci?",
    a: "Riduciamo il rischio con due tutele. Garanzia di Idoneita' (kickoff): se scopriamo che i tuoi dati o il tuo stack non ci permettono di muovere i KPI principali in modo significativo, rimborsiamo subito. Garanzia di Chiarezza (finale): se l'audit non traccia un percorso basato sui dati verso una riduzione dei costi del 10%, un aumento delle prenotazioni del 5% o 10 ore a settimana risparmiate, rimborsiamo l'audit. Le garanzie richiedono accessi tempestivi in sola lettura e dati storici accurati.",
  },
];

export default function JumpstartFaqIT() {
  const [open, setOpen] = useState(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq" className="bg-deep-blue" inner="max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SectionHeading eyebrow="FAQ" title={<>Risposte prima di prenotare</>} />
      <div className="mt-12 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 50}>
              <div className={`overflow-hidden rounded-xl border transition-colors ${isOpen ? "border-[#3C91E6]/30 bg-white/[0.04]" : "border-white/[0.08] bg-white/[0.02]"}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[15.5px] font-semibold text-white">{f.q}</span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-[#8fe0f0] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-white/60">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
