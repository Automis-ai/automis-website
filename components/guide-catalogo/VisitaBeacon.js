"use client";

import { useEffect, useState } from "react";
import { isInternalTraffic } from "@/lib/consent";
import { CONSENSO_VERSIONE, COOKIE_SCELTA, SCELTA_GIORNI, deveInviare, leggiScelta, valoreScelta } from "@/lib/guideVisita";

// «Link aperto»: sulle pagine guida con ?p=CODICE (prop `rif` valida, letta dal server in page.js) chiede un CONSENSO DEDICATO, con un riquadro proprio.
// Non usa la categoria «Statistici» del banner cookie e non tocca CONSENT_VERSION.
// - Il beacon parte SOLO dopo «Sì, va bene», una volta sola, e mai se è traffico interno (?internal=1 o flag automis_internal): per loro il riquadro non compare.
// - «No, grazie» o nessuna scelta: non si registra niente. La scelta si ricorda in un cookie tecnico (automis_link_aperto) con versione del testo, data e codice: è la prova del consenso.
// - Dopo il «sì» resta una riga con «Ritira il consenso»: cancella la riga del codice (route /api/guide-revoca) e ricorda il «no».
// - Il codice arriva dalla prop `rif`: NON da location.search, perché lo script GTM del layout toglie ?p= dall'indirizzo.
// - Senza `rif` non compare niente e non parte niente.
const EMAIL = "support@automis.ai";
const INFORMATIVA = "/it/privacy-policy#link-personali";

function scriviScelta(scelta, rif) {
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE_SCELTA}=${valoreScelta(scelta, rif)}; Max-Age=${SCELTA_GIORNI * 86400}; Path=/; SameSite=Lax${secure}`;
  } catch { /* senza cookie la scelta non si ricorda: si richiede alla prossima visita */ }
}

function invia(rif, guida) {
  const body = JSON.stringify({ rif, guida: guida || "", consenso_v: CONSENSO_VERSIONE });
  try {
    if (navigator.sendBeacon?.("/api/guide-visita", new Blob([body], { type: "application/json" }))) return;
  } catch { /* si prova con fetch */ }
  fetch("/api/guide-visita", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
}

function interno() {
  try { if (new URLSearchParams(location.search).get("internal") === "1") return true; } catch { /* continua */ }
  return isInternalTraffic();
}

export default function VisitaBeacon({ rif = "", guida = "" }) {
  // nascosto (server e primo render) | chiedi | si | ritirato | errore
  const [stato, setStato] = useState("nascosto");
  const [occupato, setOccupato] = useState(false);

  useEffect(() => {
    if (!rif || interno()) return;
    const scelta = leggiScelta(document.cookie, rif);
    setStato(scelta === "si" ? "si" : scelta === "no" ? "nascosto" : "chiedi");
  }, [rif]);

  const accetta = () => {
    scriviScelta("si", rif);
    setStato("si");
    if (deveInviare({ rif, consenso: true, interno })) invia(rif, guida);
  };
  const rifiuta = () => { scriviScelta("no", rif); setStato("nascosto"); };
  const ritira = async () => {
    if (occupato) return;
    setOccupato(true);
    scriviScelta("no", rif); // da subito: da qui in poi non parte più niente
    try {
      const r = await fetch("/api/guide-revoca", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rif }) });
      setStato(r.ok ? "ritirato" : "errore");
    } catch { setStato("errore"); }
    setOccupato(false);
  };

  if (stato === "nascosto") return null;
  return (
    <div className="wrap">
      {stato === "chiedi" && (
        <aside className="la" aria-labelledby="la-t" data-la="chiedi">
          <h2 id="la-t">Questo link è personale</h2>
          <p>Te l'ha mandato Luca. Possiamo fargli sapere che l'hai aperto? Così, se ci scrivi, sa già di quale guida si parla. Non ti mandiamo promemoria. Salviamo il codice del link, la guida e la data, per 90 giorni.</p>
          <div className="la-b">
            <button type="button" className="btn la-btn" onClick={accetta}>Sì, va bene</button>
            <button type="button" className="btn la-btn" onClick={rifiuta}>No, grazie</button>
          </div>
          <a className="la-i" href={INFORMATIVA}>Informativa</a>
        </aside>
      )}
      {stato === "si" && (
        <aside className="la la-s" role="status" data-la="si">
          <p>Luca sa che hai aperto il link.</p>
          <button type="button" className="la-r" onClick={ritira} disabled={occupato}>Ritira il consenso</button>
        </aside>
      )}
      {stato === "ritirato" && (
        <aside className="la la-s" role="status" data-la="ritirato">
          <p>Ritirato. Abbiamo cancellato l'apertura del link.</p>
        </aside>
      )}
      {stato === "errore" && (
        <aside className="la la-s" role="status" data-la="errore">
          <p>Non siamo riusciti a cancellarla da qui. Scrivi a <a href={`mailto:${EMAIL}`}>{EMAIL}</a> con il codice {rif}.</p>
        </aside>
      )}
    </div>
  );
}
