import AutomisEnShell from "@/components/site/AutomisEnShell";
import ContactView from "@/components/v2/contact/ContactView";
import { getCopy } from "@/components/v2/copy/getCopy";
import { buildMetadata } from "@/lib/v2/meta";

const LANG = "it";
const copy = getCopy("contact", LANG);

export const metadata = buildMetadata({
  path: "/contact",
  lang: LANG,
  title: copy.meta.title,
  description: copy.meta.description,
});

export default function ContactPage() {
  return (
    <AutomisEnShell>
      <ContactView lang={LANG} />
    </AutomisEnShell>
  );
}
