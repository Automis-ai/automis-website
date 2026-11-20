"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { ArrowUpRight } from "lucide-react";
import IdeaCard from "./IdeaCard";
import { SETTORI } from "./settoriData";

// Pagina principale «Automazioni IA per settore»: scegli il settore, vedi le idee, e dove c'è la pagina dedicata la raggiungi da qui.
// ?settore=commercialisti apre la pagina già su quel settore (link per l'outreach).
export default function AutomationsPerSettore() {
  const [id, setId] = useState(SETTORI[0].id);
  const s = SETTORI.find((x) => x.id === id) || SETTORI[0];

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("settore");
      if (q && SETTORI.some((x) => x.id === q)) setId(q);
    } catch {}
  }, []);

  return (
    <Section id="per-settore" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="Per settore"
        title="Cosa puoi automatizzare nel tuo settore"
        lead="Scegli il tuo settore. Alcune cose le fai da solo seguendo la guida, per altre serve una mano e la costruiamo con te."
      />

      <Reveal delay={80}>
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-2" role="group" aria-label="Scegli il settore">
          {SETTORI.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setId(x.id)}
              aria-pressed={x.id === id}
              className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-all duration-200 ${
                x.id === id
                  ? "border-[#F5CD79] bg-[#F5CD79] text-[#020a12]"
                  : "border-white/15 bg-white/[0.03] text-white/75 hover:border-white/30 hover:text-white"
              }`}
            >
              {x.nome}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-6xl" aria-live="polite">
        <h3 className="font-display border-b border-white/[0.07] pb-4 text-[1.3rem] font-semibold text-white">{s.nome}</h3>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.idee.map(([mode, titolo, testo]) => (
            <IdeaCard key={`${s.id}-${titolo}`} mode={mode} titolo={titolo} testo={testo} />
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            href={`/it/guide?g=${s.guida}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F5CD79] px-6 py-3 text-[14.5px] font-semibold text-[#020a12] transition-opacity hover:opacity-90"
          >
            Ricevi la guida per questo settore, gratis
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
          </Link>
          {s.pagina ? (
            <Link href={`/it/${s.pagina.slug}`} className="text-[14px] font-medium text-[#8fe0f0] transition-colors hover:text-white">
              Vai alla pagina per {s.pagina.breve}
            </Link>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
