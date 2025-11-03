"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Mic, BrainCircuit, Rocket } from "lucide-react";
import CTAButton from "@/components/CTAButton";

export default function TryAIDemoSection() {
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

  const suggestions = [
    {
      icon: MessageCircle,
      text: "„Wie funktioniert die Automis-KI?“",
      delay: 100,
    },
    {
      icon: BrainCircuit,
      text: "„Welche Branchen unterstützen Sie?“",
      delay: 200,
    },
    {
      icon: Mic,
      text: "„Kann ich mein aktuelles CRM integrieren?“",
      delay: 300,
    },
    {
      icon: Rocket,
      text:
        "Beschreiben Sie Ihre größte Herausforderung – die KI analysiert Ihren Fall und schlägt passende Lösungen vor.",
      delay: 400,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-bg-primary text-white relative overflow-hidden py-24"
      id="try-ai"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-darkest/20 via-transparent to-bg-primary z-0"></div>

      <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
        {/* Headline */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug text-white">
            Testen Sie es jetzt: Sprechen Sie mit unserer KI
          </h2>
          <p className="text-blue-light/80 max-w-2xl mx-auto text-base md:text-lg mb-10">
            Überzeugen Sie sich selbst. Klicken Sie unten und stellen Sie jede
            Frage zu unserer Lösung. Die Automis-KI antwortet in Echtzeit – so,
            wie sie es auch mit Ihren Kundinnen und Kunden tun würde.
          </p>

          <p className="text-blue-300 italic mb-8">
            💬 Klicken Sie auf das Popup unten links und testen Sie unsere KI
            kostenlos.
          </p>
        </div>

        {/* Glass Glow Boxes */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {suggestions.map((item, index) => {
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
                <div className="w-12 h-12 bg-[#3C91E6]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#3C91E6] group-hover:text-yellow-light transition-all duration-300" />
                </div>
                <p className="text-[#EAEAEA] text-left leading-relaxed group-hover:text-yellow-light/90 transition-colors duration-300">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CTAButton
            href="https://api.leadconnectorhq.com/widget/bookings/automis-de"
            external={true}
            variant="primary"
            size="large"
          >
            Jetzt 14 Tage kostenlos testen
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
