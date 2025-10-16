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
            {}
            <div className="text-center mb-12">
              <h1 className="hero-heading text-white mb-4">Privacy Policy</h1>
              <p className="sub-heading text-white/90 mb-0">
                <i className="fas fa-shield-alt mr-2"></i>
                Your privacy is our top priority
              </p>
            </div>

            <div className="">
              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-info-circle mr-3"></i>
                  Introduction
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8">
                  <p className="body-text text-white/90 mb-0">
                    <i className="fas fa-lock mr-2"></i>
                    We respect your privacy and are committed to protecting your
                    personal information. This Privacy Policy explains how we
                    collect, use, and protect your data in compliance with the{" "}
                    <Link
                      href="https://gdpr-info.eu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      General Data Protection Regulation (GDPR)
                    </Link>{" "}
                    and the{" "}
                    <Link
                      href="https://oag.ca.gov/privacy/ccpa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      California Consumer Privacy Act (CCPA)
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-database mr-3"></i>
                  Data Collection
                </h2>
                <p className="body-text text-white/90 mb-6">
                  We may collect the following personal information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Name", icon: "fa-user" },
                    { title: "Email address", icon: "fa-envelope" },
                    { title: "Phone number", icon: "fa-phone" },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group flex items-center">
                        <div className="w-12 h-12 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                          <i className={`fas ${item.icon} text-blue-middle group-hover:text-yellow-light text-xl`}></i>
                        </div>
                        <span className="body-text text-white">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="body-text text-white/90 mt-6">
                  <i className="fas fa-info-circle mr-3"></i>
                  This data is collected when you request a call from our AI
                  system to test our services.
                </p>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-tasks mr-3"></i>
                  How We Use Your Data
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { text: "Schedule AI demo calls", icon: "fa-calendar" },
                    { text: "Provide customer support", icon: "fa-headset" },
                    { text: "Improve our services", icon: "fa-chart-line" },
                    {
                      text: "Comply with legal obligations",
                      icon: "fa-shield-alt",
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group flex items-center">
                        <div className="w-12 h-12 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                          <i className={`fas ${item.icon} text-blue-middle group-hover:text-yellow-light text-xl`}></i>
                        </div>
                        <span className="body-text text-white">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-gavel mr-3"></i>
                  Legal Basis for Data Processing (GDPR)
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 mb-8">
                  <h3 className="card-heading text-white mb-4">Legal Basis:</h3>
                  <ul className="list-none mb-0">
                    <li className="mb-4 flex items-center">
                      <div className="w-8 h-8 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-check-circle text-blue-middle"></i>
                      </div>
                      <div className="body-text text-white/90">
                        <span className="text-white font-semibold">Consent:</span> You
                        provide consent for us to contact you.
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="w-8 h-8 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-check-circle text-blue-middle"></i>
                      </div>
                      <div className="body-text text-white/90">
                        <span className="text-white font-semibold">
                          Legitimate Interest:
                        </span>{" "}
                        We use data to improve our services.
                      </div>
                    </li>
                  </ul>
                </div>

                <h3 className="sub-heading text-white mb-6">
                  <i className="fas fa-user-shield mr-3"></i>
                  Your GDPR Rights:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Access, rectify, or delete your personal data",
                    "Restrict or object to data processing",
                    "Data portability",
                    "Withdraw consent at any time",
                  ].map((right, index) => (
                    <div key={index}>
                      <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group flex items-center">
                        <div className="w-12 h-12 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fas fa-shield-alt text-blue-middle group-hover:text-yellow-light text-xl"></i>
                        </div>
                        <span className="body-text text-white">{right}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-6">
                  <i className="fas fa-balance-scale mr-3"></i>
                  Your CCPA Rights
                </h2>
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8">
                  <p className="body-text text-white/90 mb-6">
                    If you are a California resident, you have the right to:
                  </p>
                  <ul className="list-none mb-0">
                    {[
                      "Know what personal information is collected",
                      "Request deletion of your data",
                      "Opt out of the sale of your personal data (we do not sell personal data)",
                    ].map((right, index) => (
                      <li
                        key={index}
                        className="mb-4 flex items-center"
                      >
                        <div className="w-8 h-8 bg-blue-middle/20 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-check-square text-blue-middle"></i>
                        </div>
                        <span className="body-text text-white/90">{right}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {}
              <div className="mb-12">
                <h2 className="section-heading text-white mb-8">
                  <i className="fas fa-shield-alt mr-3"></i>
                  Security & Data Handling
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-lock text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Data Security</h3>
                      <p className="body-text text-white/90 mb-0">
                        We implement appropriate measures to protect your
                        personal data from unauthorized access, loss, or misuse.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-cookie text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Cookies</h3>
                      <p className="body-text text-white/90 mb-0">
                        We may use cookies to enhance your experience. You can
                        control cookies through your browser settings.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-share-alt text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Third-Party Sharing</h3>
                      <p className="body-text text-white/90 mb-0">
                        We do not sell or share your personal data with third
                        parties, except for essential service providers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div>
                <h2 className="section-heading text-white mb-8">
                  <i className="fas fa-envelope mr-3"></i>
                  Contact & Updates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-envelope text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Contact Us</h3>
                      <p className="body-text text-white/90 mb-6">
                        For questions or to exercise your rights, contact us at:
                      </p>
                      <a
                        href="mailto:support@automis.ai"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-light text-bg-primary rounded-lg font-semibold hover:bg-yellow-dark transition-all duration-300"
                      >
                        <i className="fas fa-envelope"></i>
                        support@automis.ai
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group h-full">
                      <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-light/20 transition-all duration-300">
                        <i className="fas fa-bell text-blue-middle group-hover:text-yellow-light text-2xl"></i>
                      </div>
                      <h3 className="card-heading text-white mb-4">Policy Updates</h3>
                      <p className="body-text text-white/90 mb-0">
                        <i className="fas fa-info-circle mr-3"></i>
                        We may update this policy periodically. You will be
                        notified of any significant changes.
                      </p>
                    </div>
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

export default PrivacyPolicy;
