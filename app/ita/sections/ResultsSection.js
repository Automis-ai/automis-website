"use client";

import {
  Building2,
  CheckCircle2,
  PhoneCall,
  Utensils,
  ShoppingBag,
} from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

/* Numeri contenuti in intervalli credibili e presentati come stime.
   Vedi la nota sotto il titolo — verifica con i dati dei tuoi clienti prima di pubblicare. */
const cases = [
  {
    icon: Building2,
    title: "Riattivazione Lead",
    sector: "Immobiliare, Automotive, Servizi B2B",
    problem:
      "Hai un database con migliaia di lead che hanno mostrato interesse mesi fa, ma non hai le risorse per ricontattarli tutti.",
    solution:
      "L'AI chiama automaticamente i lead dormienti con conversazioni naturali, riscalda il contatto e trasferisce al tuo team solo quelli interessati.",
    results: [
      { label: "ROI potenziale/anno", value: "€15.000–€35.000" },
      { label: "Tasso di risposta", value: "8–14%" },
      { label: "Tempo risparmiato/mese", value: "15–25 h" },
    ],
  },
  {
    icon: CheckCircle2,
    title: "Qualificazione Lead",
    sector: "Immobiliare, Finanza, Consulenza",
    problem:
      "Il tuo team perde tempo con lead non qualificati. Solo 1 su 10 è veramente pronto ad acquistare.",
    solution:
      "L'AI chiama ogni nuovo lead, fa domande di qualificazione e passa al tuo team solo i lead caldi.",
    results: [
      { label: "Risparmio mensile", value: "€1.200–€2.000" },
      { label: "Efficienza vendite", value: "+30–45%" },
      { label: "Tasso di chiusura", value: "+12–20%" },
    ],
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
      { label: "Risparmio mensile", value: "€900–€1.500" },
      { label: "Appuntamenti extra", value: "+8–15/mese" },
      { label: "Chiamate gestite", value: "70–80%" },
    ],
  },
  {
    icon: Utensils,
    title: "Gestione Prenotazioni",
    sector: "Ristorazione, Saloni, Centri estetici",
    problem:
      "Durante il servizio pranzo/cena il telefono squilla, ma nessuno ha tempo per rispondere. Ogni settimana si perdono prenotazioni.",
    solution:
      "L'AI risponde, controlla la disponibilità in tempo reale, prenota i tavoli, invia conferme WhatsApp e promemoria automatici.",
    results: [
      { label: "Revenue extra/mese", value: "€1.500–€3.000" },
      { label: "Riduzione no-show", value: "–20/–30%" },
      { label: "Tempo staff liberato", value: "~30 min/giorno" },
    ],
  },
  {
    icon: ShoppingBag,
    title: "Assistenza Clienti E-commerce",
    sector: "Negozi online, Dropshipping, Retail",
    problem:
      'Post-vendita sommerso da domande: "Dov\'è il mio pacco?" "Come faccio il reso?" "Quali taglie avete?"',
    solution:
      "AI che risponde via telefono, traccia gli ordini in tempo reale, gestisce i resi e invia informazioni sui prodotti.",
    results: [
      { label: "Risparmio mensile", value: "€800–€1.600" },
      { label: "Richieste risolte in automatico", value: "60–70%" },
      { label: "Soddisfazione (CSAT)", value: "4,2/5" },
    ],
  },
];

export default function ResultsSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="resultados"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-bright-blue/10 blur-[130px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Casi d'uso"
            title={
              <>
                Risultati reali per <Grad>aziende reali</Grad>
              </>
            }
            subtitle="Ecco come diversi settori in Italia usano Automis per ridurre i costi e aumentare i ricavi — in automatico."
          />
          <p className="mx-auto mt-4 max-w-2xl text-center font-plex-mono text-xs leading-relaxed text-soft-blue/55">
            Valori stimati sulla base di casi reali. I risultati variano in base
            al settore, al volume di chiamate e alla base di contatti.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-6">
          {cases.map((c, index) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className={`av-gradient-border av-reveal group rounded-2xl p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 md:p-8 ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                {/* Header */}
                <div className="mb-6 flex items-start gap-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-bright-blue/15 transition-colors duration-300 group-hover:bg-warm-yellow/15">
                    <Icon
                      className="h-6 w-6 text-bright-blue transition-colors duration-300 group-hover:text-warm-yellow"
                      strokeWidth={2}
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-montserrat text-lg font-bold text-white md:text-xl">
                      {c.title}
                    </h3>
                    <p className="font-plex-mono text-xs uppercase tracking-wide text-soft-blue/60">
                      {c.sector}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {/* Problem + Solution */}
                  <div className="space-y-4">
                    <div className="border-l-2 border-warm-yellow/50 pl-4">
                      <p className="mb-1 font-plex-mono text-xs uppercase tracking-wide text-warm-yellow">
                        Il problema
                      </p>
                      <p className="font-open-sans text-sm leading-relaxed text-white/70">
                        {c.problem}
                      </p>
                    </div>
                    <div className="border-l-2 border-bright-blue/60 pl-4">
                      <p className="mb-1 font-plex-mono text-xs uppercase tracking-wide text-bright-blue">
                        La soluzione Automis
                      </p>
                      <p className="font-open-sans text-sm leading-relaxed text-white/70">
                        {c.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results — vertical ledger so numbers never wrap */}
                  <div className="flex flex-col rounded-xl border border-bright-blue/20 bg-gradient-to-br from-bright-blue/10 to-warm-yellow/5 p-5 sm:p-6">
                    <p className="mb-2 font-plex-mono text-xs uppercase tracking-wide text-soft-blue/70">
                      Risultati stimati
                    </p>
                    <div className="flex flex-1 flex-col justify-center divide-y divide-white/10">
                      {c.results.map((r) => (
                        <div
                          key={r.label}
                          className="flex items-baseline justify-between gap-4 py-3.5 first:pt-2 last:pb-0"
                        >
                          <span className="font-open-sans text-sm leading-snug text-white/65">
                            {r.label}
                          </span>
                          <span className="whitespace-nowrap font-montserrat text-lg font-extrabold leading-none text-warm-yellow md:text-xl">
                            {r.value}
                          </span>
                        </div>
                      ))}
                    </div>
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
