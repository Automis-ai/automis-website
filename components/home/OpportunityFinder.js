"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal, GRAD } from "./_ui";
import CTAButton from "@/components/CTAButton";
import { Sparkles, ArrowRight, ArrowLeft, Check, Clock, TrendingUp, Loader2, Download, Lock } from "lucide-react";
import { FINDER_COPY, hoursLabel } from "./finderCopy";
import { pushEvent } from "@/lib/analytics";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";


export default function OpportunityFinder() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = FINDER_COPY[locale];
  const booking = locale === "it" ? "https://api.leadconnectorhq.com/widget/bookings/automis-it" : BOOKING;
  const QUESTIONS = t.questions;
  const PILLAR_PLAYS = t.pillars;

  const [step, setStep] = useState(0); // 0..5 questions, 6 = email, 7 = roadmap
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState({ loading: false, error: null });

  const total = QUESTIONS.length;
  const inQuestions = step < total;
  const isEmail = step === total;
  const isRoadmap = step === total + 1;
  const progress = Math.min(step, total) / total;

  const pick = (qIndex, optIndex) => {
    const next = { ...answers, [QUESTIONS[qIndex].id]: optIndex };
    setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const computeRoadmap = () => {
    const score = { sales: 0, admin: 0, marketing: 0 };
    let hours = 0;
    QUESTIONS.forEach((qq) => {
      const oi = answers[qq.id];
      if (oi == null) return;
      const opt = qq.options[oi];
      hours += opt.h || 0;
      Object.entries(opt.w || {}).forEach(([k, v]) => (score[k] += v));
    });
    const ranked = Object.entries(score)
      .sort((a, b) => b[1] - a[1])
      .filter(([, v]) => v > 0)
      .map(([k]) => k);
    const primary = ranked[0] || "sales";
    const secondary = ranked[1] && ranked[1] !== primary ? ranked[1] : null;
    // build top 3 plays from primary (+ one from secondary)
    const plays = [...PILLAR_PLAYS[primary].plays];
    if (secondary) plays[2] = PILLAR_PLAYS[secondary].plays[0];
    const hoursLow = Math.max(4, Math.round(hours * 0.8));
    const hoursHigh = Math.round(hours * 1.4);
    return { primary, secondary, plays: plays.slice(0, 3), hoursLow, hoursHigh };
  };

  const sectorLabel = () => {
    const oi = answers[QUESTIONS[0].id];
    return oi != null ? QUESTIONS[0].options[oi].label : "";
  };

  // Link that regenerates this exact personalised roadmap (online access + the
  // copy GHL emails). Encodes first name, sector, pillars, hours, locale.
  const roadmapLink = (roadmap) => {
    const params = new URLSearchParams({
      n: name || "",
      s: sectorLabel(),
      p: roadmap.primary,
      x: roadmap.secondary || "",
      lo: String(roadmap.hoursLow),
      hi: String(roadmap.hoursHigh),
      l: locale,
    });
    const origin = typeof window !== "undefined" ? window.location.origin : "https://automis.ai";
    return `${origin}/roadmap?${params.toString()}`;
  };

  // Re-download the personalised roadmap (used by the "Download again" button).
  const buildPdf = async (roadmap) => {
    try {
      const { generateRoadmapPdf } = await import("./roadmapPdf");
      await generateRoadmapPdf({
        name,
        sector: sectorLabel(),
        primary: roadmap.primary,
        secondary: roadmap.secondary,
        hoursLow: roadmap.hoursLow,
        hoursHigh: roadmap.hoursHigh,
        locale,
      });
    } catch (err) {
      console.error("PDF generation error", err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });
    const roadmap = computeRoadmap();
    const mod = await import("./roadmapPdf");
    // Locale-specific base tag + one of the 6 variant tags, so EN and IT nurture
    // flows stay separate in GHL.
    const tags = [`opportunity-finder-${locale}`, mod.variantTag(roadmap.primary, roadmap.secondary)];
    const roadmapUrl = roadmapLink(roadmap);
    // Lead capture (best-effort). GHL emails the roadmap link + starts nurture.
    try {
      await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          type: "opportunity-finder",
          source: `home-${locale}-opportunity-finder`,
          locale,
          answers: QUESTIONS.reduce((acc, qq) => {
            const oi = answers[qq.id];
            acc[qq.id] = oi != null ? qq.options[oi].label : null;
            return acc;
          }, {}),
          // Ordered, readable Q&A so the API can write it as a GHL contact note.
          answers_detail: QUESTIONS.map((qq) => {
            const oi = answers[qq.id];
            return { q: qq.q, a: oi != null ? qq.options[oi].label : null };
          }),
          recommended_pillar: PILLAR_PLAYS[roadmap.primary].name,
          variant: mod.selectVariant(roadmap.primary, roadmap.secondary),
          tags,
          roadmap_url: roadmapUrl,
          estimated_hours_saved: hoursLabel(roadmap.hoursLow, roadmap.hoursHigh, locale),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Finder capture error", err);
    }
    // Generate + download the personalised PDF instantly (cover + playbook body).
    try {
      await mod.generateRoadmapPdf({
        name,
        sector: sectorLabel(),
        primary: roadmap.primary,
        secondary: roadmap.secondary,
        hoursLow: roadmap.hoursLow,
        hoursHigh: roadmap.hoursHigh,
        locale,
      });
    } catch (err) {
      console.error("PDF generation error", err);
    }
    setStatus({ loading: false, error: null });
    setStep(total + 1);

    // Lead captured + roadmap delivered. Nothing identifying goes in the dataLayer.
    pushEvent("finder_completed", {
      locale,
      sector: sectorLabel(),
      recommended_pillar: PILLAR_PLAYS[roadmap.primary].name,
    });
  };

  const partial = isEmail ? computeRoadmap() : null;
  const roadmap = isRoadmap ? computeRoadmap() : null;

  return (
    <Section id="opportunity-finder" className="bg-deep-blue">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />

      <Reveal delay={80}>
        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-white/[0.1] bg-[#04101c]/70 backdrop-blur-md">
          {/* progress */}
          {!isRoadmap && (
            <div className="border-b border-white/[0.06] px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between text-[12px] text-white/45">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} />
                  {isEmail ? t.yourResults : `${t.question} ${step + 1} ${t.of} ${total}`}
                </span>
                <span className="font-plex-mono">{Math.round((isEmail ? 1 : progress) * 100)}%</span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(isEmail ? 1 : progress) * 100}%`, background: GRAD }}
                />
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Questions */}
            {inQuestions && (
              <div>
                <h3 className="font-display text-xl font-semibold text-white sm:text-[1.4rem]">
                  {QUESTIONS[step].q}
                </h3>
                <div className="mt-6 grid gap-2.5">
                  {QUESTIONS[step].options.map((opt, oi) => {
                    const selected = answers[QUESTIONS[step].id] === oi;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => pick(step, oi)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-[15px] transition-all duration-200 ${
                          selected
                            ? "border-[#3C91E6]/50 bg-[#3C91E6]/[0.12] text-white"
                            : "border-white/[0.1] bg-white/[0.02] text-white/80 hover:border-white/25 hover:bg-white/[0.05]"
                        }`}
                      >
                        {opt.label}
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${selected ? "border-[#57C7E3] bg-[#57C7E3]" : "border-white/20"}`}>
                          {selected && <Check className="h-3 w-3 text-[#04101c]" strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/45 transition-colors hover:text-white/80"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2} /> {t.back}
                  </button>
                )}
              </div>
            )}

            {/* Email capture */}
            {isEmail && partial && (
              <div>
                {/* Partial result — the value is shown BEFORE the email gate */}
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.08] px-3.5 py-1.5 text-[12px] font-semibold text-[#8fe0f0]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> {t.hereIsWhatWeFound}
                  </span>
                  <h3 className="font-display mt-4 text-[1.4rem] font-bold text-white sm:text-[1.55rem]">
                    {t.startWith}{" "}
                    <span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                      {PILLAR_PLAYS[partial.primary].name}
                    </span>
                  </h3>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 text-left">
                    <div className="flex items-center gap-2 text-[#8fe0f0]">
                      <Clock className="h-4 w-4" strokeWidth={2} />
                      <span className="text-[12px] font-semibold uppercase tracking-wide">{t.timeBack}</span>
                    </div>
                    <p className="font-display mt-2 text-[2rem] font-bold text-white">
                      {partial.hoursLow}-{partial.hoursHigh}<span className="text-[1rem] font-medium text-white/45"> {t.hrs}</span>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 text-left">
                    <div className="flex items-center gap-2 text-[#8fe0f0]">
                      <TrendingUp className="h-4 w-4" strokeWidth={2} />
                      <span className="text-[12px] font-semibold uppercase tracking-wide">{t.focusPillar}</span>
                    </div>
                    <p className="font-display mt-2 text-[1.15rem] font-semibold leading-tight text-white">
                      {PILLAR_PLAYS[partial.primary].name}
                      {partial.secondary && <span className="text-white/40"> + {PILLAR_PLAYS[partial.secondary].name.split(" ")[0]}</span>}
                    </p>
                  </div>
                </div>

                <form onSubmit={submit} className="mt-4 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5">
                  <p className="flex items-center gap-2 text-[14px] font-semibold text-white">
                    <Lock className="h-4 w-4 text-[#57C7E3]" strokeWidth={2} />
                    {t.unlockTitle}
                  </p>
                  <p className="mt-1 text-[13px] text-white/55">
                    {t.unlockSubtitle}
                  </p>
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/40 outline-none transition-colors focus:border-[#3C91E6]"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/40 outline-none transition-colors focus:border-[#3C91E6]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                    style={{ background: GRAD }}
                  >
                    {status.loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> {t.buildingRoadmap}</>
                    ) : (
                      <>{t.unlockCta} <ArrowRight className="h-4 w-4" strokeWidth={2.4} /></>
                    )}
                  </button>
                  <p className="mt-3 text-center text-[11.5px] text-white/45">{t.noSpam}</p>
                </form>

                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white/85"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={2} /> {t.back}
                </button>
              </div>
            )}

            {/* Roadmap result */}
            {isRoadmap && roadmap && (
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.08] px-3.5 py-1.5 text-[12px] font-semibold text-[#8fe0f0]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> {t.roadmapReady}
                </span>
                <h3 className="font-display mt-5 text-[1.5rem] font-bold text-white">
                  {t.startWith} <span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{PILLAR_PLAYS[roadmap.primary].name}</span>
                </h3>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 text-left">
                    <div className="flex items-center gap-2 text-[#8fe0f0]">
                      <Clock className="h-4 w-4" strokeWidth={2} />
                      <span className="text-[12px] font-semibold uppercase tracking-wide">{t.timeBack}</span>
                    </div>
                    <p className="font-display mt-2 text-[2rem] font-bold text-white">
                      {roadmap.hoursLow}-{roadmap.hoursHigh}<span className="text-[1rem] font-medium text-white/45"> {t.hrs}</span>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 text-left">
                    <div className="flex items-center gap-2 text-[#8fe0f0]">
                      <TrendingUp className="h-4 w-4" strokeWidth={2} />
                      <span className="text-[12px] font-semibold uppercase tracking-wide">{t.focusPillar}</span>
                    </div>
                    <p className="font-display mt-2 text-[1.15rem] font-semibold leading-tight text-white">
                      {PILLAR_PLAYS[roadmap.primary].name}
                      {roadmap.secondary && <span className="text-white/40"> + {PILLAR_PLAYS[roadmap.secondary].name.split(" ")[0]}</span>}
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 text-left">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">{t.top3Title}</p>
                  <ul className="mt-3 space-y-2.5">
                    {roadmap.plays.map((play) => (
                      <li key={play} className="flex items-start gap-2.5 text-[14.5px] text-white/80">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                        {play}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#57C7E3]/20 bg-[#57C7E3]/[0.06] px-4 py-2.5 text-[13px] text-white/70">
                  <Check className="h-4 w-4 flex-shrink-0 text-[#8fe0f0]" strokeWidth={2.4} />
                  {t.pdfDownloaded}
                </div>

                <p className="mt-3 text-center text-[12.5px] leading-relaxed text-white/60">{t.newsletterNote}</p>
                <p className="mt-1 text-center text-[12px] text-white/45">{t.spamNote}</p>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <CTAButton href={booking} variant="secondary" size="medium" external className="w-full sm:w-auto">
                    {t.buildCta}
                  </CTAButton>
                  <button
                    onClick={() => buildPdf(roadmap)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-[14px] font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Download className="h-4 w-4" strokeWidth={2} /> {t.downloadAgain}
                  </button>
                </div>
                <p className="mt-3 text-[12px] text-white/35">{t.disclaimer}</p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
