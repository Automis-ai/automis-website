"use client";
// Porta la regione (decisa lato server) ai componenti client della lander /en.
import { createContext, useContext } from "react";

const RegionContext = createContext("eu");

export function RegionProvider({ region, children }) {
  return <RegionContext.Provider value={region}>{children}</RegionContext.Provider>;
}

export const useRegion = () => useContext(RegionContext);

// "€15,000–€35,000" -> "$15,000–$35,000" (stessi numeri, solo la valuta)
export const money = (text, region) => (region === "us" ? text.replace(/€/g, "$") : text);
