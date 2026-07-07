"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { FileAudio, FileText, Sparkles, ShieldCheck } from "lucide-react";

// Lead screenshot: the live Bookings table, every call the AI handled, with
// outcome and status. Customer names/numbers are blurred for privacy.
// Locale-aware: Italian dashboard captures live under clean/it.
const SHOTS = {
  en: { bookings: "/assets/images/dashboard/clean/bookings.png", callDetail: "/assets/images/dashboard/clean/call-detail.png" },
  it: { bookings: "/assets/images/dashboard/clean/it/bookings.png", callDetail: "/assets/images/dashboard/clean/it/call-detail.png" },
};

const COPY = {
  en: {
    eyebrow: "You see everything",
    title: "Full transparency into every call your AI handles.",
    lead: "No black box. Watch a live feed of every call, its status, and its outcome, then open any single call for the recording, transcript, and AI summary.",
    leadCaption: "Every call the AI handled, with status and outcome, live",
    privacyBadge: "Customer data blurred for privacy",
    detailTitle: "Open any call to see the whole story",
    detailBody:
      "Click into a single call and you get the full recording, a searchable transcript, and an AI summary of what happened and what to do next. Nothing is hidden, so you always know exactly how your front desk is performing.",
    tagRecording: "Recording",
    tagTranscript: "Transcript",
    tagSummary: "AI summary",
    callDetailAlt: "One call opened: recording, transcript, and AI summary",
    callDetailCaption: "One call, opened: recording, transcript, and AI summary",
  },
  it: {
    eyebrow: "Vedi tutto",
    title: "Trasparenza totale su ogni chiamata che gestisce la tua IA.",
    lead: "Nessuna scatola nera. Segui in tempo reale ogni chiamata, il suo stato e il suo esito, poi apri una singola chiamata per registrazione, trascrizione e riepilogo IA.",
    leadCaption: "Ogni chiamata gestita dall'IA, con stato ed esito, in tempo reale",
    privacyBadge: "Dati dei clienti oscurati per privacy",
    detailTitle: "Apri una chiamata e vedi tutta la storia",
    detailBody:
      "Apri una singola chiamata e trovi la registrazione completa, una trascrizione consultabile e un riepilogo IA di cosa è successo e cosa fare dopo. Niente è nascosto, così sai sempre esattamente come sta lavorando la tua reception.",
    tagRecording: "Registrazione",
    tagTranscript: "Trascrizione",
    tagSummary: "Riepilogo IA",
    callDetailAlt: "Una chiamata aperta: registrazione, trascrizione e riepilogo IA",
    callDetailCaption: "Una chiamata, aperta: registrazione, trascrizione e riepilogo IA",
  },
};

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
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const shots = SHOTS[locale];

  return (
    <Section id="voice-dashboard" className="bg-[#020a12]" inner="max-w-6xl">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />

      <div className="mt-14 space-y-6">
        {/* Lead screenshot, full width */}
        <Reveal>
          <BrowserFrame>
            <img
              src={shots.bookings}
              alt={t.leadCaption}
              className="block w-full"
              loading="lazy"
            />
          </BrowserFrame>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] text-white/55">
            <span>{t.leadCaption}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-white/45">
              <ShieldCheck className="h-3 w-3 text-[#57C7E3]" strokeWidth={2} />
              {t.privacyBadge}
            </span>
          </div>
        </Reveal>

        {/* Open-a-call detail, placeholder (English capture pending) */}
        <Reveal delay={80}>
          <div className="card-gold rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">
                  {t.detailTitle}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">
                  {t.detailBody}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70">
                    <FileAudio className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} /> {t.tagRecording}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70">
                    <FileText className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} /> {t.tagTranscript}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70">
                    <Sparkles className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2} /> {t.tagSummary}
                  </span>
                </div>
              </div>
              {/* Real call-detail view: recording + transcript + AI summary.
                  Messages/transcript are blurred for privacy. */}
              <div className="flex flex-col">
                <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0b1622] shadow-2xl">
                  <img
                    src={shots.callDetail}
                    alt={t.callDetailAlt}
                    className="block w-full"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center text-[13px] text-white/55">
                  {t.callDetailCaption}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
