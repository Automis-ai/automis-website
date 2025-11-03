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
      title: "Lead-Reaktivierung",
      sector: "Immobilien, Automotive, B2B-Services",
      problem:
        "Sie besitzen eine Datenbank mit tausenden Leads, die vor Monaten Interesse gezeigt haben – Ihrem Team fehlen jedoch die Ressourcen für systematisches Nachfassen.",
      solution:
        "Die KI ruft inaktive Leads automatisch an, führt natürliche Gespräche, wärmt den Kontakt auf und übergibt nur die interessierten Personen an Ihr Team.",
      results: [
        { label: "Ø-ROI/Jahr", value: "€45.000–€85.000" },
        { label: "Antwortquote", value: "12–18%" },
        { label: "Gesparte Zeit/Monat", value: "120 Std." },
      ],
      delay: 100,
    },
    {
      icon: CheckCircle2,
      title: "Lead-Qualifizierung",
      sector: "Immobilien, Finanzen, Beratung",
      problem:
        "Ihr Team verbringt viel Zeit mit nicht qualifizierten Leads. Nur 1 von 10 ist tatsächlich kaufbereit.",
      solution:
        "Die KI kontaktiert jeden neuen Lead, stellt Qualifizierungsfragen und übergibt ausschließlich vorqualifizierte Interessenten an den Vertrieb.",
      results: [
        { label: "Monatliche Einsparung", value: "€2.800" },
        { label: "Vertriebseffizienz", value: "+65%" },
        { label: "Abschlussrate", value: "+28%" },
      ],
      delay: 200,
    },
    {
      icon: PhoneCall,
      title: "Virtuelle Rezeption 24/7",
      sector: "Arztpraxen, Kanzleien, Wellnesszentren",
      problem:
        "Sie rufen eine Praxis um 13:00 Uhr oder nach 18:00 Uhr an? Nur die Mailbox. Ergebnis: PatientInnen wenden sich an andere Anbieter.",
      solution:
        "Eine jederzeit verfügbare KI-Rezeption, die FAQs beantwortet, Termine bucht, SMS-Bestätigungen sendet und den Kalender aktualisiert.",
      results: [
        { label: "Monatliche Einsparung", value: "€1.800–€2.500" },
        { label: "Zusätzliche Termine", value: "+18–25/Monat" },
        { label: "Automatisch bearbeitete Anrufe", value: "85%" },
      ],
      delay: 300,
    },
    {
      icon: Utensils,
      title: "Buchungsmanagement",
      sector: "Gastronomie, Salons, Kosmetikstudios",
      problem:
        "Während Servicezeiten klingelt das Telefon, aber niemand kann abheben. Ergebnis: 15–20 verpasste Reservierungen pro Woche.",
      solution:
        "Die KI antwortet, prüft Verfügbarkeiten in Echtzeit, bucht Tische, versendet WhatsApp-Bestätigungen und automatische Erinnerungen.",
      results: [
        { label: "Zusatzumsatz", value: "€3.200–€5.500/Monat" },
        { label: "No-Show-Reduktion", value: "–35%" },
        { label: "Freigesetzte Mitarbeiterzeit", value: "45 Min/Tag" },
      ],
      delay: 400,
    },
    {
      icon: ShoppingBag,
      title: "E-Commerce-Kundensupport",
      sector: "Online-Shops, Dropshipping, Retail",
      problem:
        'Nachverkauf überlastet durch Fragen wie: „Wo ist mein Paket?“, „Wie funktioniert die Rücksendung?“, „Welche Größen sind verfügbar?“',
      solution:
        "KI-Antworten per Telefon, Live-Tracking von Bestellungen, Retourenabwicklung und Produktinformationen – alles automatisiert.",
      results: [
        { label: "Monatliche Einsparung", value: "€1.900–€3.200" },
        { label: "Automatische Falllösung", value: "70–75%" },
        { label: "Kundenzufriedenheit (CSAT)", value: "4,3/5" },
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
            Echte Ergebnisse für echte Unternehmen
          </h2>
          <p className="sub-heading max-w-3xl mx-auto">
            So nutzen Unternehmen Automis, um Kosten zu senken und Erträge zu steigern – vollständig automatisiert.
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
                      Branche: {c.sector}
                    </p>
                  </div>
                </div>

                {/* Problem */}
                <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-4">
                  <h4 className="font-semibold text-yellow-light mb-1">
                    Das Problem:
                  </h4>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {c.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-4">
                  <h4 className="font-semibold text-[#3C91E6] mb-1">
                    Die Automis-Lösung:
                  </h4>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {c.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-[#3C91E6]/20 to-yellow-light/20 border border-[#3C91E6]/30 rounded-lg py-3 px-4">
                  <h4 className="font-semibold text-yellow-light mb-2">
                    Ergebnisse:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    {c.results.map((r, i) => (
                      <div key={i} className="flex flex-col items-center justify-center">
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
