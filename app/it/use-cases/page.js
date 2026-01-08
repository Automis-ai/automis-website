"use client";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import CTAButton from "@/components/CTAButton";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import { caseStudies } from "@/data/caseStudies.it";
import "@/styles/use-cases.css";

const UseCasesPage = () => {
  return (
    <AkpagerLayout>
      <section className="hero-padding bg-bg-primary relative overflow-hidden flex items-center justify-center min-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-section-dark opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-section-dark/50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1
              className="hero-heading text-white mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Soluzioni AI su misura{" "}
              <br />
              <span className=" text-text-blue">per ogni settore</span>
            </h1>

            <p
              className="sub-heading text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Scopri come i nostri Agenti Vocali AI, gli strumenti di automazione e le campagne pubblicitarie
              rivoluzionano la generazione di contatti, la prenotazione di appuntamenti, il recruiting
              e l’operatività complessiva del tuo business.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="800"
              >
                <div className="section-heading text-yellow-light mb-3 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="small-text text-white/90">Aziende trasformate</div>
              </div>

              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="800"
              >
                <div className="section-heading text-yellow-light mb-3 group-hover:scale-110 transition-transform duration-300">
                  €2M+
                </div>
                <div className="small-text text-white/90">Fatturato generato</div>
              </div>

              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay="600"
                data-aos-duration="800"
              >
                <div className="section-heading text-yellow-light mb-3 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="small-text text-white/90">Disponibilità dell’AI</div>
              </div>

              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay="700"
                data-aos-duration="800"
              >
                <div className="section-heading text-yellow-light mb-3 group-hover:scale-110 transition-transform duration-300">
                  47%
                </div>
                <div className="small-text text-white/90">Riduzione dei costi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-bg-primary">
        <CaseStudyGrid caseStudies={caseStudies} />
      </section>

      <section className="section-padding bg-bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2
              className="section-heading font-medium text-section-dark mb-5"
              data-aos="fade-up"
            >
              Pronto a trasformare il tuo business?
            </h2>

            <p className="sub-heading text-white mb-8" data-aos="fade-up" data-aos-delay="100">
              Unisciti a centinaia di aziende che stanno ottenendo risultati straordinari grazie
              all’automazione potenziata dall’AI.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <CTAButton
                href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                external={true}
                variant="secondary"
                size="large"
              >
                Prenota una call conoscitiva
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default UseCasesPage;