import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
const page = () => {
  return (
    <AkpagerLayout>
      {}
      <section
        className="relative overflow-hidden bg-bg-primary hero-padding"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span
              className="inline-flex items-center gap-2 bg-blue-darkest/30 backdrop-blur-lg text-blue-middle px-6 py-3 rounded-xl small-text font-medium mb-6 border border-blue-middle/20"
              data-aos="fade-up"
              data-aos-duration={1500}
            >
              <i className="fas fa-blog" />
              Insights & Updates
            </span>

            <h1
              className="hero-heading mb-6"
              data-aos="fade-up"
              data-aos-delay={100}
              data-aos-duration={1500}
            >
              <span className="text-white">Discover Our</span>{' '}
              <span className="text-text-blue">
                Latest Insights
              </span>
            </h1>

            <p
              className="sub-heading text-white/90 mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={1500}
            >
              Explore expert articles on AI-powered marketing, automation strategies,
              and <br/> growth tactics to transform your business
            </p>

            <div
              className="flex flex-wrap gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={1500}
            >

        {}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-middle/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-lightest/5 rounded-full filter blur-3xl"></div>
        </div>

        {}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary pointer-events-none"></div>

<div
  className="absolute inset-0 opacity-[0.02]"
  style={{
    backgroundImage: "url(assets/images/backgrounds/wave-shape.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
/>
</section>

<section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="px-4 lg:w-2/3">
              <div className="space-y-8">
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-duration={800}
                  data-aos-delay={100}
                  data-aos-offset={50}
                >
                  <div className="relative overflow-hidden h-80">
                    <img
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
                      alt="AI Automations for Business - Scale Without Adding Staff"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <ul className="flex flex-wrap items-center gap-4 mb-4">
                      <li>
                        <a className="px-3 py-1 bg-blue-middle/20 text-blue-middle rounded-full hover:bg-yellow-light/20 hover:text-yellow-light transition-all duration-300" href="#">
                          AI Automation
                        </a>
                      </li>
                      <li className="block items-center gap-2 text-white/90">
                        <i className="far fa-calendar-alt" />
                        <a href="#" className="ml-2 hover:text-blue-middle transition-all duration-300">January 2025</a>
                      </li>
                    </ul>
                    <h3 className="card-heading font-medium mb-4 max-w-7xl mx-auto">
                      <Link href="/blog/ai-automations" className="text-white hover:text-yellow-light transition-all duration-300">
                        AI Automations <br/> Scale Without Adding Staff
                      </Link>
                    </h3>
                    <p className="body-text text-white/90 mb-6 leading-relaxed">
                      AI automations connect your CRM, calendar, ads, and communication tools into a seamless system. Save hours every week, reduce human error, and scale faster with AI-powered efficiency.
                    </p>
                    <Link href="/blog/ai-automations" className="inline-flex items-center gap-2 text-blue-middle hover:text-yellow-light transition-all duration-300 font-medium group">
                      Read More <i className="far fa-arrow-right transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-duration={800}
                  data-aos-delay={200}
                  data-aos-offset={50}
                >
                  <div className="relative overflow-hidden h-80">
                    <img
                      src="https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=800&h=600&fit=crop"
                      alt="Voice AI Receptionists – 24/7 Call Answering & Booking"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <ul className="flex flex-wrap items-center gap-4 mb-4">
                      <li>
                        <a className="px-3 py-1 bg-blue-middle/20 text-blue-middle rounded-full hover:bg-yellow-light/20 hover:text-yellow-light transition-all duration-300" href="#">
                          Voice AI
                        </a>
                      </li>
                      <li className="block items-center gap-2 text-white/90">
                        <i className="far fa-calendar-alt" />
                        <a href="#" className="ml-2 hover:text-blue-middle transition-all duration-300">January 2025</a>
                      </li>
                    </ul>
                    <h3 className="card-heading font-medium mb-4">
                      <Link href="/blog/voice-ai-receptionists" className="text-white hover:text-yellow-light transition-all duration-300">
                        Voice AI Receptionists <br/> The Future of Customer Calls & Bookings
                      </Link>
                    </h3>
                    <p className="body-text text-white/90 mb-6 leading-relaxed">
                      Discover how Voice AI Receptionists answer calls 24/7, qualify leads, and book more appointments. Never miss a call again with AI-powered receptionists.
                    </p>
                    <Link href="/blog/voice-ai-receptionists" className="inline-flex items-center gap-2 text-blue-middle hover:text-yellow-light transition-all duration-300 font-medium group">
                      Read More <i className="far fa-arrow-right transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-duration={800}
                  data-aos-delay={300}
                  data-aos-offset={50}
                >
                  <div className="relative overflow-hidden h-80">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                      alt="AI-Optimized Paid Ads | Smarter Campaigns, More Bookings"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <ul className="flex flex-wrap items-center gap-4 mb-4">
                      <li>
                        <a className="px-3 py-1 bg-blue-middle/20 text-blue-middle rounded-full hover:bg-yellow-light/20 hover:text-yellow-light transition-all duration-300" href="#">
                          Paid Ads
                        </a>
                      </li>
                      <li className="block items-center gap-2 text-white/90">
                        <i className="far fa-calendar-alt" />
                        <a href="#" className="ml-2 hover:text-blue-middle transition-all duration-300">January 2025</a>
                      </li>
                    </ul>
                    <h3 className="card-heading font-medium mb-4">
                      <Link href="/blog/ai-optimized-paid-ads" className="text-white hover:text-yellow-light transition-all duration-300">
                        AI-Optimized Paid Ads <br/> From Clicks to Bookings
                      </Link>
                    </h3>
                    <p className="body-text text-white/90 mb-6 leading-relaxed">
                      Run paid ads powered by AI. Automis campaigns optimize bidding, creative, and follow-up to turn ad spend into booked calls — not just leads.
                    </p>
                    <Link href="/blog/ai-optimized-paid-ads" className="inline-flex items-center gap-2 text-blue-middle hover:text-yellow-light transition-all duration-300 font-medium group">
                      Read More <i className="far fa-arrow-right transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 lg:w-1/3">
              <div className="space-y-8 mt-0 lg:mt-0">
                <div
                  className="relative bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-8 rounded-2xl overflow-hidden hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-left"
                  data-aos-delay={400}
                  data-aos-duration={800}
                  data-aos-offset={50}
                >
                  <h3 className="sub-heading font-medium text-white mb-4 relative z-10">Ready to Transform Your Business with AI?</h3>
                  <p className="body-text text-white/90 mb-6 relative z-10">
                    Book a free consultation to discover how AI automations can help you scale faster and more efficiently.
                  </p>
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    external={true}
                    variant="primary"
                    size="medium"
                    icon="fas fa-angle-double-right"
                    className="relative z-10"
                  >
                    Book Discovery Call
                  </CTAButton>
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30">
                    <img src="assets/images/widget/cta-man.png" alt="Call-to-action promotional graphic" className="w-full h-full object-contain opacity-60" loading="lazy" />
                  </div>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "url(assets/images/widget/cta-bg.png)",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};
export default page;
