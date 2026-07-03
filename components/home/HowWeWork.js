"use client";
import { Section, SectionHeading, Reveal, GRAD } from "./_ui";
import SwipeRow from "./SwipeRow";
import { Search, Wrench, LineChart } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "Step 1",
    title: "Discover & Diagnose",
    body: "We learn your business before touching a single tool. We map exactly where you lose time and money, then decide what's worth automating first.",
    meta: "Discovery call + audit",
  },
  {
    icon: Wrench,
    step: "Step 2",
    title: "Design, Build & Deploy",
    body: "We build your system and you test it before it goes live. Nothing ships until it works the way your business actually runs.",
    meta: "~7 days for Voice & simple · custom for complex",
  },
  {
    icon: LineChart,
    step: "Step 3",
    title: "Launch, Monitor & Optimise",
    body: "We don't disappear after go-live. Continuous monthly improvement with human oversight, so your system gets sharper every month, not stale.",
    meta: "Ongoing, with human-in-the-loop",
  },
];

export default function HowWeWork() {
  return (
    <Section id="how" className="bg-deep-blue">
      <SectionHeading
        eyebrow="How we work"
        title={<>A strategic integrator, not a vendor</>}
        lead="We diagnose the bottleneck before we build. You own the infrastructure we deliver. It's your system, not a subscription you're locked into blind."
      />
      <SwipeRow
        className="mt-14"
        gridClassName="md:grid-cols-3"
        items={STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.step} delay={i * 130} className="h-full">
              <div className="card-gold group flex h-full flex-col items-start rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm hover:-translate-y-1">
                <span
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/10"
                  style={{ background: "rgba(60,145,230,0.10)" }}
                >
                  <Icon className="h-6 w-6 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <span className="mt-6 font-plex-mono text-[12px] uppercase tracking-[0.16em]" style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                  {s.step}
                </span>
                <h3 className="font-display mt-2 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{s.body}</p>
                <p className="mt-auto pt-4">
                  <span className="inline-block rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[12.5px] font-medium text-white/55">
                    {s.meta}
                  </span>
                </p>
              </div>
            </Reveal>
          );
        })}
      />
    </Section>
  );
}
