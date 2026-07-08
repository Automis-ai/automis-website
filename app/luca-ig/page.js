import { Montserrat, Open_Sans } from "next/font/google";

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--lucaig-mont",
  display: "swap",
});
const open = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--lucaig-open",
  display: "swap",
});

export const metadata = {
  title: { absolute: "Luca | Sistemi AI @ Automis" },
  description:
    "AI e automazioni per più clienti e meno lavoro manuale, senza fuffa. Scopri le tue 3 opportunità AI in 2 minuti.",
};

const css = `
#lucaig, #lucaig *, #lucaig *::before, #lucaig *::after { box-sizing: border-box; }
#lucaig {
  --deep:#000A14; --deep-1:#051F33; --bright:#3C91E6; --soft:#B4C2FF; --gold:#FEC458;
  --on-gold:#000A14; --white:#FFFFFF; --muted:#B4C2FF; --faint:rgba(180,194,255,0.55);
  --border:rgba(180,194,255,0.16); --hair:rgba(180,194,255,0.10);
  --head: var(--lucaig-mont), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --body: var(--lucaig-open), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  min-height:100vh; color:var(--white); font-family:var(--body);
  background: radial-gradient(120% 55% at 50% -5%, rgba(60,145,230,0.18), transparent 55%), var(--deep);
  -webkit-font-smoothing:antialiased;
}
#lucaig .wrap { max-width:460px; margin:0 auto; padding:26px 22px 44px; }
#lucaig .top { display:flex; align-items:center; justify-content:space-between; margin-bottom:30px; }
#lucaig .top img { height:40px; width:auto; display:block; }
#lucaig .top .pill { font-family:var(--head); font-weight:600; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--soft); border:1px solid var(--border); border-radius:999px; padding:5px 10px; }
#lucaig .kicker { font-family:var(--head); font-weight:600; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--soft); display:inline-flex; align-items:center; gap:8px; margin-bottom:14px; }
#lucaig .kicker .sq { width:8px; height:8px; border-radius:2px; background:var(--bright); }
#lucaig h1 { font-family:var(--head); font-weight:800; font-size:31px; line-height:1.1; letter-spacing:-0.02em; margin:0 0 12px; text-wrap:balance; }
#lucaig h1 em { font-style:normal; color:var(--bright); }
#lucaig .sub { margin:0; color:var(--muted); font-size:15px; line-height:1.55; }
#lucaig .antifuffa { margin:14px 0 0; font-size:14px; font-style:italic; color:var(--white); padding-left:13px; border-left:2px solid var(--gold); }
#lucaig .video { margin:26px 0 6px; position:relative; aspect-ratio:9 / 16; border-radius:18px; overflow:hidden; border:1px solid var(--border); background: radial-gradient(120% 90% at 30% 15%, rgba(60,145,230,0.22), transparent 60%), var(--deep-1); }
#lucaig .video video { width:100%; height:100%; object-fit:cover; display:block; }
#lucaig .video .ph { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; text-align:center; padding:20px; }
#lucaig .video .play { width:62px; height:62px; border-radius:50%; background:var(--bright); color:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 30px -8px rgba(60,145,230,0.7); }
#lucaig .video .play svg { margin-left:4px; }
#lucaig .video .vlabel { font-family:var(--head); font-weight:600; font-size:12px; letter-spacing:0.05em; color:var(--soft); }
#lucaig .ctas { display:flex; flex-direction:column; gap:11px; margin-top:24px; }
#lucaig .cta { display:flex; align-items:center; gap:13px; padding:16px 17px; border-radius:15px; text-decoration:none; color:var(--white); border:1px solid var(--border); background:var(--deep-1); transition:transform 0.15s ease, border-color 0.15s ease; }
#lucaig .cta:hover { transform:translateY(-2px); border-color:var(--bright); }
#lucaig .cta:focus-visible { outline:2px solid var(--bright); outline-offset:3px; }
#lucaig .cta .ico { font-size:20px; flex:none; width:24px; text-align:center; }
#lucaig .cta .txt { display:flex; flex-direction:column; gap:2px; min-width:0; }
#lucaig .cta .lab { font-family:var(--head); font-weight:600; font-size:15px; line-height:1.25; }
#lucaig .cta .sm { font-size:12px; color:var(--faint); }
#lucaig .cta .arrow { margin-left:auto; color:var(--faint); flex:none; font-size:18px; }
#lucaig .cta.primary { background:var(--gold); border-color:var(--gold); color:var(--on-gold); box-shadow:0 14px 30px -14px rgba(254,196,88,0.7); }
#lucaig .cta.primary .sm { color:rgba(0,10,20,0.62); }
#lucaig .cta.primary .arrow { color:var(--on-gold); opacity:0.8; }
#lucaig .foot { margin-top:34px; padding-top:20px; border-top:1px solid var(--hair); text-align:center; }
#lucaig .foot img { height:20px; opacity:0.9; margin-bottom:10px; }
#lucaig .foot p { margin:0; font-size:12px; color:var(--faint); line-height:1.6; }
#lucaig .foot a { color:var(--soft); text-decoration:none; }
@media (prefers-reduced-motion: reduce) { #lucaig .cta { transition:none; } }
`;

export default function LucaIgLanding() {
  return (
    <main id="lucaig" className={`${mont.variable} ${open.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="wrap">

        <div className="top">
          <img src="/luca-ig/automis-logo.png" alt="Automis" />
          <span className="pill">AI Agency</span>
        </div>

        <span className="kicker"><span className="sq" />Luca · Co-founder di Automis</span>
        <h1>Più clienti, follow-up puntuali, <em>meno lavoro manuale.</em></h1>
        <p className="sub">Aiutiamo le aziende a usare AI e automazioni dove serve davvero: acquisizione, risposte, appuntamenti, processi.</p>
        <p className="antifuffa">Niente fuffa: qui sotto ti mostro cosa facciamo davvero.</p>

        {/* Video: quando pronto, metti public/luca-ig/intro.mp4 e sostituisci .ph con
            <video controls playsInline preload="metadata" poster="/luca-ig/intro-poster.jpg"><source src="/luca-ig/intro.mp4" type="video/mp4" /></video> */}
        <div className="video">
          <div className="ph">
            <span className="play" aria-hidden="true">
              <svg width="20" height="22" viewBox="0 0 16 18" fill="currentColor"><path d="M0 1.3v15.4c0 1 1.1 1.6 2 1L15 9.9c.8-.5.8-1.7 0-2.2L2 .3C1.1-.3 0 .3 0 1.3z" /></svg>
            </span>
            <span className="vlabel">Chi siamo in 40 secondi</span>
          </div>
        </div>

        <nav className="ctas">
          <a className="cta primary" href="https://automis.ai/it?utm_source=luca-ig" target="_blank" rel="noopener">
            <span className="ico" aria-hidden="true">🎯</span>
            <span className="txt"><span className="lab">Scopri le tue 3 opportunità AI</span><span className="sm">test gratuito di 2 min, roadmap personalizzata</span></span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a className="cta" href="https://api.leadconnectorhq.com/widget/bookings/automis-it" target="_blank" rel="noopener">
            <span className="ico" aria-hidden="true">📅</span>
            <span className="txt"><span className="lab">Preferisci parlarne? Prenota una call di 15 min</span><span className="sm">nessun impegno</span></span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </nav>

        <footer className="foot">
          <img src="/luca-ig/automis-logo.png" alt="Automis" />
          <p><strong style={{ color: "#fff", fontFamily: "var(--head)" }}>Automis</strong> · AI Agency<br /><a href="https://automis.ai" target="_blank" rel="noopener">automis.ai</a></p>
        </footer>

      </div>
    </main>
  );
}
