import "./contact.css";
import Icon from "@/components/v2/ui/icons";

// Profili social per lingua: gli stessi di components/contact/ContactAside.js (non cambiano).
const SOCIALS = {
  en: [
    { name: "Instagram", href: "https://www.instagram.com/automis.ai/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/automisai" },
    { name: "Facebook", href: "https://www.facebook.com/automisai" },
    { name: "X", href: "https://x.com/AutomisAI" },
  ],
  it: [
    { name: "Instagram", href: "https://www.instagram.com/automis_italia/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/automis-italia/" },
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61575356883644" },
    { name: "X", href: "https://x.com/AutomisAI" },
  ],
  // Il portoghese non ha profili dedicati: usa quelli globali, come la pagina di oggi.
  pt: [
    { name: "Instagram", href: "https://www.instagram.com/automis.ai/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/automisai" },
    { name: "Facebook", href: "https://www.facebook.com/automisai" },
    { name: "X", href: "https://x.com/AutomisAI" },
  ],
};

const EMAIL = "info@automis.ai";

/* Scheda piccola con l'email e i social. Testi dal copy (`aside`). */
export default function ReachUs({ lang, title, emailLabel, followLabel }) {
  return (
    <aside className="v2-card v2c-reach" aria-label={title}>
      <h3 className="v2c-reach__title">{title}</h3>
      <div>
        <p className="v2c-reach__label">{emailLabel}</p>
        <a className="v2c-mail" href={`mailto:${EMAIL}`}>
          <span className="v2-tile" aria-hidden="true">
            <Icon name="inbox" size={20} />
          </span>
          {EMAIL}
        </a>
      </div>
      <div>
        <p className="v2c-reach__label">{followLabel}</p>
        <ul className="v2c-socials">
          {(SOCIALS[lang] || SOCIALS.en).map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
