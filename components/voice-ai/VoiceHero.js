"use client";
import { Reveal, GradientText } from "@/components/home/_ui";
import { Play, Calendar } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

// Set this to the YouTube video ID once the "how it works" recording is ready.
// While null, we render a clearly-marked placeholder box (TODO for the embed).
const VIDEO_ID = null;

export default function VoiceHero() {
  return (
    <section id="voice-hero" className="relative overflow-hidden bg-[#000a14] pt-28 pb-16 sm:pt-32 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 opacity-60 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.30), transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal immediate>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "linear-gradient(120deg,#3C91E6,#57C7E3,#B4C2FF)", boxShadow: "0 0 10px rgba(87,199,227,0.7)" }} />
              Flagship · Automis Voice AI
            </span>
          </Reveal>
          <Reveal immediate delay={60}>
            <h1 className="font-display mt-6 text-[2.2rem] font-bold leading-[1.1] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[3rem] md:text-[3.5rem]">
              The AI receptionist that turns every call into a <GradientText>booked appointment</GradientText>.
            </h1>
          </Reveal>
          <Reveal immediate delay={120}>
            <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/60 [text-wrap:pretty] sm:text-[1.15rem]">
              Automis Voice AI answers every call 24/7, qualifies the lead, books it on your calendar,
              and syncs it to your CRM. Nights, weekends, holidays. No missed calls, no lost revenue.
            </p>
          </Reveal>
          <Reveal immediate delay={180}>
            <div className="mt-8 flex justify-center">
              <a
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5"
                style={{ background: "linear-gradient(90deg,#FEC458,#F5CD79)" }}
              >
                <Calendar className="h-4 w-4" strokeWidth={2.4} />
                Book a Discovery Call
              </a>
            </div>
          </Reveal>
        </div>

        {/* Video slot — 16:9 bordered box with play button */}
        <Reveal delay={120}>
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="card-glow relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-2 shadow-2xl backdrop-blur-sm">
              <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16 / 9" }}>
                {VIDEO_ID ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
                    title="How Automis Voice AI works"
                    className="absolute inset-0 h-full w-full"
                    style={{ border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  /* TODO: set VIDEO_ID above to swap this placeholder for the real YouTube embed */
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#04101c]">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(60,145,230,0.22), transparent 70%)" }}
                    />
                    <button
                      type="button"
                      aria-label="Play — how Automis Voice AI works (coming soon)"
                      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform hover:scale-105"
                    >
                      <span className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 40px 4px rgba(87,199,227,0.35)" }} />
                      <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" strokeWidth={0} />
                    </button>
                    <p className="relative z-10 mt-5 text-[13px] font-medium text-white/50">Video coming soon</p>
                  </div>
                )}
              </div>
              <p className="px-3 py-3 text-center text-[13px] font-medium text-white/60">
                How Automis Voice AI works
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
