import { waLink } from "@/lib/guideWa";
import WaButton from "@/components/guide-catalogo/WaButton";

// Guida web: una pagina HTML a tutta altezza dentro un iframe isolato. Non ha un URL pubblico: l'iframe punta a
// /api/guide-leggi-web, che serve l'HTML solo con il cookie del lettore. `sandbox` SENZA allow-same-origin: il JS della
// guida gira in un'origine «vuota» e non legge cookie né storage del sito. Niente tasto di download.
export default function LettoreWeb({ guida, next }) {
  const question = waLink({ kind: "domanda", titolo: guida.titolo });
  return (
    <div>
      <div className="bar">
        <p>Guida web · si legge qui</p>
        <a href={question} target="_blank" rel="noopener noreferrer">Hai una domanda? Scrivimi</a>
      </div>
      <iframe
        className="webframe"
        title={guida.titolo}
        src={`/api/guide-leggi-web?slug=${encodeURIComponent(guida.slug)}`}
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
      />
      <p className="print-note">Questa guida si legge online, non si stampa.</p>
      <section className="after" aria-labelledby="gl-after">
        <div>
          <h2 id="gl-after">{next ? "Dopo questa" : "Una domanda?"}</h2>
          <p>
            {next
              ? `Ti consiglio «${next.titolo}».`
              : "Scrivimi su WhatsApp: ti risponde l’assistente IA di Luca, che passa la mano a lui quando serve."}
          </p>
        </div>
        {next ? (
          <WaButton guida={next} kind={next.pronta ? "vorrei" : "avvisami"} />
        ) : (
          <a className="btn soft" href={question} target="_blank" rel="noopener noreferrer">Scrivimi su WhatsApp</a>
        )}
      </section>
    </div>
  );
}
