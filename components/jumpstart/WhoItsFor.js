"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Check, X } from "lucide-react";

const FOR = [
  "Lead-driven businesses that live or die by bookings",
  "Teams running Google, Meta, or LinkedIn ads",
  "Owners who want more output without adding headcount",
  "Anyone drowning in missed calls, slow follow-up, or admin",
];

const NOT_FOR = [
  "Pre-launch with no leads or activity to analyze yet",
  "Looking for a one-off ad tweak, not a system",
  "Not open to sharing how the business actually runs",
];

export default function WhoItsFor() {
  return (
    <Section id="who-its-for" className="bg-deep-blue">
      <SectionHeading
        eyebrow="Fit check"
        title="Is the AI Audit right for you?"
        lead="It's a working session, so it pays off most when there's a real business to look at. Here's who gets the most from it."
      />
      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="card-gold h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/[0.05]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#57C7E3]/30 bg-[#57C7E3]/10">
                <Check className="h-5 w-5 text-[#57C7E3]" strokeWidth={2.4} />
              </span>
              <h3 className="font-display text-[1.25rem] font-semibold text-white">A great fit</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {FOR.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/80">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card-gold h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05]">
                <X className="h-5 w-5 text-white/50" strokeWidth={2.4} />
              </span>
              <h3 className="font-display text-[1.25rem] font-semibold text-white">Not the right time</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {NOT_FOR.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/55">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/35" strokeWidth={2.4} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
