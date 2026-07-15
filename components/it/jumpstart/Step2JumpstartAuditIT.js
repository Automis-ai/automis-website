"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import {
  BarChart3,
  Brain,
  Check,
  Gift,
  Zap,
  Calendar,
  LineChart,
  Shield,
  Award,
  Rocket,
  Activity,
  Target,
  Users,
  Settings,
  CalendarClock,
  Search,
} from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/automis-it";

/* I due audit completi, ripresi fedelmente dall'offerta. */
const AUDITS = [
  {
    icon: BarChart3,
    kicker: "Audit 1",
    title: "Audit delle Performance Marketing",
    items: [
      {
        h: "Individuiamo e correggiamo gli sprechi",
        p: "Decisioni chiare su cosa fermare, ottimizzare e scalare su Google, Meta e LinkedIn.",
      },
      {
        h: "Targeting e funnel più efficaci",
        p: "Ottimizzazioni su pubblico, offerta e landing per aumentare le conversioni.",
      },
      {
        h: "Tracking che dice la verità",
        p: "Correzioni semplici all'attribuzione per decisioni davvero basate sui dati.",
      },
    ],
    deliverables:
      "Scorecard per canale, note su targeting e creatività, checklist di tracking, Top 3 raccomandazioni.",
  },
  {
    icon: Brain,
    kicker: "Audit 2",
    title: "Audit delle Operazioni IA",
    items: [
      {
        h: "Vediamo le perdite",
        p: "Mappiamo l'intero flusso contatto-prenotazione (speed-to-lead, chiamate perse, follow-up, no-show).",
      },
      {
        h: "Opportunità ad alto ROI",
        p: "Una shortlist prioritaria e breve di automazioni che fanno la differenza.",
      },
      {
        h: "Sicuro da attivare",
        p: "Note pratiche su privacy e compliance dove serve (per esempio healthcare).",
      },
    ],
    deliverables:
      "Mappa dei flussi, shortlist opportunità (impatto vs sforzo), linee guida di implementazione.",
  },
];

/* Deliverable pronti per il management. */
const DELIVERABLES = [
  {
    icon: LineChart,
    title: "Previsione Money Slide",
    body: "Proiezioni chiare su riduzione CPL/CPA e ore risparmiate, così la leadership vede l'impatto in euro.",
  },
  {
    icon: Calendar,
    title: "Piano d'Azione 90 Giorni",
    body: "Un rollout settimana per settimana con responsabili e milestone, pronto da consegnare al tuo team domani.",
  },
  {
    icon: Award,
    title: "Pacchetto Board-Ready",
    body: "Risultati, previsioni e piano confezionati e rifiniti per il management. Presentazione pronta.",
  },
];

/* 3 bonus, 1.850 euro di valore, gratis. */
const BONUSES = [
  {
    icon: Zap,
    value: "750 euro di valore",
    title: "Implementazione Veloce",
    tag: "Chiavi in mano",
    body: "Costruiamo e attiviamo un'automazione su misura, allineata al tuo problema principale. Setup live con 14 giorni di supporto.",
    gold: true,
  },
  {
    icon: Calendar,
    value: "600 euro di valore",
    title: "Piano d'Azione 90 Giorni",
    tag: "Roadmap step-by-step",
    body: "Un rollout semplice da consegnare al tuo team domani: cosa fare prima, dopo e poi, con responsabili e milestone.",
    gold: false,
  },
  {
    icon: LineChart,
    value: "500 euro di valore",
    title: "Previsione Money Slide",
    tag: "Pronta per il management",
    body: "Proiezioni chiare su riduzione CPL/CPA e ore risparmiate, così la leadership vede l'impatto economico reale.",
    gold: true,
  },
];

/* Le due garanzie, condizioni riprese fedelmente. */
const CLARITY_OUTCOMES = [
  "Riduzione dei costi di acquisizione del 10% o più",
  "Aumento delle prenotazioni del 5% o più",
  "10 o più ore a settimana risparmiate",
];

/* Aspettative oneste: cosa comprende davvero l'audit approfondito. */
const INVOLVES = [
  {
    icon: Users,
    title: "Intervistiamo il tuo team",
    body: "Parliamo con chi gestisce marketing, vendite e operazioni, così il piano si adatta a come lavora davvero la tua attività.",
  },
  {
    icon: Shield,
    title: "Scaviamo nei tuoi numeri reali",
    body: "Accesso in sola lettura ad ads, CRM e call log per lavorare sui tuoi dati veri. Nulla cambia nei tuoi account.",
  },
  {
    icon: CalendarClock,
    title: "Circa due settimane per un piano vero",
    body: "Un'analisi seria richiede tempo. In circa due settimane trasformiamo ciò che troviamo in un piano chiaro e basato sui dati.",
  },
];

/* Timeline di 14 giorni, giorno per giorno, ripresa fedelmente. */
const TIMELINE = [
  {
    day: "Giorno 0-1",
    icon: Rocket,
    title: "Kickoff (obiettivi e accessi)",
    body: "Allineamento su obiettivi e KPI; conferma di ICP, offerte e criteri di successo. Raccogliamo gli accessi in sola lettura e inviamo un riepilogo call più una checklist di ciò che manca.",
  },
  {
    day: "Giorno 1-3",
    icon: BarChart3,
    title: "Raccolta dati e baseline",
    body: "Estraiamo i numeri reali: contatti, CPL/CPA, speed-to-lead, percentuale chiamate perse, show-rate, close-rate e LTV. Individuiamo eventuali gap di tracking.",
  },
  {
    day: "Giorno 3-5",
    icon: Activity,
    title: "Mappatura funnel e punti critici",
    body: "Mappiamo il flusso contatto-prenotazione (ads, acquisizione contatti, contatto, prenotazione, follow-up). Evidenziamo le perdite: risposta lenta, chiamate perse, passaggi manuali, rischio no-show.",
  },
  {
    day: "Giorno 6-9",
    icon: Target,
    title: "Shortlist opportunità (impatto vs sforzo)",
    body: "Selezioniamo 3-6 azioni ad alto ROI (marketing e IA) e le ordiniamo per impatto e sforzo. Fix pratici su targeting, creatività, landing e tracking; più automazioni operative.",
  },
  {
    day: "Giorno 10",
    icon: Users,
    title: "Allineamento di metà audit (30-45 min)",
    body: "Rivediamo la mappa dei flussi e la shortlist. Validiamo le priorità col tuo team e scegliamo insieme il quick win da implementare. Via libera su ciò che conta, senza supposizioni.",
  },
  {
    day: "Giorno 10-12",
    icon: Settings,
    title: "Creazione e test del quick win",
    body: "Configuriamo l'implementazione veloce concordata e la testiamo end-to-end sulla tua struttura.",
  },
  {
    day: "Giorno 12-13",
    icon: LineChart,
    title: "Previsioni e piano 90 giorni",
    body: "Modelliamo risparmi e aumento attesi più il payback; prepariamo la Previsione Money Slide. Creiamo un Piano d'Azione 90 Giorni settimana per settimana con responsabili e milestone.",
  },
  {
    day: "Giorno 14",
    icon: Award,
    title: "Presentazione finale, attivazione live",
    body: "Presentiamo i risultati, confermiamo il piano e attiviamo il quick win in live. Se vuoi che eseguiamo il piano 90 giorni, applichiamo un credito di 500 euro.",
  },
];

export default function Step2JumpstartAuditIT() {
  return (
    <Section id="step-2" className="bg-deep-blue" inner="max-w-6xl">
      {/* Badge tappa + heading */}
      <div className="mx-auto mb-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
          <Search className="h-3.5 w-3.5" strokeWidth={2.2} />
          Tappa 2 &middot; Il passo serio successivo
        </span>
      </div>

      <SectionHeading
        title={<><GradientText>Jumpstart Audit</GradientText></>}
        lead="Questa è l'analisi profonda, non una call veloce. In circa due settimane intervistiamo il tuo team, analizziamo funnel e spesa pubblicitaria e trasformiamo ciò che troviamo in due audit completi più un piano su cui agire. Nessuna supposizione, nessun template generico."
      />

      {/* Aspettative oneste: cosa comprende l'audit */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {INVOLVES.map((v, i) => {
          const Icon = v.icon;
          const cardClass = i % 2 === 0 ? "card-glow" : "card-gold";
          return (
            <Reveal key={v.title} delay={i * 70}>
              <div className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:-translate-y-1`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-[1.1rem] font-semibold leading-tight text-white">{v.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/60">{v.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* I due audit completi */}
      <h3 className="font-display mt-20 text-center text-[1.5rem] font-semibold text-white sm:text-[1.8rem]">
        Cosa ti porti a casa
      </h3>
      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {AUDITS.map((a, i) => {
          const Icon = a.icon;
          const cardClass = i % 2 === 0 ? "card-gold" : "card-glow";
          return (
            <Reveal key={a.title} delay={i * 80}>
              <div
                className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{a.kicker}</p>
                    <h3 className="font-display text-[1.3rem] font-semibold leading-tight text-white">{a.title}</h3>
                  </div>
                </div>
                <ul className="mt-6 space-y-4">
                  {a.items.map((it) => (
                    <li key={it.h} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                      <span>
                        <span className="block text-[15px] font-semibold text-white">{it.h}</span>
                        <span className="mt-0.5 block text-[14px] leading-relaxed text-white/60">{it.p}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Deliverable</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/70">{a.deliverables}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Deliverable pronti per il management */}
      <Reveal>
        <h3 className="font-display mt-20 text-center text-[1.5rem] font-semibold text-white sm:text-[1.8rem]">
          Più i <GradientText>deliverable pronti per il management</GradientText>
        </h3>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {DELIVERABLES.map((d, i) => {
          const Icon = d.icon;
          const cardClass = i % 2 === 0 ? "card-gold" : "card-glow";
          return (
            <Reveal key={d.title} delay={i * 70}>
              <div
                className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h4 className="font-display mt-6 text-[1.2rem] font-semibold leading-tight text-white">{d.title}</h4>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">{d.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Prezzo + credito 500 euro + scarsità + CTA */}
      <div className="mt-24">
        <Reveal>
          <div className="card-glow relative overflow-hidden rounded-3xl border border-[#FEC458]/25 bg-white/[0.03] p-8 text-center backdrop-blur-sm sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(254,196,88,0.10), transparent 70%)" }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
                <CalendarClock className="h-3.5 w-3.5" strokeWidth={2.2} />
                Solo 5 audit disponibili ogni mese
              </span>

              <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.16em] text-white/45">Il tuo investimento</p>
              <div className="mt-3 flex flex-col items-center justify-center gap-2">
                <span className="font-display text-[1.6rem] font-semibold leading-none text-white/40 line-through sm:text-[2rem]">
                  &euro;3.300
                </span>
                <span className="font-display text-[3.4rem] font-bold leading-none tracking-[-0.03em] text-[#FEC458] sm:text-[4.2rem]">
                  &euro;1.450
                </span>
              </div>

              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#57C7E3]/20 bg-[#57C7E3]/[0.05] p-5">
                <p className="text-[15px] leading-relaxed text-white/80">
                  Avvia l&apos;implementazione entro 14 giorni e applichiamo un{" "}
                  <span className="font-semibold text-[#57C7E3]">credito di 500 euro</span> sull&apos;implementazione.
                </p>
              </div>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <InteractiveHoverButton href={BOOKING} target="_blank" rel="noopener noreferrer" variant="solid" text="Richiedi Jumpstart Audit" />
                <InteractiveHoverButton href="#book" variant="ghost" text="Prima una call gratuita" />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/55">
                <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.2} /> Garanzie di Idoneità e Chiarezza</span>
                <span className="inline-flex items-center gap-1.5"><Gift className="h-3.5 w-3.5 text-[#FEC458]" strokeWidth={2.2} /> 1.850 euro di bonus</span>
                <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.2} /> Quick win live in 14 giorni</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bonus: 1.850 euro di valore, gratis */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
              <Gift className="h-3.5 w-3.5" strokeWidth={2.2} />
              Bonus (inclusi)
            </span>
            <h3 className="font-display mt-5 text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              <span className="text-[#FEC458]">1.850 euro</span> di valore, gratis
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              Tre bonus inclusi in ogni audit, così esci con qualcosa che già funziona, non solo un documento.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {BONUSES.map((b, i) => {
            const Icon = b.icon;
            const cardClass = i % 2 === 0 ? "card-glow" : "card-gold";
            return (
              <Reveal key={b.title} delay={i * 70}>
                <div
                  className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                        b.gold ? "border-[#FEC458]/25 bg-[#FEC458]/[0.08]" : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${b.gold ? "text-[#FEC458]" : "text-[#8fe0f0]"}`} strokeWidth={1.8} />
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                        b.gold ? "bg-[#FEC458]/10 text-[#FEC458]" : "bg-[#3C91E6]/12 text-[#57C7E3]"
                      }`}
                    >
                      {b.value}
                    </span>
                  </div>
                  <h4 className="font-display mt-6 text-[1.2rem] font-semibold leading-tight text-white">{b.title}</h4>
                  <p className={`mt-1.5 text-[13px] font-semibold ${b.gold ? "text-[#FEC458]" : "text-[#57C7E3]"}`}>{b.tag}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/60">{b.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Le due garanzie */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              Due <GradientText>garanzie senza rischio</GradientText>
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              Ci mettiamo la faccia. Due checkpoint, due modi per riavere i tuoi soldi.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Garanzia di Idoneità (kickoff) */}
          <Reveal>
            <div className="card-glow group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Shield className="h-5 w-5 text-[#57C7E3]" strokeWidth={1.8} />
                </span>
                <div>
                  <h4 className="font-display text-[1.3rem] font-semibold text-white">Garanzia di Idoneità</h4>
                  <p className="text-[13px] font-semibold text-[#57C7E3]">Verificata al kickoff</p>
                </div>
              </div>
              <p className="mt-6 text-[14.5px] leading-relaxed text-white/70">
                Se al kickoff scopriamo che i tuoi dati o il tuo stack non ci permettono di muovere i KPI
                principali in modo significativo, rimborsiamo subito. Nessuna settimana sprecata, nessun rischio per te.
              </p>
            </div>
          </Reveal>

          {/* Garanzia di Chiarezza (finale) */}
          <Reveal delay={100}>
            <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-[#FEC458]/25 bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FEC458]/25 bg-[#FEC458]/[0.08]">
                  <Award className="h-5 w-5 text-[#FEC458]" strokeWidth={1.8} />
                </span>
                <div>
                  <h4 className="font-display text-[1.3rem] font-semibold text-white">Garanzia di Chiarezza</h4>
                  <p className="text-[13px] font-semibold text-[#FEC458]">Verificata alla call finale</p>
                </div>
              </div>
              <p className="mt-6 text-[14.5px] leading-relaxed text-white/70">
                Se l&apos;audit non traccia un percorso basato sui dati verso almeno uno di questi risultati, rimborsiamo il 100%:
              </p>
              <ul className="mt-5 space-y-3">
                {CLARITY_OUTCOMES.map((o) => (
                  <li key={o} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FEC458]/12">
                      <Check className="h-3.5 w-3.5 text-[#FEC458]" strokeWidth={3} />
                    </span>
                    <span className="text-[14.5px] text-white">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-6 text-center text-[13px] text-white/45">
            Le garanzie richiedono accessi tempestivi in sola lettura e dati storici accurati.
          </p>
        </Reveal>
      </div>

      {/* Timeline 14 giorni */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              Dal kickoff al live in <GradientText>14 giorni</GradientText>
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              Un percorso chiaro giorno per giorno. Chiudi la call finale con un&apos;automazione quick win attivata in live.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-14">
          {/* binario verticale su md+ */}
          <div
            className="pointer-events-none absolute left-[19px] top-2 bottom-2 hidden w-px md:block"
            style={{ background: "linear-gradient(to bottom, rgba(254,196,88,0.4), rgba(60,145,230,0.4), rgba(254,196,88,0.4))" }}
          />
          <ol className="space-y-4">
            {TIMELINE.map((t, i) => {
              const Icon = t.icon;
              const cardClass = i % 2 === 0 ? "card-gold" : "card-glow";
              return (
                <Reveal key={t.day} delay={i * 40} as="li">
                  <div className="relative flex gap-5">
                    <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0b1622]">
                      <Icon className="h-4 w-4 text-[#8fe0f0]" strokeWidth={1.9} />
                    </span>
                    <div
                      className={`${cardClass} group relative w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5`}
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#FEC458]">{t.day}</span>
                        <h4 className="font-display text-[1.05rem] font-semibold text-white">{t.title}</h4>
                      </div>
                      <p className="mt-2 text-[14px] leading-relaxed text-white/60">{t.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>

    </Section>
  );
}
