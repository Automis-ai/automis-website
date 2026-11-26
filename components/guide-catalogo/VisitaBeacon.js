"use client";

import { useEffect } from "react";

// «Link aperto»: dice al sito che il link personale (?p=CODICE) è stato aperto da una persona vera.
// - Il codice arriva dalla prop `rif` (letta dal server in page.js): NON da location.search, perché lo script GTM del layout toglie ?p= dall'indirizzo.
// - Senza `rif` non parte niente.
// - Non conta bot e anteprime (non eseguono JS o restano in background): parte solo dopo 2,5 s con la pagina visibile, e mai in una pagina prerenderizzata.
// - Niente cookie, nessun dato salvato sul dispositivo del visitatore.
// - Autore: aprendo UNA volta /it/guide/cfo?io=1 su un proprio dispositivo si imposta localStorage.automis_autore e da lì il beacon salta
//   (?io=0 lo toglie). Serve solo a Luca; il visitatore non scrive mai nulla sul proprio dispositivo.
const ATTESA_MS = 2500;
const CHIAVE_AUTORE = "automis_autore";

function autore() {
  try {
    const io = new URLSearchParams(window.location.search).get("io");
    if (io === "1") window.localStorage.setItem(CHIAVE_AUTORE, "1");
    if (io === "0") window.localStorage.removeItem(CHIAVE_AUTORE);
    return window.localStorage.getItem(CHIAVE_AUTORE) === "1";
  } catch {
    return false;
  }
}

function invia(rif, guida) {
  const body = JSON.stringify({ rif, guida: guida || "" });
  try {
    if (navigator.sendBeacon?.("/api/guide-visita", new Blob([body], { type: "application/json" }))) return;
  } catch { /* si prova con fetch */ }
  fetch("/api/guide-visita", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
}

export default function VisitaBeacon({ rif = "", guida = "" }) {
  useEffect(() => {
    const flagAutore = autore(); // gestisce sempre ?io=, anche senza codice
    if (!rif || flagAutore) return undefined;
    let timer = null;
    let fatto = false;
    const prova = () => {
      if (fatto || timer || document.prerendering || document.visibilityState !== "visible") return;
      timer = setTimeout(() => {
        timer = null;
        if (fatto || document.visibilityState !== "visible") return; // ancora visibile dopo l'attesa
        fatto = true;
        invia(rif, guida);
      }, ATTESA_MS);
    };
    const cambia = () => {
      if (document.visibilityState !== "visible" && timer) { clearTimeout(timer); timer = null; }
      prova();
    };
    document.addEventListener("visibilitychange", cambia);
    document.addEventListener("prerenderingchange", prova);
    prova();
    return () => {
      fatto = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", cambia);
      document.removeEventListener("prerenderingchange", prova);
    };
  }, [rif, guida]);
  return null;
}
