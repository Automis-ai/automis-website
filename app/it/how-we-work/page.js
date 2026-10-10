import AutomisEnShell from "@/components/site/AutomisEnShell";
import HowWeWorkView from "@/components/v2/how-we-work/HowWeWorkView";
import { getCopy } from "@/components/v2/copy/getCopy";
import { buildMetadata } from "@/lib/v2/meta";

const LANG = "it";
const copy = getCopy("how-we-work", LANG);

export const metadata = buildMetadata({
  path: "/how-we-work",
  lang: LANG,
  title: copy.meta.title,
  description: copy.meta.description,
});

export default function HowWeWorkPage() {
  return (
    <AutomisEnShell>
      <HowWeWorkView lang={LANG} />
    </AutomisEnShell>
  );
}
