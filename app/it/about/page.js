"use client";
import Counter from "@/components/Counter";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import { sliderProps } from "@/utility/sliderProps";
import Link from "next/link";
import Slider from "react-slick";
import {
  Sparkles,
  Target,
  Users,
  Handshake,
  TrendingUp,
  Brain,
  BarChart3,
  Shield,
  Heart,
  ArrowRight,
  Zap,
  Code2,
  Cpu,
} from "lucide-react";
import { useEffect, useRef } from "react";
import CTAButton from "@/components/CTAButton";

const page = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(115, 185, 254, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(115, 185, 254, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AkpagerLayout>
      {}
      <section className="hero-area hero-padding bg-deep-blue relative overflow-hidden">
        {}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-1"></div>

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{ pointerEvents: "none" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="px-4 lg:w-7/12">
              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-3 mb-8 bg-blue-middle/20 px-6 py-3 rounded-full backdrop-blur-sm border border-blue-middle/20"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                >
                  <Zap className="text-yellow-light w-5 h-5" />
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">
                    Alimentato dall’innovazione IA
                  </span>
                </div>

                <h1
                  className="hero-heading text-white mb-6 leading-tight"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-delay={100}
                >
                  Incontra le menti dietro
                  <br />
                  <span className="text-text-blue">l’innovazione Automis</span>
                </h1>

                <p
                  className="body-text text-white/90 leading-relaxed mb-10 max-w-2xl"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-delay={200}
                >
                  Due visionari uniti dalla passione per l’IA e per il marketing
                  performance. Insieme, stiamo costruendo il futuro della crescita
                  automatizzata per le aziende.
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-delay={300}
                >
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/automis-it"
                    variant="primary"
                    size="medium"
                    external={true}
                  >
                    Prenota una Call conoscitiva
                  </CTAButton>
                  <CTAButton
                    href="#our-story"
                    variant="ghost"
                    size="medium"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    La nostra storia
                  </CTAButton>
                </div>

                {}
                <div
                  className="flex flex-wrap gap-8 justify-start items-center"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-delay={400}
                >
                  <div>
                    <h3 className="sub-heading font-bold text-yellow-light mb-1">
                      98%
                    </h3>
                    <p className="small-text text-white/90">
                      Retention clienti
                    </p>
                  </div>
                  <div>
                    <h3 className="sub-heading font-bold text-yellow-light mb-1">
                      3x
                    </h3>
                    <p className="small-text text-white/90">ROI medio</p>
                  </div>
                  <div>
                    <h3 className="sub-heading font-bold text-yellow-light mb-1">
                      24/7
                    </h3>
                    <p className="small-text text-white/90">Supporto IA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 lg:w-5/12 mt-12 lg:mt-0">
              <div className="relative" data-aos="fade-left" data-aos-duration={1500}>
                {}
                <div className="absolute -top-4 md:-top-8 -left-4 md:-left-8 bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-4 md:p-6 rounded-2xl shadow-2xl about-hero-floating-card z-20 hidden sm:block hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <Code2 className="text-yellow-light w-6 md:w-8 h-6 md:h-8 mb-2" />
                  <h4 className="text-white font-semibold text-xs md:text-sm">
                    Modelli IA
                  </h4>
                  <p className="text-white/90 text-xs">50+ attivi</p>
                </div>

                <div className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-4 md:p-6 rounded-2xl shadow-2xl about-hero-floating-card z-20 hidden sm:block hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" style={{ animationDelay: "3s" }}>
                  <Cpu className="text-yellow-light w-6 md:w-8 h-6 md:h-8 mb-2" />
                  <h4 className="text-white font-semibold text-xs md:text-sm">
                    Potenza di calcolo
                  </h4>
                  <p className="text-white/90 text-xs">10TB+ al giorno</p>
                </div>

                {}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-middle/20 to-yellow-light/20 about-hero-glow"></div>
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
                    alt="Visualizzazione di rete IA con flussi di dati interconnessi e pattern tecnologici"
                    className="relative w-full h-auto rounded-3xl object-cover"
                    loading="lazy"
                  />

                  {}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="grid grid-cols-3 h-full">
                      <div className="border-r border-blue-middle/10"></div>
                      <div className="border-r border-blue-middle/10"></div>
                    </div>
                    <div className="absolute top-1/3 left-0 right-0 about-tech-grid-line"></div>
                    <div className="absolute top-2/3 left-0 right-0 about-tech-grid-line" style={{ animationDelay: "1.5s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-middle/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-yellow-light/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </section>
      {}

      {}
      <section id="our-story" className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          {}
          <div className="flex flex-wrap -mx-4 items-center mb-20 lg:mb-32">
            <div className="px-4 lg:w-1/2 mb-8 lg:mb-0">
              <div className="relative" data-aos="fade-right" data-aos-duration={1500}>
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=700&fit=crop"
                  alt="Team Automis che collabora in un ufficio moderno"
                  className="w-full h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute bottom-8 right-4 lg:-right-12 bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-6 lg:p-8 rounded-2xl shadow-xl hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <h3 className="sub-heading font-bold text-yellow-light mb-2">
                    <Counter end={3} />+
                  </h3>
                  <span className="body-text text-white/90">
                    Anni di eccellenza
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 lg:w-1/2">
              <div className="pl-0 lg:pl-12" data-aos="fade-left" data-aos-duration={1500}>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="text-yellow-light w-6 h-6" />
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">
                    La nostra storia
                  </span>
                </div>
                <h2 className="section-heading text-white font-medium mb-6">
                  Costruiamo il futuro del marketing guidato dall’IA
                </h2>
                <p className="body-text text-white/90 mb-4">
                  Automis nasce dalla convinzione che intelligenza artificiale e
                  competenza umana funzionino meglio insieme. Luca e Arcangelo
                  hanno visto che molte piccole imprese e startup volevano usare
                  l’IA, ma non avevano il metodo e il supporto giusto per farlo
                  davvero.
                </p>
                <p className="body-text text-white/90 mb-8">
                  Così hanno creato Automis per unire strumenti IA avanzati e
                  strategie marketing operative, rendendo semplice crescere e
                  innovare. Oggi siamo il ponte tra tecnologia all’avanguardia e
                  risultati concreti sul business.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="group flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                    <i className="far fa-check-circle text-yellow-light text-xl group-hover:scale-125 transition-transform"></i>
                    <span className="body-text text-white font-medium">
                      Soluzioni potenziate dall’IA
                    </span>
                  </div>
                  <div className="group flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                    <i className="far fa-check-circle text-yellow-light text-xl group-hover:scale-125 transition-transform"></i>
                    <span className="body-text text-white font-medium">
                      Competenza umana
                    </span>
                  </div>
                  <div className="group flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                    <i className="far fa-check-circle text-yellow-light text-xl group-hover:scale-125 transition-transform"></i>
                    <span className="body-text text-white font-medium">
                      Risultati provati
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="flex flex-wrap -mx-4 items-center mt-20 lg:mt-32">
            <div className="px-4 lg:w-1/2 mb-8 lg:mb-0 order-2 lg:order-1">
              <div className="pr-0 lg:pr-12" data-aos="fade-right" data-aos-duration={1500}>
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-yellow-light w-6 h-6" />
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">
                    La nostra mission
                  </span>
                </div>
                <h2 className="section-heading text-white font-medium mb-6">
                  Crescita concreta grazie all’innovazione
                </h2>
                <p className="body-text text-white/90 mb-4">
                  Aiutiamo aziende in crescita a usare dati e automazioni per
                  ottenere risultati misurabili.
                </p>
                <p className="body-text text-white/90 mb-12">
                  Traducendo tecnologie IA complesse in piani chiari e operativi,
                  ti liberiamo tempo per concentrarti sui clienti e accelerare la
                  crescita. Il nostro approccio unisce il meglio di due mondi:
                  le capacità IA più avanzate e il pensiero strategico e creativo
                  che solo le persone possono offrire.
                </p>
              </div>
            </div>
            <div className="px-4 lg:w-1/2 order-1 lg:order-2">
              <div className="relative" data-aos="fade-left" data-aos-duration={1500}>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-middle/20 to-yellow-light/20 rounded-3xl blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&h=600&fit=crop"
                  alt="Laboratorio di innovazione Automis con tecnologia IA all’avanguardia"
                  className="relative w-full h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute top-8 left-8 bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-6 rounded-2xl shadow-xl hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <h4 className="sub-heading text-yellow-light font-bold">24/7</h4>
                  <p className="small-text text-white/90">
                    Supporto IA disponibile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}

      {}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 justify-center mb-16">
            <div className="px-4 xl:w-7/12 lg:w-3/4">
              <div className="text-center" data-aos="fade-up" data-aos-duration={1500}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Shield className="text-yellow-light w-6 h-6" />
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">
                    Valori fondamentali
                  </span>
                </div>
                <h2 className="section-heading text-white font-medium">
                  I principi che guidano <br /> tutto ciò che facciamo
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="px-4 xl:w-1/4 lg:w-1/3 sm:w-1/2 mb-8" data-aos="fade-up" data-aos-duration={1000}>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full text-center hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300 mx-auto">
                  <Brain className="w-8 h-8 text-blue-middle group-hover:text-yellow-light" />
                </div>
                <h4 className="card-heading text-white mb-3">
                  Innovazione continua
                </h4>
                <p className="body-text text-white/90">
                  Sperimentiamo costantemente i modelli di IA più recenti e le
                  piattaforme marketing per farti restare sempre un passo avanti.
                </p>
              </div>
            </div>

            <div className="px-4 xl:w-1/4 lg:w-1/3 sm:w-1/2 mb-8" data-aos="fade-up" data-aos-delay={100} data-aos-duration={1000}>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full text-center hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300 mx-auto">
                  <BarChart3 className="w-8 h-8 text-blue-middle group-hover:text-yellow-light" />
                </div>
                <h4 className="card-heading text-white mb-3">
                  Decisioni guidate dai dati
                </h4>
                <p className="body-text text-white/90">
                  Ogni strategia nasce da metriche reali e analisi approfondite:
                  zero supposizioni.
                </p>
              </div>
            </div>

            <div className="px-4 xl:w-1/4 lg:w-1/3 sm:w-1/2 mb-8" data-aos="fade-up" data-aos-delay={200} data-aos-duration={1000}>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full text-center hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300 mx-auto">
                  <Users className="w-8 h-8 text-blue-middle group-hover:text-yellow-light" />
                </div>
                <h4 className="card-heading text-white mb-3">
                  Collaborazione tra persone e IA
                </h4>
                <p className="body-text text-white/90">
                  Uniamo creatività umana ed efficienza della macchina per
                  ottenere risultati migliori.
                </p>
              </div>
            </div>

            <div className="px-4 xl:w-1/4 lg:w-1/3 sm:w-1/2 mb-8" data-aos="fade-up" data-aos-delay={300} data-aos-duration={1000}>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full text-center hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300 mx-auto">
                  <Handshake className="w-8 h-8 text-blue-middle group-hover:text-yellow-light" />
                </div>
                <h4 className="card-heading text-white mb-3">
                  Trasparenza e integrità
                </h4>
                <p className="body-text text-white/90">
                  Dalla prima call ai report mensili, manteniamo comunicazione
                  chiara e aspettative allineate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}

      {}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 justify-center">
            <div className="px-4 xl:w-2/3 lg:w-3/4">
              <div className="text-center" data-aos="fade-up" data-aos-duration={1500}>
                <i className="fas fa-quote-left text-yellow-light text-6xl opacity-30 mb-8 block"></i>
                <h2 className="section-heading text-white font-light italic leading-relaxed mb-8">
                  "La nostra mission è rendere l’IA sofisticata accessibile e
                  applicabile, trasformando insight in impatto e click in
                  clienti."
                </h2>
                <p className="sub-heading text-yellow-light font-semibold">
                  — Il team Automis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}

      {}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 justify-center mb-16">
            <div className="px-4 xl:w-7/12 lg:w-3/4">
              <div className="text-center" data-aos="fade-up" data-aos-duration={1500}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Users className="text-yellow-light w-6 h-6" />
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">
                    Leadership
                  </span>
                </div>
                <h2 className="section-heading text-white font-medium mb-4">
                  I founder
                </h2>
                <p className="body-text text-white/90">
                  Le persone dietro Automis, con l’obiettivo di far funzionare
                  davvero l’IA per il tuo business.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4 justify-center">
            <div className="px-4 lg:w-1/3 md:w-1/2 mb-8">
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-yellow-light/30 transition-all duration-300 group hover:transform hover:scale-105 h-full flex flex-col" data-aos="fade-up" data-aos-duration={1000}>
                <div className="p-8 text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src="/assets/images/headshots/luca.jpeg"
                      alt="Vincenzo Luca Casillo - Co-founder ed esperto di digital marketing in Automis"
                      className="w-60 h-60 rounded-full object-cover object-top border-4 border-bright-blue group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <a
                      href="https://www.linkedin.com/in/vincenzo-luca-casillo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 w-12 h-12 bg-bright-blue text-white rounded-full flex items-center justify-center hover:bg-warm-yellow hover:text-blue-darkest transition-all duration-300 shadow-lg"
                      aria-label="Profilo LinkedIn di Luca Casillo"
                    >
                      <i className="fab fa-linkedin-in text-xl"></i>
                    </a>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Vincenzo Luca Casillo
                  </h3>
                  <p className="text-bright-blue font-medium mb-4">
                    Esperto di digital marketing e IA 
                  </p>
                  <p className="text-base text-white/90 font-open-sans leading-relaxed">
                    Fa crescere le aziende creando sistemi IA ad alta conversione e funnel ottimizzati che trasformano i click in clienti.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4 lg:w-1/3 md:w-1/2 mb-8">
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-yellow-light/30 transition-all duration-300 group hover:transform hover:scale-105 h-full flex flex-col" data-aos="fade-up" data-aos-delay={100} data-aos-duration={1000}>
                <div className="p-8 text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src="/assets/images/headshots/arcangelo.jpeg"
                      alt="Arcangelo Bianco - Co-founder ed esperto di advertising in Automis"
                      className="w-60 h-60 rounded-full object-cover object-top border-4 border-bright-blue group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <a
                      href="https://www.linkedin.com/in/biancoarcangelo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 w-12 h-12 bg-bright-blue text-white rounded-full flex items-center justify-center hover:bg-warm-yellow hover:text-blue-darkest transition-all duration-300 shadow-lg"
                      aria-label="Profilo LinkedIn di Arcangelo Bianco"
                    >
                      <i className="fab fa-linkedin-in text-xl"></i>
                    </a>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Arcangelo Bianco
                  </h3>
                  <p className="text-bright-blue font-medium mb-4">
                    Esperto di advertising
                  </p>
                  <p className="text-base text-white/90 font-open-sans leading-relaxed">
                    Si occupa di creare e scalare strategie ADV che massimizzano il ROI su Google, Meta e altre piattaforme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}

      {}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="px-4 lg:w-2/3">
              <div data-aos="fade-right" data-aos-duration={1500}>
                <h2 className="section-heading text-white font-medium mb-4">
                  Pronto a trasformare il tuo business?
                </h2>
                <p className="body-text text-white/90 mb-0">
                  Se vuoi sbloccare il pieno potenziale dell’IA per la tua
                  azienda,{" "}
                  <span className="font-semibold">
                    Prenota una Call conoscitiva
                  </span>
                  .
                </p>
              </div>
            </div>
            <div className="px-4 lg:w-1/3 lg:text-right">
              <div className="mt-8 lg:mt-0" data-aos="fade-left" data-aos-duration={1500}>
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/automis-it"
                  variant="primary"
                  size="large"
                  external={true}
                >
                  Prenota una Call conoscitiva
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
    </AkpagerLayout>
  );
};
export default page;