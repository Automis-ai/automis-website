import HomePage from "@/components/home/HomePage";
import home from "@/content/home.en";

export const metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  openGraph: {
    title: home.meta.title,
    description: home.meta.description,
  },
};

export default function Page() {
  return <HomePage />;
}
