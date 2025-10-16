import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTAButton from "@/components/CTAButton";
import FAQSection from "@/components/FAQSection";

const blogPosts = {
  "ai-automations": {
    title: "AI Automations <br/> Scale Without Adding Staff",
    metaTitle: "AI Automations for Business | CRM, Workflows & Lead Nurture",
    metaDescription: "Scale faster with AI automations. Connect CRM, calendar, ads, and follow-ups with Automis workflows. Save time, cut costs, and boost booked appointments.",
    author: "Automis Team",
    date: "January 2025",
    category: "AI Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    content: {
      intro: "AI automations connect your CRM, calendar, ads, and communication tools into a seamless system. Instead of relying on staff to follow up manually, Automis builds AI-driven workflows that qualify leads, book appointments, and send reminders automatically. Businesses save hours every week, reduce human error, and scale faster with AI-powered efficiency. For appointment-based businesses, it's the difference between lost leads and steady growth.",
      sections: [
        {
          type: "heading",
          level: 2,
          content: "What Are AI Automations?"
        },
        {
          type: "paragraph",
          content: "AI automations are smart workflows that replace repetitive manual tasks with machine-driven processes. Instead of staff manually copying leads, sending reminders, and updating CRMs, automations do all of it instantly and reliably. Automis builds end-to-end systems linking ads, CRM, calendar, and communication tools so no lead is wasted."
        },
        {
          type: "heading",
          level: 2,
          content: "Why Businesses Need Automations"
        },
        {
          type: "list",
          items: [
            "**Speed is everything**: 70% of leads go cold if not contacted within 5 minutes",
            "**Staff workload is costly**: 10–20 hours/week wasted on admin",
            "**Consistency wins**: AI ensures every lead gets the same fast, high-quality experience"
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "How AI Automations Work (Step-by-Step)"
        },
        {
          type: "numbered-list",
          items: [
            "Lead captured from ads/forms",
            "Instant qualification by AI receptionist or chatbot",
            "CRM sync with HubSpot, Salesforce, GoHighLevel",
            "Booking into calendar",
            "Reminders via SMS, email, WhatsApp",
            "Follow-up sequences until conversion"
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Key Benefits of AI Automations"
        },
        {
          type: "benefits-grid",
          items: [
            { icon: "fa-clock", title: "Save Time", desc: "10–20 hours/week" },
            { icon: "fa-chart-line", title: "Improve Conversion", desc: "30–40% more bookings" },
            { icon: "fa-money-bill-wave", title: "Cut Costs", desc: "Less admin staff" },
            { icon: "fa-expand", title: "Scalable", desc: "50 or 5,000 leads" },
            { icon: "fa-check-double", title: "Data Accuracy", desc: "100% automated sync" },
            { icon: "fa-lightbulb", title: "Better Insights", desc: "Real-time analytics" }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Use Cases by Industry"
        },
        {
          type: "use-cases",
          items: [
            {
              title: "Healthcare",
              icon: "fa-heartbeat",
              description: "Patient intake, confirmations, reminders",
              image: "https://images.unsplash.com/photo-1559328002-7092c0b3b50a?w=600&h=400&fit=crop"
            },
            {
              title: "Home Services",
              icon: "fa-tools",
              description: "Job scheduling, dispatch, reminders",
              image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
            },
            {
              title: "Real Estate",
              icon: "fa-home",
              description: "Instant call-backs, persistent follow-ups, showing bookings",
              image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
            }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Cost Comparison – Manual vs Automated"
        },
        {
          type: "table",
          headers: ["Task", "Manual Staff", "With AI Automation"],
          rows: [
            ["Lead follow-up", "5–10 mins each", "Instant, 24/7"],
            ["CRM entry", "Error-prone", "Automated sync"],
            ["Reminders", "Manual texts/calls", "Automated multi-channel"],
            ["Monthly cost", "$3K–$5K staff", "$200–$500 tools"]
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Case Study – Automating Patient Follow-Ups"
        },
        {
          type: "case-study",
          title: "California MedSpa lost 40% of ad leads. After Automis automations:",
          metrics: [
            { value: "100%", label: "leads contacted in <1 min" },
            { value: "65%", label: "Bookings (from 35%)" },
            { value: "15", label: "staff hours saved weekly" },
            { value: "2x", label: "ROI in 60 days" }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Best Tools & Stacks (2025 Edition)"
        },
        {
          type: "tools-grid",
          categories: [
            {
              title: "Workflow Tools",
              tools: [
                "Make – advanced workflows",
                "Zapier – easy setup",
                "n8n – open-source custom",
                "Automis Voice AI & Chat"
              ]
            },
            {
              title: "CRMs",
              tools: [
                "HubSpot",
                "GoHighLevel",
                "Salesforce",
                "Custom integrations available"
              ]
            }
          ]
        }
      ]
    },
    faqs: [
      {
        question: "What tasks can I automate?",
        answer: "Lead capture, CRM entry, reminders, rescheduling, follow-ups, reporting."
      },
      {
        question: "Do automations replace staff?",
        answer: "No, they augment staff."
      },
      {
        question: "Is data secure?",
        answer: "Yes, GDPR/HIPAA-adjacent compliant."
      },
      {
        question: "How fast is ROI?",
        answer: "10–30 days."
      }
    ],
    tags: [],
    relatedPosts: []
  },
  "voice-ai-receptionists": {
    title: "Voice AI Receptionists <br/> The Future of Customer Calls & Bookings",
    metaTitle: "Voice AI Receptionists | 24/7 Call Answering & Booking",
    metaDescription: "Discover how Voice AI Receptionists answer calls 24/7, qualify leads, and book more appointments. Never miss a call again with AI-powered receptionists.",
    author: "Automis Team",
    date: "January 2025",
    category: "Voice AI",
    image: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=800&h=600&fit=crop",
    content: {
      intro: "A Voice AI receptionist is an AI-powered phone agent that answers every call 24/7, qualifies leads, and books appointments directly into your CRM. Unlike human staff or call centers, Voice AI ensures no missed calls, faster response times, and higher lead-to-booking conversion rates. It's the most reliable way for appointment-based businesses — like dentists, HVAC services, and real estate agencies — to scale without extra staffing costs.",
      sections: [
        {
          type: "heading",
          level: 2,
          content: "What Is a Voice AI Receptionist?"
        },
        {
          type: "paragraph",
          content: "A Voice AI receptionist is an intelligent voice agent powered by conversational AI that can manage inbound and outbound phone calls. Instead of relying on human staff, the AI answers every call instantly, handles routine questions, and books or reschedules appointments. Unlike basic IVR systems, Voice AI is natural-sounding, conversational, and context-aware."
        },
        {
          type: "heading",
          level: 2,
          content: "Why Businesses Need Voice AI Receptionists"
        },
        {
          type: "paragraph",
          content: "Missed calls = lost revenue. Studies show 40–60% of inbound calls are missed in healthcare and home services during peak hours. A single missed call in HVAC can mean losing a $500+ job. In real estate, a cold lead becomes worthless if not contacted within 5 minutes. Voice AI ensures zero missed opportunities. Compared to staff or call centers, it is cheaper, faster, and scalable."
        },
        {
          type: "heading",
          level: 2,
          content: "How Voice AI Receptionists Work"
        },
        {
          type: "list",
          items: [
            "**Call Answering & Routing** – Greets callers, handles FAQs, routes urgent calls.",
            "**Lead Qualification & Booking** – Collects details, qualifies leads, books directly into CRM.",
            "**CRM & Calendar Integration** – Syncs with GoHighLevel, HubSpot, Salesforce, Google Calendar."
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Key Benefits of Voice AI Receptionists"
        },
        {
          type: "benefits-grid",
          items: [
            { icon: "fa-clock", title: "24/7 Availability", desc: "Never miss a call again" },
            { icon: "fa-rocket", title: "Faster Lead-to-Booking", desc: "Instant response & booking" },
            { icon: "fa-dollar-sign", title: "Reduced Staff Costs", desc: "Save 80% vs. traditional staff" },
            { icon: "fa-expand-arrows-alt", title: "Scalable for Any Business", desc: "Handle 50 or 5,000 calls" },
            { icon: "fa-chart-bar", title: "Data & Insights", desc: "Track every interaction" }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Use Cases by Industry"
        },
        {
          type: "use-cases",
          items: [
            {
              title: "Healthcare",
              icon: "fa-heartbeat",
              description: "Booking & reminders with HIPAA-adjacent setup",
              image: "https://images.unsplash.com/photo-1559328002-7092c0b3b50a?w=600&h=400&fit=crop"
            },
            {
              title: "Home Services",
              icon: "fa-tools",
              description: "Books urgent jobs instantly, reduces downtime",
              image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
            },
            {
              title: "Real Estate",
              icon: "fa-home",
              description: "Acts as an instant ISA, booking showings directly",
              image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
            }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Cost Comparison – AI vs. Live Receptionists"
        },
        {
          type: "table",
          headers: ["Feature", "Live Receptionist", "Call Center", "Voice AI Receptionist"],
          rows: [
            ["Availability", "9–5 (weekdays)", "24/7", "24/7"],
            ["Cost (per year)", "$35K–$50K", "$1.50+/min", "$500-$1000/month"],
            ["Speed to Answer", "3–5 rings", "2–3 rings", "Instant"],
            ["Lead Qualification", "Variable", "Limited", "Consistent, scripted"],
            ["Integration with CRM", "Manual", "Rare", "Native + Automated"],
            ["Scalability", "Low", "Medium", "High"]
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Case Study – Dental Office with Voice AI"
        },
        {
          type: "case-study",
          title: "A California dental clinic struggled with 40% missed calls. After deploying Automis Voice AI:",
          metrics: [
            { value: "100%", label: "calls answered" },
            { value: "30%", label: "more appointments booked" },
            { value: "$3,000", label: "/month saved" },
            { value: "5★", label: "patient satisfaction" }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "How to Optimize Call Flows for Voice AI"
        },
        {
          type: "numbered-list",
          items: [
            "Define qualification script",
            "Integrate CRM/calendar",
            "Set handover rules",
            "Use dashboards for optimization",
            "Add reminders"
          ]
        }
      ]
    },
    faqs: [
      {
        question: "What is a Voice AI Receptionist?",
        answer: "An AI-powered phone agent that answers calls 24/7, qualifies leads, and books appointments directly in your CRM."
      },
      {
        question: "Can it integrate with my CRM?",
        answer: "Yes, with all major CRMs and calendars."
      },
      {
        question: "Is it cost-effective?",
        answer: "Much cheaper than staff or call centers."
      },
      {
        question: "Will it replace my staff?",
        answer: "No, it augments them by handling repetitive tasks."
      }
    ],
    tags: [],
    relatedPosts: []
  },
  "ai-optimized-paid-ads": {
    title: "AI-Optimized Paid Ads <br/> From Clicks to Bookings",
    metaTitle: "AI-Optimized Paid Ads | Smarter Campaigns, More Bookings",
    metaDescription: "Run paid ads powered by AI. Automis campaigns optimize bidding, creative, and follow-up to turn ad spend into booked calls — not just leads.",
    author: "Automis Team",
    date: "January 2025",
    category: "Paid Ads",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    content: {
      intro: "AI-Optimized Paid Ads use artificial intelligence to run smarter campaigns that reduce wasted spend and increase booked appointments. Instead of measuring clicks or impressions, Automis builds campaigns that track performance down to calls and bookings. From smart bidding to AI-driven creative testing and CRM integrations, businesses get more revenue from the same ad spend.",
      sections: [
        {
          type: "heading",
          level: 2,
          content: "What Are AI-Optimized Paid Ads?"
        },
        {
          type: "paragraph",
          content: "AI-Optimized Paid Ads are campaigns enhanced with machine learning algorithms and automation to reduce wasted spend, increase targeting accuracy, and improve conversion rates."
        },
        {
          type: "paragraph",
          content: "Unlike traditional paid ads that measure success with clicks, impressions, or vanity metrics, AI-optimized campaigns are designed to measure what really matters: appointments booked and revenue generated."
        },
        {
          type: "paragraph",
          content: "At Automis, we go beyond standard automation features in Google Ads or Meta Advantage+. We build end-to-end ad systems that link:"
        },
        {
          type: "list",
          items: [
            "Ad campaigns (Google, Meta, TikTok, LinkedIn)",
            "CRM (HubSpot, GoHighLevel, Salesforce)",
            "AI receptionists (Voice & Chat)",
            "Analytics dashboards"
          ]
        },
        {
          type: "paragraph",
          content: "This ensures ad dollars are fully traceable from click → lead → call → booking."
        },
        {
          type: "heading",
          level: 2,
          content: "Why Businesses Need AI in Ads"
        },
        {
          type: "heading",
          level: 3,
          content: "Rising Ad Costs:"
        },
        {
          type: "list",
          items: [
            "Google and Meta CPCs are up 30–50% in the past 3 years.",
            "Without optimization, businesses pay more for less.",
            "AI optimizes bidding to reduce wasted spend and improve cost-per-lead."
          ]
        },
        {
          type: "heading",
          level: 3,
          content: "Leads Wasted Without Follow-Up:"
        },
        {
          type: "list",
          items: [
            "50%+ of leads from ads are wasted because they are not contacted in time",
            "AI connects ads directly with Voice AI receptionists, ensuring instant lead contact."
          ]
        },
        {
          type: "heading",
          level: 3,
          content: "Lack of Attribution"
        },
        {
          type: "paragraph",
          content: "Traditional reporting stops at \"leads generated.\" With AI + CRM integration, we show true ROI: cost per appointment, not cost per lead."
        },
        {
          type: "heading",
          level: 2,
          content: "How AI-Optimized Paid Ads Work"
        },
        {
          type: "numbered-list",
          items: [
            "Campaign Setup – AI analyzes audience data for optimal targeting.",
            "Smart Bidding – Real-time bid adjustments.",
            "Dynamic Creative – AI tests headlines, images, CTAs.",
            "Lead Handoff – Leads routed to AI receptionist or chatbot.",
            "Attribution – CRM integration tracks ad → call → booking."
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Key Benefits of AI-Optimized Paid Ads"
        },
        {
          type: "benefits-grid",
          items: [
            { icon: "fa-dollar-sign", title: "Lower Cost Per Appointment", desc: "Smarter bidding means less wasted spend" },
            { icon: "fa-chart-line", title: "Full-Funnel Attribution", desc: "Track from ad spend to booked call" },
            { icon: "fa-expand", title: "Scalable Campaigns", desc: "Expand budgets only when ROI is proven" },
            { icon: "fa-tachometer-alt", title: "Shorter Sales Cycle", desc: "Leads contacted instantly convert faster" },
            { icon: "fa-magic", title: "Better Creative Performance", desc: "AI continuously optimizes ad copy and visuals" }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Use Cases by Industry"
        },
        {
          type: "use-cases",
          items: [
            {
              title: "Healthcare",
              icon: "fa-heartbeat",
              description: "Ads optimized for new patient bookings",
              image: "https://images.unsplash.com/photo-1559328002-7092c0b3b50a?w=600&h=400&fit=crop"
            },
            {
              title: "Home Services",
              icon: "fa-tools",
              description: "Ads scale with technician capacity",
              image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
            },
            {
              title: "Real Estate",
              icon: "fa-home",
              description: "AI-optimized buyer/seller campaigns + instant ISA follow-up",
              image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
            }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Cost Comparison – Traditional vs AI-Optimized Ads"
        },
        {
          type: "table",
          headers: ["Feature", "Traditional Ads", "AI-Optimized Ads"],
          rows: [
            ["Targeting", "Manual rules", "AI-driven segmentation"],
            ["Bidding", "Fixed", "Real-time smart bidding"],
            ["Creative Testing", "Manual A/B", "Continuous multivariate"],
            ["Attribution", "Click-based", "Booking-based"],
            ["ROI Visibility", "Limited", "Full-funnel view"]
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Case Study – Scaling Real Estate Campaigns"
        },
        {
          type: "paragraph",
          content: "Real estate agency spent $15K/month on Facebook ads."
        },
        {
          type: "case-study",
          title: "Results after implementing Automis AI-optimized ads:",
          metrics: [
            { value: "$100", label: "CPL (from $150)" },
            { value: "20%", label: "booked showings (from 10%)" },
            { value: "2.5x", label: "ROI in 60 days" },
            { value: "$15K", label: "monthly ad spend" }
          ]
        },
        {
          type: "heading",
          level: 2,
          content: "Best AI Ad Strategies (2025)"
        },
        {
          type: "list",
          items: [
            "AI Smart Bidding (Google Ads, Meta Advantage+)",
            "Dynamic Ad Creation with generative AI",
            "AI Audience Segmentation",
            "Automated Rule-Based Scaling",
            "CRM + Ads Integration for attribution"
          ]
        }
      ]
    },
    faqs: [
      {
        question: "Can AI lower my ad costs?",
        answer: "Yes, AI optimizes bidding to reduce spend."
      },
      {
        question: "Do AI ads work for small budgets?",
        answer: "Yes, even $2K–$3K/month campaigns benefit."
      },
      {
        question: "How do you track ROI?",
        answer: "By connecting CRM to ad data, showing booked appointments."
      },
      {
        question: "Do I lose control to AI?",
        answer: "No, AI works within your rules; you keep oversight."
      }
    ],
    tags: [],
    relatedPosts: []
  }
};


export async function generateMetadata({ params }) {
  const post = blogPosts[params.slug];

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found."
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

const BlogPostPage = ({ params }) => {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  const renderContent = (section) => {
    switch (section.type) {
      case "heading":
        const HeadingTag = `h${section.level}`;
        return (
          <HeadingTag className={section.level === 2 ? "section-heading text-white mb-6" : "card-heading text-white mb-3 mt-6"}>
            {section.content}
          </HeadingTag>
        );

      case "paragraph":
        return (
          <p className="body-text text-white/90 mb-6">
            {section.content}
          </p>
        );

      case "list":
        return (
          <ul className="space-y-3 mb-6">
            {section.items.map((item, index) => (
              <li key={index} className="text-white/90 flex items-start">
                <i className="far fa-check-circle text-yellow-light mr-3 mt-1 flex-shrink-0" />
                <span className="body-text" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        );

      case "numbered-list":
        return (
          <ol className="space-y-3 mb-6 list-decimal list-inside">
            {section.items.map((item, index) => (
              <li key={index} className="text-white/90 body-text">
                {item}
              </li>
            ))}
          </ol>
        );

      case "benefits-grid":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {section.items.map((benefit, index) => (
              <div key={index} className="group bg-blue-middle/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-6 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                  <i className={`far ${benefit.icon} text-blue-middle group-hover:text-yellow-light text-xl transition-all duration-300`} />
                </div>
                <h3 className="card-heading text-white mb-2">{benefit.title}</h3>
                <p className="body-text text-white/90">{benefit.desc}</p>
              </div>
            ))}
          </div>
        );

      case "use-cases":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {section.items.map((useCase, index) => (
              <div key={index} className="group relative overflow-hidden bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-blue-middle/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-light/20 transition-all duration-300">
                    <i className={`far ${useCase.icon} text-blue-middle group-hover:text-yellow-light text-xl transition-all duration-300`} />
                  </div>
                  <h3 className="card-heading text-white mb-2">{useCase.title}</h3>
                  <p className="body-text text-white/90">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "table":
        return (
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-blue-middle/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden">
              <thead className="bg-blue-middle/30">
                <tr>
                  {section.headers.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-white font-medium">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-middle/20">
                {section.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-yellow-light/10 transition-colors">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`px-6 py-4 ${cellIndex === row.length - 1 ? 'text-yellow-light font-medium' : 'text-white/90'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "case-study":
        return (
          <div className="bg-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 mb-8">
            <h3 className="card-heading text-white mb-4">{section.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-medium text-yellow-light mb-2">{metric.value}</div>
                  <div className="small-text text-white/90">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "tools-grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {section.categories.map((category, index) => (
              <div key={index} className="bg-blue-middle/20 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-6">
                <h3 className="card-heading text-white mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex} className="text-white/90 flex items-start">
                      <i className="far fa-check-circle text-yellow-light mr-3 mt-1" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AkpagerLayout>
      {}
      <section
        className="hero-padding bg-bg-primary relative z-1 bgs-cover text-center"
        style={{
          backgroundImage: `url(${post.image || '/assets/images/backgrounds/banner.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {}
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="relative">
            <h2
              className="hero-heading text-white mb-6 "
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            <div
              className="text-yellow-light text-lg"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              {post.category}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            {}
            <div className="px-4 lg:w-full max-w-4xl mx-auto">
              <div>
                {}
                <div className="mb-8">
                  <p className="body-text text-white/90">
                    {post.content.intro}
                  </p>
                </div>

                {}
                {post.content.sections.map((section, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={50}>
                    {renderContent(section)}
                  </div>
                ))}

                {}
                <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay={100}>
                  <div className="bg-gradient-to-r from-blue-middle/20 to-blue-lightest/20 backdrop-blur-lg border border-blue-middle/30 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
                    <h2 className="section-heading text-white mb-4">
                      Ready to Transform Your Business?
                    </h2>
                    <p className="body-text text-white/90 mb-8 max-w-xl mx-auto">
                      Discover how our AI-powered solutions can help you scale faster, convert more leads, and automate your business operations.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                        external={true}
                        variant="primary"
                        size="large"
                      >
                        Book Discovery Call
                      </CTAButton>
                      
                    </div>
                  </div>
                </div>

                {}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="mt-12">
                    <FAQSection
                      sectionTitle="Frequently Asked Questions"
                      sectionSubtitle="FAQs"
                      sectionDescription=""
                      iconClass="fas fa-robot"
                      bgColor="bg-black"
                      accentColor="var(--blue-middle)"
                      faqs={post.faqs}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default BlogPostPage;