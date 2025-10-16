"use client";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import CTAButton from "@/components/CTAButton";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import { caseStudies } from "@/data/caseStudies";
import "@/styles/use-cases.css";

const UseCasesPage = () => {
  return (
    <AkpagerLayout>
      {}
      <section className="hero-padding bg-bg-primary relative overflow-hidden flex items-center justify-center min-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-section-dark opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-section-dark/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {}
            {}

            <h1
              className="hero-heading text-white mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Tailored AI Solutions {' '}
              <br/>
              <span className=" text-text-blue">
                for Every Industry
              </span>
            </h1>

            <p
              className="sub-heading text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="300"
            >
Discover how our Voice AI, automation tools, and ad campaigns revolutionize lead generation, appointment scheduling, recruitment, and overall business operations
            </p>

            {}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12"
            >
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
                <div className="section-heading text-yellow-light mb-3 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="small-text text-white/90">Businesses Transformed</div>
              </div>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="500" data-aos-duration="800">
                <div className="section-heading text-yellow-light mb-3 group-hover:scale-110 transition-transform duration-300">€2M+</div>
                <div className="small-text text-white/90">Revenue Generated</div>
              </div>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="600" data-aos-duration="800">
                <div className="section-heading text-yellow-light mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="small-text text-white/90">AI Availability</div>
              </div>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="700" data-aos-duration="800">
                <div className="section-heading text-yellow-light mb-3 group-hover:scale-110 transition-transform duration-300">47%</div>
                <div className="small-text text-white/90">Cost Reduction</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {}
      <section className="section-padding bg-bg-primary">
        <CaseStudyGrid caseStudies={caseStudies} />
      </section>

      {}
      <section className="section-padding bg-bg-primaryrelative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2
              className="section-heading font-medium text-section-dark mb-5"
              data-aos="fade-up"
            >
              Ready to Transform Your Business?
            </h2>
            <p
              className="sub-heading text-white mb-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Join hundreds of businesses achieving extraordinary results with AI-powered automation
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
                Book Discovery Call
              </CTAButton>


            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default UseCasesPage;