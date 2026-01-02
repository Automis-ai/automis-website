"use client";
import Counter from "@/components/Counter";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import { sliderProps } from "@/utility/sliderProps";
import Link from "next/link";
import Slider from "react-slick";
import { Sparkles, Target, Users, Handshake, TrendingUp, Brain, BarChart3, Shield, Heart, ArrowRight, Zap, Code2, Cpu } from "lucide-react";
import { useEffect, useRef } from "react";
import CTAButton from "@/components/CTAButton";

const page = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
            ctx.strokeStyle = `rgba(115, 185, 254, ${0.1 * (1 - distance / 100)})`;
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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
          style={{ pointerEvents: 'none' }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="px-4 lg:w-7/12">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 mb-8 bg-blue-middle/20 px-6 py-3 rounded-full backdrop-blur-sm border border-blue-middle/20" data-aos="fade-up" data-aos-duration={1500}>
                  <Zap className="text-yellow-light w-5 h-5" />
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Powered by AI Innovation</span>
                </div>

                <h1 className="hero-heading text-white mb-6 leading-tight" data-aos="fade-up" data-aos-duration={1500} data-aos-delay={100}>
                  Meet the Minds Behind
                  <br />
                  <span className="text-text-blue">Automis Innovation</span>
                </h1>

                <p className="body-text text-white/90 leading-relaxed mb-10 max-w-2xl" data-aos="fade-up" data-aos-duration={1500} data-aos-delay={200}>
                  Three visionaries united by a passion for AI and marketing excellence. Together, we're building the future of automated business growth.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12" data-aos="fade-up" data-aos-duration={1500} data-aos-delay={300}>
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    variant="primary"
                    size="medium"
                    external={true}
                  >
                    Book Discovery Call
                  </CTAButton>
                  <CTAButton
                    href="#our-story"
                    variant="ghost"
                    size="medium"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    Our Story
                  </CTAButton>
                </div>

                {}
                <div className="flex flex-wrap gap-8 justify-start items-center" data-aos="fade-up" data-aos-duration={1500} data-aos-delay={400}>
                  <div>
                    <h3 className="sub-heading font-bold text-yellow-light mb-1">98%</h3>
                    <p className="small-text text-white/90">Client Retention</p>
                  </div>
                  <div>
                    <h3 className="sub-heading font-bold text-yellow-light mb-1">3x</h3>
                    <p className="small-text text-white/90">Average ROI</p>
                  </div>
                  <div>
                    <h3 className="sub-heading font-bold text-yellow-light mb-1">24/7</h3>
                    <p className="small-text text-white/90">AI Support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 lg:w-5/12 mt-12 lg:mt-0">
              <div className="relative" data-aos="fade-left" data-aos-duration={1500}>
                {}
                <div className="absolute -top-4 md:-top-8 -left-4 md:-left-8 bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-4 md:p-6 rounded-2xl shadow-2xl about-hero-floating-card z-20 hidden sm:block hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <Code2 className="text-yellow-light w-6 md:w-8 h-6 md:h-8 mb-2" />
                  <h4 className="text-white font-semibold text-xs md:text-sm">AI Models</h4>
                  <p className="text-white/90 text-xs">50+ Deployed</p>
                </div>

                <div className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-4 md:p-6 rounded-2xl shadow-2xl about-hero-floating-card z-20 hidden sm:block hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" style={{ animationDelay: '3s' }}>
                  <Cpu className="text-yellow-light w-6 md:w-8 h-6 md:h-8 mb-2" />
                  <h4 className="text-white font-semibold text-xs md:text-sm">Processing Power</h4>
                  <p className="text-white/90 text-xs">10TB+ Daily</p>
                </div>

                {}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-middle/20 to-yellow-light/20 about-hero-glow"></div>
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
                    alt="AI Network Visualization showing interconnected data streams and technology patterns"
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
                    <div className="absolute top-2/3 left-0 right-0 about-tech-grid-line" style={{ animationDelay: '1.5s' }}></div>
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
                  alt="Automis team collaborating in modern office space"
                  className="w-full h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute bottom-8 right-4 lg:-right-12 bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-6 lg:p-8 rounded-2xl shadow-xl hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <h3 className="sub-heading font-bold text-yellow-light mb-2">
                    <Counter end={3} />+
                  </h3>
                  <span className="body-text text-white/90">Years of Excellence</span>
                </div>
              </div>
            </div>
            <div className="px-4 lg:w-1/2">
              <div className="pl-0 lg:pl-12" data-aos="fade-left" data-aos-duration={1500}>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="text-yellow-light w-6 h-6" />
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Our Story</span>
                </div>
                <h2 className="section-heading text-white font-medium mb-6">
                  Building the Future of AI-Driven Marketing
                </h2>
                <p className="body-text text-white/90 mb-4">
                  Automis was founded on the belief that artificial intelligence and human expertise
                  work best together. Luca and Arcangelo recognized that many small businesses
                  and startups wanted to leverage AI but lacked the know-how.
                </p>
                <p className="body-text text-white/90 mb-8">
                  They created Automis to combine advanced AI tools with hands-on marketing strategies,
                  making it simple for you to grow and innovate. Today, we're proud to be the bridge
                  between cutting-edge technology and practical business results.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="group flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                    <i className="far fa-check-circle text-yellow-light text-xl group-hover:scale-125 transition-transform"></i>
                    <span className="body-text text-white font-medium">AI-Powered Solutions</span>
                  </div>
                  <div className="group flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                    <i className="far fa-check-circle text-yellow-light text-xl group-hover:scale-125 transition-transform"></i>
                    <span className="body-text text-white font-medium">Human Expertise</span>
                  </div>
                  <div className="group flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                    <i className="far fa-check-circle text-yellow-light text-xl group-hover:scale-125 transition-transform"></i>
                    <span className="body-text text-white font-medium">Proven Results</span>
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
                    <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
                  </div>
                  <h2 className="section-heading text-white font-medium mb-6">
                    Empowering Growth Through Innovation
                  </h2>
                  <p className="body-text text-white/90 mb-4">
                    We empower growing companies to harness data and automation for tangible results.
                  </p>
                  <p className="body-text text-white/90 mb-12">
                    By translating complex AI technologies into clear, actionable plans, we free you
                    to focus on your customers and accelerate your success. Our approach combines
                    the best of both worlds - cutting-edge AI capabilities with the strategic thinking
                    and creativity that only humans can provide.
                  </p>

                </div>
              </div>
              <div className="px-4 lg:w-1/2 order-1 lg:order-2">
                <div className="relative" data-aos="fade-left" data-aos-duration={1500}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-middle/20 to-yellow-light/20 rounded-3xl blur-2xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&h=600&fit=crop"
                    alt="Automis innovation lab with cutting-edge AI technology and equipment"
                    className="relative w-full h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                    loading="lazy"
                  />
                  <div className="absolute top-8 left-8 bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-6 rounded-2xl shadow-xl hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h4 className="sub-heading text-yellow-light font-bold">24/7</h4>
                    <p className="small-text text-white/90">AI Support Available</p>
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
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Core Values</span>
                </div>
                <h2 className="section-heading text-white font-medium">
                  The Principles That Guide <br/> Everything We Do
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
                <h4 className="card-heading text-white mb-3">Relentless Innovation</h4>
                <p className="body-text text-white/90">
                  We continually experiment with the latest AI models and marketing platforms
                  to keep you ahead of the curve.
                </p>
              </div>
            </div>
            <div className="px-4 xl:w-1/4 lg:w-1/3 sm:w-1/2 mb-8" data-aos="fade-up" data-aos-delay={100} data-aos-duration={1000}>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full text-center hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300 mx-auto">
                  <BarChart3 className="w-8 h-8 text-blue-middle group-hover:text-yellow-light" />
                </div>
                <h4 className="card-heading text-white mb-3">Data-Driven Decisions</h4>
                <p className="body-text text-white/90">
                  Every strategy is grounded in real metrics and thorough analysis—no guesswork.
                </p>
              </div>
            </div>
            <div className="px-4 xl:w-1/4 lg:w-1/3 sm:w-1/2 mb-8" data-aos="fade-up" data-aos-delay={200} data-aos-duration={1000}>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full text-center hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300 mx-auto">
                  <Users className="w-8 h-8 text-blue-middle group-hover:text-yellow-light" />
                </div>
                <h4 className="card-heading text-white mb-3">Human + AI Collaboration</h4>
                <p className="body-text text-white/90">
                  We blend human creativity with machine efficiency to achieve optimal outcomes.
                </p>
              </div>
            </div>
            <div className="px-4 xl:w-1/4 lg:w-1/3 sm:w-1/2 mb-8" data-aos="fade-up" data-aos-delay={300} data-aos-duration={1000}>
              <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full text-center hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300 mx-auto">
                  <Handshake className="w-8 h-8 text-blue-middle group-hover:text-yellow-light" />
                </div>
                <h4 className="card-heading text-white mb-3">Transparency & Integrity</h4>
                <p className="body-text text-white/90">
                  From our first call through monthly reports, we maintain open communication
                  and clear expectations.
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
                  "Our mission is to make sophisticated AI accessible and actionable,
                  turning insights into impact and clicks into clients."
                </h2>
                <p className="sub-heading text-yellow-light font-semibold">— The Automis Team</p>
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
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Leadership Team</span>
                </div>
                <h2 className="section-heading text-white font-medium mb-4">Meet the Founders</h2>
                <p className="body-text text-white/90">
                  The visionaries behind Automis who are passionate about making AI work for your business.
                </p>
              </div>
            </div>
          </div>
<div className="flex flex-wrap -mx-4 justify-center">
  {/* Luca */}
  <div className="px-4 lg:w-1/2 md:w-1/2 mb-8">
    <div
      className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-yellow-light/30 transition-all duration-300 group hover:transform hover:scale-[1.03] h-full flex flex-col"
      data-aos="fade-up"
      data-aos-duration={1000}
    >
      <div className="p-8 text-center flex flex-col h-full">
        <div className="relative inline-block mb-6 mx-auto">
          <img
            src="/assets/images/headshots/luca.jpeg"
            alt="Vincenzo Luca Casillo - Co-Founder and Digital Marketing Expert at Automis"
            className="w-60 h-60 rounded-full object-cover object-top border-4 border-bright-blue group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <a
            href="https://www.linkedin.com/in/vincenzo-luca-casillo/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 w-12 h-12 bg-bright-blue text-white rounded-full flex items-center justify-center hover:bg-warm-yellow hover:text-blue-darkest transition-all duration-300 shadow-lg"
            aria-label="LinkedIn profile of Vincenzo Luca Casillo"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>

        <h3 className="text-2xl font-bold text-white mb-1">
          Vincenzo Luca Casillo
        </h3>
        <p className="text-bright-blue font-medium mb-4">
          Digital Marketing & AI Growth Strategy
        </p>
        <p className="text-base text-white/90 font-open-sans leading-relaxed mb-6">
          Turns paid traffic into predictable revenue with conversion-first funnels,
          lead follow-up systems, and performance-driven strategy.
        </p>

        {/* Optional CTA per card */}
        <div className="mt-auto">
          <a
            href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-yellow-light text-blue-darkest hover:bg-yellow-dark hover:text-white transition-all duration-300"
          >
            Book a discovery call
            <i
              className="far fa-arrow-right"
              style={{ transform: "rotate(-30deg)" }}
            />
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* Arcangelo */}
  <div className="px-4 lg:w-1/2 md:w-1/2 mb-8">
    <div
      className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-yellow-light/30 transition-all duration-300 group hover:transform hover:scale-[1.03] h-full flex flex-col"
      data-aos="fade-up"
      data-aos-delay={100}
      data-aos-duration={1000}
    >
      <div className="p-8 text-center flex flex-col h-full">
        <div className="relative inline-block mb-6 mx-auto">
          <img
            src="/assets/images/headshots/arcangelo.jpeg"
            alt="Arcangelo Bianco - Co-Founder and Advertising Expert at Automis"
            className="w-60 h-60 rounded-full object-cover object-top border-4 border-bright-blue group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <a
            href="https://www.linkedin.com/in/biancoarcangelo/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 w-12 h-12 bg-bright-blue text-white rounded-full flex items-center justify-center hover:bg-warm-yellow hover:text-blue-darkest transition-all duration-300 shadow-lg"
            aria-label="LinkedIn profile of Arcangelo Bianco"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>

        <h3 className="text-2xl font-bold text-white mb-1">Arcangelo Bianco</h3>
        <p className="text-bright-blue font-medium mb-4">Performance Advertising</p>
        <p className="text-base text-white/90 font-open-sans leading-relaxed mb-6">
          Builds and scales ad systems that improve CAC and ROAS across Meta, Google,
          and multi-channel acquisition.
        </p>

        {/* Optional CTA per card */}
        <div className="mt-auto">
          <a
            href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-yellow-light text-blue-darkest hover:bg-yellow-dark hover:text-white transition-all duration-300"
          >
            Book a discovery call
            <i
              className="far fa-arrow-right"
              style={{ transform: "rotate(-30deg)" }}
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

      {}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="px-4 lg:w-2/3">
              <div data-aos="fade-right" data-aos-duration={1500}>
                <h2 className="section-heading text-white font-medium mb-4">
                  Ready  to Transform Your Business?
                </h2>
                <p className="body-text text-white/90 mb-0">
                  If you're ready to unlock the full potential of AI for your business, let's Book Discovery Call.
                </p>
              </div>
            </div>
            <div className="px-4 lg:w-1/3 lg:text-right">
              <div className="mt-8 lg:mt-0" data-aos="fade-left" data-aos-duration={1500}>
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                  variant="primary"
                  size="large"
                  external={true}
                >
                  Book Discovery Call
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