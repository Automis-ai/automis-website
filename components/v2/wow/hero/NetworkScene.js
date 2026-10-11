"use client";
import { useEffect, useRef } from "react";

/*
  Guscio React della scena 3D. Non importa three: il motore (scene/engine.js, con three) arriva con
  import() dentro l'effetto, quindi solo lato client e solo dopo il primo paint.
  Se qualcosa va storto (niente WebGL, contesto perso, chunk non scaricato, dispositivo troppo lento) chiama onFail e resta lo still.
  `runway`: l'avanzamento dello scorrimento nella pista della hero (runway.js), letto dal motore a ogni fotogramma.
*/
export default function NetworkScene({ mobile, lang, runwayRef, onFail }) {
  const ref = useRef(null);

  useEffect(() => {
    let disposed = false;
    let engine = null;
    (async () => {
      try {
        const { createHeroScene } = await import("./scene/engine");
        if (disposed || !ref.current) return;
        const e = await createHeroScene(ref.current, {
          mobile,
          lang,
          runway: runwayRef ? runwayRef.current : null,
          onLost: () => {
            if (!disposed && onFail) onFail();
          },
          onSlow: () => {
            if (!disposed && onFail) onFail();
          },
        });
        if (disposed) {
          e.dispose();
          return;
        }
        engine = e;
      } catch (err) {
        if (!disposed && onFail) onFail(err);
      }
    })();
    return () => {
      disposed = true;
      if (engine) engine.dispose();
    };
    // la scena si ricrea solo se cambia il profilo (telefono / desktop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

  return <div ref={ref} className="wow-hero-canvas" aria-hidden="true" />;
}
