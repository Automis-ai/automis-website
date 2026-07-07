"use client";

import {
  Building2,
  CheckCircle2,
  PhoneCall,
  Utensils,
  ShoppingBag,
} from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

/* Figures kept within credible ranges and presented as estimates.
   See the note under the heading — validate against your own client data before publishing. */
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
      { label: "Potential ROI/year", value: "€15,000–€35,000" },
      { label: "Response rate", value: "8–14%" },
      { label: "Time saved/month", value: "15–25 h" },
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
      { label: "Monthly saving", value: "€1,200–€2,000" },
      { label: "Sales efficiency", value: "+30–45%" },
      { label: "Close rate", value: "+12–20%" },
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
      { label: "Monthly saving", value: "€900–€1,500" },
      { label: "Extra appointments", value: "+8–15/month" },
      { label: "Calls handled", value: "70–80%" },
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
      { label: "Extra revenue/month", value: "€1,500–€3,000" },
      { label: "No-show reduction", value: "–20/–30%" },
      { label: "Staff time freed", value: "~30 min/day" },
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
      { label: "Monthly saving", value: "€800–€1,600" },
      { label: "Requests resolved automatically", value: "60–70%" },
      { label: "Satisfaction (CSAT)", value: "4.2/5" },
    ],
  },
];

export default function ResultsSection() {
  const [ref, visible] = useReveal();

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
            Estimated figures based on real cases. Results vary depending on your
            industry, call volume and contact base.
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
                            {r.value}
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
