# Kit visivo v2 (`components/v2/ui`)

Il kit con cui si costruiscono tutte le pagine del sito v2. **Questo è l'unico documento da leggere.**
Il kit non contiene testo: ogni parola, ogni `href` e ogni etichetta (anche quelle per gli screen reader)
arriva dalle props. Non conosce la lingua: la pagina passa testi e link già pronti.

## Regole d'oro

1. **Importa dal file del componente**, non dal barrel: `import PageHero from "@/components/v2/ui/PageHero"`.
   Così una pagina senza demo non si porta dietro il JavaScript delle demo. Sono client solo
   `ScriptedChat` e `BrainSearchDemo`; tutto il resto è server (Faq e Disclosure usano `<details>`).
2. **Ogni cosa sta dentro una `<Section>`** (tranne `PageHero`, `Hero` e `CtaBand`, che sono già fasce). La `Section` decide
   il tono, e il tono colora tutto ciò che contiene: la stessa scheda vale su fondo scuro e su fondo chiaro.
3. **Alterna i toni**: `dark` → `light` → `deep` → `light`… Mai tre fasce scure di fila. Il giallo
   (`<Accent>` e il bottone `gold` di `CtaBand`) **una volta per sezione**.
4. **Ritmo**: ogni sezione ha un titolo, un elemento visivo (scheda, numero, passi, demo) e al massimo
   ~25 parole visibili. Il resto va in `<Disclosure>` o `<Faq>`.
5. **Link interni**: `href={addLangPrefix("/systems/marketing", locale)}` (da `@/lib/locales`), `locale` = `"en"`, `"it"` o `"pt"`.
   Eccezione voluta: `/it/ecommerce/shopify` e `/it/ecommerce/woocommerce`, scritti interi.
6. **Cornice di pagina**: avvolgi tutto in `AutomisEnShell` (o `AutomisItShell`): carica font, header e footer.
   Il kit non li include. `PageHero` (e `Hero`) lasciano già lo spazio per l'header fisso.
7. **Non passare funzioni** ai componenti client (`ScriptedChat`, `BrainSearchDemo`): solo dati.
8. Niente numeri, tempi o clienti scritti dentro il kit: li passi tu, dalla §3 del brief.

## Scheletro di una pagina

```jsx
import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHero from "@/components/v2/ui/PageHero";
import Accent from "@/components/v2/ui/Accent";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CategoryGrid from "@/components/v2/ui/CategoryGrid";
import CategoryCard from "@/components/v2/ui/CategoryCard";
import CtaBand from "@/components/v2/ui/CtaBand";
import { addLangPrefix } from "@/lib/locales";

const L = "it";
export default function Page() {
  return (
    <AutomisEnShell>
      <PageHero
        eyebrow="Agenzia IA"
        title="Costruiamo il sistema IA che manca alla tua azienda."
        highlight={["sistema IA"]}
        subtitle="Prima ascoltiamo come lavori, poi lo costruiamo su misura."
        primaryCta={{ label: "Raccontaci il tuo caso", href: addLangPrefix("/contact", L) }}
      />
      <Section tone="light">
        <SectionHeader eyebrow="Sistemi" title="Cinque famiglie di sistemi" />
        <CategoryGrid>
          <CategoryCard title="Sistemi IA per il Marketing" line="…" icon="marketing" cta="Scopri di più" href={addLangPrefix("/systems/marketing", L)} />
          {/* … le altre quattro */}
        </CategoryGrid>
      </Section>
      <CtaBand title="…" line="…" button={{ label: "Raccontaci il tuo caso", href: addLangPrefix("/contact", L) }} />
    </AutomisEnShell>
  );
}
```

---

## Struttura

### `Section`
`@/components/v2/ui/Section` · server
- `tone`: `"dark"` (default, #000a14) · `"light"` (#f3f6fa) · `"deep"` (blu #0a2647 con alone azzurro)
- `width`: `"default"` (1152 px) · `"narrow"` (760, per testo e FAQ) · `"wide"` (1280)
- `pad`: `"md"` (default) · `"sm"` (fasce sottili, es. ProofStrip) · `"lg"` · `"none"`
- `id`, `as` (default `"section"`), `className`, altre props passate al tag (es. `aria-labelledby`).

```jsx
<Section tone="light" id="sistemi"> … </Section>
```
Quando: sempre. Una `Section` per idea. Padding verticale 56 px a 390, 80 a 768, 96 a 1024. Contenitore: 20 px ai lati a 390.

### Toni di pagina: `.v2-tone-a` e `.v2-tone-b`
Due varianti per alleggerire lo sfondo senza snaturare il sito. **Non cambia l'API di `Section`**: basta UNA classe su un contenitore che racchiude le fasce (anche `PageHero` e `CtaBand`).
```jsx
import { toneClass } from "@/components/v2/ui/toneClass";
<div className={toneClass(searchParams?.tono)}>   {/* "a" → v2-tone-a, "b" → v2-tone-b, altro → "" (sito di oggi) */}
  <PageHero … /> <Section tone="light">…</Section> <Section tone="deep">…</Section> <CtaBand … />
</div>
```
- **A, blu notte → blu medio.** Niente bianco: `light` diventa blu medio `#1a4f8c` con testo chiaro, `dark` `#000a14` e `deep` `#0a2647` restano. Gradini di blu.
- **B, chiari morbidi.** `light` diventa grigio-azzurro `#e1e9f2` (le schede restano bianche e si staccano); `dark` e `deep` restano blu notte.
- In entrambe, **ogni fascia entra con una sfumatura** che parte dal colore della fascia precedente (altezza = padding alto della fascia: 52 px a 390, 76 a 768, 92 a 1024). Mai un taglio netto. Per funzionare le fasce devono essere **sorelle** nello stesso contenitore (la sfumatura legge la fascia che precede): non annidarle in wrapper diversi.
- Contrasto del testo misurato sulla pagina vera (≥ 4,5:1 su tutti i testi, ≥ 3:1 sui titoli grandi): A `light` minimo 4,9 (icona nella tessera) · B `light` minimo 5,2 (sopratitolo) · dark/deep 6,1 (parola blu del titolo).
- Se scrivi CSS tuo dentro una fascia, usa solo le variabili (`--v2-ink`, `--v2-ink-2`, `--v2-accent`, `--v2-card`…): cambiano da sole con il tono. Mai `#fff` o `#06182b` scritti a mano.

### `SectionHeader`
`@/components/v2/ui/SectionHeader` · server
- `eyebrow` (sopratitolo corto), `title` (testo o JSX con `<Accent>`), `lead` (una riga), `align`: `"start"` (default) · `"center"`, `as` (`"h2"` default), `id`.
```jsx
<SectionHeader eyebrow="Come lavoriamo" title={<>Tre passi, <Accent>nessuna sorpresa</Accent></>} lead="Si parte da una call." />
```
Quando: apre ogni sezione. Il titolo è già bilanciato (`text-wrap: balance`). Solo `PageHero` (o `Hero`) porta l'`<h1>`.

### `PageHero` (l'apertura di tutte le pagine nuove)
`@/components/v2/ui/PageHero` · server · **centrata**, come la hero del sito originale. Niente elementi a destra.
- `eyebrow` (testo della pillola), `title` (testo o JSX: l'unico `<h1>` della pagina), `highlight` (stringa o elenco: le parole del titolo che vanno in blu), `subtitle`
- `primaryCta`, `secondaryCta`: `{label, href, external?}`. A 390 vanno una sotto l'altra a tutta larghezza
- `size`: `"full"` (default: home e pagine di apertura) · `"compact"` (pagine interne: meno altezza e titolo più piccolo)
- `tone`: `"dark"` (default) · `"deep"` · `"light"`
- `bg`: slot **dietro** il testo per uno sfondo animato (di solito un `<video muted loop playsInline autoPlay>`). Il kit ci mette sopra una velatura per il contrasto. `veil`: `"normal"` (default) · `"strong"` (video molto vivace) · `"none"` (lo sfondo è già scuro)
- `below`: slot **sotto** il testo, centrato (max 1024 px, con un alone dietro): un elemento visivo che ha senso (animazione, demo, prodotto). Di solito `<MediaFrame>`
- `children`: riga piccola sotto i bottoni
```jsx
<PageHero
  eyebrow="Agenzia IA"
  title="Costruiamo i sistemi che mancano al tuo business."
  highlight={["sistemi", "business"]}
  subtitle="Scopriamo dove il tuo business perde tempo e soldi. Poi lo sistemiamo."
  primaryCta={{ label: "Raccontaci il tuo caso", href: addLangPrefix("/contact", L) }}
  secondaryCta={{ label: "Guarda i casi", href: addLangPrefix("/use-cases", L) }}
  bg={<>
    <video src="/media/hero-loop.mp4" poster="/media/hero-loop-poster.webp" muted loop playsInline autoPlay preload="none" />
    <img className="v2-phero__still" src="/media/hero-loop-still.webp" alt="" />
  </>}
  below={<MediaFrame ratio="16 / 9"><video … /></MediaFrame>}
/>
<PageHero size="compact" tone="deep" eyebrow="Sistemi IA per l'Assistenza"
          title={<>Sistemi che <Accent tone="blue">rispondono</Accent> ai tuoi clienti</>} subtitle="…" />
```
Note:
- Il blu delle parole è il blu del brand (#3c91e6 su scuro): vale per `highlight` e per `<Accent tone="blue">` dentro il titolo. Il giallo di `<Accent>` resta una volta per sezione, altrove.
- `prefers-reduced-motion`: il testo non si anima e il `<video>` dentro `bg` sparisce; l'`<img className="v2-phero__still">` (se c'è) compare al suo posto. Senza still resta solo l'alone.
- Con `bg` l'altezza dello sfondo è quella del testo (al massimo 560-700 px): in basso e in alto si scioglie nel fondo della pagina. Il video deve essere scuro dietro al titolo; se non lo è, `veil="strong"`.
- Un solo `PageHero` per pagina. `Hero` (a sinistra, con `media` a destra) resta per le pagine non ancora rifatte: nelle pagine nuove non si usa.

### `Hero` (vecchia, a sinistra: sostituita da `PageHero` nelle pagine nuove)
`@/components/v2/ui/Hero` · server
- `title` (l'unico `<h1>` della pagina), `subtitle`, `primaryCta {label, href, external?}`, `secondaryCta` (stessa forma, opzionale)
- `media`: slot a destra (da 1024) o sotto il testo: di solito `<MediaFrame>` con un loop, uno screenshot o `<ScriptedChat>`
- `eyebrow`, `tone` (`"dark"` default · `"deep"` · `"light"`), `align` (`"start"` default · `"center"`, solo senza media), `children` (riga extra sotto i bottoni)
```jsx
<Hero title="…" subtitle="…" primaryCta={{ label: "Raccontaci il tuo caso", href: "/it/contact" }}
      media={<MediaFrame ratio="4 / 3"><video … /></MediaFrame>} />
```
Quando: apertura di ogni pagina. A 390 i bottoni vanno uno sotto l'altro a tutta larghezza.

### `CtaBand`
`@/components/v2/ui/CtaBand` · server
- `title`, `line`, `button {label, href, external?}` (bottone giallo), `secondary` (opzionale), `tone` (fondo attorno al pannello, default `"dark"`), `id`
```jsx
<CtaBand title="Raccontaci come lavori" line="Ti rispondiamo con una proposta." button={{ label: "…", href: "…" }} />
```
Quando: chiusura di pagina, **un solo invito**. Il pannello è sempre blu notte, anche su fondo chiaro.

### `Accent`
`@/components/v2/ui/Accent` · server · `children`, `tone="blue"` (enfasi azzurra, senza giallo).
Su fondo scuro è testo giallo; su chiaro è un evidenziatore giallo dietro il testo scuro. Dentro i titoli, **una volta per sezione**.

---

## Schede

### `CategoryGrid` + `CategoryCard`
`@/components/v2/ui/CategoryGrid`, `@/components/v2/ui/CategoryCard` · server
- `CategoryCard`: `title`, `line`, `href`, `icon` (nome dal catalogo icone qui sotto, o un elemento React), **`cta`** (testo del link visibile: IT «Scopri di più», EN «Learn more», PT «Saiba mais»; **arriva dalla pagina**, il kit non ha testo)
- `CategoryGrid`: solo contenitore. 1 colonna a 390 (scheda orizzontale: icona a sinistra, testo e link a destra), 2 da 640, 3 da 1024; con 5 schede diventa 3 + 2 a tutta larghezza.
- **Stati vivi**: al passaggio del mouse, al focus da tastiera (Tab) e al tocco la scheda si alza di 3 px, prende il bordo e l'alone azzurri del brand, l'icona si riempie e ruota appena, la freccia scorre e il testo del link si sottolinea. Con `prefers-reduced-motion` restano bordo e alone, niente si muove.
- **Accessibilità**: il link è la riga `cta` (area ≥ 44 px, tutta la scheda è cliccabile); il titolo resta un titolo. Il nome letto dallo screen reader è «Scopri di più: Sistemi IA per il Marketing». Senza `cta` torna la versione di prima (titolo = link, freccia in cerchio).
```jsx
<CategoryGrid>
  <CategoryCard title="Sistemi IA per la Vendita" line="Nessun contatto resta senza risposta." icon="sales"
                cta="Scopri di più" href={addLangPrefix("/systems/sales", L)} />
  …
</CategoryGrid>
```
Quando: hub `/systems` e home. Una riga di testo per scheda, non due. I nomi delle categorie stanno in `components/v2/copy/common.<lingua>.js` (`categories`), non riscriverli.

### `SystemCard`
`@/components/v2/ui/SystemCard` · server
- `title`, `line`, `icon` (opzionale), `href` (opzionale: se c'è, tutta la scheda è cliccabile), **`cta`** (opzionale, come sopra: con `href` + `cta` compare il link testuale in fondo; senza `cta` il titolo è il link, come prima)
- `caseHref` + `caseLabel` (opzionali, vanno insieme): mostra il badge **«Caso reale →»** (nome fisso per lingua) che porta al caso studio
- Stessi stati vivi di `CategoryCard` (alzata di 2 px). Compatta: icona a sinistra, testo a destra.
```jsx
<CardGrid cols={3}>
  <SystemCard title="Receptionist vocale IA" line="Risponde, prenota e smista le chiamate." icon="voice" cta="Scopri di più"
              href={addLangPrefix("/voice-ai", L)} caseHref={addLangPrefix("/use-cases/clinica-santa-maria", L)} caseLabel="Caso reale →" />
</CardGrid>
```
Quando: le schede dentro `/systems/<categoria>`. Senza cliente: **niente `caseHref`, niente numeri**. Schede senza `href` (non cliccabili) non hanno stati.

### `CardGrid`
`@/components/v2/ui/CardGrid` · server · `cols`: `2` · `3` (default) · `4`. 1 colonna a 390, 2 da 640, `cols` da 1024. Per `SystemCard`, `CaseTeaser`, schede tue.

### `CaseTeaser`
`@/components/v2/ui/CaseTeaser` · server
- `client`, `logo {src, alt?, width?, height?}` (opzionale), `number` (grande), `numberLabel` (cosa conta, con base e finestra)
- `problem`, `problemLabel` (es. «Il problema»), `system`, `systemLabel` (es. «Il sistema»): le due didascalie sono opzionali ma consigliate
- `href`, `linkLabel` (tutta la scheda è cliccabile)
```jsx
<CardGrid cols={2}>
  <CaseTeaser client="Clínica Santa Maria" number="872" numberLabel="chiamate gestite, dal 1/2 al 9/9/2026"
              problem="…" problemLabel="Il problema" system="…" systemLabel="Il sistema"
              href={addLangPrefix("/use-cases/clinica-santa-maria", L)} linkLabel="Leggi il caso" />
</CardGrid>
```
Quando: home e indice casi. **Un numero solo, sulla base del titolo del caso**, preso dalla §3 del brief.

### `PlatformPicker`
`@/components/v2/ui/PlatformPicker` (esporta anche `PLATFORM_ACCENTS`) · server
- `items`: `[{ name, line, href, accent, langTag? }]`. `accent` = colore esadecimale (bordo alto e quadratino con l'iniziale; il testo sul quadratino si sceglie da solo). `langTag` = etichetta piccola (es. «Solo in italiano»).
- `PLATFORM_ACCENTS.shopify` = `#95BF47`, `PLATFORM_ACCENTS.woocommerce` = `#7f54b3`
```jsx
<PlatformPicker items={[
  { name: "Shopify", line: "…", href: "/it/ecommerce/shopify", accent: PLATFORM_ACCENTS.shopify, langTag: "Solo in italiano" },
  { name: "WooCommerce", line: "…", href: "/it/ecommerce/woocommerce", accent: PLATFORM_ACCENTS.woocommerce, langTag: "Solo in italiano" },
]} />
```
Quando: pagina `/ecommerce`, dopo la presentazione del prodotto.

### `Badge`
`@/components/v2/ui/Badge` · server · `tone`: `"blue"` (default) · `"gold"` · `"neutral"`. Il testo sono i figli. Per etichette come «Prodotto» o «Solo in italiano». **Mai etichette di stato** (in uso, pilota, beta…).

---

## Spiegare e provare

### `Steps`
`@/components/v2/ui/Steps` · server · `items`: `[{ title, line }]`, da 3 a 4. Verticale a 390 (linea che collega i numeri), in riga da 768.
```jsx
<Steps items={[{ title: "Ascoltiamo come lavori", line: "…" }, { title: "…", line: "…" }, { title: "…", line: "…" }]} />
```
Quando: «Come lavoriamo». I numeri 1-4 li mette il componente.

### `ProofStrip`
`@/components/v2/ui/ProofStrip` · server
- `clients`: `[{ name, logo?: { src, alt?, width?, height? } }]` (con logo: pastiglia bianca; senza: nome in pillola), `caption` (riga sopra), `number`, `numberLabel`
```jsx
<Section tone="dark" pad="sm">
  <ProofStrip caption="Già al lavoro per" clients={[{ name: "ADifesa", logo: { src: "/assets/images/client-logos/adifesa.png" } }]}
              number="2.329" numberLabel="conversazioni gestite, dal 1/5 al 16/9/2026" />
</Section>
```
Quando: la riga di prova subito sotto la hero. **Un numero solo.**

### `Faq`
`@/components/v2/ui/Faq` · server (`<details>`, funziona senza JavaScript)
- `items`: `[{ question, answer, answerText? }]`: `answer` è testo o JSX; se è JSX, per il JSON-LD passa anche `answerText` (testo semplice)
- `jsonLd` (bool): aggiunge lo schema FAQPage; `exclusive` (bool): se ne apre una sola alla volta
```jsx
<Section tone="light" width="narrow"><SectionHeader title="Domande frequenti" /><Faq jsonLd items={[{ question: "…", answer: "…" }]} /></Section>
```
Quando: in fondo a una pagina; 3-6 domande. Usa `jsonLd` solo se le risposte sono visibili per intero e vere.

### `Disclosure`
`@/components/v2/ui/Disclosure` · server (`<details>`) · `summary` (etichetta che si clicca), figli (il testo in più), `open` (bool).
Quando: ogni volta che superi le ~25 parole visibili di una sezione.

### `ScriptedChat`
`@/components/v2/ui/ScriptedChat` · **client**
- `script`: `[{ from: "user" | "agent", text }]` (il copione: lo scrivi tu, da una conversazione vera)
- `name` (titolo della finestra), `status` (riga sotto il nome), `ariaLabel` (nome della conversazione per gli screen reader), `replayLabel` (se c'è, compare «rivedi»), `speed` (1 normale, 2 doppia)
```jsx
<ScriptedChat name="Assistente della clinica" status="Online" ariaLabel="Esempio di conversazione" replayLabel="Rivedi"
              script={[{ from: "user", text: "…" }, { from: "agent", text: "…" }]} />
```
I messaggi si scrivono quando la chat entra nello schermo (~10 s). Con `prefers-reduced-motion`, senza JavaScript e lato server si vede subito la conversazione finita. L'altezza è sempre quella finale: la pagina non salta. Nessuna rete. Larghezza max 480 px: mettila in una colonna o nello slot `below` di `PageHero`.

### `BrainSearchDemo`
`@/components/v2/ui/BrainSearchDemo` · **client**
- `query` (la domanda che si digita), `answer`, `source {title, meta?, snippet?}`, `sourceLabel` (es. «Fonte»), `windowTitle` (barra in alto), `ariaLabel`, `replayLabel`, `speed`
```jsx
<BrainSearchDemo windowTitle="Company Brain" query="…?" answer="…" source={{ title: "…", meta: "… · pagina 12", snippet: "…" }}
                 sourceLabel="Fonte" ariaLabel="Esempio di ricerca nel Company Brain" />
```
Si digita la domanda, appare la risposta, poi la fonte. Stesse regole di `ScriptedChat`. La risposta e la fonte devono essere **vere** (un documento che esiste), mai generate dal vivo. Larghezza max 640 px.

### `MediaFrame`
`@/components/v2/ui/MediaFrame` · server · `ratio`: `"16 / 10"` (default), `"4 / 3"`, `"1 / 1"`… Cornice con bordo e angoli tondi per immagine o video. Il contenuto riempie la cornice (`object-fit: cover`). Dai sempre `alt` o `poster` ai media.

---

## Bottoni e icone

### `Button`
`@/components/v2/ui/Button` · server
- `href` (interno → `next/link`; `http(s)` → nuova scheda; `mailto:` e `tel:` → stessa scheda), `external` (forza)
- `variant`: `"primary"` (azzurro; su fondo chiaro è blu notte) · `"secondary"` (contorno) · `"gold"` (giallo, solo in chiusura) · `"link"` (testo)
- `arrow` (freccia finale: sì di default, tranne `secondary`)
- Senza `href` è un `<button>`: serve `onClick`, quindi un componente client tuo.
```jsx
<Button href={addLangPrefix("/contact", L)}>Raccontaci il tuo caso</Button>
```
Altezza minima 52 px (44 per `link`).

### `Icon`
`@/components/v2/ui/icons` · `<Icon name="marketing" size={22} />` (decorativa: `aria-hidden`, il testo accanto dice cosa è). Anche `ICON_NAMES`.
Un solo set di icone a linea (lucide-react, tratto 1,75, estremi arrotondati): categorie e sistemi parlano la stessa lingua. I nomi sono rimasti quelli di prima.
Nomi: `arrow` `check` `plus` `chevron` · categorie: `marketing` (megafono) `sales` (stretta di mano) `support` (cuffie) `admin` (cartella con ingranaggio) `hr` (persone) ·
sistemi: `voice` `cart` `brain` `training` `chat` `search` `doc` `web` `target` `star` `pen` `database` `camera` `video`
`contact` `chart` `receipt` `phone` `clock` `home` `mic` `scan` `inbox` `sliders` `repeat` `building` `shield` `calendar` `spark` `play`.
Nelle schede passi `icon="voice"`; per un'icona tua, un elemento React (es. un'icona di lucide-react, `stroke="currentColor"`).

---

## Quando usare cosa

| Voglio… | Uso |
|---|---|
| aprire la pagina | `PageHero` (`size="compact"` nelle pagine interne) |
| una riga di prova sotto la Hero | `Section pad="sm"` + `ProofStrip` |
| presentare le 5 categorie | `CategoryGrid` + `CategoryCard` (con `cta`) |
| elencare i sistemi di una categoria | `CardGrid` + `SystemCard` (con `cta` se cliccabili) |
| far vedere un risultato | `CaseTeaser` (un numero, sulla base del titolo) |
| spiegare un processo | `Steps` |
| far toccare con mano | `ScriptedChat` o `BrainSearchDemo` |
| scegliere Shopify o WooCommerce | `PlatformPicker` |
| nascondere il dettaglio | `Disclosure` o `Faq` |
| chiudere | `CtaBand` |
| alleggerire gli sfondi | `<div className="v2-tone-a">` o `v2-tone-b` attorno alle fasce |

Ritmo consigliato per una pagina lunga: `PageHero` (dark) → `ProofStrip` (dark, sm) → `Section light` (schede) → `Section deep` (passi) → `Section light` (casi) → `Section dark` (demo) → `CtaBand`.

## Misure a 390 px (già verificate)

Contenitore 350 px (20 px ai lati) · gap tra schede 12 px · 1 colonna · corpo del testo 16 px, righe di scheda 15 px,
etichette 12-13 px maiuscole · titoli sezione 28 px, H1 36 px · bersagli da toccare ≥ 44 px (bottoni 52 px, schede ≥ 88 px) ·
contrasto del testo ≥ 4,5:1 in tutti e tre i toni · nessun overflow orizzontale.

## Trappole

- **Il CSS globale del sito forza `section, section h2, section p, section li { color: white }`** e `section { background: #000a14 }`.
  Il kit lo scavalca con classi proprie. Se scrivi un tuo tag dentro una `Section` chiara, dagli il colore dalle variabili:
  `style={{ color: "var(--v2-ink-2)" }}`. Variabili: `--v2-ink` (titoli), `--v2-ink-2` (testo), `--v2-ink-3` (testo tenue),
  `--v2-accent` (azzurro leggibile), `--v2-line`, `--v2-card`, `--v2-card-line`, `--v2-bg`.
- I titoli hanno un `margin-bottom: 1rem` globale: in un tuo `<h2>` aggiungi `style={{ margin: 0 }}`. Meglio usare `SectionHeader`.
- Esiste un `:focus-visible { outline … !important }` globale: il kit lo scavalca con l'anello del tono. Non aggiungere i tuoi.
- `a, button { min-height: 44px; min-width: 44px }` è globale: un tuo link in linea dentro un paragrafo resta in linea, ma un link a sé diventa alto 44 px.
- I loop video (fase animazioni) vanno dentro `MediaFrame`, con `poster`, `muted`, `loop`, `playsInline`.
- Il sito colora di giallo ogni `a:hover`: i link del kit (`.v2-more`, `.v2-card__link`) lo scavalcano con il colore del tono. Un tuo link dentro una `Section` chiara ha bisogno della stessa cura.
- `.v2-cta` è il pannello di `CtaBand`: non usare questo nome per classi tue.
