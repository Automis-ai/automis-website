import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";

export const metadata = {
  title: "Cookie Policy | Automis",
  description:
    "Que cookies o automis.ai usa, para que servem, quanto duram e como alterar ou retirar o consentimento a qualquer momento.",
  alternates: {
    canonical: "https://automis.ai/pt/cookie-policy",
    languages: {
      en: "https://automis.ai/cookie-policy",
      "it-IT": "https://automis.ai/it/cookie-policy",
      "pt-PT": "https://automis.ai/pt/cookie-policy",
      "x-default": "https://automis.ai/cookie-policy",
    },
  },
  openGraph: {
    title: "Cookie Policy | Automis",
    description: "Que cookies o automis.ai usa, para que servem e como alterar ou retirar o consentimento.",
    url: "https://automis.ai/pt/cookie-policy",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
};

const LAST_UPDATED = "9 de julho de 2026";

const CATS = {
  necessary: {
    name: "Estritamente necessários",
    body: "Necessários ao funcionamento do site e do banner de cookies. Sempre ativos, não requerem consentimento.",
  },
  statistics: {
    name: "Estatísticos",
    body: "Ajudam-nos a perceber, de forma agregada, como os visitantes usam o site, para o melhorar. Instalados apenas com o seu consentimento.",
  },
  marketing: {
    name: "Marketing",
    body: "Servem para medir as nossas campanhas e mostrar-lhe conteúdos relevantes. Instalados apenas com o seu consentimento.",
  },
};

// Observados no automis.ai. category: necessary | statistics | marketing
const COOKIES = [
  { name: "cookieyes-consent", provider: "CookieYes", duration: "1 ano", category: "necessary" },
  { name: "_ga", provider: "Google Analytics 4", duration: "13 meses", category: "statistics" },
  { name: "_ga_14M9EVJL3N", provider: "Google Analytics 4", duration: "13 meses", category: "statistics" },
  { name: "_clck", provider: "Microsoft Clarity", duration: "1 ano", category: "statistics" },
  { name: "_clsk", provider: "Microsoft Clarity", duration: "1 dia", category: "statistics" },
  { name: "_fbp", provider: "Meta (Facebook)", duration: "90 dias", category: "marketing" },
];

// Reabre as preferencias de cookies (o nosso banner ouve este evento; fallback: CookieYes).
// Inline para manter a pagina como server component e poder exportar metadata.
const OPEN_PREFS_SCRIPT = `
(function(){
  var btn = document.getElementById('manage-cookies-pt');
  if(!btn) return;
  btn.addEventListener('click', function(){
    try { window.dispatchEvent(new CustomEvent('automis:open-cookie-preferences')); } catch(e){}
    if (typeof window.revisitCkyConsent === 'function') { window.revisitCkyConsent(); return; }
    var sels = ["[data-cky-tag='revisit-consent']", ".cky-btn-revisit", ".cky-btn-revisit-wrapper button"];
    for (var i=0;i<sels.length;i++){ var el=document.querySelector(sels[i]); if(el){ el.click(); return; } }
  });
})();
`;

export default function CookiePolicyPT() {
  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">Cookie Policy</h1>
              <p className="sub-heading text-white/90 mb-2">Automis, Agência de automação IA</p>
              <p className="body-text text-white/70">Última atualização: {LAST_UPDATED}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="body-text text-white/80 mb-12">
                Esta página explica que cookies e tecnologias semelhantes o automis.ai usa, para que servem, quanto duram e como pode alterar ou retirar a sua escolha a qualquer momento.
              </p>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">1. O que são cookies</h2>
                <p className="body-text text-white/70">
                  Os cookies são pequenos ficheiros de texto que um site guarda no seu dispositivo. Alguns são necessários ao funcionamento do site. Outros permitem-nos perceber como é usado, ou medir as nossas campanhas publicitárias. Os não essenciais só os instalamos depois do seu consentimento.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">2. As categorias que usamos</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {["necessary", "statistics", "marketing"].map((key) => (
                    <div key={key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <h3 className="text-white font-semibold mb-2">{CATS[key].name}</h3>
                      <p className="text-white/60 text-[14px] leading-relaxed">{CATS[key].body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">3. Cookies utilizados neste site</h2>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-[14px]">
                    <thead className="bg-white/[0.05] text-white/80">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Cookie</th>
                        <th className="px-4 py-3 font-semibold">Fornecedor</th>
                        <th className="px-4 py-3 font-semibold">Duração</th>
                        <th className="px-4 py-3 font-semibold">Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COOKIES.map((c) => (
                        <tr key={c.name} className="border-t border-white/[0.07] text-white/65">
                          <td className="px-4 py-3 font-mono text-white/85">{c.name}</td>
                          <td className="px-4 py-3">{c.provider}</td>
                          <td className="px-4 py-3">{c.duration}</td>
                          <td className="px-4 py-3">{CATS[c.category].name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">4. Terceiros e transferências internacionais</h2>
                <p className="body-text text-white/70">
                  Os cookies estatísticos e de marketing são definidos por terceiros que atuam para finalidades próprias como responsáveis autónomos ou subcontratantes: Google (Google Analytics 4), Microsoft (Clarity) e Meta. Estes fornecedores podem transferir dados para fora do Espaço Económico Europeu, incluindo os Estados Unidos, com base no Data Privacy Framework UE-EUA ou em Cláusulas Contratuais-Tipo. Em algumas páginas integramos ainda serviços de marcação (LeadConnector) e de assistente de voz (ElevenLabs).
                </p>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">5. Alterar ou retirar o consentimento</h2>
                <p className="body-text text-white/70 mb-5">
                  Pode reabrir as preferências de cookies quando quiser e alterar ou retirar a sua escolha. Retirar o consentimento é tão simples quanto dá-lo. Pode também eliminar os cookies nas definições do seu browser.
                </p>
                <button
                  type="button"
                  id="manage-cookies-pt"
                  className="inline-flex rounded-xl border border-white/20 bg-white/[0.05] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.1]"
                >
                  Gerir as preferências de cookies
                </button>
              </div>

              <div className="mb-12">
                <h2 className="sub-heading text-white mb-4">6. Contactos</h2>
                <p className="body-text text-white/70">
                  Para qualquer questão sobre esta política ou sobre como tratamos os seus dados, escreva para{" "}
                  <a href="mailto:info@automis.ai" className="text-[#57C7E3] underline">
                    info@automis.ai
                  </a>
                  .
                </p>
                <p className="body-text mt-3">
                  <Link href="/pt/privacy-policy" className="text-[#57C7E3] underline">
                    Consulte também a nossa Política de Privacidade
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script dangerouslySetInnerHTML={{ __html: OPEN_PREFS_SCRIPT }} />
    </AkpagerLayout>
  );
}
