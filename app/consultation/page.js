import AutomisEnShell from "@/components/site/AutomisEnShell";
import { Section, Reveal, Eyebrow, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import BookingEmbed from "@/components/contact/BookingEmbed";
import { Coffee, Compass, ShieldCheck, Check } from "lucide-react";

export const metadata = {
  title: "Book a Consultation | Just Want to Talk?, Automis",
  description:
    "No forms, no pressure. Book a free 30-minute call with Automis to talk through your business and where AI could actually help. Just a conversation.",
  alternates: { canonical: "https://automis.ai/consultation" },
  openGraph: {
    title: "Book a Consultation | Just Want to Talk?, Automis",
    description:
      "No forms, no pressure. Book a free 30-minute call to talk through your business and where AI could actually help.",
    url: "https://automis.ai/consultation",
    siteName: "Automis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation with Automis",
    description: "No forms, no pressure. Just a conversation about your business and AI.",
  },
};

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const REASSURANCE = [
  {
    icon: Coffee,
    title: "No pressure",
    desc: "A relaxed 30-minute conversation. No slides, no hard sell, no obligation to buy anything.",
  },
  {
    icon: Compass,
    title: "Clear direction",
    desc: "We map where your business loses time and money and point you at the AI opportunities worth chasing.",
  },
  {
    icon: ShieldCheck,
    title: "Straight answers",
    desc: "If AI isn't the right move for you yet, we'll tell you. Honest guidance over a pitch, every time.",
  },
];

export default function ConsultationPage() {
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
          <div className="mx-auto max-w-3xl pt-32 pb-10 text-center sm:pt-36 md:pt-40">
            <Reveal immediate>
              <Eyebrow>Just want to talk?</Eyebrow>
            </Reveal>
            <Reveal delay={80} immediate>
              <h1 className="font-display mx-auto mt-6 max-w-[16ch] text-[2.4rem] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[3.2rem] md:text-[3.6rem]">
                Let's just have a <GradientText>conversation</GradientText>.
              </h1>
            </Reveal>
            <Reveal delay={160} immediate>
              <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/65 md:text-[1.15rem]">
                No forms to fill in, no commitment. Book a free 30-minute call and we'll talk through
                your business and where AI could actually help.
              </p>
            </Reveal>
            <Reveal delay={240} immediate>
              <div className="mt-8 flex justify-center">
                <InteractiveHoverButton
                  href={BOOKING}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="solid"
                  text="Book a free call"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reassurance points */}
      <Section inner="max-w-5xl" pad="pt-4 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {REASSURANCE.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="card-gold h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "rgba(60,145,230,0.14)" }}
                >
                  <item.icon className="h-5 w-5 text-[#57C7E3]" />
                </span>
                <h3 className="font-display mt-4 text-[1.2rem] text-white">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Booking calendar */}
      <Section id="book" inner="max-w-3xl" pad="pt-6 pb-16 sm:pb-20 md:pb-24">
        <Reveal>
          <div className="mb-6 text-center">
            <h2 className="font-display text-[1.6rem] leading-tight text-white sm:text-[2rem]">
              Pick a time that works for you
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-white/60">
              Choose a slot below and you'll get instant confirmation. That's it.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <BookingEmbed />
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-[13px] text-white/50">
            <Check className="h-4 w-4 text-[#57C7E3]" strokeWidth={2.4} />
            Prefer to write first? Use the{" "}
            <a href="/contact" className="text-[#57C7E3] underline-offset-4 hover:underline">
              contact form
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </AutomisEnShell>
  );
}
