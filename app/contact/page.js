"use client";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import { useState, useRef } from "react";
import Script from "next/script";
import { Mail, Phone, MapPin, Clock, Calendar, Send, Upload, CheckCircle, Linkedin, Instagram, Youtube, Twitter, ArrowRight, Sparkles, Star } from "lucide-react";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    file: null
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file: file
      });
    }
  };

  // Configure your webhook URL here
  const WEBHOOK_URL = ""; // Add your webhook URL here

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      // Prepare form data for webhook
      const webhookData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: "contact-form"
      };

      // Only send if webhook URL is configured
      if (WEBHOOK_URL) {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });

        if (!response.ok) {
          throw new Error(`Webhook error: ${response.status}`);
        }
      }

      // Show success state
      setFormStatus({ loading: false, success: true, error: null });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: null });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          file: null
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ 
        loading: false, 
        success: false, 
        error: 'Failed to send message. Please try again or contact us directly.' 
      });
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: null });
      }, 5000);
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' }
  ];

  const quickLinks = [
    { title: 'Get your AI Audit', href: '/jumpstart-audit', icon: '🎯' },
    { title: 'Our Services', href: '/', icon: '🚀' }
  ];

  const testimonials = [
    {
      name: "John Davis",
      role: "CEO, TechCorp",
      content: "Automis transformed our customer service with their AI solutions. Response times dropped by 70% and customer satisfaction soared.",
      rating: 5
    },
    {
      name: "Sarah Miller",
      role: "COO, RetailPlus",
      content: "The AI audit revealed opportunities we never knew existed. Implementation was smooth and ROI was evident within weeks.",
      rating: 5
    }
  ];

  const clientLogos = ["TechCorp", "RetailPlus", "FinanceHub", "HealthFirst", "EduTech"];

  return (
    <AkpagerLayout>
      {}
      <section className="relative min-h-[400px] bg-gradient-to-br from-section-dark to-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-darkest/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-darkest/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center px-4">
          <div className="text-center max-w-5xl mx-auto pt-48 pb-28">
            <h1
              className="hero-heading text-white mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-duration={1000}
            >
              Let's Talk About <br/> Growing Your Business
            </h1>
            <p
              className="sub-heading text-text-light max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={1000}
            >
              Ready to transform your business with AI? <br/> We're here to help you achieve remarkable growth.
            </p>
          </div>
        </div>

        {}
       <div className="absolute bottom-0 left-0 right-0">
  <svg
    className="w-full h-16 text-[#030C28]"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
  >
    <path
      d="M0,64 C480,150 960,-30 1440,64 L1440,120 L0,120 Z"
      fill="currentColor"
    ></path>
  </svg>
</div>

      </section>

      {}
      <section className="section-padding bg-[#030C28]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {}
            <div className="lg:col-span-7">
              <div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 shadow-lg"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                {formStatus.success && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-deep-blue mb-2">Message Sent Successfully!</h3>
                      <p className="text-base text-black">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {formStatus.error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-white text-sm">{formStatus.error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-semibold text-white mb-2">
                        Full Name <span className="text-bright-blue">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue transition-all duration-300 h-12"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-white mb-2">
                        Email <span className="text-bright-blue">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue transition-all duration-300 h-12"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-semibold text-white mb-2">
                        Phone <span className="text-white/90 text-xs">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue transition-all duration-300 h-12"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-white mb-2">
                        Company Name <span className="text-white/90 text-xs">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue transition-all duration-300 h-12"
                        placeholder="Your Company Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block small-text font-semibold text-white mb-2">
                      Subject <span className="text-bright-blue">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-middle/50 rounded-lg placeholder-text-muted text-white focus:outline-none focus:ring-2 focus:ring-blue-middle focus:border-blue-middle transition-all duration-300 hover:border-yellow-light/30"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block small-text font-semibold text-white mb-2">
                      Message <span className="text-bright-blue">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or requirements..."
                    />
                  </div>

                  <div>
                    <label className="block small-text font-semibold text-white mb-2">
                      Attach File <span className="text-white/90 text-xs">(optional - brief, screenshot, etc.)</span>
                    </label>
                    <div className="relative">
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="file"
                        name="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="file"
                        className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-blue-middle/30 rounded-lg cursor-pointer hover:border-yellow-light/50 transition-all duration-300 bg-white/5 hover:bg-yellow-light/10"
                      >
                        <Upload className="w-5 h-5 mr-2 text-blue-middle" />
                        <span className="body-text text-white/90">
                          {formData.file ? formData.file.name : "Click to upload file"}
                        </span>
                      </label>
                    </div>
                  </div>

                  {}
                  <div className="flex items-center space-x-2 p-4 bg-white/5 rounded-lg border border-border-light">
                    <input type="checkbox" id="recaptcha" className="w-4 h-4" required />
                    <label htmlFor="recaptcha" className="small-text text-white/90">
                      I'm not a robot
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className="w-full bg-bright-blue hover:bg-deep-blue text-white font-semibold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] min-h-[52px]"
                  >
                    {formStatus.loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-section-dark border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {}
                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-border-light backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {}
                    <a
                      href="mailto:info@automis.ai"
                      className="flex items-center space-x-3 text-white hover:text-yellow-light transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-yellow-light/20 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-yellow-light" />
                      </div>
                      <span className="body-text text-white">info@automis.ai</span>
                    </a>

                    {}
                    <div className="hidden md:block w-px h-8 bg-border-light"></div>

                    {}
                    <div className="flex items-center gap-3">
                      <div className="social-style-one flex flex-wrap gap-3 justify-center lg:justify-end">
              <a
                href="https://x.com/AutomisAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://www.instagram.com/automis.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://www.linkedin.com/company/automisai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href="https://www.facebook.com/automisai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="lg:col-span-5 space-y-8">

              {}
              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden shadow-xl hover:border-yellow-light/30 transition-all duration-300"
                data-aos="fade-left"
                data-aos-duration={1000}
              >
                <div className="bg-gradient-to-r from-blue-darkest to-blue-middle/50 p-6 text-center">
                  <Calendar className="w-12 h-12 text-yellow-light mx-auto mb-3" />
                  <h3 className="card-heading text-white mb-2">Want to skip the form?</h3>
                  <p className="body-text text-white/90">Book a call now.</p>
                </div>
                <div className="bg-white/5 p-2">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    className="w-full h-[500px] rounded-lg"
                    frameBorder="0"
                    scrolling="yes"
                  ></iframe>
                </div>
              </div>


              {}
              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-6 hover:border-yellow-light/30 transition-all duration-300"
                data-aos="fade-left"
                data-aos-delay={200}
                data-aos-duration={1000}
              >
                <h3 className="card-heading text-white mb-4">Quick Links & Resources</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-yellow-light/10 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{link.icon}</span>
                        <span className="body-text text-white font-medium">{link.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-yellow-light opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="section-heading text-white mb-4">Trusted By Industry Leaders</h2>
              <p className="body-text text-white/90">Join hundreds of businesses transforming with AI</p>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group hover:transform hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  data-aos-duration={1000}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-light text-yellow-light" />
                    ))}
                  </div>
                  <p className="body-text text-white/90 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-light to-blue-middle rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="body-text text-white font-semibold">{testimonial.name}</p>
                      <p className="small-text text-white/90">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {}
            {}
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default page;