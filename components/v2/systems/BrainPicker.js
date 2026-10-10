"use client";
import { useState } from "react";
import "@/components/v2/ui/v2.css";
import "./systems.css";
import BrainSearchDemo from "@/components/v2/ui/BrainSearchDemo";

/*
  Ricerca nel Company Brain a copione, con tre domande d'esempio da toccare.
  Nessuna rete e nessun modello: risposta e fonte sono quelle scritte nel copy.
  Props (solo dati): queries [{ q, a, sources: [{ doc, where }] }], windowTitle, sourceLabel, ariaLabel,
  replayLabel, groupLabel (nome del gruppo di domande per gli screen reader).
*/
export default function BrainPicker({ queries = [], windowTitle, sourceLabel, ariaLabel, replayLabel, groupLabel }) {
  const [sel, setSel] = useState(0);
  const cur = queries[sel] || queries[0];
  if (!cur) return null;
  const src = cur.sources && cur.sources[0];
  return (
    <div className="v2sx-brain">
      <div role="group" aria-label={groupLabel} className="v2sx-chips">
        {queries.map((item, i) => (
          <button
            key={item.q}
            type="button"
            className="v2sx-chip"
            aria-pressed={i === sel}
            onClick={() => setSel(i)}
          >
            {item.q}
          </button>
        ))}
      </div>
      <BrainSearchDemo
        key={sel}
        windowTitle={windowTitle}
        query={cur.q}
        answer={cur.a}
        source={src ? { title: src.doc, meta: src.where } : undefined}
        sourceLabel={sourceLabel}
        ariaLabel={ariaLabel}
        replayLabel={replayLabel}
      />
    </div>
  );
}
