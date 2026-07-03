"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Reveal, GRAD, GradientText } from "./_ui";
import { Check, Loader2 } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const BULLETS = [
  "A 30-minute, no-pressure discovery call",
  "We map where your business leaks time & money",
  "Leave with a clear view of your best AI opportunities",
];

export default function FinalCta() {
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
    <section id="book" className="relative overflow-hidden bg-[#020a12] py-20 md:py-28">
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
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">Let's build it</span>
              <h2 className="font-display mt-4 text-[2.1rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.7rem]">
                Find the AI system <GradientText>your business is missing</GradientText>.
              </h2>
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/60">
                Book a discovery call and we'll show you exactly where AI can win you back time,
                calls, and revenue. No jargon, no obligation.
              </p>
              <ul className="mt-7 space-y-3">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-white/80">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: GRAD }}>
                      <Check className="h-3 w-3 text-[#04101c]" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-xl px-6 py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5 lg:hidden"
                style={{ background: GRAD }}
              >
                Book Discovery Call
              </a>
            </div>
          </Reveal>

          {/* Right: calendar embed (rebuilt) */}
          <Reveal delay={100}>
            <div
              ref={holderRef}
              className="relative rounded-2xl border border-white/[0.1] bg-white/[0.02] p-2 shadow-2xl"
            >
              <div className="relative w-full overflow-hidden rounded-xl bg-white" style={{ minHeight: 760 }}>
                {/* skeleton */}
                {!loaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b1622]">
                    <Loader2 className="h-6 w-6 animate-spin text-[#57C7E3]" />
                    <p className="text-[13px] text-white/50">Loading live calendar…</p>
                  </div>
                )}
                {inView && (
                  <iframe
                    id="ghl-booking-iframe"
                    src={`${BOOKING}?embed=true`}
                    title="Book a discovery call with Automis"
                    className="block h-full w-full"
                    style={{ height: 780, minHeight: 760, border: "none", overflow: "auto" }}
                    scrolling="yes"
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                  />
                )}
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
