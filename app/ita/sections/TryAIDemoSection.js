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
      icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
      text: "“Come funziona l'AI di Automis?”",
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-blue-400" />,
      text: "“Quali settori supportate?”",
    },
    {
      icon: <Mic className="w-6 h-6 text-blue-400" />,
      text: "“Posso integrare con il mio CRM?”",
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-400" />,
      text: "Spiega la tua sfida principale e lascia l’AI analizzare il tuo caso per potenziali soluzioni",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-bg-primary text-white relative overflow-hidden py-24"
      id="try-ai"
    >
      {/* --- Subtle overlay for depth --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-darkest/20 via-transparent to-bg-primary z-0"></div>

      <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
        {/* Headline */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Prova Subito: Parla con la Nostra AI
          </h2>
          <p className="text-[#EAEAEA] max-w-2xl mx-auto text-base md:text-lg mb-10">
            Non crederci sulla parola. Clicca qui sotto e chiedi qualsiasi cosa
            sulla nostra soluzione. L'AI di Automis risponderà in tempo reale,
            proprio come farebbe con i tuoi clienti.
          </p>

          <p className="text-blue-300 italic mb-8">
            💬 Clicca sul pop up in basso a sinistra e testa il nostro AI
            gratuitamente
          </p>
        </div>

        {/* Suggestions */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gradient-to-br from-blue-darkest/30 to-blue-darkest/10 border border-blue-600/30 rounded-2xl p-5 backdrop-blur-md transition-all hover:scale-[1.02] hover:border-blue-400/50 duration-300"
            >
              <div>{item.icon}</div>
              <p className="text-[#EAEAEA] text-left leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CTAButton
            href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
            external={true}
            variant="primary"
            size="large"
          >
            Prova Gratis per 14 Giorni
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
