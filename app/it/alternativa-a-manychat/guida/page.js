import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession, cookieName } from "@/lib/guideGate";
import S from "./snippets";
import GuideArticle from "@/components/guides/GuideArticle";
import { Code, Part, Step, Check } from "@/components/guides/guideBlocks";

const T = {
  ...{
  "authorKey": "luca",
  "avatar": "/luca-ig/luca-linkedin.jpg",
  "category": "Guida tecnica",
  "updated": "Aggiornata il 29 ottobre 2026",
  "steps": "14 passi",
  "title": "Il flusso commento e messaggio su Instagram, passo per passo",
  "lead": "Una parola nei commenti e la persona riceve un messaggio privato con la tua risorsa. Qui ci sono tutti i passaggi per costruirlo da solo con le API ufficiali di Meta: l'app, il ricevitore, il flusso, il codice completo e le prove da fare prima di accendere.",
  "pdfTitle": "Scarica la guida in PDF",
  "pdfSub": "La stessa guida, da tenere e da stampare",
  "noteTitle": "Salva questa pagina tra i preferiti.",
  "note": "Resti dentro per 30 giorni da questo dispositivo; poi basta rifare l'email.",
  "tocLabel": "Indice",
  "ctaTitle": "Ti blocchi su un passo? Ti aiuto a montarlo.",
  "ctaText": "Se l'app, il ricevitore o le prove non ti tornano, prenota una call di 15 minuti e lo guardiamo insieme.",
  "ctaButton": "Prenota una call di 15 minuti"
},
  pdf: "/api/guide-pdf?lang=it",
  call: "https://api.leadconnectorhq.com/widget/bookings/automis-it",
  toc: [
  {
    "level": 2,
    "id": "parte-a",
    "text": "Parte A · L'app su Meta"
  },
  {
    "level": 2,
    "id": "parte-b",
    "text": "Parte B · Il ricevitore"
  },
  {
    "level": 2,
    "id": "parte-c",
    "text": "Parte C · Il flusso, chiamata per chiamata"
  },
  {
    "level": 2,
    "id": "parte-d",
    "text": "Parte D · Il codice completo"
  },
  {
    "level": 2,
    "id": "parte-e",
    "text": "Parte E · Le prove, prima di accendere"
  },
  {
    "level": 2,
    "id": "se-non-funziona",
    "text": "Se non funziona"
  },
  {
    "level": 2,
    "id": "parte-f",
    "text": "Parte F · Regole, limiti e produzione"
  },
  {
    "level": 2,
    "id": "onesta",
    "text": "Onestà, cosa questa guida non dice"
  }
],
};

function GuideContent() {
  return (
    <GuideArticle locale="it" t={T}>
        <div className="g-flow">
          <span>Commento con la parola</span>
          <i>→</i>
          <span>Risposta pubblica</span>
          <i>→</i>
          <span>Messaggio con pulsante</span>
          <i>→</i>
          <span>Follow</span>
          <i>→</i>
          <span>Link e domanda</span>
        </div>

        <div className="g-grid2">
          <div className="g-panel">
            <h3>Cosa ti serve</h3>
            <ul>
              <li>Un account Instagram <b>professionale</b> (Business o Creator).</li>
              <li>Un <b>secondo account</b> Instagram, solo per le prove.</li>
              <li>Un account su <b>developers.facebook.com</b>.</li>
              <li><b>Node.js 18</b> o più. Il codice è in JavaScript, la logica vale in qualsiasi linguaggio.</li>
              <li>Un indirizzo <b>https pubblico</b> per il ricevitore: per le prove basta un tunnel (ngrok, Cloudflare Tunnel o simili), per la produzione un servizio sempre acceso.</li>
            </ul>
          </div>
          <div className="g-panel">
            <h3>Come leggerla</h3>
            <ul>
              <li>Ogni passo ha una riga <b>Controllo</b>: ti dice come capire che è andato a buon fine, prima di passare al successivo.</li>
              <li>I nomi dei menu del pannello Meta cambiano spesso: se non trovi una voce, cerca il nome in inglese tra le impostazioni dell'app.</li>
              <li>Le chiamate hanno <b>&lt;SEGNAPOSTO&gt;</b> da sostituire. Token e App Secret sono segreti: mai nel codice pubblicato.</li>
            </ul>
          </div>
        </div>

        <Part id="parte-a">Parte A · L'app su Meta</Part>

        <Step n="1" title="Crea l'app">
          <p>Vai su <b>developers.facebook.com</b>, accedi e scegli <b>My Apps → Create App</b>. Come caso d'uso scegli quello per gestire messaggi e contenuti su Instagram e, se te lo chiede, il tipo <b>Business</b>. Un'app che non è di tipo Business non va bene: se ne hai una vecchia, creane una nuova.</p>
          <Check>vedi il pannello dell'app, con il menu <b>Instagram</b> a sinistra.</Check>
        </Step>

        <Step n="2" title="Apri la configurazione di Instagram">
          <p>Nel menu a sinistra: <b>Instagram → API setup with Instagram business login</b>. Meta la chiama anche <i>Instagram API with Instagram Login</i>: è la strada più semplice, non richiede una Pagina Facebook. Qui trovi account, token e webhook.</p>
        </Step>

        <Step n="3" title="Controlla i permessi">
          <p>Te ne servono tre:</p>
          <Code>{S.perms}</Code>
          <p>Per il tuo account, e per chi ha un ruolo nell'app, <b>non serve la revisione di Meta</b>: basta l'accesso Standard. La revisione serve solo se usi l'app per account di altri.</p>
        </Step>

        <Step n="4" title="Genera il token e prendi gli ID">
          <p>Nella stessa pagina, accanto al tuo account, clicca <b>Generate token</b>, accedi a Instagram e copia il token: dura <b>60 giorni</b>. Poi vai su <b>Impostazioni app → Di base</b> e copia l'<b>App Secret</b> (clic su Mostra). Infine chiedi a Meta l'ID del tuo account:</p>
          <Code>{S.me}</Code>
          <Check>la risposta contiene il tuo username e un <b>user_id</b>: è il tuo <b>IG_ID</b>, lo stesso che troverai come <b>id</b> negli avvisi dei webhook. Segna tre valori: <b>TOKEN</b>, <b>APP_SECRET</b>, <b>IG_ID</b>.</Check>
        </Step>

        <Step n="5" title="Aggiungi il secondo account come tester">
          <p>Nel pannello: <b>App roles → Roles → Add people → Instagram Tester</b>, e scrivi lo username del secondo account. Poi, <b>dal secondo account</b>, in Instagram: <b>Impostazioni → App e siti web → Inviti tester</b> e accetta.</p>
          <p><b>Perché serve:</b> con l'accesso Standard l'app vede solo le persone che hanno un ruolo nell'app. Senza questo passo i commenti del secondo account non arrivano, e penserai che il resto sia sbagliato.</p>
          <Check>nel pannello il secondo account risulta tra i tester, con invito accettato.</Check>
        </Step>

        <Part id="parte-b">Parte B · Il ricevitore</Part>

        <Step n="6" title="Metti online il ricevitore">
          <p>Il codice è nella parte D. Avvialo e rendilo raggiungibile da un indirizzo <b>https</b> pubblico: per le prove un tunnel verso la porta 3000, in produzione un servizio sempre acceso. Le variabili da impostare sono in fondo alla parte D.</p>
          <Check>aprendo l'indirizzo dal browser il server risponde (anche solo «no»): vuol dire che è raggiungibile.</Check>
        </Step>

        <Step n="7" title="Registra il webhook">
          <p>Nella pagina del passo 2 cerca <b>Configure webhooks</b> e compila:</p>
          <ul>
            <li><b>Callback URL</b>: l'indirizzo https del ricevitore.</li>
            <li><b>Verify token</b>: una stringa a tua scelta, la stessa che metti in <b>VERIFY_TOKEN</b>.</li>
          </ul>
          <p>Clicca <b>Verify and save</b>. Meta manda al tuo indirizzo una richiesta GET con <b>hub.mode</b>, <b>hub.verify_token</b> e <b>hub.challenge</b>: il server deve rispondere con il valore di <b>hub.challenge</b>. Il codice lo fa già.</p>
          <Check>il pannello salva senza errori.</Check>
        </Step>

        <Step n="8" title="Iscrivi il tuo account agli eventi">
          <Code>{S.subscribe}</Code>
          <p>Nel pannello, nella stessa sezione dei webhook, attiva anche i campi <b>comments</b>, <b>messages</b> e <b>messaging_postbacks</b>.</p>
          <Check>la risposta è <code>{'{"success": true}'}</code>. Con <code>GET .../me/subscribed_apps</code> vedi i campi iscritti.</Check>
        </Step>

        <div className="g-panel g-gold">
          <h3>Le 4 regole del ricevitore, secondo Meta</h3>
          <ul>
            <li>Rispondi <b>200 subito</b> a ogni avviso, poi lavora. Se non rispondi, Meta riprova per <b>36 ore</b>.</li>
            <li><b>Scarta i doppioni</b>: per via dei tentativi lo stesso avviso può arrivare più volte.</li>
            <li><b>Verifica la firma</b>: l'intestazione <b>X-Hub-Signature-256</b> è un HMAC SHA256 del corpo <b>grezzo</b>, calcolato con l'App Secret. Se non coincide, scarta.</li>
            <li>Gli avvisi arrivano <b>a gruppi</b> (fino a 1000): scorri ogni elemento, non guardare solo il primo.</li>
          </ul>
        </div>

        <Part id="parte-c">Parte C · Il flusso, chiamata per chiamata</Part>

        <Step n="9" title="Arriva il commento">
          <p>Meta manda al ricevitore un avviso di tipo <b>comments</b>. Ti servono quattro valori: l'<b>id del commento</b>, l'<b>id di chi ha commentato</b>, il <b>testo</b> e l'<b>id del post</b>.</p>
          <Code>{S.commento}</Code>
          <p>Controlla se il testo contiene la tua parola (parola intera, senza distinguere maiuscole) e gestisci <b>solo il primo commento</b> di ogni persona su quel post.</p>
        </Step>

        <Step n="10" title="Risposta pubblica, sotto il commento">
          <Code>{S.replies}</Code>
          <p>Funziona solo sui commenti di primo livello. Alterna 3-5 varianti.</p>
        </Step>

        <Step n="11" title="Risposta privata: il primo messaggio">
          <p>Si manda con l'<b>id del commento</b> al posto dell'id della persona. Meta ne consente <b>uno solo per commento</b>, entro <b>7 giorni</b>. Arriva nella posta in arrivo se la persona ti segue, nella cartella <b>Richieste</b> se non ti segue, con il link al post.</p>
          <p><b>Prova 1 · con il pulsante</b> (è quello che vuoi: il tocco apre le 24 ore):</p>
          <Code>{S.prova1}</Code>
          <div className="g-warn">
            <b>Da provare, non è garantito.</b> Nella documentazione di Meta la risposta privata è descritta solo con testo semplice, e il pulsante solo con l'id della persona al posto dell'id del commento. Che si possano unire non è scritto. Il codice della parte D prova il pulsante e, se Meta lo rifiuta, passa da solo alla prova 2.
          </div>
          <p><b>Prova 2 · solo testo, e la persona risponde</b> (funziona sempre):</p>
          <Code>{S.prova2}</Code>
          <p>Quando la persona risponde, nel ricevitore arriva un avviso <b>messages</b> e le 24 ore sono aperte, come con il tocco.</p>
          <Check>dal secondo account il messaggio arriva (guarda anche <b>Richieste</b>). Tieni nota di quale prova ha funzionato: è l'informazione più importante di tutta la guida.</Check>
        </Step>

        <Step n="12" title="Il tocco sul pulsante">
          <p>Quando la persona tocca, arriva un avviso <b>messaging_postbacks</b>. Da qui hai il suo <b>id</b> (<b>sender.id</b>) e <b>24 ore</b> per scrivere.</p>
          <Code>{S.postback}</Code>
          <p>Il <b>payload</b> è la stringa che hai scelto tu: qui ti dice che parola sta aspettando.</p>
        </Step>

        <Step n="13" title="Il follow">
          <p>Prima del link, chiedi di seguirti e controlla se lo fa. Il controllo è una chiamata sull'id della persona:</p>
          <Code>{S.follow}</Code>
          <p>Funziona solo dopo che la persona ha toccato un pulsante o risposto. Il modo che consiglio è <b>morbido</b>: se non ti segue, mandi il messaggio con la richiesta e un secondo pulsante; <b>al secondo tocco il link parte comunque</b>. Il controllo a volte sbaglia sui follower di vecchia data, e bloccare un follower vero costa più di un link regalato.</p>
        </Step>

        <Step n="14" title="Il link e la domanda">
          <Code>{S.link}</Code>
          <p>Il link inizia con <b>https</b>. La domanda è una sola e si risponde in una riga: è lei che fa partire la conversazione.</p>
          <Check>dal secondo account: commento, risposta pubblica, messaggio, tocco, richiesta di follow, secondo tocco, link. Se tutta la catena torna, il flusso funziona.</Check>
        </Step>

        <Part id="parte-d">Parte D · Il codice completo</Part>
        <p>
          Un file solo, <b>bot.mjs</b>, senza librerie da installare. Fa tutta la catena: verifica, firma, doppioni, risposta pubblica, prova 1 e prova 2, follow morbido, link. Le regole (una riga per parola) sono all'inizio: cambiale con le tue.
        </p>
        <Code tall>{S.bot}</Code>
        <p><b>Come avviarlo</b></p>
        <Code>{S.env}</Code>
        <div className="g-panel">
          <ul>
            <li><b>Cosa è stato verificato:</b> la logica (firma, doppioni, parola intera, sequenza dei passi, ripiego se il pulsante viene rifiutato) è collaudata con un finto server Meta, 17 controlli su 17. <b>Non è stato collaudato contro Meta:</b> quello lo fai tu con la parte E.</li>
            <li><b>Limiti di questo file:</b> i doppioni e chi ha già ricevuto la richiesta di follow stanno in memoria, e si perdono se riavvii. Per l'uso vero salvali in un file o in un database.</li>
          </ul>
        </div>

        <Part id="parte-e">Parte E · Le prove, prima di accendere</Part>
        <div className="g-panel">
          <ol>
            <li>Pubblica (o usa) un post di prova sul tuo account e scrivi nella didascalia la parola.</li>
            <li>Dal <b>secondo account</b> commenta con la parola. Poi guarda i log del ricevitore.</li>
            <li>Controlla: risposta pubblica sotto il commento, messaggio privato (anche in <b>Richieste</b>), tocco o risposta, richiesta di follow, secondo tocco, link.</li>
            <li>Annota <b>quale prova</b> del passo 11 ha funzionato (pulsante o solo testo) e adatta i testi di conseguenza.</li>
            <li>Apri il link <b>dal telefono</b>: deve iniziare con https e caricarsi.</li>
            <li>Commenta due volte dallo stesso account: la seconda volta non deve succedere niente.</li>
            <li>La parola resta <b>spenta</b> (<code>attiva: false</code>) fino al giorno in cui pubblichi.</li>
          </ol>
        </div>

        <Part id="se-non-funziona">Se non funziona</Part>
        <div className="blog-table-wrap">
          <table>
            <thead>
              <tr><th>Cosa vedi</th><th>Da controllare</th></tr>
            </thead>
            <tbody>
              <tr><td>Il pannello non salva il webhook</td><td>L'indirizzo non è https pubblico, il server non risponde con <b>hub.challenge</b>, o il <b>Verify token</b> è diverso da VERIFY_TOKEN.</td></tr>
              <tr><td>Il webhook è salvato, ma non arriva niente</td><td>Account non iscritto (passo 8), campi non attivi, il commentatore <b>non è tester</b> (passo 5), account non professionale, commento su un post di un altro account.</td></tr>
              <tr><td>Arriva, ma il bot risponde 401</td><td>La firma. Va calcolata sul corpo <b>grezzo</b>, non sul JSON riletto, e con l'App Secret di <b>questa</b> app.</td></tr>
              <tr><td>Errore sulla risposta privata</td><td>Commento più vecchio di 7 giorni, messaggio già mandato per quel commento, token scaduto o permesso mancante. Leggi il codice dell'errore nella risposta di Meta.</td></tr>
              <tr><td>Il pulsante viene rifiutato</td><td>È il caso della prova 2: il codice passa al testo. Controlla nei log il messaggio «pulsante rifiutato».</td></tr>
              <tr><td>Il messaggio non si vede</td><td>Cerca nella cartella <b>Richieste</b>: se il secondo account non ti segue, ci finisce lì.</td></tr>
              <tr><td>Messaggi doppi</td><td>Manca la deduplica. Meta riprova se la tua risposta tarda: rispondi 200 prima di lavorare.</td></tr>
              <tr><td>Dopo qualche settimana smette</td><td>Il token dura 60 giorni. Rinnovalo prima della scadenza (parte F).</td></tr>
            </tbody>
          </table>
        </div>

        <Part id="parte-f">Parte F · Regole, limiti e produzione</Part>
        <div className="g-grid2">
          <div className="g-panel">
            <h3>I limiti di Meta</h3>
            <ul>
              <li>Un solo messaggio automatico per commento, entro 7 giorni.</li>
              <li>Per scrivere ancora serve una risposta o un tocco: da lì hai 24 ore.</li>
              <li>Fino a <b>750 risposte private all'ora</b> per account, sui commenti dei post e dei reel.</li>
              <li>Il messaggio non può partire se il commento è nascosto, o di una diretta già finita.</li>
              <li>Si risponde in pubblico solo ai commenti di primo livello.</li>
            </ul>
          </div>
          <div className="g-panel">
            <h3>Le buone abitudini</h3>
            <ul>
              <li><b>Dillo che è automatico</b> nel primo messaggio. Meta lo richiede dove la legge lo impone e lo consiglia sempre.</li>
              <li>Una regola sola per parola, e la parola uguale nel video e nella didascalia.</li>
              <li>Salva solo ciò che ti serve (id, parola, esito) e di' nella tua informativa cosa conservi.</li>
              <li>Niente invii a chi non ti ha scritto.</li>
            </ul>
          </div>
        </div>
        <div className="g-panel">
          <h3>Per tenerlo acceso davvero</h3>
          <ol>
            <li><b>Servizio sempre acceso</b> per il ricevitore, con un riavvio automatico se cade.</li>
            <li><b>Archivio</b> al posto della memoria: commenti già gestiti e chi ha ricevuto la richiesta di follow.</li>
            <li>
              <b>Rinnova il token</b> prima dei 60 giorni (deve avere almeno 24 ore e non essere scaduto; dopo il rinnovo vale altri 60 giorni):
              <Code>{S.refresh}</Code>
            </li>
            <li><b>Un registro</b> di chi ha chiesto cosa e se il link è arrivato: ti dice quale video porta contatti.</li>
            <li>Se vuoi usarlo per <b>account di altri</b> (clienti), serve la revisione di Meta: è un lavoro a parte, con video e permessi uno per uno.</li>
          </ol>
        </div>

        <Part id="onesta">Onestà, cosa questa guida non dice</Part>
        <div className="g-panel">
          <ul>
            <li><b>Le regole e le API di Meta cambiano.</b> I passaggi sono controllati sulla documentazione ufficiale il 29/10/2026 (pagine aggiornate tra marzo e giugno 2026): ricontrolla prima di costruire.</li>
            <li><b>Il pulsante dentro la risposta privata non è documentato da Meta.</b> Per questo ci sono due prove. Non so dirti in anticipo quale passerà sul tuo account.</li>
            <li><b>I nomi dei menu</b> del pannello Meta cambiano: quelli indicati sono la mia lettura della documentazione, non una schermata di oggi.</li>
            <li><b>Il follow:</b> chiedere di seguire prima della risorsa non è vietato, ma Meta non lo approva espressamente. Valuta tu.</li>
            <li><b>Settori regolati</b>, come la sanità: Meta limita l'uso dei messaggi per mettere in contatto persone e strutture sanitarie. Leggi le sue policy prima.</li>
            <li>Copre <b>un percorso solo</b>, dal commento alla risorsa. Flussi più lunghi o invii a una lista non sono qui.</li>
          </ul>
        </div>

    </GuideArticle>
  );
}

// Cancello: si entra solo con il cookie messo da /api/guide-access, cioè dopo aver cliccato il link
// nella mail di conferma. Senza cookie valido si torna alla pagina pubblica.
export default function Page() {
  if (!verifySession(cookies().get(cookieName("it"))?.value, "it")) redirect("/it/alternativa-a-manychat");
  return <GuideContent />;
}
