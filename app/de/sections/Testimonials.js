"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
// import CTAButton from "@/components/CTAButton"; // (opzionale) non usato qui

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const iframeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        }),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // optional dynamic resize if booking widget sends height messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.origin.includes("leadconnectorhq.com") &&
        typeof event.data === "object" &&
        event.data?.type === "setHeight" &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = `${event.data?.height}px`;
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const testimonials = [
    {
      rating: 5,
      text: "In 6 Monaten haben wir Leads im Wert von 754.000 € reaktiviert. Die KI telefoniert effizienter als mein Team.",
      author: "Marco Rossi — CEO, Immobilien München",
      delay: 100,
    },
    {
      rating: 5,
      text: "Keine verpassten Anrufe mehr. Patientinnen und Patienten buchen sogar um 23:00 Uhr. Umsatz +6.000 € pro Monat.",
      author: "Dr. med. Giulia Bianchi — Zahnärztliche Praxis Berlin",
      delay: 200,
    },
    {
      rating: 5,
      text: "Wir haben No-Shows um 40 % reduziert. Die KI verwaltet 200 Reservierungen pro Woche.",
      author: "Luca Ferrara — Restaurant Hamburg",
      delay: 300,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-bg-primary text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Headline */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-snug">
            Unternehmen, die auf uns vertrauen
          </h2>
          <p className="text-blue-light/80 max-w-2xl mx-auto text-base md:text-lg">
            So revolutionieren Betriebe bereits mit Automis Voice AI die Kundenkommunikation.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-2xl p-8 shadow-lg hover:bg-yellow-light/10 hover:border-yellow-light/30 hover:shadow-yellow-light/30 hover:scale-[1.02] transition-all duration-300 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${item.delay}ms` }}
            >
              <div className="flex justify-center mb-4 text-yellow-light">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-current text-yellow-light"
                  />
                ))}
              </div>
              <p className="text-white/90 text-lg italic mb-4 leading-relaxed text-center">
                “{item.text}”
              </p>
              <p className="font-semibold text-yellow-light text-center">
                {item.author}
              </p>
            </div>
          ))}
        </div>

        {/* Compact Booking Iframe */}
        <div
          className={`max-w-7xl rounded-2xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <iframe
            ref={iframeRef}
            src="https://api.leadconnectorhq.com/widget/bookings/automis-de"
            title="Buchen Sie eine Automis-Demo"
            className="w-full min-h-[600px] max-h-[700px] rounded-2xl border-0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
