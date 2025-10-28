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
      title: "Riattivazione Lead",
      sector: "Immobiliare, Automotive, B2B Services",
      problem:
        "Hai un database con migliaia di lead che hanno mostrato interesse mesi fa ma non hai le risorse per ricontattarli tutti.",
      solution:
        "L'AI chiama automaticamente i lead dormienti con conversazioni naturali, riscalda il contatto e trasferisce solo quelli interessati al tuo team.",
      results: [
        "💰 ROI medio: €45.000–€85.000/anno (dipende dal valore medio vendita)",
        "📈 Tasso di risposta: 12–18% (vs 3–5% email)",
        "⏱️ Tempo risparmiato: 120 ore/mese del team commerciale",
      ],
      delay: 100,
    },
    {
      icon: CheckCircle2,
      title: "Qualificazione Lead",
      sector: "Real Estate, Finanza, Consulenza",
      problem:
        "Il tuo team perde tempo con lead non qualificati. Solo 1 su 10 è veramente pronto ad acquistare.",
      solution:
        "L'AI chiama ogni nuovo lead, fa domande di qualificazione e passa al tuo team solo i lead caldi.",
      results: [
        "💰 Risparmio: €2.800/mese in tempo squadra commerciale",
        "📈 Efficienza: +65% di tempo vendita dedicato a lead qualificati",
        "🎯 Tasso chiusura: +28% su lead pre-qualificati dall'AI",
      ],
      delay: 200,
    },
    {
      icon: PhoneCall,
      title: "Receptionist Virtuale 24/7",
      sector: "Studi medici, Avvocati, Centri benessere",
      problem:
        "Chiami uno studio medico alle 13:00 o dopo le 18:00? Segreteria. Risultato: il paziente va altrove.",
      solution:
        "Receptionist AI sempre disponibile che risponde alle FAQ, prenota appuntamenti, invia conferme SMS e aggiorna il calendario.",
      results: [
        "💰 Risparmio: €1.800–€2.500/mese (vs receptionist part-time)",
        "📅 Appuntamenti extra: +18–25/mese da fuori orario",
        "📞 Chiamate gestite: 85% risolte senza intervento umano",
      ],
      delay: 300,
    },
    {
      icon: Utensils,
      title: "Gestione Prenotazioni Ristoranti",
      sector: "Ristorazione, Saloni, Centri estetici",
      problem:
        "Durante il servizio pranzo/cena il telefono squilla, ma nessuno ha tempo per rispondere. Perdi 15–20 prenotazioni/settimana.",
      solution:
        "L'AI risponde, controlla disponibilità in tempo reale, prenota tavoli, invia conferme WhatsApp e promemoria automatici.",
      results: [
        "💰 Revenue extra: €3.200–€5.500/mese da prenotazioni recuperate",
        "📉 No-show ridotti: –35% grazie a reminder automatici",
        "⏱️ Tempo staff liberato: 45 minuti/giorno",
      ],
      delay: 400,
    },
    {
      icon: ShoppingBag,
      title: "Assistenza Clienti E-commerce",
      sector: "Negozi online, Dropshipping, Retail",
      problem:
        'Post-vendita sommerso da domande: "Dov’è il mio pacco?" "Come faccio il reso?" "Quali taglie avete?"',
      solution:
        "AI che risponde via telefono, traccia ordini in real-time, gestisce resi e invia info prodotti.",
      results: [
        "💰 Risparmio: €1.900–€3.200/mese in customer support",
        "⚡ Risoluzione: 70–75% domande gestite senza operatore umano",
        "😊 CSAT Score: 4.3/5 (vs 3.8/5 con solo operatori)",
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
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="section-heading text-white mb-4">
            Risultati Reali per Business Reali
          </h2>
          <p className="sub-heading max-w-3xl mx-auto">
            Ecco come le aziende italiane stanno usando Automis per ridurre i
            costi e aumentare i profitti — tutto in automatico.
          </p>
        </div>

        {/* Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {cases.map((c, index) => {
            const Icon = c.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-[#B4C2FF]/15 rounded-xl p-6 lg:p-8 hover:bg-yellow-light/10 hover:border-yellow-light/30 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={c.delay}
              >
                <div className="w-14 h-14 bg-[#3C91E6]/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-light/20 transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#3C91E6] group-hover:text-yellow-light transition-all duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-blue-light mb-4">
                  Settore: {c.sector}
                </p>
                <div className="text-white/90 text-base leading-relaxed space-y-3">
                  <p>
                    <strong>Il Problema:</strong> {c.problem}
                  </p>
                  <p>
                    <strong>La Soluzione Automis:</strong> {c.solution}
                  </p>
                  <div>
                    <strong>Risultati:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {c.results.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
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
