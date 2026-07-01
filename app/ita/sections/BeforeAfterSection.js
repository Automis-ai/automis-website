"use client";

import { Fragment } from "react";
import { X, Check } from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

const comparisons = [
  {
    before: "67% chiamate perse fuori orario",
    after: "Disponibilità 24/7, zero chiamate perse",
  },
  {
    before: "Team sommerso da richieste ripetitive",
    after: "La maggior parte delle domande gestita dall'AI",
  },
  {
    before: "Lead non qualificati passati ai sales",
    after: "Solo lead caldi con budget verificato",
  },
  {
    before: "Database vecchi inutilizzati",
    after: "Riattivazione automatica dei lead dormienti",
  },
  {
    before: "Assunzione receptionist: ~30.000 €/anno",
    after: "Costo variabile e scalabile",
  },
  {
    before: "Tempo di risposta: ore o giorni",
    after: "Risposta immediata, in pochi secondi",
  },
  {
    before: "Nessuna chiamata dopo le 18:00",
    after: "Servizio continuo, weekend compresi",
  },
  {
    before: "Difficile misurare il ROI delle chiamate",
    after: "Analisi dettagliate di ogni interazione",
  },
];

export default function BeforeAfterSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="before-after"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-bright-blue/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Il contrasto"
            title={
              <>
                Prima e dopo <Grad>Automis</Grad>
              </>
            }
            subtitle="Un confronto chiaro tra il modo tradizionale di lavorare e la potenza dell'intelligenza artificiale."
          />
        </div>

        <div
          className={`av-gradient-border av-reveal mt-12 overflow-hidden rounded-2xl backdrop-blur-md ${
            visible ? "is-visible" : ""
          }`}
        >
          <div className="grid grid-cols-2">
            {/* Column headers */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] p-5 md:p-6">
              <X className="h-5 w-5 flex-shrink-0 text-white/40" strokeWidth={2.5} />
              <p className="font-montserrat text-base font-bold text-white/50 md:text-lg">
                Senza Automis
              </p>
            </div>
            <div className="flex items-center gap-3 border-b border-bright-blue/20 bg-bright-blue/[0.07] p-5 md:p-6">
              <Check
                className="h-5 w-5 flex-shrink-0 text-bright-blue"
                strokeWidth={3}
              />
              <p className="font-montserrat text-base font-bold text-bright-blue md:text-lg">
                Con Automis
              </p>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => {
              const last = index === comparisons.length - 1;
              return (
                <Fragment key={index}>
                  <div
                    className={`flex items-center gap-3 px-5 py-3.5 text-sm text-white/55 md:px-6 ${
                      last ? "" : "border-b border-white/[0.06]"
                    }`}
                  >
                    <X
                      className="h-4 w-4 flex-shrink-0 text-white/25"
                      strokeWidth={2.5}
                    />
                    <span>{row.before}</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 bg-bright-blue/[0.03] px-5 py-3.5 text-sm font-medium text-white/90 md:px-6 ${
                      last ? "" : "border-b border-bright-blue/10"
                    }`}
                  >
                    <Check
                      className="h-4 w-4 flex-shrink-0 text-bright-blue"
                      strokeWidth={3}
                    />
                    <span>{row.after}</span>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
