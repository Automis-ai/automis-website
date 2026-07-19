"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Phone, Lightbulb, Route, Handshake } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/pt-automis";

/* Enquadramento honesto: a chamada gratuita e uma verdadeira primeira conversa,
   nao um mini-audit. Damos um ou dois conselhos reais, explicamos como funciona
   a auditoria e verificamos o fit. */
const POINTS = [
  {
    icon: Lightbulb,
    title: "Um ou dois conselhos rápidos",
    body: "Olhamos para o que nos conta e já lhe apontamos uma ou duas coisas a corrigir. Útil por si só, sem compromisso.",
  },
  {
    icon: Route,
    title: "Como funciona a auditoria",
    body: "Explicamos o que inclui a Jumpstart Audit completa, o que iremos analisar e o que leva consigo.",
  },
  {
    icon: Handshake,
    title: "Verificamos se somos um bom fit",
    body: "Se a sua estrutura ainda não estiver pronta para a auditoria aprofundada, dizemos-lho com clareza. Grátis, sem obrigação de avançar.",
  },
];

export default function Step1FreeConsultationPT() {
  return (
    <Section id="step-1" className="bg-[#020a12]">
      <div className="mx-auto mb-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.06] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">
          <Phone className="h-3.5 w-3.5" strokeWidth={2.2} />
          Come&ccedil;amos com uma chamada gratuita
        </span>
      </div>

      <SectionHeading
        title={<>Primeiro, uma <GradientText>chamada de diagn&oacute;stico</GradientText></>}
        lead="Uma conversa gratuita de 30 minutos. Partilhamos um ou dois quick wins, explicamos exatamente como funciona a auditoria e percebemos juntos se e a jogada certa para si. E so isto, sem pressao e sem um diagnostico completo no momento."
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
          <InteractiveHoverButton href={BOOKING} target="_blank" rel="noopener noreferrer" variant="solid" text="Reserve uma Chamada Gratuita" />
          <p className="text-[13px] text-white/50">Gr&aacute;tis &middot; 30 minutos &middot; sem compromisso</p>
        </div>
      </Reveal>
    </Section>
  );
}
