"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "@/components/CTAButton";

export default function StepSection() {
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

  const steps = [
    {
      number: "1️⃣",
      title: "Schnelle Einrichtung",
      points: [
        "📋 Teilen Sie uns Geschäftsdetails, FAQs und Prozesse mit",
        "⚡ Vollständiges Setup in 72 Stunden",
        "🎯 Wir personalisieren die KI für Ihre Branche",
      ],
      delay: 100,
    },
    {
      number: "2️⃣",
      title: "Training & Tests",
      points: [
        "🧠 Die KI übernimmt Ihren Ton und Ihre Werte",
        "📞 Testphase gemeinsam mit Ihrem Team",
        "✅ Finale Freigabe vor dem Go-Live",
      ],
      delay: 200,
    },
    {
      number: "3️⃣",
      title: "Live & Optimierung",
      points: [
        "🚀 Die KI übernimmt reale Anrufe",
        "📊 Echtzeit-Dashboard mit Analytics",
        "🔄 Kontinuierliche Verbesserung auf Basis von Daten",
      ],
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
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="section-heading text-white mb-4">
            In 3 Schritten zu automatisierten Anrufen
          </h2>
        </div>

        {/* Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-6 lg:p-8 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-500 group ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={step.delay}
            >
              <div className="w-14 h-14 bg-[#3C91E6]/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-light/20 transition-all duration-300">
                <span className="text-2xl text-[#3C91E6] group-hover:text-yellow-light transition-all duration-300">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <ul className="text-white/90 text-base leading-relaxed space-y-2">
                {step.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="800"
        >
          <CTAButton
            href="https://api.leadconnectorhq.com/widget/bookings/automis-de"
            external
            variant="primary"
            size="large"
            icon="fas fa-phone"
          >
            Jetzt 14 Tage kostenlos testen
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
