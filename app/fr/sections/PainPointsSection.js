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
      title: "67 % des Appels Sans Réponse",
      text: "Vos clients potentiels appellent, mais vous et votre équipe êtes occupés. Résultat ? Ils vont chez la concurrence",
      delay: 100,
    },
    {
      icon: Clock3,
      title: "Équipe Submergée par des Demandes Répétitives",
      text: '"Quels sont les horaires ? » « Combien ça coûte ? » « Puis-je réserver ? » Les mêmes questions, toute la journée, tous les jours.',
      delay: 200,
    },
    {
      icon: PiggyBank,
      title: "Leads Froids qui ne Répondent Plus",
      text: "Une base de données pleine de contacts que personne ne rappelle. C’est de l’argent laissé sur la table",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug text-white max-w-3xl mx-auto">
          Découvrez pourquoi la plupart des entreprises 
          perdent des clients potentiels chaque jour.
          </h2>
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
      </div>
    </section>
  );
}
