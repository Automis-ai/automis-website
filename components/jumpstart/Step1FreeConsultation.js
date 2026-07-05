"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Phone, Map, ListChecks, Check } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const POINTS = [
  {
    icon: Map,
    title: "Map your top bottlenecks",
    body: "We trace your flow, ads, leads, calls, follow-up, admin, and pinpoint where hours and revenue are slipping away.",
  },
  {
    icon: ListChecks,
    title: "See what is possible",
    body: "You leave with a plain-English view of your biggest wins and the highest-ROI automations to fix them.",
  },
  {
    icon: Check,
    title: "Zero pressure, zero cost",
    body: "It is free and there is no obligation. If it is not a fit, we will tell you straight on the call.",
  },
];

export default function Step1FreeConsultation() {
  return (
    <Section id="step-1" className="bg-[#020a12]">
      <div className="mx-auto mb-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.06] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">
          <Phone className="h-3.5 w-3.5" strokeWidth={2.2} />
          Step 1 · Free
        </span>
      </div>

      <SectionHeading
        title={<>A free 30-minute <GradientText>consultation</GradientText></>}
        lead="The low-friction first step. A quick call to map your top bottlenecks and see what AI could do for your business. No cost, no obligation, no risk."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {POINTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 70}>
              <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/[0.05]">
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
          <InteractiveHoverButton
            href={BOOKING}
            variant="solid"
            text="Book a Free Consultation"
          />
          <p className="text-[13px] text-white/50">Free · 30 minutes · no obligation</p>
        </div>
      </Reveal>
    </Section>
  );
}
