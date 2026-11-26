# Link aperto: informativa e nota legale

Bozza per la revisione di Luca, allineata alla revisione privacy del 26/11/2026 (`linkedin-portability/docs/compliance/07-link-aperto-revisione.md`).
**Non pubblicata**: la privacy policy (`/it/privacy-policy`) e la cookie policy non sono state toccate.
Niente go-live finché i testi sotto non sono approvati e rivisti da un legale. Questa nota non è un parere legale.

## Che cosa fa

Quando Luca manda a una persona un link personale della guida (`automis.ai/it/guide/cfo?p=k7x2mn`), il sito registra **che quel link è stato aperto, ma solo se il visitatore ha accettato le statistiche**.

- Il beacon parte solo se `readConsent().categories.statistics === true` (cookie `automis_consent`) e non è traffico interno (`isInternalTraffic()`, flag `?internal=1`). Il flag interno si legge solo dopo aver verificato il consenso: niente `localStorage` prima.
- Il consenso può arrivare a pagina aperta: il beacon ascolta l'evento `automis:consent-changed` (emesso da `applyConsent`) e invia una sola volta, dopo 2,5 s a pagina visibile. Se il visitatore rifiuta, non parte mai.
- Dato salvato su Supabase: codice del link (6 caratteri), guida in evidenza (R1, R2 o S4), prima e ultima apertura, numero di aperture (massimo 50).
- Non salva: nome, profilo LinkedIn, IP, user agent, posizione.
- Il legame codice -> persona resta **solo sul Mac di Luca**. Nessun dato LinkedIn sul sito o su Supabase.
- Conservazione: 90 giorni dall'ultima apertura (funzione `link_aperti_prune()`, da schedulare).
- Non contano bot e anteprime (la visita parte dal browser, dopo 2,5 s con la pagina visibile).
- **Conseguenza: il dato conta solo chi accetta le statistiche.** Non è un conteggio completo: la tappa si legge «almeno aperto», mai «non aperto» (stessa logica delle conversioni Google Ads).

## Testo finale per l'informativa (sezione 16 della privacy IT, nuova 16.5)

Passato da `humanizer` e poi da `copywriter`. Segue il tono e la forma delle sezioni 16.1-16.4 (noi, tu).

```
16.5 Se apri il link personale di una guida

Se ti abbiamo mandato un link personale a una guida (per esempio su LinkedIn), l'indirizzo contiene un codice di sei caratteri.

- Cosa registriamo: solo se hai accettato i cookie statistici, quando apri il link salviamo il codice, la guida, la data e quante volte è stato aperto. Ci serve per sapere se il link è stato letto e per non scriverti due volte la stessa cosa. Se rifiuti le statistiche, non registriamo niente.
- Cosa non registriamo: il tuo indirizzo IP. Il sito non riceve nessun dato da LinkedIn, e il codice da solo non dice chi sei: il collegamento con il tuo nome resta su un nostro computer, non sul sito.
- Base giuridica: il tuo consenso (art. 6.1.a GDPR e art. 122 del Codice privacy) per misurare l'apertura; il legittimo interesse (art. 6.1.f GDPR) per gestire i nostri contatti commerciali.
- Per quanto tempo: 90 giorni dall'ultima apertura, poi cancelliamo il dato.
- I tuoi diritti: puoi ritirare il consenso quando vuoi dalle impostazioni cookie del sito, oppure opporti scrivendo a support@automis.ai. Puoi anche fare reclamo al Garante per la protezione dei dati personali.
```

## Riga per la cookie policy (IT)

Il link personale non scrive nulla sul dispositivo, ma la misura dipende dal consenso statistiche: va elencato accanto agli strumenti di quella categoria.

```
Link personale della guida (codice di sei caratteri nell'indirizzo) | Statistiche | Non salva cookie sul tuo dispositivo. Solo se accetti le statistiche, quando apri il link il sito registra il codice, la guida e la data. | 90 giorni dall'ultima apertura
```

## Nota legale (da confermare, non è un parere)

1. **Pseudonimo, non anonimo.** Il codice è un dato personale: chi ha la chiave (Luca) può risalire alla persona (considerando 26 GDPR).
2. **Tracciamento passivo.** Qui è il sito a registrare un'azione del visitatore: equivale a un pixel di apertura nelle email.
3. **Base giuridica.** Misura dell'apertura: consenso (art. 6.1.a). Gestione dei contatti (non scrivere due volte, sapere a chi rispondere): legittimo interesse (art. 6.1.f), con LIA scritta, conservazione limitata e diritto di opposizione. **Da confermare** con la revisione legale.
4. **ePrivacy: il consenso SCATTA.** EDPB, Linee guida 2/2023 (v2.0, 7/10/2024), §49-51: un identificatore aggiunto all'URL e distribuito anche con messaggi di testo è un «tracking link»; vale come archiviazione nel terminale (almeno per la cache) e la raccolta dell'identificatore è un accesso, quindi si applica l'art. 5(3) ePrivacy anche se l'archiviazione non è permanente. Il §53 aggiunge che il codice lato client che manda informazioni al server è a sua volta un accesso. In Italia vale l'art. 122 Codice privacy: accesso alle informazioni nel terminale solo con consenso informato, salvo trasmissione tecnica o servizio esplicitamente richiesto (qui non regge: aprire una guida non richiede di sapere chi l'ha aperta). Il Garante, Linee guida cookie e altri strumenti di tracciamento (10/6/2021), par. 5: il legittimo interesse non giustifica in nessun caso strumenti di tracciamento; senza consenso restano ammesse solo statistiche aggregate, mentre qui il dato è individuale. **Nota precedente («il consenso probabilmente non scatta») superata.**
5. **Nessun dato LinkedIn su Supabase.** Il legame codice -> persona e i dati dell'API di portabilità LinkedIn restano sul Mac. Se un giorno la dashboard passa in app.automis.ai, la questione va rivista (decisione di Luca da loggare in `decisions/decision-log.md`).
6. **Il Mac scarta i codici che non conosce.** Un codice inventato da chiunque finisce nella tabella (tetto di 100 codici nuovi all'ora e 50 aperture per codice), ma la dashboard lo ignora se non è in `link.jsonl`.
7. **Restano i rischi di `00`:** art. 130 (messaggi promozionali su LinkedIn/WhatsApp) e chiarimento di titolare e autorità. «Link aperto» non li peggiora né li risolve.
8. **Da aggiornare prima del go-live:** LIA `02` e registro dei trattamenti `01` (nuovo trattamento «apertura link», 90 giorni, nessun IP).

## Per l'operatività

Variabili d'ambiente (solo i nomi; i valori non stanno in nessun file):

| Dove | Nome | A cosa serve |
|---|---|---|
| Vercel (sito) | `LINK_APERTO_URL` | indirizzo della funzione edge `link-aperto` |
| Vercel (sito) | `LINK_APERTO_SECRET` | segreto condiviso con la funzione |
| Supabase (funzione) | `LINK_APERTO_SECRET` | lo stesso valore di Vercel |

Senza queste variabili la route `/api/guide-visita` non fa niente e risponde 204.

**Escludere le aperture di Luca** (si sommano):

1. Sul sito: `?internal=1` (flag già esistente, vale per GA4, Clarity, Meta e ora anche per il beacon). Una volta per dispositivo: aprire `https://automis.ai/it/guide/cfo?internal=1` (`?internal=0` lo toglie). Con il flag il beacon non parte, anche se si accettano le statistiche.
2. Sul Mac: la dashboard ignora le aperture con prima apertura **precedente all'invio** della guida (test o anteprime di Luca).
3. Filtro opzionale `data/escludi-aperture.txt` in `sandbox/link-generator`: un codice per riga, quelle aperture non contano.
