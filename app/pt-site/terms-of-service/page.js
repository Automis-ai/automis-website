import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";

export const metadata = {
  title: "Termos e Condições de Serviço | Automis",
  description:
    "Os termos e condições que regem os serviços de marketing, automação IA, gestão de publicidade, Voice AI e consultoria da Automis.",
  alternates: {
    canonical: "https://automis.ai/pt/terms-of-service",
    languages: {
      en: "https://automis.ai/terms-of-service",
      "it-IT": "https://automis.ai/it/terms-of-service",
      "pt-PT": "https://automis.ai/pt/terms-of-service",
      "x-default": "https://automis.ai/terms-of-service",
    },
  },
  openGraph: {
    title: "Termos e Condições de Serviço | Automis",
    description:
      "Os termos e condições que regem os serviços da Automis.",
    url: "https://automis.ai/pt/terms-of-service",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
};

export default function TermsOfServicePT() {
  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            {/* Cabeçalho */}
            <div className="mb-12">
              <h1 className="hero-heading text-white mb-4 uppercase">TERMOS E CONDIÇÕES DE SERVIÇO</h1>
              <p className="sub-heading text-white/90 mb-2">Automis, AI &amp; Marketing Agency</p>
              <p className="body-text text-white/60">Última atualização: 30 de março de 2026</p>
            </div>

            <div className="max-w-4xl space-y-12">
              {/* Secção 1 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">1. Definições</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Automis”, “nós”, “nosso”:</span> Automis, AI &amp; Marketing Agency, registada na Estónia (n.º de registo <span className="font-bold text-white">17179196</span>), com sede em <span className="font-bold text-white">Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span>.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Cliente”:</span> qualquer pessoa singular ou coletiva que celebre um contrato com a Automis para a prestação dos Serviços.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Serviços”:</span> os serviços de marketing, automação IA, gestão de publicidade, Voice AI e consultoria oferecidos pela Automis.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Utilizador Final”:</span> qualquer pessoa que interaja com os ativos do Cliente (páginas/perfis Meta, linhas telefónicas, formulários web, etc.).
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Plataforma Meta”:</span> Facebook, Instagram, Messenger e as respetivas API para programadores fornecidas pela Meta Platforms, Inc.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Plataformas Terceiras”:</span> Google Ads, TikTok Ads, LinkedIn Ads, X Ads e qualquer outra plataforma publicitária ou de comunicação utilizada na prestação dos Serviços.
                  </p>
                </div>
              </div>

              {/* Secção 2 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">2. Descrição dos Serviços</h2>
                <div className="space-y-8">
                  <p className="body-text text-white/80">A Automis fornece os seguintes serviços, conforme acordado no contrato individual com cada Cliente:</p>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.1 Gestão de campanhas publicitárias (Paid Ads)</h3>
                    <p className="body-text text-white/80">Criação, gestão e otimização orientada por IA de campanhas publicitárias no Google, Meta, TikTok, LinkedIn, X e outras plataformas. Inclui pesquisa de audiência, produção de criatividades publicitárias, A/B testing, otimização de bids, configuração de tracking/pixel e reporting de performance.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.2 Voice AI</h3>
                    <p className="body-text text-white/80">Agentes de voz IA para a gestão de chamadas de entrada e de saída por conta do Cliente. Inclui qualificação de contactos, marcação e reagendamento de consultas, apoio a clientes, gravação e transcrição de chamadas, integração com CRM e acesso a dashboards de analytics em tempo real. Os agentes Voice AI estão disponíveis 24/7 e suportam mais de 20 idiomas.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.3 Automações IA</h3>
                    <p className="body-text text-white/80">Conceção e implementação de automações de workflow personalizadas, entre as quais: sequências de qualificação e nurturing de contactos (via SMS, WhatsApp, email), sincronização de dados de CRM, automações de marcação e lembretes de consultas, workflows de gestão de faturas e despesas, triagem e scheduling de candidatos de RH, e integrações personalizadas com as ferramentas existentes do Cliente.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.4 Automação de Redes Sociais (Meta)</h3>
                    <p className="body-text text-white/80 mb-3">Respostas automáticas a comentários e mensagens diretas (DM) nas páginas/perfis de Facebook e Instagram do Cliente, prestadas <span className="font-bold">exclusivamente através das API oficiais da Meta</span> (Instagram Graph API, Facebook Pages API, Messenger API), no pleno respeito de:</p>
                    <ul className="body-text flex flex-col text-white/80 space-y-1 pl-6 mb-3">
                      <li><Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Platform Terms</Link></li>
                      <li><Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Developer Policies</Link></li>
                      <li><Link href="https://www.facebook.com/terms/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Terms of Service</Link></li>
                      <li><Link href="https://help.instagram.com/581066165581870" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Instagram Terms of Use</Link></li>
                    </ul>
                    <p className="body-text text-white/80">A Automis não utiliza métodos não oficiais, scraping, bots não autorizados ou ferramentas que violem as políticas da Meta. A aplicação Automis está registada em <Link href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-middle hover:underline">Meta for Developers</Link> e opera com permissões aprovadas através do processo de App Review da Meta.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.5 Jumpstart Audit e Consultoria</h3>
                    <p className="body-text text-white/80">Análise completa do funnel de marketing do Cliente, performance publicitária, taxa de chamadas perdidas e oportunidades de crescimento. Inclui discovery call, audit deck detalhado, workshop de 60 minutos e roadmap de crescimento a 90 dias.</p>
                  </div>
                </div>
              </div>

              {/* Secção 3 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">3. Obrigações do Cliente</h2>
                <p className="body-text text-white mb-4">Ao contratar os nossos Serviços, o Cliente compromete-se a:</p>
                <ul className="body-text text-white/80 space-y-4 pl-6">
                  <li className="list-disc"><span className="font-bold">Respeitar as políticas das plataformas:</span> o Cliente é responsável por assegurar que a utilização dos Serviços está em conformidade com as Community Standards da Meta, as Diretrizes do Instagram, as políticas do Google Ads e todas as políticas aplicáveis das plataformas utilizadas.</li>
                  <li className="list-disc"><span className="font-bold">Não utilizar os Serviços para atividades ilícitas:</span> é proibido utilizar as automações para spam, fraude, promessas ilegais, conteúdos ofensivos ou difamatórios, ou qualquer atividade que viole direitos de terceiros.</li>
                  <li className="list-disc"><span className="font-bold">Fornecer informações rigorosas:</span> o Cliente deve fornecer informações verdadeiras e completas para a configuração dos Serviços.</li>
                  <li className="list-disc"><span className="font-bold">Atualizar a sua Política de Privacidade e Termos:</span> o Cliente é responsável por atualizar a sua Política de Privacidade e os seus Termos de Serviço para informar os seus Utilizadores Finais sobre a utilização de ferramentas de automação IA na gestão de comentários, mensagens e chamadas.</li>
                  <li className="list-disc"><span className="font-bold">Manter o acesso autorizado:</span> o Cliente deve garantir que as credenciais e permissões fornecidas à Automis para acesso às API Meta, contas publicitárias, CRM, telefonia e outras plataformas se mantêm válidas e autorizadas.</li>
                  <li className="list-disc"><span className="font-bold">Respeitar as normas aplicáveis:</span> o Cliente é o Responsável pelo tratamento perante os seus Utilizadores Finais e é responsável pela conformidade com as normas de proteção de dados (RGPD, etc.).</li>
                  <li className="list-disc"><span className="font-bold">Conformidade na gravação de chamadas:</span> onde os serviços Voice AI prevejam a gravação de chamadas, o Cliente é responsável pela conformidade com as leis aplicáveis sobre consentimento à gravação nas jurisdições relevantes.</li>
                  <li className="list-disc"><span className="font-bold">Pagar nos prazos:</span> conforme especificado no contrato individual.</li>
                </ul>
              </div>

              {/* Secção 4 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">4. Limitações das plataformas terceiras e exclusão de responsabilidade</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80"><span className="font-bold">A Automis não pode garantir a continuidade ininterrupta dos Serviços que dependem de plataformas terceiras.</span> As plataformas utilizadas na prestação dos Serviços (Meta, Google, TikTok, LinkedIn, fornecedores de telefonia, etc.) estão sujeitas a:</p>
                  <ul className="body-text text-white/80 space-y-2 pl-6">
                    <li className="list-disc">Alterações unilaterais de API, rate limits, permissões e políticas por parte do fornecedor da plataforma</li>
                    <li className="list-disc">Suspensão ou revogação das permissões da aplicação ou do acesso à API, com ou sem aviso prévio</li>
                    <li className="list-disc">Limitações, restrições ou suspensão da conta/página do Cliente por violação das políticas da plataforma</li>
                    <li className="list-disc">Interrupções técnicas ou de serviço da plataforma</li>
                  </ul>
                  <p className="body-text text-white/80 font-bold">Em caso de limitação, suspensão ou revogação:</p>
                  <ul className="body-text text-white/80 space-y-2 pl-6">
                    <li className="list-disc">A Automis notificará atempadamente o Cliente e colaborará na resolução do problema, sempre que possível.</li>
                    <li className="list-disc">A Automis não é responsável por perdas, danos ou lucros cessantes decorrentes de ações levadas a cabo pelas plataformas terceiras.</li>
                    <li className="list-disc">O Cliente não poderá reclamar indemnizações ou reembolsos por períodos de serviço afetados por limitações impostas pelas plataformas.</li>
                    <li className="list-disc">A Automis reserva-se o direito de suspender os Serviços afetados sem penalizações caso as alterações das plataformas tornem impossível ou ilegal a continuação do serviço.</li>
                  </ul>
                </div>
              </div>

              {/* Secção 5 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">5. Voice AI: Termos específicos</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Para além dos termos gerais, aplicam-se especificamente aos Serviços Voice AI:</p>
                  <ul className="body-text text-white/80 space-y-4 pl-6">
                    <li className="list-disc"><span className="font-bold text-white">Divulgação de IA:</span> os agentes de voz da Automis são alimentados por inteligência artificial. Consoante as preferências do Cliente e a lei aplicável, a IA pode identificar-se como sistema automatizado no início de cada chamada.</li>
                    <li className="list-disc"><span className="font-bold text-white">Gravação de chamadas:</span> as chamadas podem ser gravadas e transcritas. O Cliente é responsável pela configuração dos mecanismos de consentimento e das informações exigidas pela lei aplicável.</li>
                    <li className="list-disc"><span className="font-bold text-white">Escalonamento humano:</span> o agente IA pode transferir as chamadas para um operador humano quando não puder tratar um pedido. O Cliente deve fornecer um caminho de escalonamento válido.</li>
                    <li className="list-disc"><span className="font-bold text-white">Sem aconselhamento profissional:</span> os agentes de voz IA não prestam aconselhamento profissional, médico, jurídico ou financeiro. As respostas são exclusivamente informativas.</li>
                    <li className="list-disc"><span className="font-bold text-white">Uptime:</span> a Automis visa 99,5% de uptime para os serviços Voice AI, mas não garante disponibilidade ininterrupta. As interrupções dos fornecedores de telefonia estão fora do nosso controlo.</li>
                  </ul>
                </div>
              </div>

              {/* Secção 6 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">6. Proteção de dados e DPA</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">A Automis trata os dados dos Utilizadores Finais do Cliente na qualidade de <span className="font-bold">Subcontratante</span> nos termos do Art. 28.º do RGPD. A relação é regulada por um <span className="font-bold">Data Processing Agreement (DPA)</span> celebrado entre a Automis e o Cliente, que especifica: categorias de dados tratados, finalidades do tratamento, medidas de segurança, subcontratantes, obrigações de apagamento e procedimentos para a gestão de violações de dados.</p>
                  <p className="body-text text-white/80">Para os detalhes completos sobre o tratamento dos dados, consulte a nossa <Link href="/pt/privacy-policy" className="text-blue-middle hover:underline">Política de Privacidade</Link>.</p>
                </div>
              </div>

              {/* Secção 7 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">7. Propriedade intelectual</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Todos os workflows, automações, templates, código, processos, configurações dos agentes de voz e documentação criados pela Automis no âmbito dos Serviços permanecem propriedade intelectual da Automis, salvo acordo escrito em contrário. O Cliente recebe uma licença não exclusiva e não transmissível para a utilização dos Serviços durante a vigência do contrato.</p>
                  <p className="body-text text-white/80">O Cliente mantém a propriedade dos seus conteúdos, ativos de marca, criatividades publicitárias fornecidas à Automis e dados no interior das suas plataformas e CRM.</p>
                </div>
              </div>

              {/* Secção 8 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">8. Confidencialidade</h2>
                <p className="body-text text-white/80">Ambas as partes se comprometem a manter confidenciais as informações proprietárias ou sensíveis partilhadas durante o serviço, incluindo estratégias de negócio, dados de clientes, configurações técnicas e informações financeiras. Esta obrigação subsiste à cessação do contrato por um período de 2 anos.</p>
              </div>

              {/* Secção 9 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">9. Pagamentos e faturação</h2>
                <p className="body-text text-white/80">Os termos de pagamento são especificados no contrato individual. Salvo acordo em contrário, as faturas são pagáveis no prazo de <span className="font-bold">7 dias</span> a contar da emissão. Em caso de falta de pagamento, a Automis reserva-se o direito de suspender os Serviços até à liquidação integral.</p>
              </div>

              {/* Secção 10 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">10. Vigência e cessação</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">O contrato tem a vigência especificada no acordo individual. Cada parte pode pôr-lhe termo mediante aviso prévio escrito de <span className="font-bold">30 dias</span>. Em caso de cessação, a Automis: desativará todas as automações, revogará o acesso às plataformas do Cliente, eliminará os dados do Cliente de acordo com a Política de Privacidade e o DPA, e fornecerá um relatório final a pedido.</p>
                  <p className="body-text text-white/80">A Automis pode resolver ou suspender o contrato com efeitos imediatos se o Cliente violar materialmente estes Termos, violar as políticas das plataformas, utilizar os Serviços para atividades ilícitas, ou não cumprir as obrigações de pagamento após interpelação.</p>
                </div>
              </div>

              {/* Secção 11 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">11. Limitação de responsabilidade</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Os Serviços são fornecidos “tal como estão” (as is). A Automis não garante resultados específicos em termos de contactos, conversões, vendas, marcações ou crescimento. A responsabilidade total da Automis perante o Cliente por qualquer reclamação não poderá exceder o montante total pago pelo Cliente nos <span className="font-bold">12 meses anteriores ao evento que deu origem à reclamação.</span></p>
                  <p className="body-text text-white/80">A Automis não é responsável por: danos indiretos, incidentais, consequenciais ou punitivos; lucros cessantes ou oportunidades de negócio perdidas; ações levadas a cabo por plataformas terceiras (Meta, Google, etc.); imprecisões nas respostas geradas pela IA; decisões tomadas pelos Utilizadores Finais com base em respostas automáticas; ou eventos de força maior.</p>
                </div>
              </div>

              {/* Secção 12 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">12. Restrições de utilização</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">O Cliente não pode utilizar os Serviços para: spam ou envio massivo não solicitado, fraude, phishing ou práticas enganosas, violação de direitos de terceiros (privacidade, propriedade intelectual, etc.), distribuição de malware ou conteúdos nocivos, qualquer atividade proibida pelas leis aplicáveis ou pelas políticas das plataformas, ou engenharia reversa ou revenda da tecnologia da Automis sem autorização escrita.</p>
                  <p className="body-text text-white/80">A Automis reserva-se o direito de suspender imediatamente os Serviços em caso de violação.</p>
                </div>
              </div>

              {/* Secção 13 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">13. Indemnização</h2>
                <p className="body-text text-white/80">O Cliente compromete-se a indemnizar e a manter a Automis indemne de quaisquer pretensões, danos, perdas e despesas (incluindo despesas legais) decorrentes de: violação destes Termos ou das leis aplicáveis pelo Cliente, utilização dos Serviços de modo não autorizado, conteúdos criados ou aprovados pelo Cliente, ou incumprimento pelo Cliente das políticas das plataformas ou das normas de proteção de dados.</p>
              </div>

              {/* Secção 14 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">14. Força maior</h2>
                <p className="body-text text-white/80">Nenhuma das partes será responsável por atrasos ou incumprimentos devidos a circunstâncias fora do seu controlo razoável, incluindo catástrofes naturais, pandemias, ações governamentais, guerras, ciberataques ou interrupções de plataformas terceiras.</p>
              </div>

              {/* Secção 15 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">15. Lei aplicável e foro competente</h2>
                <p className="body-text text-white/80">Os presentes Termos são regidos pela lei da República Portuguesa. As partes comprometem-se a tentar uma resolução amigável de qualquer litígio.</p>
              </div>

              {/* Secção 16 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">16. Cláusula de salvaguarda</h2>
                <p className="body-text text-white/80">Se qualquer disposição dos presentes Termos vier a ser considerada inválida ou inaplicável, as restantes disposições permanecerão plenamente válidas e eficazes.</p>
              </div>

              {/* Secção 17 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">17. Alterações</h2>
                <p className="body-text text-white/80">Reservamo-nos o direito de alterar os presentes Termos a qualquer momento. As alterações significativas serão comunicadas com pelo menos 30 dias de aviso prévio, por email ou através do site. A utilização continuada dos Serviços após a notificação constitui aceitação das alterações.</p>
              </div>

              {/* Secção 18 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">18. Acordo integral</h2>
                <p className="body-text text-white/80">Os presentes Termos, em conjunto com o contrato individual, o DPA e eventuais anexos, constituem o acordo integral entre as partes e substituem todos os acordos, declarações e entendimentos anteriores.</p>
              </div>

              {/* Secção 19 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">19. Contactos</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Para qualquer questão relativa aos presentes Termos de Serviço:</p>
                  <p className="body-text text-white font-bold text-lg"><span className="font-bold">Automis</span>, AI &amp; Marketing Agency</p>
                  <div className="space-y-1">
                    <p className="body-text text-white/80"><span className="font-bold">Email:</span> <Link href="mailto:support@automis.ai" className="text-blue-middle hover:underline">support@automis.ai</Link></p>
                    <p className="body-text text-white/80"><span className="font-bold">Site:</span> <Link href="https://automis.ai" target="_blank" rel="noopener noreferrer" className="text-blue-middle hover:underline">https://automis.ai</Link></p>
                    <p className="body-text text-white/80"><span>Sede:</span> <span className="font-bold">Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span></p>
                    <p className="body-text text-white/80"><span>N.º de registo:</span> <span className="font-bold">17179196</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
}
