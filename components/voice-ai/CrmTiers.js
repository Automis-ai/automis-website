"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { CalendarCheck2, Users, KanbanSquare, Check, ShieldCheck } from "lucide-react";

const TIERS = [
  {
    icon: CalendarCheck2,
    kicker: "Level 1",
    title: "Bookings",
    body: "Every appointment the AI booked, in one place. See what is on the calendar without touching a spreadsheet.",
    points: ["Every AI-booked appointment", "Date, time, and contact at a glance", "Synced to your calendar"],
    shot: "/assets/images/dashboard/clean/bookings.png",
    caption: "Bookings, every AI-booked appointment, with call outcome",
  },
  {
    icon: Users,
    kicker: "Level 2",
    title: "Light CRM",
    body: "Contacts with the outcome and sentiment of every call, so you know who to follow up with and why.",
    points: ["Contacts + call outcomes", "Sentiment on every interaction", "Follow-up context, ready to act on"],
    shot: "/assets/images/dashboard/clean/light-crm.png",
    caption: "Light CRM, call outcomes and sentiment on every contact",
  },
  {
    icon: KanbanSquare,
    kicker: "Level 3",
    title: "Pipeline",
    body: "A full kanban sales board. Drag deals through your stages and watch the AI feed the top of the funnel.",
    points: ["Kanban sales stages", "Deals moved as they progress", "AI keeps the funnel full"],
    shot: "/assets/images/dashboard/clean/pipeline.png",
    caption: "Pipeline, a kanban board the AI keeps feeding from the top",
  },
];

// Subtle browser-chrome frame wrapper for a screenshot.
function BrowserFrame({ src, alt }) {
  return (
    <div className="card-glow overflow-hidden rounded-xl border border-white/[0.1] bg-[#0b1622] shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 hidden truncate rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-white/40 sm:block">
          app.automis.ai/dashboard
        </span>
      </div>
      <img src={src} alt={alt} className="block w-full" loading="lazy" />
    </div>
  );
}

export default function CrmTiers() {
  return (
    <Section id="voice-crm" className="bg-[#000a14]">
      <SectionHeading
        eyebrow="The CRM"
        title={<>Three levels of visibility, from booked to closed.</>}
        lead="Start with a clean view of your bookings and grow into a full pipeline as your sales operation does."
      />

      <div className="mt-14 space-y-8 sm:space-y-12">
        {TIERS.map((t, i) => {
          const Icon = t.icon;
          const flip = i % 2 === 1;
          return (
            <Reveal key={t.title} delay={i * 80}>
              <div
                className={`grid grid-cols-1 items-center gap-6 lg:gap-10 ${
                  flip ? "lg:grid-cols-[1.18fr_0.82fr]" : "lg:grid-cols-[0.82fr_1.18fr]"
                }`}
              >
                {/* Text column */}
                <div className={flip ? "lg:order-2" : ""}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{t.kicker}</p>
                  <h3 className="font-display mt-2 text-[1.5rem] font-semibold leading-tight text-white">{t.title}</h3>
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

                {/* Screenshot column */}
                <div className={flip ? "lg:order-1" : ""}>
                  <BrowserFrame src={t.shot} alt={t.caption} />
                  <p className="mt-3 text-center text-[13px] text-white/55">{t.caption}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 flex items-center justify-center gap-1.5 text-[12px] text-white/40">
          <ShieldCheck className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} />
          Customer names and numbers are blurred for privacy.
        </p>
      </Reveal>
    </Section>
  );
}
