"use client";
// Porta la regione (decisa lato server) ai componenti client della lander /en.
import { createContext, useContext } from "react";

const RegionContext = createContext("eu");

export function RegionProvider({ region, children }) {
  return <RegionContext.Provider value={region}>{children}</RegionContext.Provider>;
}

export const useRegion = () => useContext(RegionContext);

// Valore per regione: { eu: "€…", us: "$…" } sceglie quello giusto; una stringa semplice
// ("€15,000") per gli US cambia solo il simbolo (stessi numeri).
export const money = (text, region) => {
  if (text && typeof text === "object") return text[region] || text.eu;
  return region === "us" ? text.replace(/€/g, "$") : text;
};
