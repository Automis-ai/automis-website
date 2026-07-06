"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal } from "./_ui";
import { Plus } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "FAQ",
    title: "Straight answers before you book",
    faqs: [
      {
        q: "How fast can we go live?",
        a: "Voice agents and simple automations are typically live in about 7 days. Complex, multi-pillar systems run on a custom timeline, and we scope it precisely in the discovery call before anything starts.",
      },
      {
        q: "How much does it cost?",
        a: "Our Voice AI comes in fixed monthly plans (see the Voice AI page for pricing). Everything else is custom-quoted after a discovery call, because we build around your specific processes rather than a one-size package.",
      },
      {
        q: "Is my data safe? What about GDPR?",
        a: "Yes. We're privacy-first by design, with EU / local server options for healthcare and financial data, and human-in-the-loop routing for anything sensitive. Your information stays where it should.",
      },
      {
        q: "Do I need technical staff to run this?",
        a: "No. We design, build, deploy, and maintain the system, and you just use it. You also own the infrastructure we deliver; it's not a black box you're locked out of.",
      },
      {
        q: "What happens after launch?",
        a: "We don't disappear. Every engagement includes continuous monthly optimization with human oversight, so your system keeps improving instead of going stale. That's what the ongoing partnership covers.",
      },
      {
        q: "What if it doesn't work for us?",
        a: "Every Voice plan carries a 30-day performance guarantee, and custom engagements that include a setup fee come with a setup-fee refund. We take on the risk of the first step.",
      },
    ],
  },
  it: {
    eyebrow: "FAQ",
    title: "Risposte chiare, prima di prenotare",
    faqs: [
      {
        q: "In quanto tempo si parte?",
        a: "Gli agenti vocali IA e le automazioni semplici vanno di solito online in circa 7 giorni. I sistemi complessi e multi-pilastro hanno tempistiche su misura, che definiamo con precisione nella discovery call prima di partire.",
      },
      {
        q: "Quanto costa?",
        a: "Il nostro agente vocale IA ha piani mensili a prezzo fisso (trovi le tariffe nella pagina Voice AI). Tutto il resto lo quotiamo su misura dopo una discovery call, perché costruiamo attorno ai tuoi processi e non su un pacchetto uguale per tutti.",
      },
      {
        q: "I miei dati sono al sicuro? E il GDPR?",
        a: "Sì. La privacy viene prima di tutto: server in UE o in locale per dati sanitari e finanziari, e supervisione umana su tutto ciò che è sensibile. Le tue informazioni restano dove devono stare.",
      },
      {
        q: "Serve personale tecnico per gestirlo?",
        a: "No. Progettiamo, costruiamo, mettiamo online e manteniamo il sistema: a te resta solo usarlo. E l'infrastruttura che ti consegniamo è tua, non una scatola nera a cui non puoi mettere mano.",
      },
      {
        q: "Cosa succede dopo il lancio?",
        a: "Non ci volatilizziamo. Ogni progetto include un'ottimizzazione mensile continua con supervisione umana, così il tuo sistema migliora nel tempo invece di arrugginirsi. È questo che copre la partnership continuativa.",
      },
      {
        q: "E se non funzionasse per noi?",
        a: "Ogni piano Voice ha una garanzia sui risultati di 30 giorni, e i progetti su misura con costo di setup prevedono il rimborso di quella quota. Il rischio del primo passo ce lo prendiamo noi.",
      },
    ],
  },
};

export default function FaqEN() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const [open, setOpen] = useState(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq" className="bg-deep-blue" inner="max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SectionHeading eyebrow={t.eyebrow} title={<>{t.title}</>} />
      <div className="mt-12 space-y-3">
        {t.faqs.map((f, i) => {
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
