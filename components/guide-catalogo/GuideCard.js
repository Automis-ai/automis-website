"use client";

import WaButton from "./WaButton";

export const DOOR = { ruolo: "Ruolo", settore: "Settore", strumento: "Strumento", servizio: "Marketing", mini: "Mini-guida" };

// Una riga di promessa: la prima parte prima dei due punti o del punto e virgola, accorciata a ~92 caratteri.
export function shortPromise(text, max = 92) {
  if (!text) return "";
  let t = text.trim();
  const cut = t.search(/[:;]/);
  if (cut >= 38) t = t.slice(0, cut);
  if (t.length > max) {
    t = t.slice(0, max);
    t = t.slice(0, t.lastIndexOf(" ")).replace(/[ ,;:]+$/, "");
    // non finire su una parolina («fra la…», «e un…»)
    while (/ (?:[a-zà-ù]{1,3}|fra|tra|con|per|che|dei|del|nel|una|uno)$/i.test(t)) t = t.slice(0, t.lastIndexOf(" ")).replace(/[ ,;:]+$/, "");
    t += "…";
  }
  return t.replace(/\.$/, "") + (t.endsWith("…") ? "" : ".");
}

// Scheda compatta: fascia colorata per porta col titolo, una riga di promessa, minuti di lettura, WhatsApp.
// La guida si riceve prima su WhatsApp; il lettore online si apre solo da lì.
export default function GuideCard({ g, source }) {
  return (
    <article className="card" id={`g-${g.code}`}>
      <header className={`band porta-${g.porta}`}>
        <span className="door">{DOOR[g.porta]}</span>
        {g.minuti ? <span className="pages">{g.minuti} min di lettura</span> : null}
        <h3>{g.titolo}</h3>
      </header>
      <div className="body">
        <p className="promise">{shortPromise(g.promessa)}</p>
        <div className="act">
          <WaButton guida={g} source={source} kind="vorrei" />
        </div>
      </div>
    </article>
  );
}
