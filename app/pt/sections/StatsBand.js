"use client";

import CountUp from "react-countup";

const STATS = [
  { end: 72, suffix: "h", label: "Para entrar em funcionamento" },
  { end: 80, suffix: "%", label: "Das chamadas tratadas pela IA" },
  { end: 24, suffix: "/7", label: "Disponível, sem pausas nem férias" },
  { end: 100, suffix: "%", label: "Suporte em português" },
];

export default function StatsBand() {
  return (
    <section id="stats" className="relative px-4 py-10 md:py-14">
      <div className="container mx-auto max-w-5xl">
        <div className="av-gradient-border grid grid-cols-2 gap-y-10 rounded-2xl px-6 py-10 backdrop-blur-md md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10">
          {STATS.map((s) => (
            <div key={s.label} className="px-2 text-center md:px-6">
              <p className="font-montserrat text-4xl font-extrabold leading-none text-white md:text-5xl">
                <CountUp
                  end={s.end}
                  suffix={s.suffix}
                  duration={2.2}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </p>
              <p className="mx-auto mt-3 max-w-[14rem] font-plex-mono text-xs uppercase leading-snug tracking-wide text-soft-blue/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
