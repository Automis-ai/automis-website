// Template engines for the message generators (no AI call per use).
// Messages are sent by the business to its own customers, so they use proper
// accents. No em/en dashes anywhere.

const join = (parts) => parts.filter(Boolean).join(" ").replace(/[ \t]+/g, " ").trim();
const lines = (ls) => ls.filter(Boolean).join("\n");
const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);

/* ------------------------------------------------------------------ */
/* Missed-call and away messages                                       */
/* ------------------------------------------------------------------ */

export const AWAY_TYPES = {
  en: { dental: "Dental clinic", medical: "Medical practice", physio: "Physio or wellness", salon: "Salon or beauty", professional: "Legal or accounting", realestate: "Real estate", trades: "Trades and home services", generic: "Other business" },
  it: { dental: "Studio dentistico", medical: "Studio medico", physio: "Fisioterapia o benessere", salon: "Salone o estetica", professional: "Studio legale o commercialista", realestate: "Agenzia immobiliare", trades: "Artigiani e servizi a domicilio", generic: "Altra attivita'" },
  pt: { dental: "Clínica dentária", medical: "Consultório médico", physio: "Fisioterapia ou bem-estar", salon: "Salão ou estética", professional: "Advocacia ou contabilidade", realestate: "Imobiliária", trades: "Serviços e assistência ao domicílio", generic: "Outro negócio" },
};
export const AWAY_SITUATIONS = {
  en: { missed: "Missed call", after: "After hours", holiday: "Holidays", busy: "Busy right now" },
  it: { missed: "Chiamata persa", after: "Fuori orario", holiday: "Ferie", busy: "Occupato ora" },
  pt: { missed: "Chamada perdida", after: "Fora de horas", holiday: "Férias", busy: "Ocupado agora" },
};
export const TONES = {
  en: { friendly: "Friendly", professional: "Professional", short: "Short" },
  it: { friendly: "Amichevole", professional: "Professionale", short: "Breve" },
  pt: { friendly: "Simpático", professional: "Profissional", short: "Curto" },
};

const ACTION = {
  en: { dental: "book a visit", medical: "book an appointment", physio: "book a session", salon: "book your appointment", professional: "book a consultation", realestate: "arrange a viewing", trades: "get a quote", generic: "get in touch" },
  it: { dental: "prenotare una visita", medical: "prenotare una visita", physio: "prenotare una seduta", salon: "prenotare il tuo appuntamento", professional: "fissare una consulenza", realestate: "fissare una visita all'immobile", trades: "chiedere un preventivo", generic: "metterti in contatto con noi" },
  pt: { dental: "marcar uma consulta", medical: "marcar uma consulta", physio: "marcar uma sessão", salon: "marcar a sua marcação", professional: "marcar uma reunião", realestate: "agendar uma visita ao imóvel", trades: "pedir um orçamento", generic: "entrar em contacto connosco" },
};

// [main, ask] per situation, three variants each. {a} = action, {n} = " name" tail.
const CORES = {
  en: {
    missed: [
      ["Sorry we missed your call.", "How can we help? Reply here with a few words and we will get back to you."],
      ["Thanks for calling{n}. We could not pick up just now.", "If you would like to {a}, just reply to this message."],
      ["We saw your call and we are sorry we could not answer.", "Tell us what you need and we will sort it out."],
    ],
    after: [
      ["Thanks for contacting{n}. We are closed right now.", "Leave your message here and we will reply when we open."],
      ["Our office is closed at the moment, but your message matters to us.", "Tell us what you need and, if you would like to {a}, what time suits you."],
      ["You have reached us outside opening hours.", "Send us a message and we will get back to you first thing."],
    ],
    holiday: [
      ["We are away on holiday and will be back soon.", "Leave a message and we will reply as soon as we return."],
      ["Thanks for getting in touch. We are closed for the holidays.", "Message us what you need and we will answer when we reopen."],
      ["Our team is on a short break.", "If you would like to {a}, use the link below or reply here and we will reach out when we are back."],
    ],
    busy: [
      ["Sorry, we are with a customer right now.", "Reply with what you need and we will come back to you shortly."],
      ["All our lines are busy at the moment.", "Send us a message and we will call or write back as soon as we are free."],
      ["We could not answer because we are helping someone.", "Tell us how we can help and we will respond soon."],
    ],
  },
  it: {
    missed: [
      ["Scusa, non siamo riusciti a rispondere alla tua chiamata.", "Come possiamo aiutarti? Rispondi qui con due parole e ti ricontattiamo noi."],
      ["Grazie per aver chiamato{n}. In questo momento non riusciamo a rispondere.", "Se vuoi {a}, scrivici qui."],
      ["Abbiamo visto la tua chiamata e ci dispiace non aver risposto.", "Dicci di cosa hai bisogno e ci pensiamo noi."],
    ],
    after: [
      ["Grazie per averci scritto. In questo momento siamo chiusi.", "Lascia qui il tuo messaggio e ti rispondiamo appena riapriamo."],
      ["Il nostro studio è chiuso in questo momento, ma il tuo messaggio è importante.", "Scrivici di cosa hai bisogno e, se vuoi {a}, quando ti farebbe comodo."],
      ["Ci hai raggiunto fuori orario.", "Mandaci un messaggio e ti rispondiamo per primi domattina."],
    ],
    holiday: [
      ["Siamo in ferie e torniamo presto.", "Lascia un messaggio e ti rispondiamo appena rientriamo."],
      ["Grazie per averci scritto. Siamo chiusi per ferie.", "Scrivici di cosa hai bisogno e ti rispondiamo alla riapertura."],
      ["Il nostro team è in pausa per qualche giorno.", "Se vuoi {a}, usa il link qui sotto oppure rispondi qui e ti cerchiamo al rientro."],
    ],
    busy: [
      ["Scusa, siamo con un cliente in questo momento.", "Scrivici di cosa hai bisogno e ti rispondiamo a breve."],
      ["Tutte le nostre linee sono occupate adesso.", "Mandaci un messaggio e ti richiamiamo o ti scriviamo appena siamo liberi."],
      ["Non abbiamo risposto perché stiamo seguendo un'altra persona.", "Dicci come possiamo aiutarti e ti rispondiamo presto."],
    ],
  },
  pt: {
    missed: [
      ["Pedimos desculpa por não termos atendido a sua chamada.", "Em que podemos ajudar? Responda aqui com poucas palavras e contactamo-lo nós."],
      ["Obrigado por ter ligado{n}. Neste momento não conseguimos atender.", "Se quiser {a}, basta responder a esta mensagem."],
      ["Vimos a sua chamada e lamentamos não termos atendido.", "Diga-nos do que precisa e tratamos do assunto."],
    ],
    after: [
      ["Obrigado pelo seu contacto. Neste momento estamos fechados.", "Deixe aqui a sua mensagem e respondemos assim que abrirmos."],
      ["Estamos fechados neste momento, mas a sua mensagem é importante para nós.", "Diga-nos do que precisa e, se quiser {a}, a que horas lhe convém."],
      ["Contactou-nos fora do horário de atendimento.", "Envie-nos uma mensagem e respondemos logo de manhã."],
    ],
    holiday: [
      ["Estamos de férias e voltamos em breve.", "Deixe uma mensagem e respondemos assim que regressarmos."],
      ["Obrigado pelo seu contacto. Estamos encerrados para férias.", "Diga-nos do que precisa e respondemos quando reabrirmos."],
      ["A nossa equipa está em pausa durante alguns dias.", "Se quiser {a}, use o link abaixo ou responda aqui e contactamo-lo no regresso."],
    ],
    busy: [
      ["Pedimos desculpa, estamos neste momento com um cliente.", "Diga-nos do que precisa e respondemos em breve."],
      ["Todas as nossas linhas estão ocupadas neste momento.", "Envie-nos uma mensagem e ligamos ou escrevemos assim que estivermos livres."],
      ["Não atendemos porque estamos a acompanhar outra pessoa.", "Diga-nos como podemos ajudar e respondemos em breve."],
    ],
  },
};

const AWAY_UI = {
  en: {
    callback: (c) => `We will call you back ${c}.`,
    link: (a, l) => `You can also ${a} here: ${l}`,
    greet: { friendly: "Hi there!", professional: "Hello,", short: "" },
    close: { friendly: (n) => `Speak soon${n ? `, ${n}` : ""}.`, professional: (n) => `Kind regards${n ? `, ${n}` : ""}.`, short: (n) => n },
    nTail: (n) => (n ? ` ${n}` : " us"),
  },
  it: {
    callback: (c) => `Ti richiamiamo ${c}.`,
    link: (a, l) => `Puoi anche ${a} qui: ${l}`,
    greet: { friendly: "Ciao!", professional: "Buongiorno,", short: "" },
    close: { friendly: (n) => `A presto${n ? `, ${n}` : ""}.`, professional: (n) => `Cordiali saluti${n ? `, ${n}` : ""}.`, short: (n) => n },
    nTail: (n) => (n ? ` ${n}` : ""),
    callbackLei: (c) => `La richiamiamo ${c}.`,
    linkLei: (a, l) => `Può anche ${a} qui: ${l}`,
  },
  pt: {
    callback: (c) => `Ligamos-lhe ${c}.`,
    link: (a, l) => `Pode também ${a} aqui: ${l}`,
    greet: { friendly: "Olá!", professional: "Bom dia,", short: "" },
    close: { friendly: (n) => `Até breve${n ? `, ${n}` : ""}.`, professional: (n) => `Com os melhores cumprimentos${n ? `, ${n}` : ""}.`, short: (n) => n },
    nTail: (n) => (n ? ` para ${n}` : ""),
  },
};

// IT/PT professional tone switches from tu to Lei in a couple of cores; keep it simple
// by rewriting only the leading pronoun-bearing words handled in the cores above.
const toLei = (s) =>
  s
    .replace("Scusa,", "Ci scusiamo,")
    .replace("ti ricontattiamo noi", "la ricontattiamo noi")
    .replace("Se vuoi", "Se desidera")
    .replace("scrivici qui", "ci scriva qui")
    .replace("Come possiamo aiutarti?", "Come possiamo aiutarla?")
    .replace("Rispondi qui", "Risponda qui")
    .replace("Dicci", "Ci dica")
    .replace("ci pensiamo noi", "ce ne occupiamo noi")
    .replace("Lascia qui il tuo messaggio e ti rispondiamo", "Lasci qui il suo messaggio e le rispondiamo")
    .replace("Lascia un messaggio e ti rispondiamo", "Lasci un messaggio e le rispondiamo")
    .replace("il tuo messaggio", "il suo messaggio")
    .replace("Scrivici", "Ci scriva")
    .replace("quando ti farebbe comodo", "quando preferisce")
    .replace("Mandaci un messaggio e ti rispondiamo", "Ci mandi un messaggio e le rispondiamo")
    .replace("Mandaci", "Ci mandi")
    .replace("aiutarti", "aiutarla")
    .replace("ti rispondiamo", "le rispondiamo")
    .replace("ti richiamiamo o ti scriviamo", "la richiamiamo o le scriviamo")
    .replace("e ti richiamiamo", "e la richiamiamo")
    .replace("Ci hai raggiunto", "Ci ha raggiunto")
    .replace("hai bisogno", "ha bisogno")
    .replace("di cosa hai", "di cosa ha")
    .replace("Abbiamo visto la tua chiamata", "Abbiamo visto la sua chiamata")
    .replace("Grazie per averci scritto", "Grazie per averci scritto")
    .replace("usa il link qui sotto oppure rispondi qui e ti cerchiamo", "usi il link qui sotto oppure risponda qui e la cerchiamo")
    .replace("Puoi anche", "Può anche")
    .replace("Ti richiamiamo", "La richiamiamo")
    .replace("tuo", "suo")
    .replace("tua", "sua")
    .replace("a voi", "a voi");

export function buildAwayMessages({ locale, type, situation, tone, name, link, callback }) {
  const L = locale in CORES ? locale : "en";
  const ui = AWAY_UI[L];
  const action = ACTION[L][type] || ACTION[L].generic;
  const nm = (name || "").trim();
  const cb = (callback || "").trim();
  const lk = (link || "").trim();
  return CORES[L][situation].map(([main0, ask0]) => {
    const fill = (s) => s.replace("{n}", ui.nTail(nm)).replace("{a}", action);
    let main = fill(main0);
    let ask = fill(ask0);
    if (L === "it" && tone === "professional") {
      main = toLei(main);
      ask = toLei(ask);
    }
    const pro = L === "it" && tone === "professional";
    const cbLine = cb ? (pro ? ui.callbackLei(cb) : ui.callback(cb)) : "";
    const lkLine = lk ? (pro ? ui.linkLei(action, lk) : ui.link(action, lk)) : "";
    const greet = ui.greet[tone];
    if (greet.endsWith(",")) main = lc(main);
    const first = join([greet, main, cbLine]);
    const second = tone === "short" ? lkLine : join([ask, lkLine]);
    return lines([first, second, ui.close[tone](nm)]);
  });
}

/* ------------------------------------------------------------------ */
/* Appointment reminders                                               */
/* ------------------------------------------------------------------ */

export const REM_SECTORS = {
  en: { dental: "Dental", medical: "Medical", physio: "Physio", aesthetic: "Aesthetic", salon: "Salon", legal: "Legal or accounting", generic: "Generic" },
  it: { dental: "Dentista", medical: "Medico", physio: "Fisioterapia", aesthetic: "Estetica", salon: "Salone", legal: "Legale o commercialista", generic: "Generico" },
  pt: { dental: "Dentista", medical: "Médico", physio: "Fisioterapia", aesthetic: "Estética", salon: "Salão", legal: "Advocacia ou contabilidade", generic: "Genérico" },
};
export const REM_CHANNELS = {
  en: { whatsapp: "WhatsApp", sms: "SMS", email: "Email" },
  it: { whatsapp: "WhatsApp", sms: "SMS", email: "Email" },
  pt: { whatsapp: "WhatsApp", sms: "SMS", email: "Email" },
};
export const REM_TIMINGS = {
  en: { before: "Day before", same: "Same day" },
  it: { before: "Il giorno prima", same: "Lo stesso giorno" },
  pt: { before: "Na véspera", same: "No próprio dia" },
};
export const REM_CONFIRMS = {
  en: { reply: "Reply to confirm", link: "Confirm by link", call: "Call to change" },
  it: { reply: "Rispondi per confermare", link: "Conferma da link", call: "Chiama per modificare" },
  pt: { reply: "Responder para confirmar", link: "Confirmar por link", call: "Ligar para alterar" },
};

const NOUN = {
  en: { dental: "appointment", medical: "appointment", physio: "session", aesthetic: "treatment", salon: "appointment", legal: "meeting", generic: "appointment" },
  it: { dental: ["appuntamento", "il"], medical: ["appuntamento", "il"], physio: ["seduta", "la"], aesthetic: ["trattamento", "il"], salon: ["appuntamento", "il"], legal: ["incontro", "l'"], generic: ["appuntamento", "il"] },
  pt: { dental: ["consulta", "a"], medical: ["consulta", "a"], physio: ["sessão", "a"], aesthetic: ["tratamento", "o"], salon: ["marcação", "a"], legal: ["reunião", "a"], generic: ["marcação", "a"] },
};
const WARM = {
  en: { dental: "We look forward to seeing you.", medical: "We look forward to seeing you.", physio: "See you soon.", aesthetic: "We look forward to pampering you.", salon: "We will have everything ready for you.", legal: "We look forward to meeting you.", generic: "See you soon." },
  it: { dental: "Ti aspettiamo.", medical: "Ti aspettiamo.", physio: "A presto.", aesthetic: "Ti aspettiamo per coccolarti.", salon: "Ti aspettiamo, abbiamo tutto pronto.", legal: "Ti aspettiamo in studio.", generic: "A presto." },
  pt: { dental: "Esperamos por si.", medical: "Esperamos por si.", physio: "Até breve.", aesthetic: "Esperamos por si para cuidar de si.", salon: "Esperamos por si, já temos tudo pronto.", legal: "Esperamos por si.", generic: "Até breve." },
};

function remEn({ sector, channel, timing, confirm, name, client, when, contact }) {
  const noun = NOUN.en[sector];
  const day = timing === "before" ? "tomorrow" : "today";
  const at = when ? `${day} at ${when}` : day;
  const hi = client ? `Hi ${client},` : "Hello,";
  const biz = name ? ` at ${name}` : "";
  const conf =
    confirm === "link" && contact ? `Confirm or change it here: ${contact}`
    : confirm === "call" && contact ? `To change or cancel, please call ${contact}.`
    : "Reply YES to confirm or NO if you need to cancel.";
  const confShort =
    confirm === "link" && contact ? `Confirm or change: ${contact}`
    : confirm === "call" && contact ? `To change, call ${contact}.`
    : "Reply YES to confirm.";
  const a = lines([join([hi, `this is a reminder of your ${noun}${biz} ${at}.`]), conf, WARM.en[sector]]);
  const b = lines([`${hi} just a friendly reminder: your ${noun}${biz} is ${at}.`, confShort, join(["Thank you!", name])]);
  const c = lines([`Reminder${name ? ` ${name}` : ""}: ${noun} ${at}.`, confShort]);
  if (channel === "email") {
    return [
      `Subject: Reminder: your ${noun} ${at}\n\n${a}`,
      `Subject: See you ${at}\n\n${b}`,
      `Subject: ${noun[0].toUpperCase() + noun.slice(1)} ${at}\n\n${c}`,
    ];
  }
  return [a, b, c];
}

function remIt({ sector, channel, timing, confirm, name, client, when, contact }) {
  const [noun, art] = NOUN.it[sector];
  const day = timing === "before" ? "domani" : "oggi";
  const at = when ? `${day} alle ${when}` : day;
  const hi = client ? `Ciao ${client},` : "Ciao,";
  const biz = name ? ` da ${name}` : "";
  const the = art === "l'" ? `l'${noun}` : `${art} ${noun}`;
  const conf =
    confirm === "link" && contact ? `Conferma o sposta da qui: ${contact}`
    : confirm === "call" && contact ? `Per spostare o annullare, chiama il ${contact}.`
    : "Rispondi SÌ per confermare o NO se devi annullare.";
  const confShort =
    confirm === "link" && contact ? `Conferma o sposta: ${contact}`
    : confirm === "call" && contact ? `Per spostare, chiama il ${contact}.`
    : "Rispondi SÌ per confermare.";
  const a = lines([join([hi, `ti ricordiamo ${the}${biz} ${at}.`]), conf, WARM.it[sector]]);
  const b = lines([`${hi} un promemoria veloce: ${the}${biz} è ${at}.`, confShort, join(["Grazie!", name])]);
  const c = lines([`Promemoria${name ? ` ${name}` : ""}: ${noun} ${at}.`, confShort]);
  if (channel === "email") {
    return [
      `Oggetto: Promemoria: ${the} ${at}\n\n${a}`,
      `Oggetto: Ci vediamo ${at}\n\n${b}`,
      `Oggetto: ${noun[0].toUpperCase() + noun.slice(1)} ${at}\n\n${c}`,
    ];
  }
  return [a, b, c];
}

function remPt({ sector, channel, timing, confirm, name, client, when, contact }) {
  const [noun, art] = NOUN.pt[sector];
  const day = timing === "before" ? "amanhã" : "hoje";
  const at = when ? `${day} às ${when}` : day;
  const hi = client ? `Olá ${client},` : "Olá,";
  const biz = name ? ` em ${name}` : "";
  const the = `${art} sua ${noun}`;
  const conf =
    confirm === "link" && contact ? `Confirme ou altere aqui: ${contact}`
    : confirm === "call" && contact ? `Para alterar ou cancelar, ligue para ${contact}.`
    : "Responda SIM para confirmar ou NÃO se precisar de cancelar.";
  const confShort =
    confirm === "link" && contact ? `Confirme ou altere: ${contact}`
    : confirm === "call" && contact ? `Para alterar, ligue para ${contact}.`
    : "Responda SIM para confirmar.";
  const a = lines([join([hi, `lembramos que ${the}${biz} é ${at}.`]), conf, WARM.pt[sector]]);
  const b = lines([`${hi} um lembrete simpático: ${the}${biz} é ${at}.`, confShort, join(["Obrigado!", name])]);
  const c = lines([`Lembrete${name ? ` ${name}` : ""}: ${noun} ${at}.`, confShort]);
  if (channel === "email") {
    return [
      `Assunto: Lembrete: ${the} ${at}\n\n${a}`,
      `Assunto: Até ${at}\n\n${b}`,
      `Assunto: ${noun[0].toUpperCase() + noun.slice(1)} ${at}\n\n${c}`,
    ];
  }
  return [a, b, c];
}

export function buildReminderMessages(opts) {
  const f = { en: remEn, it: remIt, pt: remPt }[opts.locale] || remEn;
  return f({
    ...opts,
    name: (opts.name || "").trim(),
    client: (opts.client || "").trim(),
    when: (opts.when || "").trim(),
    contact: (opts.contact || "").trim(),
  });
}
