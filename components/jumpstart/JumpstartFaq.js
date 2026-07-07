"use client";
import { useState } from "react";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What's the difference between the free consultation and the paid audit?",
    a: "The free 30-minute consultation is the low-friction first step: a quick call to map your top bottlenecks and see what's possible, with no cost and no obligation. The Jumpstart Audit (€1,450) is the deep dive: two comprehensive audits, a C-suite-ready plan and forecast, and a live Quick-Win automation switched on in 14 days.",
  },
  {
    q: "How fast will we see impact?",
    a: "Within 14 days on the paid audit. By Day 10 you'll have baselines, the leak map, and a prioritized shortlist. On Day 14 we turn on your Quick-Win live, so you leave the final call with something working. Typical early signals: faster speed-to-lead, recovered missed calls, or more responses and appointments from reminders and reactivation, depending on the Quick-Win we install.",
  },
  {
    q: "Do you execute the 90-day plan?",
    a: "Yes, if you want us to. The audit stands on its own: you get the plan, forecasts, and handoff pack. If you'd like our team to implement, we offer a retainer and credit €500 of your audit if you start within 14 days. Either way, your Quick-Win includes 14 days of support so it keeps delivering.",
  },
  {
    q: "What access do you need?",
    a: "Read-only access so we can analyze without changing anything. Ad platforms (Google, Meta, LinkedIn, viewer), CRM (lead statuses, timestamps, outcomes, export or viewer), phone system and call logs (missed calls, basic metrics, recordings optional), and calendar or scheduling (booking and no-show view or API). Plus one point-of-contact for quick questions and approvals. We provide a short checklist at kickoff.",
  },
  {
    q: "Healthcare or compliance? Is my data safe?",
    a: "Yes. We support GDPR-aligned and HIPAA-safe configurations where relevant. We design automations to minimize data exposure, limit retention, and respect safe channels, with options like no recording or redacted transcripts, least-privilege access, and clear consent language. We'll flag what's safe versus not in your stack and share a compliance checklist on request.",
  },
  {
    q: "What if you can't help us?",
    a: "We de-risk it with two safeguards. Fit Guarantee (kickoff): if we learn your data or stack won't let us move core KPIs meaningfully, we refund right away. Clarity Guarantee (final): if our audit doesn't map a data-backed path to 10% lower costs, 5% more bookings, or 10 hours per week saved, we refund the audit. Guarantees require timely read-only access and accurate historical data.",
  },
];

export default function JumpstartFaq() {
  const [open, setOpen] = useState(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq" className="bg-deep-blue" inner="max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SectionHeading eyebrow="FAQ" title={<>Answers before you book</>} />
      <div className="mt-12 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 50}>
              <div className={`overflow-hidden rounded-xl border transition-colors ${isOpen ? "border-[#3C91E6]/30 bg-white/[0.04]" : "border-white/[0.08] bg-white/[0.02]"}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[15.5px] font-semibold text-white">{f.q}</span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-[#8fe0f0] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-white/60">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
