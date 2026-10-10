"use client";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    // Con "riduci animazioni" il preloader non compare; altrimenti dura 0,3 s (prima 1 s, copriva la prima schermata).
    const reduce =
      typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setLoad(false), reduce ? 0 : 300);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="preloader" style={{ display: load ? "flex" : "none" }}>
      <div className="custom-loader" />
    </div>
  );
};
export default Preloader;
