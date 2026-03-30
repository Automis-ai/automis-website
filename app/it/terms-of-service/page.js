"use client";

import { useEffect } from "react";
import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";

const TermsOfServiceIT = () => {
  useEffect(() => {
    document.querySelector("body").classList.add("home-nine");
  }, []);

  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            {/* Header */}
            <div className="mb-12">
              <h1 className="hero-heading text-white mb-4 uppercase">TERMINI E CONDIZIONI DI SERVIZIO</h1>
              <p className="sub-heading text-white/90 mb-2">Automis — AI & Marketing Agency</p>
              <p className="body-text text-white/60">Ultimo aggiornamento: 30 marzo 2026</p>
            </div>

            <div className="max-w-4xl space-y-12">
              {/* Sezione 1 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">1. Definizioni</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Automis”, “noi”, “nostro”:</span> Automis, AI & Marketing Agency, registrata in Estonia (n. Registrazione <span className="font-bold text-white">17179196</span>), con sede legale in <span className="font-bold text-white">Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span>.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Cliente”:</span> qualsiasi persona fisica o giuridica che sottoscrive un contratto con Automis per l’erogazione dei Servizi.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Servizi”:</span> i servizi di marketing, automazione AI, gestione pubblicitaria, voice AI e consulenza offerti da Automis.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Utente Finale”:</span> qualsiasi persona che interagisce con gli asset del Cliente (pagine/profili Meta, linee telefoniche, moduli web, ecc.).
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Piattaforma Meta”:</span> Facebook, Instagram, Messenger e le relative API per sviluppatori fornite da Meta Platforms, Inc.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Piattaforme Terze”:</span> Google Ads, TikTok Ads, LinkedIn Ads, X Ads e qualsiasi altra piattaforma pubblicitaria o di comunicazione utilizzata nell’erogazione dei Servizi.
                  </p>
                </div>
              </div>

              {/* Sezione 2 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">2. Descrizione dei Servizi</h2>
                <div className="space-y-8">
                  <p className="body-text text-white/80">Automis fornisce i seguenti servizi, come concordato nel contratto individuale con ciascun Cliente:</p>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.1 Gestione campagne pubblicitarie (Paid Ads)</h3>
                    <p className="body-text text-white/80">Creazione, gestione e ottimizzazione AI-driven di campagne pubblicitarie su Google, Meta, TikTok, LinkedIn, X e altre piattaforme. Include ricerca audience, produzione creatività pubblicitarie, A/B testing, ottimizzazione bid, configurazione tracking/pixel e reportistica performance.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.2 Voice AI</h3>
                    <p className="body-text text-white/80">Agenti vocali AI per la gestione di chiamate in entrata e uscita per conto del Cliente. Include qualificazione lead, prenotazione e riprogrammazione appuntamenti, supporto clienti, registrazione e trascrizione chiamate, integrazione CRM e accesso a dashboard analytics in tempo reale. Gli agenti Voice AI sono disponibili 24/7 e supportano 20+ lingue.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.3 Automazioni AI</h3>
                    <p className="body-text text-white/80">Progettazione e implementazione di automazioni workflow personalizzate, tra cui: sequenze di qualificazione e nurturing lead (via SMS, WhatsApp, email), sincronizzazione dati CRM, automazioni di prenotazione e promemoria appuntamenti, workflow di gestione fatture e spese, screening e scheduling candidati HR, e integrazioni personalizzate con gli strumenti esistenti del Cliente.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.4 Automazione Social Media (Meta)</h3>
                    <p className="body-text text-white/80 mb-3">Risposte automatiche a commenti e messaggi diretti (DM) sulle pagine/profili Facebook e Instagram del Cliente, erogate <span className="font-bold">esclusivamente tramite le API ufficiali di Meta</span> (Instagram Graph API, Facebook Pages API, Messenger API), nel pieno rispetto di:</p>
                    <ul className="body-text flex flex-col text-white/80 space-y-1 pl-6 mb-3">
                      <li><Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Platform Terms</Link></li>
                      <li><Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Developer Policies</Link></li>
                      <li><Link href="https://www.facebook.com/terms/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Terms of Service</Link></li>
                      <li><Link href="https://help.instagram.com/581066165581870" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Instagram Terms of Use</Link></li>
                    </ul>
                    <p className="body-text text-white/80">Automis non utilizza metodi non ufficiali, scraping, bot non autorizzati o strumenti che violino le policy di Meta. L’app Automis è registrata su <Link href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-middle hover:underline">Meta for Developers</Link> e opera con permessi approvati tramite il processo di App Review di Meta.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.5 Jumpstart Audit e Consulenza</h3>
                    <p className="body-text text-white/80">Analisi completa del funnel di marketing del Cliente, performance pubblicitarie, tasso di chiamate perse e opportunità di crescita. Include discovery call, audit deck dettagliato, workshop di 60 minuti e roadmap di crescita a 90 giorni.</p>
                  </div>
                </div>
              </div>

              {/* Sezione 3 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">3. Obblighi del Cliente</h2>
                <p className="body-text text-white mb-4">Sottoscrivendo i nostri Servizi, il Cliente si impegna a:</p>
                <ul className="body-text text-white/80 space-y-4 pl-6">
                  <li className="list-disc"><span className="font-bold">Rispettare le policy delle piattaforme:</span> il Cliente è responsabile di assicurarsi che l’utilizzo dei Servizi sia conforme alle Community Standards di Meta, alle Linee guida di Instagram, alle policy di Google Ads e a tutte le policy applicabili delle piattaforme utilizzate.</li>
                  <li className="list-disc"><span className="font-bold">Non utilizzare i Servizi per attività illecite:</span> è vietato utilizzare le automazioni per spam, frode, promesse illegali, contenuti offensivi o diffamatori, o qualsiasi attività che violi diritti di terzi.</li>
                  <li className="list-disc"><span className="font-bold">Fornire informazioni accurate:</span> il Cliente deve fornire informazioni veritiere e complete per la configurazione dei Servizi.</li>
                  <li className="list-disc"><span className="font-bold">Aggiornare la propria Privacy Policy e TOS:</span> il Cliente è responsabile di aggiornare la propria Privacy Policy e i propri Termini di Servizio per informare i propri Utenti Finali sull’utilizzo di strumenti di automazione AI per la gestione di commenti, messaggi e chiamate.</li>
                  <li className="list-disc"><span className="font-bold">Mantenere accesso autorizzato:</span> il Cliente deve garantire che le credenziali e i permessi forniti ad Automis per l’accesso alle API Meta, account pubblicitari, CRM, telefonia e altre piattaforme rimangano validi e autorizzati.</li>
                  <li className="list-disc"><span className="font-bold">Rispettare le normative applicabili:</span> il Cliente è Titolare del trattamento nei confronti dei propri Utenti Finali ed è responsabile della conformità alle normative sulla protezione dei dati (GDPR, ecc.).</li>
                  <li className="list-disc"><span className="font-bold">Conformità registrazione chiamate:</span> dove i servizi Voice AI prevedono la registrazione delle chiamate, il Cliente è responsabile della conformità alle leggi applicabili sul consenso alla registrazione nelle giurisdizioni pertinenti.</li>
                  <li className="list-disc"><span className="font-bold">Pagare nei termini:</span> come specificato nel contratto individuale.</li>
                </ul>
              </div>

              {/* Sezione 4 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">4. Limitazioni delle piattaforme terze e disclaimer</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80"><span className="font-bold">Automis non può garantire la continuità ininterrotta dei Servizi che dipendono da piattaforme terze.</span> Le piattaforme utilizzate per l’erogazione dei Servizi (Meta, Google, TikTok, LinkedIn, fornitori di telefonia, ecc.) sono soggette a:</p>
                  <ul className="body-text text-white/80 space-y-2 pl-6">
                    <li className="list-disc">Modifiche unilaterali di API, rate limit, permessi e policy da parte del fornitore della piattaforma</li>
                    <li className="list-disc">Sospensione o revoca dei permessi dell’app o dell’accesso API, con o senza preavviso</li>
                    <li className="list-disc">Limitazioni, restrizioni o sospensione dell’account/pagina del Cliente per violazione delle policy della piattaforma</li>
                    <li className="list-disc">Interruzioni tecniche o di servizio della piattaforma</li>
                  </ul>
                  <p className="body-text text-white/80 font-bold">In caso di limitazione, sospensione o revoca:</p>
                  <ul className="body-text text-white/80 space-y-2 pl-6">
                    <li className="list-disc">Automis notificherà tempestivamente il Cliente e collaborerà per la risoluzione del problema, ove possibile.</li>
                    <li className="list-disc">Automis non è responsabile per perdite, danni o mancati guadagni derivanti da azioni intraprese dalle piattaforme terze.</li>
                    <li className="list-disc">Il Cliente non potrà richiedere risarcimenti o rimborsi per periodi di servizio impattati da limitazioni imposte dalle piattaforme.</li>
                    <li className="list-disc">Automis si riserva il diritto di sospendere i Servizi interessati senza penali qualora le modifiche delle piattaforme rendano impossibile o illegale la continuazione del servizio.</li>
                  </ul>
                </div>
              </div>

              {/* Sezione 5 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">5. Voice AI — Termini specifici</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Oltre ai termini generali, si applicano specificamente ai Servizi Voice AI:</p>
                  <ul className="body-text text-white/80 space-y-4 pl-6">
                    <li className="list-disc"><span className="font-bold text-white">Disclosure AI:</span> gli agenti vocali di Automis sono alimentati da intelligenza artificiale. A seconda delle preferenze del Cliente e della legge applicabile, l’AI può identificarsi come sistema automatizzato all’inizio di ogni chiamata.</li>
                    <li className="list-disc"><span className="font-bold text-white">Registrazione chiamate:</span> le chiamate possono essere registrate e trascritte. Il Cliente è responsabile della configurazione dei meccanismi di consenso e delle informative come richiesto dalla legge applicabile.</li>
                    <li className="list-disc"><span className="font-bold text-white">Escalation umana:</span> l’agente AI può trasferire le chiamate a un operatore umano quando non può gestire una richiesta. Il Cliente deve fornire un percorso di escalation valido.</li>
                    <li className="list-disc"><span className="font-bold text-white">Nessuna consulenza professionale:</span> gli agenti vocali AI non forniscono consulenza professionale, medica, legale o finanziaria. Le risposte sono esclusivamente informative.</li>
                    <li className="list-disc"><span className="font-bold text-white">Uptime:</span> Automis si prefigge il 99,5% di uptime per i servizi Voice AI ma non garantisce disponibilità ininterrotta. Le interruzioni dei fornitori di telefonia sono al di fuori del nostro controllo.</li>
                  </ul>
                </div>
              </div>

              {/* Sezione 6 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">6. Protezione dei dati e DPA</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Automis tratta i dati degli Utenti Finali del Cliente in qualità di <span className="font-bold">Responsabile del trattamento</span> ai sensi dell’Art. 28 GDPR. Il rapporto è regolato da un <span className="font-bold">Data Processing Agreement (DPA)</span> sottoscritto tra Automis e il Cliente, che specifica: categorie di dati trattati, finalità del trattamento, misure di sicurezza, sub-responsabili, obblighi di cancellazione e procedure per la gestione di data breach.</p>
                  <p className="body-text text-white/80">Per i dettagli completi sul trattamento dei dati, consultare la nostra <Link href="/it/privacy-policy" className="text-blue-middle hover:underline">Privacy Policy</Link>.</p>
                </div>
              </div>

              {/* Sezione 7 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">7. Proprietà intellettuale</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Tutti i workflow, le automazioni, i template, il codice, i processi, le configurazioni degli agenti vocali e la documentazione creati da Automis nell’ambito dei Servizi rimangono di proprietà intellettuale di Automis, salvo diverso accordo scritto. Il Cliente riceve una licenza non esclusiva e non trasferibile per l’utilizzo dei Servizi durante la durata del contratto.</p>
                  <p className="body-text text-white/80">Il Cliente mantiene la proprietà dei propri contenuti, asset del brand, creatività pubblicitarie fornite ad Automis e dati all’interno delle proprie piattaforme e CRM.</p>
                </div>
              </div>

              {/* Sezione 8 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">8. Riservatezza</h2>
                <p className="body-text text-white/80">Entrambe le parti si impegnano a mantenere riservate le informazioni proprietarie o sensibili condivise durante l’incarico, incluse strategie aziendali, dati clienti, configurazioni tecniche e informazioni finanziarie. Questo obbligo sopravvive alla cessazione del contratto per un periodo di 2 anni.</p>
              </div>

              {/* Sezione 9 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">9. Pagamenti e fatturazione</h2>
                <p className="body-text text-white/80">I termini di pagamento sono specificati nel contratto individuale. Salvo diverso accordo, le fatture sono pagabili entro <span className="font-bold">7 giorni</span> dall’emissione. In caso di mancato pagamento, Automis si riserva il diritto di sospendere i Servizi fino al saldo completo.</p>
              </div>

              {/* Sezione 10 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">10. Durata e recesso</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Il contratto ha la durata specificata nell’accordo individuale. Ciascuna parte può recedere con un preavviso scritto di <span className="font-bold">30 giorni</span>. In caso di recesso, Automis: disattiverà tutte le automazioni, revocherà l’accesso alle piattaforme del Cliente, cancellerà i dati del Cliente secondo la Privacy Policy e il DPA, e fornirà un report finale su richiesta.</p>
                  <p className="body-text text-white/80">Automis può risolvere o sospendere il contratto con effetto immediato se il Cliente viola materialmente questi Termini, viola le policy delle piattaforme, utilizza i Servizi per attività illecite, o non adempie agli obblighi di pagamento dopo sollecito.</p>
                </div>
              </div>

              {/* Sezione 11 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">11. Limitazione di responsabilità</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">I Servizi sono forniti “così come sono” (as is). Automis non garantisce risultati specifici in termini di lead, conversioni, vendite, appuntamenti o crescita. La responsabilità complessiva di Automis nei confronti del Cliente per qualsiasi reclamo non potrà superare l’importo totale pagato dal Cliente nei <span className="font-bold">12 mesi precedenti l’evento che ha dato origine al reclamo.</span></p>
                  <p className="body-text text-white/80">Automis non è responsabile per: danni indiretti, incidentali, consequenziali o punitivi; mancati profitti o opportunità di business perse; azioni intraprese da piattaforme terze (Meta, Google, etc.); imprecisioni nelle risposte generate dall’AI; decisioni prese dagli Utenti Finali sulla base di risposte automatiche; o eventi di forza maggiore.</p>
                </div>
              </div>

              {/* Sezione 12 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">12. Restrizioni d’uso</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Il Cliente non può utilizzare i Servizi per: spam o invio massivo non richiesto, frode, phishing o pratiche ingannevoli, violazione di diritti di terzi (privacy, proprietà intellettuale, ecc.), distribuzione di malware o contenuti dannosi, qualsiasi attività vietata dalle leggi applicabili o dalle policy delle piattaforme, o reverse engineering o rivendita della tecnologia di Automis senza autorizzazione scritta.</p>
                  <p className="body-text text-white/80">Automis si riserva il diritto di sospendere immediatamente i Servizi in caso di violazione.</p>
                </div>
              </div>

              {/* Sezione 13 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">13. Manleva</h2>
                <p className="body-text text-white/80">Il Cliente si impegna a manlevare e tenere indenne Automis da qualsiasi pretesa, danno, perdita e spesa (incluse spese legali) derivanti da: violazione di questi Termini o leggi applicabili da parte del Cliente, utilizzo dei Servizi in modo non autorizzato, contenuti creati o approvati dal Cliente, o mancata conformità del Cliente alle policy delle piattaforme o alle normative sulla protezione dei dati.</p>
              </div>

              {/* Sezione 14 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">14. Forza maggiore</h2>
                <p className="body-text text-white/80">Nessuna delle parti sarà responsabile per ritardi o inadempimenti dovuti a circostanze al di fuori del proprio ragionevole controllo, inclusi catastrofi naturali, pandemie, azioni governative, guerre, attacchi informatici o interruzioni di piattaforme terze.</p>
              </div>

              {/* Sezione 15 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">15. Legge applicabile e foro competente</h2>
                <p className="body-text text-white/80">I presenti Termini sono regolati dalla legge della Repubblica Italiana. Le parti si impegnano a tentare una risoluzione amichevole di qualsiasi controversia.</p>
              </div>

              {/* Sezione 16 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">16. Clausola di salvaguardia</h2>
                <p className="body-text text-white/80">Se una qualsiasi disposizione dei presenti Termini dovesse risultare invalida o inapplicabile, le restanti disposizioni rimarranno pienamente valide ed efficaci.</p>
              </div>

              {/* Sezione 17 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">17. Modifiche</h2>
                <p className="body-text text-white/80">Ci riserviamo il diritto di modificare i presenti Termini in qualsiasi momento. Le modifiche significative saranno comunicate con almeno 30 giorni di preavviso via email o tramite il sito web. L’uso continuato dei Servizi dopo la notifica costituisce accettazione delle modifiche.</p>
              </div>

              {/* Sezione 18 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">18. Intero accordo</h2>
                <p className="body-text text-white/80">I presenti Termini, unitamente al contratto individuale, al DPA e ad eventuali allegati, costituiscono l’intero accordo tra le parti e sostituiscono tutti i precedenti accordi, dichiarazioni e intese.</p>
              </div>

              {/* Sezione 19 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">19. Contatti</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Per qualsiasi domanda relativa ai presenti Termini di Servizio:</p>
                  <p className="body-text text-white font-bold text-lg"><span className="font-bold">Automis</span> — AI & Marketing Agency</p>
                  <div className="space-y-1">
                    <p className="body-text text-white/80"><span className="font-bold">Email:</span> <Link href="mailto:support@automis.ai" className="text-blue-middle hover:underline">support@automis.ai</Link></p>
                    <p className="body-text text-white/80"><span className="font-bold">Sito web:</span> <Link href="https://automis.ai" target="_blank" rel="noopener noreferrer" className="text-blue-middle hover:underline">https://automis.ai</Link></p>
                    <p className="body-text text-white/80"><span>Sede legale:</span> <span className="font-bold">Harju maakond, Tallinn, Kesklinna linosa, Järvevana tee 9, 11314</span></p>
                    <p className="body-text text-white/80"><span>N. registrazione:</span> <span className="font-bold">17179196</span></p>
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

export default TermsOfServiceIT;
