"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Phone, Lightbulb, Route, Handshake } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/automis-it";

/* Inquadramento onesto: la call gratuita è una vera prima conversazione, non
   un mini-audit. Diamo un paio di consigli reali, spieghiamo come funziona
   l'audit e verifichiamo il fit. */
const POINTS = [
  {
    icon: Lightbulb,
    title: "Un paio di consigli veloci",
    body: "Guardiamo cosa ci racconti e ti segnaliamo già una o due cose da sistemare. Utile di per sé, senza impegno.",
  },
  {
    icon: Route,
    title: "Come funziona l'audit",
    body: "Ti spieghiamo cosa comprende la Jumpstart Audit completa, cosa analizzeremmo e cosa ti porti a casa.",
  },
  {
    icon: Handshake,
    title: "Verifichiamo se siamo un fit",
    body: "Se la tua struttura non è ancora pronta per l'audit approfondito, te lo diciamo con chiarezza. Gratis, senza obbligo di proseguire.",
  },
];

export default function Step1FreeConsultationIT() {
  return (
    <Section id="step-1" className="bg-[#020a12]">
      <div className="mx-auto mb-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.06] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">
          <Phone className="h-3.5 w-3.5" strokeWidth={2.2} />
          Si parte con una call gratuita
        </span>
      </div>

      <SectionHeading
        title={<>Prima, una <GradientText>call conoscitiva</GradientText></>}
        lead="Una conversazione gratuita di 30 minuti. Condividiamo un paio di quick win, spieghiamo esattamente come funziona l'audit e capiamo insieme se è la mossa giusta per te. Tutto qui, senza pressione e senza una diagnosi completa sul momento."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {POINTS.map((p, i) => {
          const Icon = p.icon;
          const cardClass = i % 2 === 0 ? "card-gold" : "card-glow";
          return (
            <Reveal key={p.title} delay={i * 70}>
              <div className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/[0.05]`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-6 text-[1.25rem] font-semibold leading-tight text-white">{p.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{p.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <InteractiveHoverButton href={BOOKING} variant="solid" text="Prenota una Call Gratuita" />
          <p className="text-[13px] text-white/50">Gratis &middot; 30 minuti &middot; senza impegno</p>
        </div>
      </Reveal>
    </Section>
  );
}
