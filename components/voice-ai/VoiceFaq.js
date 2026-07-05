"use client";
import { useState } from "react";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "So, what is this Voice AI thing all about?",
    a: "Think of Automis Voice AI as a super-smart virtual receptionist for your business. It handles customer calls, books appointments, answers questions, and even makes outbound calls, all while sounding surprisingly human. It is like an extra team member who never sleeps.",
  },
  {
    q: "Can it really understand what customers are saying?",
    a: "Yes. Our Voice AI uses advanced speech tech to understand context, accents, and even industry jargon. It is not just hearing words, it is getting the meaning behind them. So whether your customer has a strong accent or uses a lot of technical terms, the AI has it covered.",
  },
  {
    q: "Will it work with the systems we already use?",
    a: "Absolutely. Voice AI integrates with your CRM, calendar, and other business tools. Our team sets everything up so it fits right into your current workflow, no need to overhaul your entire system.",
  },
  {
    q: "What if the AI gets stumped by a question?",
    a: "While the AI is smart, we know it cannot handle everything. If it hits a question it cannot answer, it smoothly hands the call to a human. Your customers always get the help they need, one way or another.",
  },
  {
    q: "How do we keep track of how well it is doing?",
    a: "You get a full analytics dashboard: call volumes, resolution rates, customer satisfaction, and more. It is a bird's-eye view of your customer interactions that helps you spot trends and areas to improve, with every call recorded, transcribed, and summarized.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="card-gold overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-[1.05rem] font-semibold text-white">{item.q}</span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04]">
          {isOpen ? (
            <Minus className="h-4 w-4 text-[#57C7E3]" strokeWidth={2.4} />
          ) : (
            <Plus className="h-4 w-4 text-[#57C7E3]" strokeWidth={2.4} />
          )}
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-white/60">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function VoiceFaq() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="voice-faq" className="bg-[#000a14]" inner="max-w-3xl">
      <SectionHeading eyebrow="FAQ" title={<>Questions, answered.</>} />
      <div className="mt-12 space-y-3">
        {FAQS.map((item, i) => (
          <Reveal key={item.q} delay={i * 70}>
            <FaqItem item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
