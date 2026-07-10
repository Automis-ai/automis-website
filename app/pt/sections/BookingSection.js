"use client";

import { useEffect, useRef } from "react";
import { Clock, ShieldCheck, Globe } from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

export default function BookingSection() {
  const [ref, visible] = useReveal();
  const iframeRef = useRef(null);

  // LeadConnector booking widget sends its content height — keep the iframe snug.
  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.origin.includes("leadconnectorhq.com") &&
        typeof event.data === "object" &&
        event.data?.type === "setHeight" &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = `${event.data?.height}px`;
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section
      ref={ref}
      id="agendar"
      className="section-padding relative scroll-mt-24 overflow-hidden bg-deep-blue text-white"
    >
      <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-bright-blue/15 blur-[140px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Vamos a isto"
            title={
              <>
                Agende a sua <Grad>demonstração gratuita</Grad>
              </>
            }
            subtitle="Escolha um horário abaixo. Mostramos-lhe o seu assistente de voz a funcionar — sem compromisso."
          />

          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {[
              { icon: Clock, label: "Configuração em 72 horas" },
              { icon: ShieldCheck, label: "Conforme com o RGPD" },
              { icon: Globe, label: "Suporte em português" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-white/70"
              >
                <Icon className="h-4 w-4 text-warm-yellow" strokeWidth={2.2} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`av-gradient-border av-reveal mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl p-2 backdrop-blur-md ${
            visible ? "is-visible" : ""
          }`}
        >
          <iframe
            ref={iframeRef}
            src="https://api.leadconnectorhq.com/widget/bookings/pt-automis"
            title="Agende uma demonstração Automis"
            className="min-h-[640px] w-full rounded-xl border-0 bg-white"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
