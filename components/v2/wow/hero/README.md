# Hero della home: il «sistema» in 3D

Sfondo della hero della home (slot `bg` di `PageHero`). Concetto: **sistema, interconnessione, velocità di comunicazione, automazione**.
Nessun cervello disegnato: otto moduli dei sistemi Automis (chiamata, calendario, fattura, scheda cliente, social, chat, annunci, persone),
una dorsale di collegamenti sempre accesa, pacchetti di luce che corrono veloci e catene che scattano da sole
(chiamata → appuntamento → fattura → scheda cliente, oro solo sull'ultimo nodo). Brief §13 del sito v2.

**Il gesto firma (giro 3): un anello che si chiude sul bottone.** Su desktop il sistema gira da solo in un giro di ~5 s:
il bottone «Raccontaci il tuo caso» fa da grilletto (un impulso corto bottone → chiamata), parte la catena chiamata → appuntamento → fattura →
scheda cliente con i passaggi che accelerano (700, 450, 300 ms: la velocità si legge dal ritmo, senza numeri), l'oro scatta sulla scheda cliente,
e da lì **parte la cometa**: attraversa il centro in primo piano, per il corridoio fra sottotitolo e bottoni (scia additiva a forma di cometa,
mai attenuata dalla zona del testo), e **atterra sul bottone**, che fa un pop di 120 ms con un anello. Poi il sistema riposa ~1,3 s e il bottone
fa ripartire la catena. Il cursore sul bottone (o il focus da tastiera) fa partire il grilletto subito, se il sistema sta riposando.
Le catene minori (annunci → chiamata → chat, social → scheda cliente → persone) corrono in parallelo, più sottili e senza anelli forti.
La scena ha **tre piani**: un modulo grande, sfocato e velato (metà opacità) nell'angolo in alto a destra, uscito dal quadro per il 42 %, senza anelli
e mai a contatto con l'anello della scheda cliente; la catena a fuoco sul piano di mezzo; moduli piccoli e velati sul fondo. Gli anelli dei moduli
arrivano al massimo a ~1,05 lati di tessera di raggio. La rete di fondo è quasi spenta: pochi punti e fili corti che si accendono solo dove passa un pacchetto.

## File

| File | Che cosa fa |
| --- | --- |
| `NetworkHeroBg.js` | Guscio client. Rende aurora e still dal server, decide quando far partire il 3D, i ripieghi e il bind della pista. Su desktop comincia a scaricare il 3D appena il modulo viene eseguito (prima dell'idratazione). Carica il guscio della scena a mano (non con `next/dynamic`): se il chunk non arriva resta lo still e la pagina non cade. |
| `NetworkScene.js` | Monta il motore con `import()` (three arriva solo qui, solo lato client, dopo il primo disegno). |
| `title.js` | Titolo a parole (solo desktop con mouse): spezza le parole e le fa arrivare dalla profondità una dopo l'altra, con WAAPI (solo transform e opacità). Se il JS è in ritardo resta l'entrata CSS. |
| `scene/engine.js` | Il motore three.js: nodi, dorsale, pacchetti, moduli, dock, etichette, regia, bottone-nodo, qualità adattiva, pausa. |
| `scene/graph.js` | Dati puri: moduli, catene, categorie, etichette IT/EN/PT, disposizione (`layoutModules`) misurata sul testo vero, il filo verso il bottone (`ctaRoute`). |
| `scene/shaders.js`, `scene/icons.js` | Shader (anche profondità di campo: `uBlur`, `uDim`) e icone (le stesse di `components/v2/ui/icons.js`: marketing, sales, support, admin, hr). |
| `runway.js` | Misura l'avanzamento 0..1 dello scorrimento nella pista e scrive `--wow-s` sul testo. Nessuna dipendenza. |
| `hero.css` | Pista sticky, uscita del testo, entrata del testo, titolo a parole, bottone-nodo, carattere di ripiego del titolo, still, etichette, riduzione del movimento. |
| `public/media/hero-network/` | Still desktop e telefono (composizione con sfondo, senza testo, con la catena accesa). |

## Come funziona

- **Pista (runway)**: la sezione è alta `100svh + 110svh`; sfondo e testo sono `position: sticky` nella stessa cella di una griglia.
  Serve che `.page-wrapper` e `.automis-en` non siano contenitori di scorrimento: `hero.css` li porta a `overflow: clip` (stesso ritaglio) solo se c'è questa hero.
  Sotto i 560 px di altezza, con `prefers-reduced-motion` o senza `overflow: clip` non c'è pista: la hero scorre come una pagina.
- **Scorrimento**: `s` (0..1) muove i moduli su curve verso i cinque dock; ogni modulo si fonde nel dock della sua categoria e va a fuoco mentre arriva
  (marketing: annunci, social · vendita: scheda cliente · assistenza: chiamata, chat, calendario · amministrazione: fattura · HR: persone).
  A `s = 1` restano i cinque pannelli con l'icona e il nome della categoria, collegati da un bus: sono gli stessi simboli dei box sotto.
- **Layout** (`layoutModules`): moduli e dock si posizionano in pixel attorno al testo (`measureText` + misura del bottone e delle parti del testo): mai sopra titolo, sottotitolo o bottoni.
  - Desktop (da 900 px, con ≥ 120 px ai lati del testo, quindi anche 1024×768): tre piani (vedi sopra); la fila in basso sta sotto i bottoni con le etichette della catena sopra le tessere.
    Il primo piano sta nell'angolo in alto a destra, sopra l'anello della scheda cliente (`ringTop`).
  - Desktop basso (poco spazio sotto i bottoni, es. 1280×600): quattro moduli per lato, appuntamento e fattura in fondo alle colonne; la catena è la riga di parole sotto i bottoni.
    Il testo cresce con l'altezza (`hero.css`), così sta in uno schermo.
  - Compatto (< 900 px o poco spazio ai lati): due file da quattro sotto i bottoni, 14-26 px fra una tessera e l'altra (il pop di una tessera accesa non tocca le vicine).
  - **Cluster** (fascia sotto i bottoni troppo bassa: 360×640, 320×568, telefono in orizzontale): i quattro moduli della catena (chiamata, appuntamento, fattura, scheda cliente)
    uniti dai fili della dorsale, a «cappello» ai lati del testo (`putCluster`). In orizzontale stanno ai lati del titolo, nitidi; in verticale ai bordi, nella fascia delle prime righe
    (le righe sono centrate: ai lati restano ~55 px), un filo più velati. La catena gira davvero e la riga di parole sotto i bottoni si accende insieme.
- **Regia**: su desktop è l'**anello** descritto in cima (`runners`: `in` → `main` → `out` → riposo → `in`, ognuno chiama il successivo; `right` e `left` in parallelo).
  Il filo di andata (`routeOut`, 11 punti, arco in primo piano, corridoio fra sottotitolo e bottoni) e quello di ritorno (`routeIn`, 5 punti) hanno nodi propri e un attributo `aRoute`
  che li sottrae all'attenuazione della zona del testo; la cometa ha `free: true` (stessa cosa per testa e scia). Le scie sono 4 quadrilateri con tangente per punto: niente tacche nelle curve.
  Il bottone vero fa il pop con WAAPI additivo (non litiga con il magnete né con l'alzata al mouse) e un anello con `::before`/`::after` (solo opacità e transform); un anello più piccolo
  si apre anche quando parte il grilletto. Il cursore sul bottone (`pointerenter`) o il focus accorcia il riposo: la catena parte subito.
  Senza bottone-nodo (telefono, tablet, cluster) la catena principale riparte ogni 6 s (`EVENTS`), con gli stessi passaggi che accelerano; le catene minori solo se i moduli ci sono.
  Un guardiano riavvia l'anello se per 2,4 s non gira niente (layout cambiato a metà volo).
- **Riga della catena** (telefono, tablet, desktop basso): sempre leggibile (tappe non raggiunte a 0,72 di opacità, contrasto minimo 6,7:1); la tappa attiva ha il colore pieno e un fondo che compare.
- **Apertura** (desktop): pillola, titolo a parole (`title.js`, ~0,35 s → 1,5 s), sottotitolo e bottoni; il 3D è già scaricato e le tessere arrivano dalla profondità in sincro.
- **Telefono**: profilo leggero (DPR max 1,5, niente antialias, meno punti e pacchetti, niente mouse).
- **Pausa**: il motore non disegna fuori schermo né a scheda nascosta (0 draw call).
- **Qualità adattiva**: misurata sul tempo. Dopo ~2,4 s con fotogrammi sopra ~40 ms scende a DPR 1x; se persiste, passa allo still.
  Sopra ~11 fps medi passa subito. Lo still compare in dissolvenza e la pista si ritira (`data-wow-fallback`).
- **Ripieghi** (still pieno, `.is-on`): reduced motion (dal CSS, senza JS), risparmio dati, niente WebGL, chunk non scaricato, scena persa o troppo lenta.
  Lo still è nel DOM dal server ma a `opacity: 0`: così non entra nell'LCP, che resta il titolo.
- **Carattere di ripiego del titolo**: `Clash Display Fallback` (Arial Bold scalata al 107,5 %, con le misure di Clash) e larghezza massima in `em` (non in `ch`):
  quando Clash arriva il titolo non cambia numero di righe, quindi niente CLS.

## Rifare gli still

Con la scena in esecuzione (dev o produzione) e `window.__WOW_HERO_DEBUG = true`: fermare il tempo (`freeze(true)`), fermare l'anello (`dir.hold = true`, `runners.main.then = null`
così non parte la cometa), far avanzare la scena (`advance(3.5)`), far partire la catena (`fire("main")`) e fotografare 2,9 s dopo, quando c'è l'anello oro sulla scheda cliente. Catturare solo aurora + canvas, con testo, veli ed etichette nascosti
(viewport 1440×900 e 390×844 con DPR 1,5 per il telefono), e convertire in webp (`cwebp -q 60` desktop, `-q 58` telefono). Obiettivo: sotto i 35 KB e 20 KB.

## Misure

`window.__WOW_HERO_DEBUG = true` prima del caricamento espone `canvas.__heroDebug`: layout, rettangolo del testo, posizione del bottone, regia (`dir`, `runners`) e
i comandi `fire(chiave)`, `freeze(on)`, `advance(secondi)` per fotografare un istante preciso senza dipendere dalla velocità della macchina.
Attenzione: `page.screenshot({ clip })` ridimensiona la vista e fa ricreare la scena; per i ritagli fotografare tutta la vista e ritagliare dopo.
