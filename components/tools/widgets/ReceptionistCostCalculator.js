"use client";

import { useMemo, useState } from "react";
import ToolField from "@/components/tools/ToolField";
import ToolSegmented from "@/components/tools/ToolSegmented";
import EmailCopyForm from "@/components/tools/EmailCopyForm";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-middle";
const NF_LOCALE = { it: "it-IT", pt: "pt-PT", en: "en-IE" };
// Hours a covered week needs, and the hours one full-time person works.
const COVER_HOURS = { office: 40, after: 128, all: 168 };
const FTE_HOURS = 40;

// Every default below comes from a public page opened on 26 Nov 2026.
// Fields with no public source stay empty on purpose.
const PRESETS = {
  USD: { salary: "38010", onCost: "", price: "10", model: "call", ai: "326" },
  GBP: { salary: "25865", onCost: "", price: "", model: "call", ai: "249" },
  "EUR-en": { salary: "", onCost: "", price: "", model: "call", ai: "297" },
  "EUR-it": { salary: "25434", onCost: "", price: "", model: "call", ai: "297" },
  "EUR-pt": { salary: "12880", onCost: "23.75", price: "", model: "call", ai: "297" },
};

const L = (label, href) => ({ label, href });
const SOURCES = {
  USD: {
    en: [
      L("BLS, receptionists, median pay $38,010 (May 2025)", "https://www.bls.gov/ooh/office-and-administrative-support/receptionists.htm"),
      L("Smith.ai pricing, Starter $300 for 30 calls = $10 a call", "https://smith.ai/pricing"),
      L("Automis EUR 297 at the ECB rate of 26 Nov 2026 (1.0975 USD per EUR)", "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"),
    ],
  },
  GBP: {
    en: [
      L("ONS ASHE 2026 via salarytax.uk, receptionist median £25,865 (provisional)", "https://salarytax.uk/professions/receptionist"),
      L("Automis EUR 297 at the ECB rate of 26 Nov 2026 (0.83755 GBP per EUR)", "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"),
    ],
  },
  "EUR-en": { en: [L("Automis list price from EUR 297 a month", "https://automis.ai/voice-ai")] },
  "EUR-it": {
    it: [
      L("CCNL Terziario Confcommercio, IV livello dal 1 novembre 2026: paga base 1.292,46 € + contingenza ed EDR 524,22 €, per 14 mensilità", "https://www.dipendenti.it/guida/ccnl-commercio"),
      L("Prezzo Automis da 297 € al mese", "https://automis.ai/it/voice-ai"),
    ],
  },
  "EUR-pt": {
    pt: [
      L("Salário mínimo nacional 2026: 920 € x 14 meses, TSU a cargo da empresa 23,75%", "https://eco.sapo.pt/2026/01/05/novo-salario-minimo-obriga-empresas-a-gastar-mais-866-euros-por-ano-por-trabalhador/"),
      L("Preço Automis a partir de 297 € por mês", "https://automis.ai/pt/voice-ai"),
    ],
  },
};

const STR = {
  en: {
    calls: "Calls per month", len: "Average call length (minutes)", cover: "Hours to cover",
    covers: { office: "Office hours (about 40 h a week)", after: "After hours only", all: "24/7" },
    currency: "Currency",
    optInhouse: "In-house receptionist", optService: "Human answering service", optAi: "AI receptionist (Automis)",
    salary: "Yearly salary per person", salaryHint: "Gross pay for one full-time person", onCost: "Employer extra costs (%)", onCostHint: "Social charges, equipment, leave cover. Leave empty if unknown.",
    model: "Charged", perCall: "Per call", perMin: "Per minute", price: "Price per call", priceMin: "Price per minute", base: "Monthly base fee (optional)",
    ai: "AI receptionist, monthly fee", aiHint: "Automis starts at EUR 297 a month",
    placeholder: "Enter yours",
    month: "Per month", year: "Per year", cheapest: "Cheapest option", tbd: "Add your figure",
    staff: (n) => `${n} full-time staff to cover these hours`,
    sourcesIntro: "Default figures from", sourcesOutro: "Checked November 2026. Change them to yours.",
    noSources: "No public figure found for the empty fields, so they are blank. Fill them with your own quote.",
    readTitle: "In plain words",
    summaryTitle: "Receptionist cost comparison",
  },
  it: {
    calls: "Chiamate al mese", len: "Durata media di una chiamata (minuti)", cover: "Fasce da coprire",
    covers: { office: "Orario d'ufficio (circa 40 ore a settimana)", after: "Solo fuori orario", all: "24 ore su 24, 7 giorni su 7" },
    currency: "Valuta",
    optInhouse: "Segretaria interna", optService: "Servizio di segreteria telefonica", optAi: "Segretaria IA (Automis)",
    salary: "Stipendio lordo annuo per persona", salaryHint: "Retribuzione lorda di una persona a tempo pieno", onCost: "Costi extra a carico tuo (%)", onCostHint: "Contributi, attrezzatura, sostituzioni. Lascia vuoto se non lo sai.",
    model: "Tariffa", perCall: "A chiamata", perMin: "Al minuto", price: "Prezzo a chiamata", priceMin: "Prezzo al minuto", base: "Canone mensile fisso (facoltativo)",
    ai: "Segretaria IA, canone mensile", aiHint: "Automis parte da 297 € al mese",
    placeholder: "Inserisci il tuo",
    month: "Al mese", year: "All'anno", cheapest: "L'opzione piu' economica", tbd: "Aggiungi il tuo dato",
    staff: (n) => `${n} persone a tempo pieno per coprire queste fasce`,
    sourcesIntro: "Cifre predefinite da", sourcesOutro: "Verificate a novembre 2026. Cambiale con le tue.",
    noSources: "Per i campi vuoti non abbiamo trovato una cifra pubblica, quindi li lasciamo in bianco. Compilali con il tuo preventivo.",
    readTitle: "In parole semplici",
    summaryTitle: "Confronto costo segretaria",
  },
  pt: {
    calls: "Chamadas por mês", len: "Duração média de uma chamada (minutos)", cover: "Horário a cobrir",
    covers: { office: "Horário de expediente (cerca de 40 h por semana)", after: "Só fora de horas", all: "24 horas por dia, 7 dias por semana" },
    currency: "Moeda",
    optInhouse: "Rececionista interna", optService: "Serviço de atendimento telefónico", optAi: "Rececionista IA (Automis)",
    salary: "Salário bruto anual por pessoa", salaryHint: "Remuneração bruta de uma pessoa a tempo inteiro", onCost: "Custos extra a cargo da empresa (%)", onCostHint: "Segurança Social, equipamento, substituições. Deixe vazio se não souber.",
    model: "Cobrança", perCall: "Por chamada", perMin: "Por minuto", price: "Preço por chamada", priceMin: "Preço por minuto", base: "Mensalidade fixa (opcional)",
    ai: "Rececionista IA, mensalidade", aiHint: "A Automis começa nos 297 € por mês",
    placeholder: "Introduza o seu",
    month: "Por mês", year: "Por ano", cheapest: "A opção mais barata", tbd: "Junte o seu valor",
    staff: (n) => `${n} pessoas a tempo inteiro para cobrir este horário`,
    sourcesIntro: "Valores predefinidos de", sourcesOutro: "Verificados em novembro de 2026. Altere-os para os seus.",
    noSources: "Para os campos vazios não encontrámos um valor público, por isso ficam em branco. Preencha-os com o seu orçamento.",
    readTitle: "Em palavras simples",
    summaryTitle: "Comparação do custo de rececionista",
  },
};

const num = (v) => {
  const n = parseFloat(String(v).replace(",", "."));
  return isNaN(n) || n < 0 ? 0 : n;
};

export default function ReceptionistCostCalculator({ locale }) {
  const t = STR[locale] || STR.en;
  const [currency, setCurrency] = useState(locale === "en" ? "USD" : "EUR");
  const presetKey = currency === "EUR" ? `EUR-${locale}` : currency;
  const [vals, setVals] = useState(PRESETS[presetKey]);
  const [calls, setCalls] = useState("300");
  const [len, setLen] = useState("3");
  const [cover, setCover] = useState("office");

  function changeCurrency(c) {
    setCurrency(c);
    setVals(PRESETS[c === "EUR" ? `EUR-${locale}` : c]);
  }
  const set = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }));
  const [base, setBase] = useState("");

  const nf = useMemo(
    () => new Intl.NumberFormat(NF_LOCALE[locale] || NF_LOCALE.en, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency]
  );
  const nfNum = new Intl.NumberFormat(NF_LOCALE[locale] || NF_LOCALE.en, { maximumFractionDigits: 1 });

  const r = useMemo(() => {
    const c = num(calls);
    const minutes = c * num(len);
    const fte = COVER_HOURS[cover] / FTE_HOURS;
    const inhouse = num(vals.salary) > 0 ? (fte * num(vals.salary) * (1 + num(vals.onCost) / 100)) / 12 : null;
    const unit = num(vals.price) > 0 ? (vals.model === "call" ? num(vals.price) : num(vals.price) * num(len)) : 0;
    const service = unit > 0 ? num(base) + c * unit : null;
    const ai = num(vals.ai) > 0 ? num(vals.ai) : null;
    const opts = [
      ["inhouse", inhouse],
      ["service", service],
      ["ai", ai],
    ].filter((o) => o[1] !== null);
    const cheapest = opts.length > 1 ? opts.reduce((a, b) => (b[1] < a[1] ? b : a))[0] : null;
    // break-even in calls per month
    const aiVsService = unit > 0 && ai !== null && ai > num(base) ? (ai - num(base)) / unit : null;
    const serviceVsHouse = unit > 0 && inhouse !== null && inhouse > num(base) ? (inhouse - num(base)) / unit : null;
    const aiVsHouse = ai !== null && inhouse !== null ? { ai, inhouse } : null;
    return { c, minutes, fte, inhouse, service, ai, cheapest, aiVsService, serviceVsHouse, aiVsHouse, unit };
  }, [calls, len, cover, vals, base]);

  const label = { inhouse: t.optInhouse, service: t.optService, ai: t.optAi };
  const rows = [
    ["inhouse", r.inhouse],
    ["service", r.service],
    ["ai", r.ai],
  ];

  // Plain-language read
  const read = [];
  const f0 = (n) => nf.format(Math.round(n));
  const cal = (n) => nfNum.format(Math.round(n));
  if (r.cheapest) {
    const v = rows.find((x) => x[0] === r.cheapest)[1];
    const sentences = {
      en: `At ${cal(r.c)} calls a month, the cheapest option is: ${label[r.cheapest]}, ${f0(v)} a month, ${f0(v * 12)} a year.`,
      it: `Con ${cal(r.c)} chiamate al mese, l'opzione piu' economica e': ${label[r.cheapest]}, ${f0(v)} al mese e ${f0(v * 12)} all'anno.`,
      pt: `Com ${cal(r.c)} chamadas por mês, a opção mais barata é: ${label[r.cheapest]}, ${f0(v)} por mês e ${f0(v * 12)} por ano.`,
    };
    read.push(sentences[locale] || sentences.en);
  }
  if (r.aiVsService !== null) {
    const s = {
      en: `Against the answering service, the AI receptionist costs less from about ${cal(r.aiVsService)} calls a month.`,
      it: `Rispetto al servizio di segreteria, la segretaria IA costa meno da circa ${cal(r.aiVsService)} chiamate al mese.`,
      pt: `Em relação ao serviço de atendimento, a rececionista IA fica mais barata a partir de cerca de ${cal(r.aiVsService)} chamadas por mês.`,
    };
    read.push(s[locale] || s.en);
  }
  if (r.serviceVsHouse !== null) {
    const s = {
      en: `The answering service stays cheaper than one in-house hire up to about ${cal(r.serviceVsHouse)} calls a month.`,
      it: `Il servizio di segreteria costa meno di una persona interna fino a circa ${cal(r.serviceVsHouse)} chiamate al mese.`,
      pt: `O serviço de atendimento fica mais barato do que uma pessoa interna até cerca de ${cal(r.serviceVsHouse)} chamadas por mês.`,
    };
    read.push(s[locale] || s.en);
  }
  if (r.aiVsHouse) {
    const diff = (r.aiVsHouse.inhouse - r.aiVsHouse.ai) * 12;
    const s = {
      en: diff >= 0 ? `Versus in-house, the AI receptionist saves ${f0(diff)} a year, and it answers every call at any hour.` : `Versus in-house, the AI receptionist costs ${f0(-diff)} more a year at these inputs.`,
      it: diff >= 0 ? `Rispetto alla persona interna, la segretaria IA fa risparmiare ${f0(diff)} all'anno e risponde a ogni chiamata a qualsiasi ora.` : `Rispetto alla persona interna, con questi dati la segretaria IA costa ${f0(-diff)} in piu' all'anno.`,
      pt: diff >= 0 ? `Em relação à pessoa interna, a rececionista IA poupa ${f0(diff)} por ano e atende todas as chamadas a qualquer hora.` : `Em relação à pessoa interna, com estes dados a rececionista IA custa mais ${f0(-diff)} por ano.`,
    };
    read.push(s[locale] || s.en);
  }

  const summary = `${t.summaryTitle}: ${r.c} calls/month, ${COVER_HOURS[cover]} h/week. ` +
    rows.map(([k, v]) => `${label[k]}: ${v === null ? "-" : f0(v) + "/mo"}`).join(". ") + ".";

  const sources = (SOURCES[presetKey] && (SOURCES[presetKey][locale] || SOURCES[presetKey].en)) || [];
  const symbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";

  return (
    <div className="hv3-toolcard p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {locale === "en" ? (
          <div className="block">
            <span className="block text-sm font-medium text-white/80">{t.currency}</span>
            <div className="mt-1.5">
              <ToolSegmented ariaLabel={t.currency} value={currency} onChange={changeCurrency} options={[["USD", "USD ($)"], ["GBP", "GBP (£)"], ["EUR", "EUR (€)"]]} />
            </div>
          </div>
        ) : null}
        <ToolField label={t.calls}>
          <input type="number" min="0" inputMode="numeric" value={calls} onChange={(e) => setCalls(e.target.value)} className={inputClass} />
        </ToolField>
        <ToolField label={t.len}>
          <input type="number" min="0" step="0.5" inputMode="decimal" value={len} onChange={(e) => setLen(e.target.value)} className={inputClass} />
        </ToolField>
        <div className="block sm:col-span-2 lg:col-span-4">
          <span className="block text-sm font-medium text-white/80">{t.cover}</span>
          <div className="mt-1.5">
            <ToolSegmented ariaLabel={t.cover} value={cover} onChange={setCover} options={Object.entries(t.covers)} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-4">
          <p className="font-semibold text-white">{t.optInhouse}</p>
          <ToolField label={`${t.salary} (${symbol})`} hint={t.salaryHint}>
            <input type="number" min="0" inputMode="numeric" value={vals.salary} onChange={set("salary")} placeholder={t.placeholder} className={inputClass} />
          </ToolField>
          <ToolField label={t.onCost} hint={t.onCostHint}>
            <input type="number" min="0" inputMode="decimal" value={vals.onCost} onChange={set("onCost")} placeholder="%" className={inputClass} />
          </ToolField>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-4">
          <p className="font-semibold text-white">{t.optService}</p>
          <div className="block">
            <span className="block text-sm font-medium text-white/80">{t.model}</span>
            <div className="mt-1.5">
              <ToolSegmented ariaLabel={t.model} value={vals.model} onChange={(m) => setVals((v) => ({ ...v, model: m }))} options={[["call", t.perCall], ["min", t.perMin]]} />
            </div>
          </div>
          <ToolField label={`${vals.model === "call" ? t.price : t.priceMin} (${symbol})`}>
            <input type="number" min="0" inputMode="decimal" value={vals.price} onChange={set("price")} placeholder={t.placeholder} className={inputClass} />
          </ToolField>
          <ToolField label={`${t.base} (${symbol})`}>
            <input type="number" min="0" inputMode="decimal" value={base} onChange={(e) => setBase(e.target.value)} placeholder="0" className={inputClass} />
          </ToolField>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-4">
          <p className="font-semibold text-white">{t.optAi}</p>
          <ToolField label={`${t.ai} (${symbol})`} hint={t.aiHint}>
            <input type="number" min="0" inputMode="numeric" value={vals.ai} onChange={set("ai")} placeholder={t.placeholder} className={inputClass} />
          </ToolField>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className={`rounded-xl border p-5 text-center ${r.cheapest === k ? "border-yellow-light/60 bg-yellow-light/10" : "border-blue-middle/30 bg-blue-middle/10"}`}
          >
            <p className="text-sm text-white/70">{label[k]}</p>
            {v === null ? (
              <p className="mt-2 text-base text-white/60">{t.tbd}</p>
            ) : (
              <>
                <p className="mt-1 text-3xl font-bold text-yellow-light">{f0(v)}</p>
                <p className="text-xs text-white/60">{t.month}</p>
                <p className="mt-2 text-lg font-semibold text-white">{f0(v * 12)}</p>
                <p className="text-xs text-white/60">{t.year}</p>
              </>
            )}
            {k === "inhouse" && v !== null && r.fte > 1 ? <p className="mt-2 text-xs text-white/60">{t.staff(nfNum.format(r.fte))}</p> : null}
            {r.cheapest === k ? <p className="mt-2 text-xs font-semibold text-yellow-light">{t.cheapest}</p> : null}
          </div>
        ))}
      </div>

      {read.length ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">{t.readTitle}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-white/80">
            {read.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-5 text-xs leading-relaxed text-white/60">
        {t.sourcesIntro}{" "}
        {sources.map((s, i) => (
          <span key={s.href}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-blue-lightest underline">{s.label}</a>
            {i < sources.length - 1 ? "; " : ". "}
          </span>
        ))}
        {t.sourcesOutro} {!vals.salary || !vals.price ? t.noSources : ""}
      </p>

      <EmailCopyForm toolName="receptionist-cost-calculator" locale={locale} summary={summary} />
    </div>
  );
}
