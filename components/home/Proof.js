"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal, GRAD } from "./_ui";
import { Stethoscope, Landmark, Quote } from "lucide-react";

const COPY = {
  en: {
    cases: [
      {
        client: "Clínica Santa Maria dos Olivais",
        meta: "Dental clinic · Lisbon, PT",
        tag: "Voice AI receptionist",
        result:
          "An AI receptionist that answers inbound calls around the clock, booking check-ups and recovering the after-hours calls that used to hit voicemail.",
        quote: "Patients get answered instantly, day or night, with no missed bookings.",
      },
      {
        client: "Adifesa",
        meta: "Finance · cessione del quinto · IT",
        tag: "Meta automation",
        result:
          "Every comment and DM across Meta answered and qualified automatically, feeding a steady, organized flow of leads to the sales team instead of a noisy inbox.",
        quote: "Leads are captured and qualified before anyone lifts a finger.",
      },
    ],
    stats: [
      { value: "30-50%", label: "of missed calls typically recovered" },
      { value: "<30s", label: "average response to a new lead" },
      { value: "24/7", label: "coverage across nights, weekends, holidays" },
      { value: "~7 days", label: "to launch Voice & simple systems" },
    ],
    eyebrow: "Proof, not promises",
    title: <>Real businesses. Real systems. Already running.</>,
    lead: "We're a founder-led team building for real businesses. The systems below are live right now.",
    disclaimer:
      "Figures are typical, conservative estimates based on our deployments. Your results depend on call volume, market, and setup.",
  },
  it: {
    cases: [
      {
        client: "Clínica Santa Maria dos Olivais",
        meta: "Clinica dentale · Lisbona, PT",
        tag: "Segretaria IA",
        result:
          "Una segretaria IA che risponde alle chiamate 24 ore su 24, fissa le visite e recupera anche le chiamate fuori orario che prima finivano in segreteria.",
        quote: "I pazienti trovano sempre risposta, di giorno e di notte, senza perdere una prenotazione.",
      },
      {
        client: "Adifesa",
        meta: "Finanza · cessione del quinto · Monza, Italia",
        tag: "Automazione Meta",
        result:
          "Ogni commento e messaggio su Meta viene gestito e qualificato in automatico: al team commerciale arriva un flusso di lead costante e ordinato, non più una inbox ingestibile.",
        quote: "I lead vengono raccolti e qualificati prima ancora che qualcuno muova un dito.",
      },
    ],
    stats: [
      { value: "30-50%", label: "delle chiamate perse tipicamente recuperate" },
      { value: "<30s", label: "risposta media a un nuovo lead" },
      { value: "24/7", label: "copertura tra notti, weekend e festivi" },
      { value: "~7 giorni", label: "per attivare l'IA vocale e i sistemi semplici" },
    ],
    eyebrow: "I risultati dei nostri clienti",
    title: <>Business veri. Sistemi veri. Già attivi.</>,
    lead: "Siamo un team guidato dai founder che costruisce per business reali. I sistemi qui sotto sono attivi in questo momento.",
    disclaimer:
      "I dati sono stime tipiche e prudenti basate sui nostri progetti. I tuoi risultati dipendono dal volume di chiamate, dal mercato e dalla configurazione.",
  },
};

const CASE_ICONS = [Stethoscope, Landmark];
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
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const CASES = t.cases.map((c, i) => ({ ...c, icon: CASE_ICONS[i], logo: CASE_LOGOS[i] }));
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
                <div className="mt-auto flex items-start gap-2.5 border-t border-white/[0.06] pt-5">
                  <Quote className="h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2} />
                  <p className="text-[14px] italic text-white/70">{c.quote}</p>
                </div>
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
