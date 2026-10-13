/*
  Loader di webpack: ScrollTrigger (gsap 3.13.0) senza il ciclo requestAnimationFrame perenne.

  Il problema. All'avvio ScrollTrigger lancia `_rafBugFix`, un ciclo vuoto che richiede un fotogramma dopo l'altro
  per tutta la vita della pagina («in some browsers (like Firefox), screen repaints weren't consistent unless we had
  SOMETHING queued up in requestAnimationFrame»). Su ogni pagina che usa ScrollTrigger, anche ferma, anche col 3D spento,
  sono 60 risvegli al secondo del thread principale: batteria sul telefono per un movimento che non c'e'.

  Cosa fa. Il ciclo resta, ma gira solo mentre la pagina si muove: parte a ogni scroll o rotella (`_onScroll`, lo
  stesso gestore con cui ScrollTrigger si accorge dello scorrimento) e si ferma da solo 1,5 s dopo l'ultimo evento, o
  appena la scheda e' nascosta. Firefox, per cui il giro era stato scritto, lo tiene com'era.

  Come. Sostituzione di testo su node_modules/gsap/ScrollTrigger.js (versione esatta fissata in package.json, nessun
  `npm install`). Se in una versione futura le tre stringhe non si trovano piu', il file passa invariato e la build
  mostra un avviso: niente si rompe, si perde solo il risparmio. Va riscritta allora, non tolta di nascosto.
  Montata in next.config.mjs (webpack -> module.rules).
*/
const RAF_FIX_OLD = `_rafBugFix = function _rafBugFix() {
  return _enabled && requestAnimationFrame(_rafBugFix);
},`;

const RAF_FIX_NEW = `_rafBugUntil = 0,
    _rafBugOn = 0,
    _rafBugAlways = typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent),
    _rafBugFix = function _rafBugFix() {
  if (_enabled && (_rafBugAlways || !document.hidden && Date.now() < _rafBugUntil)) {
    requestAnimationFrame(_rafBugFix);
  } else {
    _rafBugOn = 0;
  }
},
    _rafBugKick = function _rafBugKick() {
  _rafBugUntil = Date.now() + 1500;
  if (!_rafBugOn && _enabled) {
    _rafBugOn = 1;
    requestAnimationFrame(_rafBugFix);
  }
},`;

const ON_SCROLL_OLD = "_onScroll = function _onScroll() {\n";
const ON_SCROLL_NEW = "_onScroll = function _onScroll() {\n  _rafBugKick();\n";

const START_OLD = "        _refresh100vh();\n\n        _rafBugFix();\n";
const START_NEW = "        _refresh100vh();\n\n        _rafBugKick();\n";

function count(src, needle) {
  return src.split(needle).length - 1;
}

module.exports = function gsapScrollTriggerIdle(source) {
  const ok = count(source, RAF_FIX_OLD) === 1 && count(source, ON_SCROLL_OLD) === 1 && count(source, START_OLD) === 1;
  if (!ok) {
    this.emitWarning(
      new Error(
        "gsap-scrolltrigger-idle-loader: il sorgente di ScrollTrigger non e' piu' quello di gsap 3.13.0, patch non applicata " +
          "(il ciclo requestAnimationFrame di ScrollTrigger torna a girare sempre). Aggiornare lib/v2/vendor/gsap-scrolltrigger-idle-loader.cjs."
      )
    );
    return source;
  }
  return source.replace(RAF_FIX_OLD, RAF_FIX_NEW).replace(ON_SCROLL_OLD, ON_SCROLL_NEW).replace(START_OLD, START_NEW);
};
