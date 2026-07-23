"use client";

import { useEffect, useState } from "react";

/**
 * Sticky left "Contents" sidebar with scroll-spy.
 * H2 items are numbered (01, 02...), H3 items are indented sub-items.
 * The active section is highlighted as you scroll.
 */
export default function BlogToc({ toc, label }) {
  const [active, setActive] = useState(toc && toc.length ? toc[0].id : null);

  useEffect(() => {
    if (!toc || !toc.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 }
    );
    toc.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  if (!toc || toc.length < 2) return null;

  let n = 0;
  return (
    <nav className="blog-toc2" aria-label={label}>
      <p className="blog-toc2-title">{label}</p>
      <ul>
        {toc.map((h) => {
          const isH2 = h.level === 2;
          if (isH2) n += 1;
          const num = isH2 ? String(n).padStart(2, "0") : null;
          return (
            <li
              key={h.id}
              className={
                (isH2 ? "toc2-h2" : "toc2-h3") +
                (active === h.id ? " is-active" : "")
              }
            >
              <a href={`#${h.id}`}>
                {num && <span className="toc2-num">{num}</span>}
                <span className="toc2-text">{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
