"use client";
import { useState } from "react";
import AkpagerAccordion from "./AkpagerAccordion";

const FAQSection = ({
  faqs = [],
  sectionTitle = "Got Questions? We've Got Answers!",
  sectionSubtitle = "FAQs",
  sectionDescription = "We know you might have some questions. That's why we've put together this list of common queries. If you don't see your question here, feel free to reach out!",
  sectionId = "faqs",
  iconClass = "fas fa-usd-square",
  bgColor = "bg-bg-primary",
  accentColor = "#FEC458"
}) => {
  const [active, setActive] = useState("");

  return (
    <section
      id={sectionId}
      className={`${bgColor} py-24`}
    >
      <div className="max-w-7xl container mx-auto px-4">
        <div className="flex flex-wrap lg:gap-x-16 -mx-4">
          <div className="w-full lg:w-5/12 px-4 mb-12 lg:mb-0">
            <div
              className="faq-left-content"
              data-aos="fade-left"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="section-title mb-8">
                <span
                  className="font-semibold mb-4 block text-sm"
                  style={{ color: accentColor }}
                >
                  <i className={`${iconClass} mr-2`} />
                  {sectionSubtitle}
                </span>
                <h2 className="text-4xl font-bold text-white mb-6">
                  {sectionTitle}
                </h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                {sectionDescription}
              </p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-duration={800}
                data-aos-delay={index * 100}
              >
                <AkpagerAccordion
                  title={faq.question}
                  event={`collapse${index + 1}`}
                  onClick={() =>
                    setActive(active === `collapse${index + 1}` ? "" : `collapse${index + 1}`)
                  }
                  active={active}
                >
                  {faq.answer}
                </AkpagerAccordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;