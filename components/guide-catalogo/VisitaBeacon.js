"use client";

import { useEffect } from "react";
import { CONSENT_CHANGED_EVENT, isInternalTraffic, readConsent } from "@/lib/consent";
import { deveInviare } from "@/lib/guideVisita";

// «Link aperto»: dice al sito che il link personale (?p=CODICE) è stato aperto da una persona vera.
// - Parte SOLO se il visitatore ha accettato le statistiche (cookie automis_consent) e non è traffico interno (?internal=1).
//   Il flag interno (localStorage) si legge solo dopo aver verificato il consenso. Se rifiuta, non parte mai.
// - Il consenso può arrivare a pagina aperta: si ascolta CONSENT_CHANGED_EVENT (emesso da applyConsent) e si invia una sola volta.
// - Il codice arriva dalla prop `rif` (letta dal server in page.js): NON da location.search, perché lo script GTM del layout toglie ?p= dall'indirizzo.
// - Senza `rif` non parte niente.
// - Non conta bot e anteprime (non eseguono JS o restano in background): parte solo dopo 2,5 s con la pagina visibile, e mai in una pagina prerenderizzata.
// - Niente cookie scritti, nessun dato salvato sul dispositivo del visitatore.
const ATTESA_MS = 2500;

function invia(rif, guida) {
  const body = JSON.stringify({ rif, guida: guida || "" });
  try {
    if (navigator.sendBeacon?.("/api/guide-visita", new Blob([body], { type: "application/json" }))) return;
  } catch { /* si prova con fetch */ }
  fetch("/api/guide-visita", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
}

function puoInviare(rif) {
  const consenso = readConsent()?.categories?.statistics === true;
  return deveInviare({
    rif,
    consenso,
    interno: () => isInternalTraffic(), // letto solo se il consenso c'è
    prerendering: !!document.prerendering,
    visibile: document.visibilityState === "visible",
  });
}

export default function VisitaBeacon({ rif = "", guida = "" }) {
  useEffect(() => {
    if (!rif) return undefined;
    let timer = null;
    let fatto = false;
    const ferma = () => { if (timer) { clearTimeout(timer); timer = null; } };
    const prova = () => {
      if (fatto || timer || !puoInviare(rif)) return;
      timer = setTimeout(() => {
        timer = null;
        if (fatto || !puoInviare(rif)) return; // consenso, interno e visibilità ricontrollati dopo l'attesa
        fatto = true;
        invia(rif, guida);
      }, ATTESA_MS);
    };
    const rivaluta = () => { if (!puoInviare(rif)) ferma(); prova(); };
    document.addEventListener("visibilitychange", rivaluta);
    document.addEventListener("prerenderingchange", prova);
    window.addEventListener(CONSENT_CHANGED_EVENT, rivaluta);
    prova();
    return () => {
      fatto = true;
      ferma();
      document.removeEventListener("visibilitychange", rivaluta);
      document.removeEventListener("prerenderingchange", prova);
      window.removeEventListener(CONSENT_CHANGED_EVENT, rivaluta);
    };
  }, [rif, guida]);
  return null;
}
