"use client";
import { useState, useEffect, useRef } from "react";
import {
  Laptop,
  Stethoscope,
  Home as HomeIcon,
  Store,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  FileDown,
  PlayCircle,
  CalendarDays,
  Globe,
} from "lucide-react";

// Signature gradient, kept local so this landing has zero cross-page deps.
const GRAD = "linear-gradient(120deg,#3C91E6 0%,#57C7E3 55%,#B4C2FF 100%)";

// Minimal self-contained scroll-reveal (IntersectionObserver + CSS).
function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// External destinations. BOOKING is the same placeholder used elsewhere on the
// site; swap for the live calendar once confirmed.
const VOICE = "https://voice.automis.ai";
const WEBSITE = "https://automis.ai";
const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/arcangelo-automis";

const NICHES = [
  { id: "clinic", label: "Dental & health clinics", icon: Stethoscope },
  { id: "online", label: "Online & service business", icon: Laptop },
  { id: "realestate", label: "Real estate", icon: HomeIcon },
  { id: "local", label: "Local business", icon: Store },
];

const CTAS = [
  {
    key: "playbooks",
    label: "Get the free AI Playbooks",
    sub: "Pick your niche · delivered to your inbox",
    icon: FileDown,
    href: "#playbooks",
    primary: true,
  },
  {
    key: "voice",
    label: "Test our Voice AI live",
    sub: "Hear the agent answer & qualify a call",
    icon: PlayCircle,
    href: VOICE,
    external: true,
  },
  {
    key: "call",
    label: "Book a free call",
    sub: "30 minutes, no pitch",
    icon: CalendarDays,
    href: BOOKING,
    external: true,
  },
  {
    key: "site",
    label: "Visit automis.ai",
    sub: "See what we build",
    icon: Globe,
    href: WEBSITE,
    external: true,
  },
];

export default function ArcangeloLanding() {
  const [niche, setNiche] = useState(null); // selected niche object
  const [step, setStep] = useState("pick"); // pick | form | done
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true });
    // Best-effort lead capture — the GHL workflow emails the matching playbook
    // and tags the contact. We confirm to the user regardless of the webhook.
    try {
      await fetch("/api/playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          niche: niche.id,
          niche_label: niche.label,
          newsletter: true,
          type: "playbook-lead-magnet",
          source: "arcangelo-ig-landing",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Playbook capture error", err);
    }
    setStatus({ loading: false });
    setStep("done");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#000a14]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: GRAD }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-5 py-12 sm:px-6 sm:py-16">
        {/* ---------- Hero ---------- */}
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11.5px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: GRAD, boxShadow: "0 0 10px rgba(87,199,227,0.7)" }}
              />
              Arcangelo · AI Automation
            </span>
            <h1 className="font-montserrat mt-6 text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.6rem]">
              I build the AI systems{" "}
              <span
                style={{
                  backgroundImage: GRAD,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                businesses are missing
              </span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              Daily AI, decoded for real owners, no hype. Grab the free playbooks, see our Voice AI
              live, or book a call.
            </p>
          </div>
        </Reveal>

        {/* ---------- The 4 CTAs ---------- */}
        <div className="mt-10 space-y-3">
          {CTAS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.key} delay={60 + i * 60}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-200 ${
                    c.primary
                      ? "border-[#3C91E6]/40 bg-[#3C91E6]/[0.10] hover:border-[#57C7E3]/60 hover:bg-[#3C91E6]/[0.16]"
                      : "border-white/[0.1] bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={
                      c.primary
                        ? { background: GRAD }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }
                    }
                  >
                    <Icon
                      className={c.primary ? "h-5 w-5 text-[#04101c]" : "h-5 w-5 text-[#8fe0f0]"}
                      strokeWidth={2}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15.5px] font-semibold text-white">{c.label}</span>
                    <span className="block text-[12.5px] text-white/45">{c.sub}</span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 flex-shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-white/70"
                    strokeWidth={2}
                  />
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Lead-magnet form ---------- */}
        <Reveal delay={120}>
          <div
            id="playbooks"
            className="mt-6 scroll-mt-6 overflow-hidden rounded-3xl border border-white/[0.1] bg-[#04101c]/70 backdrop-blur-md"
          >
            <div className="border-b border-white/[0.06] px-6 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-[#8fe0f0]">
                Free · 3 automations per niche
              </p>
              <h2 className="font-montserrat mt-1 text-[1.25rem] font-bold text-white">
                Get your free AI Playbook
              </h2>
            </div>

            <div className="p-6">
              {/* Step 1 — pick niche */}
              {step === "pick" && (
                <div>
                  <p className="text-[14px] text-white/55">Which one is your business?</p>
                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {NICHES.map((n) => {
                      const Icon = n.icon;
                      return (
                        <button
                          key={n.id}
                          onClick={() => {
                            setNiche(n);
                            setStep("form");
                          }}
                          className="flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 py-3.5 text-left transition-all duration-200 hover:border-[#3C91E6]/50 hover:bg-[#3C91E6]/[0.10]"
                        >
                          <Icon className="h-5 w-5 flex-shrink-0 text-[#57C7E3]" strokeWidth={2} />
                          <span className="text-[14px] font-medium text-white/85">{n.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2 — name + email */}
              {step === "form" && (
                <form onSubmit={submit}>
                  <button
                    type="button"
                    onClick={() => setStep("pick")}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/45 transition-colors hover:text-white/80"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2} /> {niche?.label}
                  </button>
                  <h3 className="mt-4 text-[15px] font-semibold text-white">
                    Where should I send it?
                  </h3>
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none transition-colors focus:border-[#3C91E6]"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none transition-colors focus:border-[#3C91E6]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                    style={{ background: GRAD }}
                  >
                    {status.loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send me the playbook <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-center text-[11.5px] leading-relaxed text-white/30">
                    You'll get the playbook plus occasional AI tips by email. No spam, unsubscribe anytime.
                  </p>
                </form>
              )}

              {/* Step 3 — done */}
              {step === "done" && (
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#57C7E3]/25 bg-[#57C7E3]/[0.08] px-3.5 py-1.5 text-[12px] font-semibold text-[#8fe0f0]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Ready
                  </span>
                  <h3 className="font-montserrat mt-5 text-[1.3rem] font-bold text-white">
                    Your {niche?.label} playbook
                  </h3>
                  <p className="mt-2 text-[14px] text-white/55">
                    Grab it now, and we've emailed a copy to{" "}
                    <b className="text-white/80">{email}</b>.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={`/assets/downloads/${niche.id}-ai-playbook.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-bold text-[#04101c] transition-transform hover:-translate-y-0.5"
                      style={{ background: GRAD }}
                    >
                      <FileDown className="h-4 w-4" strokeWidth={2.4} /> Download the full 7-page playbook
                    </a>
                    <a
                      href={`/assets/downloads/${niche.id}-cheatsheet.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-[14px] font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                    >
                      <FileDown className="h-4 w-4" strokeWidth={2} /> Also grab the 1-page cheat sheet
                    </a>
                  </div>
                  <div className="mt-6 border-t border-white/[0.08] pt-5">
                    <p className="text-[12.5px] text-white/40">While you're here:</p>
                    <div className="mt-3 flex flex-col gap-2.5">
                      <a
                        href={BOOKING}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-[13.5px] font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                      >
                        <CalendarDays className="h-4 w-4" strokeWidth={2} /> Book a free call
                      </a>
                      <a
                        href={VOICE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-[13.5px] font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                      >
                        <PlayCircle className="h-4 w-4" strokeWidth={2} /> Test our Voice AI live
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ---------- Footer ---------- */}
        <div className="mt-auto pt-12 text-center">
          <p className="text-[12px] text-white/35">
            Arcangelo · Co-founder{" "}
            <a href={WEBSITE} className="text-white/55 underline-offset-2 hover:underline">
              @automis.ai
            </a>{" "}
            · EU-hosted, privacy-first
          </p>
        </div>
      </div>
    </main>
  );
}
