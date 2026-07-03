import { jsPDF } from "jspdf";

// Brand palette
const DEEP = [0, 10, 20];
const BLUE = [60, 145, 230];
const CYAN = [87, 199, 227];
const YELLOW = [245, 205, 121];
const INK = [22, 30, 40];
const MUTE = [110, 122, 138];

const BOOKING = "https://automis.ai/#book";

/*
  Builds a branded, personalised one-page roadmap PDF from the finder answers
  and triggers a download. Text avoids long dashes to keep copy clean.
*/
export function generateRoadmapPdf({ name, sector, pillarName, secondaryName, hoursLow, hoursHigh, plays }) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const M = 48;

  // Header band
  doc.setFillColor(...DEEP);
  doc.rect(0, 0, W, 116, "F");
  doc.setFillColor(...CYAN);
  doc.rect(0, 116, W, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("AUTOMIS", M, 56);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(180, 194, 255);
  doc.text("Strategic AI Automation Agency", M, 74);
  doc.setTextColor(245, 205, 121);
  doc.setFontSize(9);
  doc.text("automis.ai", W - M, 56, { align: "right" });

  let y = 168;
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Your AI Opportunity Roadmap", M, y);

  y += 26;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...MUTE);
  const who = name ? `Prepared for ${name}` : "Prepared for you";
  doc.text(`${who}${sector ? `  ·  ${sector}` : ""}`, M, y);

  // Two metric cards
  y += 28;
  const cardW = (W - M * 2 - 16) / 2;
  const cardH = 92;
  const drawCard = (x, label, value, sub) => {
    doc.setDrawColor(225, 231, 240);
    doc.setFillColor(247, 250, 253);
    doc.roundedRect(x, y, cardW, cardH, 10, 10, "FD");
    doc.setTextColor(...MUTE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(label.toUpperCase(), x + 16, y + 24);
    doc.setTextColor(...BLUE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(value, x + 16, y + 54);
    doc.setTextColor(...MUTE);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(sub, x + 16, y + 74);
  };
  drawCard(M, "Time back / week", `${hoursLow}-${hoursHigh} hrs`, "Estimated, based on your answers");
  drawCard(
    M + cardW + 16,
    "Focus pillar",
    pillarName.split(" ")[0],
    secondaryName ? `${pillarName} + ${secondaryName.split(" ")[0]}` : pillarName
  );

  // Top 3 automations
  y += cardH + 34;
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Your top 3 automations to start with", M, y);
  y += 10;
  plays.forEach((p, i) => {
    y += 26;
    doc.setFillColor(...(i === 0 ? BLUE : CYAN));
    doc.circle(M + 7, y - 4, 3.4, "F");
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11.5);
    const lines = doc.splitTextToSize(p, W - M * 2 - 28);
    doc.text(lines, M + 22, y);
    y += (lines.length - 1) * 14;
  });

  // How we work
  y += 34;
  doc.setDrawColor(225, 231, 240);
  doc.line(M, y, W - M, y);
  y += 26;
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("How we would build it", M, y);
  const steps = [
    ["1. Discover & Diagnose", "We map where you lose time and money before touching a tool."],
    ["2. Design, Build & Deploy", "Live in about 7 days for Voice and simple systems, custom for complex."],
    ["3. Launch, Monitor & Optimise", "Continuous monthly improvement with human oversight."],
  ];
  steps.forEach((s) => {
    y += 24;
    doc.setTextColor(...BLUE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(s[0], M, y);
    y += 14;
    doc.setTextColor(...MUTE);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(s[1], M, y);
  });

  // CTA band
  y += 40;
  doc.setFillColor(...DEEP);
  doc.roundedRect(M, y, W - M * 2, 74, 10, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Want us to build these for you?", M + 20, y + 32);
  doc.setTextColor(...YELLOW);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Book a free discovery call at automis.ai", M + 20, y + 52);

  // Footer
  doc.setTextColor(...MUTE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    "Estimates are indicative and depend on your volume, market, and setup. (c) Automis, automis.ai",
    M,
    doc.internal.pageSize.getHeight() - 28
  );

  const safe = (name || "your-business").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  doc.save(`automis-roadmap-${safe}.pdf`);
}
