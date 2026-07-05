"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { CalendarCheck2, Users, KanbanSquare, Check } from "lucide-react";

const TIERS = [
  {
    icon: CalendarCheck2,
    kicker: "Level 1",
    title: "Bookings",
    body: "Every appointment the AI booked, in one place. See what is on the calendar without touching a spreadsheet.",
    points: ["Every AI-booked appointment", "Date, time, and contact at a glance", "Synced to your calendar"],
  },
  {
    icon: Users,
    kicker: "Level 2",
    title: "Light CRM",
    body: "Contacts with the outcome and sentiment of every call, so you know who to follow up with and why.",
    points: ["Contacts + call outcomes", "Sentiment on every interaction", "Follow-up context, ready to act on"],
  },
  {
    icon: KanbanSquare,
    kicker: "Level 3",
    title: "Pipeline",
    body: "A full kanban sales board. Drag deals through your stages and watch the AI feed the top of the funnel.",
    points: ["Kanban sales stages", "Deals moved as they progress", "AI keeps the funnel full"],
  },
];

export default function CrmTiers() {
  return (
    <Section id="voice-crm" className="bg-[#000a14]">
      <SectionHeading
        eyebrow="The CRM"
        title={<>Three levels of visibility, from booked to closed.</>}
        lead="Start with a clean view of your bookings and grow into a full pipeline as your sales operation does."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {TIERS.map((t, i) => {
          const Icon = t.icon;
          return (
            <Reveal key={t.title} delay={i * 120}>
              <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{t.kicker}</p>
                <h3 className="font-display mt-2 text-[1.35rem] font-semibold leading-tight text-white">{t.title}</h3>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-white/60">{t.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {t.points.map((pt) => (
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
