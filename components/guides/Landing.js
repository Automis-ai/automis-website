import SignupForm from "@/components/guides/SignupForm";

// Landing pubblica (indicizzabile) della guida «Alternativa a ManyChat», IT e EN.
// Un solo scopo: far lasciare l'email. La guida vera sta in /guida (/guide) e si apre solo col cookie.
// Font e colori sono quelli del sito (Clash Display + General Sans, navy, blu; l'oro solo sul bottone del modulo).

const COPY = {
  it: {
    lang: "it",
    photo: "/luca-ig/luca-linkedin.jpg",
    who: "Luca",
    call: "https://api.leadconnectorhq.com/widget/bookings/automis-it",
    privacy: "/it/privacy-policy",
    eyebrow: "Guida tecnica · Instagram",
    h1a: "L'alternativa a ManyChat,",
    h1b: "costruita da te",
    lead: "Una parola nei commenti, un messaggio privato con la tua risorsa. La guida per costruire il flusso con le API ufficiali di Meta: 14 passi, codice completo e prove.",
    fact: "ManyChat si paga in base ai contatti attivi: al 27/10/2026 da 17 a 199 dollari al mese.",
    by: "Scritta da Luca, Automis",
    byNote: "Passi controllati sulla documentazione ufficiale di Meta il 29/10/2026.",
    mockLabel: "Quello che costruisci con la guida",
    mockSr: "Esempio: una persona commenta MANYCHAT sotto un reel, riceve una risposta pubblica e poi un messaggio privato con un pulsante per aprire la guida.",
    post: "Commenta MANYCHAT e ti invio la guida per costruirtelo da solo",
    commenter: "giulia_r",
    comment: "MANYCHAT",
    replyBy: "Luca",
    reply: "Ti ho scritto in privato: guarda i messaggi.",
    dmTag: "Messaggio privato",
    dm: "Ciao Giulia, ecco la guida che hai chiesto.",
    dmBtn: "Apri la guida",
    insideTitle: "Cosa trovi nella guida",
    inside: [
      ["L'app su Meta", "5 passi, dall'app ai permessi, dal token all'account di prova."],
      ["Il ricevitore", "L'indirizzo che Meta chiama a ogni commento."],
      ["Il flusso", "Le chiamate, una per una, fino al link."],
      ["Il codice completo", "Un file solo, collaudato con un finto server Meta."],
      ["Le prove", "Cosa controllare e cosa fare se non funziona."],
      ["Regole e produzione", "Limiti di Meta, policy, rinnovo del token."],
    ],
    needTitle: "Cosa ti serve",
    need: [
      "Un account Instagram professionale (Business o Creator)",
      "Un secondo account Instagram, solo per le prove",
      "Un account su developers.facebook.com",
      "Node.js 18 o più (la logica vale in qualsiasi linguaggio)",
      "Un indirizzo https pubblico per il ricevitore",
    ],
    honestTitle: "Cosa questa guida non dice",
    honest: [
      ["Le regole e le API di Meta cambiano.", "I passaggi sono controllati sulla documentazione ufficiale il 29/10/2026: ricontrolla prima di costruire."],
      ["Il pulsante dentro la risposta privata non è documentato da Meta.", "Per questo la guida dà due prove: non so dirti in anticipo quale passerà sul tuo account."],
      ["Copre un percorso solo,", "dal commento alla risorsa. Flussi più lunghi o invii a una lista non ci sono."],
    ],
    ctaTitle: "Preferisci che lo guardiamo insieme?",
    ctaText: "Se l'app, il ricevitore o le prove non ti tornano, prenota una call di 15 minuti.",
    ctaBtn: "Prenota una call di 15 minuti",
    ctaTop: "Oppure ricevi la guida",
    privacyLabel: "Privacy",
  },
  en: {
    lang: "en",
    photo: "/manychat-alternative/arcangelo.jpg",
    who: "Arcangelo",
    call: "https://api.leadconnectorhq.com/widget/bookings/discover-automis",
    privacy: "/privacy-policy",
    eyebrow: "Technical guide · Instagram",
    h1a: "The ManyChat alternative,",
    h1b: "built by you",
    lead: "A word in the comments, a private message with your resource. The guide to build the flow with Meta's official APIs: 14 steps, full code and tests.",
    fact: "ManyChat charges by active contacts: as of 27 Oct 2026, from $17 to $199 a month.",
    by: "Written by Arcangelo, Automis",
    byNote: "Steps checked against Meta's official documentation on 29 Oct 2026.",
    mockLabel: "What you build with the guide",
    mockSr: "Example: someone comments MANYCHAT under a reel, gets a public reply and then a private message with a button to open the guide.",
    post: "Comment MANYCHAT and I'll send you the guide to build it yourself",
    commenter: "sam_k",
    comment: "MANYCHAT",
    replyBy: "Arcangelo",
    reply: "I've sent you a private message: check your DMs.",
    dmTag: "Private message",
    dm: "Hi Sam, here's the guide you asked for.",
    dmBtn: "Open the guide",
    insideTitle: "What's in the guide",
    inside: [
      ["The Meta app", "5 steps, from the app to permissions, from the token to the test account."],
      ["The receiver", "The address Meta calls on every comment."],
      ["The flow", "The calls, one by one, down to the link."],
      ["The full code", "A single file, tested against a fake Meta server."],
      ["The tests", "What to check and what to do if it doesn't work."],
      ["Rules and production", "Meta's limits, policies, token renewal."],
    ],
    needTitle: "What you need",
    need: [
      "An Instagram professional account (Business or Creator)",
      "A second Instagram account, only for testing",
      "An account on developers.facebook.com",
      "Node.js 18 or later (the logic works in any language)",
      "A public https address for the receiver",
    ],
    honestTitle: "What this guide doesn't say",
    honest: [
      ["Meta's rules and APIs change.", "The steps were checked against the official documentation on 29 Oct 2026: re-check before you build."],
      ["The button inside the private reply is not documented by Meta.", "That's why the guide gives two tries: I can't tell you in advance which one will work on your account."],
      ["It covers one path only,", "from comment to resource. Longer flows or sends to a list aren't included."],
    ],
    ctaTitle: "Rather look at it together?",
    ctaText: "If the app, the receiver or the tests don't add up, book a 15-minute call.",
    ctaBtn: "Book a 15-minute call",
    ctaTop: "Or get the guide",
    privacyLabel: "Privacy",
  },
};

export default function Landing({ lang, expired = false }) {
  const t = COPY[lang];
  return (
    <main id="lp">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="bar">
        <a href="https://automis.ai" aria-label="Automis"><img src="/luca-ig/automis-logo.png" alt="Automis" height="26" /></a>
      </header>

      <section className="hero">
        <div className="copy">
          <p className="eyebrow"><i aria-hidden="true" />{t.eyebrow}</p>
          <h1>{t.h1a} <em>{t.h1b}</em></h1>
          <p className="lead">{t.lead}</p>
          <p className="fact">{t.fact}</p>

          <SignupForm lang={t.lang} expired={expired} bare />

          <div className="by">
            <img src={t.photo} alt={t.who} width="44" height="44" />
            <p><b>{t.by}</b><span>{t.byNote}</span></p>
          </div>
        </div>

        <figure className="mock" aria-label={t.mockLabel}>
          <p className="sr">{t.mockSr}</p>
          <div className="phone" aria-hidden="true">
            <div className="post r1">{t.post}</div>
            <div className="c r2">
              <span className="av">{t.commenter[0].toUpperCase()}</span>
              <p><b>{t.commenter}</b>{t.comment}</p>
            </div>
            <div className="c reply r3">
              <img className="av" src={t.photo} alt="" width="28" height="28" />
              <p><b>{t.replyBy}</b>{t.reply}</p>
            </div>
            <p className="tag r4">{t.dmTag}</p>
            <div className="dm r4">
              <img className="av" src={t.photo} alt="" width="34" height="34" />
              <div>
                <p className="bub">{t.dm}</p>
                <p className="btn">{t.dmBtn}</p>
              </div>
            </div>
          </div>
          <figcaption>{t.mockLabel}</figcaption>
        </figure>
      </section>

      <section className="inside">
        <div className="inside-l">
          <h2>{t.insideTitle}</h2>
          <h3>{t.needTitle}</h3>
          <ul className="need">
            {t.need.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
        <ol className="parts">
          {t.inside.map(([title, text], i) => (
            <li key={title}>
              <span className="n">{i + 1}</span>
              <div><b>{title}</b><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="honest">
        <h2>{t.honestTitle}</h2>
        <div>
          {t.honest.map(([a, b]) => <p key={a}><b>{a}</b> {b}</p>)}
        </div>
      </section>

      <section className="cta">
        <div>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
        </div>
        <div className="acts">
          <a className="ghost" href={t.call} target="_blank" rel="noopener">{t.ctaBtn}</a>
          <a className="up" href="#form">{t.ctaTop} ↑</a>
        </div>
      </section>

      <footer className="foot">
        <span><b>Automis</b> · AI Agency</span>
        <span><a href="https://automis.ai">automis.ai</a> · <a href={t.privacy}>{t.privacyLabel}</a></span>
      </footer>
    </main>
  );
}

const css = `
@font-face{font-family:"Clash Display";src:url("/fonts/clash-display-600.woff2") format("woff2");font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:"Clash Display";src:url("/fonts/clash-display-700.woff2") format("woff2");font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:"General Sans";src:url("/fonts/general-sans-400.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:"General Sans";src:url("/fonts/general-sans-500.woff2") format("woff2");font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:"General Sans";src:url("/fonts/general-sans-600.woff2") format("woff2");font-weight:600;font-style:normal;font-display:swap}

#lp{--bg:#000A14;--surf:#06182A;--surf2:#0A2238;--line:rgba(180,194,255,.15);--ink:#fff;--soft:#B4C2FF;--mute:rgba(214,222,255,.78);--faint:rgba(180,194,255,.62);--blue:#3C91E6;--gold:#FEC458;--ongold:#1A1200;--head:"Clash Display","Montserrat",system-ui,sans-serif;--text:"General Sans","Open Sans",system-ui,sans-serif;
  position:relative;min-height:100vh;overflow-x:hidden;background:radial-gradient(70% 38% at 78% -4%,rgba(60,145,230,.26),transparent 70%),radial-gradient(50% 30% at 4% 12%,rgba(60,145,230,.10),transparent 70%),var(--bg);color:var(--ink);font-family:var(--text);font-size:16px;line-height:1.55;padding-inline:clamp(16px,5vw,48px);padding-block:0 28px;-webkit-font-smoothing:antialiased}
#lp *,#lp *::before,#lp *::after{box-sizing:border-box}
#lp p,#lp h1,#lp h2,#lp h3,#lp ul,#lp ol,#lp figure{margin:0;padding:0}
#lp ul,#lp ol{list-style:none}
#lp a{color:inherit}
#lp .bar,#lp .hero,#lp .inside,#lp .honest,#lp .cta,#lp .foot{max-width:1160px;margin-inline:auto}
/* alcune classi (.hero, .inside, .honest) esistono anche nel CSS vecchio del sito e portano uno sfondo pieno */
#lp .bar,#lp .hero,#lp .inside,#lp .honest,#lp .foot{background:none}

#lp .bar{padding-block:22px}
#lp .bar img{display:block;height:34px;width:auto}

/* hero */
#lp .hero{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(0,.94fr);gap:clamp(32px,6vw,80px);align-items:center;padding-block:clamp(20px,5vw,64px) clamp(48px,8vw,96px)}
#lp .eyebrow{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--line);border-radius:999px;padding:6px 14px 6px 12px;font-size:12.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--soft);background:rgba(6,24,42,.6)}
#lp .eyebrow i{width:7px;height:7px;border-radius:50%;background:var(--blue);box-shadow:0 0 0 4px rgba(60,145,230,.2)}
#lp h1{font-family:var(--head);font-weight:700;font-size:clamp(36px,5.6vw,68px);line-height:1.03;letter-spacing:.005em;word-spacing:.06em;margin-top:18px;text-wrap:balance}
#lp h1 em{font-style:normal;color:var(--blue)}
#lp .lead{margin-top:18px;max-width:34em;font-size:clamp(16.5px,1.5vw,19px);color:var(--mute)}
#lp .fact{margin-top:10px;max-width:34em;font-size:14px;color:var(--faint)}

/* modulo */
#lp .signup{margin-top:26px;max-width:520px;border:1px solid var(--line);border-radius:18px;padding:18px;background:linear-gradient(170deg,var(--surf2),var(--surf));box-shadow:0 24px 60px -30px rgba(0,0,0,.8)}
#lp .signup h2{font-family:var(--head);font-weight:600;font-size:22px;margin-bottom:6px}
#lp .signup p{font-size:15px;color:var(--mute);margin-bottom:12px}
#lp .signup input[type="email"],#lp .signup input[name="name"]{display:block;width:100%;height:54px;padding:0 16px;border-radius:12px;border:1px solid var(--line);background:#020B14;color:var(--ink);font:500 16px var(--text)}
#lp .signup input[name="name"]{margin-bottom:10px}
#lp .signup input[type="email"]::placeholder,#lp .signup input[name="name"]::placeholder{color:var(--faint)}
#lp .signup input[type="email"]:focus-visible,#lp .signup input[name="name"]:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
#lp .signup .trap{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
#lp .signup .check{display:flex;gap:11px;align-items:flex-start;margin:14px 2px 14px;font-size:13.5px;line-height:1.45;color:var(--mute);cursor:pointer}
#lp .signup .check input{appearance:none;-webkit-appearance:none;flex:none;margin:1px 0 0;width:20px;height:20px;min-width:0;min-height:0;padding:0;display:grid;place-content:center;border:1.5px solid var(--faint);border-radius:6px;background:#020B14;cursor:pointer}
#lp .signup .check input:checked{background:var(--blue);border-color:var(--blue)}
#lp .signup .check input:checked::after{content:"";width:5px;height:10px;border:solid #fff;border-width:0 2px 2px 0;transform:translateY(-1px) rotate(45deg)}
#lp .signup .check input:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
#lp .signup button{display:block;width:100%;min-height:54px;border:0;border-radius:12px;background:var(--gold);color:var(--ongold);font:700 17px var(--head);letter-spacing:.01em;cursor:pointer;transition:transform .2s ease,background .2s ease}
#lp .signup button:hover{background:#FFD27A;transform:translateY(-1px)}
#lp .signup button:focus-visible{outline:2px solid #fff;outline-offset:3px}
#lp .signup button:disabled{opacity:.6;cursor:default;transform:none}
#lp .signup .err{margin:12px 0 0;color:#ff9b9b;font-size:14px}
#lp .signup small{display:block;margin-top:12px;font-size:12.5px;line-height:1.5;color:var(--faint)}
#lp .signup small a{color:var(--soft)}

#lp .by{display:flex;align-items:center;gap:14px;margin-top:22px;max-width:520px}
#lp .by img{width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:50% 20%;border:1px solid var(--line);flex:none}
#lp .by p{font-size:14px;line-height:1.4;color:var(--mute)}
#lp .by b{display:block;color:var(--ink);font-weight:600}
#lp .by span{color:var(--faint)}

/* mockup: commento -> risposta -> messaggio privato */
#lp .mock{display:flex;flex-direction:column;align-items:center;gap:14px}
#lp .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
#lp .phone{width:100%;max-width:380px;border:1px solid var(--line);border-radius:30px;padding:22px 18px 22px;background:linear-gradient(180deg,#07192b,#041120);box-shadow:0 40px 80px -40px rgba(60,145,230,.45),0 0 0 6px rgba(255,255,255,.02);display:flex;flex-direction:column;gap:14px}
#lp .post{font-family:var(--head);font-weight:600;font-size:17px;line-height:1.3;padding:16px;border-radius:16px;background:rgba(60,145,230,.12);border:1px solid rgba(60,145,230,.28)}
#lp .c{display:flex;gap:10px;align-items:flex-start}
#lp .c p{font-size:14.5px;line-height:1.4;color:var(--mute)}
#lp .c p b{display:block;font-size:13px;font-weight:600;color:var(--ink)}
#lp .c .av{width:28px;height:28px;border-radius:50%;flex:none;display:grid;place-items:center;background:var(--surf2);border:1px solid var(--line);font-size:12px;font-weight:600;color:var(--soft)}
#lp .c.reply{margin-left:28px}
#lp .c.reply .av{object-fit:cover;object-position:50% 20%}
#lp .tag{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:var(--faint);padding-top:10px;border-top:1px dashed var(--line);margin-top:2px}
#lp .dm{display:flex;gap:10px;align-items:flex-end}
#lp .dm .av{width:34px;height:34px;border-radius:50%;object-fit:cover;object-position:50% 20%;border:1px solid var(--line);flex:none}
#lp .dm .bub{font-size:15px;line-height:1.4;padding:12px 14px;border-radius:18px 18px 18px 4px;background:var(--surf2);border:1px solid var(--line);max-width:260px}
#lp .dm .btn{margin-top:8px;display:inline-block;padding:9px 16px;border-radius:999px;border:1px solid var(--blue);color:#fff;background:rgba(60,145,230,.2);font-size:14px;font-weight:600}
#lp .mock figcaption{font-size:13px;color:var(--faint)}
@keyframes lp-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
#lp .r1{animation:lp-rise .6s .2s both}
#lp .r2{animation:lp-rise .6s .8s both}
#lp .r3{animation:lp-rise .6s 1.5s both}
#lp .r4{animation:lp-rise .6s 2.3s both}

/* indice della guida */
#lp .inside{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(28px,6vw,80px);padding-block:clamp(40px,7vw,88px);border-top:1px solid var(--line)}
#lp h2{font-family:var(--head);font-weight:600;font-size:clamp(26px,3.4vw,40px);line-height:1.1;text-wrap:balance}
#lp .inside h3{margin-top:34px;font-size:12.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--soft)}
#lp .need{margin-top:12px;display:grid;gap:9px}
#lp .need li{position:relative;padding-left:24px;font-size:15.5px;color:var(--mute)}
#lp .need li::before{content:"";position:absolute;left:3px;top:.45em;width:11px;height:6px;border-left:2px solid var(--blue);border-bottom:2px solid var(--blue);transform:rotate(-45deg)}
#lp .parts li{display:grid;grid-template-columns:44px minmax(0,1fr);gap:14px;padding-block:18px;border-bottom:1px solid var(--line)}
#lp .parts li:first-child{padding-top:4px}
#lp .parts .n{font-family:var(--head);font-weight:700;font-size:26px;line-height:1;color:var(--blue)}
#lp .parts b{display:block;font-family:var(--head);font-weight:600;font-size:20px;line-height:1.2}
#lp .parts p{margin-top:5px;font-size:15.5px;color:var(--mute)}

/* onestà */
#lp .honest{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(28px,6vw,80px);padding-block:clamp(40px,7vw,80px);border-top:1px solid var(--line)}
#lp .honest div{display:grid;gap:16px}
#lp .honest p{font-size:16px;color:var(--mute);padding-left:18px;border-left:2px solid rgba(60,145,230,.55)}
#lp .honest b{color:var(--ink);font-weight:600}

/* chiamata */
#lp .cta{display:flex;flex-wrap:wrap;gap:24px 40px;align-items:center;justify-content:space-between;padding:clamp(24px,4vw,40px);border:1px solid var(--line);border-radius:22px;background:radial-gradient(80% 160% at 100% 0%,rgba(60,145,230,.22),transparent 65%),var(--surf)}
#lp .cta p{margin-top:8px;max-width:30em;color:var(--mute)}
#lp .acts{display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center}
#lp .ghost{display:inline-flex;align-items:center;min-height:50px;padding:0 24px;border-radius:12px;border:1px solid var(--blue);background:rgba(60,145,230,.14);font:600 16px var(--head);text-decoration:none;color:#fff;transition:background .2s}
#lp .ghost:hover{background:rgba(60,145,230,.28)}
#lp .ghost:focus-visible,#lp .up:focus-visible{outline:2px solid #fff;outline-offset:3px}
#lp .up{font-size:15px;font-weight:500;color:var(--soft);text-underline-offset:4px}

#lp .foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;padding-top:34px;font-size:13.5px;color:var(--faint)}
#lp .foot b{color:var(--ink);font-family:var(--head);font-weight:600}
#lp .foot a{display:inline-block;padding-block:5px;color:var(--soft);text-underline-offset:3px}

@media (max-width:860px){
  #lp .hero,#lp .inside,#lp .honest{grid-template-columns:minmax(0,1fr)}
  #lp .mock{margin-top:8px}
  #lp .cta{flex-direction:column;align-items:flex-start}
}
@media (prefers-reduced-motion:reduce){
  #lp .r1,#lp .r2,#lp .r3,#lp .r4{animation:none}
  #lp .signup button{transition:none}
}
`;
