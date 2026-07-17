# Tools hub design (2026-07-17)

A new indexable `/tools` section on automis.ai: a hub plus 4 client-side (zero-API)
micro-tools that fit Automis's ICP (local businesses in PT and IT, flagship VoiceAI).
Goal: midterm organic traffic + lead-gen + sales assets, not generic converters.

## Scope (approved)

Four tools, balanced 2 calculators + 2 utilities. Every tool's user is a local-business
owner (the filter that rules out generic image/PDF converters).

| Tool | Type | Inputs | Output |
|---|---|---|---|
| Missed-call revenue calculator | calculator | calls/day, % missed, avg value, close rate | lost revenue /month and /year |
| No-show cost calculator | calculator | appts/week, no-show %, avg value | lost revenue /month and /year |
| Google review link + QR generator | utility | Google Place ID | direct review link + QR (PNG) |
| WhatsApp / click-to-call generator | utility | phone, optional message | wa.me link + tel: link + QR + HTML snippet |

## Funnel

Results show free and instant (no gate). Soft CTA under each: calculators point to the
booking calendar, utilities point to the VoiceAI page. Calculators also offer an optional
"email me a copy" that upserts a GHL contact tagged `tool-<name>` + `tool-lead` via
`/api/tool-capture` (mirrors `/api/audit`), attaching the computed numbers as a note.

## Routing and i18n

- EN at `/tools` (hub) + `/tools/<slug>`; IT mirrored at `/it/tools` + `/it/tools/<slug-it>`.
- Reciprocal hreflang (en, it-IT, x-default) via each page's `metadata.alternates`.
- Same `AutomisEnShell` + `metadata` conventions as existing pages. Copy is localised, not
  translated; Italian follows house rules (IA not AI, "assistente vocale", informal "tu", no
  long dashes).

## SEO

- Each tool page: server-rendered SEO shell (unique keyword-led title/meta, H1, a "why it
  matters" section, a real FAQ) with the interactive widget as a client component inside, so
  Google indexes genuine content rather than an empty widget.
- JSON-LD per tool page: `SoftwareApplication` + `FAQPage` + `BreadcrumbList`. Hub page:
  `ItemList` + `BreadcrumbList`.
- `next-sitemap` auto-discovers the static routes (no exclusions). Nav gains a top-level
  "Tools" / "Strumenti" item.

## Architecture

- `utility/toolsData.js`: single registry holding all EN + IT copy, SEO, slugs, and helpers
  (`toolMetadata`, `hubMetadata`, `toolPath`). Pages stay thin.
- `components/tools/`: `ToolPage` (shell), `ToolsHub`, `ToolJsonLd`, `FaqAccordion` (native
  details, no client JS), `EmailCopyForm`, `ToolField`, `CopyButton`, `QrBlock`.
- `components/tools/widgets/`: the 4 interactive client components.
- `app/api/tool-capture/route.js`: GHL upsert for the optional email capture.
- New dependency: `qrcode.react` (client-side QR, no external API).

## Build and rollout

Built on the `feature/tools-hub` branch off `main`. Vercel preview for review, merge on
approval. Touches only new `/tools` files + nav + pathnames + middleware, so no overlap with
the blog / `seo-content` surface. Zero budget: all tools run in the browser; only the optional
email capture calls GHL (already wired for the Opportunity Finder).
