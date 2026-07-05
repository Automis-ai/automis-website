"use client";
import { useState, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import { GRAD } from "@/components/home/_ui";

/*
  Contact form for the rebuilt /contact page (new EN design system).
  Ports the fields + submit contract from the old page:
    POST /api/contact  (JSON) -> n8n webhook. Same payload shape kept intact.
  Kept as a "use client" child so the page itself can stay a server component.
*/

const FIELD =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder-white/35 outline-none transition-colors duration-300 focus:border-[#3C91E6]/60 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#3C91E6]/40";
const LABEL = "mb-2 block text-[13px] font-medium text-white/75";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const timerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      // Same payload contract the old form posted to /api/contact.
      const webhookData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: "contact-form",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      setFormStatus({ loading: false, success: true, error: null });

      timerRef.current = setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: null });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
      }, 4000);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        loading: false,
        success: false,
        error:
          "Failed to send message. Please try again or email us at info@automis.ai.",
      });
      timerRef.current = setTimeout(() => {
        setFormStatus((s) => ({ ...s, error: null }));
      }, 6000);
    }
  };

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
      {formStatus.success && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#57C7E3]/30 bg-[#57C7E3]/[0.08] p-4">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#57C7E3]" />
          <div>
            <p className="text-[15px] font-semibold text-white">Message sent</p>
            <p className="text-[14px] text-white/60">
              Thanks. We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {formStatus.error && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/[0.12] p-4">
          <p className="text-[14px] text-white/90">{formStatus.error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={LABEL}>
              Full name <span className="text-[#3C91E6]">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={FIELD}
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label htmlFor="email" className={LABEL}>
              Email <span className="text-[#3C91E6]">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={FIELD}
              placeholder="jane@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className={LABEL}>
              Phone <span className="text-white/40">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={FIELD}
              placeholder="+1 (555) 123 4567"
            />
          </div>
          <div>
            <label htmlFor="company" className={LABEL}>
              Company <span className="text-white/40">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={FIELD}
              placeholder="Your company"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className={LABEL}>
            Subject <span className="text-[#3C91E6]">*</span>
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className={FIELD}
            placeholder="How can we help?"
          />
        </div>

        <div>
          <label htmlFor="message" className={LABEL}>
            Message <span className="text-[#3C91E6]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`${FIELD} resize-none`}
            placeholder="Tell us about your business and what you're trying to solve..."
          />
        </div>

        <button
          type="submit"
          disabled={formStatus.loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold text-[#04101c] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: GRAD }}
        >
          {formStatus.loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#04101c]/40 border-t-[#04101c]" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send message</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-center text-[12px] text-white/40">
          We reply within 24 hours. No spam, ever.
        </p>
      </form>
    </div>
  );
}
