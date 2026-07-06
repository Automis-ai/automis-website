"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { getAutomationsData } from "./automationsData";
import { ArrowUpRight, Plus, X, Target, Headphones, TrendingUp, Database } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

// Pillars, in the order the page tells its story (win leads -> grow -> run ops).
const PILLAR_ORDER = ["sales", "marketing", "admin"];
// Icons stay out of COPY (they are components, not copy). Name + blurb come from COPY.
const PILLAR_ICON = { sales: Headphones, marketing: TrendingUp, admin: Database };

// All locale-aware UI copy. EN text is byte-identical to the pre-localization strings.
const COPY = {
  en: {
    pillars: {
      sales: { name: "Sales & Acquisition", blurb: "Answer, qualify, and never miss a lead." },
      marketing: { name: "Marketing & Growth", blurb: "Bring the right customers in, on autopilot." },
      admin: { name: "Admin & Company Brain", blurb: "Take the busywork and knowledge off your team." },
    },
    eyebrow: "Filter to your world",
    title: <>Find the automations that fit you</>,
    lead: "Pick your industry, pick your goal, or combine both to narrow the list. Every card is something we actually build.",
    byIndustry: "By industry",
    allIndustries: "All industries",
    byGoal: "By goal",
    allGoals: "All goals",
    showingPrefix: "Showing ",
    automationSing: "automation",
    automationPlural: "automations",
    clearFilters: "Clear filters",
    problemLabel: "The problem: ",
    automateLabel: "What we automate: ",
    hideDetails: "Hide details",
    seeHow: "See how it works",
    seeLive: "See it live",
    emptyTitle: "No exact match yet",
    emptyBody: "We very likely build this anyway. Clear a filter, or book a call and we will scope it around your business.",
    bookCta: "Book a Discovery Call",
  },
  it: {
    pillars: {
      sales: { name: "Vendite e acquisizione", blurb: "Rispondi, qualifica e non perdere mai un lead." },
      marketing: { name: "Marketing e crescita", blurb: "Porta i clienti giusti, in automatico." },
      admin: { name: "Admin e cervello aziendale", blurb: "Togli al tuo team il lavoro ripetitivo e la gestione delle informazioni." },
    },
    eyebrow: "Filtra sul tuo mondo",
    title: <>Trova le automazioni giuste per te</>,
    lead: "Scegli il tuo settore, scegli il tuo obiettivo, o combinali entrambi per restringere la lista. Ogni card è qualcosa che costruiamo davvero.",
    byIndustry: "Per settore",
    allIndustries: "Tutti i settori",
    byGoal: "Per obiettivo",
    allGoals: "Tutti gli obiettivi",
    showingPrefix: "",
    automationSing: "automazione",
    automationPlural: "automazioni",
    clearFilters: "Rimuovi i filtri",
    problemLabel: "Il problema: ",
    automateLabel: "Cosa automatizziamo: ",
    hideDetails: "Nascondi i dettagli",
    seeHow: "Scopri come funziona",
    seeLive: "Guardala dal vivo",
    emptyTitle: "Nessuna corrispondenza esatta, per ora",
    emptyBody: "Molto probabilmente lo costruiamo comunque. Rimuovi un filtro, oppure prenota una call e lo definiamo intorno al tuo business.",
    bookCta: "Prenota una call",
  },
};

// A single filter pill. Active state uses the signature blue accent.
function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition-all duration-200 ${
        active
          ? "border-[#3C91E6]/50 bg-[#3C91E6]/[0.14] text-white"
          : "border-white/[0.1] bg-white/[0.02] text-white/70 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

// Compact, outcome-first card. Detail (problem + what we automate) is tucked
// behind a "See how it works" toggle so the grid scans cleanly.
function AutomationCard({ item, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-transform hover:-translate-y-1">
      <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-white">{item.title}</h3>

      {/* The payoff, lead with it. No repeated uppercase labels. */}
      <p className="mt-3 flex items-start gap-2.5 text-[14.5px] font-medium leading-relaxed text-white">
        <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F5CD79]" strokeWidth={2} />
        {item.outcome}
      </p>

      {/* Detail, revealed on demand */}
      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4 text-[13.5px] leading-relaxed">
            <p className="text-white/55">
              <span className="font-semibold text-white/75">{t.problemLabel}</span>
              {item.problem}
            </p>
            <p className="text-white/70">
              <span className="font-semibold text-white/85">{t.automateLabel}</span>
              {item.automate}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8fe0f0] transition-colors hover:text-white"
        >
          {open ? t.hideDetails : t.seeHow}
          <Plus className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-45" : ""}`} strokeWidth={2.4} />
        </button>
        {item.liveHref && (
          <Link
            href={item.liveHref}
            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-white/60 transition-colors hover:text-white"
          >
            {item.liveLabel || t.seeLive}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function AutomationsExplorer() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const booking = locale === "it" ? "https://api.leadconnectorhq.com/widget/bookings/automis-it" : BOOKING;
  const { NICHES, GOALS, AUTOMATIONS } = getAutomationsData(locale);

  const [niche, setNiche] = useState("all"); // "all" | niche id
  const [goal, setGoal] = useState("all"); // "all" | goal id

  const filtered = useMemo(() => {
    return AUTOMATIONS.filter((a) => {
      const nicheOk = niche === "all" || a.niches.includes(niche);
      const goalOk = goal === "all" || a.pillar === goal;
      return nicheOk && goalOk;
    });
  }, [niche, goal]);

  // Group the filtered set by pillar so the page reads as three clear sections
  // instead of one long undifferentiated grid.
  const groups = useMemo(
    () =>
      PILLAR_ORDER.map((pid) => ({
        pid,
        items: filtered.filter((a) => a.pillar === pid),
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  const hasFilter = niche !== "all" || goal !== "all";
  const clearAll = () => {
    setNiche("all");
    setGoal("all");
  };

  return (
    <Section id="explorer" className="bg-[#020a12]">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
      />

      {/* Filters */}
      <Reveal delay={80}>
        <div className="mx-auto mt-12 max-w-5xl space-y-6">
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">{t.byIndustry}</p>
            <div className="-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
              <FilterPill active={niche === "all"} onClick={() => setNiche("all")}>{t.allIndustries}</FilterPill>
              {NICHES.map((n) => (
                <FilterPill key={n.id} active={niche === n.id} onClick={() => setNiche(n.id)}>{n.label}</FilterPill>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">{t.byGoal}</p>
            <div className="-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
              <FilterPill active={goal === "all"} onClick={() => setGoal("all")}>{t.allGoals}</FilterPill>
              {GOALS.map((g) => (
                <FilterPill key={g.id} active={goal === g.id} onClick={() => setGoal(g.id)}>{g.label}</FilterPill>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
            <p className="text-[14px] text-white/60">
              {t.showingPrefix}<span className="font-semibold text-white">{filtered.length}</span>{" "}
              {filtered.length === 1 ? t.automationSing : t.automationPlural}
            </p>
            {hasFilter && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.2} /> {t.clearFilters}
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Grouped grid */}
      <div className="mx-auto max-w-6xl">
        {groups.length > 0 ? (
          groups.map((g) => {
            const Icon = PILLAR_ICON[g.pid];
            const meta = t.pillars[g.pid];
            return (
              <div key={g.pid} className="mt-14 first:mt-10">
                <div className="flex items-center gap-3.5 border-b border-white/[0.07] pb-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.3rem] font-semibold leading-tight text-white">{meta.name}</h3>
                    <p className="mt-0.5 text-[13.5px] text-white/50">{meta.blurb}</p>
                  </div>
                  <span className="ml-auto text-[13px] font-medium text-white/45">{g.items.length}</span>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.items.map((item, i) => (
                    <Reveal key={item.id} delay={Math.min(i, 5) * 40}>
                      <AutomationCard item={item} t={t} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/[0.1] bg-white/[0.03] p-8 text-center">
            <p className="font-display text-lg font-semibold text-white">{t.emptyTitle}</p>
            <p className="mt-2 text-[14px] text-white/55">
              {t.emptyBody}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <InteractiveHoverButton href={booking} variant="solid" text={t.bookCta} />
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white/55 transition-colors hover:text-white"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.2} /> {t.clearFilters}
              </button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
