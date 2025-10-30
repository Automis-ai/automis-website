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
      text: "Connessione diretta con CRM, calendari e gestionali italiani.",
      delay: 200,
    },
    {
      icon: BarChart3,
      title: "📊 Analytics in Tempo Reale",
      text: "Dashboard completa con metriche e ROI tracking.",
      delay: 300,
    },
    {
      icon: Target,
      title: "🎯 Personalizzazione Totale",
      text: "Script e tono su misura per il tuo brand e settore.",
      delay: 400,
    },
    {
      icon: ShieldCheck,
      title: "🔒 Sicurezza & GDPR",
      text: "Dati crittografati, server EU, piena conformità GDPR.",
      delay: 500,
    },
    {
      icon: Rocket,
      title: "🚀 Scalabilità Illimitata",
      text: "Gestisci migliaia di chiamate senza limiti o costi fissi.",
      delay: 600,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-bg-primary text-white relative overflow-hidden"
    >
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-360px * 6));
          }
        }

        .features-scroll {
          display: flex;
          animation: scroll 35s linear infinite;
        }

        .features-scroll:hover {
          animation-play-state: paused;
        }

        /* Now mobile also auto-scrolls */
        @media (max-width: 767px) {
          .features-scroll {
            animation: scroll 40s linear infinite;
            overflow: visible;
          }
        }

        .feature-card {
          scroll-snap-align: center;
        }
      `}</style>

      {/* Headline */}
      <div className="container mx-auto px-4">
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

      {/* Infinite scroll container (shared for all screens now) */}
      <div className="relative w-full overflow-hidden py-2">
        <div className="features-scroll">
          {[...features, ...features].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`feature-card flex-shrink-0 w-[300px] md:w-[340px] mx-3 bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-2xl p-6 shadow-lg hover:bg-yellow-light/10 hover:border-yellow-light/30 hover:scale-[1.03] transition-all duration-300 group ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className="w-14 h-14 min-w-14 min-h-14 bg-[#3C91E6]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#3C91E6] group-hover:text-yellow-light transition-all duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-yellow-light transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-blue-light/80 text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Fade edges for desktop */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-bg-primary to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-bg-primary to-transparent pointer-events-none z-10"></div>
      </div>
      </div>
    </section>
  );
}
