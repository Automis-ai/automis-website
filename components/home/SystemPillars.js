"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, GradientText, GRAD } from "./_ui";
import SwipeRow from "./SwipeRow";
import { TrendingUp, Headphones, Database, ArrowUpRight, Check } from "lucide-react";

const PILLARS = [
  {
    n: "01",
    icon: TrendingUp,
    href: null,
    featured: false,
  },
  {
    n: "02",
    icon: Headphones,
    href: "/voice-ai",
    featured: true,
  },
  {
    n: "03",
    icon: Database,
    href: null,
    featured: false,
  },
];

const COPY = {
  en: {
    eyebrow: "One connected system · three pillars",
    titlePre: "We don't sell tools. We build the ",
    titleGrad: "system that runs your business",
    titlePost: ".",
    lead: "Marketing brings people in. Sales makes sure none slip through. Admin turns the whole thing into an operation that scales without more headcount.",
    flagship: "Flagship",
    pillars: [
      {
        kicker: "Marketing & Growth",
        title: "Systems that run your marketing",
        body: "Not another agency running your ads. AI systems that optimize creative and spend across Meta and Google, win visibility in Google and AI search, and keep content flowing on their own.",
        points: ["AI-optimized ads across Meta & Google", "Get found in Google & AI search (SEO / GEO)", "Content & reputation workflows"],
        cta: null,
      },
      {
        kicker: "Sales & Acquisition",
        title: "A front desk that never sleeps",
        body: "The Automis Voice Agent answers every call 24/7. It qualifies, books, and recovers missed calls. Paired with social and WhatsApp automation that turns DMs into qualified leads in your CRM.",
        points: ["24/7 AI Voice Agent, our flagship", "Missed-call recovery + booking", "Social & WhatsApp → qualified CRM leads"],
        cta: "Explore Voice AI",
      },
      {
        kicker: "Admin & Company Brain",
        title: "Your knowledge, finally searchable",
        body: "The hardest part to copy. A custom Second Brain over your company data, OCR that turns paper into searchable data, and voice notes that write themselves into your CRM. The operations layer no competitor can buy off the shelf.",
        points: ["A searchable brain over your data (custom RAG)", "Turn paper & PDFs into data (OCR / vision)", "Voice notes written into your CRM"],
        cta: null,
      },
    ],
  },
  it: {
    eyebrow: "Un unico sistema connesso · tre pilastri",
    titlePre: "Non vendiamo strumenti. Costruiamo il ",
    titleGrad: "sistema che manda avanti il tuo business",
    titlePost: ".",
    lead: "Il marketing porta le persone. Le vendite fanno in modo che nessuno si perda. Le operations trasformano tutto in una macchina che cresce senza dover assumere di più.",
    flagship: "Flagship",
    pillars: [
      {
        kicker: "Marketing & Crescita",
        title: "Sistemi che gestiscono il tuo marketing",
        body: "Non un'altra agenzia che gestisce le tue ads. Sistemi AI che ottimizzano creatività e budget su Meta e Google, conquistano visibilità su Google e nelle ricerche AI, e mantengono i contenuti sempre in movimento, da soli.",
        points: ["Ads ottimizzate dall'AI su Meta e Google", "Fatti trovare su Google e nelle ricerche AI (SEO / GEO)", "Workflow per contenuti e reputazione"],
        cta: null,
      },
      {
        kicker: "Vendite & Acquisizione",
        title: "Un centralino che non dorme mai",
        body: "Il Voice Agent di Automis risponde a ogni chiamata 24/7. Qualifica, prenota e recupera le chiamate perse. Insieme all'automazione su social e WhatsApp che trasforma i DM in lead qualificati nel tuo CRM.",
        points: ["Voice Agent AI 24/7, il nostro fiore all'occhiello", "Recupero chiamate perse + prenotazioni", "Social & WhatsApp → lead qualificati nel CRM"],
        cta: "Scopri Voice AI",
      },
      {
        kicker: "Operations & Company Brain",
        title: "La tua conoscenza, finalmente consultabile",
        body: "La parte più difficile da copiare. Un Second Brain su misura sui dati della tua azienda, OCR che trasforma la carta in dati consultabili, e note vocali che si scrivono da sole nel tuo CRM. Lo strato di operations che nessun concorrente può comprare pronto all'uso.",
        points: ["Un cervello consultabile sui tuoi dati (RAG su misura)", "Trasforma carta e PDF in dati (OCR / vision)", "Note vocali scritte nel tuo CRM"],
        cta: null,
      },
    ],
  },
};

export default function SystemPillars() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  return (
    <Section id="system" className="bg-[#020a12]">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.titlePre}<GradientText>{t.titleGrad}</GradientText>{t.titlePost}</>}
        lead={t.lead}
      />
      <SwipeRow
        className="mt-14"
        gridClassName="lg:grid-cols-3"
        items={PILLARS.map((p, i) => {
          const Icon = p.icon;
          const c = t.pillars[i];
          return (
              <div
                key={p.n}
                className={`card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 backdrop-blur-sm hover:-translate-y-1 ${
                  p.featured
                    ? "border-[#3C91E6]/35 bg-white/[0.05]"
                    : "border-white/[0.08] bg-white/[0.03]"
                }`}
              >
                {p.featured && (
                  <span
                    className="absolute right-5 top-5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#04101c]"
                    style={{ background: GRAD }}
                  >
                    {t.flagship}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <span className="font-plex-mono text-[13px] text-white/30">{p.n}</span>
                </div>
                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{c.kicker}</p>
                <h3 className="font-display mt-2 text-[1.35rem] font-semibold leading-tight text-white">{c.title}</h3>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-white/60">{c.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[14px] text-white/75">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                      {pt}
                    </li>
                  ))}
                </ul>
                {p.href ? (
                  <Link
                    href={p.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-[#8fe0f0]"
                  >
                    {c.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </Link>
                ) : (
                  <div className="mt-6 h-5" />
                )}
              </div>
          );
        })}
      />
    </Section>
  );
}
