"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, GRAD } from "./_ui";
import SwipeRow from "./SwipeRow";
import { Search, Wrench, LineChart } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "How we work",
    title: "A strategic integrator, not a vendor",
    lead: "We find what's costing you time and money before we build anything. What we deliver belongs to you, with no lock-in.",
    steps: [
      {
        step: "Step 1",
        title: "Discover & Diagnose",
        body: "We learn your business before touching a single tool. We map exactly where you lose time and money, then decide what's worth automating first.",
        meta: "Discovery call + audit",
      },
      {
        step: "Step 2",
        title: "Design, Build & Deploy",
        body: "We build your system and you test it before it goes live. Nothing ships until it works the way your business actually runs.",
        meta: "About 7 days for a simple system, longer for custom builds",
      },
      {
        step: "Step 3",
        title: "Launch, Monitor & Optimize",
        body: "We don't disappear after go-live. Continuous monthly improvement with human oversight, so your system gets sharper every month, not stale.",
        meta: "Ongoing, with a person checking the work",
      },
    ],
  },
  it: {
    eyebrow: "Come lavoriamo",
    title: "Un partner strategico, non un fornitore",
    lead: "Prima di costruire, troviamo cosa ti costa tempo e soldi. Quello che realizziamo è tuo, senza vincoli.",
    steps: [
      {
        step: "Step 1",
        title: "Analisi e diagnosi",
        body: "Prima di mettere mano a qualsiasi strumento, studiamo il tuo business. Individuiamo con precisione dove perdi tempo e soldi, poi decidiamo cosa conviene automatizzare per primo.",
        meta: "Call conoscitiva + audit",
      },
      {
        step: "Step 2",
        title: "Progettiamo, costruiamo e attiviamo",
        body: "Costruiamo il tuo sistema e tu lo provi prima che vada online. Niente parte finché non funziona come lavora davvero la tua attività.",
        meta: "Circa 7 giorni per un sistema semplice, di più se su misura",
      },
      {
        step: "Step 3",
        title: "Lanciamo, monitoriamo e ottimizziamo",
        body: "Dopo il lancio non spariamo. Ogni mese miglioriamo il sistema con supervisione umana, così diventa sempre più preciso invece di restare fermo.",
        meta: "In continuo, con supervisione umana",
      },
    ],
  },
  pt: {
    eyebrow: "Como trabalhamos",
    title: "Um integrador estratégico, não um fornecedor",
    lead: "Antes de construir, descobrimos o que lhe custa tempo e dinheiro. O que entregamos é seu, sem amarras.",
    steps: [
      {
        step: "Passo 1",
        title: "Descobrir & Diagnosticar",
        body: "Conhecemos o seu negócio antes de tocar numa única ferramenta. Mapeamos exatamente onde perde tempo e dinheiro, depois decidimos o que vale a pena automatizar primeiro.",
        meta: "Chamada de descoberta + auditoria",
      },
      {
        step: "Passo 2",
        title: "Desenhar, Construir & Ativar",
        body: "Construímos o seu sistema e só entra em produção depois de o testar. Nada arranca até funcionar como o seu negócio realmente funciona.",
        meta: "Cerca de 7 dias para um sistema simples, mais se for à medida",
      },
      {
        step: "Passo 3",
        title: "Lançar, Monitorizar & Otimizar",
        body: "Não desaparecemos depois do arranque. Melhoria mensal contínua com supervisão humana, para que o seu sistema fique mais afinado todos os meses, em vez de estagnar.",
        meta: "Contínuo, com supervisão humana",
      },
    ],
  },
};

const STEP_ICONS = [Search, Wrench, LineChart];

export default function HowWeWork() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  return (
    <Section id="how" className="bg-deep-blue">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />
      <SwipeRow
        className="mt-14"
        gridClassName="md:grid-cols-3"
        items={t.steps.map((s, i) => {
          const Icon = STEP_ICONS[i];
          return (
              <div key={s.step} className="card-gold group flex h-full flex-col items-start rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm hover:-translate-y-1">
                <span
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/10"
                  style={{ background: "rgba(60,145,230,0.10)" }}
                >
                  <Icon className="h-6 w-6 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <span className="mt-6 font-plex-mono text-[12px] uppercase tracking-[0.16em]" style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                  {s.step}
                </span>
                <h3 className="font-display mt-2 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{s.body}</p>
                <p className="mt-auto pt-4">
                  <span className="inline-block rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[12.5px] font-medium text-white/55">
                    {s.meta}
                  </span>
                </p>
              </div>
          );
        })}
      />
    </Section>
  );
}
