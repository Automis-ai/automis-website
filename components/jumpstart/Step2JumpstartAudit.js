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

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

/* The two comprehensive audits, ported faithfully from the old paid offer. */
const AUDITS = [
  {
    icon: BarChart3,
    kicker: "Audit 1",
    title: "Marketing Performance Audit",
    items: [
      {
        h: "Find & fix ad waste",
        p: "Clear stop / start / scale moves across Google, Meta, LinkedIn.",
      },
      {
        h: "Sharper targeting & funnels",
        p: "Audience, offer, and landing tweaks to lift conversion.",
      },
      {
        h: "Tracking that tells the truth",
        p: "Simple attribution fixes so decisions are data-driven.",
      },
    ],
    deliverables:
      "Channel scorecard, targeting / creative notes, tracking checklist, Top 3 recommendations.",
  },
  {
    icon: Brain,
    kicker: "Audit 2",
    title: "AI Operations Audit",
    items: [
      {
        h: "See the leaks",
        p: "Lead-to-booking flow mapped (speed-to-lead, missed calls, follow-ups, no-shows).",
      },
      {
        h: "High-ROI opportunities",
        p: "A short, ranked shortlist of automations that make a difference.",
      },
      {
        h: "Safe to deploy",
        p: "Practical notes on privacy / compliance where relevant (e.g., healthcare).",
      },
    ],
    deliverables:
      "Flow map, opportunity shortlist (impact vs. effort), implementation considerations.",
  },
];

/* C-suite-ready deliverables. */
const DELIVERABLES = [
  {
    icon: LineChart,
    title: "Money-Slide Forecast",
    body: "Clear projections for CPL / CPA reduction and hours saved, so leadership sees the euro impact.",
  },
  {
    icon: Calendar,
    title: "90-Day Action Plan",
    body: "A week-by-week rollout with owners and milestones, ready to hand to your team tomorrow.",
  },
  {
    icon: Award,
    title: "Board-Ready Handoff Pack",
    body: "Findings, forecasts, and plan packaged and polished for the C-suite. Presentation ready.",
  },
];

/* 3 bonuses, €1,850 in total value, free. */
const BONUSES = [
  {
    icon: Zap,
    value: "€750 value",
    title: "Quick-Win Implementation",
    tag: "Done-For-You",
    body: "We build and switch on one custom automation aligned to your biggest bottleneck. Live setup with 14 days support.",
    gold: true,
  },
  {
    icon: Calendar,
    value: "€600 value",
    title: "90-Day Action Plan",
    tag: "Step-by-Step Roadmap",
    body: "A simple rollout you can hand to your team tomorrow, what to do first, second, third, with owners and milestones.",
    gold: false,
  },
  {
    icon: LineChart,
    value: "€500 value",
    title: '"Money Slide" Forecast',
    tag: "Executive Ready",
    body: "Clear projections for CPL / CPA reduction and hours saved, so leadership sees the euro impact.",
    gold: true,
  },
];

/* The two guarantees, exact conditions ported. */
const CLARITY_OUTCOMES = [
  "10%+ reduction in acquisition costs",
  "5%+ increase in bookings",
  "10+ hours/week saved",
];

/* 14-day timeline, day-by-day, ported faithfully. */
const TIMELINE = [
  {
    day: "Day 0-1",
    icon: Rocket,
    title: "Kickoff (goals & access)",
    body: "Align on business goals and KPIs; confirm ICPs, offers, and success criteria. We collect read-only access and send a call summary plus a checklist of anything missing.",
  },
  {
    day: "Day 1-3",
    icon: BarChart3,
    title: "Data intake & baselines",
    body: "Pull real numbers for leads, CPL / CPA, speed-to-lead, missed-call %, show-rate, close-rate, and LTV. Spot obvious tracking gaps.",
  },
  {
    day: "Day 3-5",
    icon: Activity,
    title: "Funnel mapping & bottlenecks",
    body: "Map your lead-to-booking flow (ads to lead capture to outreach to booking to follow-up). Flag leaks: slow response, missed calls, manual handoffs, no-show risk.",
  },
  {
    day: "Day 6-9",
    icon: Target,
    title: "Opportunity shortlist (impact vs. effort)",
    body: "Compile 3-6 high-ROI moves (marketing + AI) and rank them by impact / effort. Draft practical fixes for targeting, creative, landing, tracking; plus ops automations.",
  },
  {
    day: "Day 10",
    icon: Users,
    title: "Mid-audit alignment (30-45 min)",
    body: "Walk through the flow map and shortlist. Validate priorities with your team, then choose the Quick Win we will implement. Green-light on what matters most, no guesswork.",
  },
  {
    day: "Day 10-12",
    icon: Settings,
    title: "Build & test the Quick Win",
    body: "Configure the agreed Quick-Win Implementation and test end-to-end with your stack.",
  },
  {
    day: "Day 12-13",
    icon: LineChart,
    title: "Forecasts & 90-day plan",
    body: "Model expected savings / uplift and payback; package your Money-Slide Forecast. Create a week-by-week 90-Day Action Plan with owners and milestones.",
  },
  {
    day: "Day 14",
    icon: Award,
    title: "Final presentation → switch on live",
    body: "Present findings, confirm the plan, and turn the Quick Win on live. If you want us to execute the 90-day plan, we apply your €500 credit.",
  },
];

export default function Step2JumpstartAudit() {
  return (
    <Section id="step-2" className="bg-deep-blue" inner="max-w-6xl">
      {/* Step badge + heading */}
      <div className="mx-auto mb-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
          <Search className="h-3.5 w-3.5" strokeWidth={2.2} />
          Step 2 · The serious next step
        </span>
      </div>

      <SectionHeading
        title={<>The <GradientText>Jumpstart Audit</GradientText></>}
        lead="Two comprehensive audits, a C-suite-ready plan, and a live automation switched on in 14 days. This is the deep dive that turns your bottlenecks into a data-backed path to lower costs, more bookings, and hours back every week."
      />

      {/* ── The two comprehensive audits ─────────────────────────── */}
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Deliverables</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/70">{a.deliverables}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* ── C-suite-ready deliverables ───────────────────────────── */}
      <Reveal>
        <h3 className="font-display mt-20 text-center text-[1.5rem] font-semibold text-white sm:text-[1.8rem]">
          Plus the <GradientText>C-suite-ready deliverables</GradientText>
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

      {/* ── Bonuses: €1,850 in value, free ───────────────────────── */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
              <Gift className="h-3.5 w-3.5" strokeWidth={2.2} />
              Bonuses (included)
            </span>
            <h3 className="font-display mt-5 text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              <span className="text-[#FEC458]">€1,850</span> in value, free
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              Three bonuses bundled into every audit, so you leave with something working, not just a document.
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

      {/* ── The two guarantees ───────────────────────────────────── */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              Two <GradientText>risk-free guarantees</GradientText>
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              We put our money where our mouth is. Two checkpoints, two ways to get your money back.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Fit Guarantee (kickoff) */}
          <Reveal>
            <div className="card-glow group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Shield className="h-5 w-5 text-[#57C7E3]" strokeWidth={1.8} />
                </span>
                <div>
                  <h4 className="font-display text-[1.3rem] font-semibold text-white">Fit Guarantee</h4>
                  <p className="text-[13px] font-semibold text-[#57C7E3]">Checked at kickoff</p>
                </div>
              </div>
              <p className="mt-6 text-[14.5px] leading-relaxed text-white/70">
                If, at kickoff, we learn your data or stack will not let us move core KPIs meaningfully,
                we refund right away. No wasted weeks, no risk to you.
              </p>
            </div>
          </Reveal>

          {/* Clarity Guarantee (final) */}
          <Reveal delay={100}>
            <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-[#FEC458]/25 bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FEC458]/25 bg-[#FEC458]/[0.08]">
                  <Award className="h-5 w-5 text-[#FEC458]" strokeWidth={1.8} />
                </span>
                <div>
                  <h4 className="font-display text-[1.3rem] font-semibold text-white">Clarity Guarantee</h4>
                  <p className="text-[13px] font-semibold text-[#FEC458]">Checked at the final call</p>
                </div>
              </div>
              <p className="mt-6 text-[14.5px] leading-relaxed text-white/70">
                If our audit does not map a data-backed path to at least one of these outcomes, we refund 100%:
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
            Guarantees require timely read-only access and accurate historical data.
          </p>
        </Reveal>
      </div>

      {/* ── 14-day timeline ──────────────────────────────────────── */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              From kickoff to live in <GradientText>14 days</GradientText>
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              A clear day-by-day path. You end the final call with a Quick-Win automation switched on live.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-14">
          {/* vertical rail on md+ */}
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

      {/* ── Price + €500 credit + scarcity + CTA ─────────────────── */}
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
                Only 5 audit slots each month
              </span>

              <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.16em] text-white/45">Your investment</p>
              <div className="mt-3 flex flex-col items-center justify-center gap-2">
                <span className="font-display text-[1.6rem] font-semibold leading-none text-white/40 line-through sm:text-[2rem]">
                  €3,300
                </span>
                <span className="font-display text-[3.4rem] font-bold leading-none tracking-[-0.03em] text-[#FEC458] sm:text-[4.2rem]">
                  €1,450
                </span>
              </div>

              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#57C7E3]/20 bg-[#57C7E3]/[0.05] p-5">
                <p className="text-[15px] leading-relaxed text-white/80">
                  Start the build within 14 days and we apply a{" "}
                  <span className="font-semibold text-[#57C7E3]">€500 credit</span> toward implementation.
                </p>
              </div>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <InteractiveHoverButton href={BOOKING} variant="solid" text="Apply for the Jumpstart Audit" />
                <InteractiveHoverButton href="#book" variant="ghost" text="Book a free call first" />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/55">
                <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.2} /> Fit &amp; Clarity guarantees</span>
                <span className="inline-flex items-center gap-1.5"><Gift className="h-3.5 w-3.5 text-[#FEC458]" strokeWidth={2.2} /> €1,850 in bonuses</span>
                <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.2} /> Live Quick-Win in 14 days</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
