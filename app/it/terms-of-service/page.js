"use client";

import { useEffect } from "react";
import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import CTAButton from "@/components/CTAButton";

const TermsOfService = () => {
  useEffect(() => {
    document.querySelector("body").classList.add("home-nine");
  }, []);

  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">Termini di Servizio</h1>
              <p className="sub-heading text-white/90">
                <i className="fas fa-file-contract mr-2"></i>
                Ti invitiamo a leggere attentamente questi termini
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-info-circle mr-3"></i>
                  Introduzione
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Accedendo e utilizzando il nostro sito web e i nostri servizi, accetti i seguenti termini e condizioni.
                    Questi Termini di Servizio (TOS) regolano l’utilizzo delle nostre soluzioni di Voice AI per le aziende.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-cogs mr-3"></i>
                  Servizi offerti
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "Gestione chiamate in entrata e in uscita",
                    "Prenotazione appuntamenti",
                    "Risposta alle richieste dei clienti",
                  ].map((service, index) => (
                    <div key={index}>
                      <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 h-full hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                        <div className="flex items-center mb-4">
                          <h3 className="card-heading text-white">{service}</h3>
                        </div>
                        <p className="body-text text-white/90">
                          Soluzioni Voice AI ottimizzate per le esigenze del tuo business
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-user-shield mr-3"></i>
                  Obblighi dell’utente
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Utilizzando i nostri servizi, accetti di non fare un uso improprio della piattaforma.
                    Sei responsabile della fornitura di informazioni accurate, inclusi email e numeri di telefono
                    per le richieste di demo.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-lock mr-3"></i>
                  Privacy
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Le tue informazioni personali saranno trattate come descritto nella nostra
                    <Link
                      href="/privacy-policy"
                      className="text-blue-middle hover:text-yellow-light mx-1 transition-all duration-300"
                    >
                      Informativa sulla Privacy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-credit-card mr-3"></i>
                  Pagamenti
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Se scegli di utilizzare servizi a pagamento, accetti i termini di pagamento indicati sulla nostra piattaforma.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-exclamation-triangle mr-3"></i>
                  Restrizioni d’uso
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Gli utenti non possono utilizzare i nostri servizi per scopi illegali o attività non autorizzate,
                    inclusi spam, frodi o comportamenti abusivi.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-shield-alt mr-3"></i>
                  Limitazione di responsabilità
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Non siamo responsabili per eventuali danni derivanti dall’utilizzo dei nostri servizi.
                    La piattaforma è fornita “così com’è” e non garantiamo un servizio ininterrotto.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-ban mr-3"></i>
                  Cessazione
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Ci riserviamo il diritto di terminare o sospendere l’accesso ai nostri servizi
                    se violi uno qualsiasi di questi termini.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-sync mr-3"></i>
                  Modifiche ai termini
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Potremmo aggiornare questi termini di volta in volta. Eventuali modifiche verranno pubblicate su questa pagina
                    e l’uso continuato dei nostri servizi costituisce accettazione dei termini aggiornati.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-gavel mr-3"></i>
                  Legge applicabile
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    I presenti Termini di Servizio sono disciplinati dalle leggi dell’Estonia.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-envelope mr-3"></i>
                  Contattaci
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-6">
                    Per qualsiasi domanda o dubbio riguardo a questi Termini di Servizio, contattaci a:
                  </p>
                  <CTAButton href="mailto:support@automis.ai" variant="primary" size="medium" external>
                    <i className="fas fa-envelope mr-2"></i>
                    support@automis.ai
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default TermsOfService;