"use client";

import { useMemo, useState } from "react";
import ToolField from "@/components/tools/ToolField";
import ToolSegmented from "@/components/tools/ToolSegmented";
import MessageList from "@/components/tools/MessageList";
import EmailCopyForm from "@/components/tools/EmailCopyForm";
import { AWAY_TYPES, AWAY_SITUATIONS, TONES, buildAwayMessages } from "@/utility/toolMessages";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-middle";

const STR = {
  en: {
    type: "Your business", situation: "Situation", tone: "Tone", name: "Business name (optional)", link: "Booking link (optional)", callback: "Callback time (optional)",
    callbackPh: "e.g. within 30 minutes", linkPh: "https://",
    capture: { title: "Want 20 more messages for your business type?", button: "Email me 20 messages", done: "Got it. We will send them over shortly." },
  },
  it: {
    type: "La tua attivita'", situation: "Situazione", tone: "Tono", name: "Nome dell'attivita' (facoltativo)", link: "Link per prenotare (facoltativo)", callback: "Quando richiami (facoltativo)",
    callbackPh: "es. entro 30 minuti", linkPh: "https://",
    capture: { title: "Vuoi altri 20 messaggi per il tuo tipo di attivita'?", button: "Inviami 20 messaggi", done: "Fatto. Te li inviamo a breve." },
  },
  pt: {
    type: "O seu negócio", situation: "Situação", tone: "Tom", name: "Nome do negócio (opcional)", link: "Link de marcação (opcional)", callback: "Quando liga de volta (opcional)",
    callbackPh: "ex. em 30 minutos", linkPh: "https://",
    capture: { title: "Quer mais 20 mensagens para o seu tipo de negócio?", button: "Enviem-me 20 mensagens", done: "Recebido. Enviamos-lhe em breve." },
  },
};

export default function AwayMessageGenerator({ locale }) {
  const t = STR[locale] || STR.en;
  const L = STR[locale] ? locale : "en";
  const [type, setType] = useState("dental");
  const [situation, setSituation] = useState("missed");
  const [tone, setTone] = useState("friendly");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [callback, setCallback] = useState("");

  const messages = useMemo(
    () => buildAwayMessages({ locale: L, type, situation, tone, name, link, callback }),
    [L, type, situation, tone, name, link, callback]
  );

  const seg = (label, value, onChange, opts) => (
    <div className="block">
      <span className="block text-sm font-medium text-white/80">{label}</span>
      <div className="mt-1.5">
        <ToolSegmented ariaLabel={label} value={value} onChange={onChange} options={Object.entries(opts)} />
      </div>
    </div>
  );

  return (
    <div className="hv3-toolcard p-6 md:p-8">
      <div className="space-y-5">
        {seg(t.type, type, setType, AWAY_TYPES[L])}
        {seg(t.situation, situation, setSituation, AWAY_SITUATIONS[L])}
        {seg(t.tone, tone, setTone, TONES[L])}
        <div className="grid gap-5 sm:grid-cols-3">
          <ToolField label={t.name}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </ToolField>
          <ToolField label={t.link}>
            <input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder={t.linkPh} className={inputClass} />
          </ToolField>
          <ToolField label={t.callback}>
            <input type="text" value={callback} onChange={(e) => setCallback(e.target.value)} placeholder={t.callbackPh} className={inputClass} />
          </ToolField>
        </div>
      </div>

      <MessageList messages={messages} locale={L} />

      <EmailCopyForm
        toolName="missed-call-text-back-generator"
        locale={L}
        summary={`Away messages: ${type}, ${situation}, ${tone}.`}
        copy={t.capture}
      />
    </div>
  );
}
