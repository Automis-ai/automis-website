"use client";

import {
  Building2,
  CheckCircle2,
  PhoneCall,
  Utensils,
  ShoppingBag,
} from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

/* Numbers tempered to credible ranges and framed as estimates.
   See note under the heading — confirm against your own client data before publishing. */
const cases = [
  {
    icon: Building2,
    title: "Reativação de Leads",
    sector: "Imobiliário, Automóvel, Serviços B2B",
    problem:
      "Tem uma base de dados com milhares de contactos que demonstraram interesse há meses, mas não há recursos para voltar a falar com todos.",
    solution:
      "A IA liga automaticamente a leads inativos com conversas naturais, aquece o contacto e transfere apenas os interessados para a sua equipa.",
    results: [
      { label: "ROI potencial/ano", value: "15 000 / 35 000 €" },
      { label: "Taxa de resposta", value: "8 / 14 %" },
      { label: "Tempo poupado/mês", value: "15 / 25 h" },
    ],
  },
  {
    icon: CheckCircle2,
    title: "Qualificação de Leads",
    sector: "Imobiliário, Finanças, Consultoria",
    problem:
      "A sua equipa perde tempo com contactos não qualificados. Apenas 1 em cada 10 está realmente pronto para comprar.",
    solution:
      "A IA liga a cada novo contacto, faz perguntas de qualificação e passa à sua equipa apenas os leads quentes.",
    results: [
      { label: "Poupança mensal", value: "1 200 / 2 000 €" },
      { label: "Eficiência comercial", value: "+30 / 45 %" },
      { label: "Taxa de fecho", value: "+12 / 20 %" },
    ],
  },
  {
    icon: PhoneCall,
    title: "Rececionista Virtual 24/7",
    sector: "Clínicas, Escritórios de Advogados, Bem-estar",
    problem:
      "Liga para uma clínica às 13:00 ou depois das 18:00? Correio de voz. Resultado: o paciente procura outra alternativa.",
    solution:
      "Rececionista com IA sempre disponível que responde a FAQs, marca consultas, envia confirmações por SMS e atualiza o calendário.",
    results: [
      { label: "Poupança mensal", value: "900 / 1 500 €" },
      { label: "Marcações extra", value: "+8 a 15/mês" },
      { label: "Chamadas tratadas", value: "70 / 80 %" },
    ],
  },
  {
    icon: Utensils,
    title: "Gestão de Reservas",
    sector: "Restauração, Salões, Centros de Estética",
    problem:
      "Durante o serviço de almoço/jantar o telefone toca, mas ninguém tem tempo para atender. Perdem-se reservas todas as semanas.",
    solution:
      "A IA atende, verifica disponibilidade em tempo real, reserva mesas, envia confirmações por WhatsApp e lembretes automáticos.",
    results: [
      { label: "Receita adicional/mês", value: "1 500 / 3 000 €" },
      { label: "Redução de no-shows", value: "−20 a −30 %" },
      { label: "Tempo libertado", value: "~30 min/dia" },
    ],
  },
  {
    icon: ShoppingBag,
    title: "Apoio ao Cliente E-commerce",
    sector: "Lojas online, Dropshipping, Retalho",
    problem:
      'Pós-venda sobrecarregado com: "Onde está a minha encomenda?" "Como faço a devolução?" "Que tamanhos têm?"',
    solution:
      "IA que responde por telefone, acompanha encomendas em tempo real, gere devoluções e envia informações de produto.",
    results: [
      { label: "Poupança mensal", value: "800 / 1 600 €" },
      { label: "Pedidos resolvidos auto.", value: "60 / 70 %" },
      { label: "Satisfação (CSAT)", value: "4,2/5" },
    ],
  },
];

export default function ResultsSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="resultados"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-bright-blue/10 blur-[130px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Casos de uso"
            title={
              <>
                Resultados reais para <Grad>empresas reais</Grad>
              </>
            }
            subtitle="Eis como diferentes setores em Portugal usam a Automis para reduzir custos e aumentar receita — em automático."
          />
          <p className="mx-auto mt-4 max-w-2xl text-center font-plex-mono text-xs leading-relaxed text-soft-blue/55">
            Valores estimados com base em casos reais. Os resultados variam
            consoante o setor, o volume de chamadas e a base de contactos.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-6">
          {cases.map((c, index) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className={`av-gradient-border av-reveal group rounded-2xl p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 md:p-8 ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                {/* Header */}
                <div className="mb-6 flex items-start gap-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-bright-blue/15 transition-colors duration-300 group-hover:bg-warm-yellow/15">
                    <Icon
                      className="h-6 w-6 text-bright-blue transition-colors duration-300 group-hover:text-warm-yellow"
                      strokeWidth={2}
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-montserrat text-lg font-bold text-white md:text-xl">
                      {c.title}
                    </h3>
                    <p className="font-plex-mono text-xs uppercase tracking-wide text-soft-blue/60">
                      {c.sector}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {/* Problem + Solution */}
                  <div className="space-y-4">
                    <div className="border-l-2 border-warm-yellow/50 pl-4">
                      <p className="mb-1 font-plex-mono text-xs uppercase tracking-wide text-warm-yellow">
                        O problema
                      </p>
                      <p className="font-open-sans text-sm leading-relaxed text-white/70">
                        {c.problem}
                      </p>
                    </div>
                    <div className="border-l-2 border-bright-blue/60 pl-4">
                      <p className="mb-1 font-plex-mono text-xs uppercase tracking-wide text-bright-blue">
                        A solução Automis
                      </p>
                      <p className="font-open-sans text-sm leading-relaxed text-white/70">
                        {c.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results — vertical ledger so numbers never wrap */}
                  <div className="flex flex-col rounded-xl border border-bright-blue/20 bg-gradient-to-br from-bright-blue/10 to-warm-yellow/5 p-5 sm:p-6">
                    <p className="mb-2 font-plex-mono text-xs uppercase tracking-wide text-soft-blue/70">
                      Resultados estimados
                    </p>
                    <div className="flex flex-1 flex-col justify-center divide-y divide-white/10">
                      {c.results.map((r) => (
                        <div
                          key={r.label}
                          className="flex items-baseline justify-between gap-4 py-3.5 first:pt-2 last:pb-0"
                        >
                          <span className="font-open-sans text-sm leading-snug text-white/65">
                            {r.label}
                          </span>
                          <span className="whitespace-nowrap font-montserrat text-lg font-extrabold leading-none text-warm-yellow md:text-xl">
                            {r.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
