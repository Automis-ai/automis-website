"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import { caseStudies } from "@/data/caseStudies.it";
import CTAButton from "@/components/CTAButton";
import "@/styles/use-cases-sticky-fix.css";

const CaseStudyDetailPage = ({ params }) => {
  const caseStudy = caseStudies.find((study) => study.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <AkpagerLayout bodyClass="use-cases-detail-page">
      {}
      <section className="relative bg-bg-primary hero-padding overflow-hidden">
        {}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/95 to-bg-primary" />

        <div className="mx-auto relative z-10 container px-4">
          {}
          <nav className="mb-8" data-aos="fade-down">
            <Link
              href="/use-cases"
              className="inline-flex items-center text-yellow-light hover:text-yellow-dark transition-all duration-300"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Use Cases
            </Link>
          </nav>

          <div className="max-w-4xl">
            <span
              className="inline-block px-4 py-2 mb-6 small-text font-semibold text-bg-primary bg-yellow-light rounded-xl"
              data-aos="fade-up"
            >
              {caseStudy.industry}
            </span>

            <h1
              className="hero-heading text-white mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {caseStudy.title}
            </h1>

            <div
              className="flex flex-wrap gap-8 text-white/90 border-t border-border-light pt-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div>
                <div className="small-text text-white/90 uppercase tracking-wider mb-1">
                  Client
                </div>
                <div className="font-semibold text-white">
                  {caseStudy.client.name}
                </div>
              </div>
              <div>
                <div className="small-text text-white/90 uppercase tracking-wider mb-1">
                  Location
                </div>
                <div className="font-semibold text-white">
                  {caseStudy.client.location}
                </div>
              </div>
              <div>
                <div className="small-text text-white/90 uppercase tracking-wider mb-1">
                  Revenue
                </div>
                <div className="font-semibold text-white">
                  {caseStudy.client.revenue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {}
            <div className="lg:col-span-2">
              {}
              <div
                className="relative h-96 mb-12 overflow-hidden bg-blue-darkest/30 rounded-2xl"
                data-aos="fade-up"
              >
                <Image
                  src={caseStudy.heroImage}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>

              {}
              <div className="mb-16" data-aos="fade-up">
                <h2 className="section-heading font-medium text-white mb-2">
                  Il Problema
                </h2>
                <div className="w-20 h-1 bg-yellow-light mb-6 rounded-full"></div>
                <p className="body-text text-white/90 mb-6">
                  {caseStudy.challenge.description}
                </p>
                <ul className="space-y-4">
                  {caseStudy.challenge.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span className="body-text text-white/90">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {}
              <div className="mb-16" data-aos="fade-up">
                <h2 className="section-heading font-medium text-white mb-2">
                  La nostra Soluzione
                </h2>
                <div className="w-20 h-1 bg-yellow-light mb-8 rounded-full"></div>
                {caseStudy.solution.phases.map((phase, phaseIndex) => (
                  <div key={phaseIndex} className="mb-10">
                    <h3 className="sub-heading font-medium text-yellow-light mb-4">
                      {phase.title}
                    </h3>
                    <ul className="space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                            <svg
                              className="w-3 h-3 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="body-text text-white/90">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {}
              <div className="mb-16" data-aos="fade-up">
                <h2 className="section-heading font-medium text-white mb-2">
                  {caseStudy.results.title}
                </h2>
                <div className="w-20 h-1 bg-yellow-light mb-8 rounded-full"></div>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-bg-primary">
                        <th className="text-left py-4 px-6 font-semibold text-white/90 small-text uppercase tracking-wider">
                          Metric
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-white/90 small-text uppercase tracking-wider">
                          Before
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-white/90 small-text uppercase tracking-wider">
                          After
                        </th>
                        <th className="text-right py-4 px-6 font-semibold text-yellow-light small-text uppercase tracking-wider">
                          Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {caseStudy.results.metrics.map((metric, index) => (
                        <tr
                          key={index}
                          className="border-t border-border-light"
                        >
                          <td className="py-4 px-6 body-text text-white/90">
                            {metric.label}
                          </td>
                          <td className="text-center py-4 px-4 text-white/90">
                            {metric.before}
                          </td>
                          <td className="text-center py-4 px-4 font-semibold text-white">
                            {metric.after}
                          </td>
                          <td className="text-right py-4 px-6 font-bold text-green-400">
                            {metric.improvement}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {}
                {caseStudy.results.highlights && (
                  <div className="mt-8 grid md:grid-cols-3 gap-4">
                    {caseStudy.results.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 text-center hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300"
                      >
                        <div className="sub-heading font-bold text-yellow-light">
                          {highlight}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {}
              <div
                className="bg-gradient-to-r from-blue-darkest/50 to-blue-darkest/30 backdrop-blur-lg border-l-4 border-yellow-light p-8 rounded-r-2xl"
                data-aos="fade-up"
              >
                <svg
                  className="w-10 h-10 text-yellow-light/20 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="sub-heading text-text-light italic mb-6">
                  {caseStudy.testimonial.quote}
                </blockquote>
                <div>
                  <div className="font-semibold text-white">
                    {caseStudy.testimonial.author}
                  </div>
                  <div className="body-text text-white/90">
                    {caseStudy.testimonial.title}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Dialog boxes */}
            <div className="lg:col-span-1 sticky-sidebar-container">
              <div className="sticky top-24 space-y-6">
                {/* Risultati Raggiunti */}
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-up"
                >
                  <h3 className="card-heading font-medium text-white mb-6 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-light"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Key Results
                  </h3>
                  <div className="mb-6 pb-6 border-b border-border-light">
                    <div className="section-heading font-bold text-yellow-light">
                      {caseStudy.primaryMetric}
                    </div>
                    <div className="body-text text-white/90">
                      {caseStudy.primaryMetricLabel}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {caseStudy.supportingMetrics.map((metric, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="small-text text-white/90">
                          {metric.label}
                        </span>
                        <span className="font-semibold text-white">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div
                  className="bg-[#F5CD79] p-8 rounded-2xl"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h3 className="sub-heading font-bold text-bg-primary mb-4">
                    Pronto ad ottenere risultati simili?
                  </h3>
                  <p className="body-text text-bg-primary/80 mb-6">
                    Vediamo come Automis può aiutarti a transfortmare il tuo business {" "}
                    {caseStudy.industry.toLowerCase()}
                  </p>
                  <a
                    href="/jumpstart-audit"
                    className="block w-full text-center px-6 py-3 text-yellow-light bg-bg-primary hover:bg-black rounded-xl transition-all duration-300 font-semibold"
                  >
                    Prenota la Call conoscitiva
                  </a>
                  <p className="small-text text-bg-primary/70 mt-4 text-center">
                    30 minuti di call senza impegno
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="bg-section-dark section-padding border-t border-border-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-heading font-medium text-white mb-4">
              Inizia la tua storia di successo oggi 
            </h2>
            <p className="body-text text-white/90 mb-8">
              Join {caseStudy.client.name} e centinaia di altri business
              che trasformano la loro attività con l'IA 
            </p>
            <CTAButton
              href="https://api.leadconnectorhq.com/widget/bookings/automis-it"
              variant="secondary"
              size="medium"
              external={true}
              className="w-fit"
            >
              Prenota la call 
            </CTAButton>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default CaseStudyDetailPage;
