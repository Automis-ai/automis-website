"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Section, SectionHeading, Reveal, GRAD } from "@/components/home/_ui";
import { NICHES, GOALS, GOAL_BY_ID, AUTOMATIONS } from "./automationsData";
import { ArrowUpRight, AlertCircle, Wrench, Target, X } from "lucide-react";

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

// One automation card. Alternates card-gold / card-glow via the `variant` prop.
function AutomationCard({ item, variant }) {
  const goal = GOAL_BY_ID[item.pillar];
  const effect = variant === "glow" ? "card-glow" : "card-gold";
  return (
    <div
      className={`${effect} group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-transform hover:-translate-y-1`}
    >
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#57C7E3]">
        {goal?.pillar}
      </span>

      <h3 className="font-display mt-4 text-[1.25rem] font-semibold leading-tight text-white">
        {item.title}
      </h3>

      <dl className="mt-4 space-y-3.5 text-[14px] leading-relaxed">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={2} />
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/40">Problem</dt>
            <dd className="mt-0.5 text-white/65">{item.problem}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Wrench className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#8fe0f0]" strokeWidth={2} />
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/40">What we automate</dt>
            <dd className="mt-0.5 text-white/80">{item.automate}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F5CD79]" strokeWidth={2} />
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/40">Outcome</dt>
            <dd className="mt-0.5 font-medium text-white">{item.outcome}</dd>
          </div>
        </div>
      </dl>

      {item.liveHref && (
        <Link
          href={item.liveHref}
          className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#8fe0f0] transition-colors hover:text-white"
        >
          {item.liveLabel || "See it live"}
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </Link>
      )}
    </div>
  );
}

export default function AutomationsExplorer() {
  const [niche, setNiche] = useState("all"); // "all" | niche id
  const [goal, setGoal] = useState("all"); // "all" | goal id

  const filtered = useMemo(() => {
    return AUTOMATIONS.filter((a) => {
      const nicheOk = niche === "all" || a.niches.includes(niche);
      const goalOk = goal === "all" || a.pillar === goal;
      return nicheOk && goalOk;
    });
  }, [niche, goal]);

  const hasFilter = niche !== "all" || goal !== "all";
  const clearAll = () => {
    setNiche("all");
    setGoal("all");
  };

  return (
    <Section id="explorer" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="Filter to your world"
        title={<>Find the automations that fit you</>}
        lead="Pick your industry, pick your goal, or combine both to narrow the list. Every card is something we actually build."
      />

      {/* Filters */}
      <Reveal delay={80}>
        <div className="mx-auto mt-12 max-w-5xl space-y-6">
          {/* By niche */}
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45">
              By industry
            </p>
            <div className="-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
              <FilterPill active={niche === "all"} onClick={() => setNiche("all")}>
                All industries
              </FilterPill>
              {NICHES.map((n) => (
                <FilterPill key={n.id} active={niche === n.id} onClick={() => setNiche(n.id)}>
                  {n.label}
                </FilterPill>
              ))}
            </div>
          </div>

          {/* By goal */}
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45">
              By goal
            </p>
            <div className="-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
              <FilterPill active={goal === "all"} onClick={() => setGoal("all")}>
                All goals
              </FilterPill>
              {GOALS.map((g) => (
                <FilterPill key={g.id} active={goal === g.id} onClick={() => setGoal(g.id)}>
                  {g.label}
                </FilterPill>
              ))}
            </div>
          </div>

          {/* Count + clear */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
            <p className="text-[14px] text-white/60">
              Showing{" "}
              <span className="font-semibold text-white">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "automation" : "automations"}
            </p>
            {hasFilter && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.2} /> Clear filters
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Grid */}
      <div className="mx-auto mt-10 max-w-6xl">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i, 6) * 50}>
                <AutomationCard item={item} variant={i % 2 === 0 ? "gold" : "glow"} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-white/[0.1] bg-white/[0.03] p-8 text-center">
            <p className="font-display text-lg font-semibold text-white">No exact match yet</p>
            <p className="mt-2 text-[14px] text-white/55">
              We very likely build this anyway. Clear a filter, or book a call and we will scope it
              around your business.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5"
              style={{ background: GRAD }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
