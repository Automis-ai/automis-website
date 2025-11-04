"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  CheckCircle2,
  PhoneCall,
  Utensils,
  ShoppingBag,
} from "lucide-react";

export default function ResultsSection() {
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

  const cases = [
    {
      icon: Building2,
      title: "Reactivación de Leads",
      sector: "Inmobiliario, Automoción, Servicios B2B",
      problem:
        "Tienes una base de datos con miles de leads que mostraron interés hace meses, pero no tienes recursos para volver a contactarlos.",
      solution:
        "La IA llama automáticamente a los leads inactivos con conversaciones naturales, calienta el contacto y transfiere solo los interesados a tu equipo.",
      results: [
        { label: "ROI medio anual", value: "€45.000–€85.000" },
        { label: "Tasa de respuesta", value: "12–18%" },
        { label: "Tiempo ahorrado/mes", value: "120 horas" },
      ],
      delay: 100,
    },
    {
      icon: CheckCircle2,
      title: "Cualificación de Leads",
      sector: "Inmobiliario, Finanzas, Consultoría",
      problem:
        "Tu equipo pierde tiempo con leads no cualificados. Solo 1 de cada 10 está realmente listo para comprar.",
      solution:
        "La IA llama a cada nuevo lead, realiza preguntas de cualificación y pasa a tu equipo solo los leads calientes.",
      results: [
        { label: "Ahorro mensual", value: "€2.800" },
        { label: "Eficiencia de ventas", value: "+65%" },
        { label: "Tasa de cierre", value: "+28%" },
      ],
      delay: 200,
    },
    {
      icon: PhoneCall,
      title: "Recepcionista Virtual 24/7",
      sector: "Clínicas, Abogados, Centros de bienestar",
      problem:
        "¿Llamas a una clínica a las 13:00 o después de las 18:00? Contestador. Resultado: el paciente se va a otro sitio.",
      solution:
        "Recepcionista con IA siempre disponible que responde a las preguntas frecuentes, reserva citas, envía confirmaciones por SMS y actualiza el calendario.",
      results: [
        { label: "Ahorro mensual", value: "€1.800–€2.500" },
        { label: "Citas adicionales", value: "+18–25/mes" },
        { label: "Llamadas gestionadas automáticamente", value: "85%" },
      ],
      delay: 300,
    },
    {
      icon: Utensils,
      title: "Gestión de Reservas",
      sector: "Restauración, Salones, Centros estéticos",
      problem:
        "Durante el servicio de comida o cena el teléfono suena, pero nadie puede responder. Pierdes entre 15 y 20 reservas por semana.",
      solution:
        "La IA responde, comprueba la disponibilidad en tiempo real, reserva mesas y envía confirmaciones o recordatorios automáticos por WhatsApp.",
      results: [
        { label: "Ingresos adicionales", value: "€3.200–€5.500/mes" },
        { label: "Reducción de no-shows", value: "–35%" },
        { label: "Tiempo de personal liberado", value: "45 min/día" },
      ],
      delay: 400,
    },
    {
      icon: ShoppingBag,
      title: "Atención al Cliente para E-commerce",
      sector: "Tiendas online, Dropshipping, Retail",
      problem:
        'Postventa saturado de preguntas: “¿Dónde está mi pedido?” “¿Cómo hago una devolución?” “¿Qué tallas tenéis?”',
      solution:
        "IA que responde por teléfono, rastrea pedidos en tiempo real, gestiona devoluciones y envía información de productos.",
      results: [
        { label: "Ahorro mensual", value: "€1.900–€3.200" },
        { label: "Solicitudes resueltas automáticamente", value: "70–75%" },
        { label: "Satisfacción del cliente (CSAT)", value: "4.3/5" },
      ],
      delay: 500,
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
          <h2 className="section-heading text-white mb-4">
            Resultados Reales para Negocios Reales
          </h2>
          <p className="sub-heading max-w-3xl mx-auto">
            Así es como las empresas españolas ya están usando Automis para
            reducir costes y aumentar beneficios — todo en automático.
          </p>
        </div>

        {/* Casos de uso */}
        <div className="flex flex-col gap-4 md:gap-6 mb-12">
          {cases.map((c, index) => {
            const Icon = c.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-5 md:p-7 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={c.delay}
              >
                {/* Cabecera */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#3C91E6]/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#3C91E6] group-hover:text-yellow-light transition-all duration-300" />
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 break-words">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-light break-words">
                      Sector: {c.sector}
                    </p>
                  </div>
                </div>

                {/* Problema */}
                <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-4">
                  <h4 className="font-semibold text-yellow-light mb-1">
                    El Problema:
                  </h4>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {c.problem}
                  </p>
                </div>

                {/* Solución */}
                <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-4">
                  <h4 className="font-semibold text-[#3C91E6] mb-1">
                    La Solución Automis:
                  </h4>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {c.solution}
                  </p>
                </div>

                {/* Resultados */}
                <div className="bg-gradient-to-r from-[#3C91E6]/20 to-yellow-light/20 border border-[#3C91E6]/30 rounded-lg py-3 px-4">
                  <h4 className="font-semibold text-yellow-light mb-2">
                    Resultados:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    {c.results.map((r, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center"
                      >
                        <p className="text-2xl md:text-3xl font-bold text-yellow-light mb-1">
                          {r.value}
                        </p>
                        <p className="text-white/90 text-sm md:text-base">
                          {r.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
