"use client";

import { useEffect } from "react";
import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.querySelector("body").classList.add("home-nine");
  }, []);

  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">Privacy Policy</h1>
              <p className="sub-heading text-white/90 mb-2">
                Automis — AI & Marketing Agency
              </p>
              <p className="body-text text-white/70">
                Last updated: March 30, 2026
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Section 1 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">1.</span>
                  Introduction and Data Controller
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    This Privacy Policy describes how <span className="font-bold">Automis</span> ("we", "our", or "the Company"), registered in Estonia (registration no. <span className="font-bold">17179196</span>), with registered address at <span className="font-bold"> Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314,</span> collects, uses, stores, and protects personal data in connection with our services.
                  </p>
                  <p className="body-text text-white/90 mb-4">
                    Automis is an AI & Marketing Agency providing paid advertising management, AI-powered voice agents, workflow automation, social media automation, and consulting services. Depending on the service and context, Automis may act as:
                  </p>
                  <ul className="body-text text-white/90 space-y-3 mb-4">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 font-semibold">•</span>
                      <span><span className="font-semibold">Data Controller</span> — for data collected directly from website visitors, prospective clients, and individuals who interact with our own platforms (e.g., booking a discovery call, downloading an audit report, contacting us).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 font-semibold">•</span>
                      <span><span className="font-semibold">Data Processor</span> — for data processed on behalf of our Clients in the course of delivering automation services (e.g., responding to comments/DMs on the Client's Meta pages, handling calls on behalf of the Client, managing the Client's CRM data).</span>
                    </li>
                  </ul>
                  <p className="body-text text-white/90">
                    This policy complies with the <Link href="https://gdpr-info.eu/" target="_blank" rel="noopener noreferrer">General Data Protection Regulation (GDPR)</Link>, the <Link href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer">California Consumer Privacy Act (CCPA)</Link>, and the applicable <Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer">Meta Platform Terms </Link> and <Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer">Developer Policies</Link>.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">2.</span>
                  Categories of Personal Data We Collect
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.1 Data collected directly from you</h3>
                    <p className="body-text text-white/90 mb-4">
                      When you visit our website, book a discovery call, request a Jumpstart Audit, or otherwise contact us, we may collect:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Full name</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Email address</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Phone number</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Company name, job title, and industry</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Information you provide during discovery calls, workshops, or audit requests</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Billing and payment information (processed by third-party payment providers)</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.2 Data processed via Meta APIs (on behalf of Clients)</h3>
                    <p className="body-text text-white/90 mb-4">
                      As part of our <span className="font-bold">Social Media Automation Service</span> (automated responses to comments and direct messages on Facebook and Instagram), we process the following categories of end-user data through Meta's official APIs (Instagram Graph API, Facebook Pages API, Messenger API):
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Public profile data:</span> username, Meta user ID, display name, profile picture</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Comment content:</span> text of comments posted under the Client's Facebook/Instagram posts</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Direct message content:</span> messages sent by end-users to the Client's page/profile via Instagram Direct or Facebook Messenger</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Interaction metadata:</span> timestamps, interaction type (comment, DM, mention), content IDs</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Page/profile insights:</span> aggregated performance metrics (reach, engagement) where accessible via API</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.3 Data processed via Voice AI services (on behalf of Clients)</h3>
                    <p className="body-text text-white/90 mb-4">
                      As part of our <span className="font-bold">Voice AI Service</span>  (AI-powered inbound and outbound call handling), we may process:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Call audio and transcripts:</span>  recordings and/or real-time transcriptions of phone calls handled by our AI voice agents on behalf of the Client</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>  <span className="font-bold">Caller information:</span> phone number, name (if provided), and any information shared during the call (e.g., appointment requests, service inquiries)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>  <span className="font-bold">Call metadata:</span> call duration, timestamp, call outcome (booked, transferred, voicemail)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-bold">Scheduling data:</span> appointment details, calendar availability, booking confirmations</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.4 Data processed via AI Automations (on behalf of Clients)</h3>
                    <p className="body-text text-white/90 mb-4">
                      As part of our  <span className="font-bold">AI Automation Service </span> (lead qualification, nurturing, CRM sync, and workflow automation), we may process:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Lead data:</span> name, email, phone, source, qualification status, lead score</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">CRM records:</span> contact details, interaction history, deal/pipeline stages synced with the Client's CRM</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Communication data:</span> content of automated SMS, WhatsApp messages, and emails sent on behalf of the Client</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Workflow data:</span> trigger events, automation logs, task assignments</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.5 Data processed via Paid Ads Management (on behalf of Clients)</h3>
                    <p className="body-text text-white/90 mb-4">
                      As part of our <span className="font-bold">Paid Ads Management Service</span>, we may access and process:
                    </p>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Ad account data:</span> campaign performance metrics, ad spend, audience insights, conversion data accessed via Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, and other advertising platform APIs</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Pixel/tracking data:</span> website visitor behavior data collected through advertising pixels configured on the Client's website</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Lead form data:</span> information submitted by end-users through lead generation forms on advertising platforms</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">2.6 Technical data</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>IP address, browser type, operating system, device information</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Cookies and similar tracking technologies (see Section 12)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Website usage logs and analytics data</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">3.</span>
                  Purposes of Processing
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">3.1 Data collected directly</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Providing requested services (discovery calls, audits, consulting)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Commercial and marketing communications (with consent)</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Improving our website and services</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Fulfilling legal and contractual obligations</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Fraud prevention and security</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">3.2 Data processed on behalf of Clients</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Social media automation:</span>  sending automated replies to comments and DMs on Facebook/Instagram via official Meta APIs</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Voice AI:</span> handling inbound/outbound calls, booking appointments, qualifying leads, providing customer support via AI voice agents</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Lead qualification and nurturing:</span> screening, scoring, and following up on leads through automated workflows</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">CRM synchronization:</span> keeping client CRM data accurate and up-to-date across platforms</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Appointment management:</span> booking, confirming, rescheduling, and reminder automation</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Ad campaign optimization:</span> analyzing campaign performance, audience behavior, and conversion data to improve ROI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Reporting:</span> generating performance reports and analytics for Clients</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">4.</span>
                  Legal Basis for Processing (GDPR)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    We process personal data under the following legal bases pursuant to Article 6 of the GDPR:
                  </p>
                  <ul className="body-text text-white/90 space-y-3">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Consent (Art. 6.1.a):</span> for marketing communications, demo calls, newsletters, and promotional materials. You may withdraw consent at any time.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Performance of a contract (Art. 6.1.b):</span> for delivering services requested by our Clients and fulfilling contractual obligations.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Legitimate interest (Art. 6.1.f):</span> for improving our services, ensuring system security, preventing abuse, and conducting analytics. When acting as a Data Processor, the legitimate interest belongs to the Client (Data Controller).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1">•</span>
                      <span><span className="font-semibold">Legal obligation (Art. 6.1.c):</span> for complying with tax, accounting, and regulatory requirements.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">5.</span>
                  Data Sharing and Sub-Processors
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.1 Platform providers</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Meta Platforms, Inc.:</span> as the platform through which social media data is collected and transmitted via API. Meta processes data according to its own Privacy Policy and Terms of Service.</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Google</span> (Google Ads, Google Calendar): for ad campaign management and scheduling integrations</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">TikTok, LinkedIn, X (Twitter):</span> for ad campaign management on respective platforms, where applicable</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.2 Technology and infrastructure providers</h3>
                    <ul className="body-text text-white/90 space-y-2">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">n8n</span> (n8n GmbH / n8n Cloud): workflow automation platform used to execute automations</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">ElevenLabs:</span> AI voice synthesis provider used for Voice AI services</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">GoHighLevel / LeadConnector:</span> CRM and marketing automation platform</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Vercel, GitHub, Supabase:</span> infrastructure and hosting</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Twilio:</span> telephony infrastructure for Voice AI</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Calendly, Cal.com, Google:</span> scheduling and booking services</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                    <h3 className="card-heading text-white mb-4">5.3 Other recipients</h3>
                    <ul className="body-text text-white/90 space-y-2 mb-4">
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Professional advisors </span> : accountants, lawyers, and legal consultants, strictly as necessary</span></li>
                      <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Law enforcement or regulatory authorities</span>: when required by applicable law</span></li>
                    </ul>
                    <p className="font-bold  text-white/90">
                      We do not sell, rent, or disclose personal data to third parties for their own direct marketing purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">6.</span>
                  International Data Transfers
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Some of our sub-processors (including Meta Platforms, Inc., Google LLC, and ElevenLabs) are based in the United States or other countries outside the European Economic Area (EEA). Transfers are conducted on the basis of adequate safeguards under Article 46 GDPR (Standard Contractual Clauses), adequacy decisions by the European Commission where applicable, or the explicit consent of the data subject.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">7.</span>
                  Data Retention
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    We retain personal data for the following periods:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold"> Contact and commercial data </span>: for the duration of the contractual relationship and for <span className="font-bold">2 years</span> thereafter as required by applicable tax and accounting legislation.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Data processed via Meta APIs</span>: retained only as long as necessary to deliver the automation service. Upon termination of the Client contract, data will be deleted within  <span className="font-bold">60 days</span>, unless a longer retention is required by law.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Voice AI call recordings and transcripts</span>: retained for  <span className="font-bold">90 days</span> after the call, then automatically deleted, unless the Client requests longer retention.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Lead and CRM data</span>: for the duration of the Client engagement. Deleted within  <span className="font-bold">90 days</span> of contract termination.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Ad account data</span>: performance reports are retained for the duration of the engagement plus  <span className="font-bold">3 months</span>. Raw platform data is accessed but not stored long-term by Automis.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Website analytics and logs</span>: up to 12 months.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Marketing data (consent-based)</span>: until consent is withdrawn.</span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    In accordance with the Meta Platform Terms, upon cessation of use of Meta APIs or upon Meta's request, we will delete all Platform Data without undue delay.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">8.</span>
                  Your Rights (GDPR)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Under the GDPR, you have the right to:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Access:</span> obtain confirmation of processing and a copy of your personal data.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Rectification:</span> request correction of inaccurate or incomplete data.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Erasure:</span> request deletion of your data ("right to be forgotten").</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Restriction:</span> request restriction of processing in certain circumstances.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Portability:</span> receive your data in a structured, commonly used, machine-readable format.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Objection:</span> object to processing based on legitimate interest.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span><span className="font-semibold">Withdraw consent:</span> withdraw your consent at any time, without affecting the lawfulness of processing prior to withdrawal.</span></li>
                  </ul>
                  <p className="body-text text-white/90 mb-4">
                    To exercise your rights, contact us at: support@automis.ai. We will respond within 30 days.
                  </p>
                  <p className="body-text text-white/90">
                    You also have the right to lodge a complaint with the competent supervisory authority (<Link href="https://www.aki.ee/en" target="_blank" rel="noopener noreferrer">Estonian Data Protection Inspectorate</Link> or the authority of your country of residence).
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">9.</span>
                  Additional Rights for California Residents (CCPA)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    If you are a California resident, you have the right to: know what personal information we collect, request deletion of your data, and not be discriminated against for exercising these rights. We do not sell personal data as defined under the CCPA.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">10.</span>
                  Data Security
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    We implement appropriate technical and organizational measures to protect personal data from unauthorized access, loss, destruction, or alteration, including:
                  </p>
                  <ul className="body-text text-white/90 space-y-2">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>TLS/SSL encryption for data in transit</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Access restricted to authorized personnel only</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Monitoring and access logging</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Regular backups and disaster recovery procedures</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Periodic security reviews</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Compliance with the data security requirements set forth in Section 6 of the Meta Platform Terms</span></li>
                  </ul>
                </div>
              </div>

              {/* Section 11 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">11.</span>
                  Role of Automis in Data Processing
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    When delivering automation services on behalf of our Clients:
                  </p>
                  <ul className="body-text text-white/90 space-y-3 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">The Client is the Data Controller</span> with respect to end-users who interact with the Client's pages, profiles, phone lines, or forms.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <span className="font-bold">Automis acts as the Data Processor</span>, processing data solely according to the Client's instructions and in compliance with the contract and the Data Processing Agreement (DPA) signed between the parties.</span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    If you have questions about how a specific business processes your data through its Facebook/Instagram page, phone system, or website, please contact that business directly.
                  </p>
                </div>
              </div>

              {/* Section 12 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">12.</span>
                  Cookies
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Our website uses technically necessary cookies and, with your consent, analytics and profiling cookies. You can manage your cookie preferences through your browser settings or our cookie banner.
                  </p>
                </div>
              </div>

              {/* Section 13 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">13.</span>
                  References to Third-Party Policies
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    Data of users on third-party platforms is also processed by those platforms according to their own policies:
                  </p>
                  <ul className="body-text text-white/90 space-y-2 mb-4">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://www.facebook.com/terms/" target="_blank" rel="noopener noreferrer">Meta Terms of Service</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://help.instagram.com/581066165581870" target="_blank" rel="noopener noreferrer">Instagram Terms of Use</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer">Meta Platform Terms (Developers)</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://developers.facebook.com/devpolicy" target="_blank" rel="noopener noreferrer">Meta Developer Policies</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</Link> </span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span> <Link href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noopener noreferrer">ElevenLabs Privacy Policy</Link> </span></li>
                  </ul>
                  <p className="body-text text-white/90">
                    Our services do not replace or modify the policies of these platforms applicable to their users.
                  </p>
                </div>
              </div>

              {/* Section 14 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">14.</span>
                  Voice AI — Specific Disclosures
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-4">
                    When you interact with an AI voice agent operated by Automis on behalf of a Client:
                  </p>
                  <ul className="body-text text-white/90 space-y-2">
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>The call may be handled by an artificial intelligence system, not a human operator.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>The call may be recorded and/or transcribed for service delivery and quality purposes.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>You may request to speak with a human operator at any time.</span></li>
                    <li className="flex items-start"><span className="mr-3 mt-1">•</span><span>Call recordings are stored securely and retained for a limited period as described in Section 7. Retention periods are set by the Client and communicated in the Client's own Privacy Policy.</span></li>
                    <li className="flex items-start"> <span>Applicable laws regarding call recording consent vary by jurisdiction. Where required, the AI agent will inform the caller that the call is being recorded and will obtain verbal consent before proceeding.</span></li>
                  </ul>
                </div>
              </div>

              {/* Section 15 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">15.</span>
                  Changes to This Policy
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    We reserve the right to update this Privacy Policy at any time. Significant changes will be communicated through the website or via email. The date of the last update is indicated at the top of this document.
                  </p>
                </div>
              </div>

              {/* Section 16 */}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <span className="mr-3">16.</span>
                  Contact Us
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-2">
                    For any questions, requests, or complaints regarding this Privacy Policy:
                  </p>
                  <p className="body-text text-white/90 mb-2 font-semibold">
                    <span className="font-bold">Automis </span>  — AI & Marketing Agency
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
                    <span className="font-semibold">Website:</span>{" "}
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
                    <span className="">Registered address:</span> <span className="font-bold">  Harju maakond, Tallinn, Kesklinna linnaosa, Järvevana tee 9, 11314</span>
                  </p>
                  <p className="body-text text-white/90">
                    <span className="">Registration number:</span> <span className="font-bold"> 17179196 </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default PrivacyPolicy;