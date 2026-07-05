"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { FileAudio, FileText, Sparkles } from "lucide-react";

const SHOTS = [
  {
    src: "/assets/images/dashboard/clean/overview.png",
    caption: "Live dashboard — calls, success rate, trends",
  },
  {
    src: "/assets/images/dashboard/clean/call-logs.png",
    caption: "Every call logged",
  },
  {
    src: "/assets/images/dashboard/clean/pipeline.png",
    caption: "Sales pipeline",
  },
];

// Subtle browser-chrome frame wrapper for a screenshot.
function BrowserFrame({ children }) {
  return (
    <div className="card-glow overflow-hidden rounded-xl border border-white/[0.1] bg-[#0b1622] shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 hidden truncate rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-white/40 sm:block">
          app.automis.ai/dashboard
        </span>
      </div>
      {children}
    </div>
  );
}

export default function DashboardWalk() {
  return (
    <Section id="voice-dashboard" className="bg-[#020a12]" inner="max-w-6xl">
      <SectionHeading
        eyebrow="You see everything"
        title={<>Full transparency into every call your AI handles.</>}
        lead="No black box. A live dashboard of calls and outcomes, every conversation logged, and a sales pipeline that moves on its own."
      />

      <div className="mt-14 space-y-6">
        {/* Lead screenshot — full width */}
        <Reveal>
          <BrowserFrame>
            <img
              src={SHOTS[0].src}
              alt={SHOTS[0].caption}
              className="block w-full"
              loading="lazy"
            />
          </BrowserFrame>
          <p className="mt-3 text-center text-[13px] text-white/55">{SHOTS[0].caption}</p>
        </Reveal>

        {/* Two supporting screenshots */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SHOTS.slice(1).map((s, i) => (
            <Reveal key={s.src} delay={i * 120}>
              <BrowserFrame>
                <img src={s.src} alt={s.caption} className="block w-full" loading="lazy" />
              </BrowserFrame>
              <p className="mt-3 text-center text-[13px] text-white/55">{s.caption}</p>
            </Reveal>
          ))}
        </div>

        {/* Open-a-call detail — placeholder (screenshot not ready) */}
        <Reveal delay={80}>
          <div className="card-gold rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">
                  Open any call to see the whole story
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">
                  Click into a single call and you get the full recording, a searchable
                  transcript, and an AI summary of what happened and what to do next. Nothing
                  is hidden, so you always know exactly how your front desk is performing.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70">
                    <FileAudio className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} /> Recording
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70">
                    <FileText className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} /> Transcript
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70">
                    <Sparkles className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} /> AI summary
                  </span>
                </div>
              </div>
              {/* Captioned placeholder box — screenshot pending */}
              <div className="flex flex-col">
                <div
                  className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02]"
                >
                  <div className="text-center">
                    <Sparkles className="mx-auto h-7 w-7 text-white/25" strokeWidth={1.6} />
                    <p className="mt-3 text-[13px] font-medium text-white/40">Call detail view</p>
                    <p className="mt-1 text-[12px] text-white/30">Screenshot coming soon</p>
                  </div>
                </div>
                <p className="mt-3 text-center text-[13px] text-white/55">
                  One call, opened: recording + transcript + AI summary
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
