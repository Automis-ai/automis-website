"use client";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import CTAButton from "@/components/CTAButton";
import {
  Target,
  Palette,
  Settings,
  Bot,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Building2,
  Home,
  Sun,
  Shield,
  Users,
  ChevronDown,
  ChevronUp,
  Rocket,
  Brain,
  Zap,
  TrendingUp
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import dynamic from "next/dynamic";

const ClientLogosCarousel = dynamic(
  () => import("@/components/ClientLogosCarousel"),
  {
    ssr: false,
  }
);

const PaidAdsManagementPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AkpagerLayout>

      {}
      <section className="hero-padding relative z-10 overflow-hidden bg-gradient-to-b from-black to-bg-primary">
        {}
        <div className="absolute inset-0 overflow-hidden">

          {}
          <div
            className="absolute inset-0 opacity-10"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3C91E6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
              {}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 animate-float">
                  <Target className="w-12 h-12 text-bright-blue/30" />
                </div>
                <div className="absolute top-20 right-20 animate-float-delayed">
                  <Rocket className="w-10 h-10 text-warm-yellow/30" />
                </div>
                <div className="absolute bottom-20 left-20 animate-float-slow">
                  <Brain className="w-14 h-14 text-soft-blue/20" />
                </div>
                <div className="absolute bottom-10 right-10 animate-float">
                  <TrendingUp className="w-16 h-16 text-bright-blue/20" />
                </div>
              </div>

              <h1
                className="hero-heading text-white mb-4 relative"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                <span className="relative z-10">
                  Maximize Your ROI with
                  <span className="block mt-2 relative">
                    <span className="relative z-10 text-text-blue">AI-Enhanced Ads</span>
                    {}
                  </span>
                </span>
              </h1>
              <div className="relative">
                {}
                <div className="absolute inset-0 " />
                <p
                  className="sub-heading text-white/90 max-w-3xl mx-auto mb-8 relative z-10 p-6"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  data-aos-duration={1000}
                >
                  Innovative AI strategies and optimization on Google, Meta, TikTok, LinkedIn, X & more for high-quality, fast-converting leads.
                </p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={1000}
                className="relative"
              >
                {}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-20 bg-warm-yellow/30 rounded-full blur-2xl animate-pulse" />
                </div>
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
external={true}
                  variant="primary"
                  size="medium"
                  className="relative z-10"
                >
                  Book Discovery Call
                </CTAButton>
              </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding relative bg-deep-blue overflow-hidden">
        {}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-soft-blue/5" />
        </div>

        {}
        {}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {}
              <div className="text-left" data-aos="fade-right" data-aos-duration={1000}>
                <span
                  className="inline-block px-6 py-2 mb-8 text-bright-blue font-semibold bg-warm-yellow/10 rounded-full border border-warm-yellow/20"
                  data-aos="fade-down"
                  data-aos-delay={100}
                  data-aos-duration={1000}
                >
                  Service Overview
                </span>

                <h2
                  className="section-heading text-white mb-8 leading-tight"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  data-aos-duration={1000}
                >
                  What Is Paid Ads Management?
                </h2>

                <p
                  className="sub-heading text-white/90 mb-8 leading-relaxed"
                  data-aos="fade-up"
                  data-aos-delay={300}
                  data-aos-duration={1000}
                >
                  A full-service solution that combines human expertise and AI algorithms for audience research, ad creation, continuous optimization, and reporting.
                </p>

                {}
                <div className="space-y-4" data-aos="fade-up" data-aos-delay={400} data-aos-duration={1000}>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-warm-yellow flex-shrink-0" />
                    <span className="body-text text-white/80">AI-powered audience targeting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-warm-yellow flex-shrink-0" />
                    <span className="body-text text-white/80">Real-time performance optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-warm-yellow flex-shrink-0" />
                    <span className="body-text text-white/80">Multi-platform campaign management</span>
                  </div>
                </div>
              </div>

              {}
              <div className="relative" data-aos="fade-left" data-aos-duration={1000}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {}
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
                      alt="Digital advertising dashboard showing analytics and performance metrics"
                      className="w-full h-auto rounded-2xl"
                      loading="lazy"
                    />
                    {}
                    {}
                  </div>

                  {}
                  <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-bright-blue/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-warm-yellow/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-warm-yellow" />
                      </div>
                      <div>
                        <p className="small-text text-white/70">Average ROI</p>
                        <p className="card-heading text-warm-yellow">+312%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {}
                {}
              </div>

            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-deep-blue relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span
              className="inline-block px-6 py-2 mb-4 text-bright-blue font-semibold bg-warm-yellow/10 rounded-full border border-warm-yellow/20"
              data-aos="fade-down"
              data-aos-duration={1000}
            >
              Key Deliverables
            </span>
            <h2
              className="section-heading text-white mb-12"
              data-aos="fade-up"
              data-aos-duration={1000}
            >
              What You'll Get
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mt-16">
            {[
              {
                icon: <Target className="w-8 h-8 text-white" />,
                title: "AI-Powered Audience Research",
                description: "Segment, intent & behavior analysis via machine learning."
              },
              {
                icon: <Palette className="w-8 h-8 text-white" />,
                title: "Ad Creative & Copywriting",
                description: "Visuals and copy optimized with automated A/B testing."
              },
              {
                icon: <Settings className="w-8 h-8 text-white" />,
                title: "Campaign Setup & Tracking",
                description: "Campaign structure, targeting, and pixel/CRM integration."
              },
              {
                icon: <Bot className="w-8 h-8 text-white" />,
                title: "AI-Driven Optimization",
                description: "Real-time bid strategy and budget re-allocation."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-white" />,
                title: "Reporting & Insights",
                description: "Weekly dashboard with AI-powered anomaly alerts."
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration={1000}
              >
                <div className="h-full backdrop-blur-sm border border-bright-blue/20 rounded-2xl overflow-hidden group hover:bg-warm-yellow/10 hover:border-warm-yellow/30 transition-all duration-300 transform hover:-translate-y-1">
                  {}
                  {}

                  {}
                  <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/60 via-transparent to-black/40" />

                  {}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full">
                      <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1" fill="var(--soft-blue)" />
                      </pattern>
                      <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                    </svg>
                  </div>

                  {}
                  <div className="relative z-10 p-8">
                    {}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-bright-blue/20 rounded-xl flex items-center justify-center mx-auto group-hover:bg-warm-yellow/20 transition-all duration-300">
                        {React.cloneElement(item.icon, { className: "w-8 h-8 text-bright-blue group-hover:text-warm-yellow transition-colors duration-300" })}
                      </div>
                    </div>

                    {}
                    <h3 className="card-heading text-white mb-4 text-center">
                      {item.title}
                    </h3>
                    <p className="body-text text-white/90 text-center">
                      {item.description}
                    </p>
                  </div>

                  {}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-warm-yellow to-warm-yellow/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-deep-blue relative">
        {}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" fill="none">
            <path fill="#3C91E6" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
              <span
                className="inline-block px-6 py-2 mb-4 text-bright-blue font-semibold bg-bright-blue/10 rounded-full border border-bright-blue/20"
                data-aos="fade-down"
                data-aos-duration={1000}
              >
                Our Process
              </span>
              <h2
                className="section-heading text-white mb-12"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                How It Works
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                step: "01",
                title: "Strategy & AI Kickoff",
                description: "Align goals and configure predictive models.",
                icon: <Rocket className="w-6 h-6 text-white" />
              },
              {
                step: "02",
                title: "Campaign Build",
                description: "Set up ad groups, creatives, and tracking.",
                icon: <Settings className="w-6 h-6 text-white" />
              },
              {
                step: "03",
                title: "Launch & AI Monitoring",
                description: "AI monitors and flags optimizations.",
                icon: <Brain className="w-6 h-6 text-white" />
              },
              {
                step: "04",
                title: "Continuous Optimization",
                description: "Automated A/B testing and adjustments.",
                icon: <TrendingUp className="w-6 h-6 text-white" />
              }
            ].map((item, index) => (
              <div
                key={index}
                className=""
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration={1000}
              >
                <div className="relative text-center group">
                  {}
                  <div className="flex flex-col items-center justify-center mb-8">
                    {}
                    <span className="hero-heading text-soft-blue/20 mb-6">
                      {item.step}
                    </span>

                    {}
                    <div className="w-14 h-14 bg-bright-blue/20 rounded-xl flex items-center justify-center group-hover:bg-warm-yellow/20 transition-all duration-300">
                      {React.cloneElement(item.icon, { className: "w-6 h-6 text-bright-blue group-hover:text-warm-yellow transition-colors duration-300" })}
                    </div>
                  </div>

                  {}
                  <h3 className="card-heading text-white mb-4 mt-8">
                    {item.title}
                  </h3>
                  <p className="body-text text-white/90">
                    {item.description}
                  </p>

                  {}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-16 -right-8">
                      <ArrowRight className="w-8 h-8 text-bright-blue/30" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
      </section>

      {}
      <section className="section-padding bg-deep-blue relative container">
        {}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="hexagons" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4" fill="none" stroke="#73B9FE" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
              <span
                className="inline-block px-6 py-2 mb-4 text-warm-yellow font-semibold bg-warm-yellow/10 rounded-full border border-warm-yellow/20"
                data-aos="fade-down"
                data-aos-duration={1000}
              >
                Target Industries
              </span>
              <h2
                className="section-heading text-white mb-12"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                Who It's <span className="text-warm-yellow">For</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 px-5">
            {[
              {
                icon: <Building2 className="w-10 h-10 text-bright-blue" />,
                title: "Appointment-Based Businesses",
                subtitle: "Dental, Med-Spa, Beauty",
                image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
                accent: "var(--bright-blue)"
              },
              {
                icon: <Home className="w-10 h-10 text-soft-blue" />,
                title: "Real Estate & Property",
                subtitle: "Agents, Brokers, Commercials",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
                accent: "var(--soft-blue)"
              },
              {
                icon: <Sun className="w-10 h-10 text-soft-blue" />,
                title: "Lead-Gen Companies",
                subtitle: "Solar, Insurance, Legal",
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
                accent: "var(--soft-blue)"
              },
              {
                icon: <Users className="w-10 h-10 text-warm-yellow" />,
                title: "Agencies",
                subtitle: "Marketing, Performance, Sales",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
                accent: "var(--warm-yellow)"
              }
            ].map((item, index) => (
              <div
                key={index}
                className=""
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration={1000}
              >
                <div className="group bg-white/5 backdrop-blur-sm border border-bright-blue/20 rounded-2xl overflow-hidden hover:bg-warm-yellow/10 hover:border-warm-yellow/30 transition-all duration-300 transform hover:-translate-y-1">
                  {}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.title} - ${item.subtitle}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    {}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {}
                    <div className="absolute top-4 right-4">
                      <div className="w-14 h-14 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-warm-yellow/30 transition-all duration-300">
                        {React.cloneElement(item.icon, { className: "w-8 h-8 text-white group-hover:text-warm-yellow transition-colors duration-300" })}
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="relative p-8 text-center">
                    {}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full">
                        <pattern id={`dots-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill="currentColor" className="text-bright-blue" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
                      </svg>
                    </div>

                    {}
                    <div className="relative z-10">
                      <h3 className="card-heading text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="body-text text-white/90">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-warm-yellow to-warm-yellow/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </div>
            ))}
          </div>
      </section>

      {}
      <section className="section-padding relative bg-deep-blue">
        {}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bright-blue via-warm-yellow to-bright-blue opacity-20" />
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
              <span
                className="inline-block px-6 py-2 mb-4 text-bright-blue font-semibold bg-bright-blue/10 rounded-full border border-bright-blue/20"
                data-aos="fade-down"
                data-aos-duration={1000}
              >
                Success Metrics
              </span>
              <h2
                className="section-heading text-white mb-12"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                Proven <span className="text-warm-yellow">Results</span>
              </h2>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-5">
              <div
                className="relative p-10 bg-white/5 backdrop-blur-sm border border-bright-blue/20 rounded-2xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                {}
                <div className="absolute top-8 left-10 hero-heading text-soft-blue/20">"</div>

                {}
                <p className="body-text text-text-light leading-relaxed pl-12">
                  The audit and strategy provided by the Automis team had a major impact on my dental clinic, we reduced our cost per acquisition for <span className="text-transparent bg-gradient-to-r from-warm-yellow to-bright-blue bg-clip-text font-semibold">new clients by 20%,</span> while also decreasing team workload and increasing speed in contacting new leads.
                </p>

                {}
                <div className="flex items-center gap-4 pl-12 mt-8">
                  <div className="w-16 h-16 bg-bright-blue/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">MS</span>
                  </div>
                  <div>
                    <h4 className="card-heading text-white">
                      Dr. Mario Schettino
                    </h4>
                    <p className="small-text text-white/90">
                      Nola Italy
                    </p>
                  </div>
                </div>
              </div>

          </div>
      </section>

      {}
      <ClientLogosCarousel />

      {}
      <FAQSection
        sectionTitle="Frequently Asked Questions"
        sectionSubtitle="FAQ"
        sectionDescription="Find answers to common questions about our Paid Ads Management service. We're here to help you understand how we can grow your business."
        iconClass="fas fa-question-circle"
        bgColor="bg-deep-blue"
        accentColor="var(--yellow-light)"
        faqs={[
          {
            question: "How much ad budget do I need to start?",
            answer: "We recommend a minimum of €3,000/month for statistically significant testing and optimization."
          },
          {
            question: "How soon can I see results?",
            answer: "Most clients see measurable lift within 30 days of campaign launch."
          },
          {
            question: "Can I cancel at any time?",
            answer: "Yes, you can cancel your service at any time with 30 days notice. We believe in earning your business every month through results."
          }
        ]}
      />

      {}
      <section className="section-padding bg-deep-blue relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className=" rounded-2xl p-12 text-center">
              <h2
                className="section-heading text-white mb-8"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                Ready to <span className="text-warm-yellow">grow your Business?</span>
              </h2>
              <div
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1000}
              >
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                  external={true}
                  variant="primary"
                  size="xlarge"
                >
                  Book Discovery Call
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default PaidAdsManagementPage;