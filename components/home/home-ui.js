"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/* Brand gradient text — the single accent treatment on headings. */
export function Grad({ children, className = "" }) {
  return (
    <span
      className={`bg-gradient-to-r from-soft-blue via-bright-blue to-soft-blue bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

/* Mono utility eyebrow. Reads like a system label, ties to the integrator identity. */
export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-plex-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-bright-blue ${className}`}
    >
      <span className="h-px w-6 bg-bright-blue/50" />
      {children}
    </span>
  );
}

/* Section header: eyebrow + Montserrat title + soft subtitle. */
export function SectionHeading({ eyebrow, title, subtitle, align = "center", className = "" }) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col ${
        isCenter ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && <span className="mb-4">{<Eyebrow>{eyebrow}</Eyebrow>}</span>}
      <h2 className="font-montserrat text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl font-open-sans text-base leading-relaxed text-white/60 md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* Scroll-reveal wrapper. Fades + rises once on enter; disabled under reduced-motion. */
export function Reveal({ children, className = "", delay = 0, y = 22, as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* Consistent section shell: vertical rhythm + optional faint brand grid. */
export function Section({ id, children, className = "", grid = false, containerClass = "" }) {
  return (
    <section id={id} className={`relative overflow-hidden px-4 py-20 md:py-28 ${className}`}>
      {grid && <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.04]" />}
      <div className={`container relative mx-auto max-w-6xl ${containerClass}`}>{children}</div>
    </section>
  );
}

/* Magnetic gold CTA — the one gold accent, one primary action per page. */
export function GoldCTA({ href, children, external = false, className = "", icon = true }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  const inner = (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`hx-cta-gold inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-montserrat text-base font-bold transition-[box-shadow,transform] duration-300 ${className}`}
    >
      {children}
      {icon && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block no-underline">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="inline-block no-underline">
      {inner}
    </Link>
  );
}

/* Quiet secondary link with an arrow — pairs with the gold CTA. */
export function GhostLink({ href, children, external = false, className = "" }) {
  const cls = `group inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-soft-blue transition-colors hover:text-white no-underline ${className}`;
  const body = (
    <>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
