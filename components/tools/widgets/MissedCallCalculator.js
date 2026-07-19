"use client";

import { useMemo, useState } from "react";
import ToolField from "@/components/tools/ToolField";
import EmailCopyForm from "@/components/tools/EmailCopyForm";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-middle";
const BUSINESS_DAYS = 22;

const NF_LOCALE = { it: "it-IT", pt: "pt-PT", en: "en-IE" };

export default function MissedCallCalculator({ locale }) {
  const [callsPerDay, setCallsPerDay] = useState("20");
  const [missedPct, setMissedPct] = useState("30");
  const [avgValue, setAvgValue] = useState("200");
  const [closeRate, setCloseRate] = useState("40");

  const nfLocale = NF_LOCALE[locale] || NF_LOCALE.en;
  const nfEuro = new Intl.NumberFormat(nfLocale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const nfNum = new Intl.NumberFormat(nfLocale, { maximumFractionDigits: 0 });
  const num = (v) => {
    const n = parseFloat(v);
    return isNaN(n) || n < 0 ? 0 : n;
  };

  const { missedPerMonth, lostPerMonth, lostPerYear } = useMemo(() => {
    const mpm = num(callsPerDay) * (num(missedPct) / 100) * BUSINESS_DAYS;
    const lpm = mpm * (num(closeRate) / 100) * num(avgValue);
    return { missedPerMonth: mpm, lostPerMonth: lpm, lostPerYear: lpm * 12 };
  }, [callsPerDay, missedPct, avgValue, closeRate]);

  const strings = {
    it: {
      calls: "Chiamate che ricevi al giorno",
      missed: "Percentuale che perdi (%)",
      value: "Valore medio di un cliente (€)",
      close: "Delle chiamate a cui rispondi, quante diventano clienti (%)",
      lostMonth: "Fatturato perso stimato al mese",
      missedMonth: "Chiamate perse al mese",
      perYear: "All'anno",
      note: "L'assistente vocale IA di Automis risponde 24 ore su 24 e puo' recuperarne gran parte.",
    },
    pt: {
      calls: "Chamadas que o seu negócio recebe por dia",
      missed: "Percentagem que perde (%)",
      value: "Valor médio de um cliente (€)",
      close: "Das chamadas que atende, quantas se tornam clientes (%)",
      lostMonth: "Faturação perdida estimada por mês",
      missedMonth: "Chamadas perdidas por mês",
      perYear: "Por ano",
      note: "O assistente de voz da Automis atende 24 horas por dia e pode recuperar grande parte desta.",
    },
    en: {
      calls: "Calls your business receives per day",
      missed: "Percentage you miss (%)",
      value: "Average value of a customer (€)",
      close: "Of answered calls, how many become customers (%)",
      lostMonth: "Estimated lost revenue per month",
      missedMonth: "Missed calls per month",
      perYear: "Per year",
      note: "Automis VoiceAI answers 24/7 and can recover most of this.",
    },
  };
  const t = strings[locale] || strings.en;

  const summary = `${t.missedMonth}: ${nfNum.format(Math.round(missedPerMonth))}. ${t.lostMonth}: ${nfEuro.format(Math.round(lostPerMonth))}. ${t.perYear}: ${nfEuro.format(Math.round(lostPerYear))}.`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <ToolField label={t.calls}>
          <input type="number" min="0" inputMode="numeric" value={callsPerDay} onChange={(e) => setCallsPerDay(e.target.value)} className={inputClass} />
        </ToolField>
        <ToolField label={t.missed}>
          <input type="number" min="0" max="100" inputMode="numeric" value={missedPct} onChange={(e) => setMissedPct(e.target.value)} className={inputClass} />
        </ToolField>
        <ToolField label={t.value}>
          <input type="number" min="0" inputMode="numeric" value={avgValue} onChange={(e) => setAvgValue(e.target.value)} className={inputClass} />
        </ToolField>
        <ToolField label={t.close}>
          <input type="number" min="0" max="100" inputMode="numeric" value={closeRate} onChange={(e) => setCloseRate(e.target.value)} className={inputClass} />
        </ToolField>
      </div>

      <div className="mt-6 rounded-xl border border-blue-middle/30 bg-blue-middle/10 p-6 text-center">
        <p className="text-sm text-white/60">{t.lostMonth}</p>
        <p className="mt-1 text-4xl font-bold text-yellow-light">{nfEuro.format(Math.round(lostPerMonth))}</p>
        <div className="mt-4 flex justify-center gap-10 text-sm">
          <div>
            <span className="block text-white/50">{t.missedMonth}</span>
            <span className="text-lg font-semibold text-white">{nfNum.format(Math.round(missedPerMonth))}</span>
          </div>
          <div>
            <span className="block text-white/50">{t.perYear}</span>
            <span className="text-lg font-semibold text-white">{nfEuro.format(Math.round(lostPerYear))}</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/50">{t.note}</p>
      </div>

      <EmailCopyForm toolName="missed-call-calculator" locale={locale} summary={summary} />
    </div>
  );
}
