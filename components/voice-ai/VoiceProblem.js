"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { PhoneMissed, MoonStar, Clock } from "lucide-react";

const PAINS = [
  {
    icon: PhoneMissed,
    title: "Missed calls are lost customers",
    body: "Every unanswered call is a prospect who dials the next business on the list. Voicemail rarely gets a callback, and the booking is gone before you even know it rang.",
  },
  {
    icon: MoonStar,
    title: "Nobody answers after hours",
    body: "Most inquiries land outside 9-to-5, on nights and weekends. If there is no one to pick up, the after-hours demand you paid to generate quietly leaks away.",
  },
  {
    icon: Clock,
    title: "Slow follow-up kills the deal",
    body: "Leads go cold in minutes. When it takes hours to call back, the intent is gone and the appointment goes to whoever answered first.",
  },
];

export default function VoiceProblem() {
  return (
    <Section id="voice-problem" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="The problem"
        title={<>Your phone is leaking revenue you already paid to generate.</>}
        lead="Marketing works. The calls come in. But the ones you cannot answer fast enough never turn into booked appointments."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {PAINS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 120}>
              <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-6 text-[1.25rem] font-semibold leading-tight text-white">{p.title}</h3>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-white/60">{p.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
