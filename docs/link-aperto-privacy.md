# Link aperto: informativa e nota legale

Riprogettato il 26/11/2026 sul parere legale indipendente (`linkedin-portability/docs/compliance/07-link-aperto-revisione.md` e istruzioni in `08-istruzioni-a-luca.md`).
**Non pubblicata**: la privacy policy (`/it/privacy-policy`), la cookie policy e il banner cookie non sono stati toccati.
Niente go-live finché i testi sotto non sono approvati e firmati da un legale. Questa nota non è un parere legale.

## Che cosa fa (versione con consenso dedicato)

Quando Luca manda a una persona un link personale della guida (`automis.ai/it/guide/cfo?p=k7x2mn`), la pagina mostra un **riquadro di consenso proprio**. Il sito registra che il link è stato aperto **solo se la persona preme «Sì, va bene»**.

- Base giuridica unica: **consenso** (art. 122 Codice privacy, art. 6.1.a GDPR). Non la categoria «Statistici» del banner, non il legittimo interesse. Il banner cookie, `lib/consent.js` e `CONSENT_VERSION` non sono toccati.
- Il riquadro compare solo sulle pagine guida con `?p=` valido (prop `rif`), mai per il traffico interno (`?internal=1` o flag `automis_internal`). Due pulsanti uguali («Sì, va bene» / «No, grazie»), alti 48 px, niente scelta preimpostata, la pagina resta usabile senza rispondere.
- Il beacon parte **solo dal gesto «Sì, va bene»**, una volta sola. Con «No, grazie» o senza risposta non parte niente. Non c'è più nessun invio al caricamento della pagina e nessun ascolto del consenso del banner.
- Prova del consenso: cookie tecnico di prima parte `automis_link_aperto` (90 giorni) con versione del testo (`la1`, vedi `lib/guideVisita.js`), scelta, data e codice. La versione del testo viaggia con la riga; la data del consenso la mette il server al momento della registrazione. Se si cambia il testo, si cambia `CONSENSO_VERSIONE` e il riquadro richiede di nuovo la scelta.
- Dati su Supabase (tabella `link_aperti`): codice (6 caratteri), guida in evidenza (R1, R2, S4), data della prima apertura, versione del testo di consenso, data del consenso. **Tolti `volte` e `ultimo`.** Non salva nome, profilo LinkedIn, IP, user agent, posizione.
- Il legame codice -> persona resta **solo sul Mac di Luca**. Nessun dato LinkedIn sul sito o su Supabase.
- **Revoca**: dopo il «sì» la pagina mostra «Luca sa che hai aperto il link. [Ritira il consenso]». Il pulsante chiama `/api/guide-revoca` (stesso dominio, stesse difese, stesso segreto) che cancella la riga nella funzione `link-aperto`. Se la cancellazione non riesce, la pagina lo dice e dà `support@automis.ai` con il codice. In alternativa la persona scrive a `support@automis.ai`: Luca usa `sandbox/link-generator/revoca.mjs <codice>`.
- Limite noto: lo script GTM del layout toglie `?p=` dall'indirizzo subito dopo il caricamento. Se la persona ricarica la pagina il codice non c'è più e il riquadro non riappare. Per ritirare il consenso riapre il link originale (con il cookie «sì» vede subito «Ritira il consenso») oppure scrive a `support@automis.ai`.
- Scopo: contesto per Luca quando la persona scrive. **Nessun promemoria automatico** sul dato di apertura (postura B).
- Conservazione: 90 giorni dalla **prima** apertura (non c'è più `ultimo`), con `link_aperti_prune()`. La schedulazione pg_cron va fatta a mano prima del go-live (comando nella migrazione).
- **Il dato è parziale**: conta solo chi dice sì. La tappa si legge «almeno aperto», mai «non aperto».

## Testo del riquadro di consenso (implementato in `components/guide-catalogo/VisitaBeacon.js`, versione `la1`)

Passato da `humanizer` e poi da `copywriter`.

```
Questo link è personale
Te l'ha mandato Luca. Possiamo fargli sapere che l'hai aperto? Così, se ci scrivi, sa già di quale guida si parla. Non ti mandiamo promemoria. Salviamo il codice del link, la guida e la data, per 90 giorni.
[Sì, va bene]   [No, grazie]
Informativa   (rimanda a /it/privacy-policy#link-personali)

Dopo il «sì»:           Luca sa che hai aperto il link.   [Ritira il consenso]
Dopo la revoca:         Ritirato. Abbiamo cancellato l'apertura del link.
Se la revoca fallisce:  Non siamo riusciti a cancellarla da qui. Scrivi a support@automis.ai con il codice <codice>.
```

## Testo finale per l'informativa (sezione 16 della privacy IT, nuova 16.5, con ancora `id="link-personali"`)

Stile e forma delle sezioni 16.1-16.4 (noi, tu).

```
16.5 Se apri il link personale di una guida

Alcuni link alle nostre guide sono personali. Te li manda Luca Casillo per Automis, di solito su LinkedIn, e finiscono con un codice di sei caratteri (per esempio ?p=k7x2mn). Luca tiene sul suo computer di lavoro un elenco che collega ogni codice al nome e al profilo LinkedIn della persona a cui l'ha mandato.

- Cosa registriamo: quando apri un link personale, la pagina ti chiede se può avvisare Luca. Se rispondi di sì, salviamo il codice, la guida, la data della prima apertura e la versione e la data del tuo consenso. Luca vede queste informazioni accanto al tuo nome. Se rispondi di no, o non rispondi, non registriamo niente. In ogni caso non salviamo il tuo indirizzo IP né informazioni sul tuo dispositivo.
- A cosa serve: a dare a Luca un po' di contesto quando ci scrivi: sa che hai aperto la guida. Non ti mandiamo promemoria sulla base di questo dato.
- Base giuridica: il tuo consenso (art. 122 del Codice privacy e art. 6.1.a GDPR). Per questo dato non usiamo il legittimo interesse.
- Cookie: per ricordare la tua scelta salviamo sul tuo dispositivo un cookie tecnico (automis_link_aperto), per 90 giorni.
- Il codice nel messaggio WhatsApp: se ci scrivi su WhatsApp dal link, il messaggio già pronto contiene il codice («rif. k7x2mn»). Lo vedi e decidi tu se mandarlo. Per il resto vale la 16.2.
- Chi tratta i dati: Automis, titolare del trattamento (Sezione 1). Per conto nostro, Vercel ospita il sito e Supabase conserva il dato. Per i trasferimenti fuori dallo Spazio economico europeo vedi la Sezione 6.
- Per quanto tempo: 90 giorni dalla prima apertura. Poi cancelliamo il dato dal sito e dal computer di Luca.
- Come cambiare idea: puoi ritirare il consenso quando vuoi, con il pulsante «Ritira il consenso» sulla stessa pagina, oppure scrivendo a support@automis.ai con il codice del tuo link. Cancelliamo l'apertura dal sito e dal computer di Luca. Quello che è successo prima della revoca resta lecito.
- Da dove arrivano gli altri dati: il tuo nome e il link al tuo profilo li abbiamo dal collegamento su LinkedIn con Luca e dall'esportazione dei dati del suo account (vedi 16.1).
- I tuoi diritti: accesso, rettifica, cancellazione, limitazione, opposizione e portabilità (artt. 15-21 GDPR). Scrivi a support@automis.ai: rispondiamo entro un mese. Per il reclamo vedi la Sezione 8: in Italia puoi rivolgerti al Garante per la protezione dei dati personali.
```

Differenze rispetto al testo del parere (da far approvare): conservazione «90 giorni dalla prima apertura» (non più dall'ultima: `ultimo` non esiste); aggiunto il cookie tecnico di prova (la prova del consenso sta lì); aggiunto il «rif.» nel messaggio WhatsApp (il parere lo chiede all'azione 4); tolta la regione di Supabase (il parere scrive «UE» tra parentesi quadre: va verificata sul progetto prima di scriverla); reclamo come nelle sezioni 8 e 16.4, con l'autorità estone già nella Sezione 8: da chiarire con il legale (parere, domanda 5).

## Riga per la cookie policy (IT)

Il cookie tecnico di prova va nella tabella dei cookie, come «Consenso dedicato»:

```
automis_link_aperto | Automis (prima parte) | 90 giorni | Consenso dedicato, chiesto sulla pagina. Ricorda la tua scelta sul link personale della guida. Se acconsenti, il sito registra codice, guida e data della prima apertura, collegati alla persona a cui Luca ha mandato il link.
```

Il parere proponeva «Non installa cookie»: non è più vero, perché la prova del consenso sta in un cookie tecnico (e per l'EDPB, §50, il link stesso è già archiviazione: meglio non scrivere «niente sul dispositivo»).

## Nota legale (da confermare, non è un parere)

1. **Pseudonimo, non anonimo.** Il codice è un dato personale: chi ha la chiave (Luca) risale alla persona (considerando 26 GDPR). Non si scrive che «il codice da solo non dice chi sei».
2. **Una sola finalità, una sola base: il consenso.** Registrare l'apertura, associarla a una persona sul Mac e usarla come contesto è un trattamento unico. Il legittimo interesse resta per la gestione generale dei contatti (`02`), **senza** il dato di apertura. Dopo la revoca il dato si cancella (art. 17.1.b): non si passa all'interesse legittimo.
3. **ePrivacy.** EDPB 2/2023 (v2.0), §49-53: il link con identificatore e il codice lato client sono accesso a informazioni nel terminale. Art. 122 Codice privacy e Garante 2021 (par. 5, 7.1, 7.2): il consenso deve essere specifico; «Statistici» è descritto come aggregato, quindi non basta. Per questo il riquadro è dedicato.
4. **Rischio residuo da far firmare a un legale** (parere, §4): per l'EDPB (§51) l'accesso avviene già quando il browser chiede l'URL con `?p=`, prima di qualunque riquadro. `page.js` legge il codice a ogni visita (lo scarta, non lo registra). Il blocco del beacon riduce molto il rischio, non lo azzera.
5. **Art. 130 e postura B.** Il dato di apertura non genera promemoria né follow-up: la dashboard sul Mac non ha più nessuna azione che lo usa. Il messaggio con il link personale resta nel rischio già indicato in `00`.
6. **Il Mac scarta i codici che non conosce.** Un codice inventato da chiunque finisce nella tabella (solo con la versione del consenso, tetto di 100 codici nuovi all'ora), ma la dashboard lo ignora se non è in `link.jsonl`.

## Log, analytics e `?p=` (letto nel codice, da confermare dal vivo)

Non posso leggere i log live: questo è quello che risulta dal repo.

- **GA4, Clarity, Meta (via GTM):** lo script in `app/layout.js` toglie `?p=` dall'indirizzo con `history.replaceState` nello stesso blocco che poi carica GTM, solo su `/it/guide/`. Da provare con un test di rete prima del lancio (parere, azione 8): nessuna richiesta verso terzi deve contenere il codice. Prova locale del 26/11 (Chromium, banner accettato, 9 secondi di pagina): su 20 richieste, la sola che contiene il codice è il documento della pagina; GTM si carica e l'indirizzo diventa `/it/guide/cfo`. In locale GA4, Clarity e Meta non partono davvero (host solo `googletagmanager.com`): il test su produzione resta da fare.
- **Vercel Web Analytics / Speed Insights:** non presenti (nessun `@vercel/analytics` o `@vercel/speed-insights` in `package.json` né in `app/layout.js`).
- **Log di Vercel (request log e runtime log):** `/it/guide/{cfo,ceo,studi}` è `force-dynamic`, quindi ogni apertura passa dal server e l'indirizzo con la query può comparire nei log. **Da controllare dal pannello Vercel** (Project > Logs, e Settings > Log Drains se ce n'è uno attivo): se compare `?p=`, ridurre la conservazione dei log o filtrare la query (parere, domanda 5, voce «Log»). Le route `/api/guide-visita` e `/api/guide-revoca` non scrivono il codice nei log (testato); l'indirizzo della pagina sì, se Vercel lo registra.
- **CDN di Vercel:** le pagine brevi hanno 5 minuti di cache (`next.config.mjs`); la chiave di cache include la query, quindi ogni `?p=` ha la sua voce. Nessun dato personale oltre al codice.
- **Referrer:** nessuna `Referrer-Policy` impostata: il browser usa il default (`strict-origin-when-cross-origin`), quindi i link verso siti esterni (WhatsApp) non portano percorso né query.
- **Messaggio WhatsApp precompilato:** contiene `(rif. <codice>)` a prescindere dal consenso: la persona lo vede e decide se mandarlo. È spiegato nell'informativa (riga «Il codice nel messaggio WhatsApp»).

## Per l'operatività

Variabili d'ambiente (solo i nomi; i valori non stanno in nessun file):

| Dove | Nome | A cosa serve |
|---|---|---|
| Vercel (sito) | `LINK_APERTO_URL` | indirizzo della funzione edge `link-aperto` |
| Vercel (sito) | `LINK_APERTO_SECRET` | segreto condiviso con la funzione |
| Supabase (funzione) | `LINK_APERTO_SECRET` | lo stesso valore di Vercel |
| Mac (`link-generator/.env`) | `LINK_APERTO_URL`, `LINK_APERTO_SECRET` | per `revoca.mjs` (cancellazioni su richiesta) |

Senza queste variabili l'apertura non fa niente e la revoca risponde 503 (la pagina dà l'email di riserva).

**Escludere le aperture di Luca** (si sommano):

1. Sul sito: `?internal=1` (flag già esistente, vale per GA4, Clarity, Meta e per il riquadro: non compare e non parte niente). Una volta per dispositivo: `https://automis.ai/it/guide/cfo?internal=1` (`?internal=0` lo toglie).
2. Sul Mac: la dashboard ignora le aperture con prima apertura **precedente all'invio** della guida.
3. Filtro opzionale `data/escludi-aperture.txt` in `sandbox/link-generator`: un codice per riga.

## Prima del go-live (elenco corto)

1. Firma di un legale su testi e rischio residuo (punto 4 sopra).
2. Pubblicare 16.5 (con `id="link-personali"`: il riquadro rimanda a quell'ancora) e la riga cookie policy. Allineare EN/PT se le pagine `?p=` sono raggiungibili in quelle lingue.
3. Rinvio all'informativa nel messaggio LinkedIn con il link (art. 14.3.b): è un testo di Luca (`template.json`), da passare da humanizer e copywriter.
4. Applicare la migrazione, schedulare `link_aperti_prune()` (pg_cron, comando nella migrazione), deployare `link-aperto` e `link-codici`, mettere le variabili su Vercel e nel `.env` del Mac. Tutto con l'ok di Luca.
5. Controllare i log Vercel per `?p=` e fare il test di rete su GA4, Clarity e Meta.
6. Registro `01`, `02`, `07` e istruzioni `08` aggiornati (in `linkedin-portability/docs/compliance/`); DPA di Vercel e Supabase archiviati; verifica DPIA scritta.
