"use client";
import { useState } from "react";
import Link from "next/link";
import { GRAD } from "@/components/home/_ui";
import { addLangPrefix } from "@/lib/locales";
import { WowSection, WowHeading } from "./WowParts";
import { Stethoscope, Landmark, Camera, Shirt, ArrowRight } from "lucide-react";

/*
  Casi studio. Base: components/home/Proof.js (scheda con logo o icona, tag, cliente, riga di risultato e link).
  Giro WOW: i quattro casi sono carte a pila in 3D che si aprono a ventaglio mentre scorri (la coreografia sta in
  stages/cases.js; su schermo largo la sezione resta fissata finché le carte non sono aperte). Sul telefono la pila è
  di carte «appiccicate» (position: sticky, home.css; --i è la posizione nella pila): ognuna arriva sopra la precedente, che
  si ritira in profondità; dove c'è un giroscopio (Android) le carte seguono anche l'inclinazione del telefono. Ogni carta ha un numero
  grande: è lo stesso numero della riga di risultato, sulla stessa base (la riga sotto il numero dice cosa e in
  quanto tempo). Il numero è SEMPRE quello vero, anche a metà animazione (niente conteggio da zero): mentre la pila si
  apre e le carte sono inclinate si vedono solo logo e numero; il testo piccolo (data-wow-detail) si accende quando la
  carta è dritta. Sopra la fila di carte passa un bus (fili e pacchetti) che le unisce e ne accende il bordo a turno.
  I testi arrivano da getCopy("home", lang).cases; i link passano da addLangPrefix.
*/

const ICONS = { clinica: Stethoscope, adifesa: Landmark, album: Camera, datura: Shirt };
// Solo i due clienti che hanno già il logo pubblico sul sito; gli altri due portano un'icona.
const LOGOS = {
  clinica: "/assets/images/client-logos/clinica-santa-maria.png",
  adifesa: "/assets/images/client-logos/adifesa.png",
};

// Logo vero su pastiglia chiara; se manca il file, l'icona.
function ClientMark({ logo, Icon, name }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    return (
      <span className="flex h-12 items-center justify-center rounded-xl bg-white px-3">
        <img src={logo} alt={name} onError={() => setFailed(true)} className="max-h-8 w-auto object-contain" />
      </span>
    );
  }
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
      <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
    </span>
  );
}

export default function CasesClassic({ locale = "en", copy }) {
  return (
    <WowSection id="cases" wow="cases" className="bg-[#020a12] v2hp-cases">
      <WowHeading eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />

      <div className="v2hp-deck mt-12 md:mt-14" data-wow-deck>
        <div className="v2hp-bus" data-wow-bus aria-hidden="true" />
        {copy.items.map((c, idx) => {
          const Icon = ICONS[c.key];
          return (
            <article key={c.key} className="v2hp-case" data-wow-case style={{ "--i": idx }}>
              <div className="v2hp-case__in card-glow group relative h-full rounded-2xl border border-white/[0.09] p-6 sm:p-7" data-wow-case-in>
                <i className="v2hp-case__lit" aria-hidden="true" />
                <i className="v2hp-case__dim" data-wow-dim aria-hidden="true" />
                <div className="v2hp-case__body flex h-full flex-col" data-wow-case-body>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                    <ClientMark logo={LOGOS[c.key]} Icon={Icon} name={c.client} />
                    <span
                      data-wow-detail
                      className="rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.08] px-3 py-1 text-[11px] font-semibold text-[#8fe0f0]"
                    >
                      {c.tag}
                    </span>
                  </div>

                  <p className="v2hp-stat mt-6">
                    <span className="v2hp-stat__n font-display" style={{ backgroundImage: GRAD }}>
                      {c.approx ? copy.approxWord ? <span className="v2hp-stat__ap">{copy.approxWord} </span> : "~" : ""}
                      {c.stat}
                    </span>
                    <span className="v2hp-stat__l" data-wow-detail>
                      {c.statLabel}
                    </span>
                  </p>

                  <h3 data-wow-detail className="font-display mt-6 text-xl font-semibold text-white">
                    {c.client}
                  </h3>
                  <p data-wow-detail className="mt-1 text-[13px] text-white/60">
                    {c.meta}
                  </p>
                  <p data-wow-detail className="mb-5 mt-3 text-[14.5px] leading-relaxed text-white/65">
                    {c.result}
                  </p>
                  <Link
                    href={addLangPrefix(c.href, locale)}
                    data-wow-detail
                    className="mt-auto block border-t border-white/[0.06] pt-5 text-[14px] font-semibold text-[#8fe0f0] transition-colors hover:text-white"
                  >
                    <span data-magnetic className="inline-flex items-center gap-1.5">
                      {copy.readCase}
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#57C7E3] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </WowSection>
  );
}
