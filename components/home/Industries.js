"use client";
import { Section, SectionHeading, Reveal } from "./_ui";
import SwipeRow from "./SwipeRow";
import { HeartPulse, Scale, Building2, Store, ShieldCheck } from "lucide-react";

const ICPS = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    sub: "Clinics · dentists · medspas",
    body: "Privacy-first AI that answers and books 24/7 and handles patient intake, so no call goes to voicemail and no chart gets lost.",
    proven: "Proven with Clínica Santa Maria dos Olivais",
  },
  {
    icon: Scale,
    title: "Professional & Financial Services",
    sub: "Lawyers · accountants · finance",
    body: "Instant lead qualification plus a Company Brain over your legal and financial documents, and voice notes written straight into your CRM.",
    proven: "Proven with Adifesa",
  },
  {
    icon: Building2,
    title: "Real Estate",
    sub: "Agencies · brokers",
    body: "24/7 responses to every inquiry and AI that matches buyer requests to the right listings. Speed-to-lead that wins the deal.",
    proven: null,
  },
  {
    icon: Store,
    title: "Local Businesses",
    sub: "Services · retail · trades",
    body: "Stop missing calls and automate the social DMs, with a system that captures every lead while you get on with the work.",
    proven: null,
  },
];

export default function Industries() {
  return (
    <Section id="industries" className="bg-deep-blue">
      <SectionHeading
        eyebrow="Who we build for"
        title={<>Built around your industry, not a template</>}
        lead="Deep, bespoke systems for the sectors we know best, each with its own bottlenecks, compliance needs, and way of winning customers."
      />
      <SwipeRow
        className="mt-14"
        gridClassName="md:grid-cols-2"
        items={ICPS.map((ic, i) => {
          const Icon = ic.icon;
          return (
            <Reveal key={ic.title} delay={i * 90} className="h-full">
              <div className="group flex h-full items-start gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-[#57C7E3]/40">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{ic.title}</h3>
                  <p className="mt-0.5 text-[12.5px] font-medium uppercase tracking-wide text-white/35">{ic.sub}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{ic.body}</p>
                  {ic.proven && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#8fe0f0]">
                      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
                      {ic.proven}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      />
    </Section>
  );
}
