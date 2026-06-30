"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading, Grad } from "./_ui";

const faqs = [
  {
    question: "A IA soa robótica?",
    answer:
      "Não. Utilizamos tecnologias de text-to-speech de última geração, com vozes naturais em português, pausas realistas e expressões emocionais. Muitos clientes nem percebem que estão a falar com uma IA.",
  },
  {
    question: "Quanto tempo demora a configuração?",
    answer:
      "72 horas. A nossa equipa faz um onboarding guiado: recolhemos informação, criamos os guiões, testamos com a sua equipa e lançamos.",
  },
  {
    question: "Posso integrar com o meu CRM atual?",
    answer:
      "Sim. Dispomos de integrações nativas com HubSpot, Salesforce, Zoho, Pipedrive, Monday e softwares de gestão. API disponível para soluções personalizadas.",
  },
  {
    question: "O que acontece se a IA não compreender uma pergunta?",
    answer:
      "A IA está treinada para lidar também com questões complexas. Se surgir um pedido que não possa resolver, transfere a chamada para a sua equipa ou regista a mensagem e envia uma notificação imediata.",
  },
  {
    question: "Está em conformidade com o RGPD?",
    answer:
      "Absolutamente. Servidores na UE, encriptação ponta-a-ponta, recolha automática de consentimentos e direito ao esquecimento implementado. Fornecemos documentação completa para o encarregado de proteção de dados.",
  },
  {
    question: "Quanto custa?",
    answer:
      "O preço varia consoante a complexidade do caso. Agende uma chamada para um orçamento à medida do seu negócio.",
  },
  {
    question: "A IA pode ligar para clientes ou apenas atender chamadas?",
    answer:
      "Ambos. A IA faz chamadas de saída (reativação de leads, follow-up, lembretes) e atende chamadas recebidas. Escolhe o fluxo que prefere.",
  },
  {
    question: "Funciona para o meu setor?",
    answer:
      "Trabalhamos com imobiliário, automóvel, comércio eletrónico, escritórios profissionais, restauração, saúde, recrutamento, SaaS, logística e outros. Fale connosco para casos de estudo específicos.",
  },
  {
    question: "Posso personalizar o guião das conversas?",
    answer:
      "Sim, totalmente. No onboarding definimos consigo o tom de voz, as perguntas, as respostas às FAQs e quando transferir para a equipa humana. É o SEU assistente.",
  },
  {
    question: "O que inclui o suporte?",
    answer:
      "Apoio em português por e-mail, chat e telefone. Gestor de conta dedicado para planos Business e Enterprise. Otimização mensal dos guiões incluída.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-bright-blue/8 blur-[130px]" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="Dúvidas"
          title={
            <>
              Perguntas <Grad>frequentes</Grad>
            </>
          }
          subtitle="Tudo o que precisa de saber antes de começar com a Automis."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={index}
                className="av-gradient-border overflow-hidden rounded-xl backdrop-blur-md"
              >
                <button
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="font-plex-mono text-xs text-bright-blue/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-montserrat text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-bright-blue transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[3.25rem] font-open-sans text-[0.95rem] leading-relaxed text-white/65">
                      {faq.answer}
                    </p>
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
