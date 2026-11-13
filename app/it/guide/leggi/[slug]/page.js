import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AutomisItShell from "@/components/site/AutomisItShell";
import LeggiAccesso from "@/components/guide-lettore/LeggiAccesso";
import Lettore from "@/components/guide-lettore/Lettore";
import LettoreWeb from "@/components/guide-lettore/LettoreWeb";
import "@/components/guide-lettore/lettore.css";
import WaButton from "@/components/guide-catalogo/WaButton";
import { getCatalogo } from "@/lib/guideCatalogo";
import { READER_COOKIE } from "@/lib/guideGate";
import { readManifest, readerSession, signPages } from "@/lib/guideLeggi";

// Lettore online: la guida si legge qui, senza download. Sempre dinamico (cookie) e fuori da Google.
export const dynamic = "force-dynamic";
const FIRST = 6; // pagine con link firmato già nella pagina: il resto arriva scorrendo

export async function generateMetadata({ params }) {
  const g = (await getCatalogo()).find((x) => x.slug === params.slug);
  return {
    title: { absolute: g ? `Leggi «${g.titolo}» | Automis` : "Guide | Automis" },
    robots: { index: false, follow: false },
  };
}

export default async function LeggiPage({ params }) {
  const catalogo = await getCatalogo();
  const guida = catalogo.find((g) => g.slug === params.slug);
  if (!guida) notFound();
  const next = guida.next ? catalogo.find((g) => g.code === guida.next) : null;

  let body;
  if (!guida.pronta) {
    body = (
      <>
        <p className="lead">Questa guida non è ancora uscita. Scrivimi e ti avviso quando c&apos;è.</p>
        <div className="gate">
          <WaButton guida={guida} kind="avvisami" />
        </div>
      </>
    );
  } else {
    const session = readerSession(cookies().get(READER_COOKIE)?.value);
    if (!session || !session.c.includes(guida.code)) {
      body = (
        <>
          <p className="lead">{guida.promessa}</p>
          <LeggiAccesso guida={{ code: guida.code, slug: guida.slug, titolo: guida.titolo }} />
        </>
      );
    } else {
      let data = null;
      try {
        const manifest = await readManifest(fetch, process.env, guida.code);
        // guida web: niente pagine da firmare, l'HTML lo serve /api/guide-leggi-web (con il cookie)
        const initial = manifest.formato === "web" ? null : await signPages(fetch, process.env, guida.code, 1, Math.min(FIRST, manifest.pagine));
        data = { manifest, initial };
      } catch (err) {
        console.error("guide-leggi: pagine non disponibili:", err?.message || err);
      }
      body = data?.manifest.formato === "web" ? (
        <LettoreWeb
          guida={{ code: guida.code, slug: guida.slug, titolo: guida.titolo }}
          next={next ? { code: next.code, titolo: next.titolo, pronta: next.pronta } : null}
        />
      ) : data ? (
        <Lettore
          guida={{ code: guida.code, slug: guida.slug, titolo: guida.titolo }}
          next={next ? { code: next.code, titolo: next.titolo, pronta: next.pronta } : null}
          manifest={data.manifest}
          initial={data.initial}
        />
      ) : (
        <>
          <p className="lead">Le pagine di questa guida non si aprono adesso. Riprova tra un minuto.</p>
          <div className="gate">
            <WaButton guida={guida} label="Scrivimi su WhatsApp" kind="aiuto" />
          </div>
        </>
      );
    }
  }

  const reading = guida.pronta && (body?.type === Lettore || body?.type === LettoreWeb);
  return (
    <AutomisItShell hideStickyCta>
      <div id="gl" className={reading ? "reading" : undefined}>
        <div className="wrap">
          <a className="back" href="/it/guide">← Tutte le guide</a>
          <div><span className="eyebrow"><i aria-hidden="true" />Leggi online</span></div>
          <h1>{guida.titolo}</h1>
          {body}
        </div>
      </div>
    </AutomisItShell>
  );
}
