"use client";
import { akpagerUtility } from "@/utility";
import Link from "next/link";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    akpagerUtility.animation();
  }, []);

  useEffect(() => {
    if (document.querySelectorAll(".coming-soon-wrap").length !== 0) {
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      let countDown = new Date("Mar 15, 2024 00:00:00").getTime();

      let x = setInterval(function () {
        let now = new Date().getTime(),
          distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / day);
        document.getElementById("hours").innerText = Math.floor(
          (distance % day) / hour
        );
        document.getElementById("minutes").innerText = Math.floor(
          (distance % hour) / minute
        );
        document.getElementById("seconds").innerText = Math.floor(
          (distance % minute) / second
        );
      }, second);
    }
  }, []);

  return (
    <div className="page-wrapper">
      {}

      {}
      <header className="main-header menu-absolute no-border">
        {}
        <div className="header-upper">
          <div className="container mx-auto px-4 clearfix">
            <div className="header-inner relative flex items-center">
              <div className="logo-outer-two">
                <div className="logo">
                  <Link href="/">
                    <img
                      src="assets/images/logos/logo6.png"
                      alt="Automis AI - Coming Soon"
                      title="Automis AI Logo"
                    />
                  </Link>
                </div>
              </div>
              {}
              <div className="menu-btn ml-auto hidden">
                <Link href="contact" className="theme-btn">
                  Book Discovery Call 
                </Link>
              </div>
            </div>
          </div>
        </div>
        {}
      </header>
      {}
      <section
        className="coming-soon-area bgs-cover"
        style={{
          backgroundImage: "url(assets/images/backgrounds/coming-soon.jpg)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 rpt-65 gap-100 items-center">
            <div className="px-4 lg:w-1/2">
              <div className="coming-soon-content rmb-55">
                <h1
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  We Are Coming Very Soon
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  It looks like you've ventured into uncharted territory. The
                  page you were looking for may have been moved, deleted, or
                  never existed
                </p>
                <ul
                  className="coming-soon-wrap"
                  data-aos="fade-up"
                  data-aos-delay={150}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <li>
                    <span id="days" />
                    Days
                  </li>
                  <li>
                    <span id="hours" />
                    Hours
                  </li>
                  <li>
                    <span id="minutes" />
                    Min
                  </li>
                  <li>
                    <span id="seconds" />
                    Sec
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-4 lg:w-1/2">
              <div
                className="coming-soon-image"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <img src="assets/images/Others/coming-soon.png" alt="Coming Soon - Rocket launch illustration" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
    </div>
  );
};
export default page;
