import SettorePage, { settoreMetadata } from "@/components/automations/SettorePage";

const SLUG = "intelligenza-artificiale-per-commercialisti";

export const metadata = settoreMetadata(SLUG);

export default function Page() {
  return <SettorePage slug={SLUG} />;
}
