"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Mail, Calendar, Loader2, ArrowRight } from "lucide-react";
import { GRAD } from "@/components/home/_ui";

/*
  Right column of the /contact page: direct contact methods + the embedded
  booking calendar (dark-framed inset, lazy-loaded like FinalCta's embed).
*/

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const SOCIALS = [
  { name: "X", href: "https://x.com/AutomisAI", label: "@AutomisAI" },
  { name: "Instagram", href: "https://www.instagram.com/automis.ai/", label: "automis.ai" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/automisai", label: "automisai" },
  { name: "Facebook", href: "https://www.facebook.com/automisai", label: "automisai" },
];

export default function ContactAside() {
  const holderRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
    <div className="space-y-6">
      {/* Direct contact */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
        <h3 className="font-display text-[1.25rem] text-white">Reach us directly</h3>
        <a
          href="mailto:info@automis.ai"
          className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-colors duration-300 hover:border-[#3C91E6]/40 hover:bg-white/[0.05]"
        >
          <span
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
            style={{ background: GRAD }}
          >
            <Mail className="h-5 w-5 text-[#04101c]" />
          </span>
          <span>
            <span className="block text-[12px] uppercase tracking-[0.14em] text-white/45">Email</span>
            <span className="block text-[15px] font-medium text-white">info@automis.ai</span>
          </span>
        </a>

        <div className="mt-5">
          <span className="text-[12px] uppercase tracking-[0.14em] text-white/45">Follow</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[13px] text-white/70 transition-colors duration-300 hover:border-[#3C91E6]/40 hover:text-white"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Booking calendar embed */}
      <div
        ref={holderRef}
        className="relative rounded-2xl border border-white/[0.1] bg-white/[0.02] p-2 shadow-2xl"
      >
        <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-white/85">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: GRAD, boxShadow: "0 0 8px rgba(87,199,227,0.8)" }}
            />
            Prefer to talk? Book a 30-min call
          </span>
          <span className="hidden text-[12px] text-white/50 sm:block">Instant confirmation</span>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl bg-white" style={{ minHeight: 620 }}>
          {!loaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b1622]">
              <Loader2 className="h-6 w-6 animate-spin text-[#57C7E3]" />
              <p className="text-[13px] text-white/50">Loading live calendar...</p>
            </div>
          )}
          {inView && (
            <iframe
              src={`${BOOKING}?embed=true`}
              title="Book a discovery call with Automis"
              className="block h-full w-full"
              style={{ height: 640, minHeight: 620, border: "none", overflow: "auto" }}
              scrolling="yes"
              onLoad={() => setLoaded(true)}
              loading="lazy"
            />
          )}
        </div>
        <a
          href={BOOKING}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-white/70 transition-colors duration-300 hover:text-white"
        >
          <Calendar className="h-4 w-4" />
          Open the full calendar
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
      </div>
    </div>
  );
}
