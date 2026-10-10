import Hero from "@/components/v2/ui/Hero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CategoryGrid from "@/components/v2/ui/CategoryGrid";
import CategoryCard from "@/components/v2/ui/CategoryCard";
import CardGrid from "@/components/v2/ui/CardGrid";
import CtaBand from "@/components/v2/ui/CtaBand";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import Highlighted from "./Highlighted";
import CategoryArt from "./CategoryArt";
import ProductCard from "./ProductCard";
import { CATEGORY_SLUGS } from "./data";

const PRODUCT_ICONS = { voice: "voice", ecommerce: "cart" };

/* /systems: le cinque categorie, poi i due prodotti (Voice AI e AI E-commerce Manager). */
export default function HubBody({ locale }) {
  const t = getCopy("systems", locale).hub;
  const common = getCopy("common", locale);
  const L = locale;
  const items = t.categories.items.filter((c) => CATEGORY_SLUGS.includes(c.slug));

  return (
    <>
      <Hero
        eyebrow={t.hero.eyebrow}
        title={<Highlighted text={t.hero.title} highlight={t.hero.highlight} />}
        subtitle={t.hero.lead}
        primaryCta={{ label: common.cta, href: addLangPrefix("/contact", L) }}
        media={<CategoryArt icon="spark" items={CATEGORY_SLUGS} />}
      />
      <Section tone="light" pad="md" aria-labelledby="sx-areas">
        <h2 id="sx-areas" className="v2-sr">
          {common.nav.allSystems}
        </h2>
        <CategoryGrid>
          {items.map((c) => (
            <CategoryCard
              key={c.slug}
              title={c.title}
              line={c.line}
              icon={c.slug}
              href={addLangPrefix(`/systems/${c.slug}`, L)}
            />
          ))}
        </CategoryGrid>
      </Section>
      <Section tone="deep">
        <SectionHeader title={t.products.title} />
        <CardGrid cols={2}>
          {t.products.items.map((p) => (
            <ProductCard
              key={p.id}
              icon={PRODUCT_ICONS[p.id]}
              title={p.name}
              line={p.line}
              price={p.price}
              cta={p.cta}
              href={addLangPrefix(p.href, L)}
            />
          ))}
        </CardGrid>
      </Section>
      <CtaBand
        tone="light"
        title={t.cta.title}
        line={t.cta.line}
        button={{ label: common.cta, href: addLangPrefix("/contact", L) }}
      />
    </>
  );
}
