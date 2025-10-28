"use client";

import CTAButton from "@/components/CTAButton";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="bgs-cover bg-bg-primary relative block hero-padding"
      style={{ background: "url(assets/images/backgrounds/b-image.jpg)" }}
      id="hero"
    >
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      {/* --- Gradient overlay (above background, below content) --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary pointer-events-none z-20"></div>

      {/* --- Main content --- */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="text-center max-w-4xl mx-auto">
          <span
            className="inline-flex items-center gap-2 bg-blue-darkest/30 backdrop-blur-lg text-blue-middle px-6 py-3 rounded-xl small-text font-medium mb-6 border border-blue-middle/20"
            data-aos="fade-up"
            data-aos-duration={1200}
          >
            <i className="fas fa-robot" />
            Benvenuto in Automis Italia
          </span>

          <h1
            className="hero-heading mb-6"
            data-aos="fade-up"
            data-aos-delay={100}
            data-aos-duration={1500}
          >
            <span className="text-white">
              Il Tuo Assistente Vocale <br className="hidden md:block" />
              <span className="text-text-blue">
                Intelligente che Lavora 24/7
              </span>
            </span>
          </h1>

          <p
            className="sub-heading text-white/90 mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay={200}
            data-aos-duration={1500}
          >
            Trasforma ogni chiamata in un'opportunità. La nostra intelligenza
            artificiale vocale gestisce lead,
            <br className="hidden md:block" />
            qualifica clienti e prenota appuntamenti mentre tu ti concentri
            sulla crescita del tuo business.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay={300}
            data-aos-duration={1500}
          >
            <CTAButton
              href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
              external={true}
              variant="primary"
              size="large"
              icon="fas fa-phone"
            >
              Prova Gratis per 14 Giorni
            </CTAButton>
          </div>

          <div
            className="mt-6 flex flex-wrap justify-center gap-6 text-white/80 text-sm md:text-base font-medium"
            data-aos="fade-up"
            data-aos-delay={400}
            data-aos-duration={1500}
          >
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-yellow-light"></i>
              <span>Configurazione in 72 ore</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-yellow-light"></i>
              <span>Conforme GDPR</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-yellow-light"></i>
              <span>Supporto in italiano</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
