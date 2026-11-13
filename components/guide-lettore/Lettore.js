"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/guideWa";
import WaButton from "@/components/guide-catalogo/WaButton";

const BATCH = 8; // pagine per richiesta di link firmati (il server ne dà al massimo 12)
const AHEAD = "1400px"; // si chiedono i link quando la pagina è a questa distanza dallo schermo

// Pagine come immagini, senza PDF e senza tasto di download. Caricamento progressivo: i link firmati
// (10 minuti) si chiedono a gruppi man mano che si scorre, così non scadono mentre si legge.
// Menu del tasto destro e trascinamento disattivati sulle immagini: è solo attrito, non una protezione.
export default function Lettore({ guida, next, manifest, initial }) {
  const { pagine, larghezza, altezza } = manifest;
  const [urls, setUrls] = useState(() => {
    const a = new Array(pagine).fill(null);
    for (const { n, url } of initial) a[n - 1] = url;
    return a;
  });
  const asked = useRef(new Set(initial.map((p) => p.n)));
  const wrap = useRef(null);
  const retries = useRef({});

  const load = useCallback(async (from, force = false) => {
    const to = Math.min(pagine, from + BATCH - 1);
    const need = [];
    for (let n = from; n <= to; n++) if (force || !asked.current.has(n)) need.push(n);
    if (!need.length) return;
    need.forEach((n) => asked.current.add(n));
    try {
      const res = await fetch("/api/guide-leggi-pagine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: guida.slug, from: need[0], to: need[need.length - 1] }),
      });
      if (res.status === 401) {
        window.location.reload(); // cookie scaduto: si torna alla richiesta del numero
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.pages) throw new Error("pagine");
      setUrls((prev) => {
        const next = prev.slice();
        for (const { n, url } of data.pages) next[n - 1] = url;
        return next;
      });
    } catch {
      need.forEach((n) => asked.current.delete(n)); // si riprova al prossimo scorrimento
    }
  }, [guida.slug, pagine]);

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      load(1);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) load(Number(e.target.dataset.n));
        }
      },
      { rootMargin: `${AHEAD} 0px` },
    );
    el.querySelectorAll(".pg").forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, [load]);

  const question = waLink({ kind: "domanda", titolo: guida.titolo });
  return (
    <div ref={wrap}>
      <div className="bar">
        <p>{pagine} pagine · si legge qui</p>
        <a href={question} target="_blank" rel="noopener noreferrer">Hai una domanda? Scrivimi</a>
      </div>
      <div className="pages" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>
        {urls.map((url, i) => (
          <div
            key={i}
            className={`pg${url ? "" : " wait"}`}
            data-n={i + 1}
            style={{ aspectRatio: `${larghezza} / ${altezza}` }}
          >
            {url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={`${guida.titolo}, pagina ${i + 1} di ${pagine}`}
                draggable={false}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                onLoad={(e) => e.currentTarget.classList.add("on")}
                onError={() => {
                  // link scaduto o caduto: se ne chiede uno nuovo, al massimo due volte per pagina
                  retries.current[i] = (retries.current[i] || 0) + 1;
                  if (retries.current[i] > 2) return;
                  setUrls((prev) => { const n = prev.slice(); n[i] = null; return n; });
                  load(i + 1, true);
                }}
              />
            ) : null}
            <span className="n" aria-hidden="true">{i + 1}</span>
          </div>
        ))}
      </div>
      <p className="print-note">Questa guida si legge online, non si stampa.</p>
      <section className="after" aria-labelledby="gl-after">
        <div>
          <h2 id="gl-after">{next ? "Dopo questa" : "Una domanda?"}</h2>
          <p>
            {next
              ? `Ti consiglio «${next.titolo}».`
              : "Scrivimi su WhatsApp: ti risponde l’assistente IA di Luca, che passa la mano a lui quando serve."}
          </p>
        </div>
        {next ? (
          <WaButton guida={next} kind={next.pronta ? "vorrei" : "avvisami"} />
        ) : (
          <a className="btn soft" href={question} target="_blank" rel="noopener noreferrer">Scrivimi su WhatsApp</a>
        )}
      </section>
    </div>
  );
}
