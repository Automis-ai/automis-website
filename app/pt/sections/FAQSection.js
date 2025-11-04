"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

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
        "Absolutamente. Servidores na UE, encriptação ponta-a-ponta, recolha automática de consentimentos e direito ao esquecimento implementado. Fornecemos documentação completa para o DPO/encarregado de proteção de dados.",
    },
    {
      question: "Quanto custa?",
      answer:
        "O preço varia consoante a complexidade do caso. Oferecemos sempre 14 dias de experiência gratuita. Contacte-nos para um orçamento à medida.",
    },
    {
      question: "A IA pode ligar para os meus clientes potenciais ou apenas atender chamadas?",
      answer:
        "Ambos! A IA pode realizar chamadas de saída (reativação de leads, follow-up, lembretes de marcações) e atender chamadas recebidas. Escolhe o fluxo que prefere.",
    },
    {
      question: "Funciona para o meu setor?",
      answer:
        "Trabalhamos com sucesso em: imobiliário, automóvel, comércio eletrónico, escritórios profissionais, restauração, saúde, recrutamento, SaaS, logística e outros. Fale connosco para casos de estudo específicos.",
    },
    {
      question: "Posso personalizar o guião das conversas?",
      answer:
        "Sim, totalmente. No onboarding definimos consigo o tom de voz, as perguntas, as respostas às FAQs, quando transferir para a equipa humana, e muito mais. É o SEU assistente.",
    },
    {
      question: "O que inclui o suporte?",
      answer:
        "Apoio em português por e-mail, chat e telefone. Gestor de conta dedicado para os planos Business e Enterprise. Otimização mensal dos guiões incluída.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section-padding relative bg-bg-primary text-white py-24 overflow-hidden"
    >
      {/* Glow & overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-darkest/30 via-transparent to-bg-primary z-0"></div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        {/* Headline */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex justify-center items-center gap-2">
            <MessageCircleQuestion className="w-8 h-8 text-blue-400" />
            Perguntas Frequentes
          </h2>
          <p className="text-[#EAEAEA] text-lg max-w-2xl mx-auto">
            Tudo o que precisa de saber antes de começar com a Automis.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border border-blue-500/30 backdrop-blur-md bg-gradient-to-br from-blue-darkest/40 to-blue-darkest/10 py-3 px-4 transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] ${
                openIndex === index ? "scale-[1.02]" : ""
              }`}
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-400 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-blue-400 transition-transform duration-300" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-96 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-[#EAEAEA] leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
