"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading, Grad } from "./_ui";

const faqs = [
  {
    question: "Does the AI sound robotic?",
    answer:
      "No. We use the most advanced text-to-speech technology with natural English voices, realistic pauses and emotional expression. Many customers don't realise they're talking to an AI.",
  },
  {
    question: "How long does it take to set up the system?",
    answer:
      "72 hours. Our team runs a guided onboarding: we gather the information, build the scripts, test with your team and launch.",
  },
  {
    question: "Can I integrate it with my current CRM?",
    answer:
      "Yes. We have native integrations with HubSpot, Salesforce, Zoho, Pipedrive, Monday and other popular business tools. An API is available for custom software.",
  },
  {
    question: "What happens if the AI doesn't understand a question?",
    answer:
      "The AI is trained to handle complex questions too. If it hits a request it can't resolve, it transfers the call to your team or takes a message and sends an instant notification.",
  },
  {
    question: "Is it GDPR compliant?",
    answer:
      "Absolutely. EU servers, end-to-end encryption, automatic consent capture and the right to erasure built in. We provide full documentation for your data protection officer.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on the complexity of your specific case. Book a call for a quote tailored to your business.",
  },
  {
    question: "Can the AI call my leads, or only answer?",
    answer:
      "Both. The AI can make outbound calls (lead re-activation, follow-ups, appointment reminders) and answer inbound calls. You choose the flow you prefer.",
  },
  {
    question: "Does it work for my industry?",
    answer:
      "We work with real estate, automotive, e-commerce, professional services, hospitality, healthcare, recruiting, SaaS, logistics and more. Get in touch for specific case studies.",
  },
  {
    question: "Can I customise the conversation script?",
    answer:
      "Yes, completely. During onboarding we define the tone of voice, the questions to ask, the answers to FAQs and when to transfer to a human. It's YOUR assistant.",
  },
  {
    question: "What does support include?",
    answer:
      "Support via email, chat and phone. A dedicated account manager for Business and Enterprise plans. Monthly script optimisation included.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-bright-blue/8 blur-[130px]" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="Questions"
          title={
            <>
              Frequently asked <Grad>questions</Grad>
            </>
          }
          subtitle="Everything you need to know before getting started with Automis."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={index}
                className="av-gradient-border overflow-hidden rounded-xl backdrop-blur-md"
              >
                <button
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="font-plex-mono text-xs text-bright-blue/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-montserrat text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-bright-blue transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[3.25rem] font-open-sans text-[0.95rem] leading-relaxed text-white/65">
                      {faq.answer}
                    </p>
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
