# Effetti del kit (`components/v2/wow/fx`)

Movimento e micro-interazioni delle pagine interne, coerenti con la home. Il concetto da far trasparire:
**sistema, interconnessione, velocità di comunicazione, automazione**. Mai cervelli disegnati.

## Regole che valgono per tutti

- Il testo arriva dal server e si vede subito: **niente è nascosto prima che parta JavaScript**.
- Si anima solo `transform` e `opacity`. Gli stili inline delle entrate si tolgono a fine corsa (`clearProps`).
- `prefers-reduced-motion`: gli effetti non partono (la scena 3D diventa un'immagine ferma).
- Sul tocco niente inclinazione, magnete e alone; restano le entrate (più corte, senza rotazioni).
- Si prepara all'entrata solo ciò che sta **sotto la piega** al montaggio: quello che si vede già resta fermo.
- `gsap` + `ScrollTrigger` + `SplitText` si caricano con dynamic import da `../scroll/gsap.js` (una promessa sola, condivisa
  con lo scroll fluido). Tilt, magnete, alone e scena 3D non usano gsap: un ciclo `requestAnimationFrame` che si ferma da solo.

## Come si accendono (il kit lo fa già)

`Section` e `PageHero` montano un `FxScope` al posto del loro `<div class="v2-wrap">` (stesso DOM). Il kit mette sul server
degli attributi `data-fx`, e `FxScope` li lega:

| attributo | effetto | chi lo porta |
|---|---|---|
| `data-fx="tilt"` | Tilt3D: inclinazione 3D al puntatore, con riflesso | `CategoryCard`, `SystemCard` (con `href`), `CaseTeaser`, `PlatformPicker`, schede-link delle pagine |
| `data-fx="magnetic"` | Magnetic: il pulsante segue appena il cursore | `Button magnetic` (PageHero e CtaBand lo accendono da sole) |
| `data-fx="split"` | SplitReveal: il titolo entra parola per parola | il titolo di `SectionHeader` |
| `data-fx="rise"` | sopratitolo e riga di apertura che salgono | `SectionHeader` |
| `data-fx="stagger"` | le schede della griglia entrano una dopo l'altra | `CardGrid`, `CategoryGrid`, `Steps`, `PlatformPicker`, griglie delle pagine |
| `data-fx="count"` | CountUp: le cifre si compongono come tessere, il valore vero è sempre nel DOM (mai un conteggio da zero) | `ProofStrip`, `CaseTeaser`, numero della garanzia |
| `data-fx="own"` / `"skip"` | il blocco si gestisce da solo / non entra | `SectionHeader` / testo della `PageHero` |

Tutti gli altri figli diretti di una `Section` entrano in profondità quando arrivano in vista. Le fasce scure
(`dark`, `deep`) hanno anche **CursorGlow**: un alone azzurro che segue il mouse, dietro il testo.
`<Section fx={false}>` spegne tutto per quella fascia.

## Componenti (per usarli a mano, fuori dal kit)

| file | cosa fa |
|---|---|
| `Tilt3D.js` | `<Tilt3D max lift>`: il figlio si inclina. Anche `attachTilt(el)` |
| `Magnetic.js` | `<Magnetic radius pull max>`: il figlio segue il cursore. Anche `attachMagnetic(el)` |
| `SplitReveal.js` | `<SplitReveal as="h2">`: titolo a parole |
| `Reveal.js` | `<Reveal>` (entra il blocco) · `<Reveal stagger>` (entrano i figli, uno dopo l'altro) |
| `CursorGlow.js` | `<CursorGlow />` come primo figlio di una fascia scura |
| `CountUp.js` | `<CountUp>2.329</CountUp>`: il formato (separatori, %, unità) resta quello |
| `PageScene.js` | la rete 3D dei moduli dietro le PageHero compatte (vedi sotto) |
| `PageTransition.js` | la transizione fra pagine: persiane che coprono e scoprono lo schermo dall'alto (vedi sotto) |
| `PageStory.js` | il racconto delle pagine interne: filo della pagina + rete di schede + catena dei passi (vedi «Il racconto delle pagine») |
| `NetGrid.js` | `<NetGrid mode>` e `<NetCell>`: l'involucro della rete di schede (hub: ricomposizione, categorie senza `moment`: catena) |
| `Rail.js` | `<Rail steps result cards pin>` e `<RailCell index>`: la catena di moduli di una pagina, con le schede e il numero del caso (`stages/rail.js`) |
| `Live.js` | `<Live>`: mette `is-live` finché il blocco si vede; serve ai cicli solo CSS (pacchetti sui fili) |
| `FxTile.js` | il modulo di vetro (piastrella con spessore) per hub, passi e filo della pagina |
| `FxScope.js` | il contenitore che lega gli `data-fx` |
| `scrollFx.js` | le funzioni delle entrate (nessun React) |
| `env.js` | `reducedMotion()`, `canHover()`, `isLite()`, `belowFold()` |

## PageScene: la rete 3D delle hero interne

Il concetto: **sistema, interconnessione, velocità di comunicazione, automazione**. Stessa lingua visiva della hero della
home (pannelli di vetro con bordo che si accende, anelli di attivazione, blu e azzurro, oro solo per il lampo finale),
in versione «lite». Mai cervelli disegnati: i nodi sono i **moduli dei sistemi** (chiamata, calendario, fattura, scheda
cliente, chat, social, annunci, documenti, ricerca, …).

- `PageHero size="compact"` senza `bg` la monta da sola. `scene="sales"` sceglie una scena a mano, `scene={false}` la spegne.
  Senza `scene` la scelta la fa il **percorso** (`scene/presets.js`, `presetForPath`): ogni pagina ha i suoi moduli, il suo
  ordine di catena e la sua disposizione (`u`, `v`, `arc`), per questo non sono tutte uguali.
- **Mai sul testo.** Il guscio (`PageScene.js`) misura dal DOM la scatola del testo (`.v2-phero__copy`: pillola, titolo,
  sottotitolo, bottoni) e la fascia riservata sotto di essa (`.v2-phero__stage`); `scene/layout.js` mette i moduli solo fuori
  (almeno 40 px dal testo, i nodi di contorno almeno 28) e fa passare i collegamenti sotto il testo, nella stage. A 1100 px e
  oltre i moduli stanno ai lati (`flank`), sotto in fila nella stage (`band`). `node fix-r1-pages-rects.mjs` (in scratchpad)
  stampa le distanze vere.
- **Motore** (`scene/pageEngine.js`, three.js): arriva con `import()` dentro l'effetto, solo lato client, dopo «load» e nel tempo
  morto (o dopo la transizione di pagina). Tubi sottili con pacchetti di dati che lasciano una scia (shader), catena che scatta
  da sola (il modulo si accende all'arrivo e passa il testimone; a fine catena un lampo dorato, uno solo), parallasse e
  inclinazione dei pannelli al mouse, si compone all'apertura e si scompone con lo scroll.
- **Fluidità:** il motore misura il tempo vero fra i fotogrammi (dopo i primi 2,5 s, che includono compilazione e entrata). Se la media di una finestra di 1,6 s supera 45 ms la densità di pixel scende a 1x; se per due finestre di fila supera 65 ms (sotto circa 15 fps) la scena si toglie da sola. `window.__V2_SCENE_FORCE = true` (solo per le prove su macchine cariche) disattiva il giudizio.
- **Telefono e rendering su software:** stesso motore, profilo leggero (DPR al massimo 1,5, niente antialias, 16 punti di polvere
  invece di 40; sul telefono ondeggiamento lento al posto del mouse). Il guscio riconosce una GPU emulata (SwiftShader, llvmpipe)
  da `WEBGL_debug_renderer_info` e parte già in questo profilo; sugli schermi a 2x l'antialias non serve e non c'è.
- **Si ferma** fuori schermo e a scheda nascosta (0 richieste di disegno). Se i primi 120 fotogrammi sono troppo lenti la
  scena si toglie da sola.
- **prefers-reduced-motion:** niente three e niente WebGL: un'immagine ferma già pronta (`public/media/page-scenes/<preset>-<sm|md|lg>.webp`,
  ~20-25 KB, `<picture>` con sm sotto 640 px, md fino a 1099, lg da 1100; `object-fit: contain`, in basso). Il `<picture>` sta **nel HTML del server** e ogni `<source>` porta `(prefers-reduced-motion: reduce)` nella sua `media`: il browser lo trova mentre legge la pagina (prima dell'idratazione) e lo scarica solo se serve; per gli altri resta l'`<img>` con un pixel trasparente `data:` (zero rete, mai candidato LCP). Prima lo still compariva dopo l'idratazione (LCP 2,8-3,6 s a CPU 4x; il titolo era a ~1,3 s). Restano 0 canvas e 0 animazioni. Per un preset nuovo: aggiungilo a `scene/presets.js` e a `STILL_IDS` in `PageScene.js`, e genera i tre webp (cattura della scena viva con sfondo trasparente, poi `cwebp -q 62 -alpha_q 55`).
  Gli still si rigenerano catturando la pagina con `prefers-reduced-motion` e il motore in modalità `still: true` (`createPageScene`), poi `cwebp`. **Risparmio dati, rete 2g/3g, niente WebGL, chunk bloccato, contesto
  perso:** nessuna scena, resta il fondo della hero. Il testo della hero arriva sempre dal server.

## PageTransition: il gesto di continuità

Un clic su un link interno: cinque persiane scure scendono e coprono lo schermo, la pagina cambia sotto, le persiane continuano a scendere e
scoprono la nuova pagina **dall'alto** (prima la hero scura, poi il corpo: così il corpo chiaro di un caso studio non spunta mai per primo in basso).
Ogni persiana ha un bordo di luce; a metà schermo un filo le attraversa e un modulo di vetro lo percorre (entra da sinistra, esce a destra).
Il titolo della nuova hero entra parola per parola (`scrollFx.heroArrive`) e **dopo** si compone la scena 3D. Header.js la monta su ogni pagina (renderizza null);
l'overlay vive nel body, fuori da React. **Telefono (schermo stretto o puntatore grossolano): niente persiane.** Misurato con CPU 4x e 4G lenta, le persiane aggiungevano ~0,5 s a ogni cambio
di pagina; ora il clic passa a Next senza ritardo, un filo di luce in alto (`.v2-ptl`, 2 px) dà riscontro al tocco e si chiude quando la pagina è montata, e il titolo della nuova hero entra a parole.
**Desktop:** gesto intero (da o verso la home) copertura ~320 ms + scoperta ~340 ms; fra due pagine interne (stessa hero, stesso fondo) la versione `quick`, ~230 + 250 ms (variabili CSS `--cover`, `--reveal`, `--in-stag`, `--out-stag` scritte da `PageTransition.js`). Il modulo attraversa tutto lo schermo lungo il filo, in sincro con la copertura e con la scoperta; ogni persiana ha il suo bordo di luce. Non parte con prefers-reduced-motion, risparmio dati,
rete 2g/3g/lenta, link con target o `hreflang` (il selettore di lingua), `data-no-transition`, ancore, file, tasti modificatori, scheda nascosta.
Se la nuova pagina non arriva in 6 s le persiane si ritirano comunque. Solo transform e opacity.

## Il racconto delle pagine (PageStory)

`PageStory.js` + `stages/{net,steps,spine}.js` + `NetGrid.js` + `FxTile.js` + `wires.js` + `story.css`: il filo della pagina, la rete di schede (hub: ricomposizione, categorie: catena)
e la catena dei passi di «Come lavoriamo». Dettagli e uso nel README del kit (`components/v2/README.md`, sezione «Il racconto delle pagine interne»).

## Header e piede

`layouts/Header.js`: quando lo scroll «attacca» il menù, si muove e cambia solo con `transform` e `opacity` (sale di 10 px con `translateY`; il fondo pieno e l'ombra stanno su un livello a parte che si accende in dissolvenza; `animation: none` sul vecchio `@keyframes sticky`, che animava `top`). Il pannello «Sistemi IA» si apre in profondità (si raddrizza dalla prospettiva, filo di luce sul bordo,
voci a scaglioni), la CTA è magnetica, le voci hanno la sottolineatura che scorre, il drawer mobile entra con una sequenza.
`layouts/Footer.js`: le colonne entrano a scaglioni, le voci scorrono appena, le icone social si alzano.
