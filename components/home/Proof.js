"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal, GRAD } from "./_ui";
import { Stethoscope, Landmark, ArrowRight } from "lucide-react";

const COPY = {
  en: {
    cases: [
      {
        client: "Clínica Santa Maria dos Olivais",
        meta: "Dental clinic · Lisbon, PT",
        tag: "Voice AI receptionist",
        result:
          "A voice assistant on the clinic's phone line: 872 calls in seven months, 527 closed without reaching the front desk and 114 appointments booked.",
      },
      {
        client: "ADifesa",
        meta: "Consumer-protection association · Lissone, IT",
        tag: "Meta automation",
        result:
          "Comments and DMs on Facebook and Instagram, handled and qualified: 2,329 conversations in five months and 524 complete records, 8 in 10 of which become clients.",
      },
    ],
    stats: [
      { value: "60%", label: "of the clinic's calls closed without reaching the front desk" },
      { value: "8 in 10", label: "of ADifesa's complete records become clients (their figure)" },
      { value: "47%", label: "of those messages arrive when the office is closed" },
      { value: "~7 days", label: "to launch Voice & simple systems" },
    ],
    readCase: "Read the case study",
    eyebrow: "Proof, not promises",
    title: <>Real businesses. Real systems. Already running.</>,
    lead: "We're a founder-led team building for real businesses. The systems below are live right now.",
    disclaimer:
      "The 60% and 47% are production data from Clínica Santa Maria and ADifesa; the 8 in 10 is reported by ADifesa from their own system. The launch time is a conservative estimate. Your results depend on volume, market, and setup.",
  },
  it: {
    cases: [
      {
        client: "Clínica Santa Maria dos Olivais",
        meta: "Clinica dentale · Lisbona, PT",
        tag: "Segretaria IA",
        result:
          "Un assistente vocale sul telefono della clinica: 872 chiamate in sette mesi, 527 chiuse senza passare dalla segretaria e 114 appuntamenti presi.",
      },
      {
        client: "ADifesa",
        meta: "Associazione di tutela · Lissone, Italia",
        tag: "Automazione Meta",
        result:
          "Commenti e messaggi su Facebook e Instagram, gestiti e qualificati: 2.329 conversazioni in cinque mesi e 524 schede complete, di cui 8 su 10 diventano clienti.",
      },
    ],
    stats: [
      { value: "60%", label: "delle chiamate alla clinica chiuse senza passare dalla segretaria" },
      { value: "8 su 10", label: "delle schede complete di ADifesa diventa cliente (dato loro)" },
      { value: "47%", label: "di quei messaggi arriva quando l'ufficio è chiuso" },
      { value: "~7 giorni", label: "per attivare l'assistente vocale e i sistemi semplici" },
    ],
    readCase: "Leggi il caso studio",
    eyebrow: "I risultati dei nostri clienti",
    title: <>Business veri. Sistemi veri. Già attivi.</>,
    lead: "Siamo un team guidato dai founder che costruisce per business reali. I sistemi qui sotto sono attivi in questo momento.",
    disclaimer:
      "Il 60% e il 47% vengono dai dati di produzione della Clínica Santa Maria e di ADifesa; l'8 su 10 lo dichiara ADifesa, dal suo sistema. Il tempo di attivazione è una stima prudente. I tuoi risultati dipendono dal volume, dal mercato e dalla configurazione.",
  },
  pt: {
    cases: [
      {
        client: "Clínica Santa Maria dos Olivais",
        meta: "Clínica dentária · Lisboa, PT",
        tag: "Rececionista de voz IA",
        result:
          "Um assistente de voz no telefone da clínica: 872 chamadas em sete meses, 527 resolvidas sem passar pela receção e 114 marcações.",
      },
      {
        client: "ADifesa",
        meta: "Associação de defesa do consumidor · Lissone, IT",
        tag: "Automação Meta",
        result:
          "Comentários e mensagens no Facebook e no Instagram, tratados e qualificados: 2.329 conversas em cinco meses e 524 fichas completas, das quais 8 em cada 10 se tornam clientes.",
      },
    ],
    stats: [
      { value: "60%", label: "das chamadas da clínica resolvidas sem passar pela receção" },
      { value: "8 em 10", label: "das fichas completas da ADifesa torna-se cliente (dado deles)" },
      { value: "47%", label: "dessas mensagens chega com o escritório fechado" },
      { value: "~7 dias", label: "para ativar Voice e sistemas simples" },
    ],
    readCase: "Ler o caso de estudo",
    eyebrow: "Provas, não promessas",
    title: <>Negócios reais. Sistemas reais. Já a funcionar.</>,
    lead: "Somos uma equipa liderada pelos founders a construir para negócios reais. Os sistemas abaixo estão ativos neste momento.",
    disclaimer:
      "Os 60% e os 47% vêm dos dados de produção da Clínica Santa Maria e da ADifesa; os 8 em 10 são declarados pela ADifesa, a partir do sistema deles. O tempo de ativação é uma estimativa prudente. Os seus resultados dependem do volume, do mercado e da configuração.",
  },
};

const CASE_ICONS = [Stethoscope, Landmark];
// Le schede portano al caso studio completo: niente citazioni dei clienti finche' non ce ne danno una vera.
const CASE_SLUGS = ["clinica-santa-maria", "adifesa"];
const CASE_LOGOS = [
  "/assets/images/client-logos/clinica-santa-maria.png",
  "/assets/images/client-logos/adifesa.png",
];

// Shows the real client logo on a light chip; falls back to the icon until the
// logo file is dropped into public/assets/images/client-logos/.
function ClientMark({ logo, Icon, name }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    return (
      <span className="flex h-12 items-center justify-center rounded-xl bg-white px-3">
        <img src={logo} alt={name} onError={() => setFailed(true)} className="max-h-8 w-auto object-contain" />
      </span>
    );
  }
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
      <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
    </span>
  );
}

export default function Proof() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const CASES = t.cases.map((c, i) => ({ ...c, icon: CASE_ICONS[i], logo: CASE_LOGOS[i], slug: CASE_SLUGS[i] }));
  const STATS = t.stats;
  return (
    <Section id="proof" className="bg-[#020a12]">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        {CASES.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.client} delay={i * 120}>
              <div className="card-glow group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <ClientMark logo={c.logo} Icon={Icon} name={c.client} />
                  <span className="rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.08] px-3 py-1 text-[11px] font-semibold text-[#8fe0f0]">
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-white">{c.client}</h3>
                <p className="mt-1 text-[13px] text-white/60">{c.meta}</p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/65">{c.result}</p>
                <Link
                  href={`${locale === "en" ? "" : `/${locale}`}/use-cases/${c.slug}`}
                  className="mt-auto flex items-center gap-1.5 border-t border-white/[0.06] pt-5 text-[14px] font-semibold text-[#8fe0f0] transition-colors hover:text-white"
                >
                  {t.readCase}
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#57C7E3] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-display text-[2rem] font-bold leading-none md:text-[2.4rem]"
                style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
              >
                {s.value}
              </p>
              <p className="mt-2.5 text-[12.5px] leading-snug text-white/55">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <p className="mt-4 text-center text-[12px] text-white/50">
          {t.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
