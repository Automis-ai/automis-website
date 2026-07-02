"use client";

import CountUp from "react-countup";
import { Check, ShieldCheck } from "lucide-react";
import { Section, Kicker, Grad, GoldCTA, Reveal } from "./home-ui";
import CallSimulation from "./system/CallSimulation";

function StatCard({ stat, index }) {
  return (
    <Reveal
      delay={index * 0.08}
      className="av-gradient-border rounded-2xl bg-white/[0.03] px-5 py-6 text-center"
    >
      <div className="font-display text-3xl font-semibold text-white sm:text-4xl">
        <CountUp end={parseInt(stat.value, 10)} duration={2} enableScrollSpy scrollSpyOnce />
        <span className={stat.gold ? "text-gold-400" : "text-bright-blue"}>{stat.suffix}</span>
      </div>
      <p className="mt-2.5 font-body text-[0.82rem] leading-snug text-white/55">{stat.label}</p>
    </Reveal>
  );
}

export default function VoiceFlagship({ content }) {
  const c = content;
  return (
    <Section id="voice-ai" surface="deep" className="hx-grain">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-bright-blue/10 blur-[120px]" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal>
          <Kicker>{c.kicker}</Kicker>
          <h2 className="mt-5 font-display text-display-xl font-semibold text-white">
            <Grad>{c.title}</Grad>
          </h2>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/65">{c.lead}</p>

          {/* The guarantee, unmissable */}
          <div className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/[0.06] px-4 py-3.5">
            <ShieldCheck size={20} strokeWidth={1.8} className="mt-0.5 shrink-0 text-gold-400" />
            <div>
              <p className="font-display text-sm font-bold text-gold-400">{c.guarantee.title}</p>
              <p className="mt-0.5 font-body text-[0.82rem] leading-relaxed text-white/60">
                {c.guarantee.body}
              </p>
            </div>
          </div>

          <ul className="mt-7 space-y-3">
            {c.highlights.map((hl) => (
              <li key={hl} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bright-blue/20 text-bright-blue">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="font-body text-sm leading-relaxed text-white/75">{hl}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <GoldCTA href={c.cta.href} external>
              {c.cta.label}
            </GoldCTA>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <CallSimulation call={c.call} />
          </Reveal>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {c.stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
          {c.revenueLine && (
            <Reveal delay={0.2}>
              <p className="mt-5 font-body text-sm leading-relaxed text-soft-blue/80">{c.revenueLine}</p>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
