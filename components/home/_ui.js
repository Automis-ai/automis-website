"use client";
import { useEffect, useRef, useState } from "react";

/*
  Shared UI primitives for the 2026 EN home refoundation.
  Design language: dark premium (deep-blue base) + signature blue→cyan gradient,
  warm-yellow reserved for CTA emphasis. All classes are prefixed / self-contained
  so nothing leaks into other locales or pages.
*/

// Signature gradient used for accent text, rules and glows.
export const GRAD = "linear-gradient(120deg,#3C91E6 0%,#57C7E3 55%,#B4C2FF 100%)";
export const GRAD_SOFT =
  "linear-gradient(120deg,rgba(60,145,230,0.16),rgba(87,199,227,0.10),rgba(180,194,255,0.05))";

// Scroll-reveal wrapper (no framer-motion; IntersectionObserver + CSS).
export function Reveal({ children, delay = 0, y = 24, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Section shell with consistent vertical rhythm + id anchor.
export function Section({ id, children, className = "", inner = "max-w-6xl", pad = "py-24 md:py-28" }) {
  return (
    <section id={id} className={`home-section relative ${pad} ${className}`}>
      <div className={`container mx-auto px-5 sm:px-6`}>
        <div className={`${inner} mx-auto`}>{children}</div>
      </div>
    </section>
  );
}

// Small uppercase label pill above a heading.
export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm ${className}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: GRAD, boxShadow: "0 0 10px rgba(87,199,227,0.7)" }}
      />
      {children}
    </span>
  );
}

// Gradient accent text.
export function GradientText({ children, className = "" }) {
  return (
    <span
      className={className}
      style={{
        backgroundImage: GRAD,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}

// Section heading block: eyebrow + h2 + optional lead paragraph.
export function SectionHeading({ eyebrow, title, lead, align = "center", className = "" }) {
  const alignCls = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow ? <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal> : null}
      <Reveal delay={60}>
        <h2
          className={`font-display mt-5 text-[1.75rem] leading-[1.14] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[2.6rem] sm:leading-[1.12] md:text-[3rem] ${
            align === "center" ? "mx-auto max-w-[16ch] sm:max-w-[20ch]" : "max-w-[20ch]"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={120}>
          <p
            className={`mt-4 text-[1rem] leading-relaxed text-white/60 [text-wrap:pretty] sm:mt-5 sm:text-[1.05rem] ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

// Subtle bordered card surface used across sections.
export function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm ${
        hover ? "card-gold hover:bg-white/[0.05] hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
