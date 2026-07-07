"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Reveal, GRAD, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Check, Loader2 } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const COPY = {
  en: {
    eyebrow: "Put it to work",
    headingPre: "Get your AI voice agent ",
    headingGrad: "answering, qualifying, and booking 24/7",
    headingPost: ".",
    paragraph:
      "Book a discovery call and we will set up a voice agent that picks up every call, qualifies the lead, and books it straight onto your calendar, day, night, and weekend. No missed calls, no lost revenue.",
    bullets: [
      "A 30-minute call, hear your AI voice agent live",
      "We map your calls, hours, and where bookings slip away",
      "Leave with a plan for a voice agent that answers 24/7",
    ],
    cta: "Book a Discovery Call",
    calHeader: "Live availability · 30-min call",
    calConfirm: "Instant confirmation",
    calLoading: "Loading live calendar…",
    iframeTitle: "Book a discovery call with Automis",
    guarantee: "30-day performance guarantee",
    gdpr: "GDPR-aligned",
    noObligation: "No obligation",
  },
  it: {
    eyebrow: "Mettila al lavoro",
    headingPre: "Fai in modo che il tuo assistente vocale ",
    headingGrad: "risponda, qualifichi e prenoti 24/7",
    headingPost: ".",
    paragraph:
      "Prenota una call e configuriamo un assistente vocale che risponde a ogni chiamata, qualifica il contatto e lo prenota direttamente sul tuo calendario, di giorno, di notte e nel weekend. Nessuna chiamata persa, nessun fatturato perso.",
    bullets: [
      "Una call di 30 minuti: senti il tuo assistente vocale dal vivo",
      "Analizziamo le tue chiamate, gli orari e dove perdi prenotazioni",
      "Esci con un piano per un assistente vocale che risponde 24/7",
    ],
    cta: "Prenota una call",
    calHeader: "Disponibilità in tempo reale · call di 30 min",
    calConfirm: "Conferma immediata",
    calLoading: "Caricamento del calendario…",
    iframeTitle: "Prenota una call con Automis",
    guarantee: "Garanzia sui risultati a 30 giorni",
    gdpr: "Conforme al GDPR",
    noObligation: "Senza impegno",
  },
};

export default function VoiceBooking() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const booking =
    locale === "it"
      ? "https://api.leadconnectorhq.com/widget/bookings/automis-it"
      : BOOKING;

  const holderRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lazy-load the LeadConnector iframe only when the section approaches view.
  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setInView(true), io.disconnect())),
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="book" className="relative overflow-hidden bg-[#020a12] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 opacity-50 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.28), transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Left: pitch */}
          <Reveal>
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{t.eyebrow}</span>
              <h2 className="font-display mt-4 text-[2.1rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.7rem]">
                {t.headingPre}<GradientText>{t.headingGrad}</GradientText>{t.headingPost}
              </h2>
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/60">
                {t.paragraph}
              </p>
              <ul className="mt-7 space-y-3">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-white/80">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: GRAD }}>
                      <Check className="h-3 w-3 text-[#04101c]" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex lg:hidden">
                <InteractiveHoverButton href={booking} variant="solid" text={t.cta} />
              </div>
            </div>
          </Reveal>

          {/* Right: calendar embed */}
          <Reveal delay={100}>
            <div
              ref={holderRef}
              className="relative rounded-2xl border border-white/[0.1] bg-white/[0.02] p-2 shadow-2xl"
            >
              {/* dark header so the (unavoidably light) calendar reads as an intentional inset */}
              <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-white/85">
                  <span className="h-2 w-2 rounded-full" style={{ background: GRAD, boxShadow: "0 0 8px rgba(87,199,227,0.8)" }} />
                  {t.calHeader}
                </span>
                <span className="text-[12px] text-white/50">{t.calConfirm}</span>
              </div>
              <div className="relative w-full overflow-hidden rounded-xl bg-white" style={{ minHeight: 760 }}>
                {/* skeleton */}
                {!loaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b1622]">
                    <Loader2 className="h-6 w-6 animate-spin text-[#57C7E3]" />
                    <p className="text-[13px] text-white/50">{t.calLoading}</p>
                  </div>
                )}
                {inView && (
                  <iframe
                    id="ghl-booking-iframe"
                    src={`${booking}?embed=true`}
                    title={t.iframeTitle}
                    className="block h-full w-full"
                    style={{ height: 780, minHeight: 760, border: "none", overflow: "auto" }}
                    scrolling="yes"
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-2 py-2 text-[12px] text-white/60">
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> {t.guarantee}</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> {t.gdpr}</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> {t.noObligation}</span>
              </div>
              {/* LeadConnector auto-resize so all available days are reachable */}
              <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
