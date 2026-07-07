"use client";

import { Fragment } from "react";
import { X, Check } from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

const comparisons = [
  {
    before: "67% of calls missed after hours",
    after: "Available 24/7, zero missed calls",
  },
  {
    before: "Team buried in repetitive questions",
    after: "Most questions handled by AI",
  },
  {
    before: "Unqualified leads passed to sales",
    after: "Only warm leads with verified budget",
  },
  {
    before: "Old databases left untouched",
    after: "Automatic re-activation of dormant leads",
  },
  {
    before: "Hiring a receptionist: ~€30,000/year",
    after: "Variable, scalable cost",
  },
  {
    before: "Response time: hours or days",
    after: "Instant response, in seconds",
  },
  {
    before: "No calls answered after 6pm",
    after: "Round-the-clock service, weekends included",
  },
  {
    before: "Hard to measure call ROI",
    after: "Detailed analytics on every interaction",
  },
];

export default function BeforeAfterSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="before-after"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-bright-blue/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="The contrast"
            title={
              <>
                Before and after <Grad>Automis</Grad>
              </>
            }
            subtitle="A clear comparison between the traditional way of working and the power of artificial intelligence."
          />
        </div>

        <div
          className={`av-gradient-border av-reveal mt-12 overflow-hidden rounded-2xl backdrop-blur-md ${
            visible ? "is-visible" : ""
          }`}
        >
          <div className="grid grid-cols-2">
            {/* Column headers */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] p-5 md:p-6">
              <X className="h-5 w-5 flex-shrink-0 text-white/40" strokeWidth={2.5} />
              <p className="font-montserrat text-base font-bold text-white/50 md:text-lg">
                Without Automis
              </p>
            </div>
            <div className="flex items-center gap-3 border-b border-bright-blue/20 bg-bright-blue/[0.07] p-5 md:p-6">
              <Check
                className="h-5 w-5 flex-shrink-0 text-bright-blue"
                strokeWidth={3}
              />
              <p className="font-montserrat text-base font-bold text-bright-blue md:text-lg">
                With Automis
              </p>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => {
              const last = index === comparisons.length - 1;
              return (
                <Fragment key={index}>
                  <div
                    className={`flex items-center gap-3 px-5 py-3.5 text-sm text-white/55 md:px-6 ${
                      last ? "" : "border-b border-white/[0.06]"
                    }`}
                  >
                    <X
                      className="h-4 w-4 flex-shrink-0 text-white/25"
                      strokeWidth={2.5}
                    />
                    <span>{row.before}</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 bg-bright-blue/[0.03] px-5 py-3.5 text-sm font-medium text-white/90 md:px-6 ${
                      last ? "" : "border-b border-bright-blue/10"
                    }`}
                  >
                    <Check
                      className="h-4 w-4 flex-shrink-0 text-bright-blue"
                      strokeWidth={3}
                    />
                    <span>{row.after}</span>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
