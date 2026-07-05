# automis.ai — Site-wide Rollout Design

**Date:** 2026-07-05
**Status:** Approved (brainstorm complete) — ready to build
**Scope:** Roll the new home-EN messaging, font, and UX/design system to the whole site; re-architect the page set.
**Language scope:** **EN first, then IT.**

---

## Context

The new design — Clash Display / General Sans fonts, the "Strategic AI Integrator"
3-pillar messaging, and the glow/gold card UX — currently lives **only on the EN home**.
It is scoped under a `.home-en-root` wrapper with its own `home-en-fonts.css` and
`components/home/*`. Every other page still runs the old template theme.

**Goal:** promote that design system site-wide and fix the page architecture so the site
reads as one coherent product, led by the Strategic Integrator positioning (not a marketing
agency).

### Positioning anchors (from `~/.claude/knowledge/business.md`)
- **Identity:** Strategic AI Integrator — "we build the AI systems your business is missing."
- **3 pillars:** Marketing & Growth → Sales & Acquisition → Admin & Company Brain.
- **Flagship proof:** Automis VoiceAI (voice.automis.ai).
- **EN = growth play**; IT + PT are the active sales markets.
- **Privacy-first / GDPR** is a selling point — do not publish real client/caller data.

---

## §1 — Page architecture

| Page | Decision | Role |
|------|----------|------|
| `home` ✅ | done | System overview + Opportunity Finder lead magnet |
| `voice-ai` | keep + redesign | **Flagship**: video, dashboard/CRM proof, pricing, guarantee |
| `ai-automations` → **"Automations"** | keep + **elaborate** | Browsable **explorer** — "what we can build," filter by niche + goal |
| `use-cases` (+ `[slug]`) | keep + redesign | **Proof**: real client stories (Clínica, Adifesa) |
| `about` | keep + redesign | Two founders, hands-on, the process |
| `jumpstart-audit` | keep + redesign | Entry offer / booking |
| `consultation` | keep, light | Simple "just want to talk" path |
| `contact` | keep + redesign | Form + booking |
| `blog` (+ `[slug]`) | keep, redesign shell | Ready for a later content push |
| `paid-ads-management` | ❌ **remove** | Off-positioning (not an ads agency) |
| `coming-soon`, `blog-details` | ❌ **remove** | Template leftovers |

**Key move:** `Automations` and `use-cases` stop overlapping — one is the *catalog*
(by niche/goal), the other is the *case studies*. Removed routes get redirects (no dead links).

---

## §2 — voice-ai page (flagship)

1. **Hero** — one line + the founder's recorded **"how it works" YouTube video** as the
   centerpiece (moved off the home page, where it was mismatched). Optional: the playable
   call-audio demo already built on `/pt` underneath.
2. **The problem** — missed calls / after-hours / slow follow-up (Sales-pillar pain).
3. **How it works** — inbound answering → qualify → book → CRM sync → missed-call recovery.
4. **"You see everything" — the dashboard** — screenshot walk: overview KPIs → call logs →
   open one call to reveal **recording + transcript + AI summary**. Proves transparency.
5. **The CRM (new)** — the 3 versions as tiers of visibility:
   **Bookings** (every appointment the AI booked) → **Light CRM** (contacts + outcomes +
   sentiment) → **Pipeline** (kanban sales board). *(Screenshots pending — see Assets.)*
6. **Pricing** — Starter €297 / Growth €497 / Scale €697, with the **30-day guarantee**.
7. **FAQ + final CTA** (book a call).

This dashboard + CRM section is the page's real differentiator — no competitor
screenshot-walks their product like this.

---

## §3 — Automations page (the explorer)

The core interaction: a visitor filters to *their* world immediately.

- **Two filter axes:**
  - **By niche** — Healthcare · Professional Services · Real Estate · Local/Online business
  - **By goal (pillar)** — Get more customers (Marketing) · Never miss a lead (Sales) ·
    Run the back office (Admin/Company Brain)
- **Grid of automation cards**, each written **Problem → What we automate → Outcome**
  (e.g. *"Missed after-hours calls → AI voice receptionist books them 24/7 → ~30% more
  booked appointments"*).
- Cards deep-link into a **`use-cases/[slug]`** story when a real client backs them
  (ties catalog → proof).
- Ends on the **Opportunity Finder** CTA (reuse the home component).

Makes the page a *tool*, not a brochure, and it scales — add automations as cards, no redesign.

---

## §4 — Rollout & build order

1. **Extract the design system first (the unlock).** Lift fonts, color tokens, and the
   card/effect primitives out of `.home-en-root` into a global theme + shared
   Header / Footer / section shells. Nothing else is efficient until this exists.
2. **Build EN pages** (each: branch → Vercel preview → approval → merge, per workflow):
   `voice-ai` → `automations` → `use-cases` → `about` → `jumpstart-audit` → `contact` →
   `consultation` (light) → `blog` shell.
3. **Prune:** delete `paid-ads-management`, `coming-soon`, `blog-details` + add redirects.
4. **IT mirror** once EN is signed off.

### Card-effect decision (already shipped on the glow-test branch)
The two card effects **alternate ABAB** down a page: pointer-follow **gold glow** ↔
**gold hover-border**. Applied on the home; carry the same alternation into new sections.

---

## Assets & open items

- **Dashboard screenshots** (source: `~/Desktop/Claude Code/Dashboard/`):
  - `dash-overview` — clean (no PII).
  - `dash-calls` → **scrubbed** (`dash-calls-clean.png`): fake names, numbers, client label.
  - `dash-detail` — needs a careful in-paragraph scrub (do at build, or recapture).
  - `pipeline-clean.png` → **scrubbed + 2 UNKNOWN columns relabeled** as a patch.
  - **Bookings** + **Light CRM** shots — still to scrub (same table method).
- **CRM screenshots** — user to send any additional raw shots; **PII scrub is Claude's job**,
  no need to anonymize before sending.
- **PII identity map** (keep consistent across ALL screenshots):
  Espedito → Emanuele · Antonio Moreno → Andrea Marini · Giuseppe De Vivo → Giorgio Doria ·
  Arcangelo Bianco → (fake, initials AB) · Lorenzo Andreoli → (fake, initials LA) ·
  "Studio Schettino" → "Studio Aurora" · Unknown Caller → keep.
  Numbers: 347 917 9396→351 204 5510 · 392 593 2324→348 771 2093 ·
  342 743 3035→350 118 6647 · 339 199 3336→347 902 3381.

### Dashboard pipeline bug (fix in the app, separate from the site)
The Pipeline board is fed the **call-outcome categories** (Unknown, Interested–No Appointment,
Won, Lost…) instead of the intended **sales stages**: Discovery Call Booked → No Show →
2d Meeting Booked → Agreement Sent → Closed Won → Closed Lost → Contact Later On →
Email Nurturing. "UNKNOWN" columns = calls whose outcome never mapped to a stage.
**Real fix = correct the stage-mapping field in the dashboard app, then recapture a
full-width clean pipeline screenshot.** Needs repo access (TBD).

---

## Decisions made in this brainstorm
- EN first, then IT.
- Keep `ai-automations` (rebuilt as the niche/goal explorer), `blog`, `consultation`.
- Remove `paid-ads-management`, `coming-soon`, `blog-details`.
- voice-ai hero leads with the founder video; dashboard + CRM become the differentiator.
- Screenshots: clean **demo data**; Claude scrubs PII from raw shots.

## Out of scope (for now)
- IT + other-locale rollout (after EN sign-off).
- Dashboard app changes (tracked above; separate access + effort).
- New blog content (separate project).
