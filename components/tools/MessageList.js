"use client";

import CopyButton from "@/components/tools/CopyButton";

const COPY = {
  en: { copy: "Copy", copied: "Copied", title: "Your 3 messages" },
  it: { copy: "Copia", copied: "Copiato", title: "I tuoi 3 messaggi" },
  pt: { copy: "Copiar", copied: "Copiado", title: "As suas 3 mensagens" },
};

export default function MessageList({ messages, locale }) {
  const t = COPY[locale] || COPY.en;
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-semibold text-white">{t.title}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {messages.map((m, i) => (
          <div key={i} className="flex flex-col rounded-xl border border-blue-middle/30 bg-blue-middle/10 p-4">
            <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-white/90">{m}</p>
            <CopyButton
              value={m}
              label={t.copy}
              copiedLabel={t.copied}
              className="mt-4 self-start rounded-lg bg-gradient-to-r from-blue-middle to-blue-lightest px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
