"use client";
import { Reveal, GradientText, GRAD } from "./_ui";
import CTAButton from "@/components/CTAButton";
import ToolsStrip from "./ToolsStrip";
import { Phone, CalendarCheck, Zap, ArrowRight, MessageSquare, Sparkles } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

export default function HeroEN() {
  return (
    <section id="hero" className="relative overflow-hidden bg-deep-blue">
      {/* animated aurora + grid background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-aurora hero-aurora-1" />
        <div className="hero-aurora hero-aurora-2" />
        <div className="hero-aurora hero-aurora-3" />
        <div className="hero-beam" />
        <div className="hero-grid" />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, #000a14)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto max-w-4xl pt-32 pb-14 text-center sm:pt-36 md:pt-40">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GRAD, boxShadow: "0 0 10px rgba(87,199,227,0.8)" }} />
              Strategic AI Automation Agency
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display mx-auto mt-7 max-w-[16ch] text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[3.4rem] md:text-[4.1rem]">
              The AI automation agency that builds the{" "}
              <span className="hero-shimmer">system your business is missing</span>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-7 max-w-2xl text-[1.1rem] leading-relaxed text-white/65 md:text-[1.2rem]">
              We find where your business leaks time and money (missed calls, slow follow-up,
              hours lost to admin) and build the AI agents and automations that fix it end to end.
              One system, designed around how you actually work.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton href={BOOKING} variant="secondary" size="medium" external className="w-full sm:w-auto">
                Book Discovery Call
              </CTAButton>
              <a
                href="#opportunity-finder"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-4 text-base font-semibold text-white/85 transition-colors hover:text-white"
              >
                <Sparkles className="h-4 w-4 text-[#57C7E3]" strokeWidth={2} />
                Find your AI opportunities
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-14">
              <ToolsStrip />
            </div>
          </Reveal>
        </div>

        {/* Product panel */}
        <Reveal delay={200} className="mx-auto max-w-5xl pb-24">
          <div className="relative">
            <div
              className="absolute -inset-x-6 -top-6 bottom-0 rounded-[2rem] opacity-60 blur-2xl"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(60,145,230,0.25), transparent 70%)" }}
            />
            <div className="relative grid gap-4 rounded-2xl border border-white/[0.08] bg-[#04101c]/80 p-4 shadow-2xl backdrop-blur-md md:grid-cols-[1.1fr_1fr] md:p-5">
              {/* Left: live call card */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full" style={{ background: GRAD }}>
                      <Phone className="h-4 w-4 text-[#04101c]" strokeWidth={2.4} />
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white">Incoming call</p>
                      <p className="text-[12px] text-white/45">+351 · new patient</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#57C7E3]/12 px-2.5 py-1 text-[11px] font-semibold text-[#8fe0f0]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#57C7E3]" /> AI answering
                  </span>
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.05] px-3.5 py-2.5 text-left text-[13px] text-white/80">
                    “Hi! Automis at Clínica Santa Maria. Would you like to book a check-up?”
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-left text-[13px] text-white/90" style={{ background: "rgba(60,145,230,0.16)" }}>
                    “Yes, is Thursday morning possible?”
                  </div>
                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white/[0.05] px-3.5 py-2.5 text-left text-[13px] text-white/80">
                    “Thursday 9:30 is open. Booked, and you’ll get an SMS confirmation. 👋”
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#57C7E3]/20 bg-[#57C7E3]/[0.06] px-3 py-2 text-left">
                  <CalendarCheck className="h-4 w-4 flex-shrink-0 text-[#8fe0f0]" strokeWidth={2} />
                  <p className="text-[12.5px] text-white/75">Appointment booked · synced to calendar · CRM updated</p>
                </div>
              </div>

              {/* Right: automation timeline */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Automation running</p>
                <div className="mt-4 space-y-3.5">
                  {[
                    { icon: Phone, label: "Call answered & qualified", meta: "0s" },
                    { icon: CalendarCheck, label: "Slot booked in calendar", meta: "4s" },
                    { icon: MessageSquare, label: "SMS + WhatsApp confirmation sent", meta: "6s" },
                    { icon: Zap, label: "Lead pushed to CRM + follow-up set", meta: "8s" },
                  ].map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                          <Icon className="h-4 w-4 text-[#8fe0f0]" strokeWidth={2} />
                        </span>
                        <div className="flex flex-1 items-center justify-between border-b border-white/[0.05] pb-2.5">
                          <span className="text-left text-[13px] text-white/80">{step.label}</span>
                          <span className="font-plex-mono text-[11px] text-white/35">{step.meta}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 rounded-lg px-3 py-2.5 text-left" style={{ background: "rgba(245,205,121,0.08)", border: "1px solid rgba(245,205,121,0.2)" }}>
                  <p className="text-[12.5px] font-medium text-[#F5CD79]">Zero staff time · runs 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        .hero-aurora {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.5;
        }
        .hero-aurora-1 {
          top: -10%;
          left: 10%;
          width: 45vw;
          height: 45vw;
          max-width: 620px;
          max-height: 620px;
          background: radial-gradient(circle, rgba(60, 145, 230, 0.45), transparent 65%);
          animation: heroFloat1 16s ease-in-out infinite;
        }
        .hero-aurora-2 {
          top: 0%;
          right: 5%;
          width: 40vw;
          height: 40vw;
          max-width: 560px;
          max-height: 560px;
          background: radial-gradient(circle, rgba(87, 199, 227, 0.32), transparent 65%);
          animation: heroFloat2 20s ease-in-out infinite;
        }
        .hero-aurora-3 {
          top: 18%;
          left: 42%;
          width: 34vw;
          height: 34vw;
          max-width: 460px;
          max-height: 460px;
          background: radial-gradient(circle, rgba(245, 205, 121, 0.16), transparent 62%);
          animation: heroFloat1 24s ease-in-out infinite reverse;
        }
        .hero-beam {
          position: absolute;
          top: -20%;
          left: 50%;
          width: 120%;
          height: 70%;
          transform: translateX(-50%) rotate(8deg);
          background: conic-gradient(
            from 180deg at 50% 50%,
            transparent 0deg,
            rgba(180, 194, 255, 0.06) 90deg,
            transparent 180deg,
            rgba(60, 145, 230, 0.06) 270deg,
            transparent 360deg
          );
          filter: blur(40px);
          animation: heroBeam 22s linear infinite;
        }
        @keyframes heroBeam {
          to {
            transform: translateX(-50%) rotate(368deg);
          }
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, #000 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, #000 40%, transparent 80%);
        }
        @keyframes heroFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.08); }
        }
        @keyframes heroFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        .hero-shimmer {
          background-image: linear-gradient(
            110deg,
            #3c91e6 0%,
            #57c7e3 25%,
            #b4c2ff 45%,
            #f5cd79 60%,
            #57c7e3 80%,
            #3c91e6 100%
          );
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: heroShimmer 7s linear infinite;
        }
        @keyframes heroShimmer {
          to {
            background-position: -220% center;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-aurora,
          .hero-beam,
          .hero-shimmer {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
