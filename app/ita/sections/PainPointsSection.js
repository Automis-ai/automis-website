import { useEffect, useRef, useState } from "react";

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
      emoji: "📞",
      title: "Il 67% delle Chiamate Senza Risposta",
      text: "I tuoi potenziali clienti chiamano, ma tu e il tuo team siete occupati. Risultato? Vanno dai concorrenti.",
    },
    {
      emoji: "⏰",
      title: "Team Sommerso da Richieste Ripetitive",
      text: '"Quali sono gli orari?" "Quanto costa?" "Posso prenotare?" Le stesse domande tutto il giorno, ogni giorno.',
    },
    {
      emoji: "💸",
      title: "Lead Freddi che Non Rispondono",
      text: "Database con migliaia di contatti che nessuno richiama. È denaro fermo sul tavolo.",
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
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Ogni Chiamata Persa è un'Opportunità Sprecata
          </h2>
          <p className="text-[#EAEAEA] max-w-2xl mx-auto text-base md:text-lg">
            Scopri perché la maggior parte delle aziende perde potenziali
            clienti ogni giorno.
          </p>
        </div>

        {/* Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {painPoints.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-blue-darkest/40 to-blue-darkest/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-6 shadow-xl transition-all duration-700 delay-[${
                index * 200
              }ms] ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              data-aos="fade-up"
              data-aos-delay={200 * (index + 1)}
              data-aos-duration="800"
            >
              <div className="text-3xl mb-4">{item.emoji}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-[#EAEAEA] text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Solution */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Automis Voice AI Risolve Tutto Questo in Automatico
          </h3>
          <p className="text-[#EAEAEA] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            L'AI risponde al telefono, qualifica i lead, prenota appuntamenti e
            riattiva clienti dormienti. Il tutto con una voce naturale e
            conversazioni in italiano perfetto.
          </p>
        </div>
      </div>
    </section>
  );
}
