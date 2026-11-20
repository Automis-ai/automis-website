import SettorePage, { settoreMetadata } from "@/components/automations/SettorePage";

const SLUG = "intelligenza-artificiale-per-grossisti";

export const metadata = settoreMetadata(SLUG);

export default function Page() {
  return <SettorePage slug={SLUG} />;
}
