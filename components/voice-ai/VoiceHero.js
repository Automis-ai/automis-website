"use client";
import { usePathname } from "next/navigation";
import { Reveal, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

// "How Automis Voice AI works" walkthrough.
const VIDEO_ID = "qWSaK2kS7uo";

const COPY = {
  en: {
    eyebrow: "Flagship · Automis Voice AI",
    headline: {
      pre: "The AI receptionist that turns every call into a ",
      grad: "booked appointment",
      post: ".",
    },
    subhead:
      "Automis Voice AI answers every call 24/7, qualifies the lead, books it on your calendar, and syncs it to your CRM. Nights, weekends, holidays. No missed calls, no lost revenue.",
    cta: "Book a Discovery Call",
    videoTitle: "How Automis Voice AI works",
  },
  it: {
    eyebrow: "Prodotto di punta · Automis Voice AI",
    headline: {
      pre: "Il receptionist IA che trasforma ogni chiamata in un ",
      grad: "appuntamento fissato",
      post: ".",
    },
    subhead:
      "Automis Voice AI risponde a ogni chiamata 24/7, qualifica il lead, lo fissa sul tuo calendario e lo sincronizza con il tuo CRM. Notti, weekend, festivi. Nessuna chiamata persa, nessun fatturato perso.",
    cta: "Prenota una call",
    videoTitle: "Come funziona Automis Voice AI",
  },
};

export default function VoiceHero() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const booking = locale === "it" ? "https://api.leadconnectorhq.com/widget/bookings/automis-it" : BOOKING;

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
              {t.eyebrow}
            </span>
          </Reveal>
          <Reveal immediate delay={60}>
            <h1 className="font-display mt-6 text-[2.2rem] font-bold leading-[1.1] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[3rem] md:text-[3.5rem]">
              {t.headline.pre}<GradientText>{t.headline.grad}</GradientText>{t.headline.post}
            </h1>
          </Reveal>
          <Reveal immediate delay={120}>
            <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/60 [text-wrap:pretty] sm:text-[1.15rem]">
              {t.subhead}
            </p>
          </Reveal>
          <Reveal immediate delay={180}>
            <div className="mt-8 flex justify-center">
              <InteractiveHoverButton
                href={booking}
                variant="solid"
                text={t.cta}
              />
            </div>
          </Reveal>
        </div>

        {/* Video, responsive 16:9 YouTube embed in a glowing frame */}
        <Reveal delay={120}>
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="card-glow relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-2 shadow-2xl backdrop-blur-sm">
              <div className="relative w-full overflow-hidden rounded-xl bg-[#04101c]" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
                  title={t.videoTitle}
                  className="absolute inset-0 h-full w-full"
                  style={{ border: "none" }}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="px-3 py-3 text-center text-[13px] font-medium text-white/60">
                {t.videoTitle}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
