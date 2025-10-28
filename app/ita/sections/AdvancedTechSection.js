"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Link2,
  BarChart3,
  Target,
  ShieldCheck,
  Rocket,
} from "lucide-react";

export default function AdvancedTechSection() {
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

  const features = [
    {
      icon: Brain,
      title: "🇮🇹 Italiano Perfetto",
      text: "Comprensione avanzata di accenti regionali, espressioni idiomatiche e linguaggio naturale. L'AI parla come un italiano nativo.",
      delay: 100,
    },
    {
      icon: Link2,
      title: "🔗 Integrazioni Native",
      text: "Connessione diretta con CRM (HubSpot, Salesforce, Zoho), calendari (Google, Outlook), WhatsApp Business e gestionali italiani.",
      delay: 200,
    },
    {
      icon: BarChart3,
      title: "📊 Analytics in Tempo Reale",
      text: "Dashboard completa con metriche: chiamate gestite, lead qualificati, sentiment analysis, ROI tracking, registrazioni conversazioni.",
      delay: 300,
    },
    {
      icon: Target,
      title: "🎯 Personalizzazione Totale",
      text: "Script su misura, tono di voce allineato al tuo brand, risposte specifiche per il tuo settore. L'AI si adatta al 100% alla tua realtà.",
      delay: 400,
    },
    {
      icon: ShieldCheck,
      title: "🔒 Sicurezza & GDPR",
      text: "Dati crittografati, server EU, conforme GDPR, consenso automatico, cancellazione dati a richiesta. Privacy garantita.",
      delay: 500,
    },
    {
      icon: Rocket,
      title: "🚀 Scalabilità Illimitata",
      text: "Gestisci 10 o 10.000 chiamate al giorno senza assumere personale. L'AI scala con il tuo business senza costi fissi.",
      delay: 600,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-bg-primary text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug text-white">
            Tecnologia Avanzata,{" "}
            <span className="text-text-blue">Semplicità d'Uso</span>
          </h2>
          <p className="text-blue-light/80 max-w-3xl mx-auto text-base md:text-lg">
            Tutta la potenza dell’intelligenza artificiale, resa semplice e
            accessibile per ogni azienda italiana.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-2xl p-6 lg:p-8 shadow-lg hover:bg-yellow-light/10 hover:border-yellow-light/30 hover:scale-[1.02] transition-all duration-300 group ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className="w-14 h-14 bg-[#3C91E6]/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-light/20 transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#3C91E6] group-hover:text-yellow-light transition-all duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-white group-hover:text-yellow-light transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-blue-light/80 text-base leading-relaxed">
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
