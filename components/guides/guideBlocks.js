// Blocchi della guida «Alternativa a ManyChat» (IT/EN). Producono HTML semplice dentro la colonna
// .blog-article, quindi titoli, elenchi, tabelle e codice prendono lo stile degli articoli del blog;
// le classi g-* (components/guides/guide-article.css) servono solo a passi, controlli e avvisi.

export const Code = ({ children, tall }) => (
  <pre className={tall ? "g-tall" : undefined}>
    <code>{children}</code>
  </pre>
);

// «Parte A · L'app su Meta» -> etichetta sopra, titolo sotto. L'indice laterale usa il testo intero (page.js).
export const Part = ({ id, children }) => {
  const text = String(children);
  const i = text.indexOf(" · ");
  return (
    <h2 id={id} className="g-part">
      {i > 0 ? (
        <>
          <span className="g-kicker">{text.slice(0, i)}</span>
          {text.slice(i + 3)}
        </>
      ) : (
        text
      )}
    </h2>
  );
};

export const Step = ({ n, title, children }) => (
  <div className="g-step">
    <h3 id={`step-${n}`}>
      <span className="g-n">{n}</span>
      {title}
    </h3>
    {children}
  </div>
);

export const Check = ({ children, label = "Controllo" }) => (
  <p className="g-check">
    <b className="g-ok">{label}</b> {children}
  </p>
);
