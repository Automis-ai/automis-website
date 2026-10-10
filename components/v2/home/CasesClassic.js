"use client";
import { useState } from "react";
import Link from "next/link";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { addLangPrefix } from "@/lib/locales";
import { Stethoscope, Landmark, Camera, Shirt, ArrowRight } from "lucide-react";

/*
  Casi studio, con il design di components/home/Proof.js (copia): scheda con logo (o icona), tag, cliente,
  riga di risultato e link. Differenze volute dal giro 2 di Luca: quattro casi invece di due, e meno testo
  (niente lead, niente fascia dei numeri, niente nota in fondo). Ogni numero sta nella sua scheda, sulla sua base.
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
    <Section id="cases" className="bg-[#020a12]">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />

      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2">
        {copy.items.map((c, i) => {
          const Icon = ICONS[c.key];
          return (
            <Reveal key={c.key} delay={(i % 2) * 120}>
              <div className="card-glow group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm hover:-translate-y-1 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <ClientMark logo={LOGOS[c.key]} Icon={Icon} name={c.client} />
                  <span className="rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.08] px-3 py-1 text-right text-[11px] font-semibold text-[#8fe0f0]">
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-white">{c.client}</h3>
                <p className="mt-1 text-[13px] text-white/60">{c.meta}</p>
                <p className="mb-5 mt-4 text-[14.5px] leading-relaxed text-white/65">{c.result}</p>
                <Link
                  href={addLangPrefix(c.href, locale)}
                  className="mt-auto flex items-center gap-1.5 border-t border-white/[0.06] pt-5 text-[14px] font-semibold text-[#8fe0f0] transition-colors hover:text-white"
                >
                  {copy.readCase}
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#57C7E3] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
