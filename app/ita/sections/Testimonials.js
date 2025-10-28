"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import CTAButton from "@/components/CTAButton";

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
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

  const testimonials = [
    {
      rating: 5,
      text: "In 6 mesi abbiamo riattivato lead per €754.000. L'AI chiama meglio del mio team.",
      author: "Marco Rossi — CEO, Immobiliare Milano",
      delay: 100,
    },
    {
      rating: 5,
      text: "Zero chiamate perse. I pazienti prenotano anche alle 23:00. Revenue +€6K al mese.",
      author: "Dott.ssa Giulia Bianchi — Studio Dentistico Roma",
      delay: 200,
    },
    {
      rating: 5,
      text: "Abbiamo eliminato il 40% dei no-show. L'AI gestisce 200 prenotazioni/settimana.",
      author: "Luca Ferrara — Ristorante Napoli",
      delay: 300,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-bg-primary text-white relative overflow-hidden"
    >
      {/* --- Background + overlay --- */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Headline */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-snug">
            Aziende Italiane che si Fidano di Noi
          </h2>
          <p className="text-blue-light/80 max-w-2xl mx-auto text-base md:text-lg">
            Scopri come le imprese italiane stanno già rivoluzionando il modo di
            gestire i clienti con Automis Voice AI.
          </p>
        </div>

        {/* --- Glass Testimonials --- */}
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
              {/* Stars */}
              <div className="flex justify-center mb-4 text-yellow-light">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-current text-yellow-light"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/90 text-lg italic mb-4 leading-relaxed text-center">
                “{item.text}”
              </p>

              {/* Author */}
              <p className="font-semibold text-yellow-light text-center">
                {item.author}
              </p>
            </div>
          ))}
        </div>

        {/* --- CTA --- */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CTAButton
            href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
            external={true}
            variant="primary"
            size="large"
            icon="fas fa-calendar"
          >
            Prenota la tua Demo Gratuita
          </CTAButton>
        </div>

        {/* --- Embedded Calendar --- */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <iframe
            src="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
            title="Prenota una demo Automis"
            className="w-full h-[700px] rounded-2xl "
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
