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
      title: "Réactivation des Leads",
      sector: "Immobilier, Automobile, Services B2B",
      problem:
        "Vous avez une base de données avec des milliers de leads qui ont montré de l’intérêt il y a des mois, mais vous n’avez pas les ressources pour tous les recontacter.",
      solution:
        "L’IA appelle automatiquement les leads dormants avec des conversations naturelles, réchauffe le contact et transfère uniquement les intéressés à votre équipe.",
      results: [
        {
          label: "ROI moyen/an",
          value: "45 000–85 000 €",
        },
        {
          label: "Taux de réponse",
          value: "12–18 %",
        },
        {
          label: "Temps économisé/mois",
          value: "120 heures",
        },
      ],
      delay: 100,
    },
    {
      icon: CheckCircle2,
      title: "Qualification des Leads",
      sector: "Immobilier, Finance, Conseil",
      problem:
        "Votre équipe perd du temps avec des leads non qualifiés. Seul 1 sur 10 est réellement prêt à acheter.",
      solution:
        "L’IA appelle chaque nouveau lead, pose des questions de qualification et transmet à votre équipe uniquement les leads chauds.",
      results: [
        {
          label: "Économies mensuelles",
          value: "2 800 €",
        },
        {
          label: "Efficacité commerciale",
          value: "+65 %",
        },
        {
          label: "Taux de conclusion",
          value: "+28 %",
        },
      ],
      delay: 200,
    },
    {
      icon: PhoneCall,
      title: "Réceptionniste Virtuel 24/7",
      sector: "Cabinets médicaux, Avocats, Centres de bien-être",
      problem:
        "Vous appelez un cabinet médical à 13 h ou après 18 h ? Messagerie. Résultat : le patient va ailleurs.",
      solution:
        "Un·e réceptionniste IA toujours disponible qui répond aux FAQ, prend des rendez-vous, envoie des confirmations SMS et met à jour l’agenda.",
      results: [
        {
          label: "Économies mensuelles",
          value: "1 800–2 500 €",
        },
        {
          label: "Rendez-vous supplémentaires",
          value: "+18–25/mois",
        },
        {
          label: "Appels gérés automatiquement",
          value: "85 %",
        },
      ],
      delay: 300,
    },
    {
      icon: Utensils,
      title: "Gestion des Réservations",
      sector: "Restauration, Salons, Centres esthétiques",
      problem:
        "Pendant le service déjeuner/dîner, le téléphone sonne mais personne n’a le temps de répondre. Vous perdez 15–20 réservations/semaine.",
      solution:
        "L’IA répond, vérifie les disponibilités en temps réel, réserve des tables, envoie des confirmations WhatsApp et des rappels automatiques.",
      results: [
        {
          label: "Revenus supplémentaires",
          value: "3 200–5 500 €/mois",
        },
        {
          label: "Réduction des no-shows",
          value: "–35 %",
        },
        {
          label: "Temps d’équipe libéré",
          value: "45 min/jour",
        },
      ],
      delay: 400,
    },
    {
      icon: ShoppingBag,
      title: "Service Client E-commerce",
      sector: "Boutiques en ligne, Dropshipping, Retail",
      problem:
        'Après-vente submergé de questions : « Où est mon colis ? » « Comment faire un retour ? » « Quelles tailles avez-vous ? »',
      solution:
        "Une IA qui répond par téléphone, suit les commandes en temps réel, gère les retours et envoie des informations produits.",
      results: [
        {
          label: "Économies mensuelles",
          value: "1 900–3 200 €",
        },
        {
          label: "Résolution automatique des demandes",
          value: "70–75 %",
        },
        {
          label: "Customer Satisfaction (CSAT)",
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
            Des Résultats Réels pour des Entreprises Réelles
          </h2>
          <p className="sub-heading max-w-3xl mx-auto">
            Voici comment les entreprises françaises utilisent Automis pour
            réduire les coûts et augmenter les profits — le tout en automatique.
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
                      Secteur : {c.sector}
                    </p>
                  </div>
                </div>

                {/* Problem */}
                <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-4">
                  <h4 className="font-semibold text-yellow-light mb-1">
                    Le Problème :
                  </h4>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {c.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-4">
                  <h4 className="font-semibold text-[#3C91E6] mb-1">
                    La Solution Automis :
                  </h4>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {c.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-[#3C91E6]/20 to-yellow-light/20 border border-[#3C91E6]/30 rounded-lg py-3 px-4">
                  <h4 className="font-semibold text-yellow-light mb-2">
                    Résultats :
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
