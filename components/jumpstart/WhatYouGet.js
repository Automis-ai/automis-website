"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { Map, ListChecks, Gauge, Check } from "lucide-react";

const DELIVERABLES = [
  {
    icon: Map,
    title: "A leak map of your business",
    body: "We walk your lead-to-booking flow — ads, calls, follow-up, admin — and pinpoint exactly where hours and revenue are slipping away.",
    points: ["Speed-to-lead & missed calls", "Manual handoffs & follow-up gaps", "Repetitive admin eating your week"],
  },
  {
    icon: ListChecks,
    title: "Your top AI opportunities",
    body: "A short, ranked shortlist of the automations that would move the needle most for your specific business — scored by impact versus effort.",
    points: ["3–6 high-ROI moves, ranked", "What to fix first, and why", "Where AI actually pays back fast"],
  },
  {
    icon: Gauge,
    title: "A clear next step",
    body: "You leave knowing what a fix looks like, what it would take, and whether it's a build worth doing — with zero obligation to continue.",
    points: ["Plain-English recommendations", "Rough effort & payback view", "No pressure, no commitment"],
  },
];

export default function WhatYouGet() {
  return (
    <Section id="what-you-get" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="What you get"
        title={<>Leave the call with a <GradientText>clear picture</GradientText>, not a sales pitch</>}
        lead="The AI Audit is a working session. In 30 focused minutes we map your bottlenecks and hand you the highest-ROI automations to fix them."
      />
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {DELIVERABLES.map((d, i) => {
          const Icon = d.icon;
          return (
            <Reveal key={d.title} delay={i * 70}>
              <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/[0.05]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-6 text-[1.3rem] font-semibold leading-tight text-white">{d.title}</h3>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-white/60">{d.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {d.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[14px] text-white/75">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
