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
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">PRIVACY POLICY</h1>
              <p className="sub-heading text-white/90 mb-2">
                Automis — AI & Marketing Agency
              </p>
              <p className="body-text text-white/70">
                Ultimo aggiornamento: 30 marzo 2026
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Sezione 1 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">1.</span>
                  Introduzione e Titolare del trattamento
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    La presente Privacy Policy descrive come <span className="font-bold">Automis</span> (“noi”, “nostro” o “la Società”), registrata in Estonia (n. Registrazione <span className="font-bold">17179196</span>), con sede legale in <span className="font-bold">Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span>, raccoglie, utilizza, conserva e protegge i dati personali nell’ambito dei propri servizi.
                  </p>
                  <p className="body-text text-white/90 mb-4">
                    Automis è un’AI & Marketing Agency che fornisce servizi di gestione campagne pubblicitarie, agenti vocali AI, automazione dei workflow, automazione social media e consulenza. A seconda del servizio e del contesto, Automis può operare come:
                  </p>
                  <ul className="body-text text-white/90 space-y-3 mb-4">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 font-semibold">•</span>
                      <span><span className="font-semibold">Titolare del trattamento</span> — per i dati raccolti direttamente dai visitatori del sito, dai potenziali clienti e da chi interagisce con le nostre piattaforme (es. prenotazione discovery call, download audit, contatti).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 font-semibold">•</span>
                      <span><span className="font-semibold">Responsabile del trattamento (Data Processor)</span> — per i dati trattati per conto dei nostri Clienti nell’erogazione dei servizi di automazione (es. risposte a commenti/DM sulle pagine Meta del Cliente, gestione chiamate per conto del Cliente, gestione dati CRM del Cliente).</span>
                    </li>
                  </ul>
                  <p className="body-text text-white/90">
                    Questa policy è conforme al <Link href="https://gdpr-info.eu/" target="_blank" rel="noopener noreferrer">Regolamento Generale sulla Protezione dei Dati (GDPR)</Link>, al <Link href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer">California Consumer Privacy Act (CCPA)</Link>, e ai <Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer">Meta Platform Terms</Link> e <Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer">Developer Policies</Link> applicabili.
                  </p>
                </div>
              </div>

              {/* Sezione 2 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">2.</span>
                  Categorie di dati personali raccolti
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.1 Dati raccolti direttamente dall’utente</h3>
                    <p className="body-text text-white/90 mb-4">
                      Quando visiti il nostro sito, prenoti una discovery call, richiedi un Jumpstart Audit o ci contatti, possiamo raccogliere:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Nome e cognome</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Indirizzo email</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Numero di telefono</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Nome azienda, ruolo e settore</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Informazioni fornite durante discovery call, workshop o richieste di audit</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Dati di fatturazione e pagamento (gestiti da provider di pagamento terzi)</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.2 Dati trattati tramite API Meta (per conto dei Clienti)</h3>
                    <p className="body-text text-white/90 mb-4">
                      Nell’ambito del <span className="font-bold">Servizio di Automazione Social Media</span> (risposte automatiche a commenti e DM su Facebook e Instagram), tramite le API ufficiali di Meta (Instagram Graph API, Facebook Pages API, Messenger API), trattiamo:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Dati del profilo pubblico:</span> username, ID Meta, nome visualizzato, immagine del profilo</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Contenuto dei commenti:</span> testo dei commenti pubblicati sotto i post del Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Contenuto dei messaggi diretti (DM):</span> messaggi inviati dagli utenti alla pagina/profilo del Cliente via Instagram Direct o Facebook Messenger</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Metadati di interazione:</span> timestamp, tipo di interazione, ID del contenuto</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Insight della pagina/profilo:</span> metriche aggregate di performance (reach, engagement) dove accessibili via API</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.3 Dati trattati tramite servizi Voice AI (per conto dei Clienti)</h3>
                    <p className="body-text text-white/90 mb-4">
                      Nell’ambito del <span className="font-bold">Servizio Voice AI</span> (gestione chiamate in entrata e uscita tramite agenti vocali AI), possiamo trattare:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Audio e trascrizioni delle chiamate:</span> registrazioni e/o trascrizioni in tempo reale delle chiamate gestite dai nostri agenti vocali AI per conto del Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Informazioni del chiamante:</span> numero di telefono, nome (se fornito), informazioni condivise durante la chiamata (es. richieste appuntamento, informazioni su servizi)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Metadati della chiamata:</span> durata, timestamp, esito (prenotato, trasferito, segreteria)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati di scheduling:</span> dettagli appuntamento, disponibilità calendario, conferme prenotazione</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.4 Dati trattati tramite AI Automations (per conto dei Clienti)</h3>
                    <p className="body-text text-white/90 mb-4">
                      Nell’ambito del <span className="font-bold">Servizio di Automazione AI</span> (qualificazione lead, nurturing, sincronizzazione CRM, automazione workflow), possiamo trattare:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati dei lead:</span> nome, email, telefono, fonte, stato qualificazione, lead score</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Record CRM:</span> dati di contatto, storico interazioni, stadi pipeline/deal sincronizzati con il CRM del Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati di comunicazione:</span> contenuto di SMS, messaggi WhatsApp ed email automatiche inviate per conto del Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati di workflow:</span> eventi trigger, log automazione, assegnazioni task</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.5 Dati trattati tramite Gestione Ads (per conto dei Clienti)</h3>
                    <p className="body-text text-white/90 mb-4">
                      Nell’ambito del <span className="font-bold">Servizio di Gestione Campagne Pubblicitarie</span>, possiamo accedere e trattare:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati account pubblicitari:</span> metriche di performance, spesa pubblicitaria, insight audience, dati conversione tramite API di Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads e altre piattaforme</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati pixel/tracking:</span> dati di comportamento visitatori raccolti tramite pixel pubblicitari configurati sul sito del Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati moduli lead:</span> informazioni inviate dagli utenti tramite moduli lead generation sulle piattaforme pubblicitarie</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.6 Dati tecnici</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Indirizzo IP, tipo di browser, sistema operativo, informazioni dispositivo</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Cookie e tecnologie di tracciamento simili (vedi Sezione 12)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Log di utilizzo del sito e dati analytics</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sezione 3 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">3.</span>
                  Finalità del trattamento
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">3.1 Dati raccolti direttamente</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Erogazione dei servizi richiesti (discovery call, audit, consulenza)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Comunicazioni commerciali e di marketing (con consenso)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Miglioramento del sito e dei servizi</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Adempimento di obblighi legali e contrattuali</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Prevenzione frodi e sicurezza</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">3.2 Dati trattati per conto dei Clienti</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Automazione social media:</span> invio risposte automatiche a commenti e DM su Facebook/Instagram via API ufficiali Meta</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Voice AI:</span> gestione chiamate in entrata/uscita, prenotazione appuntamenti, qualificazione lead, supporto clienti tramite agenti vocali AI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Qualificazione e nurturing lead:</span> screening, scoring e follow-up automatici</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Sincronizzazione CRM:</span> mantenimento dati CRM aggiornati e accurati tra piattaforme</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Gestione appuntamenti:</span> prenotazione, conferma, riprogrammazione e promemoria automatici</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Ottimizzazione campagne ads:</span> analisi performance, comportamento audience e dati conversione per migliorare il ROI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Reportistica:</span> generazione report di performance e analytics per i Clienti</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sezione 4 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">4.</span>
                  Base giuridica del trattamento (GDPR)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Il trattamento dei dati personali si basa sulle seguenti basi giuridiche ai sensi dell’Art. 6 GDPR:
                  </p>
                  <ul className="body-text text-white/90 space-y-3">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Consenso (Art. 6.1.a):</span> per comunicazioni marketing, demo call, newsletter e materiale promozionale. Il consenso può essere revocato in qualsiasi momento.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Esecuzione di un contratto (Art. 6.1.b):</span> per l’erogazione dei servizi richiesti e l’adempimento degli obblighi contrattuali.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Legittimo interesse (Art. 6.1.f):</span> per il miglioramento dei servizi, la sicurezza dei sistemi, la prevenzione di abusi e l’analisi dei dati. Quando operiamo come Responsabile del trattamento, il legittimo interesse è del Cliente (Titolare).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Obbligo legale (Art. 6.1.c):</span> per adempiere a obblighi fiscali, contabili e normativi.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sezione 5 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">5.</span>
                  Condivisione dei dati e sub-responsabili
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.1 Fornitori di piattaforma</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Meta Platforms, Inc.:</span> in qualità di piattaforma tramite cui i dati social media vengono raccolti e trasmessi via API. Meta tratta i dati secondo la propria Privacy Policy e i propri Terms of Service.</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Google</span> (Google Ads, Google Calendar): per gestione campagne e integrazioni calendario</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">TikTok, LinkedIn, X (Twitter):</span> per gestione campagne sulle rispettive piattaforme, ove applicabile</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.2 Fornitori di tecnologia e infrastruttura</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">n8n</span> (n8n GmbH / n8n Cloud): piattaforma di workflow automation</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">ElevenLabs:</span> fornitore di sintesi vocale AI per i servizi Voice AI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">GoHighLevel / LeadConnector:</span> piattaforma CRM e marketing automation</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Vercel, GitHub, Supabase:</span> infrastruttura e hosting</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Twilio:</span> infrastruttura telefonica per Voice AI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Calendly, Cal.com, Google:</span> servizi di scheduling e prenotazione</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.3 Altri destinatari</h3>
                    <ul className="body-text text-white/90 space-y-2 mb-4">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Consulenti professionali</span>: commercialisti, avvocati e consulenti legali, nei limiti strettamente necessari</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Autorità di legge o di regolamentazione</span>: quando richiesto dalla legge applicabile</span></li>
                    </ul>
                    <p className="font-bold text-white/90">
                      Non vendiamo, affittiamo o cediamo dati personali a terzi per finalità di marketing diretto di tali terzi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sezione 6 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">6.</span>
                  Trasferimento internazionale dei dati
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Alcuni dei nostri sub-responsabili (tra cui Meta Platforms, Inc., Google LLC, ElevenLabs) hanno sede negli Stati Uniti o in altri paesi al di fuori dello Spazio Economico Europeo (SEE). I trasferimenti avvengono sulla base di garanzie adeguate ai sensi dell’Art. 46 GDPR (Standard Contractual Clauses), decisioni di adeguatezza della Commissione Europea ove applicabili, o il consenso esplicito dell’interessato.
                  </p>
                </div>
              </div>

              {/* Sezione 7 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">7.</span>
                  Conservazione dei dati
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    I dati vengono conservati per i seguenti periodi:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold"> Dati di contatto e commerciali </span>: per la durata del rapporto contrattuale e per i successivi 2 anni come richiesto dalla normativa fiscale e contabile.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati trattati via API Meta</span>: conservati per il tempo strettamente necessario all’erogazione del servizio. Al termine del contratto, cancellati entro 60 giorni, salvo diverso obbligo di legge.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Registrazioni e trascrizioni Voice AI</span>: conservate per 90 giorni dalla chiamata, poi eliminate automaticamente, salvo diversa richiesta del Cliente.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati lead e CRM</span>: per la durata dell’incarico. Cancellati entro 90 giorni dalla cessazione del contratto.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati account pubblicitari</span>: i report sono conservati per la durata dell’incarico più 3 mesi. I dati grezzi delle piattaforme non vengono conservati a lungo termine da Automis.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Analytics e log del sito</span>: massimo 12 mesi.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dati marketing (basati su consenso)</span>: fino alla revoca del consenso.</span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    In conformità con i Meta Platform Terms, alla cessazione dell’utilizzo delle API Meta o su richiesta di Meta, cancelleremo tutti i Platform Data senza ingiustificato ritardo.
                  </p>
                </div>
              </div>

              {/* Sezione 8 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">8.</span>
                  Diritti dell’interessato (GDPR)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Ai sensi del GDPR, hai il diritto di:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Accesso:</span> ottenere conferma del trattamento e una copia dei tuoi dati personali.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Rettifica:</span> richiedere la correzione di dati inesatti o incompleti.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Cancellazione:</span> richiedere la cancellazione dei tuoi dati (“diritto all’oblio”).</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Limitazione:</span> richiedere la limitazione del trattamento in determinati casi.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Portabilità:</span> ricevere i tuoi dati in formato strutturato, di uso comune e leggibile da dispositivo automatico.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Opposizione:</span> opporti al trattamento basato su legittimo interesse.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Revoca del consenso:</span> ritirare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente.</span></li>
                  </ul>
                  <p className="body-text text-white/90 mb-4">
                    Per esercitare i tuoi diritti, contattaci a: support@automis.ai. Risponderemo entro 30 giorni.
                  </p>
                  <p className="body-text text-white/90">
                    Hai inoltre il diritto di proporre reclamo all’autorità di controllo competente (<Link href="https://www.aki.ee/en" target="_blank" rel="noopener noreferrer">Estonian Data Protection Inspectorate</Link> o l’autorità del tuo paese di residenza).
                  </p>
                </div>
              </div>

              {/* Sezione 9 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">9.</span>
                  Diritti aggiuntivi per residenti in California (CCPA)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Se sei residente in California, hai il diritto di: conoscere quali informazioni personali raccogliamo, richiedere la cancellazione dei tuoi dati e non subire discriminazioni per l’esercizio di questi diritti. Non vendiamo dati personali ai sensi del CCPA.
                  </p>
                </div>
              </div>

              {/* Sezione 10 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">10.</span>
                  Sicurezza dei dati
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali, tra cui:
                  </p>
                  <ul className="body-text text-white/90 space-y-2">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Crittografia TLS/SSL per i dati in transito</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Accesso limitato al personale autorizzato</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Monitoraggio e logging degli accessi</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Backup regolari e procedure di disaster recovery</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Revisione periodica delle misure di sicurezza</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Conformità ai requisiti di sicurezza di cui alla Sezione 6 dei Meta Platform Terms</span></li>
                  </ul>
                </div>
              </div>

              {/* Sezione 11 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">11.</span>
                  Ruolo di Automis nel trattamento dei dati
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Quando forniamo servizi di automazione per conto dei nostri Clienti:
                  </p>
                  <ul className="body-text text-white/90 space-y-3 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Il Cliente è il Titolare del trattamento</span> nei confronti degli utenti finali che interagiscono con le sue pagine, profili, linee telefoniche o moduli.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Automis agisce come Responsabile del trattamento</span>, trattando i dati esclusivamente secondo le istruzioni del Cliente e in conformità con il contratto e il Data Processing Agreement (DPA) sottoscritto tra le parti.</span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    Per domande su come un’azienda specifica tratta i tuoi dati tramite la propria pagina Facebook/Instagram, sistema telefonico o sito web, contatta direttamente quell’azienda.
                  </p>
                </div>
              </div>

              {/* Sezione 12 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">12.</span>
                  Cookie
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Il nostro sito utilizza cookie tecnici necessari e, previo consenso, cookie analitici e di profilazione. Puoi gestire le tue preferenze tramite le impostazioni del browser o il nostro banner cookie.
                  </p>
                </div>
              </div>

              {/* Sezione 13 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">13.</span>
                  Riferimenti alle policy di terze parti
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    I dati degli utenti sulle piattaforme di terze parti vengono trattati anche da tali piattaforme secondo le proprie policy:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://www.facebook.com/terms/" target="_blank" rel="noopener noreferrer">Meta Terms of Service</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://help.instagram.com/581066165581870" target="_blank" rel="noopener noreferrer">Instagram Terms of Use</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer">Meta Platform Terms (Sviluppatori)</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer">Meta Developer Policies</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noopener noreferrer">ElevenLabs Privacy Policy</Link> </span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    I nostri servizi non sostituiscono né modificano le policy di queste piattaforme applicabili ai loro utenti.
                  </p>
                </div>
              </div>

              {/* Sezione 14 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">14.</span>
                  Voice AI — Informative specifiche
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Quando interagisci con un agente vocale AI gestito da Automis per conto di un Cliente:
                  </p>
                  <ul className="body-text text-white/90 space-y-2">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>La chiamata potrebbe essere gestita da un sistema di intelligenza artificiale, non da un operatore umano.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>La chiamata potrebbe essere registrata e/o trascritta per finalità di erogazione del servizio e controllo qualità.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Puoi richiedere di parlare con un operatore umano in qualsiasi momento.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Le registrazioni sono conservate in modo sicuro per un periodo limitato come descritto nella Sezione 7.</span></li>
                    <li className="flex items-start"> <span className="mr-3 mt-1">•</span> <span>Le normative applicabili sulla registrazione delle chiamate variano per giurisdizione. Dove richiesto, l’agente AI informerà il chiamante che la chiamata viene registrata e otterrà il consenso verbale prima di procedere.</span></li>
                  </ul>
                </div>
              </div>

              {/* Sezione 15 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">15.</span>
                  Modifiche alla presente policy
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Ci riserviamo il diritto di aggiornare questa Privacy Policy in qualsiasi momento. Le modifiche significative verranno comunicate tramite il sito web o via email. La data dell’ultimo aggiornamento è indicata in cima al documento.
                  </p>
                </div>
              </div>

              {/* Sezione 16 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">16.</span>
                  Contatti
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-2">
                    Per qualsiasi domanda, richiesta o reclamo:
                  </p>
                  <p className="body-text text-white/90 mb-2 font-semibold">
                    <span className="font-bold">Automis</span> — AI & Marketing Agency
                  </p>
                  <p className="body-text text-white/90 mb-2">
                    <span className="font-semibold">Email:</span>{" "}
                    <Link
                      href="mailto:support@automis.ai"
                      className="text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      support@automis.ai
                    </Link>
                  </p>
                  <p className="body-text text-white/90 mb-2">
                    <span className="font-semibold">Sito web:</span>{" "}
                    <Link
                      href="https://automis.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      https://automis.ai
                    </Link>
                  </p>
                  <p className="body-text text-white/90">
                    <span className="">Sede legale:</span> <span className="font-bold">Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span>
                  </p>
                  <p className="body-text text-white/90">
                    <span className="">N. registrazione:</span> <span className="font-bold">17179196</span>
                  </p>
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