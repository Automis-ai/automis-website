"use client";

import { useEffect } from "react";
import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.querySelector("body").classList.add("home-nine");
  }, []);

  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            {}
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">Informativa sulla Privacy</h1>
              <p className="sub-heading text-white/90 mb-0">
                <i className="fas fa-shield-alt mr-2"></i>
                La tua privacy è la nostra priorità
              </p>
            </div>

            <div className="">
              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-info-circle mr-3"></i>
                  Introduzione
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8">
                  <p className="body-text text-white/90 mb-0">
                    <i className="fas fa-lock mr-2"></i>
                    Rispettiamo la tua privacy e ci impegniamo a proteggere i tuoi
                    dati personali. Questa Informativa sulla Privacy spiega come
                    raccogliamo, utilizziamo e proteggiamo i tuoi dati in
                    conformità al{" "}
                    <Link
                      href="https://gdpr-info.eu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      Regolamento Generale sulla Protezione dei Dati (GDPR)
                    </Link>{" "}
                    e al{" "}
                    <Link
                      href="https://oag.ca.gov/privacy/ccpa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      California Consumer Privacy Act (CCPA)
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-database mr-3"></i>
                  Raccolta dei dati
                </h2>
                <p className="body-text text-white/90 mb-6">
                  Potremmo raccogliere le seguenti informazioni personali:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Nome", icon: "fa-user" },
                    { title: "Indirizzo email", icon: "fa-envelope" },
                    { title: "Numero di telefono", icon: "fa-phone" },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group flex items-center">
                        <div className="w-12 h-12 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                          <i
                            className={`fas ${item.icon} text-blue-middle group-hover:text-yellow-light text-xl`}
                          ></i>
                        </div>
                        <span className="body-text text-white">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="body-text text-white/90 mt-6">
                  <i className="fas fa-info-circle mr-3"></i>
                  Questi dati vengono raccolti quando richiedi una chiamata dal nostro
                  sistema AI per testare i nostri servizi.
                </p>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-tasks mr-3"></i>
                  Come utilizziamo i tuoi dati
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { text: "Programmare call demo con l’AI", icon: "fa-calendar" },
                    { text: "Fornire supporto clienti", icon: "fa-headset" },
                    { text: "Migliorare i nostri servizi", icon: "fa-chart-line" },
                    {
                      text: "Adempiere agli obblighi di legge",
                      icon: "fa-shield-alt",
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group flex items-center">
                        <div className="w-12 h-12 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                          <i
                            className={`fas ${item.icon} text-blue-middle group-hover:text-yellow-light text-xl`}
                          ></i>
                        </div>
                        <span className="body-text text-white">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-gavel mr-3"></i>
                  Base giuridica del trattamento (GDPR)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 mb-8">
                  <h3 className="card-heading text-white mb-4">Base giuridica:</h3>
                  <ul className="list-none mb-0">
                    <li className="mb-4 flex items-center">
                      <div className="w-8 h-8 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-check-circle text-blue-middle"></i>
                      </div>
                      <div className="body-text text-white/90">
                        <span className="text-white font-semibold">Consenso:</span>{" "}
                        ci autorizzi a contattarti.
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="w-8 h-8 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-check-circle text-blue-middle"></i>
                      </div>
                      <div className="body-text text-white/90">
                        <span className="text-white font-semibold">
                          Legittimo interesse:
                        </span>{" "}
                        utilizziamo i dati per migliorare i nostri servizi.
                      </div>
                    </li>
                  </ul>
                </div>

                <h3 className="sub-heading text-white mb-6">
                  <i className="fas fa-user-shield mr-3"></i>
                  I tuoi diritti GDPR:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Accedere, correggere o cancellare i tuoi dati personali",
                    "Limitare o opporti al trattamento dei dati",
                    "Portabilità dei dati",
                    "Revocare il consenso in qualsiasi momento",
                  ].map((right, index) => (
                    <div key={index}>
                      <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group flex items-center">
                        <div className="w-12 h-12 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fas fa-shield-alt text-blue-middle group-hover:text-yellow-light text-xl"></i>
                        </div>
                        <span className="body-text text-white">{right}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-balance-scale mr-3"></i>
                  I tuoi diritti CCPA
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8">
                  <p className="body-text text-white/90 mb-6">
                    Se sei residente in California, hai il diritto di:
                  </p>
                  <ul className="list-none mb-0">
                    {[
                      "Sapere quali dati personali vengono raccolti",
                      "Richiedere la cancellazione dei tuoi dati",
                      "Opporti alla vendita dei tuoi dati personali (non vendiamo dati personali)",
                    ].map((right, index) => (
                      <li key={index} className="mb-4 flex items-center">
                        <div className="w-8 h-8 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-check-square text-blue-middle"></i>
                        </div>
                        <span className="body-text text-white/90">{right}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-8">
                  <i className="fas fa-shield-alt mr-3"></i>
                  Sicurezza e gestione dei dati
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-lock text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Sicurezza dei dati</h3>
                      <p className="body-text text-white/90 mb-0">
                        Adottiamo misure adeguate per proteggere i tuoi dati personali da
                        accessi non autorizzati, perdita o uso improprio.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-cookie text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Cookie</h3>
                      <p className="body-text text-white/90 mb-0">
                        Potremmo utilizzare cookie per migliorare la tua esperienza. Puoi
                        gestire i cookie dalle impostazioni del browser.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-share-alt text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Condivisione con terze parti</h3>
                      <p className="body-text text-white/90 mb-0">
                        Non vendiamo né condividiamo i tuoi dati personali con terze parti,
                        salvo fornitori di servizi essenziali.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div>
                <h2 className="section-heading text-white mb-8">
                  <i className="fas fa-envelope mr-3"></i>
                  Contatti e aggiornamenti
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-envelope text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Contattaci</h3>
                      <p className="body-text text-white/90 mb-6">
                        Per domande o per esercitare i tuoi diritti, contattaci a:
                      </p>
                      <a
                        href="mailto:support@automis.ai"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-light text-bg-primary rounded-lg font-semibold hover:bg-yellow-dark transition-all duration-300"
                      >
                        <i className="fas fa-envelope"></i>
                        support@automis.ai
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-bell text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Aggiornamenti dell’informativa</h3>
                      <p className="body-text text-white/90 mb-0">
                        <i className="fas fa-info-circle mr-3"></i>
                        Potremmo aggiornare periodicamente questa informativa. In caso di
                        modifiche significative, verrai informato.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default PrivacyPolicy;
