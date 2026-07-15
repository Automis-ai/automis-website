"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Phone, Lightbulb, Route, Handshake } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

/* Honest framing: the free call is a genuine first conversation, not a mini-audit.
   We give a couple of real tips, explain how the audit works, and check fit. */
const POINTS = [
  {
    icon: Lightbulb,
    title: "A couple of quick tips",
    body: "We look at what you tell us and already point out one or two things worth fixing. Useful on its own, no strings attached.",
  },
  {
    icon: Route,
    title: "How the audit works",
    body: "We walk you through what the full Jumpstart Audit involves, what we would look at, and what you would walk away with.",
  },
  {
    icon: Handshake,
    title: "See if we are a fit",
    body: "If your setup is not ready for the deep audit yet, we will tell you straight. Free, and no obligation to go further.",
  },
];

export default function Step1FreeConsultation() {
  return (
    <Section id="step-1" className="bg-[#020a12]">
      <div className="mx-auto mb-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.06] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">
          <Phone className="h-3.5 w-3.5" strokeWidth={2.2} />
          It starts with a free call
        </span>
      </div>

      <SectionHeading
        title={<>First, a free <GradientText>discovery call</GradientText></>}
        lead="A no-cost, 30-minute conversation. We share a couple of quick wins, explain exactly how the audit works, and figure out together whether it is the right move for you. That is it, no pressure and no full diagnosis on the spot."
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
          <InteractiveHoverButton href={BOOKING} target="_blank" rel="noopener noreferrer" variant="solid" text="Book a Free Discovery Call" />
          <p className="text-[13px] text-white/50">Free · 30 minutes · no obligation</p>
        </div>
      </Reveal>
    </Section>
  );
}
