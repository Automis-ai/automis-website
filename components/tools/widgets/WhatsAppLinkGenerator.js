"use client";

import { useState } from "react";
import ToolField from "@/components/tools/ToolField";
import CopyButton from "@/components/tools/CopyButton";
import QrBlock from "@/components/tools/QrBlock";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-middle";

export default function WhatsAppLinkGenerator({ locale }) {
  const isIt = locale === "it";
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const digits = phone.replace(/\D/g, "");
  const waLink = digits ? `https://wa.me/${digits}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ""}` : "";
  const telLink = digits ? `tel:+${digits}` : "";
  const snippet = waLink ? `<a href="${waLink}" target="_blank" rel="noopener">${isIt ? "Scrivici su WhatsApp" : "Chat on WhatsApp"}</a>` : "";

  const t = isIt
    ? {
        phone: "Il tuo numero (con prefisso internazionale)",
        phoneHint: "Solo cifre, es. 39320...",
        phonePlaceholder: "39320...",
        message: "Messaggio precompilato (facoltativo)",
        messagePlaceholder: "Ciao, vorrei prenotare un appuntamento",
        waLink: "Link chat WhatsApp",
        telLink: "Link click-to-call",
        snippet: "HTML pulsante chat (incollalo sul tuo sito)",
        copy: "Copia",
        copied: "Copiato",
        copyHtml: "Copia HTML",
        download: "Scarica QR (PNG)",
      }
    : {
        phone: "Your phone number (with country code)",
        phoneHint: "Digits only, e.g. 351912345678",
        phonePlaceholder: "351912345678",
        message: "Pre-filled message (optional)",
        messagePlaceholder: "Hi, I would like to book an appointment",
        waLink: "WhatsApp chat link",
        telLink: "Click-to-call link",
        snippet: "Chat button HTML (paste on your site)",
        copy: "Copy",
        copied: "Copied",
        copyHtml: "Copy HTML",
        download: "Download QR (PNG)",
      };

  const btnClass = "rounded-lg bg-gradient-to-r from-blue-middle to-blue-lightest px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <ToolField label={t.phone} hint={t.phoneHint}>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePlaceholder} className={inputClass} />
        </ToolField>
        <ToolField label={t.message}>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.messagePlaceholder} className={inputClass} />
        </ToolField>
      </div>

      {waLink ? (
        <div className="mt-6 space-y-6">
          <div>
            <p className="mb-1 text-sm text-white/60">{t.waLink}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input readOnly value={waLink} onFocus={(e) => e.target.select()} className={`${inputClass} flex-1`} />
              <CopyButton value={waLink} label={t.copy} copiedLabel={t.copied} className={btnClass} />
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm text-white/60">{t.telLink}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input readOnly value={telLink} onFocus={(e) => e.target.select()} className={`${inputClass} flex-1`} />
              <CopyButton value={telLink} label={t.copy} copiedLabel={t.copied} className={btnClass} />
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm text-white/60">{t.snippet}</p>
            <textarea readOnly value={snippet} rows={2} onFocus={(e) => e.target.select()} className={`${inputClass} font-mono text-xs`} />
            <CopyButton value={snippet} label={t.copyHtml} copiedLabel={t.copied} className="mt-2 inline-block text-sm text-blue-lightest hover:underline" />
          </div>
          <QrBlock value={waLink} fileName="whatsapp-qr" downloadLabel={t.download} />
        </div>
      ) : null}
    </div>
  );
}
