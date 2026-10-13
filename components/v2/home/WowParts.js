import { Eyebrow } from "@/components/home/_ui";

/*
  Pezzi per le sezioni «dal sito originale» della home v2, nella versione che si anima con lo scroll.
  Differenza voluta rispetto a components/home/_ui.js: niente <Reveal>. Quello nasconde il contenuto (opacity 0) già nel
  HTML del server e lo mostra solo dopo che il JavaScript è partito. Qui il contenuto è sempre nel suo stato finale,
  visibile anche senza JavaScript; l'entrata la fa HomeStory (gsap), solo se il movimento è consentito.
*/

// Fascia di pagina: stessa struttura e stesso ritmo di Section in _ui.js, con l'attributo data-wow che HomeStory cerca.
export function WowSection({ id, wow, className = "", inner = "max-w-6xl", pad = "py-16 sm:py-20 md:py-24", children }) {
  return (
    <section id={id} data-wow={wow} className={`home-section relative ${pad} ${className}`}>
      <div className="container mx-auto px-5 sm:px-6">
        <div className={`${inner} mx-auto`}>{children}</div>
      </div>
    </section>
  );
}

// Titolo di sezione: sopratitolo, h2, riga di apertura. Stesse classi di SectionHeading, senza Reveal.
export function WowHeading({ eyebrow, title, lead, align = "center", titleClassName = "" }) {
  const alignCls = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const titleWidth = titleClassName || (align === "center" ? "mx-auto max-w-[16ch] sm:max-w-[20ch]" : "max-w-[20ch]");
  return (
    <div className={`flex flex-col ${alignCls}`} data-wow-head>
      {eyebrow ? (
        <div data-wow-eyebrow>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        data-wow-title
        className={`font-display mt-5 text-[1.75rem] leading-[1.14] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[2.6rem] sm:leading-[1.12] md:text-[3rem] ${titleWidth}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          data-wow-lead
          className={`mt-4 text-[1rem] leading-relaxed text-white/60 [text-wrap:pretty] sm:mt-5 sm:text-[1.05rem] ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

// Al posto di <Reveal>: un contenitore semplice, sempre visibile.
export function Plain({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
