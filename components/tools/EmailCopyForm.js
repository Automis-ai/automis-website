"use client";

// Optional soft capture used inside the calculator widgets. The result is
// already visible on the page; this just lets a motivated visitor get a copy
// and drops a tagged lead into GHL.
import { useState } from "react";

const COPY = {
  it: {
    title: "Vuoi una copia di questi numeri?",
    placeholder: "La tua email",
    button: "Inviami i risultati",
    sending: "Invio...",
    done: "Fatto. Te li inviamo a breve.",
    error: "Qualcosa e' andato storto. Riprova.",
    privacy: "Niente spam. La usiamo solo per inviarti i risultati e qualche consiglio utile.",
  },
  pt: {
    title: "Quer uma cópia destes números?",
    placeholder: "O seu email",
    button: "Enviem-me os resultados",
    sending: "A enviar...",
    done: "Recebido. Enviamos-lhe em breve.",
    error: "Algo correu mal. Tente novamente.",
    privacy: "Sem spam. Usamo-lo apenas para lhe enviar os resultados e algumas dicas úteis.",
  },
  en: {
    title: "Want a copy of these numbers?",
    placeholder: "Your email",
    button: "Email me the results",
    sending: "Sending...",
    done: "Got it. We will send it over shortly.",
    error: "Something went wrong. Please try again.",
    privacy: "No spam. We only use it to send your results and a few helpful tips.",
  },
};

export default function EmailCopyForm({ toolName, locale, summary }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  const t = COPY[locale] || COPY.en;

  async function onSubmit(e) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/tool-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, toolName, locale, resultSummary: summary || "" }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="mt-6 rounded-xl border border-blue-middle/40 bg-blue-middle/10 p-4 text-sm text-blue-lightest">{t.done}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 border-t border-white/10 pt-5">
      <label className="block text-sm font-medium text-white/80">{t.title}</label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-blue-middle"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-gradient-to-r from-blue-middle to-blue-lightest px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "loading" ? t.sending : t.button}
        </button>
      </div>
      {status === "error" && <p className="mt-2 text-sm text-red-300">{t.error}</p>}
      <p className="mt-2 text-xs text-white/40">{t.privacy}</p>
    </form>
  );
}
