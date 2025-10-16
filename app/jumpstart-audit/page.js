'use client';
import React, { useEffect, useState, useRef } from 'react';
import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import CTAButton from "@/components/CTAButton";
import {
  Target,
  TrendingUp,
  FileText,
  Phone,
  CheckCircle,
  Users,
  Building2,
  Home,
  Sparkles,
  Wrench,
  Zap,
  Rocket,
  ArrowRight,
  Brain,
  LineChart,
  Clock,
  Award,
  Briefcase,
  DollarSign,
  Shield,
  AlertCircle,
  PlusCircle,
  Calendar,
  Gift,
  Star,
  BarChart3,
  Search,
  Settings,
  TrendingDown,
  Activity,
  FileCheck,
  Gauge,
  MessageSquare,
  CheckSquare,
  XCircle,
  ChevronDown,
  Minus,
  Plus
} from 'lucide-react';

const JumpstartAudit = () => {
  const [lineHeight, setLineHeight] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});
  const desktopTimelineRef = useRef(null);
  const mobileTimelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const timelineRef = window.innerWidth >= 992 ? desktopTimelineRef : mobileTimelineRef;

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = rect.top;
        const timelineHeight = rect.height;

        if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
          const visibleStart = Math.max(0, windowHeight - timelineTop);
          const progress = Math.min(visibleStart / timelineHeight, 1);
          setLineHeight(progress * 100);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleCardExpansion = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };


  return (
    <AkpagerLayout>

      {}
      <section className="hero-padding bg-bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {}
        <div className="absolute inset-0 bg-black/60 z-1"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-5/6">
              <div className="hero-content text-center">
                <h1
                  className="hero-heading text-white mb-6"
                  data-aos="fade-up"
                  data-aos-duration={1200}
                >
                  <span>
                    Jumpstart Marketing
                  </span>
                  <br />
                  <span className="text-white">& AI Audit</span>
                </h1>

                <p
                  className="text-white/90 text-xl mb-8 max-w-3xl mx-auto"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  data-aos-duration={1200}
                >
                  In 15 days, we show you exactly how to cut wasted ad spend and turn more leads into booked revenue through tailored automations
                </p>

                {}
                <div
                  className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-6xl mx-auto mb-8"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  data-aos-duration={1200}
                >
                  {[
                    "Lower acquisition costs",
                    "Faster speed-to-lead",
                    "Fewer missed calls",
                    "More booked revenue"
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      {}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-middle/20 to-yellow-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                      {}
                      <div className="relative px-4 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-yellow-light/10 transition-all duration-300 hover:scale-[1.02] hover:border-yellow-light/30 overflow-hidden">
                        <span className="text-white font-semibold text-base lg:text-lg xl:text-xl block text-center whitespace-nowrap group-hover:text-yellow-light transition-colors duration-300">
                          {benefit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {}
                <div
                  className="mb-10"
                  data-aos="fade-up"
                  data-aos-delay={300}
                  data-aos-duration={1200}
                >
                  <p className="small-text text-yellow-light font-semibold flex items-center justify-center gap-2 mx-auto">
                    {/* <AlertCircle className="w-4 h-4" /> */}
                    Only 5 audit slots each month to guarantee live implementation on the final call
                  </p>
                </div>

                {}
                <div
                  className="flex justify-center"

                >
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    external={true}
                    variant="primary"
                    size="large"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Book Discovery Call
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-middle/10 rounded-full blur-3xl" />
          <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-yellow-light/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap justify-center mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading text-white mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                What You Get
              </h2>
              <p
                className="body-text text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                Two comprehensive audits delivering clear, actionable results
              </p>
            </div>
          </div>

          {}
          <div className="max-w-6xl mx-auto space-y-20">
            {}
            <div className="flex flex-col lg:flex-row items-center gap-12" data-aos="fade-up" data-aos-duration={1200}>
              <div className="flex-1 order-2 lg:order-1">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <BarChart3 className="w-8 h-8 text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                    </div>
                    <h3 className="sub-heading text-white">Marketing Performance Audit</h3>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-blue-middle/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Find & fix ad waste</h4>
                    <p className="body-text text-white/90">Clear stop / start / scale moves across Google, Meta, LinkedIn.</p>
                  </div>
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-blue-middle/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Sharper targeting & funnels</h4>
                    <p className="body-text text-white/90">Audience, offer, and landing tweaks to lift conversion.</p>
                  </div>
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-blue-middle/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Tracking that tells the truth</h4>
                    <p className="body-text text-white/90">Simple attribution fixes so decisions are data-driven.</p>
                  </div>
                </div>

                <div>
                  <p className="small-text text-white/90 uppercase tracking-wider mb-3">Deliverables</p>
                  <p className="body-text text-white/90">Channel scorecard, targeting/creative notes, tracking checklist, Top 3 recommendations.</p>
                </div>
              </div>

              <div className="flex-1 order-1 lg:order-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-middle/20 to-blue-lightest/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
                  <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-blue-middle/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-middle/10 via-transparent to-blue-lightest/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <BarChart3 className="w-24 h-24 text-blue-middle mx-auto mb-4" />
                        <p className="card-heading text-white">Performance Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="flex flex-col lg:flex-row items-center gap-12" data-aos="fade-up" data-aos-duration={1200}>
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-light/20 to-yellow-dark/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
                  <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-yellow-light/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-light/10 via-transparent to-yellow-dark/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Brain className="w-24 h-24 text-yellow-light mx-auto mb-4" />
                        <p className="card-heading text-white">AI Operations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-yellow-light/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/30 transition-all duration-300">
                      <Brain className="w-8 h-8 text-yellow-light" />
                    </div>
                    <h3 className="sub-heading text-white">AI Operations Audit</h3>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-yellow-light/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">See the leaks</h4>
                    <p className="body-text text-white/90">Lead-to-booking flow mapped (speed-to-lead, missed calls, follow-ups, no-shows).</p>
                  </div>
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-yellow-light/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">High-ROI opportunities</h4>
                    <p className="body-text text-white/90">A short, ranked shortlist of automations that make a difference.</p>
                  </div>
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-yellow-light/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Safe to deploy</h4>
                    <p className="body-text text-white/90">Practical notes on privacy/compliance where relevant (e.g., healthcare).</p>
                  </div>
                </div>

                <div>
                  <p className="small-text text-white/90 uppercase tracking-wider mb-3">Deliverables</p>
                  <p className="body-text text-white/90">Flow map, opportunity shortlist (impact vs. effort), implementation considerations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-bg-primary relative overflow-hidden">

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap justify-center mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D2552]/50 backdrop-blur-lg rounded-full border border-yellow-light/20 mb-4">
                <Gift className="w-4 h-4 text-yellow-light" />
                <span className="small-text text-yellow-light font-semibold">Limited Time Offer</span>
              </div>
              <h2
                className="section-heading text-white mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Bonuses (included)
              </h2>
              <p
                className="body-text text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                <span className="section-heading text-yellow-light">$1,850</span> in total value - absolutely free
              </p>
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {}
            <div
              data-aos="fade-up"
              data-aos-duration={1200}
              className="group"
            >
              <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 h-full">
                <div className="relative">
                  {}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-yellow-light/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/30 transition-all duration-300">
                      <Zap className="w-8 h-8 text-yellow-light" />
                    </div>
                    <span className="px-3 py-1 bg-yellow-light/10 rounded-full small-text text-yellow-light font-semibold">
                      $750 value
                    </span>
                  </div>

                  {}
                  <h3 className="card-heading text-white mb-2">Quick-Win Implementation</h3>
                  <p className="text-yellow-light small-text font-semibold mb-3">Done-For-You</p>
                  <p className="body-text text-white/90">
                    We build and switch on one custom automation aligned to your biggest bottleneck. Live setup with 14 days support.
                  </p>
                </div>
              </div>
            </div>

            {}
            <div
              data-aos="fade-up"
              data-aos-delay={100}
              data-aos-duration={1200}
              className="group"
            >
              <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 h-full">
                <div className="relative">
                  {}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <Calendar className="w-8 h-8 text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                    </div>
                    <span className="px-3 py-1 bg-blue-middle/10 rounded-full small-text text-blue-middle font-semibold">
                      $600 value
                    </span>
                  </div>

                  {}
                  <h3 className="card-heading text-white mb-2">90-Day Action Plan</h3>
                  <p className="text-blue-middle small-text font-semibold mb-3">Step-by-Step Roadmap</p>
                  <p className="body-text text-white/90">
                    A simple rollout you can hand to your team tomorrow—what to do first, second, third; owners and milestones.
                  </p>
                </div>
              </div>
            </div>

            {}
            <div
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={1200}
              className="group"
            >
              <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 h-full">
                <div className="relative">
                  {}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <DollarSign className="w-8 h-8 text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                    </div>
                    <span className="px-3 py-1 bg-yellow-light/10 rounded-full small-text text-yellow-light font-semibold">
                      $500 value
                    </span>
                  </div>

                  {}
                  <h3 className="card-heading text-white mb-2">"Money Slide" Forecast</h3>
                  <p className="text-yellow-light small-text font-semibold mb-3">Executive Ready</p>
                  <p className="body-text text-white/90">
                    Clear projections for CPL/CPA reduction and hours saved—so leadership sees the dollar impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding relative bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading text-white mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Risk-Free Guarantees
              </h2>
              <p
                className="body-text text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                We put our money where our mouth is
              </p>
            </div>
          </div>

          {}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-blue-middle/20" data-aos="fade-up" data-aos-duration={1200}>
              <div className="relative bg-[#0D2552]/50 backdrop-blur-lg p-8 lg:p-12">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-light/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-yellow-light/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-8 h-8 text-yellow-light" />
                    </div>
                    <div>
                      <h3 className="sub-heading text-white">Clarity Guarantee</h3>
                      <p className="small-text text-yellow-light font-semibold">Get results or get refunded</p>
                    </div>
                  </div>

                  <p className="body-text text-white/90 mb-6">If our audit doesn't show a clear path to at least one of these outcomes, we refund 100%:</p>

                  <div className="space-y-3">
                    {[
                      "10%+ reduction in acquisition costs",
                      "5%+ increase in bookings",
                      "10+ hours/week saved"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-yellow-light/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-yellow-light" />
                        </div>
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {}
              <div className="relative bg-[#0D2552]/50 backdrop-blur-lg p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-blue-middle/20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-middle/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center">
                      <Award className="w-8 h-8 text-blue-middle" />
                    </div>
                    <div>
                      <h3 className="sub-heading text-white">Board-Ready Promise</h3>
                      <p className="small-text text-blue-middle font-semibold">Executive-level clarity</p>
                    </div>
                  </div>

                  <p className="body-text text-white/90 mb-6">Your deliverables will be polished and ready for the C-suite:</p>

                  <div className="bg-blue-darkest/50 backdrop-blur-sm rounded-xl p-4 space-y-2 border border-blue-middle/20">
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Revisions until perfect</span>
                      <span className="text-blue-middle font-semibold">∞</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Extra cost</span>
                      <span className="text-blue-middle font-semibold">$0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Presentation ready</span>
                      <span className="text-blue-middle font-semibold">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center small-text text-white/90 mt-6">
              * Guarantees require timely read-only access and accurate historical data
            </p>
          </div>
        </div>
      </section>

      {}
      <section className="process-timeline-section !py-20 !relative !overflow-hidden bg-bg-primary">
        <div className="!absolute !inset-0 !pointer-events-none">
          <div
            className="!absolute !inset-0 !opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center !mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading !text-white !mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                How It Works (Timeline)
              </h2>
              <p
                className="body-text !text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                From kickoff to implementation in just 14 days
              </p>
            </div>
          </div>

          {}
          <div className="hidden lg:block " ref={desktopTimelineRef}>
            <div className="!relative !max-w-5xl !mx-auto">
              <div className="!absolute !left-1/2 !top-0 !bottom-0 !w-0.5 !-translate-x-1/2 !overflow-hidden !bg-slate-800/30">
                <div
                  className="!absolute !left-0 !top-0 !w-full !bg-gradient-to-b !from-yellow-light !via-blue-middle !to-yellow-light !transition-all !duration-300 !ease-out"
                  style={{ height: `${lineHeight}%` }}
                />
              </div>

              {[
                {
                  day: "Day 0–1",
                  title: "Kickoff (goals & access)",
                  what: "Align on business goals and KPIs; confirm ICPs, offers, and success criteria.",
                  collect: "Read-only access to Google/Meta/LinkedIn Ads, CRM, call logs/phone, and calendar.",
                  result: "Call summary + checklist of anything missing.",
                  icon: <Rocket className="!w-6 !h-6" />
                },
                {
                  day: "Day 1–3",
                  title: "Data intake & baselines",
                  what: "Pull real numbers for leads, CPL/CPA, speed-to-lead, missed-call %, show-rate, close-rate, and LTV. Spot obvious tracking gaps.",
                  icon: <BarChart3 className="!w-6 !h-6" />
                },
                {
                  day: "Day 3–5",
                  title: "Funnel mapping & bottlenecks",
                  what: "Map your lead-to-booking flow (ads → lead capture → outreach → booking → follow-up). Flag leaks: slow response, missed calls, manual handoffs, no-show risk.",
                  icon: <Activity className="!w-6 !h-6" />
                },
                {
                  day: "Day 6–9",
                  title: "Opportunity shortlist (impact vs. effort)",
                  what: "Compile 3–6 high-ROI moves (marketing + AI) and rank them by impact/effort. Draft practical fixes for targeting, creative, landing, tracking; plus ops automations.",
                  icon: <Target className="!w-6 !h-6" />
                },
                {
                  day: "Day 10",
                  title: "Mid-audit alignment (30–45 min)",
                  what: "Walk through the flow map & shortlist. Validate priorities with your team. Choose the Quick Win we'll implement.",
                  result: "Green-light on what matters most; no guesswork.",
                  icon: <Users className="!w-6 !h-6" />
                },
                {
                  day: "Day 10–12",
                  title: "Build & test the Quick Win",
                  what: "Configure the agreed Quick-Win Implementation and test end-to-end with your stack.",
                  icon: <Settings className="!w-6 !h-6" />
                },
                {
                  day: "Day 12–13",
                  title: "Forecasts & 90-day plan",
                  what: "Model expected savings/uplift and payback; package your Money-Slide Forecast Pack. Create a week-by-week 90-Day Action Plan with owners and milestones.",
                  icon: <LineChart className="!w-6 !h-6" />
                },
                {
                  day: "Day 14",
                  title: "Final presentation → switch on live",
                  what: "Present findings, confirm the plan, and turn the Quick Win on live. Answer every open question and outline 'do this next.'",
                  result: "If you want us to execute the 90-day plan, we apply your $500 credit.",
                  icon: <Award className="!w-6 !h-6" />
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className={`!relative !flex !items-center !mb-12 ${index % 2 === 0 ? '!justify-start' : '!justify-end'}`}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-duration={1200}
                >
                  <div className="!absolute !left-1/2 !w-12 !h-12 !bg-gradient-to-r !from-yellow-light !to-blue-middle !rounded-full !-translate-x-1/2 !flex !items-center !justify-center !shadow-lg">
                    {step.icon}
                  </div>

                  <div className={`!w-5/12 !bg-slate-900 !rounded-xl !p-6 !border !border-slate-800 hover:!border-[#FEC458]/50 !transition-all ${index % 2 === 0 ? '!mr-auto' : '!ml-auto'}`}>
                    <span className="!text-[#FEC458] !text-sm !font-bold">{step.day}</span>
                    <h4 className="!text-xl !font-bold !text-white !mb-2">{step.title}</h4>
                    <p className="!text-gray-400 !text-sm !mb-3">
                      <span className="!font-semibold !text-gray-300">What we do:</span> {step.what}
                    </p>
                    {step.collect && (
                      <p className="!text-gray-400 !text-sm !mb-3">
                        <span className="!font-semibold !text-gray-300">What we collect:</span> {step.collect}
                      </p>
                    )}
                    {step.result && (
                      <p className="!text-blue-400 !text-sm">
                        <span className="!font-semibold">You get:</span> {step.result}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="lg:hidden" ref={mobileTimelineRef}>
            <div className="!relative !pl-8">
              <div className="!absolute !left-4 !top-0 !bottom-0 !w-0.5 !overflow-hidden !bg-slate-800/30">
                <div
                  className="!absolute !left-0 !top-0 !w-full !bg-gradient-to-b !from-yellow-light !via-blue-middle !to-yellow-light !transition-all !duration-300 !ease-out"
                  style={{ height: `${lineHeight}%` }}
                />
              </div>

              {[
                {
                  day: "Day 0–1",
                  title: "Kickoff",
                  fullTitle: "Kickoff (goals & access)",
                  what: "Align on business goals and KPIs; confirm ICPs, offers, and success criteria.",
                  collect: "Read-only access to Google/Meta/LinkedIn Ads, CRM, call logs/phone, and calendar.",
                  result: "Call summary + checklist of anything missing.",
                  icon: <Rocket />
                },
                {
                  day: "Day 1–3",
                  title: "Data intake",
                  fullTitle: "Data intake & baselines",
                  what: "Pull real numbers for leads, CPL/CPA, speed-to-lead, missed-call %, show-rate, close-rate, and LTV. Spot obvious tracking gaps.",
                  icon: <BarChart3 />
                },
                {
                  day: "Day 3–5",
                  title: "Funnel mapping",
                  fullTitle: "Funnel mapping & bottlenecks",
                  what: "Map your lead-to-booking flow (ads → lead capture → outreach → booking → follow-up). Flag leaks: slow response, missed calls, manual handoffs, no-show risk.",
                  icon: <Activity />
                },
                {
                  day: "Day 6–9",
                  title: "Opportunities",
                  fullTitle: "Opportunity shortlist (impact vs. effort)",
                  what: "Compile 3–6 high-ROI moves (marketing + AI) and rank them by impact/effort. Draft practical fixes for targeting, creative, landing, tracking; plus ops automations.",
                  icon: <Target />
                },
                {
                  day: "Day 10",
                  title: "Alignment",
                  fullTitle: "Mid-audit alignment (30–45 min)",
                  what: "Walk through the flow map & shortlist. Validate priorities with your team. Choose the Quick Win we'll implement.",
                  result: "Green-light on what matters most; no guesswork.",
                  icon: <Users />
                },
                {
                  day: "Day 10–12",
                  title: "Build Quick Win",
                  fullTitle: "Build & test the Quick Win",
                  what: "Configure the agreed Quick-Win Implementation and test end-to-end with your stack.",
                  icon: <Settings />
                },
                {
                  day: "Day 12–13",
                  title: "Forecasts",
                  fullTitle: "Forecasts & 90-day plan",
                  what: "Model expected savings/uplift and payback; package your Money-Slide Forecast Pack. Create a week-by-week 90-Day Action Plan with owners and milestones.",
                  icon: <LineChart />
                },
                {
                  day: "Day 14",
                  title: "Go Live!",
                  fullTitle: "Final presentation → switch on live",
                  what: "Present findings, confirm the plan, and turn the Quick Win on live. Answer every open question and outline 'do this next.'",
                  result: "If you want us to execute the 90-day plan, we apply your $500 credit.",
                  icon: <Award />
                }
              ].map((step, index) => (
                <div key={index} className="!relative !mb-8" data-aos="fade-up" data-aos-duration={1000}>
                  <div className="!absolute !left-0 !w-8 !h-8 !bg-gradient-to-r !from-[#FEC458] !to-[#3C91E6] !rounded-full !flex !items-center !justify-center">
                    {React.cloneElement(step.icon, { className: "!w-4 !h-4 !text-white" })}
                  </div>
                  <div 
                    className="!ml-9 !bg-slate-900 !rounded-lg !p-4 !border !border-slate-800 !cursor-pointer hover:!border-[#FEC458]/50 !transition-all"
                    onClick={() => toggleCardExpansion(index)}
                  >
                    <div className="!flex !items-start !justify-between">
                      <div className="!flex-1">
                        <span className="!text-[#FEC458] !text-xs !font-bold">{step.day}</span>
                        <h5 className="!text-lg !font-bold !text-white">{step.title}</h5>
                      </div>
                      <div className="!w-6 !h-6 !rounded-full !bg-[#FEC458]/20 !flex !items-center !justify-center !flex-shrink-0 !ml-2">
                        <ChevronDown 
                          className={`!w-4 !h-4 !text-[#FEC458] !transition-transform !duration-300 ${
                            expandedCards[index] ? '!rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>
                    
                    {expandedCards[index] && (
                      <div className="!mt-4 !pt-4 !border-t !border-slate-700">
                        <h6 className="!text-base !font-semibold !text-white !mb-3">{step.fullTitle}</h6>
                        <p className="!text-gray-400 !text-sm !mb-3">
                          <span className="!font-semibold !text-gray-300">What we do:</span> {step.what}
                        </p>
                        {step.collect && (
                          <p className="!text-gray-400 !text-sm !mb-3">
                            <span className="!font-semibold !text-gray-300">What we collect:</span> {step.collect}
                          </p>
                        )}
                        {step.result && (
                          <p className="!text-blue-400 !text-sm">
                            <span className="!font-semibold">You get:</span> {step.result}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-bg-primary relative overflow-hidden">


        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap justify-center mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading text-white mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Who It's For / Not For
              </h2>
              <p
                className="body-text text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                Let's make sure we're the right fit for your business
              </p>
            </div>
          </div>

          {}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {}
              <div
                data-aos="fade-right"
                data-aos-duration={1500}
                className="relative"
              >
                <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-yellow-light/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 bg-yellow-light/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/30 transition-all duration-300">
                      <CheckCircle className="w-8 h-8 text-yellow-light" />
                    </div>
                    <h3 className="sub-heading text-white">Perfect For:</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-light mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Lead-driven businesses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-light mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Running Google/Meta/LinkedIn ads</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-light mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Want bookings without adding headcount</span>
                    </li>
                  </ul>
                </div>
              </div>

              {}
              <div
                data-aos="fade-left"
                data-aos-duration={1500}
                className="relative"
              >
                <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <XCircle className="w-8 h-8 text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                    </div>
                    <h3 className="sub-heading text-white">Not For:</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-middle mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">No tracking systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-middle mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">No ad activity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-middle mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">No willingness to grant read-only access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className=" bg-bg-primary relative overflow-hidden">

        <div className="section-padding container mx-auto px-4 relative">
          {}
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2
                className="section-heading text-white mb-12"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Audit
              </h2>

              <div data-aos="fade-up" data-aos-delay={100} data-aos-duration={1200}>
                {}
                <div className="mb-16">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <span className="text-gray-500 line-through" style={{ fontSize: '2.5rem', fontWeight: '600', lineHeight: '1', letterSpacing: '-0.02em' }}>$3,300</span>
                    <span className="text-yellow-light" style={{ fontSize: '4rem', fontWeight: '700', lineHeight: '1', letterSpacing: '-0.03em' }}>$1,450</span>
                  </div>
                </div>

                {}
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bright-blue/10 to-warm-yellow/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="section-heading font-bold text-white mb-4">Ready to identify your growth leaks?</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join 50+ companies that have used our Jumpstart Audit to unlock hidden revenue
          </p>
          <CTAButton
            href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
external={true}
            variant="primary"
            size="large"
            className="btn-primary-cta"
          >
            Book Discovery Call
          </CTAButton>
        </div>
      </section>

      {}
      <FAQSection
        sectionTitle="Common Questions"
        sectionSubtitle="FAQs"
        sectionDescription="We know you might have questions about our Jumpstart Audit. Here are answers to the most common queries. If you don't see your question here, feel free to reach out!"
        iconClass="fas fa-question-circle"
        bgColor="bg-section-black"
        faqs={[
          {
            question: "How fast will we see impact?",
            answer: `Within 14 days.

• Day 0–10: You'll see baselines, the leak map, and a prioritized shortlist (core).

• Day 14: We turn on your Quick-Win live (bonus), so you leave the final call with something working.

Typical early signals: faster speed-to-lead, recovered missed calls, or more responses/appointments from reminders/reactivation—depending on the quick win we install.`
          },
          {
            question: "Do you execute the 90-day plan?",
            answer: `Yes—if you want us to.

• The audit stands on its own: you get the plan, forecasts, and handoff pack.

• If you'd like our team to implement, we offer a retainer and credit $500 of your audit if you start within 14 days.

• Either way, your Quick-Win includes 14 days of support (bonus) so it keeps delivering.`
          },
          {
            question: "Healthcare/compliance?",
            answer: `We support HIPAA-safe configurations where relevant.

• We design automations to minimize PHI exposure, limit retention, and respect safe channels.

• Options include no recording or redacted transcripts, least-privilege access, and clear consent language.

• We'll flag what's safe vs. not in your stack and share a compliance checklist on request.

(If your organization requires a specific agreement or policy review, we'll discuss during kickoff.)`
          },
          {
            question: "What access do you need?",
            answer: `Read-only access so we can analyze without changing anything:

• Ad platforms: Google, Meta, LinkedIn (viewer).

• CRM: lead statuses, timestamps, outcomes (export or viewer).

• Phone system/call logs: missed calls, basic metrics (recordings optional).

• Calendar/scheduling: booking and no-show view/API.

Plus one point-of-contact for quick questions and approvals. We'll provide a short checklist at kickoff.`
          },
          {
            question: "What if you can't help us?",
            answer: `We de-risk it with two safeguards:

• Fit Guarantee (Kickoff): If we learn your data/stack won't let us move core KPIs meaningfully, we refund right away.

• Clarity Guarantee (Final): If our audit doesn't map a data-backed path to 10% lower costs or 5% more bookings or 10 hours/week saved, we refund the audit.

(Guarantees require timely read-only access and accurate historical data.)`
          }
        ]}
      />

      {}
      <section className="section-padding bg-gradient-to-b from-black to-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading text-white mb-6"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Ready to Transform Your Marketing?
              </h2>
              <p
                className="sub-heading text-white/90 mb-8"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                Join businesses that have reduced costs by 45% and increased bookings by 250%
              </p>
              <div
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={1200}
              >
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
external={true}
                  variant="secondary"
                  size="large"
                >
                  <Rocket className="w-6 h-6 mr-2" />
                  Book Discovery Call
                </CTAButton>
                <p className="mt-6 small-text text-yellow-light font-semibold">
                  Only 5 audit slots each month to guarantee live implementation on the final call
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default JumpstartAudit;