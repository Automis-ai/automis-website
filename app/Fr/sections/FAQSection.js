"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "L’IA sonne-t-elle robotique ?",
      answer:
        "Non. Nous utilisons les technologies de synthèse vocale les plus avancées, avec des voix françaises naturelles, des pauses réalistes et des expressions émotionnelles. La plupart des clients ne réalisent même pas qu’ils parlent à une IA.",
    },
    {
      question: "Combien de temps faut-il pour configurer le système ?",
      answer:
        "72 heures. Notre équipe vous accompagne étape par étape : collecte des informations, création des scripts, tests avec votre équipe, puis lancement.",
    },
    {
      question: "Puis-je l’intégrer à mon CRM actuel ?",
      answer:
        "Oui. Nous proposons des intégrations natives avec HubSpot, Salesforce, Zoho, Pipedrive, Monday, ainsi qu’avec des logiciels français tels que EBP, Sellsy et autres. Une API est disponible pour les logiciels personnalisés.",
    },
    {
      question: "Que se passe-t-il si l’IA ne comprend pas une question ?",
      answer:
        "L’IA est entraînée pour gérer des demandes complexes. Si elle rencontre une requête qu’elle ne peut pas résoudre, elle transfère l’appel à votre équipe ou prend un message et envoie une notification immédiate.",
    },
    {
      question: "Est-elle conforme au RGPD ?",
      answer:
        "Absolument. Serveurs dans l’UE, chiffrement de bout en bout, consentements automatiques et droit à l’oubli intégrés. Nous fournissons une documentation complète pour votre délégué à la protection des données.",
    },
    {
      question: "Combien ça coûte ?",
      answer:
        "Le tarif varie selon la complexité de votre cas. Nous offrons toujours 14 jours d’essai gratuit. Contactez-nous pour un devis personnalisé.",
    },
    {
      question: "L’IA peut-elle appeler mes leads ou seulement répondre ?",
      answer:
        "Les deux ! L’IA peut effectuer des appels sortants (relance de leads, suivi, rappels de rendez-vous) et répondre aux appels entrants. Vous choisissez le flux.",
    },
    {
      question: "Est-ce que cela fonctionne pour mon secteur ?",
      answer:
        "Nous travaillons avec succès dans les secteurs : immobilier, automobile, e-commerce, cabinets professionnels, restauration, santé, recrutement, SaaS, logistique et plus encore. Contactez-nous pour des études de cas spécifiques.",
    },
    {
      question: "Puis-je personnaliser le script des conversations ?",
      answer:
        "Oui, entièrement. Pendant l’onboarding, nous définissons ensemble : ton de voix, questions à poser, réponses aux FAQ, moments de transfert à l’équipe humaine, et plus encore. C’est VOTRE assistant.",
    },
    {
      question: "Que comprend le support ?",
      answer:
        "Assistance en français par email, chat et téléphone. Un account manager dédié pour les plans Business et Enterprise. Optimisation mensuelle des scripts incluse.",
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
            Questions Fréquentes
          </h2>
          <p className="text-[#EAEAEA] text-lg max-w-2xl mx-auto">
            Tout ce que vous devez savoir avant de commencer avec Automis.
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
