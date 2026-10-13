import "../ui/v2.css";
import "./ecommerce.css";
import Disclosure from "../ui/Disclosure";
import Button from "../ui/Button";

/*
  Sotto le schede piattaforma: cosa seguiamo, a richiesta (una Disclosure per piattaforma).
  items: [{ name, tagline, modules: [{ title, line }], cta, href }]; `summarySuffix` completa il titolo
  («Shopify: cosa seguiamo»). `hrefLang` segnala la lingua della pagina di destinazione (le landing sono in italiano).
*/
export default function PlatformModules({ items = [], summarySuffix, hrefLang }) {
  return (
    <div className="v2e-mods">
      {items.map((p) => (
        <Disclosure key={p.id} summary={`${p.name}: ${summarySuffix}`}>
          {p.tagline ? <p className="v2e-mods__tag">{p.tagline}</p> : null}
          <ul className="v2e-mods__list">
            {p.modules.map((m) => (
              <li key={m.title}>
                <b>{m.title}</b>
                {m.line}
              </li>
            ))}
          </ul>
          <Button href={p.href} variant="link" {...(hrefLang ? { lang: hrefLang } : {})}>
            {p.cta}
          </Button>
        </Disclosure>
      ))}
    </div>
  );
}
