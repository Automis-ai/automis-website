"use client";

import { Check } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { SectionHeading, Grad, useReveal } from "./_ui";

const steps = [
  {
    n: "01",
    title: "Configuração Rápida",
    points: [
      "Partilhe connosco os detalhes do seu negócio, FAQs e processos",
      "Configuração completa em 72 horas",
      "Personalizamos a IA para o seu setor",
    ],
  },
  {
    n: "02",
    title: "Treino e Testes",
    points: [
      "A IA aprende o seu tom de voz e valores",
      "Fase de teste com a sua equipa",
      "Aprovação final antes do lançamento",
    ],
  },
  {
    n: "03",
    title: "Ativo e Otimização Contínua",
    points: [
      "A IA começa a gerir chamadas reais",
      "Dashboard em tempo real com análises detalhadas",
      "Melhoria contínua baseada em dados",
    ],
  },
];

export default function StepsSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="como-funciona"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-bright-blue/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Como funciona"
            title={
              <>
                3 passos simples para <Grad>automatizar as suas chamadas</Grad>
              </>
            }
          />
        </div>

        <div className="relative mt-16">
          {/* connecting line (desktop) — aligns with the centre of the number nodes */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-bright-blue/30 to-transparent md:block" />

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-7">
            {steps.map((step, index) => (
              <div
                key={step.n}
                className={`av-reveal flex h-full flex-col ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                {/* numbered node — own row, so all numbers sit on one line */}
                <div className="mb-6 flex h-14 items-center">
                  <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-bright-blue/30 bg-deep-blue font-plex-mono text-lg font-medium text-bright-blue">
                    {step.n}
                  </span>
                </div>

                {/* card — flex-1 makes every card the same height */}
                <div className="av-gradient-border flex flex-1 flex-col rounded-2xl p-6 backdrop-blur-md lg:p-7">
                  <h3 className="mb-4 font-montserrat text-lg font-bold text-white md:text-xl">
                    {step.title}
                  </h3>
                  <ul className="space-y-3.5">
                    {step.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-bright-blue/15">
                          <Check
                            className="h-3 w-3 text-bright-blue"
                            strokeWidth={3}
                          />
                        </span>
                        <span className="font-open-sans text-[0.95rem] leading-relaxed text-white/75">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`av-reveal mt-14 text-center ${visible ? "is-visible" : ""}`}
          style={{ transitionDelay: "480ms" }}
        >
          <CTAButton
            href="#agendar"
            variant="primary"
            size="large"
            icon="fas fa-calendar-check"
          >
            Agende uma chamada
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
