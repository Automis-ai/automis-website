"use client";

import { useReducedMotion } from "framer-motion";

/* Mini system map: the core with three orbiting pillar clusters.
   The cluster matching `activeIndex` illuminates; the others dim.
   Pillar 02 (index 1, the flagship) carries the only gold. */

const W = 420;
const H = 420;
const CORE = { x: 210, y: 218, r: 34 };
const CLUSTERS = [
  { x: 210, y: 66 }, // 01 Marketing (top)
  { x: 76, y: 330 }, // 02 Sales (bottom left)
  { x: 344, y: 330 }, // 03 Admin (bottom right)
];
/* Satellites around each pillar node */
const SATS = [
  [
    { dx: -46, dy: -6 },
    { dx: 44, dy: -14 },
  ],
  [
    { dx: -30, dy: 42 },
    { dx: 46, dy: 24 },
  ],
  [
    { dx: 30, dy: 42 },
    { dx: -46, dy: 24 },
  ],
];

export default function PillarMap({ items, activeIndex }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full max-w-md"
      role="img"
      aria-label="Map of the Automis system: one core connected to the Marketing, Sales, and Admin pillars"
    >
      <defs>
        <radialGradient id="hx3-map-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3C91E6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3C91E6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Wires core -> clusters */}
      {CLUSTERS.map((cl, i) => {
        const active = activeIndex === i;
        return (
          <g key={`wire-${i}`} style={{ opacity: active ? 1 : 0.3, transition: "opacity 0.5s ease" }}>
            <line
              x1={CORE.x}
              y1={CORE.y}
              x2={cl.x}
              y2={cl.y}
              stroke="rgba(180,194,255,0.14)"
              strokeWidth="1.2"
            />
            {active && !reduce && (
              <line
                className="hx-wire"
                x1={CORE.x}
                y1={CORE.y}
                x2={cl.x}
                y2={cl.y}
                stroke={i === 1 ? "rgba(254,196,88,0.5)" : "rgba(60,145,230,0.5)"}
                strokeWidth="1.2"
              />
            )}
          </g>
        );
      })}

      {/* Core */}
      <circle cx={CORE.x} cy={CORE.y} r={CORE.r + 22} fill="url(#hx3-map-glow)" />
      <g className={reduce ? "" : "hx-spin"} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={CORE.r}
          fill="none"
          stroke="rgba(180,194,255,0.3)"
          strokeWidth="1.2"
          strokeDasharray="3 8"
        />
      </g>
      <circle cx={CORE.x} cy={CORE.y} r={24} fill="rgba(60,145,230,0.15)" stroke="rgba(111,177,240,0.5)" strokeWidth="1" />
      <text x={CORE.x} y={CORE.y + 3.5} textAnchor="middle" className="font-mono" fontSize="9.5" letterSpacing="0.14em" fill="rgba(255,255,255,0.9)">
        CORE
      </text>

      {/* Pillar clusters */}
      {CLUSTERS.map((cl, i) => {
        const active = activeIndex === i;
        const flagship = i === 1;
        const ring = flagship ? "rgba(254,196,88,0.75)" : "rgba(111,177,240,0.65)";
        const dim = "rgba(180,194,255,0.25)";
        const labelParts = (items[i]?.name || "").split(" & ");
        return (
          <g key={`cl-${i}`} style={{ opacity: active ? 1 : 0.42, transition: "opacity 0.5s ease" }}>
            {SATS[i].map((s, j) => (
              <g key={j}>
                <line
                  x1={cl.x}
                  y1={cl.y}
                  x2={cl.x + s.dx}
                  y2={cl.y + s.dy}
                  stroke="rgba(180,194,255,0.12)"
                  strokeWidth="1"
                />
                <circle cx={cl.x + s.dx} cy={cl.y + s.dy} r="3.5" fill={active ? ring : dim} style={{ transition: "fill 0.5s ease" }} />
              </g>
            ))}
            <circle
              cx={cl.x}
              cy={cl.y}
              r="17"
              fill={active ? (flagship ? "rgba(254,196,88,0.12)" : "rgba(60,145,230,0.16)") : "rgba(255,255,255,0.03)"}
              stroke={active ? ring : "rgba(180,194,255,0.22)"}
              strokeWidth="1.2"
              style={{ transition: "fill 0.5s ease, stroke 0.5s ease" }}
            />
            <text
              x={cl.x}
              y={cl.y + 3.5}
              textAnchor="middle"
              className="font-mono"
              fontSize="9.5"
              letterSpacing="0.1em"
              fill={active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"}
            >
              0{i + 1}
            </text>
            {/* Label placed away from the core */}
            {labelParts.map((part, j) => (
              <text
                key={part}
                x={cl.x}
                y={cl.y + (i === 0 ? -34 - (labelParts.length - 1 - j) * 12 : 40 + j * 12)}
                textAnchor="middle"
                className="font-mono"
                fontSize="9"
                letterSpacing="0.12em"
                fill={active ? (flagship ? "rgba(254,196,88,0.9)" : "rgba(111,177,240,0.9)") : "rgba(255,255,255,0.4)"}
              >
                {part.toUpperCase()}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
