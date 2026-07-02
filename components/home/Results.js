"use client";

import { useState } from "react";
import { MapPin, Check } from "lucide-react";
import { Section, SectionHeading, Reveal } from "./home-ui";

/* Client logo on a clean light badge (colored/dark logos read on the dark card).
   Falls back to an initials monogram if the image is missing. */
function ClientLogo({ src, name }) {
  const [ok, setOk] = useState(Boolean(src));
  if (!ok) {
    const initials = name
      .replace(/^Cl[ií]nica.*/i, "Santa Maria")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <div className="grid h-14 w-14 place-items-center rounded-xl bg-bright-blue/15 font-display text-lg font-bold text-bright-blue">
        {initials}
      </div>
    );
  }
  return (
    <div className="inline-flex h-14 items-center rounded-xl bg-white px-4">
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => setOk(false)}
        className="h-8 w-auto max-w-[170px] object-contain"
      />
    </div>
  );
}

export default function Results({ content }) {
  const c = content;
  return (
    <Section id="results" surface="deep">
      <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {c.cases.map((cs, i) => (
          <Reveal
            key={cs.client}
            delay={i * 0.1}
            className="hx-orbit av-gradient-border group flex h-full flex-col rounded-3xl bg-white/[0.03] p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <ClientLogo src={cs.logo} name={cs.client} />
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/40">
                <MapPin size={12} /> {cs.location}
              </span>
            </div>
            <span className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bright-blue">
              {cs.sector}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white">{cs.client}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/60">{cs.summary}</p>

            <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
              {cs.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 font-body text-sm text-white/80">
                  <Check size={15} strokeWidth={3} className="mt-0.5 shrink-0 text-bright-blue" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {cs.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/55"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
