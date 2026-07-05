"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { CalendarCheck, Search, Route, Rocket } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: CalendarCheck,
    title: "Book & tell us your goals",
    body: "Grab a 30-minute slot on the calendar. Before the call we ask a few quick questions so we walk in already understanding your business and where you feel the friction.",
  },
  {
    n: "02",
    icon: Search,
    title: "We map your bottlenecks",
    body: "On the call we trace your flow — ads → lead → outreach → booking → follow-up → admin — and flag the leaks: slow response, missed calls, manual handoffs, work that repeats every week.",
  },
  {
    n: "03",
    icon: Route,
    title: "You get the shortlist",
    body: "We rank the highest-ROI automations for your situation by impact versus effort, and talk through what fixing each one would actually look like in your stack.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Decide your next move",
    body: "Take the plan and run with it yourself, or have us build it. Either way you leave with clarity — and zero obligation to continue.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-deep-blue">
      <SectionHeading
        eyebrow="How it works"
        title={<>From <GradientText>booked call</GradientText> to a plan, in 30 minutes</>}
        lead="No forms to fill out for hours, no lengthy onboarding. A focused working session that ends with a concrete direction."
      />
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.n} delay={i * 70}>
              <div className="card-glow group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-[13px] font-semibold text-white/25">{s.n}</span>
                </div>
                <h3 className="font-display mt-6 text-[1.2rem] font-semibold leading-tight text-white">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">{s.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
