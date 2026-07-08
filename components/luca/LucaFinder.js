"use client";

// Finder IT autonomo per la landing /luca-ig (prova embedded).
// Riusa l'endpoint /api/audit (cattura -> GHL, source "luca-ig") e il generatore
// PDF esistente. NON tocca il Finder inline della home IT (app/it/page.js).
// Se la prova convince, si consolida con Arcangelo in un componente condiviso.

import { useState } from "react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/luca-automis";

const QUESTIONS = [
  {
    id: "sector",
    q: "Che tipo di attività hai?",
    options: [
      { label: "Sanità / studio medico o clinica", w: { sales: 2, admin: 2 }, h: 6 },
      { label: "Servizi professionali / finanziari", w: { sales: 2, admin: 3 }, h: 7 },
      { label: "Immobiliare", w: { sales: 3, marketing: 1 }, h: 5 },
      { label: "Attività locale / servizi", w: { sales: 2, marketing: 1 }, h: 4 },
    ],
  },
  {
    id: "leak",
    q: "Dove perdi più tempo o denaro?",
    options: [
      { label: "Chiamate perse e senza risposta", w: { sales: 3 }, h: 6 },
      { label: "Follow-up lento sui lead", w: { sales: 2, marketing: 1 }, h: 5 },
      { label: "Burocrazia e lavoro manuale", w: { admin: 3 }, h: 8 },
      { label: "Marketing che non converte", w: { marketing: 3 }, h: 4 },
      { label: "Informazioni aziendali sparse", w: { admin: 3 }, h: 6 },
    ],
  },
  {
    id: "channel",
    q: "Come ti contattano di solito i clienti?",
    options: [
      { label: "Telefonate", w: { sales: 3 }, h: 5 },
      { label: "Form sul sito", w: { sales: 1, marketing: 2 }, h: 3 },
      { label: "Social e WhatsApp", w: { sales: 2, marketing: 1 }, h: 4 },
      { label: "Un po' di tutto", w: { sales: 2, marketing: 1, admin: 1 }, h: 5 },
    ],
  },
  {
    id: "volume",
    q: "Quanti contatti o richieste ricevi a settimana?",
    options: [
      { label: "Meno di 20", w: {}, h: 2 },
      { label: "Da 20 a 100", w: {}, h: 4 },
      { label: "Da 100 a 500", w: {}, h: 7 },
      { label: "Più di 500", w: {}, h: 10 },
    ],
  },
  {
    id: "tried",
    q: "Cosa hai già provato?",
    options: [
      { label: "Ancora niente", w: {}, h: 3 },
      { label: "Assunto più persone", w: { admin: 1 }, h: 4 },
      { label: "Strumenti base / un chatbot", w: { sales: 1 }, h: 2 },
      { label: "Lavorato con un'agenzia", w: { marketing: 1 }, h: 2 },
    ],
  },
  {
    id: "goal",
    q: "Qual è il tuo obiettivo n.1 per i prossimi 90 giorni?",
    options: [
      { label: "Più appuntamenti fissati", w: { sales: 3 }, h: 6 },
      { label: "Rispondere più in fretta ai lead", w: { sales: 2, marketing: 1 }, h: 5 },
      { label: "Liberare tempo al team", w: { admin: 3 }, h: 7 },
      { label: "Migliore ROI dal marketing", w: { marketing: 3 }, h: 4 },
      { label: "Organizzare le informazioni aziendali", w: { admin: 3 }, h: 5 },
    ],
  },
];

const PILLAR_PLAYS = {
  sales: {
    name: "Vendite & Acquisizione",
    plays: [
      "Centralino AI 24/7 che risponde e qualifica ogni chiamata",
      "Recupero chiamate perse con follow-up SMS immediato",
      "Automazioni social e WhatsApp collegate al CRM",
    ],
  },
  admin: {
    name: "Admin & Company Brain",
    plays: [
      "Un Company Brain (RAG) che cerca nei tuoi documenti",
      "Scan-to-Brain: digitalizza i documenti con OCR",
      "Note vocali trascritte e salvate in automatico nel CRM",
    ],
  },
  marketing: {
    name: "Marketing & Crescita",
    plays: [
      "Agente AI per ads e creatività su Meta e Google",
      "Visibilità SEO / GEO su Google e nelle ricerche AI",
      "Contenuti e reputazione gestiti in automatico",
    ],
  },
};

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
.lf .box .bt { font-weight:700; font-size:16px; line-height:1.25; }
.lf .box .bs { font-size:12.5px; color:var(--soft); margin-top:3px; }
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

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });
    const r = roadmap();
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
          recommended_pillar: PILLAR_PLAYS[r.primary].name,
          estimated_hours_saved: `${r.hoursLow}-${r.hoursHigh}/settimana`,
        }),
      });
    } catch (err) {
      console.error("Finder capture error", err);
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
              <p className="lead">Vedi subito la tua roadmap con le 3 opportunità AI e le ore che potresti recuperare.</p>
              <input className="field" placeholder="Il tuo nome" value={name} onChange={(e) => setName(e.target.value)} required />
              <input className="field" type="email" placeholder="La tua email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button className="sub" type="submit" disabled={status.loading}>{status.loading ? "Un attimo..." : "Ricevi la mia roadmap"}</button>
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
                <a className="btn gold" href={BOOKING} target="_blank" rel="noopener">Prenota una call di 30 min</a>
              </div>
              <p className="lead" style={{ marginTop: 12 }}>Ti ricontattiamo con la roadmap completa. Se vuoi accelerare, prenota la call qui sopra.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
