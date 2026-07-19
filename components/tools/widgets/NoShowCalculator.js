"use client";

import { useMemo, useState } from "react";
import ToolField from "@/components/tools/ToolField";
import EmailCopyForm from "@/components/tools/EmailCopyForm";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-middle";
const WEEKS_PER_YEAR = 48;
const WEEKS_PER_MONTH = 4.33;

const NF_LOCALE = { it: "it-IT", pt: "pt-PT", en: "en-IE" };

export default function NoShowCalculator({ locale }) {
  const [apptsPerWeek, setApptsPerWeek] = useState("50");
  const [noShowPct, setNoShowPct] = useState("15");
  const [avgValue, setAvgValue] = useState("80");

  const nfLocale = NF_LOCALE[locale] || NF_LOCALE.en;
  const nfEuro = new Intl.NumberFormat(nfLocale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const nfNum = new Intl.NumberFormat(nfLocale, { maximumFractionDigits: 0 });
  const num = (v) => {
    const n = parseFloat(v);
    return isNaN(n) || n < 0 ? 0 : n;
  };

  const { noShowsPerMonth, lostPerMonth, lostPerYear } = useMemo(() => {
    const perWeek = num(apptsPerWeek) * (num(noShowPct) / 100);
    return {
      noShowsPerMonth: perWeek * WEEKS_PER_MONTH,
      lostPerMonth: perWeek * num(avgValue) * WEEKS_PER_MONTH,
      lostPerYear: perWeek * num(avgValue) * WEEKS_PER_YEAR,
    };
  }, [apptsPerWeek, noShowPct, avgValue]);

  const strings = {
    it: {
      appts: "Appuntamenti a settimana",
      rate: "Percentuale di no-show (%)",
      value: "Valore medio di un appuntamento (€)",
      lostMonth: "Fatturato perso al mese",
      noShowMonth: "No-show al mese",
      perYear: "All'anno",
      note: "Promemoria e conferme automatiche mantengono piu' slot occupati.",
    },
    pt: {
      appts: "Consultas por semana",
      rate: "Percentagem de faltas (%)",
      value: "Valor médio de uma consulta (€)",
      lostMonth: "Faturação perdida por mês",
      noShowMonth: "Faltas por mês",
      perYear: "Por ano",
      note: "Os lembretes e as confirmações automáticas mantêm mais horários preenchidos.",
    },
    en: {
      appts: "Appointments per week",
      rate: "No-show rate (%)",
      value: "Average value of an appointment (€)",
      lostMonth: "Lost revenue per month",
      noShowMonth: "No-shows per month",
      perYear: "Per year",
      note: "Automated reminders and confirmations keep more of these slots filled.",
    },
  };
  const t = strings[locale] || strings.en;

  const summary = `${t.noShowMonth}: ${nfNum.format(Math.round(noShowsPerMonth))}. ${t.lostMonth}: ${nfEuro.format(Math.round(lostPerMonth))}. ${t.perYear}: ${nfEuro.format(Math.round(lostPerYear))}.`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-3">
        <ToolField label={t.appts}>
          <input type="number" min="0" inputMode="numeric" value={apptsPerWeek} onChange={(e) => setApptsPerWeek(e.target.value)} className={inputClass} />
        </ToolField>
        <ToolField label={t.rate}>
          <input type="number" min="0" max="100" inputMode="numeric" value={noShowPct} onChange={(e) => setNoShowPct(e.target.value)} className={inputClass} />
        </ToolField>
        <ToolField label={t.value}>
          <input type="number" min="0" inputMode="numeric" value={avgValue} onChange={(e) => setAvgValue(e.target.value)} className={inputClass} />
        </ToolField>
      </div>

      <div className="mt-6 rounded-xl border border-blue-middle/30 bg-blue-middle/10 p-6 text-center">
        <p className="text-sm text-white/60">{t.lostMonth}</p>
        <p className="mt-1 text-4xl font-bold text-yellow-light">{nfEuro.format(Math.round(lostPerMonth))}</p>
        <div className="mt-4 flex justify-center gap-10 text-sm">
          <div>
            <span className="block text-white/50">{t.noShowMonth}</span>
            <span className="text-lg font-semibold text-white">{nfNum.format(Math.round(noShowsPerMonth))}</span>
          </div>
          <div>
            <span className="block text-white/50">{t.perYear}</span>
            <span className="text-lg font-semibold text-white">{nfEuro.format(Math.round(lostPerYear))}</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/50">{t.note}</p>
      </div>

      <EmailCopyForm toolName="no-show-calculator" locale={locale} summary={summary} />
    </div>
  );
}
