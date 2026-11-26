# Link aperto: proposta di informativa e nota legale

Bozza per la revisione di Luca. **Non pubblicata**: l'informativa in `/it/privacy-policy` non è stata toccata.
Niente go-live finché il testo non è confermato (anche dalla revisione legale già aperta).

## Che cosa fa

Quando Luca manda a una persona un link personale della guida (`automis.ai/it/guide/cfo?p=k7x2mn`), il sito registra **che quel link è stato aperto**.

- Dato salvato su Supabase: il codice del link (6 caratteri), il codice della guida in evidenza (R1, R2 o S4), data della prima e dell'ultima apertura, numero di aperture (massimo 50).
- Non salva: nome, profilo LinkedIn, indirizzo IP, user agent, posizione, altri dati di navigazione.
- Il legame codice -> persona (nome, profilo LinkedIn) **resta solo sul computer di Luca**. Su Supabase non c'è nessun dato proveniente da LinkedIn.
- Niente cookie, nessun dato scritto sul dispositivo del visitatore.
- Conservazione: 90 giorni dall'ultima apertura (funzione `link_aperti_prune()`, da schedulare).
- Non contano bot e anteprime: la visita parte dal browser, dopo 2,5 secondi con la pagina visibile.

## Bozza di testo per l'informativa

Da inserire in `/it/privacy-policy`, nella parte sui link personali e sul messaggio WhatsApp (da passare da humanizer e copywriter prima di pubblicarlo):

> **Link personali delle guide.** Se ti ho mandato un link personale a una guida (per esempio su LinkedIn), quel link contiene un codice di sei caratteri. Quando lo apri, il sito registra il codice, la guida e la data dell'apertura. Serve a sapere se il link è stato letto e a non scriverti due volte per la stessa cosa.
> Il codice da solo non dice chi sei: il collegamento con il tuo nome lo conservo io, sul mio computer, e non sul sito. Non registro il tuo indirizzo IP e non uso cookie per questa funzione. Tengo il dato per 90 giorni dall'ultima apertura, poi lo cancello.
> Base giuridica: legittimo interesse (art. 6.1.f GDPR) a sapere se una guida che ho mandato a un contatto professionale è arrivata. Puoi opporti in qualsiasi momento scrivendo a [indirizzo contatto privacy]: il codice del tuo link smette di essere collegato a te.

## Nota legale (da confermare, non è un parere)

1. **Pseudonimo, non anonimo.** Il codice è un dato personale: chi ha la chiave (Luca) può risalire alla persona (considerando 26 GDPR). Le regole GDPR valgono.
2. **Tracciamento passivo.** Differenza rispetto al riferimento nel messaggio WhatsApp: lì è la persona a mandare il codice, qui è il sito a registrare un'azione. È l'equivalente di un pixel di apertura nelle email.
3. **Base giuridica.** Plausibile il legittimo interesse (B2B, connessione già accettata su LinkedIn, link mandato da Luca). Servono: informativa aggiornata, una valutazione scritta del legittimo interesse (LIA), conservazione limitata, diritto di opposizione. **Da confermare** con la revisione legale.
4. **ePrivacy (art. 122 Codice privacy).** Senza cookie e senza dati scritti o letti sul dispositivo del visitatore, il consenso per l'accesso al dispositivo probabilmente non scatta. Il Garante guarda però con sospetto il monitoraggio individuale: **da far confermare**.
5. **Eccezione sul dispositivo di Luca.** Il flag autore (`?io=1`) scrive `localStorage.automis_autore` solo sui dispositivi di Luca, mai sui visitatori. Il codice del beacon legge quella chiave anche sui visitatori, ma non scrive niente.
6. **Nessun dato LinkedIn su Supabase.** Il legame codice -> persona e i dati scaricati dall'API di portabilità LinkedIn restano sul Mac. Se un giorno la dashboard passa in app.automis.ai, la questione va rivista (decisione di Luca da loggare in `decisions/decision-log.md`).
7. **Il Mac scarta i codici che non conosce.** Un codice inventato da chiunque finisce nella tabella (con tetto di 100 codici nuovi all'ora e 50 aperture per codice), ma la dashboard lo ignora se non è in `link.jsonl`.

## Per l'operatività: variabili e flag autore

Variabili d'ambiente (solo i nomi; i valori non stanno in nessun file):

| Dove | Nome | A cosa serve |
|---|---|---|
| Vercel (sito) | `LINK_APERTO_URL` | indirizzo della funzione edge `link-aperto` |
| Vercel (sito) | `LINK_APERTO_SECRET` | segreto condiviso con la funzione |
| Supabase (funzione) | `LINK_APERTO_SECRET` | lo stesso valore di Vercel |

Senza queste variabili la route `/api/guide-visita` non fa niente e risponde 204.

**Escludere le aperture di Luca** (tre difese, si sommano):

1. Su ogni dispositivo di Luca, una volta sola: aprire `https://automis.ai/it/guide/cfo?io=1`. Da lì il beacon non parte più (`?io=0` lo riattiva). Se si svuotano i dati del sito, va rifatto.
2. La dashboard sul Mac ignora le aperture con prima apertura **precedente all'invio** della guida (sono test o anteprime di Luca).
3. File opzionale `data/escludi-aperture.txt` in `sandbox/link-generator`: un codice per riga, quelle aperture non contano (per i link che Luca ha aperto dopo l'invio senza il flag).
