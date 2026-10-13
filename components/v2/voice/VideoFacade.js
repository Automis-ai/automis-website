"use client";
import { useState } from "react";
import FxTile from "@/components/v2/wow/fx/FxTile";

/*
  Il video «come funziona» a richiesta. Non carica niente da YouTube finché non lo si avvia (nessun iframe, nessuna miniatura esterna,
  nessun cookie di terzi prima del clic): una scheda di vetro con il modulo «play». Al clic compare il lettore (youtube-nocookie),
  già in riproduzione. Il testo e il pulsante sono nel HTML del server.
*/
export default function VideoFacade({ videoId, title, playLabel }) {
  const [on, setOn] = useState(false);
  return (
    <div className="v2-card v2vo-video" data-fx={on ? undefined : "tilt"}>
      <div className={`v2vo-video__frame${on ? " v2vo-video__frame--on" : ""}`}>
        {on ? (
          <iframe
            className="v2vo-video__iframe"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="v2vo-video__play" onClick={() => setOn(true)} aria-label={`${playLabel}: ${title}`}>
            <FxTile glyph="play" size="md" />
            <span className="v2vo-video__txt">
              <span className="v2vo-video__cta">{playLabel}</span>
              <span className="v2vo-video__title">{title}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
