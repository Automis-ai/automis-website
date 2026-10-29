// PDF della guida: i file stanno in private/guides (non in public) e escono solo con il cookie.
import fs from "node:fs";
import path from "node:path";
import { verifySession, cookieName } from "@/lib/guideGate";

const FILES = {
  it: { file: "guida-commento-messaggio-instagram.pdf", name: "guida-commento-messaggio-instagram.pdf" },
  en: { file: "instagram-comment-to-dm-guide.pdf", name: "instagram-comment-to-dm-guide.pdf" },
};

export async function GET(req) {
  const lang = new URL(req.url).searchParams.get("lang");
  const f = FILES[lang];
  const cookie = (req.headers.get("cookie") || "")
    .split(";").map((c) => c.trim()).find((c) => c.startsWith(`${cookieName(lang)}=`));
  const value = cookie ? cookie.slice(cookieName(lang).length + 1) : "";
  if (!f || !verifySession(value, lang)) return new Response("Unauthorized", { status: 401 });
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "private", "guides", f.file));
    return new Response(buf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${f.name}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("guide-pdf: file not readable:", err);
    return new Response("Not found", { status: 404 });
  }
}
