"use client";

import { PhoneOff, Clock3, PiggyBank } from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

const painPoints = [
  {
    icon: PhoneOff,
    tag: "Perdita 01",
    title: "Il 67% delle Chiamate Senza Risposta",
    text: "I tuoi potenziali clienti chiamano, ma tu e il tuo team siete occupati. Risultato? Vanno dai concorrenti.",
  },
  {
    icon: Clock3,
    tag: "Perdita 02",
    title: "Team Sommerso da Richieste Ripetitive",
    text: '"Quali sono gli orari?" "Quanto costa?" "Posso prenotare?" Le stesse domande tutto il giorno, ogni giorno.',
  },
  {
    icon: PiggyBank,
    tag: "Perdita 03",
    title: "Lead Freddi che Non Rispondono",
    text: "Database con migliaia di contatti che nessuno richiama. È denaro fermo sul tavolo.",
  },
];

export default function PainPointsSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-bright-blue/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Il problema"
            title={
              <>
                Perché la maggior parte delle aziende{" "}
                <Grad>perde clienti ogni giorno</Grad>
              </>
            }
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.tag}
                className={`av-gradient-border av-reveal group rounded-2xl p-7 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1.5 lg:p-8 ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-bright-blue/15 transition-colors duration-300 group-hover:bg-warm-yellow/15">
                    <Icon
                      className="h-7 w-7 text-bright-blue transition-colors duration-300 group-hover:text-warm-yellow"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="font-plex-mono text-xs uppercase tracking-[0.16em] text-soft-blue/50">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mb-3 font-montserrat text-lg font-bold leading-snug text-white md:text-xl">
                  {item.title}
                </h3>
                <p className="font-open-sans text-base leading-relaxed text-white/65">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
