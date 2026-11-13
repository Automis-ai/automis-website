"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { pushEvent } from "@/lib/analytics";
import { normalizePhone } from "@/lib/guidePhone";
import WaButton from "@/components/guide-catalogo/WaButton";

const ERR = {
  invalid: "Controlla il numero: non sembra valido.",
  many: "Hai provato troppe volte. Riprova tra qualche minuto, o chiedila su WhatsApp.",
  fail: "Non riesco a controllare adesso. Riprova tra un minuto, o chiedila su WhatsApp.",
};

// Chiede il numero (prefisso +39 di default) -> /api/guide-leggi-accesso. Se il numero ha ricevuto la guida
// il server mette il cookie e la pagina si ricarica già col lettore. Il numero non va mai nell'analytics.
export default function LeggiAccesso({ guida }) {
  const uid = useId();
  const router = useRouter();
  const [state, setState] = useState({ busy: false, error: "", notFound: false });

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const cc = String(f.get("cc") || "+39").replace(/\D/g, "") || "39";
    const phone = normalizePhone(String(f.get("phone") || ""), cc);
    if (!phone) {
      setState({ busy: false, error: ERR.invalid, notFound: false });
      return;
    }
    setState({ busy: true, error: "", notFound: false });
    try {
      const res = await fetch("/api/guide-leggi-accesso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, slug: guida.slug, company: f.get("company") }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.found) {
        pushEvent("guide_read_open", { guide_code: guida.code, guide_result: "found" });
        router.refresh();
        return;
      }
      if (res.ok) {
        pushEvent("guide_read_open", { guide_code: guida.code, guide_result: "not_found" });
        setState({ busy: false, error: "", notFound: true });
        return;
      }
      setState({ busy: false, error: res.status === 400 ? ERR.invalid : res.status === 429 ? ERR.many : ERR.fail, notFound: false });
    } catch {
      setState({ busy: false, error: ERR.fail, notFound: false });
    }
  }

  const { busy, error, notFound } = state;
  return (
    <>
    <form className="gate" onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-h`}>
      <h2 id={`${uid}-h`}>Conferma il tuo numero</h2>
      <p>Scrivi il numero con cui hai chiesto la guida su WhatsApp. Se te l&apos;ho mandata, la leggi qui.</p>
      <label htmlFor={`${uid}-p`}>Il tuo numero di telefono</label>
      <div className="phone-row">
        <input name="cc" defaultValue="+39" inputMode="tel" autoComplete="tel-country-code" aria-label="Prefisso" maxLength={5} />
        <input id={`${uid}-p`} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="333 123 4567" maxLength={20} required />
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="trap" />
      <button type="submit" className="btn gold" disabled={busy}>{busy ? "Controllo…" : "Apri la guida"}</button>
      <div aria-live="polite">
        {error ? <p className="err" role="alert">{error}</p> : null}
        {notFound ? (
          <div className="res">
            <p>Non la trovo per questo numero. Chiedila su WhatsApp qui sotto: ti arriva il link in chat.</p>
          </div>
        ) : null}
      </div>
      <p className="priv">
        Uso il numero solo per cercare la tua richiesta. <a href="/it/privacy-policy">Informativa sulla privacy</a>.
      </p>
    </form>
    <div className="gate ask">
      <h2>Non l&apos;hai ancora ricevuta?</h2>
      <p>Chiedila su WhatsApp: ti arriva il link in chat e da lì la leggi.</p>
      <WaButton guida={guida} label="Chiedila su WhatsApp" />
    </div>
    </>
  );
}
