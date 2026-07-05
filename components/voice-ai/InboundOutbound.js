"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import {
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  CalendarCheck,
  HelpCircle,
  Filter,
  PhoneMissed,
  Zap,
  RefreshCw,
  BellRing,
  PhoneCall,
  Star,
} from "lucide-react";

/* Two ways the same voice agent works for a business:
   INBOUND = the 24/7 receptionist (answers the calls coming in)
   OUTBOUND = the growth engine (makes the calls going out) */
const INBOUND = {
  eyebrow: "Inbound",
  title: "Your 24/7 receptionist",
  intro:
    "Answers every incoming call in a natural voice, day or night, so no caller hits voicemail or dials a competitor.",
  headIcon: PhoneIncoming,
  items: [
    {
      icon: PhoneIncoming,
      title: "Answer every call instantly",
      what: "Picks up on the first ring in a natural voice, so callers are helped right away instead of waiting on hold or hitting voicemail.",
      outcome: "No caller lost to a busy or ringing phone",
    },
    {
      icon: Clock,
      title: "After-hours and weekend cover",
      what: "Handles calls on nights, weekends, and holidays, capturing the inquiries that would go unanswered when the office is closed.",
      outcome: "Coverage when your team is offline",
    },
    {
      icon: CalendarCheck,
      title: "Book and reschedule appointments",
      what: "Checks live calendar availability and books, moves, or cancels appointments, then confirms and syncs to your scheduling system.",
      outcome: "More slots filled without staff effort",
    },
    {
      icon: HelpCircle,
      title: "Answer common questions",
      what: "Responds to routine questions like hours, location, services, and typical pricing, so your staff are not interrupted.",
      outcome: "Fewer routine calls tying up your team",
    },
    {
      icon: Filter,
      title: "Qualify and route callers",
      what: "Asks a few qualifying questions, captures why the person is calling, and routes hot or urgent callers to the right person.",
      outcome: "The right caller reaches the right person",
    },
    {
      icon: PhoneMissed,
      title: "Catch missed and overflow calls",
      what: "Steps in when staff are on another line or with a client, taking the caller's details so nothing slips through when it is busy.",
      outcome: "Every inquiry captured, not lost",
    },
  ],
};

const OUTBOUND = {
  eyebrow: "Outbound",
  title: "Your growth engine",
  intro:
    "Calls the leads you already paid for: new leads in seconds, cold ones revived, and follow-ups so nothing goes cold.",
  headIcon: PhoneOutgoing,
  items: [
    {
      icon: Zap,
      title: "Instant speed-to-lead callback",
      what: "The moment a form, ad, or web lead comes in, the agent calls back within seconds to qualify and book while interest is hot.",
      outcome: "Reach leads before your competitors do",
    },
    {
      icon: RefreshCw,
      title: "Reactivate cold leads",
      what: "Works through old or dormant CRM lists, re-engages past inquiries in a natural voice, and re-books the ones still interested.",
      outcome: "New appointments from leads already in your database",
    },
    {
      icon: BellRing,
      title: "Reminders and confirmations",
      what: "Calls ahead of each appointment to confirm, answer quick questions, and reschedule instead of losing the slot.",
      outcome: "Fewer no-shows, a fuller calendar",
    },
    {
      icon: PhoneOutgoing,
      title: "Quote and estimate follow-up",
      what: "After a quote, proposal, or treatment plan goes out, the agent follows up by phone to handle objections and move it forward.",
      outcome: "More estimates turn into signed clients",
    },
    {
      icon: PhoneCall,
      title: "Missed-call auto-callback",
      what: "Every missed or abandoned call triggers an automatic callback, so the caller is reached in minutes, not lost to voicemail.",
      outcome: "Recover revenue that would walk to a competitor",
    },
    {
      icon: Star,
      title: "Review and re-booking calls",
      what: "After a visit the agent asks for feedback or a review, and reaches out to lapsed customers to bring them back in.",
      outcome: "More reviews and repeat business",
    },
  ],
};

function ModePanel({ data, accent }) {
  const Head = data.headIcon;
  const isGold = accent === "gold";
  const ring = isGold ? "border-[#FEC458]/25" : "border-white/[0.08]";
  const chipText = isGold ? "text-[#FEC458]" : "text-[#57C7E3]";
  const chipBg = isGold ? "bg-[#FEC458]/[0.08] border-[#FEC458]/25" : "bg-[#57C7E3]/[0.08] border-[#57C7E3]/25";
  const iconColor = isGold ? "text-[#FEC458]" : "text-[#8fe0f0]";
  const dot = isGold ? "text-[#FEC458]" : "text-[#57C7E3]";
  return (
    <div className={`${isGold ? "card-gold" : "card-glow"} group relative flex h-full flex-col rounded-2xl border ${ring} bg-white/[0.03] p-7 backdrop-blur-sm sm:p-8`}>
      {/* Panel header */}
      <div className="flex items-center gap-4">
        <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${chipBg}`}>
          <Head className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} />
        </span>
        <div>
          <p className={`text-[12px] font-semibold uppercase tracking-[0.16em] ${chipText}`}>{data.eyebrow}</p>
          <h3 className="font-display text-[1.4rem] font-semibold leading-tight text-white">{data.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-[14.5px] leading-relaxed text-white/60">{data.intro}</p>

      {/* Use-case list */}
      <ul className="mt-7 space-y-5">
        {data.items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.title} className="flex gap-4">
              <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                <Icon className={`h-[18px] w-[18px] ${iconColor}`} strokeWidth={1.9} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-white">{it.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white/55">{it.what}</p>
                <p className={`mt-1.5 text-[13px] font-medium ${chipText}`}>{it.outcome}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function InboundOutbound() {
  return (
    <Section id="voice-modes" className="bg-[#000a14]">
      <SectionHeading
        eyebrow="Inbound and outbound"
        title={<>One voice agent, <GradientText>two jobs</GradientText>.</>}
        lead="It answers the calls coming in like a 24/7 receptionist, and it makes the calls going out to turn the leads you already paid for into booked appointments."
      />

      <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <Reveal>
          <ModePanel data={INBOUND} accent="blue" />
        </Reveal>
        <Reveal delay={100}>
          <ModePanel data={OUTBOUND} accent="gold" />
        </Reveal>
      </div>
    </Section>
  );
}
