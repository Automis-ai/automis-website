"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Card } from "./_ui";
import SwipeRow from "./SwipeRow";
import { PhoneMissed, Timer, FileStack, Brain } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "The cost of doing nothing",
    title: <>The leaks you can&apos;t see cost you the most.</>,
    lead: "Most businesses don't have a marketing problem. They have a system problem. Here's where the money quietly walks out the door.",
    pains: [
      {
        title: "Calls go unanswered",
        body: "30 to 50% of calls to local businesses go to voicemail. Every missed call is a booking your competitor picks up instead.",
      },
      {
        title: "Leads go cold",
        body: "Most businesses take hours to follow up. After the first 5 minutes, the odds of ever converting that lead fall off a cliff.",
      },
      {
        title: "Admin eats the day",
        body: "Your team burns hours every week on data entry, scheduling, and chasing paperwork, instead of serving customers.",
      },
      {
        title: "Knowledge is trapped",
        body: "Critical information lives in inboxes, PDFs, and people's heads, impossible to find the moment you actually need it.",
      },
    ],
  },
  it: {
    eyebrow: "Quanto ti costa non agire",
    title: <>Sono le perdite che non vedi a costarti di più.</>,
    lead: "Quasi nessun business ha un problema di marketing. Ha un problema di sistema. Ed è lì che i soldi se ne vanno, senza che tu te ne accorga.",
    pains: [
      {
        title: "Chiamate che restano senza risposta",
        body: "Dal 30 al 50% delle chiamate a un'attività locale finisce in segreteria. E ogni chiamata persa è un cliente che prenota dal tuo concorrente.",
      },
      {
        title: "Lead che si raffreddano",
        body: "Quasi tutti rispondono dopo ore. Ma passati i primi 5 minuti, le probabilità di chiudere quel lead crollano.",
      },
      {
        title: "La burocrazia ti mangia la giornata",
        body: "Il tuo team perde ore ogni settimana tra dati da inserire, appuntamenti da fissare e scartoffie da rincorrere, invece di occuparsi dei clienti.",
      },
      {
        title: "Le informazioni restano bloccate",
        body: "Ciò che conta è sparso tra email, PDF e la testa delle persone: introvabile proprio quando ti serve.",
      },
    ],
  },
};

const PAIN_ICONS = [PhoneMissed, Timer, FileStack, Brain];

export default function PainPoints() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  return (
    <Section id="pain" className="bg-deep-blue">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
      />
      <SwipeRow
        className="mt-14"
        gridClassName="sm:grid-cols-2 lg:grid-cols-4"
        items={t.pains.map((p, i) => {
          const Icon = PAIN_ICONS[i];
          return (
            <Card key={p.title} className="h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-[#57C7E3]/40">
                <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">{p.body}</p>
            </Card>
          );
        })}
      />
    </Section>
  );
}
