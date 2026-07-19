"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal, GRAD } from "@/components/home/_ui";
import { Search, Wrench, LineChart } from "lucide-react";

const ICONS = [Search, Wrench, LineChart];

const COPY = {
  en: {
    eyebrow: "The process",
    title: "How a build actually goes",
    lead: "Three phases, hands-on from the first call to the monthly optimization. You always know what's happening, and you own what we deliver.",
    steps: [
      {
        step: "Step 1",
        title: "Discover & Diagnose",
        body: "We learn your business before touching a single tool. We map exactly where you lose time and money, then decide together what's worth automating first.",
        meta: "Discovery call + audit",
      },
      {
        step: "Step 2",
        title: "Design, Build & Deploy",
        body: "We design and build your system, and you test it before it goes live. Nothing ships until it works the way your business actually runs.",
        meta: "~7 days for Voice & simple · custom for complex",
      },
      {
        step: "Step 3",
        title: "Launch, Monitor & Optimize",
        body: "We don't disappear after go-live. Continuous monthly improvement with human oversight, so your system gets sharper every month, not stale.",
        meta: "Ongoing, with human-in-the-loop",
      },
    ],
  },
  it: {
    eyebrow: "Il processo",
    title: "Come si svolge davvero un progetto",
    lead: "Tre fasi, sempre al tuo fianco dalla prima call all'ottimizzazione mensile. Sai sempre cosa sta succedendo, e ciò che costruiamo è tuo.",
    steps: [
      {
        step: "Fase 1",
        title: "Analisi e diagnosi",
        body: "Studiamo il tuo business prima di toccare qualsiasi strumento. Mappiamo con precisione dove perdi tempo e denaro, poi decidiamo insieme cosa conviene automatizzare per primo.",
        meta: "Call conoscitiva + audit",
      },
      {
        step: "Fase 2",
        title: "Progettazione, sviluppo e rilascio",
        body: "Progettiamo e costruiamo il tuo sistema, e tu lo provi prima che vada online. Niente viene rilasciato finché non funziona esattamente come lavora il tuo business.",
        meta: "~7 giorni per Voice e casi semplici · su misura per i complessi",
      },
      {
        step: "Fase 3",
        title: "Lancio, monitoraggio e ottimizzazione",
        body: "Non spariamo dopo il lancio. Miglioramento continuo ogni mese con supervisione umana, così il tuo sistema diventa più efficace mese dopo mese, invece di invecchiare.",
        meta: "Continuo, con supervisione umana",
      },
    ],
  },
  pt: {
    eyebrow: "O processo",
    title: "Como decorre de facto um projeto",
    lead: "Três fases, sempre ao seu lado desde a primeira chamada até à otimização mensal. Sabe sempre o que está a acontecer, e o que construímos é seu.",
    steps: [
      {
        step: "Fase 1",
        title: "Descoberta e diagnóstico",
        body: "Conhecemos o seu negócio antes de tocar numa única ferramenta. Mapeamos exatamente onde perde tempo e dinheiro, e decidimos juntos o que vale a pena automatizar primeiro.",
        meta: "Chamada de descoberta + auditoria",
      },
      {
        step: "Fase 2",
        title: "Desenho, construção e lançamento",
        body: "Desenhamos e construímos o seu sistema, e você testa-o antes de entrar em funcionamento. Nada é lançado até funcionar tal como o seu negócio funciona de facto.",
        meta: "~7 dias para Voice e casos simples · à medida para os complexos",
      },
      {
        step: "Fase 3",
        title: "Lançamento, monitorização e otimização",
        body: "Não desaparecemos depois do arranque. Melhoria contínua mês a mês com supervisão humana, para que o seu sistema fique mais afinado a cada mês, em vez de estagnar.",
        meta: "Contínuo, com supervisão humana",
      },
    ],
  },
};

export default function AboutProcess() {
  const locale = usePathname()?.startsWith("/pt")
    ? "pt"
    : usePathname()?.startsWith("/it")
    ? "it"
    : "en";
  const t = COPY[locale];
  return (
    <Section id="process" className="bg-deep-blue">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={s.step} delay={i * 100}>
              <div className="card-gold group flex h-full flex-col items-start rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm hover:-translate-y-1">
                <span
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/10"
                  style={{ background: "rgba(60,145,230,0.10)" }}
                >
                  <Icon className="h-6 w-6 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <span
                  className="mt-6 text-[12px] uppercase tracking-[0.16em]"
                  style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                >
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
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
