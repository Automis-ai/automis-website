import { notFound } from "next/navigation";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import CategoryBody from "@/components/v2/systems/CategoryBody";
import { categoryMetadata } from "@/components/v2/systems/meta";
import { CATEGORY_SLUGS, isCategory } from "@/components/v2/systems/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export function generateMetadata({ params }) {
  return isCategory(params.category) ? categoryMetadata("en", params.category) : {};
}

export default function SystemsCategoryPage({ params }) {
  if (!isCategory(params.category)) notFound();
  return (
    <AutomisEnShell>
      <CategoryBody locale="en" slug={params.category} />
    </AutomisEnShell>
  );
}
