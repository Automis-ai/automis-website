import AutomisEnShell from "@/components/site/AutomisEnShell";
import FinalCta from "@/components/home/FinalCta";
import { Section, Reveal, Eyebrow, GradientText } from "@/components/home/_ui";
import ContactForm from "@/components/contact/ContactForm";
import ContactAside from "@/components/contact/ContactAside";

export const metadata = {
  title: "Contact Automis | Talk to a Strategic AI Automation Partner",
  description:
    "Get in touch with Automis. Send us a message or book a 30-minute discovery call and we'll show you where AI can win back time, calls, and revenue for your business.",
  alternates: {
    canonical: "https://automis.ai/contact",
    languages: {
      en: "https://automis.ai/contact",
      "it-IT": "https://automis.ai/it/contact",
      "x-default": "https://automis.ai/contact",
    },
  },
  openGraph: {
    title: "Contact Automis | Talk to a Strategic AI Automation Partner",
    description:
      "Send us a message or book a discovery call. We'll map where your business loses time and money, then build the AI systems to fix it.",
    url: "https://automis.ai/contact",
    siteName: "Automis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Automis",
    description:
      "Send us a message or book a discovery call with a strategic AI automation partner.",
  },
};

export default function ContactPage() {
  return (
    <AutomisEnShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#000a14]">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[380px] w-[760px] -translate-x-1/2 opacity-50 blur-3xl"
            style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.26), transparent 70%)" }}
          />
        </div>
        <div className="container relative z-10 mx-auto px-5 sm:px-6">
          <div className="mx-auto max-w-3xl pt-32 pb-12 text-center sm:pt-36 md:pt-40">
            <Reveal immediate>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <Reveal delay={80} immediate>
              <h1 className="font-display mx-auto mt-6 max-w-[18ch] text-[2.4rem] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[3.2rem] md:text-[3.6rem]">
                Let's talk about the <GradientText>system you're missing</GradientText>.
              </h1>
            </Reveal>
            <Reveal delay={160} immediate>
              <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/65 md:text-[1.15rem]">
                Send us a message or grab a time on the calendar. We'll map where your business
                loses time and money, then show you the AI opportunities worth building.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Form + aside */}
      <Section inner="max-w-6xl" pad="pt-4 pb-16 sm:pb-20 md:pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={100}>
            <ContactAside />
          </Reveal>
        </div>
      </Section>

      <FinalCta />
    </AutomisEnShell>
  );
}
