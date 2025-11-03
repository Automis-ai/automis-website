"use client";
import dynamic from "next/dynamic";
import AkpagerAccordion from "@/components/AkpagerAccordion";
import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import { Tab, Nav } from "@/components/CustomTabs";
import { useEffect, useState, useRef } from "react";
import PricingSection from "./PricingSection";
import WaveformPlayer from "./WaveformPlayer";
import FreeTestCallForm from "./DemoForm";
import FAQSection from "@/components/FAQSection";
import CTAButton from "@/components/CTAButton";
const FixedCta = dynamic(() => import("./FixedCta"), {
  ssr: false,
});

const page = () => {
  useEffect(() => {
    document.querySelector("body").classList.add("home-nine");
  }, []);
  const tabOneRef = useRef(null);
  const tabTwoRef = useRef(null);
  return (
    <AkpagerLayout header={8} footer={1} bodyClass={"home-nine"}>
      <style jsx>{`
        @media (max-width: 1023px) {
          .hero-text-align {
            text-align: center !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-text-align {
            text-align: left !important;
          }
        }
      `}</style>
      <section id="home" className="hero-padding bg-deep-blue relative z-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div
                className="hero-content style-nine mb-100 lg:mb-0 hero-width hero-text-align"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <h2
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1500"
                  data-aos-offset="50"
                  className="hero-heading !text-5xl text-white font-montserrat"
                >
                  <span>
                    Instantly <br className="sm:hidden" />
                    Convert{" "}
                    <span className="text-text-blue">
                      Leads <br />
                    </span>
                  </span>
                  Into <span className="text-text-blue">Appointments</span>
                </h2>

                <p
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                  className="sub-heading text-white/90 mb-4 max-w-xl mt-2"
                >
                  Engage Leads, Schedule Appointments, Support Your Customers
                  24/7 with Advanced Voice AI Solutions{" "}
                </p>
                <p className="body-text !text-text-muted">
                  Built For You, Not By You
                </p>
                <div className="flex justify-center lg:justify-start">
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    variant="secondary"
                    size="medium"
                    external={true}
                    className="w-fit mt-8"
                  >
                    Book Discovery Call
                  </CTAButton>
                </div>
              </div>
            </div>
            <div
              className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0"
              data-aos="fade-up"
              data-aos-delay={100}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="hero-nine-image relative mx-auto w-full max-w-[500px] lg:max-w-[600px]">
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 rounded-full border border-border-light"></div>
                  <div className="absolute inset-[15%] rounded-full border border-border-light"></div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] max-w-[350px]">
                    <WaveformPlayer />
                  </div>

                  <div className="shapes">
                    <div
                      className="shape one absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{ top: "8%", left: "8%" }}
                      data-aos="zoom-in-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/shapes/hero-nine6-old.png"
                        alt="Shape"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape two absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{ top: "8%", right: "8%" }}
                      data-aos="zoom-in-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/shapes/hero-nine2.png"
                        alt="Shape"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape three absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{
                        top: "50%",
                        left: "-2%",
                        transform: "translateY(-50%)",
                      }}
                      data-aos="zoom-in-left"
                      data-aos-delay={100}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/shapes/hero-nine3.png"
                        alt="Shape"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape four absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{
                        top: "50%",
                        right: "-2%",
                        transform: "translateY(-50%)",
                      }}
                      data-aos="zoom-in-right"
                      data-aos-delay={100}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/shapes/hero-nine4.png"
                        alt="Shape"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape five absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{ bottom: "15%", left: "5%" }}
                      data-aos="zoom-in-left"
                      data-aos-delay={200}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/shapes/hero-nine5.png"
                        alt="Shape"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="shape six absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      style={{ bottom: "15%", right: "5%" }}
                      data-aos="zoom-in-right"
                      data-aos-delay={200}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/shapes/hero-nine6.png"
                        alt="Shape"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-nine-shapes">
          <div className="shape one">
            <img
              src="assets/images/shapes/hero-nine.png"
              alt="Background decorative shape"
              loading="lazy"
              className="!bg-transparent"
            />
          </div>
          <div className="shape two">
            <img
              src="assets/images/shapes/hero-nine.png"
              alt="Background decorative shape"
              loading="lazy"
              className="!bg-transparent"
            />
          </div>
        </div>
      </section>

      <section id="services" className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center">
            <div
              className="w-full xl:w-7/12 lg:w-9/12 md:w-11/12"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="text-center mb-12">
                <span className="text-yellow-light font-semibold mb-3 block small-text">
                  <i className="flaticon-layers" /> Why Automis?
                </span>
                <h2
                  className="section-heading text-white"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  Effortlessly Manage Leads and Bookings with 24/7 AI Assistance
                </h2>
              </div>
            </div>
          </div>
          <Tab.Container defaultActiveKey="tabTwo1">
            <div
              className="flex justify-center"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="w-full lg:w-10/12 flex justify-center">
                <Nav
                  as="ul"
                  className="nav advanced-tab mb-12 flex"
                  role="tablist"
                >
                  <Nav.Item as="li">
                    <Nav.Link as="button" eventKey="tabTwo1">
                      OUTBOUND
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link as="button" eventKey="tabTwo3">
                      INBOUND
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>

            <Tab.Content>
              <Tab.Pane
                ref={tabOneRef}
                eventKey="tabTwo1"
                className="tab-pane fade"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between max-w-6xl mx-auto">
                  <div className="w-full lg:w-[60%] mb-8 lg:mb-0 order-1 lg:order-1">
                    <div
                      className="content pr-0 lg:pr-12 text-center lg:!text-left"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <div className="mb-6">
                        <h3 className="sub-heading text-white text-center lg:!text-left">
                          Instantly call all your generated leads and turn them
                          into appointments
                        </h3>
                      </div>
                      <p className="body-text text-white/90 mb-8 text-center lg:!text-left">
                        Save time through efficient scheduling, allowing you to
                        focus on closing deals and growing your business.
                      </p>
                      <ul className="space-y-3 mb-8 text-center lg:!text-left">
                        <li className="flex items-center justify-center lg:justify-start body-text text-text-light">
                          <i className="fal fa-check text-yellow-light mr-3" />{" "}
                          Increase Appointment Booking Rate by 18%
                        </li>
                        <li className="flex items-center justify-center lg:justify-start body-text text-text-light">
                          <i className="fal fa-check text-yellow-light mr-3" />{" "}
                          Time-Saving with Efficient Scheduling
                        </li>
                      </ul>
                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
                        variant="primary"
                        size="small"
                        external={true}
                      >
                        Book Discovery Call
                      </CTAButton>
                    </div>
                  </div>
                  <div className="w-full lg:w-[40%] order-2 lg:order-2">
                    <div
                      className="flex justify-center lg:justify-end !bg-transparent"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/tabs/tab-two.png"
                        alt="AI Voice Assistant managing outbound calls interface"
                        className="w-full max-w-[350px] rounded-lg hidden lg:block"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              <Tab.Pane
                ref={tabTwoRef}
                eventKey="tabTwo3"
                className="tab-pane fade"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between  max-w-6xl mx-auto">
                  <div className="w-full lg:w-[60%] mb-8 lg:mb-0 order-1 lg:order-1">
                    <div className="content pr-0 lg:pr-12 text-center lg:!text-left">
                      <div className="mb-6">
                        <h3 className="sub-heading text-white text-center lg:!text-left">
                          Your AI receptionist available 24/7 to handle bookings
                          and inquiries
                        </h3>
                      </div>
                      <p className="body-text text-white/90 mb-8 text-center lg:!text-left">
                        Manage bookings effortlessly while addressing customer
                        inquiries, so you can focus on growing your business and
                        improving customer satisfaction.
                      </p>
                      <ul className="space-y-3 mb-8 text-center lg:!text-left">
                        <li className="flex items-center justify-center lg:justify-start body-text text-text-light">
                          <i className="fal fa-check text-yellow-light mr-3" />{" "}
                          24/7 automated booking management
                        </li>
                        <li className="flex items-center justify-center lg:justify-start body-text text-text-light">
                          <i className="fal fa-check text-yellow-light mr-3" />{" "}
                          Quick responses to customer inquiries
                        </li>
                      </ul>
                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
                        variant="primary"
                        size="small"
                        external={true}
                      >
                        Book Discovery Call
                      </CTAButton>
                    </div>
                  </div>
                  <div className="w-full lg:w-[40%] order-2 lg:order-2">
                    <div className="hidden lg:flex justify-center lg:justify-end !bg-transparent">
                      <img
                        src="assets/images/tabs/tab-inbound.png"
                        alt="AI receptionist handling inbound calls and bookings interface"
                        className="w-full max-w-[350px] rounded-lg hidden lg:block"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>

      <section
        id="cases"
        className="section-padding bg-bg-primary relative z-20"
        style={{
          backgroundImage: "url(assets/images/backgrounds/wave-shape.png)",
        }}
      >
        <div className="max-w-7xl container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full xl:w-3/4 lg:w-11/12">
              <div
                className="text-center mb-12"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <h2 className="section-heading text-white mb-4">
                  Industries <br className="sm:hidden" /> We Serve
                </h2>
                <p className="sub-heading text-white/90">
                  Automis AI is purpose-built for any appointment-driven
                  business that can't afford to miss a call.Our 24/7 voice AI
                  receptionist plugs into your existing calendar and CRM to
                  instantly convert every lead into a booked appointment—day or
                  night, in 20+ languages.
                </p>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <div className="flex flex-wrap justify-center -mx-4">
              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/tooth.svg"
                        alt="Dental and healthcare industry icon"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Dental & Healthcare
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      24/7 live call-answering and fully automated appointment
                      booking
                      <br /> HIPAA-ready handling of patient data
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/house.svg"
                        alt="Home services and interventions industry icon"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Home Services & Interventions
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Emergency-call capture for plumbers, electricians, HVAC
                      <br />
                      Real-time two-way calendar sync to maximize technician
                      utilization
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/houses.svg"
                        alt="Real estate industry icon"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Real Estate
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      After-hours property tour scheduling for every single
                      inquiry
                      <br />
                      Hot-lead alerts routed to your top agents
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/hand.svg"
                        alt="Beauty and wellness industry icon"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Beauty & Wellness
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Smart, automated bookings for salons, spas, and
                      med-aesthetic clinics
                      <br />
                      No-show reduction with call/SMS confirmations
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/car.svg"
                        alt="Automotive and repair industry icon"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      Automotive & Repair
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Live dispatch for breakdowns, MOTs, routine service and
                      urgent repair calls
                      <br />
                      Dynamic slot-optimization – to boost bay throughput
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div
                className="w-full xl:w-1/3 md:w-1/2 px-4 mb-8 flex"
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <img
                        src="/assets/images/icon-box/handshake.svg"
                        alt="White-label and agencies partnership icon"
                        className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h4 className="card-heading text-white mb-3 group-hover:text-yellow-light transition-colors duration-300">
                      White-Label & Agencies
                    </h4>
                    <p className="body-text text-white/90 group-hover:text-text-light transition-colors duration-300">
                      Fully brandable voice-AI receptionist you can resell under
                      your own name
                      <br />
                      Plug-and-play integration — no coding, no extra headcount
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="analytics"
        className="section-padding bg-section-dark"
        style={{ backgroundImage: "url(assets/images/backgrounds/tab.png)" }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center text-center">
            <div
              className="w-full xl:w-2/3 lg:w-3/4 md:w-11/12"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="mb-12" data-aos="fade-up" data-aos-duration="800">
                <h2 className="section-heading text-white text-center mb-6">
                  Command at a Glance with Our Intuitive{" "}
                  <span className="text-yellow-light">Dashboard</span>
                </h2>
                <p className="sub-heading text-white/90 text-center">
                  Get access to a personalized analytics dashboard where you can
                  easily track call logs, measure performance, and monitor all
                  activity in real time. Stay on top of everything in one
                  convenient place.
                </p>
              </div>
            </div>
          </div>
          <Tab.Container defaultActiveKey={"tabThree1"}>
            <Nav
              as={"ul"}
              className="nav advanced-tab style-three mt-12 mb-16 flex flex-wrap justify-center"
              role="tablist"
            >
              <Nav.Item
                as={"li"}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-offset="50"
              >
                <Nav.Link as={"button"} eventKey="tabThree1">
                  <span className="icon">
                    <i className="far fa-phone-alt" />
                  </span>
                  <span>Monitor All Activity</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                as={"li"}
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
                data-aos-offset="50"
              >
                <Nav.Link as={"button"} eventKey="tabThree2">
                  <span className="icon">
                    <i className="far fa-sack-dollar" />
                  </span>
                  <span>Track Call Logs</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                as={"li"}
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="1000"
                data-aos-offset="50"
              >
                <Nav.Link as={"button"} eventKey="tabThree3">
                  <span className="icon">
                    <i className="far fa-chart-line" />
                  </span>
                  <span>Measure Performance </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="tab-content">
              <Tab.Pane className="tab-pane fade" eventKey="tabThree1">
                <div className="flex flex-wrap items-center justify-around">
                  <div className="w-full xl:w-1/3 lg:w-5/12 mb-8 lg:mb-0 order-1 lg:order-1">
                    <div
                      className="content pr-0 lg:pr-8 text-center lg:!text-left"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <div className="mb-5">
                        <h3 className="sub-heading text-white text-2xl md:text-3xl">
                          Stay Informed with Real-Time Monitoring
                        </h3>
                      </div>
                      <p className="body-text text-white/90 mb-6">
                        Stay Ahead by Monitoring Interactions and System
                        Activity in Real-Time, All in One Place
                      </p>
                      <ul className="space-y-4 my-8">
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Track all ongoing interactions from one unified
                            dashboard.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Receive alerts and notifications ensuring seamless
                            operations.
                          </span>
                        </li>
                      </ul>
                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
                        variant="primary"
                        size="medium"
                        external={true}
                      >
                        Book Discovery Call
                      </CTAButton>
                    </div>
                  </div>
                  <div className="w-full lg:w-7/12 mb-8 lg:mb-0 order-2 lg:order-2 mt-8 md:mt-12 lg:mt-0">
                    <div
                      className="tab-image pl-0 lg:pl-8"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/dashboard/image-3.png"
                        alt="AI Voice Assistant performance monitoring dashboard"
                        className="dashboard-image w-full h-auto max-w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane className="tab-pane fade" eventKey="tabThree2">
                <div className="flex flex-wrap items-center justify-around">
                  <div className="w-full xl:w-1/3 lg:w-5/12 mb-8 lg:mb-0 order-1 lg:order-1">
                    <div
                      className="content pr-0 lg:pr-8 text-center lg:!text-left"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <div className="mb-5">
                        <h3 className="sub-heading text-white text-2xl md:text-3xl">
                          Access Detailed Logs for Every Conversation
                        </h3>
                      </div>
                      <p className="body-text text-white/90 mb-6">
                        Efficiently Track and Manage Every Call with Detailed
                        Logs and Advanced Search Filter
                      </p>
                      <ul className="space-y-4 my-8">
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            View and search call histories
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Download and filter logs
                          </span>
                        </li>
                      </ul>
                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
                        variant="primary"
                        size="medium"
                        external={true}
                      >
                        Book Discovery Call
                      </CTAButton>
                    </div>
                  </div>
                  <div className="w-full lg:w-7/12 mb-8 lg:mb-0 order-2 lg:order-2 mt-8 md:mt-12 lg:mt-0">
                    <div
                      className="tab-image pl-0 lg:pl-8"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/dashboard/image-1.png"
                        alt="Call logs and conversation tracking dashboard"
                        className="dashboard-image w-full h-auto max-w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane className="tab-pane fade" eventKey="tabThree3">
                <div className="flex flex-wrap items-center justify-around">
                  <div className="w-full lg:w-7/12 mb-8 lg:mb-0 order-1 lg:order-1">
                    <div
                      className="tab-image pr-0 lg:pr-8"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="assets/images/dashboard/image-2.png"
                        alt="KPI tracking and analytics insights dashboard"
                        className="dashboard-image w-full h-auto max-w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 lg:w-5/12 mb-8 lg:mb-0 order-2 lg:order-2 mt-8 md:mt-12 lg:mt-0">
                    <div
                      className="content pl-0 lg:pl-8 text-center lg:!text-left"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <div className="mb-5">
                        <h3 className="sub-heading text-white text-2xl md:text-3xl">
                          Track KPIs and Optimize with Actionable Insights
                        </h3>
                      </div>
                      <p className="body-text text-white/90 mb-6">
                        Gain Valuable Insights into Key Metrics to Continuously
                        Improve Your Voice AI Performance
                      </p>
                      <ul className="space-y-4 my-8">
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Monitor key metrics such as CRR and CSAT.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fal fa-check text-yellow-light mt-1 mr-3 flex-shrink-0" />
                          <span className="body-text text-text-light">
                            Identify successes with visual reports and trend
                            analysis.
                          </span>
                        </li>
                      </ul>
                      <CTAButton
                        href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
                        variant="primary"
                        size="medium"
                        external={true}
                      >
                        Book Discovery Call
                      </CTAButton>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>

      <section
        id="about"
        className="section-padding bg-bg-primary relative overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center">
            <div className="w-full xl:w-2/3 lg:w-11/12">
              <div
                className="text-center mb-12"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <h2 className="section-heading text-white mb-4">
                  AI vs Humans:
                </h2>
                <p className="sub-heading text-white/90">
                  Revolutionizing Customer Engagement and Operational Efficiency
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center -mx-4">
            <div className="w-full xl:w-5/12 md:w-full px-4 mb-8">
              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border-2 border-yellow-light rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-yellow-light/20"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <h4 className="card-heading text-yellow-light mb-4">
                    Artificial intelligence
                  </h4>
                  <ul className="space-y-2.5">
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-robot text-yellow-light mr-2.5 w-5" />
                      Low run cost
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-clock text-yellow-light mr-2.5 w-5" />
                      Available 24/7
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-bolt text-yellow-light mr-2.5 w-5" />
                      Instant booking ability
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-clipboard-check text-yellow-light mr-2.5 w-5" />
                      Stick to instructions
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-chart-line text-yellow-light mr-2.5 w-5" />
                      Higher predictability of result
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-infinity text-yellow-light mr-2.5 w-5" />
                      Infinitely scalable
                    </li>
                    <li className="body-text text-yellow-light flex items-center">
                      <i className="fas fa-cogs text-yellow-light mr-2.5 w-5" />
                      100% done-for-you solution
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/12 md:w-full text-center flex justify-center items-center px-4 mb-8">
              <h3 className="text-5xl font-bold text-white relative z-10">
                VS
              </h3>
            </div>

            <div className="w-full xl:w-5/12 md:w-full px-4 mb-8">
              <div
                className="bg-blue-darkest/30 backdrop-blur-lg border-2 border-blue-middle rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-middle/20"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <h4 className="card-heading text-blue-middle mb-4">Humans</h4>
                  <ul className="space-y-2.5">
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-dollar-sign text-blue-middle mr-2.5 w-5" />
                      Expensive
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-balance-scale text-blue-middle mr-2.5 w-5" />
                      Inconsistent performance
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-user-tie text-blue-middle mr-2.5 w-5" />
                      Hiring / training required
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-user-times text-blue-middle mr-2.5 w-5" />
                      Can leave anytime
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-chart-pie text-blue-middle mr-2.5 w-5" />
                      Not easily scalable
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-user-clock text-blue-middle mr-2.5 w-5" />
                      Lead capture delay
                    </li>
                    <li className="body-text text-blue-middle flex items-center">
                      <i className="fas fa-business-time text-blue-middle mr-2.5 w-5" />
                      Slow follow-up, Booking loss
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={[
          {
            question: "So, what's this Voice AI thing all about?",
            answer:
              "Think of our Voice AI as a super-smart virtual assistant for your business. It can handle customer calls, book appointments, answer questions, and even make sales calls - all while sounding surprisingly human-like. It's like having an extra team member who never sleeps!",
          },
          {
            question: "Can it really understand what customers are saying?",
            answer:
              "You bet! Our Voice AI is pretty brainy. It uses advanced tech to understand context, accents, and even industry jargon. It's not just hearing words - it's getting the meaning behind them. So whether your customer has a thick accent or uses lots of technical terms, our AI's got it covered.",
          },
          {
            question: "Will it work with the systems we already use?",
            answer:
              "Absolutely! We've designed our Voice AI to play nice with others. It can integrate with your CRM, calendar, and other business tools. Our team will help set everything up so it fits right into your current workflow. No need to overhaul your entire system!",
          },
          {
            question: "What if the AI gets stumped by a question?",
            answer:
              "No worries! While our AI is pretty smart, we know it can't handle everything. If it encounters a question it can't answer, it'll smoothly hand the call over to a human agent. Your customers will always get the help they need, one way or another.",
          },
          {
            question: "How do we keep track of how well it's doing?",
            answer:
              "We've got you covered with a nifty analytics dashboard. It shows you all sorts of useful stuff - call volumes, how many issues get resolved, customer satisfaction scores, and more. It's like having a bird's eye view of your customer interactions, helping you spot trends and areas for improvement.",
          },
        ]}
      />
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div
              className="w-full xl:w-2/3 lg:w-5/6 text-center"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="bg-blue-darkest/30 backdrop-blur-lg border-2 border-yellow-light rounded-2xl p-16 shadow-lg shadow-yellow-light/20 hover:scale-[1.02] transition-all duration-300">
                <div className="mb-10">
                  <span className="inline-block bg-yellow-light/20 text-yellow-light px-6 py-2 rounded-full small-text font-semibold mb-6">
                    Book Discovery Call Now
                  </span>
                  <h2
                    className="section-heading text-white"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    Scale your business with AI
                  </h2>
                </div>
                <div className="flex justify-center">
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
                    variant="primary"
                    size="large"
                    external={true}
                    className="whitespace-nowrap inline-block"
                  >
                    Book Discovery Call!
                  </CTAButton>
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
