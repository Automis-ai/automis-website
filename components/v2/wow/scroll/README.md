# wow/scroll: scroll fluido e animazioni a scroll

Cartella condivisa. La monta la home; chi lavora sulle pagine interne la riusa così com'è (non serve toccarla).
Librerie: `gsap` (ScrollTrigger, SplitText) e `lenis`, già nel progetto. Niente `npm install`.

## 1. Scroll fluido: `<SmoothScroll />`

```jsx
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
// dentro la pagina, in qualunque punto (non disegna niente):
<SmoothScroll />
```

- Una volta per pagina. Lenis agganciato a ScrollTrigger (`lenis.on("scroll", ScrollTrigger.update)` e `gsap.ticker`).
- **Spento** con `prefers-reduced-motion` e sui dispositivi touch (`hover: none` / `pointer: coarse`): lì resta lo scroll
  nativo. Se la preferenza cambia a pagina aperta, si accende o si spegne da solo.
- I link `#ancora` scorrono con Lenis e tengono 88 px sotto l'header fisso (`offset`, stesso valore di
  `scroll-margin-top` del kit). Cambia con `<SmoothScroll offset={96} />`.
- Dentro `[role="dialog"]` / `[aria-modal="true"]` la rotella non viene presa. Per altri riquadri che scorrono da soli
  (menù lunghi, liste) metti `data-lenis-prevent` sull'elemento.
- Il sito ha `html { scroll-behavior: smooth }` in `app/globals.css`: `scroll.css` lo annulla solo quando Lenis è attivo.
- Lenis e gsap si caricano con dynamic import dopo il primo disegno: il testo della pagina non li aspetta.

## 2. Regole per chi anima una pagina con gsap

1. **Il HTML del server è lo stato finale.** Niente `opacity: 0` o `translate` nel CSS e niente `<Reveal>` di
   `components/home/_ui.js` (nasconde il contenuto nel HTML finché non parte il JS). L'entrata la fa gsap (`from`),
   quindi senza JavaScript, o se gsap non si carica, tutto resta leggibile.
2. **Con `prefers-reduced-motion` non si crea niente.** Usa `gsap.matchMedia()` con le query di `env.js`:
   `RICH` (mouse vero, da 768 px), `PIN` (RICH + schermo grande, per le sezioni fissate), `LITE` (telefono e tablet:
   entrate semplici, niente pin, niente inclinazione). Se non scatta né RICH né LITE: si esce senza fare nulla.
3. **Solo `transform` e `opacity`** (gsap li anima come transform inline; niente animazioni CSS su altre proprietà).
4. **Una sezione fissata non è mai più alta della finestra.** Controlla l'altezza prima di fissare e, se non ci sta,
   non fissare (vedi `home/stages/cases.js`). Su telefono mai sezioni fissate.
5. **Titoli con parole in gradiente** (`background-clip: text`): `wordsIn(el, deps, { by: "lines" })`, non per parole.
   Chrome smette di ritagliare il gradiente se i discendenti hanno un transform proprio.
6. Tutto quello che crei dentro `gsap.matchMedia().add(...)` si annulla da solo quando cambia la query. I listener
   del mouse vanno in una lista di pulizia (vedi `HomeStory.js`, `env.cleanups`).

## 3. Cosa c'è

| File | A cosa serve |
| --- | --- |
| `SmoothScroll.js` | Lenis + ScrollTrigger (sopra). |
| `gsap.js` | `loadGsap()`: dynamic import di gsap, ScrollTrigger, SplitText, registrati una volta sola. Rifiuta se non si carica. `getLoaded()`: se sono già caricati li dà subito, altrimenti `null` (non scarica niente). |
| `focus.js` | `installFocusGuard()` (la monta `SmoothScroll`, quindi ogni pagina che lo monta): il focus da tastiera dentro una scena a scorrimento. Se l'elemento è in una scena legata allo scroll non ancora composta (trasparente, impilata, rimpicciolita) la pagina salta alla fine del tratto della scena e la scena si compone subito; le entrate «una volta sola» a metà vengono portate a fine. Scatto istantaneo (`scroll-behavior: auto` solo per quel salto). Guarda i ScrollTrigger vivi: non serve fare niente nelle scene. |
| `smooth.js` | `smooth.lenis`: il Lenis in funzione (lo scrive `SmoothScroll`), per chi deve spostare la pagina da codice. |
| `env.js` | Le query `REDUCED`, `TOUCH`, `RICH`, `PIN`, `LITE`. |
| `split.js` | `wordsIn(el, deps, opts)` titolo a parole con maschera per riga (SplitText, aria ok); `riseIn(els, deps, opts)` entrata dal basso. |
| `count.js` | Numeri che contano fino al valore vero (`data-wow-count="2.329"`, scritto con un modifier: il valore finale è sempre quello giusto). |
| `pointer.js` | `tiltCards(cards, deps)` inclinazione 3D al mouse con alone; `magnetic(els, deps)` bottoni magnetici (solo con mouse); `gyroTilt(faces, deps)` inclinazione dal giroscopio del telefono (Android; su iPhone non fa niente, serve un permesso con finestra di sistema). |
| `measure.js` | `offsetIn(el, stop, axis)`: posizione a riposo (senza transform) dentro un antenato. |
| `wires.js` | Fili e pacchetti di luce (il linguaggio «sistema / interconnessione / velocità»): `makeWire()` crea un filo fra due punti (solo transform e opacità), `packetTween()` e `chainTimeline()` fanno correre i pacchetti, `pathBetween()` trova il cammino fra schede. Tutto va tolto con `dispose()` nella pulizia. |
| `NetworkEcho.js` | Eco della rete (SVG) da mettere dietro una sezione; `runEcho()` fa correre i pacchetti di luce. La home non lo usa più (la chiusura ha la sua rete di moduli, `home/stages/call.js`): resta per le altre pagine. |
| `scroll.css` | Regole di Lenis. |

Esempio minimo (in un componente client):

```jsx
useEffect(() => {
  let mm;
  loadGsap().then(({ gsap, ScrollTrigger, SplitText }) => {
    mm = gsap.matchMedia();
    mm.add({ rich: RICH, lite: LITE }, (ctx) => {
      if (!ctx.conditions.rich && !ctx.conditions.lite) return; // movimento ridotto: niente
      wordsIn(el, { gsap, SplitText, ScrollTrigger });
    });
  }).catch(() => {});
  return () => mm && mm.revert();
}, []);
```

La coreografia della home (cosa fa ogni sezione) sta in `components/v2/home/HomeStory.js` e `home/stages/*.js`.

## 4. Fili, nodi e il filo della pagina (fase WOW, giro 1)

- **Il filo della pagina** (`home/Spine.js` + `home/stages/spine.js`): una linea al margine sinistro con un pacchetto che scende
  con lo scroll (sta a ~58% della finestra, con un po' di ritardo) e accende un nodo per sezione; in fondo gira l'angolo ed entra nel
  bottone della call. La posizione del pacchetto, già smorzata, è l'unica verità: i nodi si accendono quando la superano.
  Le misure si rifanno a ogni `refresh` di ScrollTrigger (`ScrollTrigger.addEventListener("refresh", …)`).
- **Le posizioni si leggono senza i transform** (catena di `offsetTop`/`offsetLeft`): le schede in entrata sono inclinate e
  spostate da gsap, `getBoundingClientRect()` darebbe misure sbagliate.
- **Il bottone fisso del telefono** (`layouts/AkpagerLayout.js`) è rimpicciolito e nascosto da `HomeStory` con l'attributo
  `data-v2hp-sticky` (un attributo: React riscrive `className` a ogni cambio di stato del layout e cancellerebbe le classi).
- **Con `prefers-reduced-motion` `HomeStory` non carica gsap**: zero `requestAnimationFrame` da fermo. Il filo e i fili sono invisibili.
- **I numeri non partono mai da 0**: niente conteggio sulle carte dei casi; l'animazione tocca solo opacità e posizione.

## 5. Fase WOW, giro 2

- **Passaggio hero -> categorie** (`home/stages/handoff.js`): la sezione delle categorie si sovrappone alla fine della pista della hero
  (`margin-top` negativo da `--hs-pull`, attributo `data-hs` = `a` | `b`). Modo `a` (schermo largo): titolo sopra le tessere e le cinque
  card nello stesso punto delle tessere (stessa piastra, stesso passo), che compaiono sopra di loro mentre la pista finisce. Modo `b`
  (telefono, tablet, schermo basso): titolo a ~75-90 px sotto le etichette. Le posizioni dei dock sono copiate da
  `wow/hero/scene/graph.js` (`layoutModules`): se cambiano, va aggiornata `dockGeometry()`. Si rifà a ogni `refreshInit` di ScrollTrigger e,
  se cambia il modo, `HomeStory` rifà tutte le coreografie (`env.rebuild`). `env.hs.at(f)` dà lo `start` di ScrollTrigger a una frazione
  della pista.
- **Regola per le tween sfalsate (stagger) legate allo scroll**: lo stato iniziale va scritto a mano con `gsap.set` e la `fromTo` porta
  `immediateRender: false`. GSAP non disegna lo stato iniziale delle tween che partono dopo lo zero, e le carte restano visibili.
- **Pila di carte sul telefono** (`home/stages/cases.js` + CSS): carte `position: sticky` in colonna flex (non in griglia), che si ritirano
  con scala e un velo (`.v2hp-case__dim`), mai con l'opacità della carta (le carte sotto trasparirebbero).

## 6. Fase WOW, giro 3

- **Focus da tastiera nelle scene** (`focus.js`, vedi tabella): niente più link con opacità 0 o saltati dal Tab. Regola per chi scrive scene nuove: non nascondere
  con `visibility: hidden` / `autoAlpha` ciò che contiene link (esce dall'ordine di Tab): basta l'opacità, più `pointer-events: none` finché non è composto
  (esempio: le card in `home/stages/cats.js`, modo «a»). Il resto lo fa il guardiano.
- **Il sito ha `html { scroll-behavior: smooth }` e Lenis, da fermo, non lo annulla**: anche `lenis.scrollTo(y, { immediate: true })` e il focus del browser
  partono come scivolate. Per uno scatto vero: `document.documentElement.style.scrollBehavior = "auto"` per quel gesto (vedi `jump()` in `focus.js`).
- **Telefono e tablet senza mouse**: `home.css` appiattisce `transform-style` e toglie `translateZ` (il rilievo c'è solo col mouse). I figli di un elemento
  `preserve-3d` diventano un livello composito a testa: sulla home erano ~80 su ~160.
- **Un contenitore `position: absolute; inset: 0` con figli posizionati in px diventa un livello alto quanto la pagina**: il filo (`.v2hp-spine`) ora è alto 0.
