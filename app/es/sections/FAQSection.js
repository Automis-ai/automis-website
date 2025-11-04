"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿La IA suena robótica?",
      answer:
        "No. Utilizamos las tecnologías de texto a voz más avanzadas con voces naturales en español, pausas realistas y expresiones emocionales. Muchos clientes ni siquiera notan que están hablando con una IA.",
    },
    {
      question: "¿Cuánto tiempo se necesita para configurar el sistema?",
      answer:
        "72 horas. Nuestro equipo realiza una incorporación guiada: recopilamos la información, creamos los guiones, probamos con tu equipo y lanzamos.",
    },
    {
      question: "¿Puedo integrarlo con mi CRM actual?",
      answer:
        "Sí. Contamos con integraciones nativas con HubSpot, Salesforce, Zoho, Pipedrive, Monday, y sistemas europeos como TeamSystem o Holded. API disponible para software personalizado.",
    },
    {
      question: "¿Qué ocurre si la IA no entiende una pregunta?",
      answer:
        "La IA está entrenada para gestionar incluso preguntas complejas. Si se encuentra con una solicitud que no puede resolver, transfiere la llamada a tu equipo o deja un mensaje y envía una notificación inmediata.",
    },
    {
      question: "¿Cumple con el GDPR?",
      answer:
        "Por supuesto. Servidores en la UE, cifrado de extremo a extremo, consentimiento automático y derecho al olvido implementado. Proporcionamos documentación completa para tu responsable de protección de datos.",
    },
    {
      question: "¿Cuál es el precio?",
      answer:
        "El precio varía según la complejidad del caso. Siempre ofrecemos 14 días de prueba gratuita. Contáctanos para una propuesta personalizada.",
    },
    {
      question: "¿La IA puede llamar a mis leads o solo responder llamadas?",
      answer:
        "¡Ambas cosas! La IA puede realizar llamadas salientes (reactivación de leads, seguimiento, recordatorios de citas) y responder llamadas entrantes. Tú eliges el flujo.",
    },
    {
      question: "¿Funciona en mi sector?",
      answer:
        "Trabajamos con éxito en inmobiliarias, automoción, e-commerce, despachos profesionales, restauración, sanidad, selección de personal, SaaS, logística y más. Pídenos casos de éxito específicos.",
    },
    {
      question: "¿Puedo personalizar los guiones de conversación?",
      answer:
        "Sí, completamente. Durante la incorporación definimos juntos el tono de voz, las preguntas, las respuestas a las FAQ, cuándo transferir al equipo humano y mucho más. Es TU asistente.",
    },
    {
      question: "¿Qué incluye el soporte?",
      answer:
        "Asistencia en español por correo electrónico, chat y teléfono. Gestor de cuenta dedicado para los planes Business y Enterprise. Optimización mensual de guiones incluida.",
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
      {/* Efecto de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-darkest/30 via-transparent to-bg-primary z-0"></div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex justify-center items-center gap-2">
            <MessageCircleQuestion className="w-8 h-8 text-blue-400" />
            Preguntas Frecuentes
          </h2>
          <p className="text-[#EAEAEA] text-lg max-w-2xl mx-auto">
            Todo lo que necesitas saber antes de empezar con Automis.
          </p>
        </div>

        {/* Acordeón */}
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
