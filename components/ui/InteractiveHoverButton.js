"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Interactive hover button.
  On hover the label slides out and is replaced by the same label + arrow, while
  a brand-blue dot in the corner expands to flood the whole button. Brand colors
  baked in: bright-blue fill, deep-blue text on the filled state for contrast.
  Renders as <a> when `href` is provided (so it can be a real link), else <button>.
*/
const InteractiveHoverButton = React.forwardRef(
  ({ text = "Button", children, className, href, variant = "ghost", style, ...props }, ref) => {
    const label = children ?? text;
    const Comp = href ? "a" : "button";
    const solid = variant === "solid";
    return (
      <Comp
        ref={ref}
        href={href}
        style={solid ? { background: "linear-gradient(120deg,#3C91E6 0%,#57C7E3 55%,#8FD3F4 100%)", ...style } : style}
        className={cn(
          // inline-flex (not the default inline for <a>) so overflow-hidden
          // actually clips the sliding label — inline elements ignore overflow,
          // which let long labels spill outside the button on hover.
          "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full px-6 py-3.5 text-center text-base font-semibold backdrop-blur-sm transition-[transform,box-shadow,background-color] duration-300",
          solid
            ? "border border-transparent text-[#00121f] shadow-[0_14px_36px_-10px_rgba(60,145,230,0.65)] hover:-translate-y-0.5 hover:shadow-[0_18px_46px_-10px_rgba(87,199,227,0.75)]"
            : "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.06]",
          className
        )}
        {...props}
      >
        {/* Resting label. The trailing invisible arrow reserves the exact width
            the hover state needs (label + gap + arrow), so long labels don't
            overflow/clip on hover and the label doesn't shift sideways. */}
        <span className="relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap translate-x-0 transition-all duration-300 group-hover:translate-x-40 group-hover:opacity-0">
          {label}
          <ArrowRight aria-hidden="true" className="h-4 w-4 opacity-0" strokeWidth={2.4} />
        </span>
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-20 flex -translate-x-40 items-center justify-center gap-2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
            solid ? "text-white" : "text-[#00121f]"
          )}
        >
          <span>{label}</span>
          <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </div>
        {/* seed dot: hidden at rest, expands to flood the button only on hover */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-1/2 z-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full opacity-0 transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:rounded-none group-hover:opacity-100",
            solid ? "bg-[#0a2a44]" : "bg-[#3C91E6]"
          )}
        />
      </Comp>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
export default InteractiveHoverButton;
