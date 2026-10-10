import HomePage from "@/components/v2/home/HomePage";
import { getCopy } from "@/components/v2/copy/getCopy";
import { buildMetadata } from "@/lib/v2/meta";

const { meta } = getCopy("home", "en");

export const metadata = buildMetadata({
  path: "/",
  lang: "en",
  title: meta.title,
  description: meta.description,
});

export default function Home() {
  return <HomePage lang="en" />;
}
