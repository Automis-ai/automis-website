import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";

export const metadata = {
  title: "Política de Privacidade | Automis",
  description:
    "Como a Automis recolhe, utiliza, conserva e protege os dados pessoais no âmbito dos seus serviços. Conforme ao RGPD.",
  alternates: {
    canonical: "https://automis.ai/pt/privacy-policy",
    languages: {
      en: "https://automis.ai/privacy-policy",
      "it-IT": "https://automis.ai/it/privacy-policy",
      "pt-PT": "https://automis.ai/pt/privacy-policy",
      "x-default": "https://automis.ai/privacy-policy",
    },
  },
  openGraph: {
    title: "Política de Privacidade | Automis",
    description:
      "Como a Automis recolhe, utiliza, conserva e protege os dados pessoais. Conforme ao RGPD.",
    url: "https://automis.ai/pt/privacy-policy",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
};

export default function PrivacyPolicyPT() {
  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            {/* Cabeçalho */}
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">POLÍTICA DE PRIVACIDADE</h1>
              <p className="sub-heading text-white/90 mb-2">
                Automis, AI &amp; Marketing Agency
              </p>
              <p className="body-text text-white/70">
                Última atualização: 30 de março de 2026
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Secção 1 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">1.</span>
                  Introdução e Responsável pelo tratamento
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    A presente Política de Privacidade descreve como a <span className="font-bold">Automis</span> (“nós”, “nosso” ou “a Sociedade”), registada na Estónia (n.º de registo <span className="font-bold">17179196</span>), com sede em <span className="font-bold">Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span>, recolhe, utiliza, conserva e protege os dados pessoais no âmbito dos seus serviços.
                  </p>
                  <p className="body-text text-white/90 mb-4">
                    A Automis é uma AI &amp; Marketing Agency que fornece serviços de gestão de campanhas publicitárias, agentes de voz IA, automação de workflows, automação de redes sociais e consultoria. Consoante o serviço e o contexto, a Automis pode atuar como:
                  </p>
                  <ul className="body-text text-white/90 space-y-3 mb-4">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 font-semibold">•</span>
                      <span><span className="font-semibold">Responsável pelo tratamento</span>: para os dados recolhidos diretamente dos visitantes do site, dos potenciais clientes e de quem interage com as nossas plataformas (ex.: marcação de discovery call, download de auditoria, contactos).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 font-semibold">•</span>
                      <span><span className="font-semibold">Subcontratante (Data Processor)</span>: para os dados tratados por conta dos nossos Clientes na prestação dos serviços de automação (ex.: respostas a comentários/DM nas páginas Meta do Cliente, gestão de chamadas por conta do Cliente, gestão de dados de CRM do Cliente).</span>
                    </li>
                  </ul>
                  <p className="body-text text-white/90">
                    Esta política está em conformidade com o <Link href="https://gdpr-info.eu/" target="_blank" rel="noopener noreferrer">Regulamento Geral sobre a Proteção de Dados (RGPD)</Link>, com o <Link href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer">California Consumer Privacy Act (CCPA)</Link>, e com os <Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer">Meta Platform Terms</Link> e <Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer">Developer Policies</Link> aplicáveis.
                  </p>
                </div>
              </div>

              {/* Secção 2 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">2.</span>
                  Categorias de dados pessoais recolhidos
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.1 Dados recolhidos diretamente do utilizador</h3>
                    <p className="body-text text-white/90 mb-4">
                      Quando visita o nosso site, marca uma discovery call, solicita uma Jumpstart Audit ou nos contacta, podemos recolher:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Nome e apelido</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Endereço de email</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Número de telefone</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Nome da empresa, função e setor</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Informações fornecidas durante discovery calls, workshops ou pedidos de auditoria</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Dados de faturação e pagamento (geridos por prestadores de pagamento terceiros)</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.2 Dados tratados através das API Meta (por conta dos Clientes)</h3>
                    <p className="body-text text-white/90 mb-4">
                      No âmbito do <span className="font-bold">Serviço de Automação de Redes Sociais</span> (respostas automáticas a comentários e DM no Facebook e Instagram), através das API oficiais da Meta (Instagram Graph API, Facebook Pages API, Messenger API), tratamos:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Dados do perfil público:</span> username, ID Meta, nome apresentado, imagem de perfil</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Conteúdo dos comentários:</span> texto dos comentários publicados sob os posts do Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Conteúdo das mensagens diretas (DM):</span> mensagens enviadas pelos utilizadores à página/perfil do Cliente via Instagram Direct ou Facebook Messenger</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Metadados de interação:</span> timestamp, tipo de interação, ID do conteúdo</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Insights da página/perfil:</span> métricas agregadas de performance (reach, engagement) onde acessíveis via API</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.3 Dados tratados através dos serviços Voice AI (por conta dos Clientes)</h3>
                    <p className="body-text text-white/90 mb-4">
                      No âmbito do <span className="font-bold">Serviço Voice AI</span> (gestão de chamadas de entrada e de saída através de agentes de voz IA), podemos tratar:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Áudio e transcrições das chamadas:</span> gravações e/ou transcrições em tempo real das chamadas geridas pelos nossos agentes de voz IA por conta do Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Informações de quem liga:</span> número de telefone, nome (se fornecido), informações partilhadas durante a chamada (ex.: pedidos de marcação, informações sobre serviços)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Metadados da chamada:</span> duração, timestamp, resultado (marcado, transferido, atendedor de chamadas)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de scheduling:</span> detalhes da marcação, disponibilidade de calendário, confirmações de marcação</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.4 Dados tratados através de AI Automations (por conta dos Clientes)</h3>
                    <p className="body-text text-white/90 mb-4">
                      No âmbito do <span className="font-bold">Serviço de Automação IA</span> (qualificação de contactos, nurturing, sincronização de CRM, automação de workflows), podemos tratar:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados dos contactos:</span> nome, email, telefone, origem, estado de qualificação, lead score</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Registos de CRM:</span> dados de contacto, histórico de interações, fases de pipeline/deal sincronizados com o CRM do Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de comunicação:</span> conteúdo de SMS, mensagens de WhatsApp e emails automáticos enviados por conta do Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de workflow:</span> eventos de trigger, logs de automação, atribuições de tarefas</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.5 Dados tratados através da Gestão de Ads (por conta dos Clientes)</h3>
                    <p className="body-text text-white/90 mb-4">
                      No âmbito do <span className="font-bold">Serviço de Gestão de Campanhas Publicitárias</span>, podemos aceder e tratar:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de contas publicitárias:</span> métricas de performance, investimento em publicidade, insights de audiência, dados de conversão através das API de Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads e outras plataformas</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de pixel/tracking:</span> dados de comportamento dos visitantes recolhidos através de pixels publicitários configurados no site do Cliente</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de formulários de contactos:</span> informações enviadas pelos utilizadores através de formulários de lead generation nas plataformas publicitárias</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.6 Dados técnicos</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Endereço IP, tipo de browser, sistema operativo, informações do dispositivo</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Cookies e tecnologias de rastreio semelhantes (ver Secção 12)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Logs de utilização do site e dados de analytics</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Secção 3 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">3.</span>
                  Finalidades do tratamento
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">3.1 Dados recolhidos diretamente</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Prestação dos serviços solicitados (discovery calls, auditorias, consultoria)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Comunicações comerciais e de marketing (com consentimento)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Melhoria do site e dos serviços</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Cumprimento de obrigações legais e contratuais</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Prevenção de fraude e segurança</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">3.2 Dados tratados por conta dos Clientes</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Automação de redes sociais:</span> envio de respostas automáticas a comentários e DM no Facebook/Instagram via API oficiais Meta</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Voice AI:</span> gestão de chamadas de entrada/saída, marcação de consultas, qualificação de contactos, apoio a clientes através de agentes de voz IA</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Qualificação e nurturing de contactos:</span> triagem, scoring e follow-ups automáticos</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Sincronização de CRM:</span> manutenção dos dados de CRM atualizados e rigorosos entre plataformas</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Gestão de marcações:</span> marcação, confirmação, reagendamento e lembretes automáticos</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Otimização de campanhas de ads:</span> análise de performance, comportamento da audiência e dados de conversão para melhorar o ROI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Reporting:</span> geração de relatórios de performance e analytics para os Clientes</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Secção 4 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">4.</span>
                  Fundamento jurídico do tratamento (RGPD)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    O tratamento dos dados pessoais assenta nos seguintes fundamentos jurídicos nos termos do Art. 6.º do RGPD:
                  </p>
                  <ul className="body-text text-white/90 space-y-3">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Consentimento (Art. 6.º, n.º 1, al. a)):</span> para comunicações de marketing, demo calls, newsletter e material promocional. O consentimento pode ser retirado a qualquer momento.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Execução de um contrato (Art. 6.º, n.º 1, al. b)):</span> para a prestação dos serviços solicitados e o cumprimento das obrigações contratuais.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Interesse legítimo (Art. 6.º, n.º 1, al. f)):</span> para a melhoria dos serviços, a segurança dos sistemas, a prevenção de abusos e a análise de dados. Quando atuamos como Subcontratante, o interesse legítimo é do Cliente (Responsável pelo tratamento).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Obrigação legal (Art. 6.º, n.º 1, al. c)):</span> para cumprir obrigações fiscais, contabilísticas e regulamentares.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Secção 5 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">5.</span>
                  Partilha de dados e subcontratantes
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.1 Fornecedores de plataforma</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Meta Platforms, Inc.:</span> enquanto plataforma através da qual os dados de redes sociais são recolhidos e transmitidos via API. A Meta trata os dados de acordo com a sua Privacy Policy e os seus Terms of Service.</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Google</span> (Google Ads, Google Calendar): para gestão de campanhas e integrações de calendário</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">TikTok, LinkedIn, X (Twitter):</span> para gestão de campanhas nas respetivas plataformas, quando aplicável</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.2 Fornecedores de tecnologia e infraestrutura</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">n8n</span> (n8n GmbH / n8n Cloud): plataforma de workflow automation</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">ElevenLabs:</span> fornecedor de síntese de voz IA para os serviços Voice AI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">GoHighLevel / LeadConnector:</span> plataforma de CRM e marketing automation</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Vercel, GitHub, Supabase:</span> infraestrutura e hosting</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Twilio:</span> infraestrutura telefónica para Voice AI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Calendly, Cal.com, Google:</span> serviços de scheduling e marcação</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.3 Outros destinatários</h3>
                    <ul className="body-text text-white/90 space-y-2 mb-4">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Consultores profissionais</span>: contabilistas, advogados e consultores jurídicos, nos limites estritamente necessários</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Autoridades legais ou regulamentares</span>: quando exigido pela lei aplicável</span></li>
                    </ul>
                    <p className="font-bold text-white/90">
                      Não vendemos, alugamos nem cedemos dados pessoais a terceiros para finalidades de marketing direto desses terceiros.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secção 6 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">6.</span>
                  Transferência internacional de dados
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Alguns dos nossos subcontratantes (entre os quais Meta Platforms, Inc., Google LLC, ElevenLabs) têm sede nos Estados Unidos ou noutros países fora do Espaço Económico Europeu (EEE). As transferências realizam-se com base em garantias adequadas nos termos do Art. 46.º do RGPD (Standard Contractual Clauses), decisões de adequação da Comissão Europeia quando aplicáveis, ou o consentimento explícito do titular dos dados.
                  </p>
                </div>
              </div>

              {/* Secção 7 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">7.</span>
                  Conservação dos dados
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Os dados são conservados pelos seguintes períodos:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold"> Dados de contacto e comerciais </span>: durante a vigência da relação contratual e pelos 2 anos seguintes, conforme exigido pela legislação fiscal e contabilística.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados tratados via API Meta</span>: conservados pelo tempo estritamente necessário à prestação do serviço. No termo do contrato, eliminados no prazo de 60 dias, salvo obrigação legal diversa.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Gravações e transcrições Voice AI</span>: conservadas por 90 dias a contar da chamada, sendo depois eliminadas automaticamente, salvo pedido diverso do Cliente.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de contactos e CRM</span>: durante a vigência do serviço. Eliminados no prazo de 90 dias após a cessação do contrato.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de contas publicitárias</span>: os relatórios são conservados durante a vigência do serviço mais 3 meses. Os dados em bruto das plataformas não são conservados a longo prazo pela Automis.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Analytics e logs do site</span>: máximo de 12 meses.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Dados de marketing (baseados em consentimento)</span>: até à retirada do consentimento.</span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    Em conformidade com os Meta Platform Terms, no termo da utilização das API Meta ou a pedido da Meta, eliminaremos todos os Platform Data sem demora injustificada.
                  </p>
                </div>
              </div>

              {/* Secção 8 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">8.</span>
                  Direitos do titular dos dados (RGPD)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Nos termos do RGPD, tem o direito de:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Acesso:</span> obter confirmação do tratamento e uma cópia dos seus dados pessoais.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Retificação:</span> solicitar a correção de dados inexatos ou incompletos.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Apagamento:</span> solicitar o apagamento dos seus dados (“direito a ser esquecido”).</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Limitação:</span> solicitar a limitação do tratamento em determinados casos.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Portabilidade:</span> receber os seus dados num formato estruturado, de uso corrente e de leitura automática.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Oposição:</span> opor-se ao tratamento baseado em interesse legítimo.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Retirada do consentimento:</span> retirar o consentimento a qualquer momento, sem prejuízo da licitude do tratamento anterior.</span></li>
                  </ul>
                  <p className="body-text text-white/90 mb-4">
                    Para exercer os seus direitos, contacte-nos em: support@automis.ai. Responderemos no prazo de 30 dias.
                  </p>
                  <p className="body-text text-white/90">
                    Tem ainda o direito de apresentar reclamação junto da autoridade de controlo competente (<Link href="https://www.aki.ee/en" target="_blank" rel="noopener noreferrer">Estonian Data Protection Inspectorate</Link> ou a autoridade do seu país de residência; em Portugal, a CNPD).
                  </p>
                </div>
              </div>

              {/* Secção 9 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">9.</span>
                  Direitos adicionais para residentes na Califórnia (CCPA)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Se for residente na Califórnia, tem o direito de: saber que informações pessoais recolhemos, solicitar o apagamento dos seus dados e não sofrer discriminação pelo exercício destes direitos. Não vendemos dados pessoais nos termos do CCPA.
                  </p>
                </div>
              </div>

              {/* Secção 10 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">10.</span>
                  Segurança dos dados
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Adotamos medidas técnicas e organizativas adequadas para proteger os dados pessoais, entre as quais:
                  </p>
                  <ul className="body-text text-white/90 space-y-2">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Encriptação TLS/SSL para os dados em trânsito</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Acesso limitado ao pessoal autorizado</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Monitorização e logging dos acessos</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Backups regulares e procedimentos de disaster recovery</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Revisão periódica das medidas de segurança</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Conformidade com os requisitos de segurança da Secção 6 dos Meta Platform Terms</span></li>
                  </ul>
                </div>
              </div>

              {/* Secção 11 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">11.</span>
                  Papel da Automis no tratamento dos dados
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Quando prestamos serviços de automação por conta dos nossos Clientes:
                  </p>
                  <ul className="body-text text-white/90 space-y-3 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">O Cliente é o Responsável pelo tratamento</span> perante os utilizadores finais que interagem com as suas páginas, perfis, linhas telefónicas ou formulários.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">A Automis atua como Subcontratante</span>, tratando os dados exclusivamente de acordo com as instruções do Cliente e em conformidade com o contrato e o Data Processing Agreement (DPA) celebrado entre as partes.</span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    Para questões sobre como uma empresa específica trata os seus dados através da sua página de Facebook/Instagram, sistema telefónico ou site, contacte diretamente essa empresa.
                  </p>
                </div>
              </div>

              {/* Secção 12 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">12.</span>
                  Cookies
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    O nosso site utiliza cookies técnicos necessários e, mediante consentimento, cookies analíticos e de perfilagem. Pode gerir as suas preferências através das definições do browser ou do nosso banner de cookies.
                  </p>
                </div>
              </div>

              {/* Secção 13 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">13.</span>
                  Referências às políticas de terceiros
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Os dados dos utilizadores nas plataformas de terceiros são também tratados por essas plataformas de acordo com as suas próprias políticas:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://www.facebook.com/terms/" target="_blank" rel="noopener noreferrer">Meta Terms of Service</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://help.instagram.com/581066165581870" target="_blank" rel="noopener noreferrer">Instagram Terms of Use</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer">Meta Platform Terms (Programadores)</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer">Meta Developer Policies</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noopener noreferrer">ElevenLabs Privacy Policy</Link> </span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    Os nossos serviços não substituem nem alteram as políticas destas plataformas aplicáveis aos seus utilizadores.
                  </p>
                </div>
              </div>

              {/* Secção 14 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">14.</span>
                  Voice AI: Informações específicas
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Quando interage com um agente de voz IA gerido pela Automis por conta de um Cliente:
                  </p>
                  <ul className="body-text text-white/90 space-y-2">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>A chamada pode ser gerida por um sistema de inteligência artificial, não por um operador humano.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>A chamada pode ser gravada e/ou transcrita para finalidades de prestação do serviço e controlo de qualidade.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Pode solicitar falar com um operador humano a qualquer momento.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>As gravações são conservadas de forma segura por um período limitado, conforme descrito na Secção 7.</span></li>
                    <li className="flex items-start"> <span className="mr-3 mt-1">•</span> <span>As normas aplicáveis à gravação de chamadas variam por jurisdição. Onde exigido, o agente IA informará quem liga de que a chamada está a ser gravada e obterá o consentimento verbal antes de prosseguir.</span></li>
                  </ul>
                </div>
              </div>

              {/* Secção 15 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">15.</span>
                  Alterações à presente política
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. As alterações significativas serão comunicadas através do site ou por email. A data da última atualização é indicada no topo do documento.
                  </p>
                </div>
              </div>

              {/* Secção 16 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">16.</span>
                  Contactos
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-2">
                    Para qualquer questão, pedido ou reclamação:
                  </p>
                  <p className="body-text text-white/90 mb-2 font-semibold">
                    <span className="font-bold">Automis</span>, AI &amp; Marketing Agency
                  </p>
                  <p className="body-text text-white/90 mb-2">
                    <span className="font-semibold">Email:</span>{" "}
                    <Link
                      href="mailto:support@automis.ai"
                      className="text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      support@automis.ai
                    </Link>
                  </p>
                  <p className="body-text text-white/90 mb-2">
                    <span className="font-semibold">Site:</span>{" "}
                    <Link
                      href="https://automis.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      https://automis.ai
                    </Link>
                  </p>
                  <p className="body-text text-white/90">
                    <span className="">Sede:</span> <span className="font-bold">Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span>
                  </p>
                  <p className="body-text text-white/90">
                    <span className="">N.º de registo:</span> <span className="font-bold">17179196</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
}
