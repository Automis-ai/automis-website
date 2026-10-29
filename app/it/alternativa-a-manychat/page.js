import Landing from "@/components/guides/Landing";

// Pagina pubblica (indicizzabile): presenta la guida e raccoglie l'email.
// La guida vera sta in /guida e si apre solo con il cookie rilasciato dopo la verifica dell'email.
export default function AlternativaAManyChat({ searchParams }) {
  return <Landing lang="it" expired={searchParams?.expired === "1"} />;
}
