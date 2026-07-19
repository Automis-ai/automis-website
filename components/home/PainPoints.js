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
    title: <>Mentre aspetti, i clienti vanno dal tuo concorrente.</>,
    lead: "Quasi nessun business ha un problema di marketing. Ha un problema di sistema. Ed è lì che i soldi se ne vanno, senza che tu te ne accorga.",
    pains: [
      {
        title: "Chiamate che restano senza risposta",
        body: "Dal 30 al 50% delle chiamate a un'attività locale finisce in segreteria. E ogni chiamata persa è un cliente che prenota dal tuo concorrente.",
      },
      {
        title: "Contatti che si raffreddano",
        body: "Quasi tutti rispondono dopo ore. Ma passati i primi 5 minuti, le probabilità di chiudere quel lead crollano.",
      },
      {
        title: "Ore perse tra pratiche e scartoffie",
        body: "Il tuo team perde ore ogni settimana tra dati da inserire, appuntamenti da fissare e scartoffie da rincorrere, invece di occuparsi dei clienti.",
      },
      {
        title: "Le informazioni restano bloccate",
        body: "Ciò che conta è sparso tra email, PDF e la testa delle persone: introvabile proprio quando ti serve.",
      },
    ],
  },
  pt: {
    eyebrow: "O custo de não fazer nada",
    title: <>As fugas que não vê são as que mais lhe custam.</>,
    lead: "A maioria dos negócios não tem um problema de marketing. Tem um problema de sistema. É aqui que o dinheiro sai pela porta sem que dê por isso.",
    pains: [
      {
        title: "Chamadas que ficam sem resposta",
        body: "Entre 30 e 50% das chamadas para negócios locais vão para o voicemail. Cada chamada perdida é uma marcação que o seu concorrente recebe.",
      },
      {
        title: "Contactos que arrefecem",
        body: "A maioria dos negócios demora horas a responder. Passados os primeiros 5 minutos, a probabilidade de converter esse contacto despenca.",
      },
      {
        title: "A burocracia devora o dia",
        body: "A sua equipa perde horas todas as semanas a inserir dados, a marcar e a correr atrás de papelada, em vez de cuidar dos clientes.",
      },
      {
        title: "O conhecimento fica preso",
        body: "A informação crítica vive em caixas de entrada, PDFs e na cabeça das pessoas, impossível de encontrar no momento em que precisa dela.",
      },
    ],
  },
};

const PAIN_ICONS = [PhoneMissed, Timer, FileStack, Brain];

export default function PainPoints() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
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
