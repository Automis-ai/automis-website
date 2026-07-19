"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Check, X } from "lucide-react";

const FOR = [
  "Empresas que vivem de contactos e marcações",
  "Equipas que investem em Google, Meta ou LinkedIn Ads",
  "Donos de negócio que querem mais marcações sem aumentar a equipa",
  "Quem se afoga entre chamadas perdidas, follow-ups lentos ou trabalho manual",
];

const NOT_FOR = [
  "Sem nenhum sistema de tracking ainda ativo",
  "Sem nenhuma atividade publicitária para analisar",
  "Sem disponibilidade para conceder acessos apenas de leitura",
];

export default function WhoItsForPT() {
  return (
    <Section id="who-its-for" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="Verificação do fit"
        title="A Jumpstart Audit é para si?"
        lead="É uma sessão de trabalho, por isso rende mais quando há um negócio real para analisar. Eis quem tira o máximo partido."
      />
      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="card-gold h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/[0.05]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#57C7E3]/30 bg-[#57C7E3]/10">
                <Check className="h-5 w-5 text-[#57C7E3]" strokeWidth={2.4} />
              </span>
              <h3 className="font-display text-[1.25rem] font-semibold text-white">Ideal para</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {FOR.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/80">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card-gold h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05]">
                <X className="h-5 w-5 text-white/50" strokeWidth={2.4} />
              </span>
              <h3 className="font-display text-[1.25rem] font-semibold text-white">Não é o momento certo</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {NOT_FOR.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/55">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/35" strokeWidth={2.4} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
