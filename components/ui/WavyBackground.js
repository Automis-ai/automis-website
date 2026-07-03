"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

/*
  Animated wavy canvas background (simplex-noise).
  Adapted for Automis: brand palette by default, crisper waves (lower blur +
  higher fill alpha so each pass reads as a defined line, not a smear), sizes to
  its own container instead of the viewport, and stops animating for users who
  prefer reduced motion. Signature blue -> cyan -> periwinkle, with a restrained
  gold thread for warmth.
*/
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 60,
  backgroundFill = "#000A14",
  blur = 6,
  speed = "slow",
  waveOpacity = 0.55,
  amplitude = 110,
  waveCenter = 0.5,
  ...props
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const noiseRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(0);
  const ntRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const [isSafari, setIsSafari] = useState(false);

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  const waveColors =
    colors ?? ["#3C91E6", "#57C7E3", "#B4C2FF", "#0A3D62", "#FEC458"];

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    noiseRef.current = createNoise3D();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.filter = `blur(${blur}px)`;
    };

    const drawWave = (n) => {
      const { w, h } = sizeRef.current;
      const noise = noiseRef.current;
      ntRef.current += getSpeed();
      const nt = ntRef.current;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        // Gold thread stays whisper-thin so it reads as warmth, not a stripe.
        if (waveColors[i % waveColors.length] === "#FEC458") ctx.lineWidth = waveWidth * 0.4;
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * amplitude;
          ctx.lineTo(x, y + h * waveCenter);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      const { w, h } = sizeRef.current;
      ctx.filter = `blur(${blur}px)`;
      ctx.globalAlpha = waveOpacity;
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      rafRef.current = requestAnimationFrame(render);
    };

    resize();

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // One static, fully-opaque pass so the texture is present but still.
      ctx.globalAlpha = 1;
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, sizeRef.current.w, sizeRef.current.h);
      drawWave(5);
    } else {
      render();
    }

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blur, backgroundFill, waveOpacity, waveWidth, amplitude, speed, waveCenter]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center justify-center", containerClassName)}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        style={{ ...(isSafari ? { filter: `blur(${blur}px)` } : {}) }}
      />
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;
