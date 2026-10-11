import PageHero from "@/components/v2/ui/PageHero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CategoryGrid from "@/components/v2/ui/CategoryGrid";
import CategoryCard from "@/components/v2/ui/CategoryCard";
import CardGrid from "@/components/v2/ui/CardGrid";
import CtaBand from "@/components/v2/ui/CtaBand";
import { pageClass } from "@/components/v2/ui/toneClass";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import { NetGrid, NetCell } from "@/components/v2/wow/fx/NetGrid";
import ProductCard from "./ProductCard";
import { heroTitle } from "./heroTitle";
import { CATEGORY_SLUGS } from "./data";

const PRODUCT_ICONS = { voice: "voice", ecommerce: "cart" };

/* /systems: le cinque categorie, poi i due prodotti (Voice AI e AI E-commerce Manager). `tono`: ?tono= della preview. */
export default function HubBody({ locale, tono }) {
  const t = getCopy("systems", locale).hub;
  const common = getCopy("common", locale);
  const L = locale;
  const items = t.categories.items.filter((c) => CATEGORY_SLUGS.includes(c.slug));

  return (
    <main id="main" className={pageClass(tono)}>
      <SmoothScroll />
      <PageStory />
      <PageHero
        size="compact"
        eyebrow={t.hero.eyebrow}
        {...heroTitle(t.hero.title, t.hero.highlight)}
        subtitle={t.hero.lead}
        primaryCta={{ label: common.cta, href: addLangPrefix("/contact", L) }}
      />
      <Section tone="light" pad="md" aria-labelledby="sx-areas">
        <h2 id="sx-areas" className="v2-sr">
          {common.nav.allSystems}
        </h2>
        {/* i cinque moduli si ricompongono nelle cinque schede (fx/stages/net.js, mode assemble) */}
        <NetGrid mode="assemble">
          <CategoryGrid fx="own" className="v2fx-netgrid">
            {items.map((c) => (
              <NetCell key={c.slug}>
                <CategoryCard
                  title={c.title}
                  line={c.line}
                  icon={c.slug}
                  cta={common.ui.learnMore}
                  href={addLangPrefix(`/systems/${c.slug}`, L)}
                />
              </NetCell>
            ))}
          </CategoryGrid>
        </NetGrid>
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
        tone="dark"
        title={t.cta.title}
        line={t.cta.line}
        button={{ label: common.cta, href: addLangPrefix("/contact", L) }}
      />
    </main>
  );
}
