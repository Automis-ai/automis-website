import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";

/*
  Personalised AI Opportunity Roadmap (EN + IT).

  Deliverable = a dynamic, personalised COVER (built here from the finder answers)
  merged in front of a pre-designed, on-brand PILLAR PLAYBOOK (a static PDF in
  /public/playbooks/<locale>/). The playbook is selected from primary + secondary
  pillar. Each playbook ships with a sample cover as page 1, which we drop at merge
  time and replace with the personalised one.

  No em/en dashes in copy (brand rule).
*/

// Brand palette (RGB)
const DEEP = [0, 10, 20];
const PANEL = [8, 30, 50];
const BLUE = [60, 145, 230];
const CYAN = [87, 199, 227];
const SOFT = [180, 194, 255];
const GOLD = [254, 196, 88];
const WHITE = [255, 255, 255];
const MUTE = [150, 165, 185];
const HAIR = [40, 55, 75];

// Pillar key -> display name, per locale (must match OpportunityFinder COPY[locale].pillars names)
const PILLAR_NAME = {
  en: { sales: "Sales & Acquisition", admin: "Admin & Company Brain", marketing: "Marketing & Growth" },
  it: { sales: "Vendite & Acquisizione", admin: "Operations & Company Brain", marketing: "Marketing & Crescita" },
  pt: { sales: "Vendas & Aquisição", admin: "Administração & Company Brain", marketing: "Marketing & Crescimento" },
};

// Static cover labels, per locale
const STR = {
  en: {
    eyebrow: "YOUR AI OPPORTUNITY ROADMAP",
    startWith: "Start with",
    preparedFor: "Prepared for",
    timeBack: "TIME BACK / WEEK",
    hrs: "hrs",
    focus: (p, s) => (s ? `Focus pillar: ${p},\nwith gains in ${s}.` : `Focus pillar: ${p}.`),
    bridge:
      "Based on your answers, here are the three systems that would give you the most time and revenue back, in the order we would build them. The pages that follow show exactly how each one works.",
    top3Title: "YOUR TOP 3 AUTOMATIONS TO START WITH",
    footer: "AUTOMIS · AI OPPORTUNITY ROADMAP",
  },
  it: {
    eyebrow: "LA TUA ROADMAP DI OPPORTUNITÀ IA",
    startWith: "Parti da",
    preparedFor: "Preparata per",
    timeBack: "TEMPO RISPARMIATO / SETTIMANA",
    hrs: "ore",
    focus: (p, s) => (s ? `Pilastro prioritario: ${p},\ncon benefici anche in ${s}.` : `Pilastro prioritario: ${p}.`),
    bridge:
      "In base alle tue risposte, ecco i tre sistemi che ti farebbero recuperare più tempo e fatturato, nell'ordine in cui li costruiremmo. Le pagine che seguono mostrano come funziona ognuno.",
    top3Title: "LE TUE 3 AUTOMAZIONI DA CUI PARTIRE",
    footer: "AUTOMIS · ROADMAP DI OPPORTUNITÀ IA",
  },
  pt: {
    eyebrow: "O SEU ROADMAP DE OPORTUNIDADES IA",
    startWith: "Comece por",
    preparedFor: "Preparado para",
    timeBack: "TEMPO DEVOLVIDO / SEMANA",
    hrs: "h",
    focus: (p, s) => (s ? `Pilar prioritário: ${p},\ncom ganhos também em ${s}.` : `Pilar prioritário: ${p}.`),
    bridge:
      "Com base nas suas respostas, estes são os três sistemas que lhe devolveriam mais tempo e faturação, pela ordem em que os construiríamos. As páginas seguintes mostram exatamente como cada um funciona.",
    top3Title: "AS SUAS 3 AUTOMAÇÕES POR ONDE COMEÇAR",
    footer: "AUTOMIS · ROADMAP DE OPORTUNIDADES IA",
  },
};

// primary:secondary -> playbook file. Fallback flavour when no secondary.
const VARIANT_BY_PILLARS = {
  "sales:marketing": "sales-x-marketing",
  "sales:admin": "sales-x-admin",
  "admin:sales": "admin-x-sales",
  "admin:marketing": "admin-x-marketing",
  "marketing:sales": "marketing-x-sales",
  "marketing:admin": "marketing-x-admin",
};
const DEFAULT_SECONDARY = { sales: "admin", admin: "marketing", marketing: "admin" };

export function pillarLabel(primary, locale = "en") {
  return (PILLAR_NAME[locale] || PILLAR_NAME.en)[primary] || "";
}

export function selectVariant(primary, secondary) {
  const p = PILLAR_NAME.en[primary] ? primary : "sales";
  const sec = secondary && secondary !== p ? secondary : DEFAULT_SECONDARY[p];
  return VARIANT_BY_PILLARS[`${p}:${sec}`] || "sales-x-marketing";
}

// GHL tag for the selected variant, e.g. "finder-sales-marketing"
export function variantTag(primary, secondary) {
  return "finder-" + selectVariant(primary, secondary).replace("-x-", "-");
}

// Per-locale, per-variant cover content. Top 3 names the SAME automations the
// playbook body covers (cover promise maps 1:1 to the pages that follow).
const COVER = {
  en: {
    "sales-x-marketing": {
      top3: [
        ["24/7 AI Voice Agent (outbound + recovery)", "Calls every new lead in seconds and re-works months of cold leads at volume."],
        ["Speed-to-lead instant call & SMS", "The moment a form or ad lead lands, they get a call and a text before a competitor answers."],
        ["Aged-lead reactivation campaign", "Turns your dead CRM list into booked calls, fully automated."],
      ],
      whisper: "Because most of your leads arrive through ads and web forms and you are losing time to slow follow-up, we would start with the outbound Voice Agent.",
    },
    "sales-x-admin": {
      top3: [
        ["24/7 AI Voice Agent (inbound)", "Answers every incoming call, qualifies the caller, and books them straight into your calendar."],
        ["Missed-call to instant SMS recovery", "Any call you cannot take triggers an instant text, so the lead never goes to a competitor."],
        ["Web & WhatsApp inquiry routing", "Every form and message captured, answered, and turned into a booked appointment."],
      ],
      whisper: "Because most of your leads come in by phone and you are losing time to missed calls, we would start with the inbound Voice Agent.",
    },
    "admin-x-sales": {
      top3: [
        ["Custom RAG Second Brain", "A private AI trained on your documents, so anyone gets an accurate, sourced answer in seconds."],
        ["Audio-to-CRM voice notes", "Dictate a note after a client interaction and it is transcribed and written to the CRM automatically."],
        ["Auto follow-up & quote drafting", "The system drafts the follow-up or quote from context, so a person just reviews and sends."],
      ],
      whisper: "Because your team loses the most time to manual admin and scattered knowledge, we would start with your custom Second Brain.",
    },
    "admin-x-marketing": {
      top3: [
        ["Custom RAG Second Brain", "A private AI over your files and know-how; ask in plain language, get sourced answers instantly."],
        ["Scan-to-Brain OCR", "Scan or photograph paperwork and it is digitised, structured, and filed into the brain automatically."],
        ["Automated content & reports", "Turn your organised knowledge into draft reports and content with a review-and-send workflow."],
      ],
      whisper: "Because your knowledge is scattered and reporting eats your week, we would start with your custom Second Brain.",
    },
    "marketing-x-sales": {
      top3: [
        ["AI Ads & Creative Agent", "Generates, tests, and optimises ad creative across Meta and Google, for more qualified leads per euro."],
        ["Speed-to-lead + outbound Voice recovery", "Every lead gets an instant text, call, and voice follow-up, so the demand you paid for converts."],
        ["Funnel automation & nurture", "Automated landing pages and nurture sequences that warm leads until they book."],
      ],
      whisper: "Because you are spending on marketing but leads slip before they convert, we would start with the AI Ads & Creative Agent.",
    },
    "marketing-x-admin": {
      top3: [
        ["SEO & GEO visibility", "Get found by people on Google and by AI assistants when they recommend a business like yours."],
        ["Automated content engine", "A hands-off pipeline that turns your expertise into a steady stream of on-brand content."],
        ["Reputation & review automation", "Quietly grows your reviews and keeps your rating and profiles strong."],
      ],
      whisper: "Because customers cannot easily find you and you have no time for content, we would start with SEO and GEO visibility.",
    },
  },
  it: {
    "sales-x-marketing": {
      top3: [
        ["Assistente vocale IA 24/7 (outbound + recupero)", "Chiama ogni nuovo contatto in pochi secondi e rilavora mesi di contatti freddi su larga scala."],
        ["Speed-to-lead: chiamata e SMS immediati", "Appena arriva un contatto da form o ads, riceve una chiamata e un messaggio prima che risponda un concorrente."],
        ["Campagna di riattivazione contatti", "Trasforma i contatti fermi nel tuo CRM in appuntamenti prenotati, in automatico."],
      ],
      whisper: "Dato che la maggior parte dei tuoi contatti arriva da ads e form e stai perdendo tempo nel follow-up, partiremmo dall'assistente vocale in outbound.",
    },
    "sales-x-admin": {
      top3: [
        ["Assistente vocale IA 24/7 (inbound)", "Risponde a ogni chiamata in arrivo, qualifica il contatto e lo prenota direttamente in agenda."],
        ["Recupero chiamate perse via SMS", "Ogni chiamata che non puoi prendere fa partire un SMS immediato, così il contatto non va dalla concorrenza."],
        ["Instradamento richieste web e WhatsApp", "Ogni form e messaggio raccolto, gestito e trasformato in un appuntamento prenotato."],
      ],
      whisper: "Dato che la maggior parte dei contatti arriva per telefono e stai perdendo chiamate, partiremmo dall'assistente vocale in inbound.",
    },
    "admin-x-sales": {
      top3: [
        ["Second Brain RAG su misura", "Un'IA privata addestrata sui tuoi documenti: chiunque ottiene una risposta accurata e con fonti in pochi secondi."],
        ["Note vocali portate nel CRM", "Detti una nota dopo un contatto e viene trascritta e scritta nel CRM in automatico."],
        ["Follow-up e preventivi in bozza", "Il sistema prepara la bozza di follow-up o preventivo dal contesto: a una persona resta solo revisionare e inviare."],
      ],
      whisper: "Dato che il tuo team perde più tempo in attività manuali e conoscenza sparsa, partiremmo dal tuo Second Brain su misura.",
    },
    "admin-x-marketing": {
      top3: [
        ["Second Brain RAG sui tuoi documenti", "Un'IA privata sui tuoi file e sul tuo know-how: chiedi in linguaggio naturale, ottieni risposte con fonti all'istante."],
        ["OCR Scan-to-Brain", "Scansiona o fotografa le pratiche: vengono digitalizzate, strutturate e archiviate nel brain in automatico."],
        ["Contenuti e report automatici", "Trasforma la conoscenza organizzata in bozze di report e contenuti, con un flusso di revisione e invio."],
      ],
      whisper: "Dato che la tua conoscenza è sparsa e la reportistica ti divora la settimana, partiremmo dal tuo Second Brain su misura.",
    },
    "marketing-x-sales": {
      top3: [
        ["Agente IA per ads e creatività", "Genera, testa e ottimizza le creatività su Meta e Google: più contatti qualificati a parità di budget."],
        ["Speed-to-lead + recupero vocale outbound", "Ogni contatto riceve subito un SMS, una chiamata e un follow-up vocale, così la domanda che paghi si converte davvero."],
        ["Automazione funnel e nurture", "Landing page automatiche e sequenze di nurture che scaldano i contatti finché non prenotano."],
      ],
      whisper: "Dato che investi in marketing ma i contatti si perdono prima di convertire, partiremmo dall'agente IA per ads e creatività.",
    },
    "marketing-x-admin": {
      top3: [
        ["Visibilità SEO e GEO", "Fatti trovare da chi cerca su Google e dagli assistenti IA quando consigliano un'attività come la tua."],
        ["Motore di contenuti automatico", "Un flusso hands-off che trasforma la tua competenza in contenuti costanti e on-brand."],
        ["Automazione recensioni e reputazione", "Fa crescere le recensioni e mantiene forti valutazione e profili, in silenzio."],
      ],
      whisper: "Dato che i clienti non ti trovano facilmente e non hai tempo per i contenuti, partiremmo dalla visibilità SEO e GEO.",
    },
  },
  pt: {
    "sales-x-marketing": {
      top3: [
        ["Assistente de voz IA 24/7 (outbound + recuperação)", "Liga a cada novo contacto em segundos e retrabalha meses de contactos frios em grande escala."],
        ["Speed-to-lead: chamada e SMS imediatos", "Assim que chega um contacto de formulário ou anúncio, recebe uma chamada e um SMS antes de um concorrente responder."],
        ["Campanha de reativação de contactos", "Transforma a sua lista morta no CRM em chamadas agendadas, totalmente automatizada."],
      ],
      whisper: "Como a maioria dos seus contactos chega por anúncios e formulários e está a perder tempo com follow-up lento, começaríamos pelo Assistente de Voz em outbound.",
    },
    "sales-x-admin": {
      top3: [
        ["Assistente de voz IA 24/7 (inbound)", "Atende cada chamada a entrar, qualifica quem liga e marca-o diretamente no seu calendário."],
        ["Recuperação de chamadas perdidas por SMS", "Qualquer chamada que não possa atender dispara um SMS imediato, para que o contacto nunca vá para um concorrente."],
        ["Encaminhamento de pedidos web e WhatsApp", "Cada formulário e mensagem captado, respondido e transformado numa marcação confirmada."],
      ],
      whisper: "Como a maioria dos seus contactos chega por telefone e está a perder tempo com chamadas perdidas, começaríamos pelo Assistente de Voz em inbound.",
    },
    "admin-x-sales": {
      top3: [
        ["Second Brain RAG à medida", "Uma IA privada treinada nos seus documentos, para que qualquer pessoa obtenha uma resposta rigorosa e com fontes em segundos."],
        ["Notas de voz para o CRM", "Dite uma nota depois de um contacto com um cliente e ela é transcrita e escrita no CRM automaticamente."],
        ["Follow-up e orçamentos em rascunho", "O sistema prepara o follow-up ou o orçamento a partir do contexto, para que uma pessoa apenas reveja e envie."],
      ],
      whisper: "Como a sua equipa perde mais tempo com burocracia manual e conhecimento disperso, começaríamos pelo seu Second Brain à medida.",
    },
    "admin-x-marketing": {
      top3: [
        ["Second Brain RAG à medida", "Uma IA privada sobre os seus ficheiros e know-how; pergunte em linguagem natural e obtenha respostas com fontes na hora."],
        ["OCR Scan-to-Brain", "Digitalize ou fotografe a papelada e ela é digitalizada, estruturada e arquivada no brain automaticamente."],
        ["Conteúdo e relatórios automáticos", "Transforme o seu conhecimento organizado em rascunhos de relatórios e conteúdo, com um fluxo de revisão e envio."],
      ],
      whisper: "Como o seu conhecimento está disperso e os relatórios lhe consomem a semana, começaríamos pelo seu Second Brain à medida.",
    },
    "marketing-x-sales": {
      top3: [
        ["Agente IA de anúncios e criatividades", "Gera, testa e otimiza criatividades no Meta e no Google, para mais contactos qualificados por cada euro."],
        ["Speed-to-lead + recuperação vocal outbound", "Cada contacto recebe um SMS, uma chamada e um follow-up vocal imediatos, para que a procura que pagou converta."],
        ["Automação de funil e nurturing", "Landing pages e sequências de nurturing automáticas que aquecem os contactos até marcarem."],
      ],
      whisper: "Como está a investir em marketing mas os contactos escapam antes de converter, começaríamos pelo Agente IA de anúncios e criatividades.",
    },
    "marketing-x-admin": {
      top3: [
        ["Visibilidade SEO e GEO", "Seja encontrado por quem pesquisa no Google e pelos assistentes de IA quando recomendam um negócio como o seu."],
        ["Motor de conteúdo automático", "Um pipeline hands-off que transforma a sua competência num fluxo constante de conteúdo on-brand."],
        ["Automação de avaliações e reputação", "Faz crescer as suas avaliações e mantém a classificação e os perfis fortes, de forma discreta."],
      ],
      whisper: "Como os clientes não o encontram facilmente e não tem tempo para conteúdo, começaríamos pela visibilidade SEO e GEO.",
    },
  },
};

// Load the Automis brand lockup (same logo the playbook body uses) as a data URL
// so it can be embedded into the jsPDF cover. Returns null if unavailable, so the
// cover falls back to the plain wordmark.
async function loadLogoDataUrl() {
  try {
    const res = await fetch("/playbooks/automis-logo.png");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

// ---- Cover page (jsPDF) ---------------------------------------------------
async function buildCover({ name, sector, primary, secondary, hoursLow, hoursHigh, locale, variant }) {
  const L = STR[locale] || STR.en;
  const names = PILLAR_NAME[locale] || PILLAR_NAME.en;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  const pillarName = names[primary] || names.sales;
  const secondaryName = secondary && secondary !== primary ? names[secondary] : null;
  const content = (COVER[locale] || COVER.en)[variant] || COVER.en["sales-x-marketing"];

  doc.setFillColor(...DEEP);
  doc.rect(0, 0, W, H, "F");

  // Brand lockup (matches the playbook body). Falls back to a plain wordmark.
  const logo = await loadLogoDataUrl();
  if (logo) {
    // logo asset is 2953x1969 (1.5:1); the visible mark sits inside transparent padding.
    const logoW = 132;
    doc.addImage(logo, "PNG", M - 6, 30, logoW, logoW / 1.5);
  } else {
    doc.setTextColor(...WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AUTOMIS", M, 64);
  }
  doc.setTextColor(...MUTE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("automis.ai", W - M, 62, { align: "right" });

  // Eyebrow + headline
  let y = 150;
  doc.setTextColor(...BLUE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(L.eyebrow, M, y);

  y += 34;
  doc.setTextColor(...WHITE);
  doc.setFontSize(30);
  doc.text(L.startWith, M, y);
  y += 34;
  doc.setTextColor(...BLUE);
  doc.text(pillarName, M, y);

  y += 24;
  doc.setTextColor(...SOFT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  const who = name ? `${L.preparedFor} ${name}` : L.preparedFor;
  doc.text(`${who}${sector ? `  ·  ${sector}` : ""}`, M, y);

  y += 18;
  doc.setFillColor(...GOLD);
  doc.roundedRect(M, y, 60, 3, 1.5, 1.5, "F");

  // Hero metric panel
  y += 24;
  const panelH = 92;
  doc.setFillColor(...PANEL);
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.8);
  doc.roundedRect(M, y, W - M * 2, panelH, 12, 12, "FD");
  doc.setTextColor(...GOLD);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(`${hoursLow}-${hoursHigh} ${L.hrs}`, M + 22, y + 48);
  doc.setTextColor(...SOFT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(L.timeBack, M + 22, y + 68);
  doc.setTextColor(...MUTE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(L.focus(pillarName, secondaryName), W - M - 22, y + 40, { align: "right" });

  // Bridging line
  y += panelH + 30;
  doc.setTextColor(210, 220, 235);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const bridge = doc.splitTextToSize(L.bridge, W - M * 2);
  doc.text(bridge, M, y);
  y += bridge.length * 15 + 14;

  // Section title
  doc.setFillColor(...BLUE);
  doc.rect(M, y - 8, 7, 7, "F");
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(L.top3Title, M + 14, y);
  y += 16;

  // Top 3 rows
  content.top3.forEach(([title, desc], i) => {
    const rowH = 54;
    doc.setFillColor(...PANEL);
    doc.setDrawColor(...HAIR);
    doc.setLineWidth(0.6);
    doc.roundedRect(M, y, W - M * 2, rowH, 10, 10, "FD");
    doc.setFillColor(...(i === 0 ? BLUE : CYAN));
    doc.circle(M + 24, y + rowH / 2, 11, "F");
    doc.setTextColor(...DEEP);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(String(i + 1), M + 24, y + rowH / 2 + 4, { align: "center" });
    const tx = M + 46;
    doc.setTextColor(...WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, tx, y + 21);
    doc.setTextColor(...MUTE);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const d = doc.splitTextToSize(desc, W - M * 2 - 46 - 18);
    doc.text(d, tx, y + 37);
    y += rowH + 10;
  });

  // Whisper rationale
  y += 4;
  doc.setFillColor(...BLUE);
  doc.rect(M, y - 8, 2, 26, "F");
  doc.setTextColor(...MUTE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const wl = doc.splitTextToSize(content.whisper, W - M * 2 - 14);
  doc.text(wl, M + 12, y);

  // Footer
  const fy = H - 40;
  doc.setDrawColor(...HAIR);
  doc.setLineWidth(0.6);
  doc.line(M, fy, W - M, fy);
  doc.setTextColor(...MUTE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(L.footer, M, fy + 16);
  doc.text("AUTOMIS.AI", W - M, fy + 16, { align: "right" });

  return doc.output("arraybuffer");
}

// Build the full merged PDF bytes (cover + playbook body, sample cover dropped).
export async function buildRoadmapBytes({ name, sector, primary, secondary, hoursLow, hoursHigh, locale = "en" }) {
  const variant = selectVariant(primary, secondary);
  const coverBytes = await buildCover({ name, sector, primary, secondary, hoursLow, hoursHigh, locale, variant });

  const merged = await PDFDocument.create();
  const coverDoc = await PDFDocument.load(coverBytes);
  const [coverPage] = await merged.copyPages(coverDoc, [0]);
  merged.addPage(coverPage);

  try {
    const res = await fetch(`/playbooks/${locale}/${variant}.pdf`);
    if (res.ok) {
      const bodyDoc = await PDFDocument.load(await res.arrayBuffer());
      const pages = await merged.copyPages(bodyDoc, bodyDoc.getPageIndices().slice(1));
      pages.forEach((p) => merged.addPage(p));
    }
  } catch (err) {
    console.error("Playbook body fetch/merge failed", err);
  }
  return merged.save();
}

// Generate + trigger a browser download of the personalised roadmap.
export async function generateRoadmapPdf(params) {
  const out = await buildRoadmapBytes(params);
  const safe = (params.name || "your-business").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const blob = new Blob([out], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `automis-roadmap-${safe}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
