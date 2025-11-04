"use client";

import { useEffect, useRef, useState } from "react";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function BeforeAfterSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const comparisons = [
    {
      before: "67% de chamadas perdidas fora de horário",
      after: "Disponibilidade 24/7, zero chamadas perdidas",
    },
    {
      before: "Equipa sobrecarregada com pedidos repetidos",
      after: "80% das perguntas tratadas pela IA",
    },
    {
      before: "Clientes potenciais não qualificados passam para as vendas",
      after: "Apenas clientes quentes com orçamento verificado",
    },
    {
      before: "Bases de dados antigas sem utilização",
      after: "Reativação automática de clientes potenciais inativos",
    },
    {
      before: "Contratação de rececionista 30 000€/ano",
      after: "Custo variável e escalável",
    },
    {
      before: "Tempo de resposta: horas ou dias",
      after: "Resposta imediata em 3 segundos",
    },
    {
      before: "Sem atendimento após as 18h00",
      after: "Serviço contínuo, fins-de-semana incluídos",
    },
    {
      before: "Dificuldade em medir o ROI das chamadas",
      after: "Análises detalhadas de cada interação",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="before-after"
      className="section-padding relative bg-bg-primary text-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-darkest/40 via-transparent to-bg-primary z-0"></div>

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        {/* Headline */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Antes e Depois <span className="text-text-blue">da Automis</span>
          </h2>
          <p className="text-blue-light/80 max-w-2xl mx-auto text-base md:text-lg">
            Um comparativo claro entre a forma tradicional de trabalhar e a
            potência da inteligência artificial da Automis.
          </p>
        </div>

        {/* Table */}
        <div
          className={`overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 text-left">
            {/* Table Header */}
            <div className="p-5 md:p-6 border-b border-blue-400/20 md:border-b-0 md:border-r border-r-blue-400/20 bg-gradient-to-r from-red-500/10 to-red-500/5 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <p className="text-lg font-semibold text-red-400">
                Sem a Automis
              </p>
            </div>
            <div className="p-5 md:p-6 border-b border-blue-400/20 bg-gradient-to-r from-green-500/10 to-green-500/5 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <p className="text-lg font-semibold text-green-400">
                Com a Automis
              </p>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <>
                {/* Left column (Before) */}
                <div
                  key={`before-${index}`}
                  className={`p-3 border-b border-blue-400/10 md:border-r border-r-blue-400/10 text-blue-light/80 transition-all duration-500 hover:bg-red-500/5 ${
                    index === comparisons.length - 1 ? "md:border-b-0" : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="text-red-400 mr-2">❌</span>
                  {row.before}
                </div>

                {/* Right column (After) */}
                <div
                  key={`after-${index}`}
                  className={`p-3 border-b border-blue-400/10 text-blue-light/90 transition-all duration-500 hover:bg-green-500/5 ${
                    index === comparisons.length - 1 ? "md:border-b-0" : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="text-green-400 mr-2">✅</span>
                  {row.after}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
