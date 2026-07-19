"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { CalendarCheck2, Users, KanbanSquare, Check, ShieldCheck } from "lucide-react";

// Structural metadata (icon + screenshot). Icons stay identical across locales;
// screenshots are locale-aware (Italian captures live under clean/it).
const TIER_ICONS = [CalendarCheck2, Users, KanbanSquare];
const TIER_SHOTS = {
  en: [
    "/assets/images/dashboard/clean/bookings.png",
    "/assets/images/dashboard/clean/light-crm.png",
    "/assets/images/dashboard/clean/pipeline.png",
  ],
  it: [
    "/assets/images/dashboard/clean/it/bookings.png",
    "/assets/images/dashboard/clean/it/light-crm.png",
    "/assets/images/dashboard/clean/it/pipeline.png",
  ],
  // pt reuses the EN captures until dedicated pt-PT screenshots exist.
  pt: [
    "/assets/images/dashboard/clean/bookings.png",
    "/assets/images/dashboard/clean/light-crm.png",
    "/assets/images/dashboard/clean/pipeline.png",
  ],
};

const COPY = {
  en: {
    eyebrow: "The CRM",
    title: "Three levels of visibility, from booked to closed.",
    lead: "Start with a clean view of your bookings and grow into a full pipeline as your sales operation does.",
    privacy: "Customer names and numbers are blurred for privacy.",
    tiers: [
      {
        kicker: "Level 1",
        title: "Bookings",
        body: "Every appointment the AI booked, in one place. See what is on the calendar without touching a spreadsheet.",
        points: ["Every AI-booked appointment", "Date, time, and contact at a glance", "Synced to your calendar"],
        caption: "Bookings, every AI-booked appointment, with call outcome",
      },
      {
        kicker: "Level 2",
        title: "Light CRM",
        body: "Contacts with the outcome and sentiment of every call, so you know who to follow up with and why.",
        points: ["Contacts + call outcomes", "Sentiment on every interaction", "Follow-up context, ready to act on"],
        caption: "Light CRM, call outcomes and sentiment on every contact",
      },
      {
        kicker: "Level 3",
        title: "Pipeline",
        body: "A full kanban sales board. Drag deals through your stages and watch the AI feed the top of the funnel.",
        points: ["Kanban sales stages", "Deals moved as they progress", "AI keeps the funnel full"],
        caption: "Pipeline, a kanban board the AI keeps feeding from the top",
      },
    ],
  },
  it: {
    eyebrow: "Il CRM",
    title: "Tre livelli di visibilità, dalla prenotazione alla chiusura.",
    lead: "Parti da una vista pulita delle tue prenotazioni e cresci fino a una pipeline completa, man mano che cresce la tua attività di vendita.",
    privacy: "Nomi e numeri dei clienti sono oscurati per privacy.",
    tiers: [
      {
        kicker: "Livello 1",
        title: "Prenotazioni",
        body: "Ogni appuntamento fissato dall'IA, in un unico posto. Vedi cosa c'è in calendario senza toccare un foglio di calcolo.",
        points: ["Ogni appuntamento fissato dall'IA", "Data, ora e contatto a colpo d'occhio", "Sincronizzati con il tuo calendario"],
        caption: "Prenotazioni: ogni appuntamento fissato dall'IA, con l'esito della call",
      },
      {
        kicker: "Livello 2",
        title: "CRM leggero",
        body: "Contatti con l'esito e il sentiment di ogni call, così sai chi ricontattare e perché.",
        points: ["Contatti + esiti delle call", "Sentiment su ogni interazione", "Contesto del follow-up, pronto all'uso"],
        caption: "CRM leggero: esiti delle call e sentiment su ogni contatto",
      },
      {
        kicker: "Livello 3",
        title: "Pipeline",
        body: "Una vera board kanban delle vendite. Trascina le trattative tra le fasi e guarda l'IA riempire la parte alta del funnel.",
        points: ["Fasi di vendita in kanban", "Trattative che avanzano fase dopo fase", "L'IA mantiene il funnel pieno"],
        caption: "Pipeline: una board kanban che l'IA alimenta dall'alto",
      },
    ],
  },
  pt: {
    eyebrow: "O CRM",
    title: "Três níveis de visibilidade, da marcação ao negócio fechado.",
    lead: "Comece com uma vista limpa das suas marcações e cresça até uma pipeline completa, à medida que cresce a sua operação de vendas.",
    privacy: "Nomes e números dos clientes estão desfocados por privacidade.",
    tiers: [
      {
        kicker: "Nível 1",
        title: "Marcações",
        body: "Cada consulta que a IA marcou, num único sítio. Veja o que está na agenda sem tocar numa folha de cálculo.",
        points: ["Cada consulta marcada pela IA", "Data, hora e contacto num relance", "Sincronizadas com a sua agenda"],
        caption: "Marcações: cada consulta marcada pela IA, com o resultado da chamada",
      },
      {
        kicker: "Nível 2",
        title: "CRM leve",
        body: "Contactos com o resultado e o sentimento de cada chamada, para saber quem contactar e porquê.",
        points: ["Contactos + resultados das chamadas", "Sentimento em cada interação", "Contexto de follow-up, pronto a usar"],
        caption: "CRM leve: resultados das chamadas e sentimento em cada contacto",
      },
      {
        kicker: "Nível 3",
        title: "Pipeline",
        body: "Um verdadeiro quadro kanban de vendas. Arraste os negócios pelas fases e veja a IA a alimentar o topo do funnel.",
        points: ["Fases de venda em kanban", "Negócios que avançam fase a fase", "A IA mantém o funnel cheio"],
        caption: "Pipeline: um quadro kanban que a IA alimenta a partir do topo",
      },
    ],
  },
};

// Subtle browser-chrome frame wrapper for a screenshot.
function BrowserFrame({ src, alt }) {
  return (
    <div className="card-glow overflow-hidden rounded-xl border border-white/[0.1] bg-[#0b1622] shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 hidden truncate rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-white/40 sm:block">
          app.automis.ai/dashboard
        </span>
      </div>
      <img src={src} alt={alt} className="block w-full" loading="lazy" />
    </div>
  );
}

export default function CrmTiers() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const shots = TIER_SHOTS[locale];

  return (
    <Section id="voice-crm" className="bg-[#000a14]">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />

      <div className="mt-14 space-y-8 sm:space-y-12">
        {TIER_ICONS.map((Icon, i) => {
          const tier = t.tiers[i];
          const flip = i % 2 === 1;
          return (
            <Reveal key={tier.title} delay={i * 80}>
              <div
                className={`grid grid-cols-1 items-center gap-6 lg:gap-10 ${
                  flip ? "lg:grid-cols-[1.18fr_0.82fr]" : "lg:grid-cols-[0.82fr_1.18fr]"
                }`}
              >
                {/* Text column */}
                <div className={flip ? "lg:order-2" : ""}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{tier.kicker}</p>
                  <h3 className="font-display mt-2 text-[1.5rem] font-semibold leading-tight text-white">{tier.title}</h3>
                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-white/60">{tier.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {tier.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[14px] text-white/75">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Screenshot column */}
                <div className={flip ? "lg:order-1" : ""}>
                  <BrowserFrame src={shots[i]} alt={tier.caption} />
                  <p className="mt-3 text-center text-[13px] text-white/55">{tier.caption}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 flex items-center justify-center gap-1.5 text-[12px] text-white/40">
          <ShieldCheck className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} />
          {t.privacy}
        </p>
      </Reveal>
    </Section>
  );
}
