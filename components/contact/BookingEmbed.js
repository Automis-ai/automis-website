"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Loader2, Check } from "lucide-react";
import { GRAD } from "@/components/home/_ui";

/*
  Standalone dark-framed booking calendar embed (lazy-loaded).
  Used on the light /consultation page where the calendar is the main CTA.
*/

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

export default function BookingEmbed() {
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
          Live availability · 30-min call
        </span>
        <span className="text-[12px] text-white/50">Instant confirmation</span>
      </div>
      <div className="relative w-full overflow-hidden rounded-xl bg-white" style={{ minHeight: 720 }}>
        {!loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b1622]">
            <Loader2 className="h-6 w-6 animate-spin text-[#57C7E3]" />
            <p className="text-[13px] text-white/50">Loading live calendar...</p>
          </div>
        )}
        {inView && (
          <iframe
            src={`${BOOKING}?embed=true`}
            title="Book a call with Automis"
            className="block h-full w-full"
            style={{ height: 740, minHeight: 720, border: "none", overflow: "auto" }}
            scrolling="yes"
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-2 py-2 text-[12px] text-white/60">
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> No obligation
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> No sales pressure
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> GDPR-aligned
        </span>
      </div>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
