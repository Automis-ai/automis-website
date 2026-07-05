import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertCircle, Check, Quote } from "lucide-react";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import FinalCta from "@/components/home/FinalCta";
import { Section, Reveal, Eyebrow, GRAD } from "@/components/home/_ui";
import ClientMark from "@/components/use-cases/ClientMark";
import { CASES, getCase } from "@/components/use-cases/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCase(params.slug);
  if (!c) return {};
  const url = `https://automis.ai/use-cases/${c.slug}`;
  const title = `${c.shortClient} | ${c.tag} case study — Automis`;
  const description = `${c.headline} ${c.summary}`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Automis", type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CaseStudyDetailPage({ params }) {
  const c = getCase(params.slug);
  if (!c) notFound();

  return (
    <AutomisEnShell>
      {/* Header */}
      <Section className="relative overflow-hidden bg-[#000a14] pt-24 md:pt-28" pad="pb-14 sm:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 opacity-45 blur-3xl"
            style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.24), transparent 70%)" }}
          />
        </div>
        <div className="relative z-10">
          <Reveal>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/60 transition-colors hover:text-[#8fe0f0]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Back to use cases
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ClientMark slug={c.slug} logo={c.logo} name={c.client} size="lg" />
              <Eyebrow>{c.tag}</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-display mt-6 max-w-[20ch] text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[2.6rem] md:text-[3rem]">
              {c.headline}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/[0.08] pt-6">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Client</div>
                <div className="mt-1 font-semibold text-white">{c.client}</div>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Industry</div>
                <div className="mt-1 font-semibold text-white">{c.industry}</div>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Location</div>
                <div className="mt-1 font-semibold text-white">{c.location}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Body */}
      <Section className="bg-[#020a12]" inner="max-w-3xl" pad="py-14 sm:py-16 md:py-20">
        {/* Challenge */}
        <Reveal>
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">The challenge</span>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-white/75">{c.challenge.lead}</p>
            <ul className="mt-6 space-y-4">
              {c.challenge.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#e2884f]" strokeWidth={1.9} />
                  <span className="text-[15px] leading-relaxed text-white/70">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* What we built */}
        <Reveal delay={80}>
          <div className="mt-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">What we built</span>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-white/75">{c.solution.lead}</p>
            <ul className="mt-6 space-y-4">
              {c.solution.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: GRAD }}>
                    <Check className="h-3 w-3 text-[#04101c]" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-white/70">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Results */}
        <Reveal delay={120}>
          <div className="mt-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">Results</span>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {c.results.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center">
                  <p
                    className="font-display text-[2rem] font-bold leading-none md:text-[2.3rem]"
                    style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                  >
                    {m.value}
                  </p>
                  <p className="mt-2.5 text-[12.5px] leading-snug text-white/55">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-white/45">{c.results.lead}</p>
          </div>
        </Reveal>

        {/* Pull quote (placeholder, pending client approval) */}
        <Reveal delay={140}>
          <figure className="card-gold group relative mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm">
            <Quote className="h-8 w-8 text-[#57C7E3]/30" strokeWidth={2} />
            <blockquote className="font-display mt-4 text-[1.35rem] leading-snug text-white/90 [text-wrap:balance] sm:text-[1.6rem]">
              &ldquo;{c.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[13px] text-white/45">{c.quoteAttribution}</figcaption>
          </figure>
        </Reveal>

        {/* Inline CTA */}
        <Reveal delay={160}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-[1.05rem] text-white/70">Want a system like this built for your business?</p>
            <a
              href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl px-6 py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5"
              style={{ background: GRAD }}
            >
              Book a discovery call
            </a>
          </div>
        </Reveal>
      </Section>

      <FinalCta />
    </AutomisEnShell>
  );
}
