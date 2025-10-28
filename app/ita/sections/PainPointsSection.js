"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneOff, Clock3, PiggyBank } from "lucide-react"; // 💡 Lucide icons

export default function PainPointsSection() {
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

  const painPoints = [
    {
      icon: PhoneOff,
      title: "Il 67% delle Chiamate Senza Risposta",
      text: "I tuoi potenziali clienti chiamano, ma tu e il tuo team siete occupati. Risultato? Vanno dai concorrenti.",
      delay: 100,
    },
    {
      icon: Clock3,
      title: "Team Sommerso da Richieste Ripetitive",
      text: '"Quali sono gli orari?" "Quanto costa?" "Posso prenotare?" Le stesse domande tutto il giorno, ogni giorno.',
      delay: 200,
    },
    {
      icon: PiggyBank,
      title: "Lead Freddi che Non Rispondono",
      text: "Database con migliaia di contatti che nessuno richiama. È denaro fermo sul tavolo.",
      delay: 300,
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
            Ogni Chiamata Persa è un'Opportunità Sprecata
          </h2>
          <p className="text-blue-light/80 max-w-2xl mx-auto text-base md:text-lg">
            Scopri perché la maggior parte delle aziende perde potenziali
            clienti ogni giorno.
          </p>
        </div>

        {/* Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {painPoints.map((item, index) => {
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

        {/* Solution */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Automis Voice AI Risolve Tutto Questo in Automatico
          </h3>
          <p className="text-blue-light/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            L'AI risponde al telefono, qualifica i lead, prenota appuntamenti e
            riattiva clienti dormienti. Il tutto con una voce naturale e
            conversazioni in italiano perfetto.
          </p>
        </div>
      </div>
    </section>
  );
}
