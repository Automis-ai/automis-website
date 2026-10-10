"use client";
import { useEffect, useState } from "react";
import "./v2.css";
import { cx } from "./cx";
import Icon from "./icons";
import { sleep, useScriptedStart } from "./hooks";

/*
  Ricerca nel Company Brain a copione: si digita una domanda, poi appare la risposta con la sua fonte.
  Nessuna rete, nessun modello. Stesse regole di ScriptedChat (stato finale subito con reduced motion o
  senza JavaScript, altezza riservata, testo completo per gli screen reader).
  Props: query, answer, source { title, meta?, snippet? }, sourceLabel (es. «Fonte»), windowTitle (barra in alto),
  ariaLabel, replayLabel (opzionale), speed.
*/
export default function BrainSearchDemo({
  query = "",
  answer = "",
  source,
  sourceLabel,
  windowTitle,
  ariaLabel,
  replayLabel,
  speed = 1,
  className,
}) {
  const { ref, armed, visible, run, replay } = useScriptedStart();
  const FINAL = { q: query.length, thinking: false, a: answer.length, src: true };
  const [st, setSt] = useState(FINAL);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (armed) {
      setSt({ q: 0, thinking: false, a: 0, src: false });
      setDone(false);
    }
  }, [armed, run]);

  useEffect(() => {
    if (!armed || !visible) return;
    let cancelled = false;
    (async () => {
      setSt({ q: 0, thinking: false, a: 0, src: false });
      setDone(false);
      await sleep(500 / speed);
      for (let c = 1; c <= query.length; c++) {
        if (cancelled) return;
        setSt({ q: c, thinking: false, a: 0, src: false });
        await sleep(38 / speed);
      }
      await sleep(350 / speed);
      if (cancelled) return;
      setSt({ q: query.length, thinking: true, a: 0, src: false });
      await sleep(1100 / speed);
      for (let c = 3; c < answer.length + 3; c += 3) {
        if (cancelled) return;
        setSt({ q: query.length, thinking: false, a: Math.min(c, answer.length), src: false });
        await sleep(20 / speed);
      }
      await sleep(350 / speed);
      if (cancelled) return;
      setSt({ q: query.length, thinking: false, a: answer.length, src: true });
      setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [armed, visible, run, query, answer, speed]);

  const typingQuery = st.q < query.length;
  const answering = st.a > 0 && st.a < answer.length;

  const answerBlock = (text, showSource, withCaret) => (
    <div className="v2-answer">
      <p className="v2-answer__text">
        {text}
        {withCaret ? <span className="v2-caret" aria-hidden="true" /> : null}
      </p>
      {source ? (
        <div className="v2-src" style={showSource ? undefined : { visibility: "hidden", animation: "none" }}>
          <span className="v2-src__ico" aria-hidden="true">
            <Icon name="doc" size={18} />
          </span>
          <span>
            {sourceLabel ? <span className="v2-src__lab">{sourceLabel}</span> : null}
            <span className="v2-src__title">{source.title}</span>
            {source.meta ? <span className="v2-src__meta">{source.meta}</span> : null}
            {source.snippet ? <span className="v2-src__snip">{source.snippet}</span> : null}
          </span>
        </div>
      ) : null}
    </div>
  );

  return (
    <div ref={ref} className={cx("v2-win v2-win--wide", className)}>
      {windowTitle ? (
        <div className="v2-win__bar">
          <span className="v2-win__avatar" aria-hidden="true">
            <Icon name="brain" size={18} />
          </span>
          <span className="v2-win__name">{windowTitle}</span>
          {replayLabel && done && armed ? (
            <button type="button" className="v2-win__replay" onClick={replay}>
              <Icon name="repeat" size={16} />
              {replayLabel}
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="v2-ask" aria-hidden="true">
        <Icon name="search" size={20} />
        <div className="v2-ask__box">
          <p className="v2-ask__q v2-stage__ghost">{query}</p>
          <p className="v2-ask__q">
            {query.slice(0, st.q)}
            {typingQuery || st.q === 0 ? <span className="v2-caret" /> : null}
          </p>
        </div>
      </div>
      <div className="v2-stage" aria-hidden="true">
        <div className="v2-stage__ghost">{answerBlock(answer, true, false)}</div>
        <div>
          {st.thinking ? (
            <div className="v2-think">
              <i />
              <i />
              <i />
            </div>
          ) : st.a > 0 ? (
            answerBlock(answer.slice(0, st.a), st.src, answering)
          ) : null}
        </div>
      </div>
      <div className="v2-sr" aria-label={ariaLabel} role="group">
        <p>{query}</p>
        <p>{answer}</p>
        {source ? (
          <p>
            {sourceLabel ? `${sourceLabel}: ` : ""}
            {source.title}
            {source.meta ? `, ${source.meta}` : ""}
          </p>
        ) : null}
      </div>
    </div>
  );
}
