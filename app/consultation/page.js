"use client";
import React, { useState, useEffect, useRef } from "react";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import Image from "next/image";
import Counter from "@/components/Counter";
import FAQSection from "@/components/FAQSection";
import CTAButton from "@/components/CTAButton";

const ConsultationPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    "In 30 mins, we restructured our ad funnel, +25% leads.",
    "A single session cut our ad spend by 20%."
  ];

  const faqs = [
    {
      question: "How do I choose my session length?",
      answer: "Think about the scope and depth of help you need. 1-Hour Session is ideal for a focused, deep dive on a single topic (e.g. auditing your ad campaign or exploring a specific AI tool).\n\n2-Hour Session gives us time to tackle two related challenges or dig further into strategy and implementation details.\n\n4/8 hours slots work best for comprehensive workshops, multi-topic strategy sessions, or hands-on setup.\n\nIf you're unsure, start with a 1-hour slot. You can always book additional time later."
    },
    {
      question: "Can I split my time across days?",
      answer: "Absolutely. After your booking, you'll receive a link to manage your appointments. You can divide your total hours into smaller sessions (60mn minimum) on different days to fit your schedule and give you time to implement intermediate steps."
    },
    {
      question: "What do I need to prepare?",
      answer: "To make the most of our time together, please:\nGather any existing materials (ad reports, analytics dashboards, marketing plans).\n\nDefine your top prioritiesthe one or two challenges you want to resolve first.\n\nEnsure access to relevant accounts or platforms (e.g., Google Ads, Facebook Business Manager, CRM).\n\nCome with questions or specific goals so we can hit the ground running."
    },
    {
      question: "What's your refund policy?",
      answer: "We want you to feel confident in your investment.\nFull Refund: If you cancel or reschedule at least 24 hours before your session start time.\n\nPartial Credit: Cancellations made within 24 hours will receive a credit redeemable toward a future session.\n\nNo-Show: Missed sessions without notice are non-refundable, but you can contact us to discuss a makeup appointment."
    }
  ];

  return (
    <AkpagerLayout>
      {}
      <section className="relative z-10 overflow-hidden bg-bg-primary hero-padding">
        {}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&h=1080&fit=crop"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/95 via-bg-primary/90 to-blue-darkest/80" />

        {}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full">
            <div className="w-96 h-96 md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] border border-blue-middle/20 rounded-full animate-[spin_20s_linear_infinite]" />
          </div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full">
            <div className="w-64 h-64 md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] border border-yellow-light/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full lg:w-7/12 px-4">
              <h1
                className="hero-heading text-white mb-6"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                Digital Strategy Consultation On Demand
              </h1>
              <p
                className="sub-heading text-white/90 mb-8"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1000}
              >
                Get tailored guidance on Lead gen, Ads & AI.
              </p>

              {}
              <div className="space-y-3 mb-10" data-aos="fade-up" data-aos-delay={200}>
                {[
                  "1-on-1 Expert Strategy Sessions",
                  "Actionable Plans & Clear Next Steps",
                  "Flexible Hours (1h, 2h, 4h, 8h slots)"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-yellow-light rounded-full flex items-center justify-center">
                      <i className="fas fa-check text-blue-darkest text-sm" />
                    </div>
                    <span className="body-text text-text-light">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay={300}>
                <CTAButton
                  href="#booking-flow"
                  variant="secondary"
                  size="medium"
                   
                >
                  Book a Consultation
                </CTAButton>

              </div>
            </div>

            <div className="w-full lg:w-5/12 px-4 mt-12 lg:mt-0">
              <div className="relative" data-aos="fade-left" data-aos-delay={400}>
                {}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-middle to-yellow-light rounded-2xl opacity-30 blur-xl" />

                {}
                <div className="relative bg-gradient-to-br from-blue-darkest to-bg-primary p-1 rounded-2xl">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
                      alt="Consultation"
                      fill
                      className="object-cover"
                      priority
                    />

                    {}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-primary to-transparent p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="section-heading text-white">500+</div>
                          <div className="small-text text-white/90">Consultations</div>
                        </div>
                        <div className="text-center">
                          <div className="section-heading text-white">4.9/5</div>
                          <div className="small-text text-white/90">Client Rating</div>
                        </div>
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
      <section className="section-padding bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">What We Cover</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "fa-chart-line",
                title: "Digital Strategy",
                desc: "roadmaps, channel mix, KPIs",
                gradient: "from-indigo-500 to-indigo-600"
              },
              {
                icon: "fa-users",
                title: "Lead Generation",
                desc: "funnels, targeting, nurture",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: "fa-bullhorn",
                title: "Paid Advertising",
                desc: "setup, optimization, budgets",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: "fa-robot",
                title: "AI Tools & Automations",
                desc: "selection, prompts, integration",
                gradient: "from-amber-400 to-amber-500"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div
                  className="relative h-full bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300 mx-auto">
                    <i className={`far ${item.icon} text-white text-2xl`} />
                  </div>

                  <h5 className="card-heading text-white mb-3 text-center">{item.title}</h5>
                  <p className="body-text text-white/90 text-center">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="bg-bg-primary section-padding relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                number: "01",
                title: "Pick Your Time",
                desc: "Choose how many hours you need in the scheduler.",
                icon: "fa-calendar-alt"
              },
              {
                number: "02",
                title: "Securely Pay",
                desc: "Enter payment in Stripe Checkout (amount configured behind the scenes).",
                icon: "fa-lock"
              },
              {
                number: "03",
                title: "Consult & Execute",
                desc: "Meet one-on-one, get a summary of actions and next steps.",
                icon: "fa-handshake"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div
                  className="group relative bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl min-h-[300px] flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {}
                  <div className="absolute -top-5 -right-5">
                    <div className="w-16 h-16 bg-blue-middle rounded-full flex items-center justify-center text-white font-bold body-text shadow-lg group-hover:bg-yellow-light group-hover:text-blue-darkest transition-all duration-300">
                      {step.number}
                    </div>
                  </div>

                  {}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                      <i className={`far ${step.icon} text-3xl text-blue-middle group-hover:text-yellow-light`} />
                    </div>

                    {}
                    <div className="text-center">
                      <h4 className="card-heading text-white mb-3">{step.title}</h4>
                      <p className="body-text text-white/90">{step.desc}</p>
                    </div>
                  </div>

                  {}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-[3rem] transform -translate-y-1/2 z-20">
                      <svg width="48" height="2" className="text-yellow-light">
                        <line x1="0" y1="1" x2="48" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="bg-section-dark section-padding">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">Why Choose This Consultation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "fa-calendar-check",
                title: "Flexible Scheduling",
                desc: "Book on your own timeline.",
                color: "var(--blue-middle)",
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
              },
              {
                icon: "fa-brain",
                title: "Expert Insight",
                desc: "Decades of marketing & AI experience.",
                color: "var(--blue-lightest)",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
              },
              {
                icon: "fa-tasks",
                title: "Action-Oriented",
                desc: "You walk away with a clear plan.",
                color: "var(--blue-middle)",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
              },
              {
                icon: "fa-shield-check",
                title: "Transparent Process",
                desc: "No hidden fees or surprises.",
                color: "var(--yellow-light)",
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop"
              }
            ].map((item, index) => (
              <div key={index}>
                <div
                  className="group relative bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-yellow-light/30 hover:border-yellow-light/30 min-h-[330px]"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />

                    {}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border-2 border-blue-middle/50 group-hover:bg-yellow-light/20 group-hover:border-yellow-light/50">
                        <i className={`far ${item.icon} text-2xl text-white`} />
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="p-6 text-center">
                    <h4 className="card-heading text-white mb-3 transition-colors">{item.title}</h4>
                    <p className="body-text text-white/90">{item.desc}</p>
                  </div>

                  {}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="bg-bg-primary section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">Success Snapshots</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-light rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <i className="far fa-quote-left text-section-dark text-lg" />
                </div>

                {}
                <p className="sub-heading text-text-light font-light italic leading-relaxed mb-6 pt-2">
                  {testimonial}
                </p>

                {}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-light text-sm" />
                  ))}
                </div>

                {}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-middle to-yellow-light opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <FAQSection
        sectionTitle="FAQs"
        sectionSubtitle="FAQs"
        sectionDescription="Find answers to common questions about our consultation services. We're here to help you get the most value from your session."
        iconClass="fas fa-question-circle"
        bgColor="bg-bg-primary"
        faqs={faqs}
      />

      {}
      <section id="booking-flow" className="bg-black section-padding">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4" data-aos="fade-up">Book Your Consultation</h2>
            <p className="sub-heading text-white/90" data-aos="fade-up" data-aos-delay={50}>
              Pick your preferred time slot and duration
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full lg:w-5/6">
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 shadow-xl" data-aos="fade-up">
                {}
                <div className="text-center py-16 border-2 border-dashed border-blue-middle/50 rounded-xl">
                  <i className="far fa-calendar-alt text-5xl text-blue-middle mb-4 block" />
                  <p className="sub-heading text-text-light mb-4">Scheduler Widget Integration</p>
                  <p className="small-text text-white/90">
                    Visitors pick date, duration (1h, 2h, 4h, 8h etc.)<br />
                    Upon confirmation, they're sent to Stripe for payment<br />
                    After payment, they receive calendar invite & prep guide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="bg-section-dark section-padding relative overflow-hidden max-w-6xl rounded-2xl mx-auto shadow-xl shadow-blue-950/40 mb-12">
        <div className="absolute inset-0 bg-black/10" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="section-heading text-white mb-6" data-aos="fade-up">
              Ready to Elevate Your Strategy?
            </h2>
            <CTAButton
              href="#booking-flow"
              variant="primary"
              size="medium"
               
              data-aos="fade-up"
              data-aos-delay={100}
            >
              Book Your Consultation
            </CTAButton>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default ConsultationPage;