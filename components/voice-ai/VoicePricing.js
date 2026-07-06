"use client";
import { Section, SectionHeading, Reveal, GRAD } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Check, ShieldCheck } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const TIERS = [
  {
    name: "Starter",
    price: "€297",
    period: "/mo",
    tagline: "Everything you need to stop missing calls.",
    features: [
      "200 minutes / month",
      "24/7 inbound call answering",
      "Booking + calendar sync",
      "Missed-call recovery",
      "Call notifications",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "€497",
    period: "/mo",
    tagline: "Turn answered calls into a follow-up machine.",
    features: [
      "600 minutes / month",
      "Everything in Starter",
      "CRM sync (GoHighLevel / HubSpot)",
      "SMS & WhatsApp reminders",
      "Automated follow-ups",
      "Multi-calendar / multi-staff",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "€697",
    period: "/mo",
    tagline: "A full acquisition engine, voice and beyond.",
    features: [
      "1,500 minutes / month",
      "Everything in Growth",
      "WhatsApp chatbot",
      "Outbound campaigns",
      "Custom integrations",
      "Priority + human-in-the-loop",
      "Advanced analytics",
    ],
    featured: false,
  },
];

export default function VoicePricing() {
  return (
    <Section id="voice-pricing" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="Pricing"
        title={<>Simple plans that pay for themselves in booked appointments.</>}
        lead="Pick the level that matches how you sell. Upgrade any time as you grow."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 110}>
            <div
              className={`group relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm hover:-translate-y-1 ${
                t.featured
                  ? "card-glow border-[#3C91E6]/35 bg-white/[0.05]"
                  : "card-gold border-white/[0.08] bg-white/[0.03]"
              }`}
            >
              {t.featured && (
                <span
                  className="absolute right-5 top-5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#04101c]"
                  style={{ background: GRAD }}
                >
                  Most popular
                </span>
              )}
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{t.name}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[2.6rem] font-bold leading-none text-white">{t.price}</span>
                <span className="text-[15px] text-white/50">{t.period}</span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60">{t.tagline}</p>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-white/80">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex pt-8">
                <InteractiveHoverButton
                  href={BOOKING}
                  variant={t.featured ? "solid" : "ghost"}
                  text="Book a Discovery Call"
                  className="w-full"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Enterprise / Custom — 4th tier as a full-width band */}
      <Reveal delay={130}>
        <div className="mt-5 flex flex-col items-start gap-5 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">Enterprise / Custom</p>
            <p className="font-display mt-2 text-[1.3rem] font-semibold leading-snug text-white">
              High volume, multiple locations, or bespoke integrations?
            </p>
            <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-white/60">
              Custom call volume, dedicated support, and a system scoped and priced around exactly how your business runs.
            </p>
          </div>
          <InteractiveHoverButton
            href={BOOKING}
            variant="ghost"
            text="Let's talk"
            className="w-full flex-shrink-0 sm:w-auto"
          />
        </div>
      </Reveal>

      {/* 30-day performance guarantee, all tiers */}
      <Reveal delay={120}>
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-[#FEC458]/25 bg-[#FEC458]/[0.05] p-6 text-center sm:flex-row sm:justify-center sm:text-left">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#FEC458]/30 bg-[#FEC458]/10">
            <ShieldCheck className="h-5 w-5 text-[#FEC458]" strokeWidth={2} />
          </span>
          <div>
            <p className="font-display text-[1.1rem] font-semibold text-white">30-day performance guarantee</p>
            <p className="mt-1 text-[14px] text-white/60">
              Every plan is backed by our 30-day performance guarantee. If it does not perform, you are covered.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
