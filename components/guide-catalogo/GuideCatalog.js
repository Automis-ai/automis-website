"use client";

import { useEffect, useState } from "react";
import "./catalogo.css";
import GuideCard, { DOOR } from "./GuideCard";
import WaButton from "./WaButton";
import HeroAnimation from "./HeroAnimation";
import ClickVideo from "@/components/ui/ClickVideo";

const SECTIONS = [
  { porta: "ruolo", tab: "Ruolo", title: "Per ruolo", sub: "Cosa cambia con l’IA nel tuo lavoro." },
  { porta: "settore", tab: "Settore", title: "Per settore", sub: "L’IA nel tuo tipo di attività." },
  { porta: "strumento", tab: "Strumenti", title: "Strumenti", sub: "Usare bene quello che hai già." },
  { porta: "servizio", tab: "Marketing e clienti", title: "Marketing e clienti", sub: "Un tema alla volta." },
];

const FINDER = "/it#opportunity-finder";

export default function GuideCatalog({ guide, source = "", focusCode = "", related = [], video = null }) {
  const pronte = guide.filter((g) => g.pronta);
  // guida pronta in ?g=: va in evidenza in alto (le «in arrivo» restano nel catalogo con la scheda evidenziata)
  const featured = focusCode ? pronte.find((g) => g.code === focusCode) : null;
  const presto = guide.filter((g) => !g.pronta);
  const sections = SECTIONS.map((s) => ({ ...s, items: pronte.filter((g) => g.porta === s.porta) })).filter((s) => s.items.length);
  const mins = pronte.map((g) => g.minuti).filter(Number.isInteger);
  const min = Math.min(...mins);
  const max = Math.max(...mins);
  const edizione = pronte.map((g) => g.edizione).find(Boolean);
  const order = ["ruolo", "settore", "strumento", "servizio", "mini"];
  const soon = [...presto].sort((a, b) => order.indexOf(a.porta) - order.indexOf(b.porta));
  const [active, setActive] = useState(sections[0]?.porta);

  // ?g=CODICE: la pagina scorre fino a quella scheda e la evidenzia per qualche secondo
  useEffect(() => {
    if (!focusCode || featured) return undefined;
    const el = document.getElementById(`g-${focusCode}`);
    if (!el) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const go = () => {
      const top = el.getBoundingClientRect().top + window.scrollY - Math.max(0, window.innerHeight / 2 - el.offsetHeight / 2);
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      el.classList.add("flash");
    };
    const t1 = setTimeout(go, 350);
    const t2 = setTimeout(() => el.classList.remove("flash"), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); el.classList.remove("flash"); };
  }, [focusCode, featured]);

  // la voce del menu fisso che corrisponde alla sezione a schermo
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.dataset.porta);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    document.querySelectorAll("#gd .sec").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div id="gd">
      <div className="wrap">
        {featured ? (
          <>
            <section className="pick" aria-labelledby="gd-pick">
              <p className="who">{DOOR[featured.porta]} · per {featured.per_chi}{featured.minuti ? ` · ${featured.minuti} min di lettura` : ""}</p>
              <h1 id="gd-pick">{featured.titolo}</h1>
              <p className="lead">{featured.promessa}</p>
              <div className="act">
                <WaButton guida={featured} source={source} kind="vorrei" />
              </div>
              <p className="proof">Gratis, su WhatsApp.</p>
            </section>
            {video ? (
              <section className="sec vid" aria-labelledby="gd-vid">
                <h2 id="gd-vid">{video.title}</h2>
                <p className="sub">{video.lead}</p>
                <ClickVideo base={video.base} label={video.label} />
              </section>
            ) : null}
            {related.length ? (
              <section className="sec" aria-labelledby="gd-rel">
                <h2 id="gd-rel">Ti può servire anche</h2>
                <div className="grid">
                  {related.map((g) => <GuideCard key={g.code} g={g} source={source} />)}
                </div>
              </section>
            ) : null}
            <p className="all"><a href="/it/guide">Vedi tutte le guide</a></p>
          </>
        ) : (
        <>
        <section className="hero" aria-labelledby="gd-h1">
          <div className="hero-head">
            <h1 id="gd-h1">Le guide pratiche per portare l’IA in azienda.</h1>
            <p className="lead">Gratis, su WhatsApp. Ognuna con i conti da fare e i passi da seguire.</p>
          </div>
          <HeroAnimation />
          <div className="hero-act">
            <a className="btn gold" href={`#${sections[0]?.porta || "ruolo"}`}>Scegli la tua guida</a>
            <p className="proof">
              <b>{pronte.length}</b> guide pronte{mins.length ? <>, da <b>{min}</b> a <b>{max}</b> minuti di lettura</> : null}{edizione ? `, edizione di ${edizione}` : ""}.
            </p>
          </div>
        </section>

        <nav className="jump" aria-label="Vai alla sezione">
          {sections.map((s) => (
            <a key={s.porta} href={`#${s.porta}`} aria-current={active === s.porta ? "true" : undefined}>{s.tab}</a>
          ))}
        </nav>

        {sections.map((s) => (
          <section className="sec" id={s.porta} data-porta={s.porta} key={s.porta} aria-labelledby={`gd-${s.porta}`}>
            <h2 id={`gd-${s.porta}`}>{s.title}</h2>
            <p className="sub">{s.sub}</p>
            <div className="grid">
              {s.items.map((g) => <GuideCard key={g.code} g={g} source={source} />)}
            </div>
          </section>
        ))}

        {soon.length ? (
          <section className="soon" id="in-arrivo" aria-labelledby="gd-soon">
            <h2 id="gd-soon">In arrivo</h2>
            <p className="sub">Non sono ancora uscite. Scrivimi e ti avviso.</p>
            <ul>
              {soon.map((g) => (
                <li key={g.code} id={`g-${g.code}`}>
                  <div>
                    <span className="k">{DOOR[g.porta]}</span>
                    <span className="t">{g.titolo}</span>
                  </div>
                  <WaButton guida={g} source={source} kind="avvisami" variant="wa sm" />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        </>
        )}

        <section className="finder" aria-labelledby="gd-finder">
          <div>
            <h2 id="gd-finder">Non sai da quale partire?</h2>
            <p>Rispondi alle domande del Finder: in 2 minuti vedi le tue 3 opportunità IA.</p>
          </div>
          <a className="btn gold" href={FINDER}>Apri l’Opportunity Finder</a>
        </section>

        <p className="note">
          Su WhatsApp ti risponde l’assistente IA di Luca, che passa la mano a lui quando serve. Usiamo il tuo numero e i tuoi messaggi solo per mandarti la guida e risponderti.{" "}
          <a href="/it/privacy-policy">Informativa sulla privacy</a>.
        </p>
      </div>
    </div>
  );
}
