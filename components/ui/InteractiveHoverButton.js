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
  ({ text = "Button", children, className, href, ...props }, ref) => {
    const label = children ?? text;
    const Comp = href ? "a" : "button";
    return (
      <Comp
        ref={ref}
        href={href}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-center text-base font-semibold text-white backdrop-blur-sm transition-colors",
          className
        )}
        {...props}
      >
        <span className="relative z-10 inline-block translate-x-0 transition-all duration-300 group-hover:translate-x-40 group-hover:opacity-0">
          {label}
        </span>
        <div className="absolute top-0 z-20 flex h-full w-full -translate-x-40 items-center justify-center gap-2 text-[#00121f] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span>{label}</span>
          <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </div>
        <div className="absolute left-[16%] top-[40%] z-0 h-2 w-2 scale-100 rounded-full bg-[#3C91E6] transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-100 group-hover:rounded-none" />
      </Comp>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
export default InteractiveHoverButton;
