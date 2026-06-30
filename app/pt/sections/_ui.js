"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "@/components/CTAButton";

/* Gradient-highlighted text — the one accent treatment used across headings. */
export function Grad({ children }) {
  return (
    <span className="bg-gradient-to-r from-soft-blue via-bright-blue to-soft-blue bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/* Consistent section header: mono eyebrow + Montserrat title + soft subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2.5 font-plex-mono text-xs font-medium uppercase tracking-[0.18em] text-bright-blue">
          <span className="h-px w-6 bg-bright-blue/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-montserrat text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl font-open-sans text-base leading-relaxed text-white/65 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* Hook: returns [ref, isVisible] for scroll-reveal. */
export function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* Mid-page call-to-action band → always points at the booking calendar. */
export function CtaBand({
  eyebrow = "Pronto para começar?",
  title,
  subtitle,
  buttonLabel = "Agende uma chamada",
}) {
  return (
    <section className="relative px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-5xl">
        <div className="av-gradient-border relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12">
          <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-bright-blue/20 blur-[100px]" />
          <div className="relative">
            {eyebrow && (
              <p className="mb-3 font-plex-mono text-xs uppercase tracking-[0.18em] text-bright-blue">
                {eyebrow}
              </p>
            )}
            <h3 className="mx-auto max-w-2xl font-montserrat text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
              {title}
            </h3>
            {subtitle && (
              <p className="mx-auto mt-4 max-w-xl font-open-sans text-white/70">
                {subtitle}
              </p>
            )}
            <div className="mt-8 flex justify-center">
              <CTAButton
                href="#agendar"
                variant="primary"
                size="large"
                icon="fas fa-calendar-check"
              >
                {buttonLabel}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
