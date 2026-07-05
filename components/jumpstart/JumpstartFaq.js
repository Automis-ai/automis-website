"use client";
import { useState } from "react";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How long is the AI Audit, and what does it cost?",
    a: "It's a free 30-minute call with no commitment. You leave with a map of where your business leaks time and money and a ranked shortlist of the automations that would fix it — whether or not we ever work together.",
  },
  {
    q: "How fast will I see value?",
    a: "Right away. By the end of the 30 minutes you'll have a clear view of your biggest bottleneck and the highest-ROI ways to solve it. Common early wins we spot: faster speed-to-lead, recovered missed calls, and follow-up that stops falling through the cracks.",
  },
  {
    q: "Do I have to buy anything after?",
    a: "No. The audit stands on its own — take the plan and run with it yourself if you like. If you'd rather we build the fixes, we'll scope that separately after the call. There's zero obligation to continue.",
  },
  {
    q: "What access do you need?",
    a: "For a first audit, usually nothing but a conversation. If we go deeper, we only ever ask for read-only access (ad platforms, CRM, call logs, calendar) so we can analyze without changing anything in your accounts.",
  },
  {
    q: "Is my data safe? What about healthcare and GDPR?",
    a: "Yes. We're privacy-first by design, with EU / local server options and human-in-the-loop routing for anything sensitive. For healthcare we design around minimizing data exposure and respecting safe channels, and we'll flag what's safe versus not in your stack.",
  },
  {
    q: "What if you can't help us?",
    a: "We'll tell you straight. If the audit shows there isn't a meaningful win to be had, we'll say so on the call — better to save you the time than sell you a build you don't need.",
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
    <Section id="faq" className="bg-[#020a12]" inner="max-w-3xl">
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
