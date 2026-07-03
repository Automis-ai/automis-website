"use client";
import { Section, SectionHeading, Reveal, Card } from "./_ui";
import SwipeRow from "./SwipeRow";
import { PhoneMissed, Timer, FileStack, Brain } from "lucide-react";

const PAINS = [
  {
    icon: PhoneMissed,
    title: "Calls go unanswered",
    body: "30 to 50% of calls to local businesses go to voicemail. Every missed call is a booking your competitor picks up instead.",
  },
  {
    icon: Timer,
    title: "Leads go cold",
    body: "Most businesses take hours to follow up. After the first 5 minutes, the odds of ever converting that lead fall off a cliff.",
  },
  {
    icon: FileStack,
    title: "Admin eats the day",
    body: "Your team burns hours every week on data entry, scheduling, and chasing paperwork, instead of serving customers.",
  },
  {
    icon: Brain,
    title: "Knowledge is trapped",
    body: "Critical information lives in inboxes, PDFs, and people's heads, impossible to find the moment you actually need it.",
  },
];

export default function PainPoints() {
  return (
    <Section id="pain" className="bg-deep-blue">
      <SectionHeading
        eyebrow="The cost of doing nothing"
        title={<>Growth doesn&apos;t leak all at once. It leaks a little, everywhere.</>}
        lead="Most businesses don't have a marketing problem. They have a system problem. Here's where the money quietly walks out the door."
      />
      <SwipeRow
        className="mt-14"
        gridClassName="sm:grid-cols-2 lg:grid-cols-4"
        items={PAINS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <Card className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-[#57C7E3]/40">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">{p.body}</p>
              </Card>
            </Reveal>
          );
        })}
      />
    </Section>
  );
}
