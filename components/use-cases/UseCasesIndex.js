import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import FinalCta from "@/components/home/FinalCta";
import { Section, SectionHeading, Reveal, GRAD } from "@/components/home/_ui";
import ClientMark from "@/components/use-cases/ClientMark";
import { getCases } from "@/components/use-cases/cases";

// UI copy resolved by locale. English values are byte-identical to the
// original inline strings so the rendered EN page is unchanged.
const COPY = {
  en: {
    eyebrow: "Proof, not promises",
    title: <>Real clients. Real AI systems. Already running.</>,
    lead: "We are a two-founder team building for businesses in our own markets first, Portugal and Italy. Here is what we have shipped and what it does for them every day.",
    readCase: "Read the case study",
    disclaimer:
      "Metrics on these pages are conservative estimates based on our deployments. Your results depend on volume, market, and setup.",
  },
  it: {
    eyebrow: "Fatti concreti, non promesse",
    title: <>Clienti veri. Sistemi IA veri. Già attivi.</>,
    lead: "Siamo un team di due founder che costruisce prima di tutto per i business dei nostri mercati, Portogallo e Italia. Ecco cosa abbiamo messo in campo e cosa fa per loro ogni giorno.",
    readCase: "Leggi il caso studio",
    disclaimer:
      "Le metriche di queste pagine sono stime prudenti basate sulle nostre implementazioni. I tuoi risultati dipendono da volume, mercato e configurazione.",
  },
  pt: {
    eyebrow: "Provas, não promessas",
    title: <>Clientes reais. Sistemas de IA reais. Já a funcionar.</>,
    lead: "Somos uma equipa de dois fundadores que constrói, antes de mais, para os negócios dos nossos próprios mercados, Portugal e Itália. Aqui está o que já colocámos no terreno e o que faz por eles todos os dias.",
    readCase: "Ler o caso de estudo",
    disclaimer:
      "As métricas destas páginas são estimativas prudentes baseadas nas nossas implementações. Os seus resultados dependem do volume, do mercado e da configuração.",
  },
};

export default function UseCasesIndex({ locale = "en" }) {
  const t = COPY[locale];
  const cases = getCases(locale);

  return (
    <AutomisEnShell>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-[#000a14] pt-24 md:pt-28" pad="pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[380px] w-[760px] -translate-x-1/2 opacity-50 blur-3xl"
            style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.26), transparent 70%)" }}
          />
        </div>
        <div className="relative z-10">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
          />
        </div>
      </Section>

      {/* Case-study grid */}
      <Section className="bg-[#020a12]" pad="py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 120}>
              <Link
                href={`${locale === "it" ? "/it" : locale === "pt" ? "/pt" : ""}/use-cases/${c.slug}`}
                className="card-glow group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <ClientMark slug={c.slug} logo={c.logo} name={c.client} />
                  <span className="rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.08] px-3 py-1 text-[11px] font-semibold text-[#8fe0f0]">
                    {c.tag}
                  </span>
                </div>
                <h2 className="font-display mt-5 text-xl font-semibold text-white">{c.shortClient}</h2>
                <p className="mt-1 text-[13px] text-white/60">
                  {c.industry} · {c.location}
                </p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/65">{c.summary}</p>
                <span
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold text-[#8fe0f0]"
                  style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                >
                  {t.readCase}
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#57C7E3] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-6 text-center text-[12px] text-white/50">
            {t.disclaimer}
          </p>
        </Reveal>
      </Section>

      <FinalCta />
    </AutomisEnShell>
  );
}
