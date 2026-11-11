"use client";

import {
  Building2,
  CheckCircle2,
  PhoneCall,
  Utensils,
  ShoppingBag,
} from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";
import { useRegion, money } from "@/lib/RegionContext";

/* Estimates for a typical small business, built from published benchmarks (researched Nov 2026).
   EU and US values differ ({ eu, us }); percentages and hours are the same in both.
   - Re-activation: per 1,000 dormant leads, 30-40% reached, ~12% of those re-engage (Waboom AI-voice case),
     3-7 deals; fee per deal EU ~€6-9k (PT ~5%, IT ~3%), US ~$9k (one side ~2.4-2.8% of $367k median home).
   - Qualification: ~200 inbound leads/month x 15-20 min of rep time; rep cost EU ~€30-35/h, US ~$55-65/h.
     Average firm takes 42 h to respond (HBR 2011); calling within 5 min = 21x odds of qualifying (MIT/InsideSales).
   - Receptionist: loaded cost EU ~€22-32k/yr, US ~$53k (BLS $37,230 + benefits); ~20% of practice calls missed
     (Patient News, ~2M dental calls).
   - Booking: 20-60 calls/day, 23-33% missed at peak (Hostie, Maple); 2-3 recovered bookings/day x ~2.5 covers x
     €25 / $30; SMS reminders cut no-shows 16% (Resos, 3.8M bookings), 24% in salons (PLOS ONE).
   - E-commerce: ~800 tickets/month, 50-70% resolved by AI (vendor benchmarks 40-75%), human cost ~$4-5/ticket US,
     ~€3-4 EU, AI ~$1; AI-handled CSAT ~82-84%. */
const cases = [
  {
    icon: Building2,
    title: "Lead Re-activation",
    sector: "Real estate, Automotive, B2B services",
    problem:
      "You have a database with thousands of leads who showed interest months ago, but you don't have the resources to reach them all.",
    solution:
      "The AI automatically calls dormant leads with natural conversations, warms up the contact and hands only interested ones to your team.",
    results: [
      { label: "Extra revenue/year", value: { eu: "€20,000–€50,000", us: "$30,000–$70,000" } },
      { label: "Leads re-engaged", value: "8–12%" },
      { label: "Calling time saved/month", value: "40–60 h" },
    ],
  },
  {
    icon: CheckCircle2,
    title: "Lead Qualification",
    sector: "Real estate, Finance, Consulting",
    problem:
      "Your team wastes time on unqualified leads. Only 1 in 10 is truly ready to buy.",
    solution:
      "The AI calls every new lead, asks qualifying questions and passes only the warm leads to your team.",
    results: [
      { label: "Monthly saving", value: { eu: "€1,500–€2,500", us: "$2,500–$4,500" } },
      { label: "First call to every new lead", value: "< 1 min" },
      { label: "Rep time freed/month", value: "50–70 h" },
    ],
  },
  {
    icon: PhoneCall,
    title: "24/7 Virtual Receptionist",
    sector: "Medical practices, Law firms, Wellness centres",
    problem:
      "Call a medical practice at 1pm or after 6pm? Voicemail. The result: the patient goes elsewhere.",
    solution:
      "An always-available AI receptionist that answers FAQs, books appointments, sends text confirmations and updates the calendar.",
    results: [
      { label: "Monthly saving vs. a hire", value: { eu: "€1,500–€2,500", us: "$3,000–$4,000" } },
      { label: "Extra appointments", value: "+15–30/month" },
      { label: "Calls resolved by the AI", value: "70–80%" },
    ],
  },
  {
    icon: Utensils,
    title: "Booking Management",
    sector: "Restaurants, Salons, Beauty studios",
    problem:
      "During the lunch/dinner rush the phone rings, but nobody has time to answer. Bookings are lost every week.",
    solution:
      "The AI answers, checks availability in real time, books tables, sends WhatsApp confirmations and automatic reminders.",
    results: [
      { label: "Extra revenue/month", value: { eu: "€2,500–€5,000", us: "$4,000–$7,000" } },
      { label: "No-show reduction", value: "–15/–25%" },
      { label: "Staff phone time freed", value: "1–2 h/day" },
    ],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Customer Support",
    sector: "Online stores, Dropshipping, Retail",
    problem:
      'After-sales buried in questions: "Where\'s my parcel?" "How do I return it?" "What sizes do you have?"',
    solution:
      "AI that answers over the phone, tracks orders in real time, handles returns and shares product information.",
    results: [
      { label: "Monthly saving", value: { eu: "€1,000–€2,000", us: "$1,500–$3,000" } },
      { label: "Requests resolved automatically", value: "50–70%" },
      { label: "Satisfaction (CSAT)", value: "4.2/5" },
    ],
  },
];

export default function ResultsSection() {
  const [ref, visible] = useReveal();
  const region = useRegion();

  return (
    <section
      ref={ref}
      id="resultados"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-bright-blue/10 blur-[130px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Use cases"
            title={
              <>
                Real results for <Grad>real businesses</Grad>
              </>
            }
            subtitle="Here's how different industries use Automis to cut costs and grow revenue — automatically."
          />
          <p className="mx-auto mt-4 max-w-2xl text-center font-plex-mono text-xs leading-relaxed text-soft-blue/55">
            Estimates for a typical small business, built from published industry
            benchmarks. Results vary with your industry, call volume and contact base.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-6">
          {cases.map((c, index) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className={`av-gradient-border av-reveal group rounded-2xl p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 md:p-8 ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                {/* Header */}
                <div className="mb-6 flex items-start gap-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-bright-blue/15 transition-colors duration-300 group-hover:bg-warm-yellow/15">
                    <Icon
                      className="h-6 w-6 text-bright-blue transition-colors duration-300 group-hover:text-warm-yellow"
                      strokeWidth={2}
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-montserrat text-lg font-bold text-white md:text-xl">
                      {c.title}
                    </h3>
                    <p className="font-plex-mono text-xs uppercase tracking-wide text-soft-blue/60">
                      {c.sector}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {/* Problem + Solution */}
                  <div className="space-y-4">
                    <div className="border-l-2 border-warm-yellow/50 pl-4">
                      <p className="mb-1 font-plex-mono text-xs uppercase tracking-wide text-warm-yellow">
                        The problem
                      </p>
                      <p className="font-open-sans text-sm leading-relaxed text-white/70">
                        {c.problem}
                      </p>
                    </div>
                    <div className="border-l-2 border-bright-blue/60 pl-4">
                      <p className="mb-1 font-plex-mono text-xs uppercase tracking-wide text-bright-blue">
                        The Automis solution
                      </p>
                      <p className="font-open-sans text-sm leading-relaxed text-white/70">
                        {c.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results — vertical ledger so numbers never wrap */}
                  <div className="flex flex-col rounded-xl border border-bright-blue/20 bg-gradient-to-br from-bright-blue/10 to-warm-yellow/5 p-5 sm:p-6">
                    <p className="mb-2 font-plex-mono text-xs uppercase tracking-wide text-soft-blue/70">
                      Estimated results
                    </p>
                    <div className="flex flex-1 flex-col justify-center divide-y divide-white/10">
                      {c.results.map((r) => (
                        <div
                          key={r.label}
                          className="flex items-baseline justify-between gap-4 py-3.5 first:pt-2 last:pb-0"
                        >
                          <span className="font-open-sans text-sm leading-snug text-white/65">
                            {r.label}
                          </span>
                          <span className="whitespace-nowrap font-montserrat text-lg font-extrabold leading-none text-warm-yellow md:text-xl">
                            {money(r.value, region)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
