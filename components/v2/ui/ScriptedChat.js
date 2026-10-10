"use client";
import { useEffect, useState } from "react";
import "./v2.css";
import { cx } from "./cx";
import Icon from "./icons";
import { sleep, useScriptedStart } from "./hooks";

/*
  Chat a copione: i messaggi si scrivono da soli quando la chat entra nello schermo.
  Nessuna rete, nessun modello: il copione è quello che passi in `script`.
  - Senza JavaScript e con prefers-reduced-motion si vede subito la conversazione finita.
  - L'altezza è sempre quella finale (un livello invisibile la riserva): la pagina non salta.
  - Lo screen reader legge la conversazione intera da un elenco nascosto, non le lettere che compaiono.
  Props: script [{ from: "user" | "agent", text }], name (titolo della finestra), status (riga sotto il nome),
  ariaLabel (nome della conversazione per gli screen reader), replayLabel (se c'è, compare il bottone «rivedi»),
  speed (1 = normale, 2 = doppia velocità), preload (quanti messaggi sono già scritti all'inizio, così il riquadro
  non parte vuoto; default 0). «Rivedi» sta in fondo al riquadro, non nell'intestazione: il titolo non va a capo.
*/
export default function ScriptedChat({ script = [], name, status, ariaLabel, replayLabel, speed = 1, preload = 0, className }) {
  const start = Math.min(Math.max(preload, 0), script.length);
  const total = script.length;
  const { ref, armed, visible, run, replay } = useScriptedStart();
  // stato iniziale = finale (server, no-JS, reduced motion)
  const [st, setSt] = useState({ shown: total, cur: null });
  const [done, setDone] = useState(true);

  // Appena il componente è "armato" riparte da zero.
  useEffect(() => {
    if (armed) {
      setSt({ shown: start, cur: null });
      setDone(false);
    }
  }, [armed, run, start]);

  useEffect(() => {
    if (!armed || !visible) return;
    let cancelled = false;
    (async () => {
      setSt({ shown: start, cur: null });
      setDone(false);
      for (let i = start; i < total; i++) {
        const m = script[i];
        const agent = m.from === "agent";
        await sleep((i === start ? 350 : 650) / speed);
        if (cancelled) return;
        if (agent) {
          setSt({ shown: i, cur: { i, chars: 0 } });
          await sleep(850 / speed);
          if (cancelled) return;
        }
        const step = agent ? 3 : 2;
        const tick = (agent ? 22 : 34) / speed;
        for (let c = step; c < m.text.length + step; c += step) {
          setSt({ shown: i, cur: { i, chars: Math.min(c, m.text.length) } });
          await sleep(tick);
          if (cancelled) return;
        }
        setSt({ shown: i + 1, cur: null });
      }
      if (!cancelled) setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [armed, visible, run, total, script, speed, start]);

  const bubble = (m, text, key, typing) => (
    <div key={key} className={cx("v2-msg", m.from === "agent" ? "v2-msg--agent" : "v2-msg--user")}>
      <p className="v2-bubble">
        {text}
        {typing ? <span className="v2-caret" aria-hidden="true" /> : null}
      </p>
    </div>
  );

  const live = [];
  for (let i = 0; i < Math.min(st.shown, total); i++) live.push(bubble(script[i], script[i].text, i, false));
  if (st.cur) {
    const m = script[st.cur.i];
    if (st.cur.chars === 0) {
      live.push(
        <div key={`d${st.cur.i}`} className="v2-msg v2-msg--agent">
          <p className="v2-bubble">
            <span className="v2-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </p>
        </div>
      );
    } else {
      live.push(bubble(m, m.text.slice(0, st.cur.chars), `t${st.cur.i}`, true));
    }
  }

  return (
    <div ref={ref} className={cx("v2-win", className)}>
      {name ? (
        <div className="v2-win__bar">
          <span className="v2-win__avatar" aria-hidden="true">
            <Icon name="chat" size={18} />
          </span>
          <div>
            <span className="v2-win__name">{name}</span>
            {status ? <span className="v2-win__status">{status}</span> : null}
          </div>
        </div>
      ) : null}
      <div className="v2-stage">
        <div className="v2-thread v2-stage__ghost" aria-hidden="true">
          {script.map((m, i) => bubble(m, m.text, i, false))}
        </div>
        <div className="v2-thread" aria-hidden="true">
          {live}
        </div>
      </div>
      {replayLabel ? (
        <div className="v2-win__foot">
          {done && armed ? (
            <button type="button" className="v2-win__replay" onClick={replay}>
              <Icon name="repeat" size={16} />
              {replayLabel}
            </button>
          ) : null}
        </div>
      ) : null}
      <ul className="v2-sr" aria-label={ariaLabel}>
        {script.map((m, i) => (
          <li key={i}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}
