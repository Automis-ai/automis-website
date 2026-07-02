"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Animated dotted wave surface (Three.js).
 * Adapted for this codebase: plain JS, no next-themes (site is always dark),
 * brand-blue dots, sized to its container, and paused under reduced-motion.
 */
export function DottedSurface({ className = "", ...props }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const size = () => ({
      w: container.clientWidth || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    });

    const scene = new THREE.Scene();
    // Distant dots fade into the page background instead of white.
    scene.fog = new THREE.Fog(0x000a14, 2000, 10000);

    const { w, h } = size();
    const camera = new THREE.PerspectiveCamera(60, w / h, 1, 10000);
    // Higher, slightly closer vantage so the field spreads across the frame and
    // sits balanced behind the centered headline (rather than clumping low).
    camera.position.set(0, 480, 1000);
    camera.lookAt(0, -60, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();
    // Depth gradient across the two brand blues: bright-blue near -> soft-blue far.
    const near = new THREE.Color("#3C91E6"); // bright-blue
    const far = new THREE.Color("#B4C2FF"); // soft-blue
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, 0, z);
        const c = near.clone().lerp(far, iy / AMOUNTY);
        colors.push(c.r, c.g, c.b);
      }
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId;

    const renderWave = () => {
      const positionAttribute = geometry.attributes.position;
      const arr = positionAttribute.array;
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          arr[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderWave();
      count += 0.1;
    };

    if (prefersReduced) {
      renderWave(); // one static frame
    } else {
      animate();
    }

    const handleResize = () => {
      const { w: nw, h: nh } = size();
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    sceneRef.current = { scene, renderer, geometry, material, animationId };

    return () => {
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      {...props}
    />
  );
}

export default DottedSurface;
