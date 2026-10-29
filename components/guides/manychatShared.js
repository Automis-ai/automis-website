import { Montserrat, Open_Sans } from "next/font/google";

export const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--guida-mont",
  display: "swap",
});
export const open = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--guida-open",
  display: "swap",
});

export const css = `
#guida, #guida *, #guida *::before, #guida *::after { box-sizing: border-box; }
#guida {
  --deep:#000A14; --deep-1:#051F33; --bright:#3C91E6; --soft:#B4C2FF; --gold:#FEC458;
  --on-gold:#000A14; --white:#FFFFFF; --body-c:rgba(255,255,255,0.82); --faint:rgba(180,194,255,0.6);
  --border:rgba(180,194,255,0.18); --hair:rgba(180,194,255,0.10); --ok:#7fe0a3;
  --head: var(--guida-mont), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --text: var(--guida-open), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  min-height:100vh; color:var(--white); font-family:var(--text); -webkit-font-smoothing:antialiased;
  background: radial-gradient(120% 40% at 50% -5%, rgba(60,145,230,0.18), transparent 55%), var(--deep);
}
#guida .wrap { max-width:760px; margin:0 auto; padding:24px 20px 56px; }
#guida .top { display:flex; align-items:center; justify-content:space-between; margin-bottom:26px; }
#guida .top img { height:38px; width:auto; display:block; }
#guida .pill { font-family:var(--head); font-weight:600; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--soft); border:1px solid var(--border); border-radius:999px; padding:5px 10px; }
#guida .hero { display:flex; gap:18px; align-items:center; flex-wrap:wrap; margin-bottom:18px; }
#guida .hero img { width:132px; aspect-ratio:4/5; object-fit:cover; border-radius:16px; border:1px solid var(--border); flex:none; }
#guida .hero > div { flex:1 1 260px; min-width:0; }
#guida .kicker { font-family:var(--head); font-weight:600; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--soft); margin:0 0 10px; }
#guida h1 { font-family:var(--head); font-weight:800; font-size:29px; line-height:1.12; letter-spacing:-0.02em; margin:0 0 10px; text-wrap:balance; }
#guida h1 em { font-style:normal; color:var(--bright); }
#guida .lead { margin:0; color:var(--soft); font-size:15px; line-height:1.55; }
#guida .flow { display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:0 0 22px; }
#guida .flow span { font-family:var(--head); font-weight:700; font-size:11px; color:var(--soft); border:1px solid var(--border); border-radius:7px; padding:5px 9px; }
#guida .flow i { font-style:normal; color:var(--gold); }
#guida .pdfcard { display:flex; align-items:center; gap:12px; text-decoration:none; color:var(--on-gold); background:var(--gold); border-radius:14px; padding:14px 16px; margin:0 0 26px; }
#guida .pdfcard b { font-family:var(--head); font-size:14.5px; }
#guida .pdfcard small { display:block; font-size:12px; opacity:0.7; margin-top:1px; }
#guida .pdfcard .go { margin-left:auto; font-size:18px; }
#guida .grid2 { display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:22px; }
@media (min-width:640px) { #guida .grid2 { grid-template-columns:1fr 1fr; } }
#guida .panel { border:1px solid var(--border); border-radius:14px; padding:14px 16px; background:linear-gradient(160deg,rgba(60,145,230,0.10),rgba(60,145,230,0.02)); }
#guida .panel.gold { border-color:rgba(254,196,88,0.45); background:linear-gradient(160deg,rgba(254,196,88,0.09),rgba(254,196,88,0.02)); }
#guida .panel h3 { font-family:var(--head); font-size:14px; font-weight:700; margin:0 0 8px; }
#guida ul.dots { list-style:none; margin:0; padding:0; }
#guida ul.dots li { position:relative; padding-left:14px; font-size:14px; line-height:1.55; color:var(--body-c); margin-bottom:6px; }
#guida ul.dots li::before { content:""; position:absolute; left:0; top:9px; width:5px; height:5px; border-radius:1px; background:var(--bright); }
#guida .panel.gold ul.dots li::before { background:var(--gold); }
#guida b { color:var(--white); font-weight:700; }
#guida .sec { font-family:var(--head); font-weight:700; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; color:var(--bright); margin:34px 0 14px; }
#guida .step { display:flex; gap:12px; margin-bottom:22px; }
#guida .step .n { flex:none; width:28px; height:28px; border-radius:8px; background:var(--bright); color:var(--deep); font-family:var(--head); font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center; margin-top:1px; }
#guida .step .b { flex:1; min-width:0; }
#guida .step h2 { font-family:var(--head); font-weight:700; font-size:17px; margin:0 0 6px; }
#guida .step p { margin:0 0 8px; font-size:15px; line-height:1.6; color:var(--body-c); }
#guida .step p.ck { color:var(--soft); }
#guida .ok { color:var(--ok); font-family:var(--head); font-size:10.5px; letter-spacing:0.12em; text-transform:uppercase; margin-right:6px; font-weight:700; }
#guida pre { margin:8px 0 10px; padding:11px 13px; background:#020B14; border:1px solid var(--border); border-radius:10px; overflow-x:auto; -webkit-overflow-scrolling:touch; }
#guida pre code { font-family:Menlo,"SF Mono",Consolas,monospace; font-size:12.5px; line-height:1.5; color:#CFE3FF; white-space:pre; }
#guida p code, #guida td code, #guida li code { font-family:Menlo,"SF Mono",Consolas,monospace; font-size:13px; color:var(--gold); }
#guida .warn { border-left:3px solid var(--gold); background:rgba(254,196,88,0.09); border-radius:8px; padding:10px 14px; font-size:14px; line-height:1.55; color:var(--body-c); margin:10px 0; }
#guida .warn b:first-child { color:var(--gold); }
#guida .tablewrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
#guida table { width:100%; border-collapse:collapse; min-width:520px; }
#guida th { font-family:var(--head); font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--soft); text-align:left; padding:8px 10px; border:1px solid var(--border); background:rgba(60,145,230,0.12); }
#guida td { font-size:14px; line-height:1.5; color:var(--body-c); padding:9px 10px; border:1px solid var(--hair); vertical-align:top; }
#guida td:first-child { color:var(--white); font-weight:600; width:34%; }
#guida ol.use { margin:0; padding:0; list-style:none; counter-reset:u; }
#guida ol.use li { counter-increment:u; position:relative; padding-left:30px; font-size:14.5px; line-height:1.55; color:var(--body-c); margin-bottom:8px; }
#guida ol.use li::before { content:counter(u); position:absolute; left:0; top:2px; width:20px; height:20px; border-radius:6px; background:var(--bright); color:var(--deep); font-family:var(--head); font-weight:800; font-size:11px; display:flex; align-items:center; justify-content:center; }
#guida .honest { background:#FBF6EA; border-left:4px solid var(--gold); border-radius:12px; padding:14px 18px; color:#2A3742; margin-top:30px; }
#guida .honest h3 { font-family:var(--head); font-weight:800; font-size:15px; color:#0C1A26; margin:0 0 8px; }
#guida .honest li { list-style:none; position:relative; padding-left:13px; font-size:14px; line-height:1.55; color:#2A3742; margin-bottom:6px; }
#guida .honest li::before { content:""; position:absolute; left:0; top:8px; width:5px; height:5px; border-radius:1px; background:var(--gold); }
#guida .honest ul { margin:0; padding:0; }
#guida .honest b { color:#0C1A26; }
#guida .cta { margin-top:24px; border-radius:16px; padding:18px 20px; background:linear-gradient(135deg,#0A3D62,#051F33); border:1px solid rgba(60,145,230,0.32); }
#guida .cta h3 { font-family:var(--head); font-weight:800; font-size:18px; margin:0 0 6px; }
#guida .cta p { margin:0 0 14px; color:var(--soft); font-size:14.5px; line-height:1.55; }
#guida .cta a { display:inline-block; background:var(--gold); color:var(--on-gold); font-family:var(--head); font-weight:700; font-size:14px; padding:11px 18px; border-radius:11px; text-decoration:none; }
#guida .foot { margin-top:34px; padding-top:18px; border-top:1px solid var(--hair); text-align:center; font-size:12px; color:var(--faint); line-height:1.6; }
#guida .foot a { color:var(--soft); text-decoration:none; }
#guida .signup { border:1px solid rgba(254,196,88,0.5); border-radius:16px; padding:18px 18px 14px; background:linear-gradient(160deg,rgba(254,196,88,0.10),rgba(254,196,88,0.02)); margin:0 0 26px; }
#guida .signup h2 { font-family:var(--head); font-weight:800; font-size:20px; margin:0 0 6px; }
#guida .signup p { margin:0 0 12px; color:var(--body-c); font-size:14.5px; line-height:1.55; }
#guida .signup input[type="email"] { width:100%; padding:13px 14px; border-radius:11px; border:1px solid var(--border); background:#020B14; color:var(--white); font-size:16px; font-family:var(--text); }
#guida .signup input[type="email"]:focus { outline:2px solid var(--bright); outline-offset:1px; }
#guida .signup .trap { position:absolute; left:-9999px; width:1px; height:1px; opacity:0; }
#guida .signup .check { display:flex; gap:10px; align-items:flex-start; margin:12px 0; font-size:13.5px; line-height:1.5; color:var(--body-c); cursor:pointer; }
#guida .signup .check input { margin-top:3px; flex:none; width:17px; height:17px; accent-color:var(--bright); }
#guida .signup button { width:100%; background:var(--gold); color:var(--on-gold); border:0; border-radius:11px; padding:14px 18px; font-family:var(--head); font-weight:800; font-size:15px; cursor:pointer; }
#guida .signup button:disabled { opacity:0.6; cursor:default; }
#guida .signup .err { color:#ff9b9b; margin:10px 0 0; font-size:14px; }
#guida .signup small { display:block; margin-top:10px; color:var(--faint); font-size:12.5px; line-height:1.5; }
#guida .signup small a { color:var(--soft); }
@media print {
  html, body { background:#000A14 !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  @page { size:A4; margin:0; }
  #guida { min-height:0; background:#000A14; }
  #guida .wrap { max-width:none; padding:12mm 13mm; box-decoration-break:clone; -webkit-box-decoration-break:clone; }
  #guida .pdfcard { display:none; }
  #guida .step, #guida .panel, #guida .warn, #guida .honest, #guida .cta, #guida tr { break-inside:avoid; }
  #guida .sec { break-after:avoid; }
  #guida pre { break-inside:avoid; }
  #guida pre code { white-space:pre-wrap; word-break:break-word; line-height:1.4; }
  #guida pre.tall { break-inside:auto; }
  #guida .tablewrap { overflow:visible; }
  #guida table { min-width:0; }
}
`;

export const Code = ({ children, tall }) => (
  <pre className={tall ? "tall" : undefined}>
    <code>{children}</code>
  </pre>
);

export const Step = ({ n, title, children }) => (
  <section className="step">
    <div className="n">{n}</div>
    <div className="b">
      <h2>{title}</h2>
      {children}
    </div>
  </section>
);

export const Check = ({ children, label = "Controllo" }) => (
  <p className="ck">
    <span className="ok">{label}</span>
    {children}
  </p>
);

