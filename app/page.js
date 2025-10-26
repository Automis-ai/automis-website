"use client";
import React, { useState, useEffect, useRef } from "react";
import Counter from "@/components/Counter";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import dynamic from "next/dynamic";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import {
  Heart,
  Home,
  Sparkles,
  Wrench,
  Zap,
  Rocket,
  TrendingUp,
  Bot,
  Phone,
  Target,
  Brain,
  Headphones,
} from "lucide-react";

const TestimonialSlider = dynamic(
  () => import("@/components/TestimonialSlider"),
  {
    ssr: false,
  }
);

const ClientLogosCarousel = dynamic(
  () => import("@/components/ClientLogosCarousel"),
  {
    ssr: false,
  }
);

const Index = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animatedSteps, setAnimatedSteps] = useState([]);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [showSchedulerModal, setShowSchedulerModal] = useState(false);
  const [auditFormData, setAuditFormData] = useState({
    name: "",
    email: "",
  });
  const [auditFormStatus, setAuditFormStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const animatedPathRef = useRef(null);
  const sectionRef = useRef(null);

  // Configure your webhook URL here
  const AUDIT_WEBHOOK_URL =
    "https://services.leadconnectorhq.com/hooks/3vDTnFmYGG0S3a8fbz3K/webhook-trigger/ce4512a8-a971-4785-903a-42f4188c4f1e";

  const handleAuditInputChange = (e) => {
    const { name, value } = e.target;
    setAuditFormData({
      ...auditFormData,
      [name]: value,
    });
  };

  const handleAuditFormSubmit = async (e) => {
    e.preventDefault();
    setAuditFormStatus({ loading: true, success: false, error: null });

    try {
      // Prepare form data for webhook
      const webhookData = {
        name: auditFormData.name,
        email: auditFormData.email,
        timestamp: new Date().toISOString(),
        source: "jumpstart-audit-form",
        type: "audit-request",
      };

      // Only send if webhook URL is configured
      if (AUDIT_WEBHOOK_URL) {
        const response = await fetch(AUDIT_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        });

        if (!response.ok) {
          throw new Error(`Webhook error: ${response.status}`);
        }
      }

      // Show success state
      setAuditFormStatus({ loading: false, success: true, error: null });

      // Reset form after 3 seconds
      setTimeout(() => {
        setAuditFormStatus({ loading: false, success: false, error: null });
        setAuditFormData({
          name: "",
          email: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Audit form submission error:", error);
      setAuditFormStatus({
        loading: false,
        success: false,
        error:
          "Failed to submit request. Please try again or contact us directly.",
      });

      // Clear error after 5 seconds
      setTimeout(() => {
        setAuditFormStatus({ loading: false, success: false, error: null });
      }, 5000);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Discovery Call",
      duration: "Up to 30 min",
      description: "We uncover your growth bottlenecks.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Audit",
      duration: "2 weeks / 20+ deck audit",
      description: "We analyze your ads, funnel, and missed-call performance.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Workshop",
      duration: "1h Brainstorming",
      description: "We show you how AI fixes leaks in your funnel.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Roadmap",
      duration: " 90 days Roadmap Delivered",
      description: "You get a step-by-step playbook to scale.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const path = animatedPathRef.current;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 3s ease-in-out";
        path.style.strokeDashoffset = "0";
      }, 800);
    }
  }, []);

  useEffect(() => {
    const handleStickyScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const footer = document.querySelector(".main-footer");

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const footerTop = footerRect.top + scrollY;

        if (scrollY > 300 && scrollY < footerTop - windowHeight) {
          setShowStickyButton(true);
        } else {
          setShowStickyButton(false);
        }
      } else {
        setShowStickyButton(
          scrollY > 300 && scrollY < documentHeight - windowHeight * 1.5
        );
      }
    };

    const handleFocusIn = (e) => {
      if (e.target.matches("input, textarea, select")) {
        setShowStickyButton(false);
      }
    };

    const handleFocusOut = () => {
      setTimeout(() => {
        handleStickyScroll();
      }, 100);
    };

    window.addEventListener("scroll", handleStickyScroll);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    handleStickyScroll();

    return () => {
      window.removeEventListener("scroll", handleStickyScroll);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && animatedSteps.length === 0) {
            steps.forEach((step, index) => {
              setTimeout(() => {
                setAnimatedSteps((prev) => {
                  if (!prev.includes(step.id)) {
                    return [...prev, step.id];
                  }
                  return prev;
                });
              }, index * 400);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    const handleScroll = () => {
      const stepElements = document.querySelectorAll(".process-step");
      stepElements.forEach((stepEl, index) => {
        const stepRect = stepEl.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const stepCenter = stepRect.top + stepRect.height / 2;
        const viewportCenter = windowHeight / 2;

        const distance = Math.abs(stepCenter - viewportCenter);
        const maxDistance = windowHeight / 2;

        if (distance < maxDistance * 0.6) {
          setActiveStep(index + 1);
        }
      });
    };

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animatedSteps.length]);

  const founders = [
    {
      name: "Luca Casillo",
      role: "Co-Founder",
      mission:
        "Building innovative solutions that transform ideas into reality through cutting-edge technology.",
      image: "/assets/images/headshots/luca.jpeg",
    },
    {
      name: "Arcangelo Bianco",
      role: "Co-Founder",
      mission:
        "Empowering businesses with strategic vision and seamless execution in the digital landscape.",
      image: "/assets/images/headshots/arcangelo.jpeg",
    },
    {
      name: "Huzaifa Yousaf",
      role: "AI Expert",
      mission:
        "Pioneering artificial intelligence solutions bridge the gap between human potential and machine capability.",
      image: "/assets/images/headshots/huza.jpg",
    },
  ];

  return (
    <AkpagerLayout>
      {/* <div className="lg:hidden">
        <MobileHeroAndStickyCTA />
      </div> */}

      <section
        className="hero-area bgs-cover bg-bg-primary relative block"
        style={{ background: "url(assets/images/backgrounds/b-image.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/80 z-0"></div>

        <div className="container mx-auto px-4 relative z-10 hero-padding">
          <div className="flex flex-wrap -mx-4 justify-center">
            <div className="px-4 w-full lg:w-5/6 md:w-11/12">
              <div className="hero-content text-center">
                <div
                  className="mb-2 inline-flex items-center justify-center rounded-full bg-[#3C91E6]/15 border border-[#3C91E6]/25 px-4 py-2"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  data-aos-duration={1500}
                >
                  <span className="text-sm md:text-base font-semibold text-[#3C91E6] tracking-wide">
                    AI & Marketing Agency
                  </span>
                </div>
                <h1
                  className="mb-8"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <span className="hero-heading block text-white mb-4 max-w-3xl mx-auto">
                    Transform your entire <br />{" "}
                    <span className="text-text-blue">Lead Funnel with AI</span>
                  </span>
                  <span className="block sub-heading  max-w-xl mx-auto">
                    We combine AI Voice Agents, automations, and high-ROI ads
                    into one roadmap designed to increase booked calls and
                    revenue.
                  </span>
                </h1>
                <div
                  className="flex flex-col items-center gap-3"
                  data-aos="fade-up"
                  data-aos-delay={400}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    variant="secondary"
                    size="medium"
                    external={true}
                    className="w-fit"
                  >
                    Book Discovery Call
                  </CTAButton>
                  <div className="inline-flex items-center gap-2 text-white/70 text-sm">
                    <svg
                      className="w-4 h-4 text-yellow-light"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                    </svg>
                    <span className="font-semibold">+27</span> booked this month
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 relative z-10 section-padding">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 md:justify-center">
              <div
                className="group"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-warm-yellow/30 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] min-h-[280px] flex flex-col">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 80% 50%, rgba(254, 196, 88, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(60, 145, 230, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(254, 196, 88, 0.08) 0%, transparent 50%)",
                    }}
                  ></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 relative">
                      <div className="w-12 h-12 rounded-xl bg-bright-blue/20 flex items-center justify-center border border-bright-blue/30 group-hover:border-warm-yellow transition-all duration-300">
                        <Target
                          className="w-6 h-6 text-blue-lightest group-hover:text-yellow-light transition-colors duration-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-lightest/20 rounded-lg blur-xl group-hover:bg-yellow-light/20 group-hover:scale-125 transition-all duration-500"></div>
                    </div>

                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      High-ROI Paid Ads
                    </h4>

                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors flex-grow">
                      Google & Meta Ads Optimized with AI for Maximum ROI
                    </p>

                    <Link legacyBehavior href="/paid-ads-management">
                      <a className="flex items-center text-blue-lightest small-text font-medium group-hover:text-yellow-light transition-colors cursor-pointer mt-auto">
                        <span className="mr-2">Explore Service</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className="group"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-warm-yellow/30 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] min-h-[280px] flex flex-col">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 80% 50%, rgba(254, 196, 88, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(60, 145, 230, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(254, 196, 88, 0.08) 0%, transparent 50%)",
                    }}
                  ></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 relative">
                      <div className="w-12 h-12 rounded-xl bg-bright-blue/20 flex items-center justify-center border border-bright-blue/30 group-hover:border-warm-yellow transition-all duration-300">
                        <Brain
                          className="w-6 h-6 text-blue-lightest group-hover:text-yellow-light transition-colors duration-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-lightest/20 rounded-lg blur-xl group-hover:bg-yellow-light/20 group-hover:scale-125 transition-all duration-500"></div>
                    </div>

                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Tailored Automations
                    </h4>

                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors flex-grow">
                      Smart Automations that Nurture & Qualify Leads Without
                      Extra Staff
                    </p>

                    <Link legacyBehavior href="/ai-automations">
                      <a className="flex items-center text-blue-lightest small-text font-medium group-hover:text-yellow-light transition-colors cursor-pointer mt-auto">
                        <span className="mr-2">Explore Service</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className="group md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:mx-0 w-full"
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-warm-yellow/30 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] min-h-[280px] flex flex-col">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 80% 50%, rgba(254, 196, 88, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(60, 145, 230, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(254, 196, 88, 0.08) 0%, transparent 50%)",
                    }}
                  ></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 relative">
                      <div className="w-12 h-12 rounded-xl bg-bright-blue/20 flex items-center justify-center border border-bright-blue/30 group-hover:border-warm-yellow transition-all duration-300">
                        <Headphones
                          className="w-6 h-6 text-blue-lightest group-hover:text-yellow-light transition-colors duration-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-lightest/20 rounded-lg blur-xl group-hover:bg-yellow-light/20 group-hover:scale-125 transition-all duration-500"></div>
                    </div>

                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      24/7 AI Assistant
                    </h4>

                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors flex-grow">
                      AI Voice Agents That Answer Every Call and Book
                      Appointments Instantly
                    </p>

                    <Link legacyBehavior href="/voice-ai">
                      <a className="flex items-center text-blue-lightest small-text font-medium group-hover:text-yellow-light transition-colors cursor-pointer mt-auto">
                        <span className="mr-2">Explore Service</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-bg-primary" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="mb-8" data-aos="fade-up" data-aos-duration="800">
            <h2 className="section-heading text-white text-center">
              How It Works
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row -mx-4 items-center gap-8 lg:gap-0">
            <div
              className="px-4 w-full lg:w-1/2 order-2 lg:order-1"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="process-container">
                <div className="flow-line hidden lg:block"></div>

                <div className="space-y-0">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`process-step ${
                        animatedSteps.includes(step.id) ? "animated" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 150}ms`,
                      }}
                      onMouseEnter={() => setActiveStep(step.id)}
                    >
                      <div className="step-content">
                        <div
                          className={`connection-dot hidden lg:block ${
                            activeStep === step.id ? "active" : ""
                          } ${animatedSteps.includes(step.id) ? "glow" : ""}`}
                        ></div>

                        <div className="flex items-start gap-4">
                          <div
                            className={`step-icon w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 ${
                              activeStep === step.id ? "active" : ""
                            } ${animatedSteps.includes(step.id) ? "glow" : ""}`}
                          >
                            {step.icon}
                          </div>

                          <div className="step-details flex-1">
                            <div
                              className={`step-meta text-sm lg:text-base ${
                                activeStep === step.id ? "active" : ""
                              }`}
                            >
                              Step {step.id} • {step.duration}
                            </div>

                            <h3
                              className={`text-lg lg:text-xl font-semibold mb-2 ${
                                activeStep === step.id
                                  ? "active text-white"
                                  : "text-text-light"
                              }`}
                            >
                              {step.title}
                            </h3>

                            <p
                              className={`text-base lg:text-lg step-description ${
                                activeStep === step.id ? "active" : ""
                              }`}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="px-4 w-full lg:w-1/2 order-1 lg:order-2"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <div className="visual-container">
                <div className="image-placeholder">
                  <img
                    src="/assets/images/flow.jpg"
                    alt="How it works process flow"
                    className="process-image w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <CTAButton href="/jumpstart-audit" variant="primary" size="medium">
              Learn About Jumpstart
            </CTAButton>
          </div>

          <div className="mt-16">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-darkest/40 to-blue-darkest/20 backdrop-blur-xl rounded-xl lg:rounded-3xl p-6 md:p-8 lg:p-12 border border-blue-middle/20 shadow-2xl">
                <div
                  className="text-center mb-8 lg:mb-10"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <h3 className="text-white mb-4 text-2xl lg:text-3xl font-bold">
                    See What a Jumpstart Audit Looks Like
                  </h3>
                  <p className="text-[#EAEAEA] max-w-2xl mx-auto text-base lg:text-lg mb-6">
                    Get a sample audit report to understand how we analyze your
                    marketing performance and identify growth opportunities.
                  </p>
                </div>

                <form
                  className="max-w-2xl mx-auto"
                  onSubmit={handleAuditFormSubmit}
                >
                  {auditFormStatus.error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                      <p className="text-white text-sm">
                        {auditFormStatus.error}
                      </p>
                    </div>
                  )}
                  {auditFormStatus.success && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                      <p className="text-white text-sm">
                        Success! Check your email for the audit report.
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div>
                      <label
                        htmlFor="audit-name"
                        className="block text-[#EAEAEA] text-sm mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="audit-name"
                        name="name"
                        required
                        aria-required="true"
                        value={auditFormData.name}
                        onChange={handleAuditInputChange}
                        className="w-full h-12 px-4 py-3 bg-white/5 backdrop-blur-sm border border-[#B4C2FF]/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3C91E6] focus:border-[#3C91E6] transition-all duration-300 hover:bg-white/10"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="audit-email"
                        className="block text-[#EAEAEA] text-sm mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="audit-email"
                        name="email"
                        required
                        aria-required="true"
                        value={auditFormData.email}
                        onChange={handleAuditInputChange}
                        className="w-full h-12 px-4 py-3 bg-white/5 backdrop-blur-sm border border-[#B4C2FF]/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3C91E6] focus:border-[#3C91E6] transition-all duration-300 hover:bg-white/10"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={auditFormStatus.loading}
                      className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2 bg-[#3C91E6] hover:bg-[#0A3D62] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3C91E6] focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Get Free Audit Example"
                    >
                      {auditFormStatus.loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Download Audit</span>
                          <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-white/90 text-sm mt-4">
                      No credit card required • Instant download
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h2 className="section-heading text-white mb-4">
              Industries We Serve
            </h2>
            <p className="sub-heading max-w-3xl mx-auto">
              Transforming businesses across diverse industries with AI-powered
              marketing solutions and automated growth strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            <div
              className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-4 md:p-6 lg:p-8 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#3C91E6]/20 rounded-lg lg:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                <Heart className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#3C91E6] group-hover:text-yellow-light" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                Dentists & Healthcare
              </h3>
              <p className="text-base text-white/90">
                30–50% of calls to clinics go unanswered. Our AI agents answer
                every call, book patients, and integrate with your practice
                software.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-4 md:p-6 lg:p-8 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#3C91E6]/20 rounded-lg lg:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                <Home className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#3C91E6] group-hover:text-yellow-light" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                Real Estate
              </h3>
              <p className="text-base text-white/90">
                Agents lose 70% of online leads due to slow follow-up. Our AI
                ISA calls and texts leads instantly, 24/7.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-4 md:p-6 lg:p-8 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#3C91E6]/20 rounded-lg lg:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#3C91E6] group-hover:text-yellow-light" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                Med-Spas
              </h3>
              <p className="text-base text-white/90">
                Never lose a Botox or filler inquiry again. Our AI nurtures
                leads and books consults while you focus on clients.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-4 md:p-6 lg:p-8 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#3C91E6]/20 rounded-lg lg:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                <Wrench className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#3C91E6] group-hover:text-yellow-light" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                Home Services
              </h3>
              <p className="text-base text-white/90">
                Our AI voice agents answer 24/7, qualify the job, and book
                directly into your calendar—so you never lose a lead to
                voicemail again.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-4 md:p-6 lg:p-8 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="500"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#3C91E6]/20 rounded-lg lg:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                <Zap className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#3C91E6] group-hover:text-yellow-light" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                Lead gen business
              </h3>
              <p className="text-base text-white/90">
                We plug AI agents and automations into your funnel, responding
                to every lead within seconds. More speed-to-lead = more closed
                deals for your clients.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-4 md:p-6 lg:p-8 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="600"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#3C91E6]/20 rounded-lg lg:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                <Rocket className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#3C91E6] group-hover:text-yellow-light" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                Marketing Agencies
              </h3>
              <p className="text-base text-white/90">
                With Automis, agencies stop selling 'just leads' and start
                delivering booked appointments. Our white-label AI Agent and
                automations turn your campaigns into an appointment booking
                machine.
              </p>
            </div>
          </div>

          <div
            className="text-center mt-12"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="700"
          >
            <h3 className="sub-heading text-white mb-4">
              Ready to Transform Your Industry?
            </h3>
            <p className="body-text text-white/90 mb-8 max-w-2xl mx-auto">
              Discover how our AI-powered solutions can accelerate growth in
              your specific market with a free discovery call.
            </p>
            <CTAButton
              href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
              variant="secondary"
              size="medium"
              external={true}
            >
              Book Discovery Call
            </CTAButton>
          </div>
        </div>
      </section>

      <ClientLogosCarousel title="Brands Growing with Us" />

      <section
        className="relative bg-cover bg-center section-padding"
        style={{
          backgroundImage: `url(assets/images/backgrounds/cta.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap -mx-4 items-center text-center md:!text-left justify-center md:justify-between">
            <div className="px-4 xl:w-1/2 lg:w-7/12 mb-8 lg:mb-0">
              <div
                className="flex flex-col items-start"
                data-aos="fade-left"
                data-aos-duration={1000}
                data-aos-offset={50}
              >
                <div className="mb-6 lg:mb-8">
                  <span className="text-yellow-light text-base lg:text-lg font-semibold block mb-3 lg:mb-4">
                    AI Solutions
                  </span>
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                    Ready to Jumpstart Your Growth?
                  </h2>
                </div>

                <div className="lg:hidden w-full">
                  <button
                    onClick={() => setShowSchedulerModal(true)}
                    className="w-full bg-[#3C91E6] hover:bg-[#0A3D62] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Schedule a Call
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <p className="text-white/70 text-sm mt-3 text-center">
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </p>
                </div>

                <div className="hidden lg:block">
                  <CTAButton
                    variant="primary"
                    size="medium"
                    className="cursor-default"
                  >
                    Book Discovery Call
                  </CTAButton>
                </div>
              </div>
            </div>

            <div className="px-4 w-full lg:w-5/12 hidden lg:block">
              <div
                data-aos="fade-right"
                data-aos-duration={1000}
                data-aos-offset={50}
              >
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="Book Discovery Call"
                    className="bg-white rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {showSchedulerModal && (
          <div className="fixed inset-0 z-[2000] flex items-end lg:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSchedulerModal(false)}
            />

            <div className="relative bg-white rounded-t-2xl w-full max-h-[90vh] animate-slideUp">
              <div className="flex justify-center py-3">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>

              <button
                onClick={() => setShowSchedulerModal(false)}
                className="absolute top-4 right-4 text-gray-500 p-2"
                aria-label="Close scheduler"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="text-center px-4 pb-2">
                <p className="text-sm text-gray-600">
                  Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </p>
              </div>

              <div
                className="overflow-auto"
                style={{ height: "calc(90vh - 80px)" }}
              >
                <iframe
                  src="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Book Discovery Call"
                  className="min-h-[600px]"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <style jsx>{`
        @keyframes glowPulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(60, 145, 230, 0.3),
              0 0 40px rgba(60, 145, 230, 0.2),
              0 0 60px rgba(245, 205, 121, 0.15), 0 10px 40px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(60, 145, 230, 0.5),
              0 0 60px rgba(60, 145, 230, 0.3),
              0 0 80px rgba(245, 205, 121, 0.25), 0 10px 40px rgba(0, 0, 0, 0.3);
          }
        }

        @keyframes borderGlow {
          0%,
          100% {
            box-shadow: inset 0 0 20px rgba(180, 194, 255, 0.1),
              inset 0 0 40px rgba(60, 145, 230, 0.05);
          }
          50% {
            box-shadow: inset 0 0 30px rgba(180, 194, 255, 0.2),
              inset 0 0 50px rgba(60, 145, 230, 0.1);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        .sticky-cta-glow {
          animation: glowPulse 3s ease-in-out infinite;
        }

        .sticky-cta-inner {
          animation: borderGlow 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .mobile-sticky-glow::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            45deg,
            #3c91e6,
            #fec458,
            #b4c2ff,
            #3c91e6
          );
          background-size: 400% 400%;
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s;
          animation: gradient-shift 3s ease infinite;
          z-index: -1;
        }

        .mobile-sticky-glow:hover::before {
          opacity: 0.8;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div
        className={`w-max hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          showStickyButton
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        }`}
        style={{ maxWidth: "95%", transform: "translateX(-50%)" }}
      >
        <div
          className="sticky-cta-glow relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 10, 20, 0.95) 0%, rgba(0, 10, 20, 0.9) 100%)",
            borderRadius: "100px",
            padding: "2px",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, rgba(245, 205, 121, 0.3) 0%, transparent 60%)",
              borderRadius: "100px",
            }}
          />

          <div
            className="sticky-cta-inner relative flex items-center justify-between gap-6 backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 10, 20, 0.98) 0%, rgba(0, 10, 20, 0.95) 100%)",
              borderRadius: "100px",
              padding: "18px 24px 18px 36px",
            }}
          >
            <div className="flex items-center gap-5">
              <div>
                <p className="text-white text-base font-semibold">
                  Transform Your Lead Funnel
                </p>
                <p className="text-white/70 text-sm">
                  Get your free audit + 90-day roadmap
                </p>
              </div>
            </div>

            <div style={{ borderRadius: "80px", overflow: "hidden" }}>
              <CTAButton
                href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                variant="secondary"
                size="medium"
                external={true}
                className="!rounded-full !text-base"
              >
                Book Discovery Call
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          showStickyButton
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-20 opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          width: "90%",
          maxWidth: "320px",
        }}
      >
        <div className="mobile-sticky-glow relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-middle via-yellow-light to-blue-lightest rounded-xl blur-lg opacity-60 group-hover:opacity-90 animate-pulse-glow"></div>
          <div className="relative">
            <CTAButton
              href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
              variant="secondary"
              size="medium"
              external={true}
              className="!text-base !py-4 !px-10 !font-semibold !w-full"
            >
              Book Discovery Call
            </CTAButton>
          </div>
        </div>
      </div>
    </AkpagerLayout>
  );
};
export default Index;
