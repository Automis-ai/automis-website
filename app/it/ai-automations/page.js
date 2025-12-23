"use client";
import React, { useState } from "react";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import Image from "next/image";
import Counter from "@/components/Counter";
import FAQSection from "@/components/FAQSection";
import CTAButton from "@/components/CTAButton";

const AIAutomationsPage = () => {
const [expandedOffering, setExpandedOffering] = useState(null);

  const toggleOffering = (index: number) => {
    setExpandedOffering(expandedOffering === index ? null : index);
  };

  const offerings = [
    {
      title: "Qualificazione & Nurture dei Lead",
      icon: "fa-users",
      gradient: "from-blue-middle to-blue-lightest",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
      description:
        "Trasforma ogni lead in un’opportunità qualificata con screening intelligente basato su AI",
      features: [
        "Screening Voice & Chat: script AI che qualificano chiamate inbound e lead da chat in tempo reale",
        "Follow-up automatico: attiva sequenze SMS, WhatsApp o email in base al comportamento del lead",
      ],
      stats: { leads: "20%", conversion: "+15%" },
    },
    {
      title: "Prenotazioni & Riprenotazioni Appuntamenti",
      icon: "fa-calendar-check",
      gradient: "from-blue-lightest to-blue-lightest",
      image:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop",
      description:
        "Non perdere più un appuntamento grazie a uno scheduling intelligente attivo 24/7",
      features: [
        "Receptionist AI 24/7: prenotazione da chiamata a calendario, promemoria e recupero no-show",
        "Integrazioni calendario: sincronizzazione con Calendly, GoHighLevel, Google Calendar e altri",
      ],
      stats: { bookings: "24/7", noShow: "30%", appointments: "più appuntamenti" },
    },
    {
      title: "CRM & Sincronizzazione Dati",
      icon: "fa-database",
      gradient: "from-bg-primary/90 to-blue-middle",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description:
        "Mantieni i dati sempre allineati e coerenti su tutte le piattaforme",
      features: [
        "Auto-logging: registra form compilati e chiamate in CRM come Pipedrive e HubSpot",
        "Sync bidirezionale: dati contatto aggiornati e consistenti su tutti i sistemi",
      ],
      stats: { accuracy: "100%", time: "-80%" },
    },
    {
      title: "Finanza",
      icon: "fa-coins",
      gradient: "from-yellow-dark to-yellow-light",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      description:
        "Automazione spese & fatture: acquisisci ricevute, genera fatture e instrada richieste di approvazione",
      features: [
        "Riduzione del carico operativo del team commerciale del 25%",
        "Tempo di risposta ai lead fino a 3× più veloce",
      ],
      stats: { workload: "25%", response: "3×" },
    },
    {
      title: "Workflow HR",
      icon: "fa-users-cog",
      gradient: "from-blue-darkest to-blue-middle",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      description:
        "Selezione & scheduling: pre-qualifica candidati via voce o chat e prenota i colloqui automaticamente",
      features: [
        "Screening candidati 2× più veloce",
        "30% di riduzione del lavoro amministrativo manuale",
      ],
      stats: { screening: "2×", admin: "30%" },
    },
  ];

  const faqs = [
    {
      question: "Quanto tempo serve per andare live?",
      answer: "La maggior parte dei workflow va live entro 2–4 settimane dal kickoff.",
    },
    {
      question: "Con quali sistemi vi integrate?",
      answer:
        "Pipedrive, HubSpot, GoHighLevel, Calendly, Google Calendar, WhatsApp, SMS, API custom, ecc.",
    },
    {
      question: "Quanto sono sicure le automazioni AI?",
      answer:
        "Crittografia enterprise, accessi per ruolo, audit trail completi, compliance GDPR e CCPA.",
    },
    {
      question: "Che supporto e manutenzione sono inclusi?",
      answer:
        "Monitoraggio 24/7, health check mensili, ottimizzazioni trimestrali e risposta emergenze con SLA.",
    },
  ];

  const processSteps = [
    { number: "01", title: "Discovery & Audit", desc: "Mappiamo i flussi attuali e individuiamo i colli di bottiglia" },
    { number: "02", title: "Workshop di Priorità", desc: "Sessione di 60 minuti per scegliere le automazioni a maggior impatto" },
    { number: "03", title: "Implementazione & Integrazioni", desc: "Sviluppo su misura, test e messa in produzione" },
    { number: "04", title: "Training & Handoff", desc: "SOP + onboarding live del team" },
    { number: "05", title: "Ottimizzazione Continua", desc: "A/B test, monitoraggio e miglioramenti" },
  ];

  const whoItsFor = [
    {
      icon: "fa-tooth",
      title: "Studi e attività su appuntamento",
      description:
        "Riduci i no-show e riempi automaticamente gli slot cancellati. L’AI gestisce conferme, riprenotazioni e follow-up.",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
    },
    {
      icon: "fa-bullhorn",
      title: "Agenzie lead-gen",
      description:
        "Qualifica i lead subito e instradali al team giusto. Aumenta il tasso di conversione fino a 3× con nurture intelligente.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
    {
      icon: "fa-user-tie",
      title: "Team Recruiting",
      description:
        "Screening candidati 24/7 e colloqui prenotati automaticamente. Riduci il time-to-hire del 40% e migliori la candidate experience.",
      image:
        "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop",
    },
    {
      icon: "fa-cloud",
      title: "Aziende SaaS",
      description:
        "Automatizza onboarding, ticket supporto e rinnovi. Riduci il churn del 25% con engagement proattivo.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    },
  ];

  const successStories = [
    {
      icon: "fa-tooth",
      title: "Clinica Dentale",
      metric: "18%",
      result: "Chiamate perse recuperate — +€4K/mese di nuovo fatturato",
      bgImage:
        "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop",
    },
    {
      icon: "fa-users",
      title: "Società di Recruiting",
      metric: "40%",
      result: "Ridotto il time-to-hire: HR focalizzato su attività strategiche",
      bgImage:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
    },
    {
      icon: "fa-building",
      title: "Agenzia Immobiliare",
      metric: "120",
      result: "Chiamate gestite dall’AI, 25 visite — €30K di potenziale",
      bgImage:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    },
  ];

  return (
    <AkpagerLayout>
      {}
      <section className="hero-padding bg-bg-primary relative overflow-hidden">
        {}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap -mx-4 items-center gap-10">
            <div className="px-4 lg:w-7/12">
              <h1 className="hero-heading text-white mb-6 leading-tight" data-aos="fade-up">
                Automatizza le attività ripetitive
                <span className=" text-text-blue"> con l’AI</span>
              </h1>
              <p
                className="sub-heading text-white/90 mb-8 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                Libera il tuo team per concentrarsi sulla strategia: l’AI gestisce qualificazione lead,
                follow-up e prenotazione appuntamenti. Trasforma le operazioni con automazioni intelligenti.
              </p>
              <div className="flex gap-4 flex-wrap" data-aos="fade-up" data-aos-delay={200}>
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                  external={true}
                  variant="secondary"
                  size="medium"
                >
                  Prenota una Discovery Call
                </CTAButton>
              </div>
            </div>
            <div className="px-4 lg:w-4/12">
              <div className="relative" data-aos="fade-left" data-aos-delay={300}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-middle to-blue-lightest rounded-full blur-3xl opacity-30" />
                <Image
                  src="/assets/images/hero/ai-hero.png"
                  alt="Automazioni AI"
                  width={600}
                  height={600}
                  priority
                  className="relative z-10 rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-black">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">
              Perché le Automazioni AI?
            </h2>
            <p className="sub-heading text-white/90" data-aos="fade-up" data-aos-delay={50}>
              Trasforma i processi con automazioni intelligenti e misurabili
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { icon: "fa-clock", title: "Più tempo", desc: "Recupera fino a 14 ore a settimana per persona" },
              { icon: "fa-rocket", title: "Più produttività", desc: "Riduci i tempi dei processi del 25% o più" },
              { icon: "fa-check-circle", title: "Meno errori", desc: "Elimina gli errori di inserimento manuale dati" },
              { icon: "fa-expand-arrows", title: "Scala facilmente", desc: "Workflow 24/7 senza aumentare l’organico" },
            ].map((item, index) => (
              <div key={index}>
                <div
                  className="group bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 h-full hover:scale-[1.02]"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                    <i
                      className={`far ${item.icon} text-blue-middle group-hover:text-yellow-light text-2xl transition-all duration-300`}
                    />
                  </div>

                  <h3 className="card-heading text-white mb-3">{item.title}</h3>
                  <p className="body-text text-white/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">
              Le nostre Automazioni AI
            </h2>
            <p className="sub-heading text-white/90" data-aos="fade-up" data-aos-delay={50}>
              Soluzioni potenti che cambiano davvero il modo in cui lavori
            </p>
          </div>

          {}
          <div className="space-y-6">
            {}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {}
              <div className="lg:col-span-2" data-aos="fade-up">
                <div className="relative h-full bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                  <div className="flex flex-wrap -mx-4 h-full">
                    <div className="px-4 w-full lg:w-1/2">
                      <div className="relative h-full min-h-[400px]">
                        <Image
                          src={offerings[0].image}
                          alt={offerings[0].title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
                      </div>
                    </div>
                    <div className="px-4 w-full lg:w-1/2">
                      <div className="p-8 h-full flex flex-col">
                        <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                          <i
                            className={`far ${offerings[0].icon} text-blue-middle group-hover:text-yellow-light text-2xl transition-all duration-300`}
                          />
                        </div>
                        <h3 className="card-heading text-white mb-3">{offerings[0].title}</h3>
                        <p className="body-text text-white/90 mb-4">{offerings[0].description}</p>

                        <div className="flex gap-6 mb-6">
                          <div>
                            <div className="text-3xl font-medium text-blue-middle">{offerings[0].stats.leads}</div>
                            <div className="small-text text-white/90">Lead in più</div>
                          </div>
                          <div>
                            <div className="text-3xl font-medium text-yellow-light">{offerings[0].stats.conversion}</div>
                            <div className="small-text text-white/90">Conversion Rate</div>
                          </div>
                        </div>

                        <ul className="list-none mb-0 mt-auto">
                          {offerings[0].features.map((feature, idx) => (
                            <li key={idx} className="mb-3 text-white/90 flex items-start">
                              <i className="far fa-check-circle text-yellow-light mr-3 mt-1" />
                              <span className="small-text">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="lg:col-span-1">
                <div className="flex flex-col gap-4">
                  {}
                  <div data-aos="fade-up" data-aos-delay={100}>
                    <div className="bg-blue-middle/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-blue-middle/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-light/20 transition-all duration-300">
                          <i
                            className={`far ${offerings[1].icon} text-blue-middle group-hover:text-yellow-light text-xl transition-all duration-300`}
                          />
                        </div>
                        <div>
                          <h4 className="card-heading text-white mb-2">{offerings[1].title}</h4>
                          <p className="small-text text-white/90 mb-3">{offerings[1].description}</p>
                          <div className="flex gap-4">
                            <span className="text-2xl font-medium text-blue-middle">{offerings[1].stats.bookings}</span>
                            <div>
                              <span className="text-2xl font-medium text-yellow-light">{offerings[1].stats.noShow}</span>
                              <span className="small-text text-white/90 block">{offerings[1].stats.appointments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {}
                  <div data-aos="fade-up" data-aos-delay={200}>
                    <div className="bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                      <div className="w-14 h-14 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i
                          className={`far ${offerings[2].icon} text-blue-middle group-hover:text-yellow-light text-xl transition-all duration-300`}
                        />
                      </div>
                      <h4 className="card-heading text-white mb-2">{offerings[2].title}</h4>
                      <p className="small-text text-white/90 mb-3">{offerings[2].description}</p>
                      <div className="flex justify-between">
                        <div>
                          <div className="text-2xl font-medium text-blue-middle">{offerings[2].stats.accuracy}</div>
                          <div className="small-text text-white/90">Accuratezza</div>
                        </div>
                        <div>
                          <div className="text-2xl font-medium text-yellow-light">{offerings[2].stats.time}</div>
                          <div className="small-text text-white/90">Tempo risparmiato</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {}
                  {/* Se vuoi usare l’expansion state, qui puoi aggiungere un bottone che chiama toggleOffering(index) */}
                </div>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div data-aos="fade-up" data-aos-delay={300}>
                <div className="relative bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={offerings[3].image}
                      alt={offerings[3].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
                    <div className="absolute bottom-4 left-4 w-14 h-14 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <i
                        className={`far ${offerings[3].icon} text-blue-middle group-hover:text-yellow-light text-xl transition-all duration-300`}
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="card-heading text-white mb-3">{offerings[3].title}</h4>
                    <p className="body-text text-white/90 mb-4">{offerings[3].description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <div>
                          <span className="text-2xl font-medium text-yellow-light">{offerings[3].stats.workload}</span>
                          <span className="small-text text-white/90 block">Carico commerciale</span>
                        </div>
                        <div>
                          <span className="text-2xl font-medium text-blue-middle">{offerings[3].stats.response}</span>
                          <span className="small-text text-white/90 block">Risposta ai lead</span>
                        </div>
                      </div>
                      <i className="far fa-arrow-right text-yellow-light text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>

              <div data-aos="fade-up" data-aos-delay={400}>
                <div className="bg-blue-middle/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-black/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                      <i
                        className={`far ${offerings[4].icon} text-blue-middle group-hover:text-yellow-light text-2xl transition-all duration-300`}
                      />
                    </div>
                    <h4 className="card-heading text-white mb-3">{offerings[4].title}</h4>
                    <p className="body-text text-white/90 mb-6">{offerings[4].description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-middle/20 p-4 text-center rounded-xl">
                        <div className="text-3xl font-medium text-yellow-light">{offerings[4].stats.screening}</div>
                        <div className="small-text text-white/90">screening più veloce</div>
                      </div>
                      <div className="bg-blue-middle/20 p-4 text-center rounded-xl">
                        <div className="text-3xl font-medium text-yellow-light">{offerings[4].stats.admin}</div>
                        <div className="small-text text-white/90">meno lavoro admin</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">
              Benefici & Risultati
            </h2>
            <p className="sub-heading text-white/90" data-aos="fade-up" data-aos-delay={50}>
              Numeri concreti che cambiano la tua operatività
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "fa-percentage", value: 70, suffix: "%", label: "Riduzione follow-up manuali" },
              { icon: "fa-tachometer-alt", value: 35, suffix: "%", label: "Lead→Appuntamento più veloce" },
              { icon: "fa-clock", value: 20, suffix: "+", label: "Ore risparmiate a settimana" },
              { icon: "fa-chart-line", value: 100, suffix: "%", label: "Efficienza scalabile", noCounter: true },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="w-20 h-20 bg-blue-middle/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <i className={`far ${stat.icon} text-blue-middle text-3xl`} />
                  </div>
                  <h3 className="text-5xl lg:text-6xl font-medium text-yellow-light mb-3">
                    {stat.noCounter ? (
                      <span className="text-6xl">∞</span>
                    ) : (
                      <>
                        <Counter end={stat.value} />
                        {stat.suffix}
                      </>
                    )}
                  </h3>
                  <p className="body-text text-text-light">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="how-it-works" className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">
              Come Funziona
            </h2>
            <p className="sub-heading text-white/90" data-aos="fade-up" data-aos-delay={50}>
              Un processo collaudato per implementare automazioni senza attriti
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="relative">
                  <div className="text-center relative z-10" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-middle to-blue-lightest rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-medium shadow-xl relative">
                      {step.number}
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 w-20 xl:w-32">
                          <svg viewBox="0 0 100 20" className="w-full h-5">
                            <defs>
                              <marker
                                id={`arrowhead-${index}`}
                                markerWidth="10"
                                markerHeight="10"
                                refX="8"
                                refY="5"
                                orient="auto"
                              >
                                <polygon points="0 0, 10 5, 0 10" fill="#3C91E6" />
                              </marker>
                            </defs>
                            <line
                              x1="10"
                              y1="10"
                              x2="85"
                              y2="10"
                              stroke="#3C91E6"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              markerEnd={`url(#arrowhead-${index})`}
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h5 className="card-heading text-white mb-3">{step.title}</h5>
                    <p className="small-text text-white/90">{step.desc}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">
              Per Chi È
            </h2>
            <p className="sub-heading text-white/90" data-aos="fade-up" data-aos-delay={50}>
              I settori che ottengono più vantaggi dalle nostre automazioni
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoItsFor.map((item, index) => (
              <div key={index} className="flex">
                <div
                  className="group relative overflow-hidden bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 hover:scale-[1.02] flex flex-col w-full"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="w-14 h-14 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:bg-yellow-light/20 transition-all duration-300">
                      <i
                        className={`far ${item.icon} text-blue-middle group-hover:text-yellow-light text-2xl transition-all duration-300`}
                      />
                    </div>
                    <h5 className="card-heading text-white mb-2">{item.title}</h5>
                    {item.subtitle && <p className="text-text-light text-sm mb-2">{item.subtitle}</p>}
                    <p className="body-text text-white/90">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">
              Casi Studio
            </h2>
            <p className="sub-heading text-white/90" data-aos="fade-up" data-aos-delay={50}>
              Risultati reali per aziende come la tua
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index}>
                <div
                  className="group relative h-96 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={story.bgImage}
                      alt={story.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent transition-opacity duration-300 group-hover:via-bg-primary/60" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-end p-8 transition-all duration-300">
                    <div className="w-16 h-16 bg-blue-middle/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:bg-yellow-light/20 group-hover:scale-110">
                      <i
                        className={`far ${story.icon} text-blue-middle group-hover:text-yellow-light text-2xl transition-colors duration-300`}
                      />
                    </div>

                    <h4 className="card-heading text-white mb-3 transition-all duration-300 group-hover:text-yellow-light">
                      {story.title}
                    </h4>
                    <div className="text-5xl font-medium text-yellow-light mb-3 transition-all duration-300 group-hover:scale-110 origin-left">
                      {story.metric}
                    </div>
                    <p className="body-text text-white/90 transition-all duration-300 group-hover:text-white">
                      {story.result}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                    <div className="w-10 h-10 bg-yellow-light backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <i className="far fa-arrow-up-right text-blue-darkest" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <FAQSection
        sectionTitle="Domande frequenti"
        sectionSubtitle="FAQ"
        sectionDescription="Tutto quello che devi sapere sui nostri servizi di automazione AI"
        iconClass="fas fa-robot"
        bgColor="bg-bg-primary"
        accentColor="var(--blue-middle)"
        faqs={faqs}
      />

      {}
      <section
        className="section-padding relative bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),
            url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop)
          `,
        }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="px-4 lg:w-2/3">
              <h2 className="section-heading text-white mb-0" data-aos="fade-up">
                Pronto a trasformare le tue operazioni?
              </h2>
              <p className="sub-heading text-text-light mt-3" data-aos="fade-up" data-aos-delay={50}>
                Unisciti a centinaia di aziende che stanno già automatizzando con l’AI
              </p>
            </div>
            <div className="px-4 lg:w-1/3 lg:text-right mt-4 lg:mt-0" data-aos="fade-up" data-aos-delay={100}>
              <CTAButton
                href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                external={true}
                variant="tertiary"
                size="medium"
              >
                Prenota una Discovery Call
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default AIAutomationsPage;
