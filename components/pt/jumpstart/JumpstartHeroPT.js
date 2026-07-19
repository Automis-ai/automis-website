"use client";
import { Reveal, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Phone, Search, ArrowDown, ShieldCheck } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/pt-automis";

export default function JumpstartHeroPT() {
  return (
    <section id="hero" className="relative overflow-hidden bg-deep-blue">
      {/* Brilho ambiente, confinado à faixa superior */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 opacity-60 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.28), transparent 70%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to bottom, transparent, #000a14)" }} />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto max-w-4xl pt-32 pb-20 text-center sm:pt-36 md:pt-40">
          <Reveal immediate>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
              <Search className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.2} />
              Jumpstart Audit de Marketing e IA
            </span>
          </Reveal>

          <Reveal delay={80} immediate>
            <h1 className="font-display mx-auto mt-7 max-w-[20ch] text-[2.5rem] font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-[3.4rem] md:text-[4.1rem]">
              Descubra onde o seu neg&oacute;cio{" "}
              <GradientText>perde tempo e dinheiro</GradientText>.
            </h1>
          </Reveal>

          <Reveal delay={160} immediate>
            <p className="mx-auto mt-7 max-w-2xl text-[1.1rem] leading-relaxed text-white/70 md:text-[1.2rem]">
              Come&ccedil;amos com uma chamada gratuita em que partilhamos um ou dois quick wins e lhe
              mostramos como funciona a auditoria. Para perceber onde est&aacute; realmente a perder,
              a Jumpstart Audit completa vai a fundo: entrevistamos a sua equipa,
              analisamos os seus n&uacute;meros e entregamos um plano baseado nos dados em cerca de duas semanas.
            </p>
          </Reveal>

          {/* O percurso em duas etapas, num relance */}
          <Reveal delay={220} immediate>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
              {/* Etapa 1 */}
              <a
                href="#step-1"
                className="card-gold group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-left backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Phone className="h-4 w-4 text-[#57C7E3]" strokeWidth={1.8} />
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#57C7E3]">
                    Etapa 1 &middot; Gr&aacute;tis
                  </span>
                </div>
                <h2 className="font-display mt-4 text-[1.15rem] font-semibold leading-tight text-white">
                  Uma chamada de diagn&oacute;stico gratuita
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                  Um ou dois conselhos r&aacute;pidos, como funciona a auditoria e se somos um bom fit. Sem custos.
                </p>
              </a>

              {/* Conector */}
              <div className="hidden items-center justify-center sm:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/50">
                  <ArrowDown className="h-4 w-4 -rotate-90" strokeWidth={2.2} />
                </span>
              </div>
              <div className="flex items-center justify-center sm:hidden">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/50">
                  <ArrowDown className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </div>

              {/* Etapa 2 */}
              <a
                href="#step-2"
                className="card-glow group relative flex flex-col rounded-2xl border border-[#FEC458]/25 bg-white/[0.03] p-6 text-left backdrop-blur-sm transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FEC458]/25 bg-[#FEC458]/[0.08]">
                    <Search className="h-4 w-4 text-[#FEC458]" strokeWidth={1.8} />
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#FEC458]">
                    Etapa 2 &middot; A an&aacute;lise profunda
                  </span>
                </div>
                <h2 className="font-display mt-4 text-[1.15rem] font-semibold leading-tight text-white">
                  Jumpstart Audit
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                  Duas semanas de an&aacute;lise: entrevistas, dados reais e um plano concreto para agir.
                </p>
              </a>
            </div>
          </Reveal>

          <Reveal delay={300} immediate>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <InteractiveHoverButton
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
                text="Reserve uma Chamada Gratuita"
              />
              <InteractiveHoverButton
                href="#sample-audit"
                variant="ghost"
                text="Descarregue o Exemplo Gratuito"
              />
            </div>
          </Reveal>

          <Reveal delay={360}>
            <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-white/50">
              <ShieldCheck className="h-4 w-4 text-[#57C7E3]" strokeWidth={2} />
              Conforme ao RGPD &middot; apenas leitura &middot; nada muda nas suas contas
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
