"use client";

import { useEffect, useState } from "react";

/**
 * Sticky left "Contents" sidebar with scroll-spy.
 * Shows ONLY the main sections (H2), numbered 01, 02... so the list stays short
 * enough to fit the viewport. The active section is highlighted as you scroll.
 */
export default function BlogToc({ toc, label }) {
  const items = (toc || []).filter((h) => h.level === 2);
  const [active, setActive] = useState(items.length ? items[0].id : null);

  useEffect(() => {
    if (!items.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 }
    );
    items.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toc]);

  if (items.length < 2) return null;

  return (
    <nav className="blog-toc2" aria-label={label}>
      <p className="blog-toc2-title">{label}</p>
      <ul>
        {items.map((h, i) => (
          <li
            key={h.id}
            className={"toc2-h2" + (active === h.id ? " is-active" : "")}
          >
            <a href={`#${h.id}`}>
              <span className="toc2-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="toc2-text">{h.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
