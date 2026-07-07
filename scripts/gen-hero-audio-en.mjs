// Generate the hero "live call" audio in ENGLISH (en) via ElevenLabs,
// plus a synced caption cue file. API key read from env; NEVER written to a shipped file.
//
// Usage:
//   source ~/.claude/secrets/api-keys.env
//   node scripts/gen-hero-audio-en.mjs voices        # list account voices
//   node scripts/gen-hero-audio-en.mjs               # generate (uses en voices below)
//
// Output (both shipped; the key is not):
//   public/audio/hero-call-en.wav
//   public/audio/hero-call-en.cues.json   [{ start, end, speaker, name, text }]

import { mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { tmpdir } from "node:os";

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("Missing ELEVENLABS_API_KEY. Run: source ~/.claude/secrets/api-keys.env");
  process.exit(1);
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_WAV = join(ROOT, "public", "audio", "hero-call-en.wav");
const OUT_CUES = join(ROOT, "public", "audio", "hero-call-en.cues.json");
const H = { "xi-api-key": KEY };
const SR = 22050; // mono 16-bit WAV — universally supported & seekable; small enough for voice

// ENGLISH voices — override via env if desired (AGENT_VOICE / CALLER_VOICE).
const AGENT = process.env.AGENT_VOICE || "EXAVITQu4vr4xnSDxMaL"; // Sarah – Mature, Reassuring, Confident (f, american)
const CALLER = process.env.CALLER_VOICE || "nPczCjzI2devNBz1zQrb"; // Brian – Deep, Resonant, Comforting (m, american)
const MODEL = "eleven_multilingual_v2";

// The call (English). Agent answers first (inbound).
const LINES = [
  { who: "agent", name: "Automis", text: "Automis, good evening. How can I help you?" },
  { who: "caller", name: "Caller", text: "Good evening. I'd like to book an appointment." },
  { who: "agent", name: "Automis", text: "Of course. I have an opening on Thursday at ten thirty. Does that work for you?" },
  { who: "caller", name: "Caller", text: "Yes, that's perfect." },
  { who: "agent", name: "Automis", text: "Great. I've just sent you a text with the confirmation. Anything else?" },
  { who: "caller", name: "Caller", text: "No, thank you so much." },
  { who: "agent", name: "Automis", text: "You're welcome. Have a wonderful evening!" },
];

const GAP = 0.45; // seconds of breathing room added to each cue's timing

async function listVoices() {
  const r = await fetch("https://api.elevenlabs.io/v1/voices", { headers: H });
  if (!r.ok) throw new Error(`voices ${r.status}: ${await r.text()}`);
  const { voices } = await r.json();
  for (const v of voices)
    console.log(
      `${v.voice_id}  ${v.name}  [${v.labels?.gender ?? "?"}, ${v.labels?.accent ?? "?"}, ${v.labels?.language ?? "?"}]`
    );
}

// Decode an MP3 buffer to raw PCM (mono, 16-bit) via macOS afconvert.
function mp3ToPcm(buf, idx) {
  const mp3 = join(tmpdir(), `av-en-seg-${idx}.mp3`);
  const wav = join(tmpdir(), `av-en-seg-${idx}.wav`);
  writeFileSync(mp3, buf);
  try {
    execSync(`afconvert -f WAVE -d LEI16@${SR} -c 1 "${mp3}" "${wav}"`, {
      stdio: "ignore",
    });
    const w = readFileSync(wav);
    // find the "data" chunk
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

async function ttsLine(line) {
  const vid = line.who === "agent" ? AGENT : CALLER;
  const r = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${vid}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { ...H, "content-type": "application/json" },
      body: JSON.stringify({
        text: line.text,
        model_id: MODEL,
        voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.0 },
      }),
    }
  );
  if (!r.ok) throw new Error(`tts ${r.status}: ${await r.text()}`);
  return Buffer.from(await r.arrayBuffer());
}

async function main() {
  if (process.argv[2] === "voices") return listVoices();

  mkdirSync(dirname(OUT_WAV), { recursive: true });
  const pcms = [];
  const cues = [];
  const silence = Buffer.alloc(Math.round(SR * GAP) * 2); // mono 16-bit gap
  let t = 0;
  let idx = 0;
  for (const line of LINES) {
    const buf = await ttsLine(line);
    const pcm = mp3ToPcm(buf, idx++);
    const dur = pcm.length / 2 / SR; // mono 16-bit
    cues.push({
      start: +t.toFixed(2),
      end: +(t + dur).toFixed(2),
      speaker: line.who,
      name: line.name,
      text: line.text,
    });
    pcms.push(pcm, silence);
    t += dur + GAP;
    console.log(`  ✓ ${line.name} (${dur.toFixed(1)}s): ${line.text.slice(0, 44)}…`);
  }

  // Write one valid, seekable WAV (universally supported — no codec issues).
  const data = Buffer.concat(pcms);
  writeFileSync(OUT_WAV, Buffer.concat([wavHeader(data.length), data]));

  writeFileSync(OUT_CUES, JSON.stringify(cues, null, 2));
  const kb = (data.length / 1024).toFixed(0);
  console.log(`\nSaved ${OUT_WAV}  (~${t.toFixed(1)}s, ${kb} KB)`);
  console.log(`Saved ${OUT_CUES}  (${cues.length} cues)`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
