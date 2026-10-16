import { notFound } from "next/navigation";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import CompanyBrainPage from "@/components/home-v3/CompanyBrainPage";
import { getCB } from "@/components/home-v3/companyBrainCopy";
import { buildMetadata } from "@/lib/v2/meta";
import CategoryBody from "@/components/v2/systems/CategoryBody";
import { categoryMetadata } from "@/components/v2/systems/meta";
import { CATEGORY_SLUGS, isCategory } from "@/components/v2/systems/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export function generateMetadata({ params }) {
  if (params.category === "company-brain") {
    const { meta } = getCB("pt").head;
    return buildMetadata({ path: "/systems/company-brain", lang: "pt", title: meta.title, description: meta.description });
  }
  return isCategory(params.category) ? categoryMetadata("pt", params.category) : {};
}

export default function SystemsCategoryPage({ params, searchParams }) {
  if (!isCategory(params.category)) notFound();
  // Company Brain è un prodotto con pagina propria (come in IT): stessa rotta, corpo diverso.
  if (params.category === "company-brain") {
    return (
      <AutomisEnShell>
        <CompanyBrainPage locale="pt" tono={searchParams?.tono} />
      </AutomisEnShell>
    );
  }
  return (
    <AutomisEnShell>
      <CategoryBody locale="pt" slug={params.category} tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
