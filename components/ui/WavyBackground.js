"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
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

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  const waveColors =
    colors ?? ["#3C91E6", "#57C7E3", "#B4C2FF", "#0A3D62", "#FEC458"];

  useEffect(() => {
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

    let running = false;
    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      rafRef.current = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };

    if (prefersReduced) {
      // One static, fully-opaque pass so the texture is present but still.
      ctx.globalAlpha = 1;
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, sizeRef.current.w, sizeRef.current.h);
      drawWave(5);
    }

    // Animate only while the hero is on screen and the tab is visible — otherwise
    // the canvas keeps repainting for the whole 11k-px page (CPU/battery drain).
    let inView = true;
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (inView && !document.hidden) start();
          else stop();
        },
        { threshold: 0 }
      );
      io.observe(container);
    } else {
      start();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      if (io) io.disconnect();
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
        style={{ filter: `blur(${blur}px)` }}
      />
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;
