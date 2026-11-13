"use client";

import { useEffect, useState } from "react";

// Una sola animazione per tutto il catalogo. I tre file stanno in public/media e si sostituiscono in blocco, senza toccare il codice:
//   guide-ricevi-whatsapp.mp4          (3:4, 1080x1440)
//   guide-ricevi-whatsapp.poster.webp  (primo fotogramma, si vede mentre il video parte)
//   guide-ricevi-whatsapp.fermo.webp   (immagine ferma per chi ha ridotto il movimento: il video non viene nemmeno caricato)
const BASE = "/media/guide-ricevi-whatsapp";
const LABEL = "Come funziona: tocchi «Ricevila su WhatsApp», il messaggio è già pronto, ti arriva il link, confermi il tuo numero e la guida si apre.";

export default function HeroAnimation() {
  // Fermo finché non sappiamo la preferenza (server, JavaScript spento, movimento ridotto): così il video non parte mai di nascosto.
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => setPlay(!mq?.matches);
    sync();
    mq?.addEventListener?.("change", sync);
    return () => mq?.removeEventListener?.("change", sync);
  }, []);

  return (
    <figure className="anim">
      {play ? (
        <video autoPlay muted loop playsInline preload="metadata" poster={`${BASE}.poster.webp`} aria-label={LABEL} width="1080" height="1440">
          <source src={`${BASE}.mp4`} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`${BASE}.fermo.webp`} alt={LABEL} width="1080" height="1440" decoding="async" fetchPriority="high" />
      )}
    </figure>
  );
}
