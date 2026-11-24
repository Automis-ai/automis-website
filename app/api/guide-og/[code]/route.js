import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getCatalogo } from "@/lib/guideCatalogo";

// Immagine di anteprima (1200x630) di una guida, generata dal catalogo: una guida nuova ha l'anteprima senza deploy.
// Usata da og:image / twitter:image di /it/guide, /it/guide/[target] e /it/guide/leggi/[slug] (lib/guideOg.js).
export const runtime = "nodejs";

const TAG = { ruolo: "GUIDA PER RUOLO", settore: "GUIDA PER SETTORE", servizio: "GUIDA PER SERVIZIO", strumento: "GUIDA PER STRUMENTO" };
const font = (f) => readFile(path.join(process.cwd(), "lib", "fonts", f));

export async function GET(_req, { params }) {
  const g = (await getCatalogo()).find((x) => x.code === String(params.code).toUpperCase());
  const tag = g ? TAG[g.porta] || "GUIDA PRATICA" : "GUIDE PRATICHE SULL'IA";
  const title = g ? g.titolo : "Le guide di Luca Casillo per le aziende";
  const sub = g ? `${g.per_chi}${g.pagine ? ` · ${g.pagine} pagine` : ""}` : "Per ruolo, settore e strumento · le ricevi su WhatsApp";
  const size = title.length > 52 ? 58 : title.length > 36 ? 68 : 80;
  const [bold, medium] = await Promise.all([font("Montserrat-ExtraBold.ttf"), font("Montserrat-Medium.ttf")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#020a14", color: "#fff", padding: "56px 64px 64px", fontFamily: "Montserrat", position: "relative" }}>
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 10, color: "#e6edf7", fontWeight: 500 }}>AUTOMIS</div>
        <div style={{ display: "flex", marginTop: 62, fontSize: 22, letterSpacing: 4, color: "#9db8ff", fontWeight: 500 }}>{tag}</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: size, lineHeight: 1.1, fontWeight: 800, maxWidth: 980 }}>{title}</div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 26, color: "#b8c4d6", fontWeight: 500 }}>{sub}</div>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 1200, height: 8, background: "linear-gradient(90deg,#3b8ee8,#9db8ff)", display: "flex" }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Montserrat", data: bold, weight: 800, style: "normal" },
        { name: "Montserrat", data: medium, weight: 500, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
    },
  );
}
