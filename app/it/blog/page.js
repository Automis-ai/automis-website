import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localizePath } from "@/utility/pathnames";
import { getCtaHref } from "@/utility/ctaLinks";

const page = () => {
    const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  return (
    <AkpagerLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-bg-primary hero-padding">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span
              className="inline-flex items-center gap-2 bg-blue-darkest/30 backdrop-blur-lg text-blue-middle px-6 py-3 rounded-xl small-text font-medium mb-6 border border-blue-middle/20"
              data-aos="fade-up"
              data-aos-duration={1500}
            >
              <i className="fas fa-blog" />
              Articoli & Aggiornamenti
            </span>

            <h1
              className="hero-heading mb-6"
              data-aos="fade-up"
              data-aos-delay={100}
              data-aos-duration={1500}
            >
              <span className="text-white">Scopri le nostre</span>{" "}
              <span className="text-text-blue">ultime novità</span>
            </h1>

            <p
              className="sub-heading text-white/90 mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={1500}
            >
              Esplora articoli su marketing potenziato dall’AI, strategie di automazione
              e <br /> tattiche di crescita per trasformare il tuo business
            </p>

            <div
              className="flex flex-wrap gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={1500}
            >
              <CTAButton
href={getCtaHref("booking", locale)}
                external={true}
                variant="ghost"
                size="medium"
                icon="fas fa-bell"
              >
                Iscriviti alla Newsletter
              </CTAButton>
            </div>
          </div>
        </div>

        {/* background blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-middle/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-lightest/5 rounded-full filter blur-3xl"></div>
        </div>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary pointer-events-none"></div>

        {/* subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url(assets/images/backgrounds/wave-shape.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </section>

      {/* POSTS */}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            {/* LEFT: posts */}
            <div className="px-4 lg:w-2/3">
              <div className="space-y-8">
                {/* Post 1 */}
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-duration={800}
                  data-aos-delay={100}
                  data-aos-offset={50}
                >
                  <div className="relative overflow-hidden h-80">
                    <img
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
                      alt="Automazioni AI per aziende - Scala senza aumentare lo staff"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <ul className="flex flex-wrap items-center gap-4 mb-4">
                      <li>
                        <a
                          className="px-3 py-1 bg-blue-middle/20 text-blue-middle rounded-full hover:bg-yellow-light/20 hover:text-yellow-light transition-all duration-300"
                          href="#"
                        >
                          Automazione AI
                        </a>
                      </li>
                      <li className="block items-center gap-2 text-white/90">
                        <i className="far fa-calendar-alt" />
                        <a
                          href="#"
                          className="ml-2 hover:text-blue-middle transition-all duration-300"
                        >
                          Gennaio 2025
                        </a>
                      </li>
                    </ul>
                    <h3 className="card-heading font-medium mb-4 max-w-7xl mx-auto">
<Link
  href={localizePath("/blog/ai-automations", locale)}
  className="text-white hover:text-yellow-light transition-all duration-300"
>
                      >
                        Automazioni AI <br /> Scala senza aumentare lo staff
                      </Link>
                    </h3>
                    <p className="body-text text-white/90 mb-6 leading-relaxed">
                      Le automazioni AI collegano CRM, calendario, ads e strumenti di comunicazione
                      in un unico sistema. Risparmi ore ogni settimana, riduci gli errori e scali più
                      velocemente con processi intelligenti.
                    </p>
<Link
  href={localizePath("/blog/ai-automations", locale)}
  className="inline-flex items-center gap-2 text-blue-middle hover:text-yellow-light transition-all duration-300 font-medium group"
>
                      Leggi di più{" "}
                      <i className="far fa-arrow-right transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Post 2 */}
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-duration={800}
                  data-aos-delay={200}
                  data-aos-offset={50}
                >
                  <div className="relative overflow-hidden h-80">
                    <img
                      src="https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=800&h=600&fit=crop"
                      alt="Receptionist Voice AI – Risposta 24/7 e prenotazioni"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <ul className="flex flex-wrap items-center gap-4 mb-4">
                      <li>
                        <a
                          className="px-3 py-1 bg-blue-middle/20 text-blue-middle rounded-full hover:bg-yellow-light/20 hover:text-yellow-light transition-all duration-300"
                          href="#"
                        >
                          Voice AI
                        </a>
                      </li>
                      <li className="block items-center gap-2 text-white/90">
                        <i className="far fa-calendar-alt" />
                        <a
                          href="#"
                          className="ml-2 hover:text-blue-middle transition-all duration-300"
                        >
                          Gennaio 2025
                        </a>
                      </li>
                    </ul>
                    <h3 className="card-heading font-medium mb-4">
                      <Link
href={localizePath("/blog/voice-ai-receptionists", locale)}
                        className="text-white hover:text-yellow-light transition-all duration-300"
                      >
                        Receptionist Voice AI <br /> Il futuro di chiamate e prenotazioni
                      </Link>
                    </h3>
                    <p className="body-text text-white/90 mb-6 leading-relaxed">
                      Scopri come i receptionist Voice AI rispondono 24/7, qualificano i lead e
                      aumentano le prenotazioni. Niente più chiamate perse: il tuo “front desk” non
                      si ferma mai.
                    </p>
                    <Link
href={localizePath("/blog/voice-ai-receptionists", locale)}
                      className="inline-flex items-center gap-2 text-blue-middle hover:text-yellow-light transition-all duration-300 font-medium group"
                    >
                      Leggi di più{" "}
                      <i className="far fa-arrow-right transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Post 3 */}
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-duration={800}
                  data-aos-delay={300}
                  data-aos-offset={50}
                >
                  <div className="relative overflow-hidden h-80">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                      alt="Paid Ads ottimizzate con AI | Campagne più smart, più appuntamenti"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <ul className="flex flex-wrap items-center gap-4 mb-4">
                      <li>
                        <a
                          className="px-3 py-1 bg-blue-middle/20 text-blue-middle rounded-full hover:bg-yellow-light/20 hover:text-yellow-light transition-all duration-300"
                          href="#"
                        >
                          Paid Ads
                        </a>
                      </li>
                      <li className="block items-center gap-2 text-white/90">
                        <i className="far fa-calendar-alt" />
                        <a
                          href="#"
                          className="ml-2 hover:text-blue-middle transition-all duration-300"
                        >
                          Gennaio 2025
                        </a>
                      </li>
                    </ul>
                    <h3 className="card-heading font-medium mb-4">
                      <Link
href={localizePath("/blog/ai-optimized-paid-ads", locale)}
                        className="text-white hover:text-yellow-light transition-all duration-300"
                      >
                        Paid Ads ottimizzate con AI <br /> Dai click agli appuntamenti
                      </Link>
                    </h3>
                    <p className="body-text text-white/90 mb-6 leading-relaxed">
                      Campagne pubblicitarie potenziate dall’AI: ottimizziamo bidding, creatività e
                      follow-up per trasformare il budget in chiamate prenotate — non solo lead.
                    </p>
                    <Link
href={localizePath("/blog/ai-optimized-paid-ads", locale)}
                      className="inline-flex items-center gap-2 text-blue-middle hover:text-yellow-light transition-all duration-300 font-medium group"
                    >
                      Leggi di più{" "}
                      <i className="far fa-arrow-right transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: CTA */}
            <div className="px-4 lg:w-1/3">
              <div className="space-y-8 mt-0 lg:mt-0">
                <div
                  className="relative bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-8 rounded-2xl overflow-hidden hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-left"
                  data-aos-delay={400}
                  data-aos-duration={800}
                  data-aos-offset={50}
                >
                  <h3 className="sub-heading font-medium text-white mb-4 relative z-10">
                    Pronto a trasformare il tuo business con l’AI?
                  </h3>
                  <p className="body-text text-white/90 mb-6 relative z-10">
                    Prenota una consulenza gratuita per scoprire come automazioni e Voice AI possono
                    aiutarti a scalare in modo più veloce ed efficiente.
                  </p>
                  <CTAButton
href={getCtaHref("booking", locale)}
                    external={true}
                    variant="primary"
                    size="medium"
                    icon="fas fa-angle-double-right"
                    className="relative z-10"
                  >
                    Prenota una Discovery Call
                  </CTAButton>

                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30">
                    <img
                      src="assets/images/widget/cta-man.png"
                      alt="Grafica promozionale call-to-action"
                      className="w-full h-full object-contain opacity-60"
                      loading="lazy"
                    />
                  </div>

                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "url(assets/images/widget/cta-bg.png)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default page;
