import SignupForm from "@/components/guides/SignupForm";
import { mont, open, css } from "@/components/guides/manychatShared";

const CALL = "https://api.leadconnectorhq.com/widget/bookings/automis-it";

// Pagina pubblica (indicizzabile): presenta la guida e raccoglie l'email.
// La guida vera sta in /guida e si apre solo con il codice rilasciato dopo l'email.
export default function AlternativaAManyChat({ searchParams }) {
  return (
    <main id="guida" className={`${mont.variable} ${open.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="wrap">
        <div className="top">
          <img src="/luca-ig/automis-logo.png" alt="Automis" />
          <span className="pill">AI Agency</span>
        </div>

        <div className="hero">
          <img src="/luca-ig/luca-sorriso.jpg" alt="Luca" />
          <div>
            <p className="kicker">Alternativa a ManyChat · guida tecnica</p>
            <h1>
              Alternativa a ManyChat: il flusso commento e messaggio su Instagram, <em>costruito da te</em>
            </h1>
            <p className="lead">
              Una parola nei commenti e la persona riceve un messaggio privato con la tua risorsa. ManyChat si paga in base ai contatti attivi (al 27/10/2026 da 17 a 199 dollari al mese). Questa guida spiega come costruire lo stesso percorso con le API ufficiali di Meta.
            </p>
          </div>
        </div>

        <div className="flow">
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

        <SignupForm lang="it" expired={searchParams?.expired === "1"} />

        <div className="grid2">
          <div className="panel">
            <h3>Cosa trovi nella guida</h3>
            <ul className="dots">
              <li><b>L'app su Meta:</b> 5 passi, dall'app ai permessi, dal token all'account di prova.</li>
              <li><b>Il ricevitore:</b> l'indirizzo che Meta chiama a ogni commento.</li>
              <li><b>Il flusso:</b> le chiamate, una per una, fino al link.</li>
              <li><b>Il codice completo:</b> un file solo, collaudato con un finto server Meta.</li>
              <li><b>Le prove:</b> cosa controllare e cosa fare se non funziona.</li>
              <li><b>Regole e produzione:</b> limiti di Meta, policy, rinnovo del token.</li>
            </ul>
          </div>
          <div className="panel">
            <h3>Cosa ti serve</h3>
            <ul className="dots">
              <li>Un account Instagram <b>professionale</b> (Business o Creator).</li>
              <li>Un <b>secondo account</b> Instagram, solo per le prove.</li>
              <li>Un account su <b>developers.facebook.com</b>.</li>
              <li><b>Node.js 18</b> o più. La logica vale in qualsiasi linguaggio.</li>
              <li>Un indirizzo <b>https pubblico</b> per il ricevitore.</li>
            </ul>
          </div>
        </div>

        <div className="honest" style={{ marginTop: 0 }}>
          <h3>Onestà, cosa questa guida non dice</h3>
          <ul>
            <li><b>Le regole e le API di Meta cambiano.</b> I passaggi sono controllati sulla documentazione ufficiale il 29/10/2026: ricontrolla prima di costruire.</li>
            <li><b>Il pulsante dentro la risposta privata non è documentato da Meta.</b> Per questo la guida dà due prove: non so dirti in anticipo quale passerà sul tuo account.</li>
            <li>Copre <b>un percorso solo</b>, dal commento alla risorsa. Flussi più lunghi o invii a una lista non ci sono.</li>
          </ul>
        </div>

        <div className="cta">
          <h3>Preferisci che lo guardiamo insieme?</h3>
          <p>Se l'app, il ricevitore o le prove non ti tornano, prenota una call di 15 minuti.</p>
          <a href={CALL} target="_blank" rel="noopener">Prenota una call di 15 minuti</a>
        </div>

        <footer className="foot">
          <strong style={{ color: "#fff", fontFamily: "var(--head)" }}>Automis</strong> · AI Agency
          <br />
          <a href="https://automis.ai" target="_blank" rel="noopener">automis.ai</a>
        </footer>
      </div>
    </main>
  );
}
