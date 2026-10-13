import "@/components/v2/ui/v2.css";
import "./systems.css";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Faq from "@/components/v2/ui/Faq";

/*
  Fascia delle domande frequenti, con il JSON-LD FAQPage. Larga come il resto della pagina: il titolo a sinistra,
  le domande a destra (sotto i 1024 px una sopra l'altra). `items`: [{ q, a }] (stesso formato dei file in copy).
*/
export default function FaqSection({ title, items = [], tone = "deep", id }) {
  if (!items.length) return null;
  return (
    <Section tone={tone} id={id}>
      <div className="v2sx-aside">
        <SectionHeader title={title} className="v2sx-aside__head" />
        <Faq jsonLd items={items.map((it) => ({ question: it.q, answer: it.a }))} />
      </div>
    </Section>
  );
}
