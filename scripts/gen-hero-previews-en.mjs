// Generate several ENGLISH hero-call voice PREVIEWS via ElevenLabs (model eleven_v3)
// so we can pick the most realistic pair before shipping. Writes full ~21s clips to a
// preview folder on the Desktop — nothing here is deployed.
//
// Usage:
//   source ~/.claude/secrets/api-keys.env
//   node scripts/gen-hero-previews-en.mjs
//
// Output: ~/Desktop/Claude Code/website/en-hero-voice-previews/<option>.wav

import { mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { tmpdir, homedir } from "node:os";

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("Missing ELEVENLABS_API_KEY. Run: source ~/.claude/secrets/api-keys.env");
  process.exit(1);
}

const OUT_DIR = join(homedir(), "Desktop", "Claude Code", "website", "en-hero-voice-previews");
const H = { "xi-api-key": KEY };
const SR = 22050;
const MODEL = "eleven_v3";
const GAP = 0.45;

// Round 2 — agent fixed to Alexandra (conversational/real); vary the MALE caller
// toward lighter, younger, less-synthetic voices (prev males read too deep / obviously AI).
const ALEXANDRA = "kdmDKE6EkgrWrrykO9Qt";
const OPTIONS = [
  {
    file: "r2-option-A-Alexandra+Liam.wav",
    label: "US · Alexandra (agent) + Liam (caller) — young, light, energetic",
    agent: ALEXANDRA,
    caller: "TX3LPaxmHKxFdv7VOQHJ",
  },
  {
    file: "r2-option-B-Alexandra+Roger.wav",
    label: "US · Alexandra (agent) + Roger (caller) — laid-back, casual",
    agent: ALEXANDRA,
    caller: "CwhRBWXzGAHq8TQ4Fs17",
  },
  {
    file: "r2-option-C-Alexandra+Eric.wav",
    label: "US · Alexandra (agent) + Eric (caller) — smooth, natural (mid pitch)",
    agent: ALEXANDRA,
    caller: "cjVigY5qzO86Huf0OWal",
  },
];

const LINES = [
  { who: "agent", text: "Automis, good evening. How can I help you?" },
  { who: "caller", text: "Good evening. I'd like to book an appointment." },
  { who: "agent", text: "Of course. I have an opening on Thursday at ten thirty. Does that work for you?" },
  { who: "caller", text: "Yes, that's perfect." },
  { who: "agent", text: "Great. I've just sent you a text with the confirmation. Anything else?" },
  { who: "caller", text: "No, thank you so much." },
  { who: "agent", text: "You're welcome. Have a wonderful evening!" },
];

function mp3ToPcm(buf, tag) {
  const mp3 = join(tmpdir(), `av-prev-${tag}.mp3`);
  const wav = join(tmpdir(), `av-prev-${tag}.wav`);
  writeFileSync(mp3, buf);
  try {
    execSync(`afconvert -f WAVE -d LEI16@${SR} -c 1 "${mp3}" "${wav}"`, { stdio: "ignore" });
    const w = readFileSync(wav);
    let off = 12;
    while (off + 8 <= w.length) {
      const id = w.toString("ascii", off, off + 4);
      const size = w.readUInt32LE(off + 4);
      if (id === "data") return w.subarray(off + 8, off + 8 + size);
      off += 8 + size + (size % 2);
    }
    throw new Error("no WAV data chunk");
  } finally {
    rmSync(mp3, { force: true });
    rmSync(wav, { force: true });
  }
}

function wavHeader(dataLen, sr = SR, ch = 1, bits = 16) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + dataLen, 4);
  h.write("WAVE", 8);
  h.write("fmt ", 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(ch, 22);
  h.writeUInt32LE(sr, 24);
  h.writeUInt32LE((sr * ch * bits) / 8, 28);
  h.writeUInt16LE((ch * bits) / 8, 32);
  h.writeUInt16LE(bits, 34);
  h.write("data", 36);
  h.writeUInt32LE(dataLen, 40);
  return h;
}

async function ttsLine(text, vid) {
  const r = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${vid}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { ...H, "content-type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );
  if (!r.ok) throw new Error(`tts ${r.status}: ${await r.text()}`);
  return Buffer.from(await r.arrayBuffer());
}

async function buildOption(opt, oi) {
  const pcms = [];
  const silence = Buffer.alloc(Math.round(SR * GAP) * 2);
  let t = 0;
  let li = 0;
  for (const line of LINES) {
    const vid = line.who === "agent" ? opt.agent : opt.caller;
    const buf = await ttsLine(line.text, vid);
    const pcm = mp3ToPcm(buf, `${oi}-${li++}`);
    t += pcm.length / 2 / SR + GAP;
    pcms.push(pcm, silence);
  }
  const data = Buffer.concat(pcms);
  writeFileSync(join(OUT_DIR, opt.file), Buffer.concat([wavHeader(data.length), data]));
  console.log(`  ✓ ${opt.file}  (~${t.toFixed(1)}s) — ${opt.label}`);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Generating ${OPTIONS.length} previews (eleven_v3) → ${OUT_DIR}\n`);
  for (let i = 0; i < OPTIONS.length; i++) await buildOption(OPTIONS[i], i);
  console.log(`\nOpen the folder to listen:\n  open "${OUT_DIR}"`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
