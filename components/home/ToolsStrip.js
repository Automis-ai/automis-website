"use client";
import { TOOL_ICONS } from "./toolIcons";

function Mark({ item }) {
  return (
    <span className="tools-mark inline-flex items-center gap-2.5" title={item.name}>
      <svg viewBox={item.viewBox} className="h-6 w-6 flex-shrink-0" fill="currentColor" aria-hidden="true">
        <path d={item.path} />
      </svg>
      <span className="text-[15px] font-medium tracking-tight">{item.name}</span>
    </span>
  );
}

// GoHighLevel has no clean single-color mark in the set, shown as a matching wordmark.
function GHLMark() {
  return (
    <span className="tools-mark inline-flex items-center gap-2.5" title="GoHighLevel">
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[6px] border border-current text-[11px] font-bold">
        GHL
      </span>
      <span className="text-[15px] font-medium tracking-tight">GoHighLevel</span>
    </span>
  );
}

export default function ToolsStrip() {
  const items = [
    ...TOOL_ICONS.slice(0, 4).map((it) => <Mark key={it.name} item={it} />),
    <GHLMark key="ghl" />,
    ...TOOL_ICONS.slice(4).map((it) => <Mark key={it.name} item={it} />),
  ];
  // duplicate the set for a seamless loop
  const loop = [...items, ...items.map((el, i) => ({ ...el, key: `dup-${i}` }))];

  return (
    <div className="relative">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
        Connects to the tools you already run
      </p>
      <div className="tools-marquee-mask relative mt-6 overflow-hidden">
        <div className="tools-marquee flex w-max items-center gap-10">
          {loop.map((el, i) => (
            <div key={i} className="shrink-0">
              {el}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-center text-[13px] font-medium italic text-white/55">
        If it has an API, we connect to it.
      </p>

      <style jsx global>{`
        .tools-mark {
          color: rgba(255, 255, 255, 0.62);
          transition: color 0.3s ease;
        }
        .tools-mark:hover {
          color: rgba(255, 255, 255, 0.9);
        }
        .tools-marquee-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .tools-marquee {
          animation: toolsScroll 34s linear infinite;
        }
        .tools-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes toolsScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tools-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
