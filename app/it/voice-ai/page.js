"use client";
import dynamic from "next/dynamic";
import AkpagerAccordion from "@/components/AkpagerAccordion";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import { Tab, Nav } from "@/components/CustomTabs";
import { useEffect, useState, useRef } from "react";
import PricingSection from "./PricingSection";
import WaveformPlayer from "./WaveformPlayer";
import FreeTestCallForm from "./DemoForm";
import FAQSection from "@/components/FAQSection";
import CTAButton from "@/components/CTAButton";

const FixedCta = dynamic(() => import("./FixedCta"), {
  ssr: false,
});

const page = () => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("home-nine");
  }, []);
  const tabOneRef = useRef(null);
  const tabTwoRef = useRef(null);

  return (
    <AkpagerLayout header={8} footer={1} bodyClass={"home-nine"}>
      <style jsx>{`
        @media (max-width: 1023px) {
          .hero-text-align {
            text-align: center !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-text-align {
            text-align: left !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section id="home" className="hero-padding bg-deep-blue relative z-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div
                className="hero-content style-nine mb-100 lg:mb-0 hero-width hero-text-align"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
<h2
  data-aos="fade-up"
  data-aos-delay="50"
  data-aos-duration="1500"
  data-aos-offset="50"
  className="hero-heading !text-5xl text-white font-montserrat hero-text-align"
>
  {/* DESKTOP (md+): 2 righe fisse */}
  <span className="hidden md:block">
    <span className="block">
      Converti subito i tuoi <span className="text-text-blue">contatti</span>
    </span>
    <span className="block">
      in <span className="text-text-blue">appuntamenti</span>
    </span>
  </span>

  {/* MOBILE (<md): 3 righe fisse */}
  <span className="block md:hidden">
    <span className="block">Converti subito i</span>
    <span className="block">
      tuoi <span className="text-text-blue">contatti</span>
    </span>
    <span className="block">
      in <span className="text-text-blue">appuntamenti</span>
    </span>
  </span>
</h2>

                <p
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                  className="sub-heading text-white/90 mb-4 max-w-xl mt-2"
                >
                  Qualifica i lead, fissa appuntamenti e supporta i tuoi clienti
                  24/7, con Agenti Vocali avanzati di IA.
                </p>

                <div className="flex justify-center lg:justify-start">
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/automis-it"
                    variant="secondary"
                    size="medium"
                    external={true}
                    className="w-fit mt-8"
                  >
                    Prenota una Call 
                  </CTAButton>
                </div>
              </div>
            </div>

            <div
              className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0"
              data-aos="fade-up"
              data-aos-delay={100}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="hero-nine-image relative mx-auto w-full max-w-[500px] lg:max-w-[600px]">
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 rounded-full border border-border-light"></div>
                  <div className="absolute inset-[15%] rounded-full border border-border-light"></div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] max-w-[350px]">
                    <WaveformPlayer />
                  </div>

                  <div className="shapes">
                    <div
                      className="shape one absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{ top: "8%", left: "8%" }}
                      data-aos="zoom-in-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/shapes/hero-nine6-old.png"
                        alt="Elemento decorativo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape two absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{ top: "8%", right: "8%" }}
                      data-aos="zoom-in-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/shapes/hero-nine2.png"
                        alt="Elemento decorativo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape three absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{
                        top: "50%",
                        left: "-2%",
                        transform: "translateY(-50%)",
                      }}
                      data-aos="zoom-in-left"
                      data-aos-delay={100}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/shapes/hero-nine3.png"
                        alt="Elemento decorativo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape four absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{
                        top: "50%",
                        right: "-2%",
                        transform: "translateY(-50%)",
                      }}
                      data-aos="zoom-in-right"
                      data-aos-delay={100}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/shapes/hero-nine4.png"
                        alt="Elemento decorativo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape five absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{ bottom: "15%", left: "5%" }}
                      data-aos="zoom-in-left"
                      data-aos-delay={200}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/shapes/hero-nine5.png"
                        alt="Elemento decorativo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape six absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{ bottom: "15%", right: "5%" }}
                      data-aos="zoom-in-right"
                      data-aos-delay={200}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/shapes/hero-nine6.png"
                        alt="Elemento decorativo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-nine-shapes">
          <div className="shape one">
            <img
              src="/assets/images/shapes/hero-nine.png"
              alt="Forma decorativa di sfondo"
              loading="lazy"
              className="!bg-transparent"
            />
          </div>
          <div className="shape two">
            <img
              src="/assets/images/shapes/hero-nine.png"
              alt="Forma decorativa di sfondo"
              loading="lazy"
              className="!bg-transparent"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center">
            <div
              className="w-full xl:w-7/12 lg:w-9/12 md:w-11/12"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="text-center mb-12">
                <span className="text-yellow-light font-semibold mb-3 block small-text">
                  <i className="flaticon-layers" /> Perché Automis?
                </span>
                <h2
                  className="section-heading text-white"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  Gestisci lead e prenotazioni senza stress con assistenza AI
                  24/7
                </h2>
              </div>
            </div>
          </div>

          <Tab.Container defaultActiveKey="tabTwo1">
            <div
              className="flex justify-center"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="w-full lg:w-10/12 flex justify-center">
                <Nav
                  as="ul"
                  className="nav advanced-tab mb-12 flex"
                  role="tablist"
                >
                  <Nav.Item as="li">
                    <Nav.Link as="button" eventKey="tabTwo1">
                      OUTBOUND
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link as="button" eventKey="tabTwo3">
                      INBOUND
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>

            <Tab.Content>
              {/* OUTBOUND */}
              <Tab.Pane
                ref={tabOneRef}
                eventKey="tabTwo1"
                className="tab-pane fade"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between max-w-6xl mx-auto">
                  <div className="w-full lg:w-[60%] mb-8 lg:mb-0 order-1 lg:order-1">
                    <div
                      className="content pr-0 lg:pr-12 text-center lg:!text-left"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <div className="mb-6">
                        <h3 className="sub-heading text-white text-center lg:!text-left">
                          Chiama subito tutti i lead generati e trasformali in
                          appuntamenti
                        </h3>
                      </div>

                      <p className="body-text text-white/90 mb-8 text-center lg:!text-left">
                        Risparmia tempo con una pianificazione efficiente e
                        concentrati su chiudere più vendite e far crescere il
                        business.
                      </p>

                      <ul className="space-y-3 mb-8 text-center lg:!text-left">
                        <li className="flex items-center justify-center lg:justify-start body-text text-text-light">
                          <i className="fal fa-check text-yellow-light mr-3" />{" "}
                          Aumenta il tasso di prenotazione appuntamenti del 18%
                        </li>
                        <li className="flex items-center justify-center lg:justify-start body-text text-text-light">
                          <i className="fal fa-check text-yellow-light mr-3" />{" "}
                          Meno tempo sprecato grazie a una gestione smart
                          dell’agenda
                        </li>
                      </ul>

                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/automis-it"
                        variant="primary"
                        size="small"
                        external={true}
                      >
                        Prenota una Call
                      </CTAButton>
                    </div>
                  </div>

                  <div className="w-full lg:w-[40%] order-2 lg:order-2">
                    <div
                      className="flex justify-center lg:justify-end !bg-transparent"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/tabs/tab-two.png"
                        alt="Assistente vocale AI per chiamate outbound"
                        className="w-full max-w-[350px] rounded-lg hidden lg:block"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              {/* INBOUND */}
              <Tab.Pane
                ref={tabTwoRef}
                eventKey="tabTwo3"
                className="tab-pane fade"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between  max-w-6xl mx-auto">
                  <div className="w-full lg:w-[60%] mb-8 lg:mb-0 order-1 lg:order-1">
                    <div className="content pr-0 lg:pr-12 text-center lg:!text-left">
                      <div className="mb-6">
                        <h3 className="sub-heading text-white text-center lg:!text-left">
                          La tua receptionist AI disponibile 24/7 per gestire
                          prenotazioni e richieste
                        </h3>
                      </div>

                      <p className="body-text text-white/90 mb-8 text-center lg:!text-left">
                        Gestisci le prenotazioni in modo semplice e rispondi alle
                        domande dei clienti, così puoi concentrarti sulla
                        crescita e sulla soddisfazione del cliente.
                      </p>

                      <ul className="space-y-3 mb-8 text-center lg:!text-left">
                        <li className="flex items-center justify-center lg:justify-start body-text text-text-light">
                          <i className="fal fa-check text-yellow-light mr-3" />{" "}
                          Gestione automatizzata delle prenotazioni 24/7
                        </li>
                        <li className="flex items-center justify-center lg:justify-start body-text text-text-light">
                          <i className="fal fa-check text-yellow-light mr-3" />{" "}
                          Risposte rapide alle richieste dei clienti
                        </li>
                      </ul>

                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/automis-it"
                        variant="primary"
                        size="small"
                        external={true}
                      >
                        Prenota una Call
                      </CTAButton>
                    </div>
                  </div>

                  <div className="w-full lg:w-[40%] order-2 lg:order-2">
                    <div className="hidden lg:flex justify-center lg:justify-end !bg-transparent">
                      <img
                        src="/assets/images/tabs/tab-inbound.png"
                        alt="Receptionsit AI per chiamate inbound e prenotazioni"
                        className="w-full max-w-[350px] rounded-lg hidden lg:block"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        id="cases"
        className="section-padding bg-bg-primary relative z-20"
        style={{
          backgroundImage: "url(/assets/images/backgrounds/wave-shape.png)",
        }}
      >
        <div className="max-w-7xl container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full xl:w-3/4 lg:w-11/12">
              <div
                className="text-center mb-12"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <h2 className="section-heading text-white mb-4">
                  Settori <br className="sm:hidden" /> che serviamo
                </h2>
                <p className="sub-heading text-white/90">
                  Automis AI è progettato per qualsiasi attività, basata su
                  appuntamenti, che non può permettersi di perdere chiamate.
                  Il nostro Agente Vocale AI si integra con calendario e
                  CRM esistenti per convertire ogni lead in un appuntamento
                  confermato 24/7, in oltre 20 lingue.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-10">
            <div className="flex flex-wrap justify-center -mx-4">
              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/tooth.svg"
                        alt="Icona settore dentale e sanitario"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Cliniche Mediche 
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Risposta alle chiamate 24/7 e prenotazione appuntamenti
                      completamente automatizzata
                      <br /> Gestione dati paziente con configurazioni GDPR pronte all uso. 
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/house.svg"
                        alt="Icona settore home services"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Pronto Intervento H24
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Gestione chiamate urgenti per idraulici, elettricisti, spurgo, gas e fabbro
                      <br />
                      Sincronizzazione calendario in tempo reale
                      per massimizzare l’utilizzo dei tecnici
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/houses.svg"
                        alt="Icona settore immobiliare"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                     Immobiliare
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Prenotazione visite anche fuori orario per ogni richiesta generata. 
                      <br />
                      Chiamate e richieste inoltate tempestivamente agli agenti di zona 
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/hand.svg"
                        alt="Icona settore beauty e wellness"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Beauty & Wellness
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Prenotazioni smart e automatizzate per saloni, spa e
                      cliniche medico-estetiche
                      <br />
                      Riduzione no-show con conferme via chiamata/SMS
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/car.svg"
                        alt="Icona settore automotive e riparazioni"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Concessionarie & Riparazioni
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Gestione chiamate per soccorso, revisioni, manutenzione e
                      riparazioni urgenti
                      <br />
                      Ottimizzazione dinamica degli slot per aumentare la
                      produttività dell’officina
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/handshake.svg"
                        alt="Icona partnership white-label e agenzie"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      White-Label & Agenzie
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Agenti Ai e Dashobard, completamente brandizzabili da
                      rivendere con il tuo nome
                      <br />
                      Integrazione rapida dell IA ed
                      introti extra sul servizio offerto
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD / ANALYTICS */}
      <section
        id="analytics"
        className="section-padding bg-section-dark"
        style={{ backgroundImage: "url(/assets/images/backgrounds/tab.png)" }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center text-center">
            <div
              className="w-full xl:w-2/3 lg:w-3/4 md:w-11/12"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="mb-12" data-aos="fade-up" data-aos-duration="800">
                <h2 className="section-heading text-white text-center mb-6">
                  Controllo totale con la nostra{" "}
                  <span className="text-yellow-light">dashboard</span>
                </h2>
                <p className="sub-heading text-white/90 text-center">
                  Accedi a una dashboard analytics personalizzata per tracciare
                  le chiamate, misurare le performance e monitorare tutta
                  l’attività in tempo reale. Tutto in un unico posto, in modo
                  semplice.
                </p>
              </div>
            </div>
          </div>

          <Tab.Container defaultActiveKey={"tabThree1"}>
            <Nav
              as={"ul"}
              className="nav advanced-tab style-three mt-12 mb-16 flex flex-wrap justify-center"
              role="tablist"
            >
              <Nav.Item
                as={"li"}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-offset="50"
              >
                <Nav.Link as={"button"} eventKey="tabThree1">
                  <span className="icon">
                    <i className="far fa-phone-alt" />
                  </span>
                  <span>Monitora tutta l’attività</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item
                as={"li"}
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
                data-aos-offset="50"
              >
                <Nav.Link as={"button"} eventKey="tabThree2">
                  <span className="icon">
                    <i className="far fa-sack-dollar" />
                  </span>
                  <span>Traccia i log delle chiamate</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item
                as={"li"}
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="1000"
                data-aos-offset="50"
              >
                <Nav.Link as={"button"} eventKey="tabThree3">
                  <span className="icon">
                    <i className="far fa-chart-line" />
                  </span>
                  <span>Misura le performance</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content className="tab-content">
              <Tab.Pane className="tab-pane fade" eventKey="tabThree1">
                <div className="flex flex-wrap items-center justify-around">
                  <div className="w-full xl:w-1/3 lg:w-5/12 mb-8 lg:mb-0 order-1 lg:order-1">
                    <div
                      className="content pr-0 lg:pr-8 text-center lg:!text-left"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <div className="mb-5">
                        <h3 className="sub-heading text-white text-2xl md:text-3xl">
                          Rimani aggiornato con il monitoraggio in tempo reale
                        </h3>
                      </div>

                      <p className="body-text text-white/90 mb-6">
                        Tieni tutto sotto controllo monitorando interazioni e
                        attività del sistema in tempo reale, da un’unica
                        dashboard.
                      </p>

                      <ul className="space-y-4 my-8">
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Traccia tutte le interazioni in corso da una
                            dashboard unificata.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Ricevi alert e notifiche per garantire operazioni
                            fluide e senza intoppi.
                          </span>
                        </li>
                      </ul>

                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/automis-it"
                        variant="primary"
                        size="medium"
                        external={true}
                      >
                        Prenota una Call
                      </CTAButton>
                    </div>
                  </div>

                  <div className="w-full lg:w-7/12 mb-8 lg:mb-0 order-2 lg:order-2 mt-8 md:mt-12 lg:mt-0">
                    <div
                      className="tab-image pl-0 lg:pl-8"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/dashboard/image-3.png"
                        alt="Dashboard di monitoraggio performance della Voice AI"
                        className="dashboard-image w-full h-auto max-w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              <Tab.Pane className="tab-pane fade" eventKey="tabThree2">
                <div className="flex flex-wrap items-center justify-around">
                  <div className="w-full xl:w-1/3 lg:w-5/12 mb-8 lg:mb-0 order-1 lg:order-1">
                    <div
                      className="content pr-0 lg:pr-8 text-center lg:!text-left"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <div className="mb-5">
                        <h3 className="sub-heading text-white text-2xl md:text-3xl">
                          Log dettagliati per ogni conversazione
                        </h3>
                      </div>

                      <p className="body-text text-white/90 mb-6">
                        Traccia e gestisci ogni chiamata con log dettagliati e
                        filtri di ricerca avanzati.
                      </p>

                      <ul className="space-y-4 my-8">
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Visualizza e cerca lo storico chiamate
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Scarica ed esporta i log con filtri
                          </span>
                        </li>
                      </ul>

                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/automis-it"
                        variant="primary"
                        size="medium"
                        external={true}
                      >
                        Prenota una Call
                      </CTAButton>
                    </div>
                  </div>

                  <div className="w-full lg:w-7/12 mb-8 lg:mb-0 order-2 lg:order-2 mt-8 md:mt-12 lg:mt-0">
                    <div
                      className="tab-image pl-0 lg:pl-8"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/dashboard/image-1.png"
                        alt="Dashboard log chiamate e tracciamento conversazioni"
                        className="dashboard-image w-full h-auto max-w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              <Tab.Pane className="tab-pane fade" eventKey="tabThree3">
                <div className="flex flex-wrap items-center justify-around">
                  <div className="w-full lg:w-7/12 mb-8 lg:mb-0 order-1 lg:order-1">
                    <div
                      className="tab-image pr-0 lg:pr-8"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/dashboard/image-2.png"
                        alt="Dashboard KPI e approfindimento dati"
                        className="dashboard-image w-full h-auto max-w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="w-full xl:w-1/3 lg:w-5/12 mb-8 lg:mb-0 order-2 lg:order-2 mt-8 md:mt-12 lg:mt-0">
                    <div
                      className="content pl-0 lg:pl-8 text-center lg:!text-left"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <div className="mb-5">
                        <h3 className="sub-heading text-white text-2xl md:text-3xl">
                          KPI chiari e approfondimenti utili per ottimizzare
                        </h3>
                      </div>

                      <p className="body-text text-white/90 mb-6">
                        Ottieni approfondimenti sui KPI più importanti per migliorare
                        continuamente le performance della tua Voice AI.
                      </p>

                      <ul className="space-y-4 my-8">
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Monitora metriche chiave come CRR e CSAT.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Identifica cosa funziona con report visivi e analisi
                            dei trend.
                          </span>
                        </li>
                      </ul>

                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/automis-it"
                        variant="primary"
                        size="medium"
                        external={true}
                      >
                        Prenota una Call
                      </CTAButton>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>

      {/* AI vs HUMANS */}
      <section
        id="about"
        className="section-padding bg-bg-primary relative overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center">
            <div className="w-full xl:w-2/3 lg:w-11/12">
              <div
                className="text-center mb-12"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <h2 className="section-heading text-white mb-4">AI vs Nuovo Dipendente:</h2>
                <p className="sub-heading text-white/90">
                  Una nuova forma di customer engagement ed efficienza operativa
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center -mx-4">
            <div className="w-full xl:w-5/12 md:w-full px-4 mb-8">
              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border-2 border-yellow-light rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-yellow-light/20"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <h4 className="card-heading text-yellow-light mb-4">
                    Intelligenza artificiale
                  </h4>
                  <ul className="space-y-2.5">
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-robot text-yellow-light mr-2.5 w-5" />
                      Costi operativi bassi
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-clock text-yellow-light mr-2.5 w-5" />
                      Disponibile 24/7
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-bolt text-yellow-light mr-2.5 w-5" />
                      Prenotazione immediata
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-clipboard-check text-yellow-light mr-2.5 w-5" />
                      Segue le istruzioni in modo coerente
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-chart-line text-yellow-light mr-2.5 w-5" />
                      Risultati più prevedibili
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-infinity text-yellow-light mr-2.5 w-5" />
                      Scalabilità virtualmente infinita
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-cogs text-yellow-light mr-2.5 w-5" />
                      Soluzione 100% done-for-you
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/12 md:w-full text-center flex justify-center items-center px-4 mb-8">
              <h3 className="text-5xl font-bold text-white relative z-10">VS</h3>
            </div>

            <div className="w-full xl:w-5/12 md:w-full px-4 mb-8">
              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border-2 border-blue-middle rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-middle/20"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <h4 className="card-heading text-blue-middle mb-4">Nuovo Dipendente</h4>
                  <ul className="space-y-2.5">
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-dollar-sign text-blue-middle mr-2.5 w-5" />
                      Costi alti
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-balance-scale text-blue-middle mr-2.5 w-5" />
                      Performance incostanti
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-user-tie text-blue-middle mr-2.5 w-5" />
                      Assunzione / formazione necessarie
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-user-times text-blue-middle mr-2.5 w-5" />
                      Possono lasciare in qualsiasi momento
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-chart-pie text-blue-middle mr-2.5 w-5" />
                      Scalabilità limitata
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-user-clock text-blue-middle mr-2.5 w-5" />
                      Prima risposta lenta
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-business-time text-blue-middle mr-2.5 w-5" />
                      Follow-up lento, perdita di prenotazioni
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
</section>

{/* FAQ */}
<FAQSection
  sectionSubtitle="FAQ"
  sectionTitle="Hai domande? Abbiamo le risposte!"
  sectionDescription="Sappiamo che potresti avere qualche dubbio. Per questo abbiamo raccolto le domande più frequenti. Se non trovi la tua, scrivici pure!"
  faqs={[
    {
      question: "Ok, ma in pratica cos’è questa Voice AI?",
      answer:
        "Pensa alla nostra Voice AI come a un’assistente virtuale super smart per il tuo business. Gestisce chiamate, prenota appuntamenti, risponde alle domande e può anche fare chiamate commerciali — il tutto con una voce sorprendentemente naturale. È come avere un membro del team in più che non dorme mai.",
    },
    {
      question: "Capisce davvero cosa dicono i clienti?",
      answer:
        "Sì. Usa tecnologie avanzate per comprendere contesto, accenti e anche termini specifici di settore. Non si limita a “sentire” le parole: interpreta l’intento. Quindi anche con accenti marcati o linguaggio tecnico, riesce a gestire la conversazione in modo affidabile.",
    },
    {
      question: "Funziona con i sistemi che usiamo già?",
      answer:
        "Assolutamente. La Voice AI si integra con CRM, calendario e gli strumenti che già utilizzi. Il nostro team ti aiuta nella configurazione, così si inserisce nel tuo flusso di lavoro senza stravolgerlo.",
    },
    {
      question: "E se l’AI non sa rispondere a una domanda?",
      answer:
        "Nessun problema. Se incontra una richiesta che non può gestire, trasferisce la chiamata a un operatore umano in modo fluido. Il cliente ottiene sempre una risposta, in un modo o nell’altro.",
    },
    {
      question: "Come monitoriamo quanto sta performando?",
      answer:
        "Hai a disposizione una dashboard analytics che mostra volumi chiamate, tassi di risoluzione, customer satisfaction e molto altro. È una vista completa delle interazioni, utile per individuare trend e aree di miglioramento.",
    },
  ]}
/>

      {/* FINAL CTA */}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div
              className="w-full xl:w-2/3 lg:w-5/6 text-center"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="bg-blue-darkest/30 backdrop-blur-lg border-2 border-yellow-light rounded-2xl p-16 shadow-lg shadow-yellow-light/20 hover:scale-[1.02] transition-all duration-300">
                <div className="mb-10">
                  <span className="inline-block bg-yellow-light/20 text-yellow-light px-6 py-2 rounded-full small-text font-semibold mb-6">
                    Prenota ora una Call
                  </span>
                  <h2
                    className="section-heading text-white"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    Scala il tuo business con l’AI
                  </h2>
                </div>

                <div className="flex justify-center">
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/booking/automis-it"
                    variant="primary"
                    size="large"
                    external={true}
                    className="whitespace-nowrap inline-block"
                  >
                    Prenota una Call gratuita!
                  </CTAButton>
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