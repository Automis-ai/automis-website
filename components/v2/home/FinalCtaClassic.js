"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GRAD, GradientText } from "@/components/home/_ui";
import { Plain } from "./WowParts";
import ModuleTile from "./ModuleTile";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { addLangPrefix } from "@/lib/locales";

/*
  La chiusura della home, da copia di components/home/FinalCta.js: stessi testi, ma il layout è una scena.
  - Titolo grande al centro, poi la rete: sei moduli (calendario, chiamate, fatture, scheda cliente, chat, annunci: gli
    stessi della hero) che si compongono intorno al bottone. Il bottone è il nodo centrale: i pacchetti arrivano da ogni
    modulo, uno dopo l'altro, e lo fanno pulsare. Il filo della pagina (stages/spine.js) gira l'angolo e ci entra.
    La coreografia sta in stages/call.js; senza JavaScript restano i moduli fermi intorno al bottone.
  - Prop `live`. Con live=true (produzione) sotto la scena c'è il calendario vero di LeadConnector e il bottone ci scorre.
    Con live=false (anteprima) il calendario non si carica e lo script non parte, così la preview non manda richieste
    fuori (§8 del brief): il bottone porta a /contact (Finder + calendario) e la chiusura resta pulita, senza
    riquadri di segnaposto.
*/

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const COPY = {
  en: {
    eyebrow: "Let's build it",
    h2Pre: "Find the AI system ",
    h2Grad: "your business is missing",
    h2Post: ".",
    lead:
      "Book a discovery call and we'll show you exactly where AI can win you back time, calls, and revenue. No jargon, no obligation.",
    bullets: [
      "A 30-minute, no-pressure discovery call",
      "We map where your business leaks time & money",
      "Leave with a clear view of your best AI opportunities",
    ],
    cta: "Book Discovery Call",
    availability: "Live availability · 30-min call",
    instantConfirmation: "Instant confirmation",
    loading: "Loading live calendar…",
    iframeTitle: "Book a discovery call with Automis",
    guarantee: "30-day performance guarantee",
    gdpr: "GDPR-aligned",
    noObligation: "No obligation",
  },
  it: {
    eyebrow: "Costruiamolo insieme",
    h2Pre: "Mezz'ora per capire ",
    h2Grad: "da dove partire",
    h2Post: ".",
    lead:
      "Prenota una call: ti mostriamo nero su bianco dove l'IA può farti recuperare tempo, chiamate e fatturato. Zero tecnicismi, zero impegno.",
    bullets: [
      "Una call di 30 minuti, in tutta tranquillità",
      "Scopriamo dove la tua azienda perde tempo e soldi",
      "Esci con le idee chiare sulle tue migliori opportunità IA",
    ],
    cta: "Prenota una call",
    availability: "Disponibilità aggiornata · call da 30 min",
    instantConfirmation: "Conferma immediata",
    loading: "Caricamento calendario…",
    iframeTitle: "Prenota una call con Automis",
    guarantee: "Garanzia sui risultati a 30 giorni",
    gdpr: "Conforme al GDPR",
    noObligation: "Nessun impegno",
  },
  pt: {
    eyebrow: "Vamos construí-lo",
    h2Pre: "Meia hora para perceber ",
    h2Grad: "por onde começar",
    h2Post: ".",
    lead:
      "Agende uma chamada de descoberta e mostramos-lhe exatamente onde a IA lhe pode devolver tempo, chamadas e faturação. Sem jargão, sem compromisso.",
    bullets: [
      "Uma chamada de descoberta de 30 minutos, sem pressão",
      "Mapeamos onde o seu negócio perde tempo e dinheiro",
      "Sai com uma visão clara das suas melhores oportunidades de IA",
    ],
    cta: "Agende uma chamada",
    availability: "Disponibilidade em tempo real · chamada de 30 min",
    instantConfirmation: "Confirmação imediata",
    loading: "A carregar o calendário…",
    iframeTitle: "Agende uma chamada de descoberta com a Automis",
    guarantee: "Garantia de desempenho de 30 dias",
    gdpr: "Conforme ao RGPD",
    noObligation: "Sem compromisso",
  },
};

// I sei moduli intorno al bottone, nell'ordine della catena: una chiamata, un appuntamento, una fattura, la scheda cliente...
// --x/--y: posizione (in %) da 768 px; --mx/--my: posizione sul telefono (il lato sinistro resta libero per il filo della pagina).
const TILES = [
  { glyph: "phone", x: 86, y: 26, mx: 87, my: 10 },
  { glyph: "calendar", x: 86, y: 74, mx: 92, my: 50 },
  { glyph: "invoice", x: 50, y: 90, mx: 87, my: 90 },
  { glyph: "client", x: 14, y: 74, mx: 50, my: 94 },
  { glyph: "chat", x: 14, y: 26, mx: 13, my: 90 },
  { glyph: "ads", x: 50, y: 10, mx: 13, my: 10 },
];

export default function FinalCtaClassic({ live = false }) {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const booking = locale === "it" ? "https://api.leadconnectorhq.com/widget/bookings/automis-it" : locale === "pt" ? "https://api.leadconnectorhq.com/widget/bookings/pt-automis" : BOOKING;
  const holderRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lazy-load the LeadConnector iframe only when the section approaches view.
  useEffect(() => {
    const el = holderRef.current;
    if (!el || !live) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setInView(true), io.disconnect())),
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [live]);

  const coreHref = live ? "#calendario" : addLangPrefix("/contact", locale);

  return (
    <section id="book" data-wow="call" className="v2hp-call relative overflow-hidden bg-[#020a12] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-[22%] h-[640px] w-[1100px] max-w-[160%] -translate-x-1/2 opacity-60 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(60,145,230,0.30), transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        {/* Titolo */}
        <Plain>
          <div className="mx-auto max-w-3xl text-center">
            <span data-wow-eyebrow className="inline-block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{t.eyebrow}</span>
            <h2 data-wow-title className="font-display mt-4 text-[2.1rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.9rem] md:text-[3.4rem]">
              {t.h2Pre}<GradientText>{t.h2Grad}</GradientText>{t.h2Post}
            </h2>
            <p data-wow-lead className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/60">
              {t.lead}
            </p>
          </div>
        </Plain>

        {/* La scena: sei moduli intorno al bottone */}
        <div className="v2hp-stage" data-wow-stage>
          <div className="v2hp-stage__wires" data-wires aria-hidden="true" />
          {TILES.map((tile) => (
            <span
              key={tile.glyph}
              className="v2hp-stage__tile"
              data-stage-tile
              aria-hidden="true"
              style={{ "--x": `${tile.x}%`, "--y": `${tile.y}%`, "--mx": `${tile.mx}%`, "--my": `${tile.my}%` }}
            >
              <ModuleTile glyph={tile.glyph} size="lg" />
            </span>
          ))}
          <a
            href={coreHref}
            data-wow-core
            data-magnetic
            className="v2hp-core"
          >
            <span className="v2hp-core__halo" aria-hidden="true" />
            <i className="v2hp-core__ring" data-core-ring aria-hidden="true" />
            <span className="v2hp-core__t">{t.cta}</span>
            <ArrowRight className="v2hp-core__arrow" strokeWidth={2.4} aria-hidden="true" />
          </a>
        </div>

        <Plain>
          <ul data-wow-bullets className="v2hp-bullets">
            {t.bullets.map((b) => (
              <li key={b}>
                <span className="v2hp-bullets__ck" style={{ background: GRAD }}>
                  <Check className="h-3 w-3 text-[#04101c]" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="v2hp-trust">
            <span><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> {t.guarantee}</span>
            <span><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> {t.gdpr}</span>
            <span><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> {t.noObligation}</span>
          </div>
        </Plain>

        {/* Il calendario vero: solo in produzione */}
        {live ? (
          // L'ancora (#calendario, dove porta il bottone) sta sul contenitore fermo, non sul riquadro: il riquadro entra con
          // uno spostamento e una profondità (stages/call.js), e Lenis misurerebbe la sua posizione mentre è ancora spostato.
          <Plain id="calendario" className="v2hp-calwrap">
            <div
              ref={holderRef}
              data-wow-panel
              className="v2hp-cal relative mx-auto mt-14 max-w-3xl rounded-2xl border border-white/[0.1] bg-white/[0.02] p-2 shadow-2xl"
            >
              {/* dark header so the (unavoidably light) calendar reads as an intentional inset */}
              <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-white/85">
                  <span className="h-2 w-2 rounded-full" style={{ background: GRAD, boxShadow: "0 0 8px rgba(87,199,227,0.8)" }} />
                  {t.availability}
                </span>
                <span className="text-[12px] text-white/50">{t.instantConfirmation}</span>
              </div>
              <div className="relative w-full overflow-hidden rounded-xl bg-white" style={{ minHeight: 760 }}>
                {/* skeleton */}
                {!loaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b1622]">
                    <Loader2 className="h-6 w-6 animate-spin text-[#57C7E3]" />
                    <p className="text-[13px] text-white/50">{t.loading}</p>
                  </div>
                )}
                {inView && (
                  <iframe
                    id="ghl-booking-iframe"
                    src={`${booking}?embed=true`}
                    title={t.iframeTitle}
                    className="block h-full w-full"
                    style={{ height: 780, minHeight: 760, border: "none", overflow: "auto" }}
                    scrolling="yes"
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                  />
                )}
              </div>
              {/* LeadConnector auto-resize so all available days are reachable */}
              <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
            </div>
          </Plain>
        ) : null}
      </div>
    </section>
  );
}
