"use client";

import { useEffect, useRef, useState } from "react";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function BeforeAfterSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const comparisons = [
    {
      before: "67% chiamate perse fuori orario",
      after: "Disponibilità 24/7, zero chiamate perse",
    },
    {
      before: "Team sommerso da richieste ripetitive",
      after: "80% domande gestite dall'AI",
    },
    {
      before: "Lead non qualificati passati ai sales",
      after: "Solo lead caldi con budget verificato",
    },
    {
      before: "Database vecchi inutilizzati",
      after: "Riattivazione automatica lead dormienti",
    },
    {
      before: "Assunzione receptionist €30K/anno",
      after: "Costo variabile scalabile",
    },
    {
      before: "Tempo di risposta: ore o giorni",
      after: "Risposta immediata in 3 secondi",
    },
    {
      before: "Nessuna chiamata dopo le 18:00",
      after: "Servizio continuo weekend compresi",
    },
    {
      before: "Difficoltà tracciare ROI chiamate",
      after: "Analytics dettagliate su ogni interazione",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="before-after"
      className="section-padding relative bg-bg-primary text-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-darkest/40 via-transparent to-bg-primary z-0"></div>

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        {/* Headline */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prima e Dopo <span className="text-text-blue">Automis</span>
          </h2>
          <p className="text-blue-light/80 max-w-2xl mx-auto text-base md:text-lg">
            Un confronto chiaro tra il modo tradizionale di lavorare e la
            potenza dell’intelligenza artificiale Automis.
          </p>
        </div>

        {/* Table */}
        <div
          className={`overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 text-left">
            {/* Table Header */}
            <div className="p-5 md:p-6 border-b border-blue-400/20 md:border-b-0 md:border-r border-r-blue-400/20 bg-gradient-to-r from-red-500/10 to-red-500/5 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <p className="text-lg font-semibold text-red-400">
                Senza Automis
              </p>
            </div>
            <div className="p-5 md:p-6 border-b border-blue-400/20 bg-gradient-to-r from-green-500/10 to-green-500/5 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <p className="text-lg font-semibold text-green-400">
                Con Automis
              </p>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <>
                {/* Left column (Before) */}
                <div
                  key={`before-${index}`}
                  className={`p-3 border-b border-blue-400/10 md:border-r border-r-blue-400/10 text-blue-light/80 transition-all duration-500 hover:bg-red-500/5 ${
                    index === comparisons.length - 1 ? "md:border-b-0" : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="text-red-400 mr-2">❌</span>
                  {row.before}
                </div>

                {/* Right column (After) */}
                <div
                  key={`after-${index}`}
                  className={`p-3 border-b border-blue-400/10 text-blue-light/90 transition-all duration-500 hover:bg-green-500/5 ${
                    index === comparisons.length - 1 ? "md:border-b-0" : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="text-green-400 mr-2">✅</span>
                  {row.after}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
