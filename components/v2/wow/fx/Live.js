"use client";
import { useEffect, useRef } from "react";

/*
  Un contenitore che dice al CSS quando è nello schermo: mette la classe `is-live` finché il blocco si vede (con un margine di 80 px)
  e la toglie quando esce. Serve ai cicli fatti solo di CSS (pacchetti che corrono lungo i fili): le animazioni partono da ferme
  (animation-play-state: paused) e girano solo dentro `.is-live`. Fuori dallo schermo e a scheda nascosta non consumano niente;
  senza JavaScript restano ferme e il disegno si legge lo stesso. Non anima nulla da sé.
*/
export default function Live({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    let visible = true;
    const set = () => el.classList.toggle("is-live", visible && document.visibilityState === "visible");
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        set();
      },
      { rootMargin: "80px 0px" }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", set);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", set);
    };
  }, []);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
