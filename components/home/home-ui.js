"use client";

import { createContext, useContext, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";

/* ── Surface context ──────────────────────────────────────────
   Each Section declares a surface (deep | panel | raised | accent);
   v3 is fully dark: rooms differ by depth, not by light/dark flips.
   "light" is kept for backward compatibility during the migration. */
const SurfaceContext = createContext({ surface: "deep", light: false });
export const useSurface = () => useContext(SurfaceContext);

const isLightSurface = (s) => s === "light";
const surfaceCls = (s) => (s === "light" ? "hx-surface-light" : `hx3-surface-${s}`);

/* Adaptive text classes (dark surfaces vs light surface). */
const headingCls = (light) => (light ? "text-[#0A1B2A]" : "text-white");
const leadCls = (light) => (light ? "text-[#0A1B2A]/70" : "text-white/70");
const bodyCls = (light) => (light ? "text-[#0A1B2A]/65" : "text-white/60");
const mutedCls = (light) => (light ? "text-[#0A1B2A]/55" : "text-white/45");

/* Thin scroll-progress bar pinned to the top. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-bright-blue via-soft-blue to-warm-yellow"
    />
  );
}

/* Mono kicker (section label). Bright-blue reads on both light and dark. */
export function Kicker({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-bright-blue ${className}`}
    >
      <span className="h-px w-6 bg-bright-blue/50" />
      {children}
    </span>
  );
}

/* Gradient-highlighted words. Adapts contrast to the surface. */
export function Grad({ children, className = "" }) {
  const { light } = useSurface();
  const grad = light
    ? "from-[#3C91E6] to-[#1656a8]"
    : "from-soft-blue via-bright-blue to-soft-blue";
  return (
    <span className={`bg-gradient-to-r ${grad} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

/* Inline scan-anchor: a bolded highlight inside body copy. */
export function HL({ children, tone = "text" }) {
  const { light } = useSurface();
  const color =
    tone === "gold"
      ? "text-warm-yellow"
      : tone === "blue"
        ? "text-bright-blue"
        : light
          ? "text-[#0A1B2A]"
          : "text-white";
  return <strong className={`font-semibold ${color}`}>{children}</strong>;
}

/* Section header: kicker -> big headline -> lead. One job per section. */
export function SectionHeading({ kicker, title, lead, align = "center", className = "" }) {
  const { light } = useSurface();
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col ${
        isCenter ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left"
      } ${className}`}
    >
      {kicker && <span className="mb-5">{<Kicker>{kicker}</Kicker>}</span>}
      <h2 className={`font-display text-display-xl font-semibold ${headingCls(light)}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-6 max-w-2xl font-body text-lg leading-relaxed ${leadCls(light)}`}>{lead}</p>
      )}
    </Reveal>
  );
}

/* Scroll-reveal wrapper (once). */
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
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* Surface-aware section shell with generous rhythm. */
export function Section({
  id,
  surface = "deep",
  children,
  className = "",
  containerClass = "",
  grid = false,
  pad = "py-24 md:py-32",
}) {
  const light = isLightSurface(surface);
  return (
    <SurfaceContext.Provider value={{ surface, light }}>
      <section
        id={id}
        data-surface={surface}
        className={`${surfaceCls(surface)} relative overflow-hidden px-4 ${pad} ${className}`}
      >
        {grid && !light && (
          <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
        )}
        <div className={`container relative mx-auto max-w-6xl ${containerClass}`}>{children}</div>
      </section>
    </SurfaceContext.Provider>
  );
}

/* Adaptive card: dark glass with gold-orbit hover, or a clean white light card. */
export function Card({ children, className = "", orbit = true, gold = false }) {
  const { light } = useSurface();
  if (light) {
    return (
      <div className={`hx-card-light ${gold ? "hx-card-light-gold" : ""} rounded-2xl ${className}`}>
        {children}
      </div>
    );
  }
  return (
    <div
      className={`av-gradient-border ${orbit ? "hx-orbit" : ""} ${
        gold ? "hx-orbit-on" : ""
      } rounded-2xl bg-white/[0.03] ${className}`}
    >
      {children}
    </div>
  );
}

/* Big focal number + label (adaptive). */
export function Stat({ value, suffix, label, gold = false, className = "" }) {
  const { light } = useSurface();
  return (
    <div className={className}>
      <div className={`font-display text-4xl font-semibold sm:text-5xl lg:text-6xl ${headingCls(light)}`}>
        {value}
        {suffix && <span className={gold ? "text-warm-yellow" : "text-bright-blue"}>{suffix}</span>}
      </div>
      <p className={`mt-3 font-body text-sm leading-snug ${bodyCls(light)}`}>{label}</p>
    </div>
  );
}

/* Magnetic gold CTA with sheen. Works on any surface (gold is the constant). */
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
      className={`hx-cta-gold hx-shine relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-display text-base font-bold transition-[box-shadow,transform] duration-300 ${className}`}
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

/* Pulsing live-status dot. Functional green only: means "this is running". */
export function LiveDot({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`hx3-live-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal ${className}`}
    />
  );
}

/* Small mono chip for statuses, tags, and cost labels. */
const TAG_TONES = {
  default: "border-white/10 bg-white/[0.04] text-white/60",
  blue: "border-bright-blue/25 bg-bright-blue/10 text-bright-blue",
  gold: "border-gold-500/30 bg-gold-500/10 text-gold-400",
  red: "border-red-400/20 bg-red-400/[0.07] text-red-300/80",
};
export function MonoTag({ children, tone = "default", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] ${
        TAG_TONES[tone] || TAG_TONES.default
      } ${className}`}
    >
      {children}
    </span>
  );
}

/* Quiet secondary link with arrow (adaptive). */
export function GhostLink({ href, children, external = false, className = "" }) {
  const { light } = useSurface();
  const base = light
    ? "text-bright-blue hover:text-[#0A1B2A]"
    : "text-soft-blue hover:text-white";
  const cls = `group inline-flex items-center gap-2 font-display text-sm font-semibold no-underline transition-colors ${base} ${className}`;
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
