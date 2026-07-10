"use client";

// Finder IT autonomo per la landing /luca-ig (prova embedded).
// Riusa l'endpoint /api/audit (cattura -> GHL, source "luca-ig") e il generatore
// PDF esistente. NON tocca il Finder inline della home IT (app/it/page.js).
// Se la prova convince, si consolida con Arcangelo in un componente condiviso.

import { useState } from "react";
import { FINDER_COPY, hoursLabel } from "@/components/home/finderCopy";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/luca-automis";

// Fonte unica: la stessa copy (domande, pesi, pilastri) del Finder del sito.
// Niente duplicazione, niente deriva: se cambia li, cambia anche qui.
const t = FINDER_COPY.it;
const QUESTIONS = t.questions;
const PILLAR_PLAYS = t.pillars;

const CSS = `
.lf { --deep:#000A14; --deep-1:#051F33; --bright:#3C91E6; --soft:#B4C2FF; --gold:#FEC458; --white:#fff;
  --border:rgba(180,194,255,0.16); font-family:inherit; margin-top:24px; }
.lf *, .lf *::before, .lf *::after { box-sizing:border-box; }
.lf .box { width:100%; text-align:left; cursor:pointer; border:1px dashed var(--bright); border-radius:16px;
  background:rgba(60,145,230,0.08); padding:18px; color:var(--white); display:flex; align-items:center; gap:14px;
  transition:transform .15s ease, border-color .15s ease; }
.lf .box:hover { transform:translateY(-2px); border-color:var(--gold); }
.lf .box .bico { font-size:24px; flex:none; }
.lf .box .btxt { flex:1; min-width:0; }
.lf .box .bt { display:block; font-weight:700; font-size:16px; line-height:1.25; }
.lf .box .bs { display:block; font-size:12.5px; color:var(--soft); margin-top:3px; }
.lf .box .bgo { font-weight:700; font-size:13px; color:var(--gold); flex:none; }
.lf .card { border:1px solid var(--border); border-radius:16px; background:var(--deep-1); padding:18px; }
.lf .bar { height:5px; border-radius:4px; background:rgba(180,194,255,0.14); overflow:hidden; margin-bottom:14px; }
.lf .bar span { display:block; height:100%; background:var(--bright); transition:width .25s ease; }
.lf .qn { font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--soft); }
.lf .qq { font-weight:700; font-size:19px; line-height:1.25; margin:6px 0 14px; color:var(--white); }
.lf .opts { display:flex; flex-direction:column; gap:9px; }
.lf .opt { text-align:left; width:100%; cursor:pointer; border:1px solid var(--border); border-radius:12px;
  background:var(--deep); color:var(--white); padding:13px 15px; font-size:14.5px; transition:border-color .12s ease, background .12s ease; }
.lf .opt:hover { border-color:var(--bright); background:rgba(60,145,230,0.1); }
.lf .back { margin-top:14px; background:none; border:none; color:var(--soft); font-size:13px; cursor:pointer; padding:0; }
.lf .field { width:100%; padding:13px 14px; border-radius:11px; border:1px solid var(--border);
  background:var(--deep); color:var(--white); font-size:14.5px; margin-top:9px; font-family:inherit; }
.lf .field::placeholder { color:rgba(180,194,255,0.5); }
.lf .sub { margin-top:14px; width:100%; padding:14px; border-radius:12px; border:none; background:var(--gold);
  color:var(--deep); font-weight:700; font-size:15px; cursor:pointer; }
.lf .sub:disabled { opacity:.6; cursor:default; }
.lf .lead { color:var(--soft); font-size:13.5px; line-height:1.5; margin:2px 0 4px; }
.lf .res .rk { font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--bright); }
.lf .res h3 { font-size:22px; font-weight:800; margin:6px 0 4px; color:var(--white); line-height:1.2; }
.lf .res .hrs { color:var(--gold); font-weight:700; font-size:15px; margin:10px 0 14px; }
.lf .res ul { list-style:none; padding:0; margin:0 0 16px; display:flex; flex-direction:column; gap:8px; }
.lf .res li { font-size:14px; color:var(--white); padding-left:22px; position:relative; line-height:1.4; }
.lf .res li::before { content:"→"; position:absolute; left:0; color:var(--bright); }
.lf .actions { display:flex; flex-direction:column; gap:9px; }
.lf .btn { text-align:center; text-decoration:none; padding:13px; border-radius:12px; font-weight:700; font-size:14px; cursor:pointer; border:none; }
.lf .btn.gold { background:var(--gold); color:var(--deep); }
.lf .btn.line { border:1px solid var(--border); color:var(--white); background:var(--deep-1); }
.lf .err { color:#ff8a8a; font-size:12.5px; margin-top:8px; }
`;

export default function LucaFinder() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, error: null });

  const total = QUESTIONS.length;
  const inQuestions = step < total;
  const isEmail = step === total;
  const isRes = step === total + 1;

  const pick = (qi, oi) => {
    setAnswers((a) => ({ ...a, [QUESTIONS[qi].id]: oi }));
    setTimeout(() => setStep((s) => s + 1), 160);
  };

  const roadmap = () => {
    const score = { sales: 0, admin: 0, marketing: 0 };
    let hours = 0;
    QUESTIONS.forEach((qq) => {
      const oi = answers[qq.id];
      if (oi == null) return;
      const opt = qq.options[oi];
      hours += opt.h || 0;
      Object.entries(opt.w || {}).forEach(([k, v]) => (score[k] += v));
    });
    const ranked = Object.entries(score).sort((a, b) => b[1] - a[1]).filter(([, v]) => v > 0).map(([k]) => k);
    const primary = ranked[0] || "sales";
    const secondary = ranked[1] && ranked[1] !== primary ? ranked[1] : null;
    const plays = [...PILLAR_PLAYS[primary].plays];
    if (secondary) plays[2] = PILLAR_PLAYS[secondary].plays[0];
    return { primary, secondary, plays: plays.slice(0, 3), hoursLow: Math.max(4, Math.round(hours * 0.8)), hoursHigh: Math.round(hours * 1.4) };
  };

  const sectorLabel = () => {
    const oi = answers[QUESTIONS[0].id];
    return oi != null ? QUESTIONS[0].options[oi].label : "";
  };

  // Stesso link del Finder del sito: rigenera online la roadmap personalizzata
  // (e' il valore del custom field contact.roadmap_url che GHL manda via email).
  const roadmapLink = (r) => {
    const params = new URLSearchParams({
      n: name || "",
      s: sectorLabel(),
      p: r.primary,
      x: r.secondary || "",
      lo: String(r.hoursLow),
      hi: String(r.hoursHigh),
      l: "it",
    });
    const origin = typeof window !== "undefined" ? window.location.origin : "https://automis.ai";
    return `${origin}/roadmap?${params.toString()}`;
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });
    const r = roadmap();

    let mod = null;
    try {
      mod = await import("@/components/home/roadmapPdf");
    } catch (err) {
      console.error("roadmapPdf import error", err);
    }

    // Tag identici al Finder del sito (sono questi a far scattare le automazioni
    // GHL), piu' un tag sorgente per l'attribuzione della landing di Luca.
    const tags = [
      "opportunity-finder-it",
      ...(mod ? [mod.variantTag(r.primary, r.secondary)] : []),
      "luca-ig",
    ];

    try {
      await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          type: "opportunity-finder",
          source: "luca-ig",
          locale: "it",
          answers: QUESTIONS.reduce((acc, qq) => {
            const oi = answers[qq.id];
            acc[qq.id] = oi != null ? qq.options[oi].label : null;
            return acc;
          }, {}),
          // Q&A ordinate: la route le scrive come nota sul contatto GHL.
          answers_detail: QUESTIONS.map((qq) => {
            const oi = answers[qq.id];
            return { q: qq.q, a: oi != null ? qq.options[oi].label : null };
          }),
          recommended_pillar: mod ? mod.pillarLabel(r.primary, "it") : PILLAR_PLAYS[r.primary].name,
          variant: mod ? mod.selectVariant(r.primary, r.secondary) : undefined,
          tags,
          roadmap_url: roadmapLink(r),
          estimated_hours_saved: hoursLabel(r.hoursLow, r.hoursHigh, "it"),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Finder capture error", err);
    }

    try {
      if (mod) {
        await mod.generateRoadmapPdf({
          name,
          sector: sectorLabel(),
          primary: r.primary,
          secondary: r.secondary,
          hoursLow: r.hoursLow,
          hoursHigh: r.hoursHigh,
          locale: "it",
        });
      }
    } catch (err) {
      console.error("PDF error", err);
    }

    setStatus({ loading: false, error: null });
    setStep(total + 1);
  };

  const r = isRes ? roadmap() : null;

  return (
    <div className="lf" id="finder">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {!open && (
        <button className="box" onClick={() => setOpen(true)} type="button">
          <span className="bico" aria-hidden="true">🎯</span>
          <span className="btxt">
            <span className="bt">Trova la tua opportunità IA</span>
            <span className="bs">6 domande, 2 minuti. Ricevi una roadmap AI personalizzata.</span>
          </span>
          <span className="bgo">Inizia →</span>
        </button>
      )}

      {open && (
        <div className="card">
          {inQuestions && (
            <div>
              <div className="bar"><span style={{ width: `${(step / total) * 100}%` }} /></div>
              <div className="qn">Domanda {step + 1} di {total}</div>
              <div className="qq">{QUESTIONS[step].q}</div>
              <div className="opts">
                {QUESTIONS[step].options.map((o, oi) => (
                  <button key={oi} className="opt" type="button" onClick={() => pick(step, oi)}>{o.label}</button>
                ))}
              </div>
              {step > 0 && <button className="back" type="button" onClick={() => setStep((s) => s - 1)}>← indietro</button>}
            </div>
          )}

          {isEmail && (
            <form onSubmit={submit}>
              <div className="qn">Ci siamo</div>
              <div className="qq">Dove ti mandiamo la tua roadmap?</div>
              <p className="lead">Ricevi subito la tua roadmap in PDF, con le 3 opportunità AI e le ore che potresti recuperare.</p>
              <input className="field" placeholder="Il tuo nome" value={name} onChange={(e) => setName(e.target.value)} required />
              <input className="field" type="email" placeholder="La tua email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button className="sub" type="submit" disabled={status.loading} style={{ color: "#000A14" }}>{status.loading ? "Un attimo..." : "Ricevi la mia roadmap"}</button>
              {status.error && <div className="err">{status.error}</div>}
              <button className="back" type="button" onClick={() => setStep((s) => s - 1)}>← indietro</button>
            </form>
          )}

          {isRes && r && (
            <div className="res">
              <div className="rk">La tua roadmap AI</div>
              <h3>Il tuo focus: {PILLAR_PLAYS[r.primary].name}{r.secondary ? `, con un occhio a ${PILLAR_PLAYS[r.secondary].name}` : ""}</h3>
              <div className="hrs">Potresti recuperare circa {r.hoursLow}-{r.hoursHigh} ore a settimana.</div>
              <ul>{r.plays.map((p, i) => <li key={i}>{p}</li>)}</ul>
              <div className="actions">
                <a className="btn gold" href={BOOKING} target="_blank" rel="noopener" style={{ color: "#000A14" }}>Prenota una call di 30 min</a>
              </div>
              <p className="lead" style={{ marginTop: 12 }}>La tua roadmap in PDF è stata scaricata. Se vuoi accelerare, prenota la call qui sopra.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
