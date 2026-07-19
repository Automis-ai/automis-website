"use client";
import { useState } from "react";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Qual a diferença entre a chamada gratuita e a auditoria paga?",
    a: "A chamada de diagnóstico gratuita de 30 minutos é o primeiro passo, de baixo atrito: uma conversa rápida para mapear os seus pontos críticos principais e ver o que é possível, sem custos e sem compromisso. A Jumpstart Audit (1.450 euros) é a análise profunda: duas auditorias completas, um plano e uma previsão prontos para a gestão, e uma automação quick win ativada em live em 14 dias.",
  },
  {
    q: "Com que rapidez veremos impacto?",
    a: "Em 14 dias na auditoria paga. Até ao dia 10 terá baseline, mapa de onde perde e uma shortlist prioritária. No dia 14 ativamos o seu quick win em live, para que termine a chamada final com algo já operacional. Sinais iniciais típicos: speed-to-lead mais rápido, recuperação de chamadas perdidas, ou mais respostas e marcações a partir de reminders e reativações, consoante o quick win que instalamos.",
  },
  {
    q: "São vocês que executam o plano a 90 dias?",
    a: "Sim, se assim o desejar. A auditoria é completa por si só: recebe plano, previsões e pacote de entrega. Se quiser que seja a nossa equipa a implementar, oferecemos um retainer e creditamos 500 euros do custo da auditoria se começar em 14 dias. Em qualquer caso, o seu quick win inclui 14 dias de suporte, para continuar a gerar resultados.",
  },
  {
    q: "Que acessos precisam?",
    a: "Acessos apenas de leitura para analisar sem alterar nada. Plataformas de ads (Google, Meta, LinkedIn, em vista), CRM (estados dos contactos, timestamps, resultados, export ou vista), sistema telefónico e registos de chamadas (chamadas perdidas, métricas base, gravações opcionais) e calendário ou scheduling (marcações e no-shows, vista ou API). Além disso, um ponto de contacto para perguntas e aprovações rápidas. Fornecemos uma checklist curta no kickoff.",
  },
  {
    q: "Saúde ou conformidade? Os meus dados estão seguros?",
    a: "Sim. Suportamos configurações conformes ao RGPD onde for preciso. Desenhamos as automações para minimizar a exposição dos dados, limitar a retenção e usar canais seguros, com opções como nenhuma gravação ou transcrições editadas, acessos de privilégio mínimo e linguagem de consentimento clara. Sinalizamos o que é seguro e o que não é no seu stack e partilhamos uma checklist de conformidade a pedido.",
  },
  {
    q: "E se não nos conseguirem ajudar?",
    a: "Reduzimos o risco com duas salvaguardas. Garantia de Elegibilidade (kickoff): se descobrirmos que os seus dados ou o seu stack não nos permitem mover os KPIs principais de forma significativa, reembolsamos logo. Garantia de Clareza (final): se a auditoria não traçar um caminho baseado nos dados até uma redução de custos de 10%, um aumento das marcações de 5% ou 10 horas por semana poupadas, reembolsamos a auditoria. As garantias exigem acessos atempados apenas de leitura e dados históricos rigorosos.",
  },
];

export default function JumpstartFaqPT() {
  const [open, setOpen] = useState(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq" className="bg-deep-blue" inner="max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SectionHeading eyebrow="FAQ" title={<>Respostas antes de reservar</>} />
      <div className="mt-12 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 50}>
              <div className={`overflow-hidden rounded-xl border transition-colors ${isOpen ? "border-[#3C91E6]/30 bg-white/[0.04]" : "border-white/[0.08] bg-white/[0.02]"}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[15.5px] font-semibold text-white">{f.q}</span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-[#8fe0f0] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-white/60">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
