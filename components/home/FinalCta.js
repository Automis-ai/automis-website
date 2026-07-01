"use client";

import { Section, Eyebrow, Grad, Reveal } from "./home-ui";

export default function FinalCta({ content, bookingUrl }) {
  const c = content;
  return (
    <Section id="book" className="hx-grain">
      <div className="pointer-events-none absolute -top-10 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-bright-blue/12 blur-[120px]" />

      <div className="av-gradient-border relative overflow-hidden rounded-3xl bg-white/[0.03] p-6 sm:p-10">
        <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-montserrat text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              <Grad>{c.title}</Grad>
            </h2>
            <p className="mt-5 max-w-lg font-open-sans text-base leading-relaxed text-white/65">
              {c.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-2xl bg-white/[0.02]">
            <iframe
              src={bookingUrl}
              title="Book a discovery call with Automis"
              className="h-[560px] w-full border-0"
              loading="lazy"
              scrolling="no"
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
