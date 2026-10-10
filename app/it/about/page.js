import AutomisEnShell from "@/components/site/AutomisEnShell";
import AboutView from "@/components/v2/about/AboutView";
import { getCopy } from "@/components/v2/copy/getCopy";
import { buildMetadata } from "@/lib/v2/meta";

const LANG = "it";
const copy = getCopy("about", LANG);

export const metadata = buildMetadata({
  path: "/about",
  lang: LANG,
  title: copy.meta.title,
  description: copy.meta.description,
});

export default function AboutPage() {
  return (
    <AutomisEnShell>
      <AboutView lang={LANG} />
    </AutomisEnShell>
  );
}
