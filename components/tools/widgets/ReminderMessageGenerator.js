"use client";

import { useMemo, useState } from "react";
import ToolField from "@/components/tools/ToolField";
import ToolSegmented from "@/components/tools/ToolSegmented";
import MessageList from "@/components/tools/MessageList";
import EmailCopyForm from "@/components/tools/EmailCopyForm";
import { REM_SECTORS, REM_CHANNELS, REM_TIMINGS, REM_CONFIRMS, buildReminderMessages } from "@/utility/toolMessages";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-middle";

const STR = {
  en: {
    sector: "Sector", channel: "Channel", timing: "When to send", confirm: "Confirm or cancel wording",
    name: "Business name (optional)", client: "Client first name (optional)", when: "Appointment time", whenPh: "e.g. 10:30",
    contactLink: "Link to confirm or change", contactCall: "Phone number to call", contactPh: "",
    capture: { title: "Want 20 reminder messages for your sector?", button: "Email me 20 messages", done: "Got it. We will send them over shortly." },
  },
  it: {
    sector: "Settore", channel: "Canale", timing: "Quando inviarlo", confirm: "Come confermare o annullare",
    name: "Nome dell'attività (facoltativo)", client: "Nome del cliente (facoltativo)", when: "Orario dell'appuntamento", whenPh: "es. 10:30",
    contactLink: "Link per confermare o spostare", contactCall: "Numero da chiamare", contactPh: "",
    capture: { title: "Vuoi 20 messaggi di promemoria per il tuo settore?", button: "Inviami 20 messaggi", done: "Fatto. Te li inviamo a breve." },
  },
  pt: {
    sector: "Setor", channel: "Canal", timing: "Quando enviar", confirm: "Como confirmar ou cancelar",
    name: "Nome do negócio (opcional)", client: "Primeiro nome do cliente (opcional)", when: "Hora da marcação", whenPh: "ex. 10:30",
    contactLink: "Link para confirmar ou alterar", contactCall: "Número para ligar", contactPh: "",
    capture: { title: "Quer 20 mensagens de lembrete para o seu setor?", button: "Enviem-me 20 mensagens", done: "Recebido. Enviamos-lhe em breve." },
  },
};

export default function ReminderMessageGenerator({ locale }) {
  const t = STR[locale] || STR.en;
  const L = STR[locale] ? locale : "en";
  const [sector, setSector] = useState("dental");
  const [channel, setChannel] = useState("whatsapp");
  const [timing, setTiming] = useState("before");
  const [confirm, setConfirm] = useState("reply");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [when, setWhen] = useState("10:30");
  const [contact, setContact] = useState("");

  const messages = useMemo(
    () => buildReminderMessages({ locale: L, sector, channel, timing, confirm, name, client, when, contact }),
    [L, sector, channel, timing, confirm, name, client, when, contact]
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
        {seg(t.sector, sector, setSector, REM_SECTORS[L])}
        <div className="grid gap-5 md:grid-cols-2">
          {seg(t.channel, channel, setChannel, REM_CHANNELS[L])}
          {seg(t.timing, timing, setTiming, REM_TIMINGS[L])}
        </div>
        {seg(t.confirm, confirm, setConfirm, REM_CONFIRMS[L])}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ToolField label={t.name}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </ToolField>
          <ToolField label={t.client}>
            <input type="text" value={client} onChange={(e) => setClient(e.target.value)} className={inputClass} />
          </ToolField>
          <ToolField label={t.when}>
            <input type="text" value={when} onChange={(e) => setWhen(e.target.value)} placeholder={t.whenPh} className={inputClass} />
          </ToolField>
          {confirm !== "reply" ? (
            <ToolField label={confirm === "link" ? t.contactLink : t.contactCall}>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder={confirm === "link" ? "https://" : ""} className={inputClass} />
            </ToolField>
          ) : null}
        </div>
      </div>

      <MessageList messages={messages} locale={L} />

      <EmailCopyForm
        toolName="appointment-reminder-generator"
        locale={L}
        summary={`Reminder messages: ${sector}, ${channel}, ${timing}.`}
        copy={t.capture}
      />
    </div>
  );
}
