"use client";

import CTAButton from "@/components/CTAButton";

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
            Bienvenue chez Automis France
          </span>

          <h1
            className="hero-heading mb-6"
            data-aos="fade-up"
            data-aos-delay={100}
            data-aos-duration={1500}
          >
            <span className="text-white">
              Votre Assistant Vocal <br className="hidden md:block" />
              <span className="text-text-blue">
                Intelligent qui Travaille 24/7
              </span>
            </span>
          </h1>

          <p
            className="sub-heading text-white/90 mb-8 leading-relaxed tracking-tight"
            data-aos="fade-up"
            data-aos-delay={200}
            data-aos-duration={1500}
          >
            Transformez chaque appel en opportunité. Notre intelligence
            artificielle vocale gère les leads, qualifie
            <br className="hidden md:block" />
            les clients et planifie les rendez-vous pendant que vous vous
            concentrez sur la croissance de votre entreprise.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay={300}
            data-aos-duration={1500}
          >
            <CTAButton
              href="https://api.leadconnectorhq.com/widget/bookings/automis-fr"
              external={true}
              variant="primary"
              size="large"
              icon="fas fa-phone"
            >
              Essai Gratuit de 14 Jours
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
              <span>Configuration en 72 heures</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-yellow-light"></i>
              <span>Conforme au RGPD</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-yellow-light"></i>
              <span>Assistance en français</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
