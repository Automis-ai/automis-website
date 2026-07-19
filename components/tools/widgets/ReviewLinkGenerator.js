"use client";

import { useState } from "react";
import ToolField from "@/components/tools/ToolField";
import CopyButton from "@/components/tools/CopyButton";
import QrBlock from "@/components/tools/QrBlock";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-middle";
const FINDER = "https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder";

export default function ReviewLinkGenerator({ locale }) {
  const [placeId, setPlaceId] = useState("");
  const id = placeId.trim();
  const reviewUrl = id ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(id)}` : "";

  const strings = {
    it: {
      finder: "Trova il tuo Place ID →",
      label: "Il tuo Place ID di Google",
      placeholder: "es. ChIJ...",
      result: "Il tuo link diretto per le recensioni",
      copy: "Copia link",
      copied: "Copiato",
      open: "Apri il link",
      download: "Scarica QR (PNG)",
    },
    pt: {
      finder: "Encontre o seu Place ID →",
      label: "O seu Place ID do Google",
      placeholder: "ex. ChIJ...",
      result: "O seu link direto para avaliações",
      copy: "Copiar link",
      copied: "Copiado",
      open: "Abrir o link",
      download: "Descarregar QR (PNG)",
    },
    en: {
      finder: "Find your Place ID →",
      label: "Your Google Place ID",
      placeholder: "e.g. ChIJ...",
      result: "Your direct review link",
      copy: "Copy link",
      copied: "Copied",
      open: "Open link",
      download: "Download QR (PNG)",
    },
  };
  const t = strings[locale] || strings.en;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <a href={FINDER} target="_blank" rel="noopener noreferrer" className="mb-3 inline-block text-sm text-blue-lightest hover:underline">
        {t.finder}
      </a>
      <ToolField label={t.label}>
        <input type="text" value={placeId} onChange={(e) => setPlaceId(e.target.value)} placeholder={t.placeholder} className={inputClass} />
      </ToolField>

      {reviewUrl ? (
        <div className="mt-6 space-y-6">
          <div>
            <p className="mb-1 text-sm text-white/60">{t.result}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input readOnly value={reviewUrl} onFocus={(e) => e.target.select()} className={`${inputClass} flex-1`} />
              <CopyButton
                value={reviewUrl}
                label={t.copy}
                copiedLabel={t.copied}
                className="rounded-lg bg-gradient-to-r from-blue-middle to-blue-lightest px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
              />
            </div>
            <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-blue-lightest hover:underline">
              {t.open}
            </a>
          </div>
          <QrBlock value={reviewUrl} fileName="google-review-qr" downloadLabel={t.download} />
        </div>
      ) : null}
    </div>
  );
}
