"use client";

import { useEffect } from "react";
import Link from "next/link";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import CTAButton from "@/components/CTAButton";

const TermsOfService = () => {
  useEffect(() => {
    document.querySelector("body").classList.add("home-nine");
  }, []);

  return (
    <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>

      <section className="hero-padding bg-bg-primary relative z-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-20">
            {}
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">Terms of Service</h1>
              <p className="sub-heading text-white/90">
                <i className="fas fa-file-contract mr-2"></i>
                Please read these terms carefully
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-info-circle mr-3"></i>
                  Introduction
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    By accessing and using our website and services, you agree
                    to the following terms and conditions. These Terms of
                    Service (TOS) govern the use of our Voice AI solutions for
                    businesses.
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-cogs mr-3"></i>
                  Services Provided
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "Handling inbound and outbound calls",
                    "Booking appointments",
                    "Answering customer queries",
                  ].map((service, index) => (
                    <div key={index}>
                      <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 h-full hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                        <div className="flex items-center mb-4">
                          <h3 className="card-heading text-white">{service}</h3>
                        </div>
                        <p className="body-text text-white/90">
                          Voice AI solutions optimized for your business needs
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-user-shield mr-3"></i>
                  User Obligations
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    By using our services, you agree not to misuse the platform.
                    You are responsible for providing accurate information,
                    including email and phone numbers for demo requests.
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-lock mr-3"></i>
                  Privacy
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Your personal information will be handled as described in
                    our
                    <Link href="/privacy-policy" className="text-blue-middle hover:text-yellow-light mx-1 transition-all duration-300">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-credit-card mr-3"></i>
                  Payment
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    If you choose to use any paid services, you agree to the
                    terms of payment outlined on our platform.
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-exclamation-triangle mr-3"></i>
                  Use Restrictions
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    Users may not use our services for illegal purposes or
                    unauthorized activities, including spam, fraud, or abusive
                    behavior.
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-shield-alt mr-3"></i>
                  Limitation of Liability
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    We are not liable for any damages arising from your use of
                    our services. Our platform is provided "as is," and we do
                    not guarantee uninterrupted service.
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-ban mr-3"></i>
                  Termination
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    We reserve the right to terminate or suspend access to our
                    services if you violate any of these terms.
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-sync mr-3"></i>
                  Changes to the Terms
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    We may update these terms from time to time. Any changes
                    will be posted on this page, and continued use of our
                    services constitutes acceptance of the updated terms.
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-gavel mr-3"></i>
                  Governing Law
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90">
                    These Terms of Service are governed by the laws of Estonia.
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6 flex items-center">
                  <i className="fas fa-envelope mr-3"></i>
                  Contact Us
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                  <p className="body-text text-white/90 mb-6">
                    For any questions or concerns about these Terms of Service,
                    please contact us at:
                  </p>
                  <CTAButton
                    href="mailto:support@automis.ai"
                    variant="primary"
                    size="medium"
                    external
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    support@automis.ai
                  </CTAButton>
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
