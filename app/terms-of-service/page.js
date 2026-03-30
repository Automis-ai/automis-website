"use client";

import { useEffect } from "react";
import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";

const TermsOfService = () => {
  useEffect(() => {
    document.querySelector("body").classList.add("home-nine");
  }, []);

  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            {/* Header */}
            <div className="mb-12">
              <h1 className="hero-heading text-white mb-4">TERMS OF SERVICE</h1>
              <p className="sub-heading text-white/90 mb-2">Automis — AI & Marketing Agency</p>
              <p className="body-text text-white/60">Last updated: March 30, 2026</p>
            </div>

            <div className="max-w-4xl space-y-12">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">1. Definitions</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Automis”, “we”, “our”:</span> Automis, AI & Marketing Agency, registered in Estonia (registration no. <span className="font-bold text-white">17179196</span>), with registered address at <span className="font-bold text-white">Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span>.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Client”:</span> any natural or legal person who enters into a contract with Automis for the provision of Services.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Services”:</span> the marketing, AI automation, advertising management, voice AI, and consulting services offered by Automis.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“End User”:</span> any person who interacts with the Client’s assets (Meta pages/profiles, phone lines, website forms, etc.).
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Meta Platform”:</span> Facebook, Instagram, Messenger, and related developer APIs provided by Meta Platforms, Inc.
                  </p>
                  <p className="body-text text-white/80">
                    <span className="font-bold text-white">“Third-Party Platforms”:</span> Google Ads, TikTok Ads, LinkedIn Ads, X Ads, and any other advertising or communication platform used in the delivery of Services.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">2. Description of Services</h2>
                <div className="space-y-8">
                  <p className="body-text text-white/80">Automis provides the following services, as agreed in the individual contract with each Client:</p>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.1 Paid Ads Management</h3>
                    <p className="body-text text-white/80">Creation, management, and AI-driven optimization of advertising campaigns on Google, Meta, TikTok, LinkedIn, X, and other platforms. Includes audience research, ad creative production, A/B testing, bid optimization, tracking/pixel setup, and performance reporting.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.2 Voice AI</h3>
                    <p className="body-text text-white/80">AI-powered voice agents for handling inbound and outbound phone calls on behalf of the Client. Includes lead qualification, appointment booking and rescheduling, customer support, call recording and transcription, CRM integration, and real-time analytics dashboard access. Voice AI agents are available 24/7 and support 20+ languages.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.3 AI Automations</h3>
                    <p className="body-text text-white/80">Design and implementation of custom workflow automations including: lead qualification and nurturing sequences (via SMS, WhatsApp, email), CRM data synchronization, appointment booking and reminder automations, finance and invoice processing workflows, HR candidate screening and scheduling, and custom integrations with the Client’s existing tools.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.4 Social Media Automation (Meta)</h3>
                    <p className="body-text text-white/80 mb-3">Automated responses to comments and direct messages (DMs) on the Client’s Facebook and Instagram pages/profiles, delivered <span className="font-bold"> exclusively through Meta’s official APIs</span>  (Instagram Graph API, Facebook Pages API, Messenger API), in full compliance with:</p>
                    <ul className="body-text flex flex-col text-white/80 space-y-1 pl-6 mb-3">
                      <li><Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Platform Terms</Link></li>
                      <li><Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Developer Policies</Link></li>
                      <li><Link href="https://www.facebook.com/terms/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Meta Terms of Service</Link></li>
                      <li><Link href="https://help.instagram.com/581066165581870" target="_blank" rel="noopener noreferrer" className="hover:text-blue-middle transition-all">Instagram Terms of Use</Link></li>
                    </ul>
                    <p className="body-text text-white/80">Automis does not use unofficial methods, scraping, unauthorized bots, or tools that violate Meta’s policies. The Automis app is registered on <Link href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-middle hover:underline">Meta for Developers</Link> and operates with permissions approved through Meta’s App Review process.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-middle mb-2">2.5 Jumpstart Audit & Consulting</h3>
                    <p className="body-text text-white/80">Comprehensive analysis of the Client’s marketing funnel, ad performance, missed-call rates, and growth opportunities. Includes a discovery call, a detailed audit deck, a 60-minute workshop, and a 90-day growth roadmap.</p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">3. Client Obligations</h2>
                <p className="body-text text-white mb-4">By subscribing to our Services, the Client agrees to:</p>
                <ul className="body-text text-white/80 space-y-4 pl-6">
                  <li className="list-disc"> <span className="font-bold">Comply with platform policies: </span> the Client is responsible for ensuring that the use of the Services complies with Meta’s Community Standards, Instagram Community Guidelines, Google Ads policies, and all other applicable platform policies.</li>
                  <li className="list-disc"> <span className="font-bold">Not use the Services for unlawful activities: </span> it is prohibited to use the automations for spam, fraud, illegal promises, offensive or defamatory content, or any activity that violates third-party rights.</li>
                  <li className="list-disc"> <span className="font-bold">Provide accurate information: </span> the Client must provide truthful and complete information for the configuration of the Services.</li>
                  <li className="list-disc"> <span className="font-bold">Update their own Privacy Policy and Terms: </span> the Client is responsible for updating their own Privacy Policy and Terms of Service to inform their End Users about the use of AI automation tools for managing comments, messages, and calls.</li>
                  <li className="list-disc"> <span className="font-bold">Maintain authorized access: </span> the Client must ensure that the credentials and permissions provided to Automis for access to Meta APIs, ad accounts, CRM, telephony, and other platforms remain valid and authorized.</li>
                  <li className="list-disc"> <span className="font-bold">Comply with applicable regulations: </span> the Client is the Data Controller with respect to its End Users and is responsible for compliance with data protection laws (GDPR, etc.).</li>
                  <li className="list-disc"> <span className="font-bold">Comply with call recording laws: </span> where Voice AI services involve call recording, the Client is responsible for ensuring compliance with applicable call recording consent laws in the relevant jurisdictions.</li>
                  <li className="list-disc"> <span className="font-bold">Pay fees on time: </span> as specified in the individual contract.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">4. Third-Party Platform Limitations and Disclaimer</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80"> <span className="font-bold">Automis cannot guarantee uninterrupted continuity of Services that depend on third-party platforms.</span> The platforms used in delivering our Services (Meta, Google, TikTok, LinkedIn, telephony providers, etc.) are subject to:</p>
                  <ul className="body-text text-white/80 space-y-2 pl-6">
                    <li className="list-disc">Unilateral changes to APIs, rate limits, permissions, and policies by the platform provider</li>
                    <li className="list-disc">Suspension or revocation of app permissions or API access by the platform provider, with or without notice</li>
                    <li className="list-disc">Limitations, restrictions, or suspension of the Client’s account/page by the platform for policy violations</li>
                    <li className="list-disc">Technical outages or service interruptions by the platform</li>
                  </ul>
                  <p className="body-text text-white/80 font-bold">In the event of any such limitation, suspension, or revocation:</p>
                  <ul className="body-text text-white/80 space-y-2 pl-6">
                    <li className="list-disc">Automis will promptly notify the Client and collaborate to resolve the issue where possible.</li>
                    <li className="list-disc">Automis is not liable for losses, damages, or lost revenue resulting from actions taken by third-party platforms.</li>
                    <li className="list-disc">The Client may not claim compensation or refunds for service periods impacted by platform-imposed limitations.</li>
                    <li className="list-disc">Automis reserves the right to suspend affected Services without penalty if platform changes make continued delivery impossible or unlawful.</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">5. Voice AI — Specific Terms</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">In addition to the general terms, the following applies specifically to Voice AI Services:</p>
                  <ul className="body-text text-white/80 space-y-4 pl-6">
                    <li className="list-disc"><span className="font-bold text-white">AI disclosure:</span> Automis’s voice agents are powered by artificial intelligence. Depending on the Client’s preferences and applicable law, the AI may identify itself as an automated system at the beginning of each call.</li>
                    <li className="list-disc"><span className="font-bold text-white">Call recording:</span> calls may be recorded and transcribed. The Client is responsible for configuring the appropriate consent mechanisms and disclosures as required by applicable law.</li>
                    <li className="list-disc"><span className="font-bold text-white">Human escalation:</span> the AI agent can transfer calls to a human operator when it cannot handle a request. The Client must provide a valid escalation path.</li>
                    <li className="list-disc"><span className="font-bold text-white">No medical/legal/financial advice:</span> AI voice agents do not provide professional, medical, legal, or financial advice. Responses are informational only.</li>
                    <li className="list-disc"><span className="font-bold text-white">Uptime:</span> Automis targets 99.5% uptime for Voice AI services but does not guarantee uninterrupted availability. Telephony provider outages are outside our control.</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">6. Data Protection and DPA</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">Automis processes End User data on behalf of the Client as a <span className="font-bold">Data Processor</span> under Article 28 GDPR. The relationship is governed by a <span className="font-bold">  Data Processing Agreement (DPA) </span> signed between Automis and the Client, which specifies: categories of data processed, purposes of processing, security measures, sub-processors, deletion obligations, and data breach procedures.</p>
                  <p className="body-text text-white/80">For full details on data processing, see our <Link href="https://automis.ai/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-middle hover:underline">Privacy Policy</Link>.</p>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">7. Intellectual Property</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">All workflows, automations, templates, code, processes, voice agent configurations, and documentation created by Automis in the course of the Services remain the intellectual property of Automis, unless otherwise agreed in writing. The Client receives a non-exclusive, non-transferable license to use the Services for the duration of the contract.</p>
                  <p className="body-text text-white/80">The Client retains ownership of their own content, brand assets, ad creatives provided to Automis, and data within their own platforms and CRM.</p>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">8. Confidentiality</h2>
                <p className="body-text text-white/80">Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement, including business strategies, customer data, technical configurations, and financial information. This obligation survives the termination of the contract for a period of 2 years.</p>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">9. Payment Terms</h2>
                <p className="body-text text-white/80">Payment terms are specified in the individual contract with each Client. Unless otherwise agreed, invoices are payable within <span className="font-bold">7 days</span> of issuance. In case of non-payment, Automis reserves the right to suspend Services until the outstanding balance is settled in full.</p>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">10. Duration and Termination</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">The contract has the duration specified in the individual agreement. Either party may terminate with <span className="font-bold">30 days’</span> written notice. Upon termination, Automis will: deactivate all automations, revoke access to the Client’s platforms, delete Client data in accordance with the Privacy Policy and DPA, and provide a final report upon request.</p>
                  <p className="body-text text-white/80">Automis may terminate or suspend the contract with immediate effect if the Client materially breaches these Terms, violates platform policies, uses the Services for unlawful activities, or fails to pay after notice.</p>
                </div>
              </div>

              {/* Section 11 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">11. Limitation of Liability</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">The Services are provided “as is.” Automis does not guarantee specific results in terms of leads, conversions, sales, appointments booked, or growth. Automis’s total aggregate liability to the Client for any claim arising from the contract shall not exceed the total amount paid by the Client in the <span className="font-bold">12 months preceding the event giving rise to the claim.</span></p>
                  <p className="body-text text-white/80">Automis is not liable for: indirect, incidental, consequential, or punitive damages; lost profits or lost business opportunities; actions taken by third-party platforms (Meta, Google, etc.); inaccuracies in AI-generated responses; decisions made by End Users based on automated responses; or force majeure events.</p>
                </div>
              </div>

              {/* Section 12 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">12. Use Restrictions</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">The Client may not use the Services for: spam or unsolicited mass messaging, fraud, phishing, or deceptive practices, violation of third-party rights (privacy, intellectual property, etc.), distribution of malware or harmful content, any activity prohibited by applicable laws or platform policies, or reverse-engineering or reselling Automis’s technology without written authorization.</p>
                  <p className="body-text text-white/80">Automis reserves the right to immediately suspend Services in case of violation of these restrictions.</p>
                </div>
              </div>

              {/* Section 13 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">13. Indemnification</h2>
                <p className="body-text text-white/80">The Client agrees to indemnify and hold harmless Automis from any claims, damages, losses, and expenses (including legal fees) arising from: the Client’s violation of these Terms or applicable laws, the Client’s use of the Services in a manner not authorized by these Terms, content created or approved by the Client, or the Client’s failure to comply with platform policies or data protection regulations.</p>
              </div>

              {/* Section 14 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">14. Force Majeure</h2>
                <p className="body-text text-white/80">Neither party shall be liable for delays or failures in performance resulting from circumstances beyond its reasonable control, including natural disasters, pandemics, government actions, war, cyberattacks, or third-party platform outages.</p>
              </div>

              {/* Section 15 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">15. Governing Law and Jurisdiction</h2>
                <p className="body-text text-white/80">These Terms are governed by the laws of the Republic of Italy. The parties commit to attempting amicable resolution of any disputes.</p>
              </div>

              {/* Section 16 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">16. Severability</h2>
                <p className="body-text text-white/80">If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>
              </div>

              {/* Section 17 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">17. Modifications</h2>
                <p className="body-text text-white/80">We reserve the right to modify these Terms at any time. Significant changes will be communicated with at least 30 days’ notice via email or through the website. Continued use of the Services after notification constitutes acceptance of the changes.</p>
              </div>

              {/* Section 18 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">18. Entire Agreement</h2>
                <p className="body-text text-white/80">These Terms, together with the individual contract, DPA, and any annexes, constitute the entire agreement between the parties and supersede all prior agreements, representations, and understandings.</p>
              </div>

              {/* Section 19 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">19. Contact Us</h2>
                <div className="space-y-4">
                  <p className="body-text text-white/80">For any questions regarding these Terms of Service:</p>
                  <p className="body-text text-white font-bold text-lg"> <span className="font-bold">Automis</span>  — AI & Marketing Agency</p>
                  <div className="space-y-1">
                    <p className="body-text text-white/80"><span className="font-bold">Email:</span> <Link href="mailto:support@automis.ai" className="text-blue-middle hover:underline">support@automis.ai</Link></p>
                    <p className="body-text text-white/80"><span className="font-bold">Website:</span> <Link href="https://automis.ai" target="_blank" rel="noopener noreferrer" className="text-blue-middle hover:underline">https://automis.ai</Link></p>
                    <p className="body-text text-white/80"><span className=" ">Registered address:</span>  <span className="font-bold"> Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span></p>
                    <p className="body-text text-white/80"><span className=" ">Registration number:</span> <span className="font-bold">17179196</span> </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default TermsOfService;
