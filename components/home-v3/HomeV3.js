"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { addLangPrefix } from "@/lib/locales";
import LoopVideo from "@/components/ui/LoopVideo";
import ToolsStrip from "@/components/home/ToolsStrip";
import ScrollRow from "./ScrollRow";
import { homeCopy } from "./copy";
import "./home-v3.css";

// Il canvas arriva dopo il testo: il titolo della hero si vede subito, l'effetto si aggiunge.
const OrderBg = dynamic(() => import("./OrderBg"), { ssr: false });

const localeOf = (p) => (p?.startsWith("/pt") ? "pt" : p?.startsWith("/it") ? "it" : "en");

const ICONS = {
  marketing: '<path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 6v8"/>',
  sales: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  support: '<path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/>',
  admin: '<path d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3"/><circle cx="18" cy="18" r="3"/><path d="M18 14v1M18 21v1M14 18h1M21 18h1"/>',
  hr: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
};
const Icon = ({ k }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[k] }} />
);

export function HeroV3() {
  const locale = localeOf(usePathname());
  const t = homeCopy(locale).hero;
  const textRef = useRef(null);
  const inRef = useRef(null);

  // allo scroll il testo sfuma e sale di poco, insieme allo sfondo
  useEffect(() => {
    const el = inRef.current;
    if (!el || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight * 0.75)));
      el.style.opacity = (1 - p * 1.5).toFixed(3);
      el.style.transform = `translate3d(0,${(-p * 50).toFixed(1)}px,0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className="hv3 hv3-hero">
      <div className="hv3-hero__bg">
        <OrderBg textRef={textRef} />
      </div>
      <div className="hv3-hero__veil" />
      <div ref={inRef} className="hv3-hero__in">
        <div ref={textRef} className="flex flex-col items-center">
          <span className="hv3-pill">{t.eyebrow}</span>
          <h1 className="hv3-h1 font-display">
            {t.titlePre}
            <em>{t.titleAccent}</em>
            {t.titlePost}
          </h1>
          <p className="hv3-hero__lead">{t.lead}</p>
          <div className="hv3-ctas">
            <a className="hv3-btn hv3-btn--p" href="#sistemi">
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function JourneyV3() {
  const locale = localeOf(usePathname());
  const t = homeCopy(locale).journey;
  return (
    <section id="journey" className="hv3 hv3-journey">
      <div className="hv3-journey__tools">
        <ToolsStrip />
      </div>
      <div className="hv3-head">
        <span className="hv3-eyebrow">{t.eyebrow}</span>
        <h2 className="hv3-h2 font-display">{t.title}</h2>
      </div>
      <div className="hv3-journey__frame">
        <div className="hv3-glass" role="img" aria-label={t.videoLabel}>
          <LoopVideo base={`/media/homepage-journey/${locale}`} />
        </div>
      </div>
    </section>
  );
}

export function SystemsV3() {
  const locale = localeOf(usePathname());
  const t = homeCopy(locale).systems;
  const chapRef = useRef(null);

  // il capitolo acceso è quello della scheda che hai davanti
  const onProgress = (k, track) => {
    const box = chapRef.current;
    if (!box) return;
    let best = null;
    let bd = Infinity;
    const target = window.innerWidth * (0.2 + 0.6 * k);
    track.querySelectorAll("[data-chapter]").forEach((c) => {
      const q = c.getBoundingClientRect();
      const d = Math.abs(q.left + q.width / 2 - target);
      if (d < bd) {
        bd = d;
        best = c;
      }
    });
    if (!best) return;
    box.querySelectorAll("span").forEach((s) => s.classList.toggle("is-on", s.dataset.c === best.dataset.chapter));
  };

  const head = (
    <div className="hv3-head">
      <span className="hv3-eyebrow">{t.eyebrow}</span>
      <h2 className="hv3-h2 font-display">{t.title}</h2>
      <div ref={chapRef} className="hv3-chapters">
        {Object.entries(t.chapters).map(([c, label], i) => (
          <span key={c} data-c={c} className={i === 0 ? "is-on" : ""}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="sistemi" className="hv3 hv3-systems">
      <ScrollRow head={head} onProgress={onProgress}>
        {t.items.map((s) => (
          <article key={s.slug} className="hv3-scard" data-chapter={s.chapter}>
            <span className="hv3-scard__chap">{t.chapters[s.chapter]}</span>
            <span className="hv3-scard__ico">
              <Icon k={s.slug} />
            </span>
            <h3 className="font-display">{s.title}</h3>
            <p className="hv3-scard__line">{s.line}</p>
            <div className="hv3-scard__pain">
              <b>{t.pain}</b>
              <span>{s.pain}</span>
            </div>
            <details className="hv3-more">
              <summary>{t.more}</summary>
              <p>{s.more}</p>
            </details>
            <Link className="hv3-scard__go" href={addLangPrefix(`/systems/${s.slug}`, locale)}>
              {t.go} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </ScrollRow>
    </section>
  );
}

export function CasesV3() {
  const locale = localeOf(usePathname());
  const t = homeCopy(locale).cases;
  const head = (
    <div className="hv3-head">
      <span className="hv3-eyebrow">{t.eyebrow}</span>
      <h2 className="hv3-h2 font-display">{t.title}</h2>
      <p className="hv3-lead">{t.lead}</p>
    </div>
  );
  return (
    <section id="casi" className="hv3 hv3-tone hv3-cases">
      <ScrollRow head={head}>
        {t.items.map((c) => (
          <article key={c.slug} className="hv3-ccard">
            <span className="hv3-ccard__logo">
              <img src={c.logo} alt={c.client} loading="lazy" />
            </span>
            <div className="hv3-ccard__stat font-display">
              {c.approx ? <small>{t.approx}</small> : null}
              {c.stat}
            </div>
            <div className="hv3-ccard__lab">{c.label}</div>
            <div className="hv3-ccard__who">
              <b>{c.client}</b>
              {c.meta}
            </div>
            <Link className="hv3-ccard__go" href={addLangPrefix(`/use-cases/${c.slug}`, locale)}>
              {t.read} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </ScrollRow>
    </section>
  );
}

// Fascia in blu attorno ai founder (le sezioni «chiare» sono blu, scelta del 13/10).
export function ToneV3({ children, className = "" }) {
  return <div className={`hv3 hv3-tone ${className}`}>{children}</div>;
}
