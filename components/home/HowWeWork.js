"use client";
import { Section, SectionHeading, Reveal, GRAD } from "./_ui";
import { Search, Wrench, LineChart } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "Step 1",
    title: "Discover & Diagnose",
    body: "We learn your business before touching a single tool. We map exactly where you lose time and money — then decide what's worth automating first.",
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
    body: "We don't disappear after go-live. Continuous monthly improvement with human oversight — your system gets sharper every month, not stale.",
    meta: "Ongoing, with human-in-the-loop",
  },
];

export default function HowWeWork() {
  return (
    <Section id="how" className="bg-deep-blue">
      <SectionHeading
        eyebrow="How we work"
        title={<>A strategic integrator, not a vendor</>}
        lead="We diagnose the bottleneck before we build. You own the infrastructure we deliver — it's your system, not a subscription you're locked into blind."
      />
      <div className="relative mt-16">
        {/* connecting line (desktop) */}
        <div
          className="absolute left-0 right-0 top-[34px] hidden h-px lg:block"
          style={{ background: "linear-gradient(90deg, transparent, rgba(87,199,227,0.35), transparent)" }}
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.step} delay={i * 130} className="relative">
                <div className="flex flex-col items-start">
                  <span
                    className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-white/10 bg-[#04101c]"
                    style={{ boxShadow: "0 0 0 6px rgba(0,10,20,1)" }}
                  >
                    <span className="flex h-full w-full items-center justify-center rounded-2xl" style={{ background: "rgba(60,145,230,0.10)" }}>
                      <Icon className="h-6 w-6 text-[#8fe0f0]" strokeWidth={1.8} />
                    </span>
                  </span>
                  <span className="mt-6 font-plex-mono text-[12px] uppercase tracking-[0.16em]" style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                    {s.step}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{s.body}</p>
                  <p className="mt-4 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[12.5px] font-medium text-white/55">
                    {s.meta}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
