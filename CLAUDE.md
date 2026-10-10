# automis-website

Next.js 14 (app router, JS) per automis.ai e voice.automis.ai, deploy su Vercel.

## Quando è «fatto»

Se tocchi codice (`app/`, `components/`, `lib/`, `layouts/`, `middleware.js`, config), prima di
dire che funziona lancia `scripts/verify.sh`: deve uscire 0. Fa la build di produzione in
`.next-verify`, quindi non disturba un `next dev` già acceso.

In locale c'è anche un hook `Stop` (`.claude/settings.json`, gitignorata) che lancia
`scripts/verify.sh --hook` a fine turno. Se la build è rossa, il turno non si chiude e l'errore
torna all'agente. Dopo 3 rossi di fila smette di bloccare e avvisa: a quel punto decide un umano.

La build non basta per:
- **SEO tecnico:** gira in CI su ogni deploy (`.github/workflows/seo-check.yml`). In locale non
  è affidabile, vedi sotto.
- **Routing per lingua:** `middleware.js` tratta `localhost` come voice host. Quindi in
  `next dev` e `next start` il ramo del dominio principale (`/it`, `/pt`) non si vede come in
  produzione. Le modifiche lì si controllano su un'anteprima Vercel.
