"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Link2,
  BarChart3,
  Target,
  ShieldCheck,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AdvancedTechSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "🇵🇹 Português Perfeito",
      text:
        "Compreensão avançada de sotaques, expressões e linguagem natural. A IA fala como um nativo.",
    },
    {
      icon: Link2,
      title: "🔗 Integrações Nativas",
      text:
        "Ligação direta a CRMs, calendários e sistemas de gestão usados em Portugal.",
    },
    {
      icon: BarChart3,
      title: "📊 Análises em Tempo Real",
      text:
        "Dashboard completo com métricas e acompanhamento de ROI.",
    },
    {
      icon: Target,
      title: "🎯 Personalização Total",
      text:
        "Guiões e tom ajustados à sua marca e ao seu setor.",
    },
    {
      icon: ShieldCheck,
      title: "🔒 Segurança & RGPD",
      text:
        "Dados encriptados, servidores na UE e total conformidade com o GDPR.",
    },
    {
      icon: Rocket,
      title: "🚀 Escalabilidade Ilimitada",
      text:
        "Gira milhares de chamadas sem limites nem custos fixos.",
    },
  ];

  const CARD_WIDTH = 340 + 24; // largura do cartão + espaçamento

  // Intersection trigger
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

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
  };

  // Infinite scroll (cloning)
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const clone = container.innerHTML;
    container.innerHTML += clone + clone; // triplica os itens
    container.scrollLeft = container.scrollWidth / 3;
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const third = container.scrollWidth / 3;
    if (container.scrollLeft >= 2 * third) {
      container.scrollLeft -= third;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += third;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-bg-primary text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug text-white">
            Tecnologia Avançada,{" "}
            <span className="text-text-blue">Simplicidade de Utilização</span>
          </h2>
          <p className="text-blue-light/80 max-w-3xl mx-auto text-base md:text-lg">
            Toda a potência da inteligência artificial, de forma simples e
            acessível para empresas em Portugal.
          </p>
        </div>

        {/* Scrollable cards */}
        <div className="relative w-full overflow-hidden py-2">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2"
          >
            {[...features].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[300px] md:w-[340px] mx-3 bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-2xl p-6 shadow-lg hover:bg-yellow-light/10 hover:border-yellow-light/30 hover:scale-[1.03] transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#3C91E6]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-light/20 transition-all duration-300">
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

          {/* Gradient edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-bg-primary to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-bg-primary to-transparent pointer-events-none z-10"></div>

          {/* Arrow buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
