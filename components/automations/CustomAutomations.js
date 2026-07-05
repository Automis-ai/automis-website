"use client";
import { Section, SectionHeading, Reveal, GradientText, GRAD } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Search, Wrench, LineChart, Check } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

// The three-step process, applied specifically to automations. This mirrors the
// home's "How we work" but is written to make one thing unmistakable: the cards
// above are starting points, and every build is scoped around one business.
const STEPS = [
  {
    icon: Search,
    step: "Step 1",
    title: "Discover & Diagnose",
    body: "We learn how your business actually runs before touching a single tool. On the discovery call and audit we map where you leak time, calls, and revenue, then decide which automation is worth building first.",
    points: ["Discovery call + workflow audit", "Find the real bottleneck, not the obvious one"],
    meta: "You leave knowing your highest-ROI automation",
  },
  {
    icon: Wrench,
    step: "Step 2",
    title: "Design, Build & Deploy",
    body: "We take the closest example from the catalog and rebuild it around your tools, your scripts, and your CRM. You test it before it goes live. Nothing ships until it works the way your team actually works.",
    points: ["Built around your stack, not a template", "You approve it before it goes live"],
    meta: "~7 days for simple builds · custom for complex",
  },
  {
    icon: LineChart,
    step: "Step 3",
    title: "Launch, Monitor & Optimize",
    body: "We do not disappear after go-live. We watch how the automation performs, keep a human in the loop, and tune it every month so it gets sharper as your business grows, not stale.",
    points: ["Human oversight on every automation", "Monthly tuning as your business changes"],
    meta: "Ongoing, with human-in-the-loop",
  },
];

export default function CustomAutomations() {
  return (
    <Section id="custom" className="bg-deep-blue">
      {/* Framing: the catalog is a menu of examples, not a fixed product list. */}
      <SectionHeading
        eyebrow="Examples, not a fixed menu"
        title={<>Every card above is a <GradientText>starting point</GradientText></>}
        lead="The catalog shows the kind of automations we build. We do not drop a template on your business. We take the closest example, then design and build a custom system around your specific workflows, tools, and goals."
      />

      {/* The process, applied to automations. */}
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.step} delay={i * 80}>
              <div className="card-gold group relative flex h-full flex-col items-start rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-transform hover:-translate-y-1">
                <span
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/10"
                  style={{ background: "rgba(60,145,230,0.10)" }}
                >
                  <Icon className="h-6 w-6 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <span
                  className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em]"
                  style={{
                    backgroundImage: GRAD,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {s.step}
                </span>
                <h3 className="font-display mt-2 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{s.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[14px] text-white/75">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5">
                  <span className="inline-block rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[12.5px] font-medium text-white/55">
                    {s.meta}
                  </span>
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Mid-page CTA: soft nudge once the process is understood. */}
      <Reveal delay={120}>
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-[15px] leading-relaxed text-white/60">
            Not sure which automation fits, or want something that is not on the list? That is exactly
            what the discovery call is for. We scope it around your business, for free.
          </p>
          <div className="mt-6 flex justify-center">
            <InteractiveHoverButton
              href={BOOKING}
              variant="solid"
              text="Book a Discovery Call"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
