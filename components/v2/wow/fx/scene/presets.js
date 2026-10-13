// Le scene delle hero interne: quali moduli, in che ordine scatta la catena, che disposizione.
// Solo dati (nessun three). Ogni pagina ha la sua: i moduli sono quelli che quella pagina racconta.
//
//   modules   gli id di scene/icons.js, NELL'ORDINE della catena: un pacchetto di dati corre dal primo al secondo, il secondo
//             si accende e passa il testimone, e così via fino all'ultimo (lampo dorato, uno solo per scena)
//   style     disposizione attorno al testo: "u" (colonna a sinistra, attraversamento in basso, colonna a destra che risale),
//             "v" (primo e ultimo ai lati, quelli in mezzo in basso), "arc" (un arco che abbraccia il testo, a sorriso)
//   flip      la catena parte da destra invece che da sinistra
//   z         profondità dei moduli (unità di schermo): diversa da pagina a pagina
//   seed      cambia le piccole irregolarità (polvere, ritardi, ampiezze)
export const PRESETS = {
  generic: { modules: ["call", "calendar", "invoice", "crm"], style: "u", z: [40, -60, 70, -30], seed: 11 },
  // Sistemi IA per…
  hub: { modules: ["ads", "deal", "headset", "folder", "users"], style: "u", z: [50, -40, 80, -70, 30], seed: 23 },
  marketing: { modules: ["ads", "social", "search", "chart"], style: "arc", z: [30, -50, 60, -20], seed: 31 },
  sales: { modules: ["call", "crm", "chat", "calendar"], style: "u", z: [60, -40, 40, -70], seed: 43 },
  support: { modules: ["chat", "call", "doc", "check"], style: "v", z: [50, -30, -60, 40], seed: 57 },
  admin: { modules: ["invoice", "doc", "db", "chart"], style: "v", z: [-40, 60, -20, 50], seed: 61 },
  "company-brain": { modules: ["userplus", "book", "search", "users"], style: "arc", flip: true, z: [40, -60, 50, -30], seed: 79 },
  // altre pagine
  how: { modules: ["search", "wrench", "chart"], style: "v", z: [50, -50, 50], seed: 83 },
  training: { modules: ["learn", "book", "workflow", "shield"], style: "arc", z: [-30, 50, -50, 40], seed: 97 },
  about: { modules: ["users", "deal", "shield", "spark"], style: "u", flip: true, z: [40, -50, 60, -40], seed: 101 },
  contact: { modules: ["mail", "call", "calendar", "chat"], style: "v", z: [60, -40, -50, 50], seed: 113 },
  ecommerce: { modules: ["cart", "box", "ads", "chart"], style: "u", z: [50, -60, 40, -30], seed: 127 },
  // Voice AI: chiamata -> qualifica/appuntamento -> calendario -> scheda nel CRM (la catena del prodotto di punta)
  voice: { modules: ["call", "check", "calendar", "crm"], style: "u", z: [60, -40, 50, -60], seed: 157 },
  cases: { modules: ["doc", "chart", "deal", "star"], style: "arc", flip: true, z: [-40, 50, -30, 60], seed: 131 },
  datura: { modules: ["shield", "ads", "chart", "spark"], style: "u", z: [60, -40, 50, -60], seed: 149 },
  // indice dei casi (scene="casi") e Album AI (scene="album"): i moduli veri di quei casi, nell'ordine in cui lavorano
  casi: { modules: ["call", "social", "camera", "shield"], style: "arc", z: [50, -40, 60, -30], seed: 137 },
  album: { modules: ["camera", "check", "book"], style: "v", z: [50, -50, 50], seed: 139 },
};

// /it/systems/sales, /pt/systems/sales, /pt-site/systems/sales, /systems/sales -> "sales"
export function presetForPath(pathname) {
  const p = String(pathname || "/")
    .replace(/^\/(it|pt-site|pt|en|fr|de|es)(?=\/|$)/, "")
    .replace(/\/+$/, "");
  const seg = p.split("/").filter(Boolean);
  if (seg[0] === "systems") return seg[1] && PRESETS[seg[1]] ? seg[1] : "hub";
  if (seg[0] === "how-we-work") return "how";
  if (seg[0] === "training") return "training";
  if (seg[0] === "about") return "about";
  if (seg[0] === "contact") return "contact";
  if (seg[0] === "ecommerce") return "ecommerce";
  if (seg[0] === "voice-ai") return "voice";
  if (seg[0] === "use-cases") return seg[1] && /datura/.test(seg[1]) ? "datura" : seg[1] ? "generic" : "cases";
  return "generic";
}
