"use client";

import { PhoneOff, Clock3, PiggyBank } from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

const painPoints = [
  {
    icon: PhoneOff,
    tag: "Perda 01",
    title: "67% das Chamadas Ficam Sem Resposta",
    text: "Os seus potenciais clientes ligam, mas a sua equipa está ocupada. Resultado? Vão para a concorrência.",
  },
  {
    icon: Clock3,
    tag: "Perda 02",
    title: "Equipa Sobrecarregada com Pedidos Repetitivos",
    text: '"Quais são os horários?" "Quanto custa?" "Posso marcar?" As mesmas perguntas, o dia todo — todos os dias.',
  },
  {
    icon: PiggyBank,
    tag: "Perda 03",
    title: "Leads Frios que Nunca São Contactados",
    text: "Bases de dados com milhares de contactos esquecidos. É dinheiro parado em cima da mesa.",
  },
];

export default function PainPointsSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-bright-blue/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="O problema"
            title={
              <>
                Porque é que a maioria das empresas{" "}
                <Grad>perde clientes todos os dias</Grad>
              </>
            }
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.tag}
                className={`av-gradient-border av-reveal group rounded-2xl p-7 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1.5 lg:p-8 ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-bright-blue/15 transition-colors duration-300 group-hover:bg-warm-yellow/15">
                    <Icon
                      className="h-7 w-7 text-bright-blue transition-colors duration-300 group-hover:text-warm-yellow"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="font-plex-mono text-xs uppercase tracking-[0.16em] text-soft-blue/50">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mb-3 font-montserrat text-lg font-bold leading-snug text-white md:text-xl">
                  {item.title}
                </h3>
                <p className="font-open-sans text-base leading-relaxed text-white/65">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
