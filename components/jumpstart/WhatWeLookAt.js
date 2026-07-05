"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { TrendingUp, Headphones, Database, Check } from "lucide-react";

const PILLARS = [
  {
    icon: TrendingUp,
    kicker: "Marketing & Growth",
    title: "Where spend gets wasted",
    points: [
      "Ad waste and where budget can stop, start, or scale",
      "Targeting, offer, and landing gaps that cost conversions",
      "Tracking that doesn't tell you the truth",
    ],
  },
  {
    icon: Headphones,
    kicker: "Sales & Acquisition",
    title: "Where leads slip away",
    points: [
      "Speed-to-lead and missed calls losing you bookings",
      "Follow-up that stalls or never happens",
      "No-shows and manual handoffs between steps",
    ],
    featured: true,
  },
  {
    icon: Database,
    kicker: "Admin & Company Brain",
    title: "Where hours disappear",
    points: [
      "Repetitive back-office work eating your week",
      "Paper, PDFs, and data that aren't searchable",
      "Knowledge trapped in people's heads and inboxes",
    ],
  },
];

export default function WhatWeLookAt() {
  return (
    <Section id="what-we-look-at" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="What we look at · three pillars"
        title={<>We audit the <GradientText>whole business</GradientText>, not just one channel</>}
        lead="Most bottlenecks aren't where you think. We look across marketing, sales, and admin — the three places time and money quietly leak — so the fix targets what actually matters."
      />
      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.kicker} delay={i * 70}>
              <div
                className={`card-gold group relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm transition-all hover:-translate-y-1 ${
                  p.featured
                    ? "border-[#3C91E6]/35 bg-white/[0.05]"
                    : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05]"
                }`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{p.kicker}</p>
                <h3 className="font-display mt-2 text-[1.3rem] font-semibold leading-tight text-white">{p.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {p.points.map((pt) => (
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
