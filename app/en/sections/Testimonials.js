"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

const testimonials = [
  {
    rating: 5,
    text: "In 6 months we re-activated leads we'd written off as lost, winning back a significant amount of business. The AI calls with a consistency my team could never match.",
    author: "Mark Reynolds",
    role: "CEO, Real Estate — London",
  },
  {
    rating: 5,
    text: "Zero missed calls. Patients book even at 11pm and the calendar fills itself. Revenue up around €6,000/month.",
    author: "Dr. Julia Bennett",
    role: "Dental Practice — Manchester",
  },
  {
    rating: 5,
    text: "We cut no-shows by about 40%. The AI manages bookings during service, when no one can pick up the phone.",
    author: "Luke Ferris",
    role: "Restaurant — Dublin",
  },
];

export default function TestimonialsSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="testimonials"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute -top-24 left-0 h-80 w-80 rounded-full bg-warm-yellow/8 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Social proof"
            title={
              <>
                Businesses that <Grad>trust us</Grad>
              </>
            }
            subtitle="See how companies are transforming the way they handle customers with Automis Voice AI."
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {testimonials.map((item, index) => (
            <figure
              key={item.author}
              className={`av-gradient-border av-reveal relative flex flex-col rounded-2xl p-7 backdrop-blur-md ${
                visible ? "is-visible" : ""
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <Quote
                className="absolute right-6 top-6 h-8 w-8 text-bright-blue/15"
                strokeWidth={1.5}
              />
              <div className="mb-4 flex gap-1 text-warm-yellow">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="flex-1 font-open-sans text-[0.95rem] italic leading-relaxed text-white/85">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="font-montserrat text-sm font-bold text-white">
                  {item.author}
                </p>
                <p className="font-plex-mono text-xs uppercase tracking-wide text-soft-blue/70">
                  {item.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
