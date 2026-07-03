"use client";
import { useState } from "react";
import { Section, SectionHeading, Reveal, GRAD } from "./_ui";
import CTAButton from "@/components/CTAButton";
import { Sparkles, ArrowRight, ArrowLeft, Check, Clock, TrendingUp, Loader2, Download } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

// 6 questions. Each option carries scoring weights toward the 3 pillars + an
// estimated weekly hours-saved contribution, so the roadmap feels personalised.
const QUESTIONS = [
  {
    id: "sector",
    q: "What kind of business do you run?",
    options: [
      { label: "Healthcare / clinic", w: { sales: 2, admin: 2 }, h: 6 },
      { label: "Professional / financial services", w: { sales: 2, admin: 3 }, h: 7 },
      { label: "Real estate", w: { sales: 3, marketing: 1 }, h: 5 },
      { label: "Local business / services", w: { sales: 2, marketing: 1 }, h: 4 },
    ],
  },
  {
    id: "leak",
    q: "Where do you lose the most time or money?",
    options: [
      { label: "Missed & unanswered calls", w: { sales: 3 }, h: 6 },
      { label: "Slow lead follow-up", w: { sales: 2, marketing: 1 }, h: 5 },
      { label: "Manual admin & paperwork", w: { admin: 3 }, h: 8 },
      { label: "Marketing that doesn't convert", w: { marketing: 3 }, h: 4 },
      { label: "Scattered company knowledge", w: { admin: 3 }, h: 6 },
    ],
  },
  {
    id: "channel",
    q: "How do customers usually reach you?",
    options: [
      { label: "Phone calls", w: { sales: 3 }, h: 5 },
      { label: "Web forms", w: { sales: 1, marketing: 2 }, h: 3 },
      { label: "Social & WhatsApp", w: { sales: 2, marketing: 1 }, h: 4 },
      { label: "A mix of everything", w: { sales: 2, marketing: 1, admin: 1 }, h: 5 },
    ],
  },
  {
    id: "volume",
    q: "How many leads or inquiries do you get per week?",
    options: [
      { label: "Under 20", w: {}, h: 2 },
      { label: "20 to 100", w: {}, h: 4 },
      { label: "100 to 500", w: {}, h: 7 },
      { label: "500+", w: {}, h: 10 },
    ],
  },
  {
    id: "tried",
    q: "What have you tried so far?",
    options: [
      { label: "Nothing yet", w: {}, h: 3 },
      { label: "Hired more staff", w: { admin: 1 }, h: 4 },
      { label: "Basic tools / a chatbot", w: { sales: 1 }, h: 2 },
      { label: "Worked with an agency", w: { marketing: 1 }, h: 2 },
    ],
  },
  {
    id: "goal",
    q: "What's your #1 goal for the next 90 days?",
    options: [
      { label: "More booked appointments", w: { sales: 3 }, h: 6 },
      { label: "Faster response to leads", w: { sales: 2, marketing: 1 }, h: 5 },
      { label: "Free up my team's time", w: { admin: 3 }, h: 7 },
      { label: "Better marketing ROI", w: { marketing: 3 }, h: 4 },
      { label: "Organise company knowledge", w: { admin: 3 }, h: 5 },
    ],
  },
];

const PILLAR_PLAYS = {
  sales: {
    name: "Sales & Acquisition",
    plays: [
      "24/7 AI Voice Agent to answer & qualify every call",
      "Missed-call recovery with instant SMS follow-up",
      "Social & WhatsApp automation feeding your CRM",
    ],
  },
  admin: {
    name: "Admin & Company Brain",
    plays: [
      "Custom RAG “Second Brain” over your documents",
      "Scan-to-Brain OCR to digitise paperwork",
      "Audio-to-CRM voice notes, written automatically",
    ],
  },
  marketing: {
    name: "Marketing & Growth",
    plays: [
      "AI Ads & Creative Agent across Meta & Google",
      "SEO / GEO visibility in Google and AI search",
      "Automated content & reputation workflows",
    ],
  },
};

export default function OpportunityFinder() {
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

  const buildPdf = async (roadmap) => {
    try {
      const { generateRoadmapPdf } = await import("./roadmapPdf");
      generateRoadmapPdf({
        name,
        sector: sectorLabel(),
        pillarName: PILLAR_PLAYS[roadmap.primary].name,
        secondaryName: roadmap.secondary ? PILLAR_PLAYS[roadmap.secondary].name : null,
        hoursLow: roadmap.hoursLow,
        hoursHigh: roadmap.hoursHigh,
        plays: roadmap.plays,
      });
    } catch (err) {
      console.error("PDF generation error", err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });
    const roadmap = computeRoadmap();
    // Lead capture (best-effort) so GHL can follow up with the emailed copy.
    try {
      await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          type: "opportunity-finder",
          source: "home-en-opportunity-finder",
          answers: QUESTIONS.reduce((acc, qq) => {
            const oi = answers[qq.id];
            acc[qq.id] = oi != null ? qq.options[oi].label : null;
            return acc;
          }, {}),
          recommended_pillar: PILLAR_PLAYS[roadmap.primary].name,
          estimated_hours_saved: `${roadmap.hoursLow}-${roadmap.hoursHigh}/week`,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Finder capture error", err);
    }
    // Generate + download the personalised PDF instantly.
    await buildPdf(roadmap);
    setStatus({ loading: false, error: null });
    setStep(total + 1);
  };

  const roadmap = isRoadmap ? computeRoadmap() : null;

  return (
    <Section id="opportunity-finder" className="bg-deep-blue">
      <SectionHeading
        eyebrow="Free · 60 seconds · no call required"
        title={<>The AI Opportunity Finder</>}
        lead="Answer 6 quick questions and get an instant, personalised roadmap of the top automations for your business, plus how much time they could give you back."
      />

      <Reveal delay={80}>
        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-white/[0.1] bg-[#04101c]/70 backdrop-blur-md">
          {/* progress */}
          {!isRoadmap && (
            <div className="border-b border-white/[0.06] px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between text-[12px] text-white/45">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} />
                  {isEmail ? "Almost there" : `Question ${step + 1} of ${total}`}
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
                    <ArrowLeft className="h-4 w-4" strokeWidth={2} /> Back
                  </button>
                )}
              </div>
            )}

            {/* Email capture */}
            {isEmail && (
              <form onSubmit={submit}>
                <h3 className="font-display text-xl font-semibold text-white sm:text-[1.4rem]">
                  Where should we send your roadmap?
                </h3>
                <p className="mt-2 text-[14px] text-white/55">
                  You'll get your personalised PDF roadmap on screen and downloaded instantly, plus a copy in your inbox.
                </p>
                <div className="mt-6 space-y-3">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none transition-colors focus:border-[#3C91E6]"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none transition-colors focus:border-[#3C91E6]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status.loading}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: GRAD }}
                >
                  {status.loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Building your roadmap…</>
                  ) : (
                    <>See my roadmap <ArrowRight className="h-4 w-4" strokeWidth={2.4} /></>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/45 transition-colors hover:text-white/80"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={2} /> Back
                </button>
                <p className="mt-4 text-center text-[11.5px] text-white/30">No spam. No credit card. Unsubscribe anytime.</p>
              </form>
            )}

            {/* Roadmap result */}
            {isRoadmap && roadmap && (
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.08] px-3.5 py-1.5 text-[12px] font-semibold text-[#8fe0f0]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Your roadmap is ready
                </span>
                <h3 className="font-display mt-5 text-[1.5rem] font-bold text-white">
                  Start with <span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{PILLAR_PLAYS[roadmap.primary].name}</span>
                </h3>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 text-left">
                    <div className="flex items-center gap-2 text-[#8fe0f0]">
                      <Clock className="h-4 w-4" strokeWidth={2} />
                      <span className="text-[12px] font-semibold uppercase tracking-wide">Time back / week</span>
                    </div>
                    <p className="font-display mt-2 text-[2rem] font-bold text-white">
                      {roadmap.hoursLow}-{roadmap.hoursHigh}<span className="text-[1rem] font-medium text-white/45"> hrs</span>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 text-left">
                    <div className="flex items-center gap-2 text-[#8fe0f0]">
                      <TrendingUp className="h-4 w-4" strokeWidth={2} />
                      <span className="text-[12px] font-semibold uppercase tracking-wide">Focus pillar</span>
                    </div>
                    <p className="font-display mt-2 text-[1.15rem] font-semibold leading-tight text-white">
                      {PILLAR_PLAYS[roadmap.primary].name}
                      {roadmap.secondary && <span className="text-white/40"> + {PILLAR_PLAYS[roadmap.secondary].name.split(" ")[0]}</span>}
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 text-left">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">Your top 3 automations</p>
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
                  Your PDF roadmap just downloaded. A copy is on its way to your inbox.
                </div>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <CTAButton href={BOOKING} variant="secondary" size="medium" external className="w-full sm:w-auto">
                    Want us to build these? Book a call
                  </CTAButton>
                  <button
                    onClick={() => buildPdf(roadmap)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-[14px] font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Download className="h-4 w-4" strokeWidth={2} /> Download PDF again
                  </button>
                </div>
                <p className="mt-3 text-[12px] text-white/35">Estimates are indicative and depend on your volume and setup.</p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
