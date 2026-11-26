"use client";

// Compact in-article version of a free tool. Used through a fenced code block
// with language `tool` in the markdown (see ArticleLayout). Unknown keys render
// nothing. Light card, matches the blog reading column.
import { useState } from "react";
import Link from "next/link";
import CopyButton from "@/components/tools/CopyButton";
import ToolSegmented from "@/components/tools/ToolSegmented";
import { TOOLS, toolPath } from "@/utility/toolsData";
import { PRESETS, SOURCES } from "@/components/tools/widgets/ReceptionistCostCalculator";
import { AWAY_SITUATIONS, REM_TIMINGS, REM_CHANNELS, buildAwayMessages, buildReminderMessages } from "@/utility/toolMessages";

const UI = {
  en: { open: "Open the full tool", copy: "Copy", copied: "Copied", tool: "Free tool" },
  it: { open: "Apri lo strumento completo", copy: "Copia", copied: "Copiato", tool: "Strumento gratuito" },
  pt: { open: "Abrir a ferramenta completa", copy: "Copiar", copied: "Copiado", tool: "Ferramenta gratuita" },
};
const MINI = {
  en: {
    cost: { coverage: ["Office hours", "24/7"], calls: "Calls per month", inhouse: "In-house", service: "Answering service", ai: "AI receptionist", year: "per year", staff: "full-time staff", src: "Default figures from public sources, November 2026. Change them in the full tool." },
    review: { label: "Your Google Place ID", ph: "e.g. ChIJ..." },
    away: { label: "Situation" },
    rem: { timing: "When", channel: "Channel" },
  },
  it: {
    cost: { coverage: ["Orario d'ufficio", "24 ore su 24"], calls: "Chiamate al mese", inhouse: "Interna", service: "Servizio di segreteria", ai: "Segretaria IA", year: "all'anno", staff: "persone a tempo pieno", src: "Cifre di partenza da fonti pubbliche, novembre 2026. Cambiale nello strumento completo." },
    review: { label: "Il tuo Place ID di Google", ph: "es. ChIJ..." },
    away: { label: "Situazione" },
    rem: { timing: "Quando", channel: "Canale" },
  },
  pt: {
    cost: { coverage: ["Horário de expediente", "24 horas por dia"], calls: "Chamadas por mês", inhouse: "Interna", service: "Serviço de atendimento", ai: "Rececionista IA", year: "por ano", staff: "pessoas a tempo inteiro", src: "Valores de partida de fontes públicas, novembro de 2026. Altere-os na ferramenta completa." },
    review: { label: "O seu Place ID do Google", ph: "ex. ChIJ..." },
    away: { label: "Situação" },
    rem: { timing: "Quando", channel: "Canal" },
  },
};

const input = "w-full rounded-lg border px-3 py-2 text-base";

function MiniCost({ locale, variant, m }) {
  const key = locale === "en" ? (variant === "gbp" ? "GBP" : variant === "eur" ? "EUR-en" : "USD") : `EUR-${locale}`;
  const p = PRESETS[key];
  const cur = key === "USD" ? "USD" : key === "GBP" ? "GBP" : "EUR";
  const nf = new Intl.NumberFormat(locale === "it" ? "it-IT" : locale === "pt" ? "pt-PT" : "en-IE", { style: "currency", currency: cur, maximumFractionDigits: 0 });
  const [all, setAll] = useState(false);
  const [calls, setCalls] = useState("300");
  const fte = all ? 168 / 40 : 1;
  const salary = parseFloat(p.salary) || 0;
  const house = salary ? fte * salary * (1 + (parseFloat(p.onCost) || 0) / 100) : null;
  const price = parseFloat(p.price) || 0;
  const service = price ? (parseFloat(calls) || 0) * price * 12 : null;
  const ai = parseFloat(p.ai) * 12;
  const rows = [[m.inhouse, house], [m.service, service], [m.ai, ai]].filter((r) => r[1] !== null);
  return (
    <>
      <div className="te-row">
        <div className="te-field">
          <span>{m.coverage.join(" / ")}</span>
          <ToolSegmented light value={all ? "all" : "office"} onChange={(v) => setAll(v === "all")} options={[["office", m.coverage[0]], ["all", m.coverage[1]]]} ariaLabel="coverage" />
        </div>
        {price ? (
          <label className="te-field">
            <span>{m.calls}</span>
            <input type="number" min="0" inputMode="numeric" value={calls} onChange={(e) => setCalls(e.target.value)} className={input} />
          </label>
        ) : null}
      </div>
      <div className="te-out">
        {rows.map(([l, v]) => (
          <div key={l}>
            <strong>{nf.format(Math.round(v))}</strong>
            <span>{l}, {m.year}</span>
            {l === m.inhouse && fte > 1 ? <small>{fte.toFixed(1)} {m.staff}</small> : null}
          </div>
        ))}
      </div>
      <p className="te-note">{m.src}</p>
    </>
  );
}

function MiniReview({ locale, m }) {
  const [id, setId] = useState("");
  const url = id.trim() ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(id.trim())}` : "";
  const u = UI[locale];
  return (
    <>
      <label className="te-field">
        <span>{m.label}</span>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder={m.ph} className={input} />
      </label>
      {url ? (
        <div className="te-msg">
          <p style={{ wordBreak: "break-all" }}>{url}</p>
          <CopyButton value={url} label={u.copy} copiedLabel={u.copied} className="te-copy" />
        </div>
      ) : null}
    </>
  );
}

function MiniAway({ locale, m }) {
  const [sit, setSit] = useState("missed");
  const u = UI[locale];
  const msg = buildAwayMessages({ locale, type: "generic", situation: sit, tone: "friendly" })[0];
  return (
    <>
      <div className="te-field">
        <span>{m.label}</span>
        <ToolSegmented light value={sit} onChange={setSit} options={Object.entries(AWAY_SITUATIONS[locale])} ariaLabel={m.label} />
      </div>
      <div className="te-msg">
        <p style={{ whiteSpace: "pre-line" }}>{msg}</p>
        <CopyButton value={msg} label={u.copy} copiedLabel={u.copied} className="te-copy" />
      </div>
    </>
  );
}

function MiniReminder({ locale, m }) {
  const [timing, setTiming] = useState("before");
  const [channel, setChannel] = useState("whatsapp");
  const u = UI[locale];
  const msg = buildReminderMessages({ locale, sector: "generic", channel, timing, confirm: "reply", when: "10:30" })[0];
  return (
    <>
      <div className="te-row">
        <div className="te-field">
          <span>{m.timing}</span>
          <ToolSegmented light value={timing} onChange={setTiming} options={Object.entries(REM_TIMINGS[locale])} ariaLabel={m.timing} />
        </div>
        <div className="te-field">
          <span>{m.channel}</span>
          <ToolSegmented light value={channel} onChange={setChannel} options={Object.entries(REM_CHANNELS[locale])} ariaLabel={m.channel} />
        </div>
      </div>
      <div className="te-msg">
        <p style={{ whiteSpace: "pre-line" }}>{msg}</p>
        <CopyButton value={msg} label={u.copy} copiedLabel={u.copied} className="te-copy" />
      </div>
    </>
  );
}

export default function ToolEmbed({ spec, locale = "en" }) {
  const [key, variant] = String(spec || "").trim().split(":");
  const tool = TOOLS[key];
  if (!tool) return null;
  const L = UI[locale] ? locale : "en";
  const u = UI[L];
  const m = MINI[L];
  let body = null;
  if (key === "receptionist-cost-calculator") body = <MiniCost locale={L} variant={variant} m={m.cost} />;
  else if (key === "google-review-link-generator") body = <MiniReview locale={L} m={m.review} />;
  else if (key === "missed-call-text-back-generator") body = <MiniAway locale={L} m={m.away} />;
  else if (key === "appointment-reminder-generator") body = <MiniReminder locale={L} m={m.rem} />;
  return (
    <aside className="blog-tool-embed" aria-label={tool[L].name}>
      <p className="te-kicker">{u.tool}</p>
      <p className="te-title">{tool[L].name}</p>
      {body}
      <Link href={toolPath(key, L)} className="te-open">
        {u.open} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
