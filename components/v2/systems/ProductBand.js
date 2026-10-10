import "@/components/v2/ui/v2.css";
import "./systems.css";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Button from "@/components/v2/ui/Button";
import NightReport from "@/components/v2/ecommerce/NightReport";

/*
  Fascia del prodotto dentro una categoria (oggi: AI E-commerce Manager nei Sistemi di Marketing).
  A sinistra titolo, una riga e il bottone verso la pagina del prodotto; a destra l'esempio «una notte nel
  negozio» in versione corta (solo area e stato, senza il testo di ogni riga).
*/
export default function ProductBand({ title, line, cta, href, report }) {
  return (
    <div className="v2sx-split v2sx-split--product">
      <div>
        <SectionHeader title={title} lead={line} />
        <div className="v2sx-product__cta">
          <Button href={href}>{cta}</Button>
        </div>
      </div>
      <div className="v2sx-split__demo">
        <NightReport
          title={report.title}
          caption={report.caption}
          ariaLabel={report.title}
          rows={report.rows.map((r) => ({ icon: r.icon, area: r.area, state: r.state, tone: r.tone }))}
        />
      </div>
    </div>
  );
}
