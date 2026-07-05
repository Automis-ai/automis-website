"use client";
import { Section, SectionHeading, Reveal, GRAD } from "@/components/home/_ui";
import { PhoneIncoming, ClipboardCheck, CalendarCheck, RefreshCw, PhoneOutgoing } from "lucide-react";

const STEPS = [
  {
    icon: PhoneIncoming,
    title: "Answers every call",
    body: "Picks up on the first ring, 24/7, in a natural voice. No hold music, no voicemail, no missed calls.",
  },
  {
    icon: ClipboardCheck,
    title: "Qualifies the lead",
    body: "Asks your questions, understands the request, and captures the details that matter before booking.",
  },
  {
    icon: CalendarCheck,
    title: "Books the appointment",
    body: "Checks live availability and books directly onto your calendar, with confirmation to the caller.",
  },
  {
    icon: RefreshCw,
    title: "Syncs to your CRM",
    body: "Contact, outcome, and notes flow straight into your CRM, so nothing is retyped and nothing is lost.",
  },
  {
    icon: PhoneOutgoing,
    title: "Recovers missed calls",
    body: "If a call ever slips through, it calls the number back automatically to win the booking anyway.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="voice-how" className="bg-[#000a14]">
      <SectionHeading
        eyebrow="How it works"
        title={<>From ring to booked appointment, on autopilot.</>}
        lead="One connected flow that runs every call the same way, every time."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 90}>
              <div className="card-glow group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <span
                    className="font-display text-[1.4rem] font-bold leading-none"
                    style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-[1.1rem] font-semibold leading-tight text-white">{s.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">{s.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
