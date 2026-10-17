/**
 * Guardia della preview.
 *
 * Su Vercel `VERCEL_ENV` vale "production" solo per il deploy di produzione; per ogni
 * preview vale "preview", e in locale non esiste. Quindi tutto cio' che manda dati fuori
 * (GHL, n8n, GA4, Meta CAPI, GTM, il log del consenso) parte SOLO in produzione, e la
 * preview del sito v2 si puo' provare e mostrare senza che un solo lead, evento o tag
 * esca verso l'esterno.
 *
 * Una sola definizione, qui: se un domani cambia il criterio, cambia in questo file.
 */
export function isProduction() {
  return process.env.VERCEL_ENV === "production";
}

/**
 * Risposta delle route di app/api fuori dalla produzione: 200, nessuna chiamata esterna.
 *
 * Il corpo e' sempre JSON `{ ok: true, preview: true, ...extra }`. I client di oggi
 * (OpportunityFinder, ContactForm, EmailCopyForm, SampleAuditDownload, ConsentBanner,
 * ArcangeloLanding, LucaFinder) guardano solo `res.ok`, quindi vedono un successo e
 * mostrano la loro schermata finale, per esempio la roadmap del Finder.
 *
 * `extra` serve alle route che hanno un corpo proprio (tool-capture, consent,
 * conversions/booking): mantengono i loro campi e ci si aggiunge `preview: true`.
 */
export function previewResponse(extra = {}) {
  return new Response(JSON.stringify({ ok: true, preview: true, ...extra }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Lato browser: true solo sui domini veri del sito. Serve ai pochi componenti che chiamano un
 * servizio esterno direttamente dal client, senza passare da app/api (oggi: il DemoForm di
 * /voice-ai e /it/voice-ai, che fa partire una chiamata vera verso un webhook di terzi).
 *
 * Si decide dall'host e non da una variabile d'ambiente: NEXT_PUBLIC_VERCEL_ENV esiste solo se il
 * progetto espone le variabili di sistema, e se mancasse questa guardia spegnerebbe la produzione.
 * Cosi' invece un host sconosciuto (preview, localhost) vale come "non produzione" e blocca.
 * Durante il render sul server restituisce false: usala dentro un handler o un effetto.
 */
export function isProductionHost() {
  if (typeof window === "undefined") return false;
  return ["automis.ai", "www.automis.ai", "voice.automis.ai"].includes(window.location.hostname);
}
