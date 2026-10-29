"use client";

import { useState } from "react";

const COPY = {
  it: {
    title: "Apri la guida",
    lead: "Lascia la tua email: ti mandiamo il link per aprire la guida, con il PDF da scaricare.",
    email: "La tua email",
    news: "Voglio ricevere ogni tanto una mail con nuove guide di Luca. Mi disiscrivo quando voglio.",
    info: "Usiamo la tua email per mandarti il link di accesso, che vale 30 minuti. Se spunti la casella, cliccando il link confermi anche questo.",
    privacy: "Informativa sulla privacy",
    privacyHref: "/it/privacy-policy",
    button: "Mandami il link",
    busy: "Un attimo…",
    sentTitle: "Controlla la tua email",
    sentText: "Ti abbiamo mandato il link per aprire la guida. Vale 30 minuti. Se non lo vedi, guarda tra lo spam.",
    other: "Usa un'altra email",
    expired: "Il link era scaduto o non valido: richiedine uno nuovo qui sotto.",
    soon: "Hai già chiesto il link da poco: aspetta un minuto e riprova.",
    invalid: "Controlla l'email: non sembra valida.",
    failed: "Non sono riuscito a salvare l'email. Riprova tra un minuto.",
  },
  en: {
    title: "Open the guide",
    lead: "Leave your email and we'll send you the link to open the guide, with the PDF to download.",
    email: "Your email",
    news: "I'd like to get an occasional email with new guides from Arcangelo. I can unsubscribe anytime.",
    info: "We use your email to send you the access link, which is valid for 30 minutes. If you tick the box, clicking the link also confirms that.",
    privacy: "Privacy policy",
    privacyHref: "/privacy-policy",
    button: "Send me the link",
    busy: "One moment…",
    sentTitle: "Check your email",
    sentText: "We've sent you the link to open the guide. It's valid for 30 minutes. If you can't see it, check your spam folder.",
    other: "Use another email",
    expired: "That link had expired or wasn't valid: request a new one below.",
    soon: "You asked for the link a moment ago: wait a minute and try again.",
    invalid: "Check the email: it doesn't look valid.",
    failed: "I couldn't save your email. Please try again in a minute.",
  },
};

export default function SignupForm({ lang, expired = false }) {
  const t = COPY[lang];
  const [state, setState] = useState({ busy: false, error: "", sent: false });

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState({ busy: true, error: "", sent: false });
    try {
      const res = await fetch("/api/guide-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          email: f.get("email"),
          newsletter: f.get("newsletter") === "on",
          company: f.get("company"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.sent) {
        setState({ busy: false, error: "", sent: true });
        return;
      }
      setState({ busy: false, sent: false, error: res.status === 400 ? t.invalid : res.status === 429 ? t.soon : t.failed });
    } catch {
      setState({ busy: false, sent: false, error: t.failed });
    }
  }

  if (state.sent) {
    return (
      <div className="signup" id="form" role="status">
        <h2>{t.sentTitle}</h2>
        <p>{t.sentText}</p>
        <button type="button" onClick={() => setState({ busy: false, error: "", sent: false })}>{t.other}</button>
      </div>
    );
  }

  return (
    <form className="signup" id="form" onSubmit={onSubmit} noValidate>
      <h2>{t.title}</h2>
      {expired ? <p className="err" role="alert">{t.expired}</p> : null}
      <p>{t.lead}</p>
      <input type="email" name="email" required autoComplete="email" inputMode="email" placeholder={t.email} aria-label={t.email} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="trap" />
      <label className="check">
        <input type="checkbox" name="newsletter" />
        <span>{t.news}</span>
      </label>
      <button type="submit" disabled={state.busy}>{state.busy ? t.busy : t.button}</button>
      {state.error ? <p className="err" role="alert">{state.error}</p> : null}
      <small>{t.info} <a href={t.privacyHref}>{t.privacy}</a>.</small>
    </form>
  );
}
