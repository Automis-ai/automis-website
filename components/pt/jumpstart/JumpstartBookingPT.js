"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Reveal, GRAD, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Check, Loader2 } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/pt-automis";

const BULLETS = [
  "Começa grátis: uma consultoria de 30 minutos, sem compromisso",
  "Mapeamos onde o seu negócio perde tempo e dinheiro",
  "Pronto para ir a fundo? Avance para a Jumpstart Audit de 1.450 euros",
];

export default function JumpstartBookingPT() {
  const holderRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Carregamos o iframe LeadConnector apenas quando a seccao se aproxima da vista.
  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setInView(true), io.disconnect())),
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="book" className="relative overflow-hidden bg-[#020a12] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 opacity-50 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.28), transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Esquerda: pitch */}
          <Reveal>
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">Comece com uma chamada gratuita</span>
              <h2 className="font-display mt-4 text-[2.1rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.7rem]">
                Encontre os sistemas de IA <GradientText>que faltam ao seu neg&oacute;cio</GradientText>.
              </h2>
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/60">
                Escolha um hor&aacute;rio que lhe convenha e mostramos-lhe exatamente onde a IA pode
                fazer-lhe recuperar tempo, chamadas e faturação. Comece com uma consultoria gratuita
                de 30 minutos, sem tecnicismos e sem compromisso, depois avance para a auditoria completa quando estiver pronto.
              </p>
              <ul className="mt-7 space-y-3">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-white/80">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: GRAD }}>
                      <Check className="h-3 w-3 text-[#04101c]" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex lg:hidden">
                <InteractiveHoverButton
                  href={BOOKING}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="solid"
                  text="Reserve uma Chamada Gratuita"
                />
              </div>
            </div>
          </Reveal>

          {/* Direita: calendario */}
          <Reveal delay={100}>
            <div
              ref={holderRef}
              className="relative rounded-2xl border border-white/[0.1] bg-white/[0.02] p-2 shadow-2xl"
            >
              <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-white/85">
                  <span className="h-2 w-2 rounded-full" style={{ background: GRAD, boxShadow: "0 0 8px rgba(87,199,227,0.8)" }} />
                  Disponibilidade live &middot; consultoria gratuita de 30 min
                </span>
                <span className="text-[12px] text-white/50">Confirma&ccedil;&atilde;o imediata</span>
              </div>
              <div className="relative w-full overflow-hidden rounded-xl bg-white" style={{ minHeight: 760 }}>
                {!loaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b1622]">
                    <Loader2 className="h-6 w-6 animate-spin text-[#57C7E3]" />
                    <p className="text-[13px] text-white/50">A carregar calend&aacute;rio live...</p>
                  </div>
                )}
                {inView && (
                  <iframe
                    id="ghl-booking-iframe"
                    src={`${BOOKING}?embed=true`}
                    title="Reserve uma consultoria gratuita de 30 minutos com a Automis"
                    className="block h-full w-full"
                    style={{ height: 780, minHeight: 760, border: "none", overflow: "auto" }}
                    scrolling="yes"
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-2 py-2 text-[12px] text-white/60">
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> Sem compromisso</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> Conforme ao RGPD</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.4} /> Apenas leitura</span>
              </div>
              <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
