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
      title: "El 67% de llamadas sin respuesta",
      text:
        "Tus potenciales clientes llaman, pero tú y tu equipo estáis ocupados. ¿Resultado? Se van con la competencia.",
      delay: 100,
    },
    {
      icon: Clock3,
      title: "Equipo saturado por preguntas repetitivas",
      text:
        '“¿Cuál es el horario?” “¿Cuánto cuesta?” “¿Puedo reservar?” Las mismas preguntas todo el día, todos los días.',
      delay: 200,
    },
    {
      icon: PiggyBank,
      title: "Leads fríos que no responden",
      text:
        "Bases de datos con miles de contactos a los que nadie devuelve la llamada. Es dinero que se queda sobre la mesa.",
      delay: 300,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-bg-primary text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug text-white max-w-3xl mx-auto">
            Descubre por qué la mayoría de las empresas pierde clientes
            potenciales cada día.
          </h2>
        </div>

        {/* Puntos de dolor */}
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
