"use client";

import Script from "next/script";
import { Section, Kicker, Grad, Reveal, GoldCTA } from "./home-ui";

/* Faint static echo of the hero diagram: rings + wires, no motion. */
function SystemEcho() {
  return (
    <svg
      viewBox="0 0 300 300"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-16 -left-10 h-72 w-72 opacity-[0.07]"
    >
      <circle cx="150" cy="150" r="60" fill="none" stroke="#B4C2FF" strokeWidth="1" strokeDasharray="3 8" />
      <circle cx="150" cy="150" r="100" fill="none" stroke="#B4C2FF" strokeWidth="0.8" strokeDasharray="2 10" />
      <circle cx="150" cy="150" r="140" fill="none" stroke="#B4C2FF" strokeWidth="0.6" strokeDasharray="2 12" />
      <circle cx="150" cy="150" r="28" fill="rgba(60,145,230,0.4)" />
    </svg>
  );
}

export default function FinalCta({ content, bookingUrl }) {
  const c = content;
  return (
    <Section id="book" surface="deep" className="hx-grain">
      <div className="pointer-events-none absolute -top-10 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-bright-blue/12 blur-[120px]" />

      <div className="hx-orbit-on av-gradient-border relative overflow-hidden rounded-3xl bg-white/[0.03] p-6 sm:p-10">
        <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
        <SystemEcho />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <Kicker>{c.kicker}</Kicker>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
              <Grad>{c.title}</Grad>
            </h2>
            <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-white/65">
              {c.subtitle}
            </p>
            {/* Fallback for anyone who scrolls past the embed on mobile */}
            <div className="mt-8 lg:hidden">
              <GoldCTA href={bookingUrl} external>
                Book a discovery call
              </GoldCTA>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl bg-white/[0.02]">
            <iframe
              id="automis-booking-widget"
              src={bookingUrl}
              title="Book a discovery call with Automis"
              className="h-[760px] min-h-[700px] w-full rounded-2xl border-0"
              style={{ overflow: "auto" }}
              scrolling="yes"
              loading="lazy"
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
