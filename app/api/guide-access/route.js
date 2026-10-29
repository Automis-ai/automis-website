// Il link nella mail di conferma arriva qui. Se è valido (firmato, non scaduto): segna l'email come
// verificata in GHL, mette il cookie di accesso e porta alla guida con un indirizzo pulito.
// Se è scaduto o falso: torna alla pagina pubblica con ?expired=1 per chiederne un altro.
import { readLinkToken, makeSessionToken, cookieName, SESSION_TTL_MS } from "@/lib/guideGate";

const GHL_BASE = process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";
const SITE = process.env.GUIDE_SITE_URL || "https://automis.ai";

const PAGES = {
  it: { landing: "/it/alternativa-a-manychat", guide: "/it/alternativa-a-manychat/guida", verified: "email-verificata", news: "newsletter-ok" },
  en: { landing: "/manychat-alternative", guide: "/manychat-alternative/guide", verified: "email-verified-en", news: "newsletter-ok-en" },
};

const redirect = (path, extra = {}) =>
  new Response(null, { status: 303, headers: { Location: `${SITE}${path}`, "Cache-Control": "private, no-store", ...extra } });

export async function GET(req) {
  const t = new URL(req.url).searchParams.get("t");
  const p = readLinkToken(t);
  if (!p || !PAGES[p.l]) {
    // Non so la lingua di un codice falso: la pagina inglese è il default del sito.
    const lang = (() => { try { return JSON.parse(Buffer.from(String(t).split(".")[0], "base64url").toString()).l; } catch { return null; } })();
    return redirect(`${(PAGES[lang] || PAGES.it).landing}?expired=1`);
  }
  const cfg = PAGES[p.l];

  // Email verificata (e newsletter confermata, se l'aveva chiesta): in GHL, senza bloccare l'accesso.
  try {
    const token = process.env.GHL_API_KEY;
    if (token && p.c) {
      await fetch(`${GHL_BASE}/contacts/${p.c}/tags`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ tags: [cfg.verified, ...(p.n ? [cfg.news] : [])] }),
      });
    }
  } catch (err) {
    console.error("guide-access: verified tag failed:", err);
  }

  const session = makeSessionToken(p.c, p.l);
  if (!session) return redirect(`${cfg.landing}?expired=1`);
  const secure = SITE.startsWith("https") ? "; Secure" : "";
  return redirect(cfg.guide, {
    "Set-Cookie": `${cookieName(p.l)}=${session}; Path=/; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}; HttpOnly; SameSite=Lax${secure}`,
  });
}
