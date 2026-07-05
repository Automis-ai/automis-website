"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Boxes, ShieldCheck, UserCheck } from "lucide-react";

const BELIEFS = [
  {
    icon: Boxes,
    title: "Systems you own",
    body: "We build bespoke, interconnected systems that belong to you, not a black box you rent. When we're done, the infrastructure is yours: no vendor lock-in, no subscription you can't see inside.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first by design",
    body: "GDPR-aligned from day one, with EU and local server options for healthcare and financial data. Your information stays where it should, handled the way regulated businesses need it handled.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop",
    body: "AI handles the volume; people handle the nuance. Complex or sensitive cases route straight to your team, so nothing important gets lost to automation.",
  },
];

export default function AboutBeliefs() {
  return (
    <Section id="who-we-are" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="Who we are"
        title={<>We build the systems your business is missing</>}
        lead="Automis started from a simple frustration: businesses wanted AI to actually run their operations, but got demos and dashboards instead of working systems. So we build the real thing, end to end, and we build it around how your business already works."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {BELIEFS.map((b, i) => {
          const Icon = b.icon;
          return (
            <Reveal key={b.title} delay={i * 100}>
              <div className="card-glow group flex h-full flex-col items-start rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm">
                <span
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/10"
                  style={{ background: "rgba(60,145,230,0.10)" }}
                >
                  <Icon className="h-6 w-6 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-6 text-xl font-semibold text-white">{b.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{b.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
