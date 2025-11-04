"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  CheckCircle2,
  PhoneCall,
  Utensils,
  ShoppingBag,
} from "lucide-react";

export default function ResultsSection() {
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
        {
          label: "ROI médio/ano",
          value: "45 000–85 000 €/ano",
        },
        {
          label: "Taxa de resposta",
          value: "12–18 %",
        },
        {
          label: "Tempo poupado/mês",
          value: "120 horas",
        },
      ],
      delay: 100,
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
        {
          label: "Poupança mensal",
          value: "2 800 €",
        },
        {
          label: "Eficiência comercial",
          value: "+65 %",
        },
        {
          label: "Taxa de fecho",
          value: "+28 %",
        },
      ],
      delay: 200,
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
        {
          label: "Poupança mensal",
          value: "1 800–2 500 €",
        },
        {
          label: "Marcações extra",
          value: "+18–25/mês",
        },
        {
          label: "Chamadas tratadas automaticamente",
          value: "85 %",
        },
      ],
      delay: 300,
    },
    {
      icon: Utensils,
      title: "Gestão de Reservas",
      sector: "Restauração, Salões, Centros de Estética",
      problem:
        "Durante o serviço de almoço/jantar o telefone toca, mas ninguém tem tempo para atender. Perdem-se 15–20 reservas por semana.",
      solution:
        "A IA atende, verifica disponibilidade em tempo real, reserva mesas, envia confirmações por WhatsApp e lembretes automáticos.",
      results: [
        {
          label: "Receita adicional",
          value: "3 200–5 500 €/mês",
        },
        {
          label: "Redução de no-shows",
          value: "–35 %",
        },
        {
          label: "Tempo libertado da equipa",
          value: "45 min/dia",
        },
      ],
      delay: 400,
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
        {
          label: "Poupança mensal",
          value: "1 900–3 200 €",
        },
        {
          label: "Pedidos resolvidos automaticamente",
          value: "70–75 %",
        },
        {
          label: "Satisfação do Cliente (CSAT)",
          value: "4,3/5",
        },
      ],
      delay: 500,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-bg-primary text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="section-heading text-white mb-4">
            Resultados Reais para Empresas Reais
          </h2>
          <p className="sub-heading max-w-3xl mx-auto">
            Eis como as empresas em Portugal utilizam a Automis para reduzir custos
            e aumentar lucros — tudo em automático.
          </p>
        </div>

        {/* Case Grid */}
        <div className="flex flex-col gap-4 md:gap-6 mb-12">
          {cases.map((c, index) => {
            const Icon = c.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-5 md:p-7 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={c.delay}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#3C91E6]/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#3C91E6] group-hover:text-yellow-light transition-all duration-300" />
                  </div>

                  {/* Title + Sector */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 break-words">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-light break-words">
                      Setor: {c.sector}
                    </p>
                  </div>
                </div>

                {/* Problem */}
                <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-4">
                  <h4 className="font-semibold text-yellow-light mb-1">
                    O Problema:
                  </h4>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {c.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-4">
                  <h4 className="font-semibold text-[#3C91E6] mb-1">
                    A Solução Automis:
                  </h4>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {c.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-[#3C91E6]/20 to-yellow-light/20 border border-[#3C91E6]/30 rounded-lg py-3 px-4">
                  <h4 className="font-semibold text-yellow-light mb-2">
                    Resultados:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    {c.results.map((r, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center"
                      >
                        <p className="text-2xl md:text-3xl font-bold text-yellow-light mb-1">
                          {r.value}
                        </p>
                        <p className="text-white/90 text-sm md:text-base">
                          {r.label}
                        </p>
                      </div>
                    ))}
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
