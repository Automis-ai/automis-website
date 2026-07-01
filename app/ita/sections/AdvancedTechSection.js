"use client";

import {
  Brain,
  Link2,
  BarChart3,
  Target,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

const features = [
  {
    icon: Brain,
    title: "Italiano Perfetto",
    text: "Comprensione avanzata di accenti regionali, espressioni idiomatiche e linguaggio naturale. L'AI parla come un italiano nativo.",
  },
  {
    icon: Link2,
    title: "Integrazioni Native",
    text: "Connessione diretta con CRM, calendari e gestionali italiani.",
  },
  {
    icon: BarChart3,
    title: "Analisi in Tempo Reale",
    text: "Dashboard completa con metriche e monitoraggio del ROI.",
  },
  {
    icon: Target,
    title: "Personalizzazione Totale",
    text: "Script e tono su misura per il tuo brand e il tuo settore.",
  },
  {
    icon: ShieldCheck,
    title: "Sicurezza & GDPR",
    text: "Dati crittografati, server in UE e piena conformità al GDPR.",
  },
  {
    icon: Rocket,
    title: "Scalabilità Illimitata",
    text: "Gestisci migliaia di chiamate senza limiti né costi fissi.",
  },
];

export default function AdvancedTechSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-soft-blue/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="La tecnologia"
            title={
              <>
                Tecnologia avanzata, <Grad>semplicità d'uso</Grad>
              </>
            }
            subtitle="Tutta la potenza dell'intelligenza artificiale, resa semplice e accessibile per le aziende in Italia."
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`av-gradient-border av-reveal group rounded-2xl p-7 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1.5 ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-bright-blue/15 transition-colors duration-300 group-hover:bg-warm-yellow/15">
                  <Icon
                    className="h-6 w-6 text-bright-blue transition-colors duration-300 group-hover:text-warm-yellow"
                    strokeWidth={2}
                  />
                </span>
                <h3 className="mb-2 font-montserrat text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="font-open-sans text-[0.95rem] leading-relaxed text-white/65">
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
