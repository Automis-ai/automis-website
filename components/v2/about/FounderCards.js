import { Linkedin, Instagram } from "lucide-react";
import "./about.css";
import CardGrid from "@/components/v2/ui/CardGrid";
import Disclosure from "@/components/v2/ui/Disclosure";
import { nb } from "@/components/v2/ui/nb";

// Foto e profili restano nel codice, come nella pagina pubblicata (components/about/AboutFounders.js).
// Il testo (nome, ruolo, riga, dettaglio) arriva dal copy; la chiave è il nome, che non si traduce.
const PROFILES = {
  "Vincenzo Luca Casillo": {
    image: "/assets/images/headshots/luca.jpeg",
    network: "LinkedIn",
    url: "https://www.linkedin.com/in/vincenzo-luca-casillo/",
    Icon: Linkedin,
  },
  "Arcangelo Bianco": {
    image: "/assets/images/headshots/arcangelo.jpeg",
    network: "Instagram",
    url: "https://instagram.com/arcangelo.automis",
    Icon: Instagram,
  },
};

/* Due schede fondatore. `items`: [{ name, role, line, more }]. `profileLabel`: «Profilo {network} di {name}». */
export default function FounderCards({ items = [], moreLabel, profileLabel }) {
  return (
    <CardGrid as="ul" cols={2} className="v2a-list">
      {items.map((f) => {
        const profile = PROFILES[f.name];
        const label = profileLabel.replace("{network}", profile?.network ?? "").replace("{name}", f.name);
        return (
          <li className="v2-card v2a-founder" key={f.name}>
            <div className="v2a-founder__head">
              {profile ? (
                <img
                  className="v2a-founder__photo"
                  src={profile.image}
                  alt={f.name}
                  width="104"
                  height="104"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <div>
                <h3 className="v2a-founder__name">{f.name}</h3>
                <p className="v2a-founder__role">{f.role}</p>
              </div>
            </div>
            <p className="v2a-founder__line">{nb(f.line)}</p>
            <Disclosure summary={moreLabel}>
              <p>{nb(f.more)}</p>
            </Disclosure>
            {profile ? (
              <a className="v2a-social" href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <profile.Icon size={18} strokeWidth={1.9} aria-hidden="true" />
              </a>
            ) : null}
          </li>
        );
      })}
    </CardGrid>
  );
}
