import Landing from "@/components/guides/Landing";

// Public page (indexable): presents the guide and collects the email.
// The actual guide lives in /guide and opens only with the cookie issued after the email is verified.
export default function ManyChatAlternative({ searchParams }) {
  return <Landing lang="en" expired={searchParams?.expired === "1"} />;
}
