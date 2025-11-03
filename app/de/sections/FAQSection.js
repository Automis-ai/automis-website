"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Klingt die KI robotisch?",
      answer:
        "Nein. Wir verwenden die modernsten Text-to-Speech-Technologien mit natürlichen deutschen Stimmen, realistischen Pausen und stimmigen Emotionen. Viele Anrufer merken nicht, dass sie mit einer KI sprechen.",
    },
    {
      question: "Wie lange dauert die Einrichtung?",
      answer:
        "72 Stunden. Unser Team begleitet Sie durch ein geführtes Onboarding: Informationen sammeln, Skripte erstellen, intern testen und live schalten.",
    },
    {
      question: "Kann ich mein aktuelles CRM integrieren?",
      answer:
        "Ja. Wir unterstützen native Integrationen mit HubSpot, Salesforce, Zoho, Pipedrive, Monday u. a. Zusätzlich bieten wir Anbindungen an DACH-Tools wie DATEV, lexoffice oder sevDesk. Für individuelle Systeme steht eine API zur Verfügung.",
    },
    {
      question: "Was passiert, wenn die KI eine Frage nicht versteht?",
      answer:
        "Die KI ist darauf trainiert, auch komplexe Anfragen zu verarbeiten. Falls eine Anfrage nicht automatisch lösbar ist, wird der Anruf an Ihr Team übergeben oder eine Nachricht aufgenommen und sofort als Benachrichtigung zugestellt.",
    },
    {
      question: "Ist es DSGVO-konform?",
      answer:
        "Absolut. Server in der EU, Ende-zu-Ende-Verschlüsselung, automatisierte Einwilligungen, Recht auf Löschung umgesetzt. Wir stellen vollständige Unterlagen für Ihren Datenschutzbeauftragten bereit.",
    },
    {
      question: "Wie viel kostet es?",
      answer:
        "Der Preis richtet sich nach der Komplexität Ihres Anwendungsfalls. Sie erhalten stets eine 14-tägige kostenlose Testphase. Kontaktieren Sie uns für ein individuelles Angebot.",
    },
    {
      question: "Kann die KI Leads aktiv anrufen oder nur eingehende Anrufe beantworten?",
      answer:
        "Beides. Die KI kann Outbound-Calls durchführen (Reaktivierung, Follow-ups, Termin-Erinnerungen) und eingehende Anrufe annehmen. Sie definieren die gewünschten Abläufe.",
    },
    {
      question: "Funktioniert es für meine Branche?",
      answer:
        "Ja. Erfolgreich eingesetzt in: Immobilien, Automotive, E-Commerce, Kanzleien & Praxen, Gastronomie, Healthcare, Recruiting, SaaS, Logistik u. a. Sprechen Sie uns für spezifische Case Studies an.",
    },
    {
      question: "Kann ich die Gesprächsskripte anpassen?",
      answer:
        "Ja, vollständig. Im Onboarding definieren wir gemeinsam Tonalität, Leitfragen, Antworten auf FAQs, Übergabe an das menschliche Team u. v. m. Es ist Ihr Assistent – nach Ihren Regeln.",
    },
    {
      question: "Was umfasst der Support?",
      answer:
        "Deutschsprachiger Support per E-Mail, Chat und Telefon. Für Business- und Enterprise-Pläne steht ein dedizierter Account Manager zur Verfügung. Monatliche Skript-Optimierung ist inklusive.",
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
            Häufige Fragen (FAQ)
          </h2>
          <p className="text-[#EAEAEA] text-lg max-w-2xl mx-auto">
            Alles, was Sie vor dem Start mit Automis wissen sollten.
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
