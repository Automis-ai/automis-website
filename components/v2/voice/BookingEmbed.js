"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import "@/components/home-v3/home-v3.css";

/*
  Il calendario di prenotazione (LeadConnector) dentro una finestra di vetro. L'iframe si carica solo quando la sezione sta per
  entrare nello schermo (IntersectionObserver con 400 px di margine); finché non è pronto c'è un riquadro di attesa.
  Intestazione e righe di rassicurazione arrivano dai testi della pagina (props).
*/
export default function BookingEmbed({ booking, header, confirm, loadingLabel, iframeTitle, badges }) {
  const holderRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setInView(true), io.disconnect())),
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={holderRef} className="v2-card v2vo-cal hv3 hv3-call__card">
      <div className="v2vo-cal__head">
        <span className="v2vo-cal__live">
          <i className="hv3-call__dot" aria-hidden="true" />
          {header}
        </span>
        <span className="v2vo-cal__ok">{confirm}</span>
      </div>
      <div className="v2vo-cal__body hv3-call__frame">
        {!loaded ? (
          <div className="v2vo-cal__wait" role="status">
            <span className="v2vo-cal__spin" aria-hidden="true" />
            <span>{loadingLabel}</span>
          </div>
        ) : null}
        {inView ? (
          <iframe
            id="ghl-booking-iframe"
            src={`${booking}?embed=true`}
            title={iframeTitle}
            className="v2vo-cal__frame"
            scrolling="yes"
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        ) : null}
      </div>
      <ul className="v2vo-cal__badges hv3-call__proof" role="list">
        {badges.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {/* ridimensiona l'iframe, così tutti i giorni disponibili restano raggiungibili */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
