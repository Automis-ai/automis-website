"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import EventTicker from "./EventTicker";

/* ── Geometry (SVG user units) ─────────────────────────────── */
const W = 560;
const H = 470;
const CHIP_W = 152;
const CHIP_H = 42;
const ROW_YS = [82, 235, 388];
const CORE = { x: 280, y: 235, r: 58 };

const wireIn = (y) =>
  `M ${10 + CHIP_W} ${y} C ${10 + CHIP_W + 48} ${y}, ${CORE.x - 104} ${CORE.y}, ${CORE.x - CORE.r - 6} ${CORE.y}`;
const wireOut = (y) =>
  `M ${CORE.x + CORE.r + 6} ${CORE.y} C ${CORE.x + 104} ${CORE.y}, ${W - CHIP_W - 10 - 48} ${y}, ${W - CHIP_W - 10} ${y}`;

/* One rounded node chip. side: "in" | "out". */
function NodeChip({ label, y, side, state }) {
  const x = side === "in" ? 10 : W - CHIP_W - 10;
  return (
    <g className="hx3-node" data-state={state}>
      <rect
        x={x}
        y={y - CHIP_H / 2}
        width={CHIP_W}
        height={CHIP_H}
        rx={12}
        fill={state === "active" ? "rgba(60,145,230,0.14)" : "rgba(255,255,255,0.03)"}
        stroke={state === "active" ? "rgba(111,177,240,0.7)" : "rgba(180,194,255,0.16)"}
        strokeWidth="1"
      />
      <circle
        cx={x + 18}
        cy={y}
        r={3}
        fill={state === "active" ? "#6FB1F0" : "rgba(180,194,255,0.35)"}
      />
      <text
        x={x + 32}
        y={y + 3.5}
        className="font-mono"
        fontSize="10"
        letterSpacing="0.05em"
        fill={state === "active" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)"}
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/* Fires a packet (glowing dot) along a wire, then hides it. */
function usePacketGuns() {
  const circles = useRef({});
  const anims = useRef({});
  const fire = (key) => {
    const c = circles.current[key];
    const a = anims.current[key];
    if (!c || !a || typeof a.beginElement !== "function") return;
    c.setAttribute("opacity", "1");
    try {
      a.beginElement();
    } catch {
      /* SMIL unavailable: packet stays hidden, diagram still reads */
    }
    setTimeout(() => c.setAttribute("opacity", "0"), 950);
  };
  return { circles, anims, fire };
}

/* The choreographed lifecycle: input lights -> packet -> core pulse ->
   packet -> outcome lights -> ticker lines. ~5s per scenario. */
function useSystemLoop({ scenarios, active, onFireIn, onFireOut }) {
  const [activeInput, setActiveInput] = useState(null);
  const [activeOutput, setActiveOutput] = useState(null);
  const [corePulse, setCorePulse] = useState(false);
  const [events, setEvents] = useState([]);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timers = [];
    const later = (fn, ms) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms)
      );
    };
    const push = (text) =>
      setEvents((prev) =>
        [{ id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`, text, at: Date.now() }, ...prev].slice(0, 4)
      );

    const run = () => {
      const sc = scenarios[idxRef.current % scenarios.length];
      idxRef.current += 1;
      setActiveInput(sc.input);
      later(() => onFireIn(sc.input), 350);
      later(() => {
        setCorePulse(true);
        push(sc.events[0]);
      }, 1250);
      later(() => setCorePulse(false), 1800);
      later(() => onFireOut(sc.output), 1500);
      later(() => {
        setActiveOutput(sc.output);
        push(sc.events[1]);
      }, 2450);
      later(() => {
        setActiveInput(null);
        setActiveOutput(null);
      }, 4300);
      later(run, 5100);
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return { activeInput, activeOutput, corePulse, events };
}

export default function SystemDiagram({ diagram }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { circles, anims, fire } = usePacketGuns();

  /* Run only when the panel is on screen, on desktop, motion allowed. */
  useEffect(() => {
    const el = panelRef.current;
    if (!el || reduce) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let inView = false;
    const update = () => setVisible(inView && mq.matches);
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        update();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    mq.addEventListener("change", update);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", update);
    };
  }, [reduce]);

  const live = visible && !reduce;
  const { activeInput, activeOutput, corePulse, events } = useSystemLoop({
    scenarios: diagram.scenarios,
    active: live,
    onFireIn: (i) => fire(`in-${i}`),
    onFireOut: (i) => fire(`out-${i}`),
  });

  /* Static fallback: everything gently lit, ticker shows finished events. */
  const staticEvents = diagram.scenarios.slice(0, 3).map((sc, i) => ({ id: `s-${i}`, text: sc.events[1] }));
  const nodeState = (idx, activeIdx) => (!live ? "done" : activeIdx === idx ? "active" : undefined);

  return (
    <div
      ref={panelRef}
      className="av-gradient-border relative rounded-3xl bg-white/[0.02] p-4 backdrop-blur-[2px] sm:p-5"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="Diagram of an Automis system routing calls, messages, and form leads into booked appointments, qualified leads, and follow-ups">
        <defs>
          <radialGradient id="hx3-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3C91E6" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#3C91E6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3C91E6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Wires */}
        {ROW_YS.map((y, i) => (
          <g key={`w-${i}`}>
            <path d={wireIn(y)} fill="none" stroke="rgba(180,194,255,0.1)" strokeWidth="1.2" />
            <path d={wireOut(y)} fill="none" stroke="rgba(180,194,255,0.1)" strokeWidth="1.2" />
            {live && (
              <>
                <path className="hx-wire" d={wireIn(y)} fill="none" stroke="rgba(60,145,230,0.35)" strokeWidth="1.2" />
                <path className="hx-wire" d={wireOut(y)} fill="none" stroke="rgba(60,145,230,0.35)" strokeWidth="1.2" />
              </>
            )}
          </g>
        ))}

        {/* Packets (SMIL animateMotion, triggered by the scheduler) */}
        {ROW_YS.map((y, i) => (
          <g key={`p-${i}`}>
            <circle
              ref={(el) => (circles.current[`in-${i}`] = el)}
              r="4"
              opacity="0"
              fill="#6FB1F0"
              className="hx3-packet"
            >
              <animateMotion
                ref={(el) => (anims.current[`in-${i}`] = el)}
                dur="0.9s"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.4 0 0.2 1"
                path={wireIn(y)}
              />
            </circle>
            <circle
              ref={(el) => (circles.current[`out-${i}`] = el)}
              r="4"
              opacity="0"
              fill="#6FB1F0"
              className="hx3-packet"
            >
              <animateMotion
                ref={(el) => (anims.current[`out-${i}`] = el)}
                dur="0.9s"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.4 0 0.2 1"
                path={wireOut(y)}
              />
            </circle>
          </g>
        ))}

        {/* Core */}
        <g>
          <circle cx={CORE.x} cy={CORE.y} r={CORE.r + 26} fill="url(#hx3-core-glow)" opacity={live ? 0.9 : 0.6} />
          <g
            className={live ? "hx-spin" : ""}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle
              cx={CORE.x}
              cy={CORE.y}
              r={CORE.r}
              fill="none"
              stroke="rgba(180,194,255,0.28)"
              strokeWidth="1.2"
              strokeDasharray="3 9"
            />
          </g>
          {/* Pulse ring on packet arrival */}
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={CORE.r - 8}
            fill="none"
            stroke="#6FB1F0"
            strokeWidth="1.5"
            opacity={corePulse ? 0.85 : 0}
            style={{ transition: "opacity 0.3s ease" }}
          />
          <circle className={live ? "hx3-core" : ""} cx={CORE.x} cy={CORE.y} r={40} fill="rgba(60,145,230,0.14)" stroke="rgba(111,177,240,0.5)" strokeWidth="1" />
          <text x={CORE.x} y={CORE.y - 3} textAnchor="middle" className="font-mono" fontSize="10.5" letterSpacing="0.14em" fill="rgba(255,255,255,0.92)">
            {diagram.coreLabel.split(" ")[0].toUpperCase()}
          </text>
          <text x={CORE.x} y={CORE.y + 12} textAnchor="middle" className="font-mono" fontSize="10.5" letterSpacing="0.14em" fill="rgba(180,194,255,0.75)">
            {diagram.coreLabel.split(" ").slice(1).join(" ").toUpperCase()}
          </text>
        </g>

        {/* Nodes */}
        {diagram.inputs.map((label, i) => (
          <NodeChip key={label} label={label} y={ROW_YS[i]} side="in" state={nodeState(i, activeInput)} />
        ))}
        {diagram.outputs.map((label, i) => (
          <NodeChip key={label} label={label} y={ROW_YS[i]} side="out" state={nodeState(i, activeOutput)} />
        ))}
      </svg>

      <EventTicker
        className="mt-3"
        events={live && events.length ? events : staticEvents}
        note={diagram.note}
      />
    </div>
  );
}
