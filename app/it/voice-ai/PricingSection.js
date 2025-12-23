"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const CustomCarousel = ({ items, visibleSlides = 3 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideWidthPercentage = 100 / visibleSlides;
  const carouselRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide < items.length - visibleSlides) {
      setCurrentSlide(currentSlide + 0.6);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 0.6);
    }
  };

  const handleTouchStart = (e) => {
    carouselRef.current.touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    const diffX = carouselRef.current.touchStartX - touchEndX;

    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }

    carouselRef.current.touchStartX = null;
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/10 rounded-full shadow-lg p-3 hover:bg-[#FEC458] hover:text-[#000a14] transition-all duration-300 text-white border border-white/20"
        onClick={prevSlide}
      >
        &#10094;
      </button>

      <div className="overflow-hidden relative" ref={carouselRef}>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#000123ed] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#000123ed] to-transparent z-10"></div>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * slideWidthPercentage}%)`,
            width: `${items.length * slideWidthPercentage}%`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {items.map((item, index) => (
            <div
              className="flex-shrink-0 px-4"
              key={index}
              style={{ width: `${slideWidthPercentage}%` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/10 rounded-full shadow-lg p-3 hover:bg-[#FEC458] hover:text-[#000a14] transition-all duration-300 text-white border border-white/20"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

const PricingCard = ({
  title = "",
  price,
  features = [],
  buttonText,
  isCustom = false,
  isDiamond = false,
  customText = "",
  showWhitelabel = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const initialVisibleFeatures = title === "Enterprise Plan" ? 2 : 3;
  const cardRef = useRef(null);
  const listRef = useRef(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && expanded) {
          setExpanded(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.01,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [expanded]);

  const finalFeatures = showWhitelabel ? ["Whitelabel", ...features] : features;

  const visibleFeatures = expanded ? finalFeatures.length : initialVisibleFeatures;

  const hasMoreFeatures = finalFeatures.length > initialVisibleFeatures;

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl p-8 relative overflow-hidden h-full transition-all duration-300 ${
        isDiamond
          ? "bg-[#FEC458]/10 border-2 border-[#FEC458] shadow-xl shadow-[#FEC458]/20"
          : "bg-black/5 border border-white/10 hover:border-[#FEC458]/50 hover:shadow-lg"
      }`}
      style={{ minHeight: "770px" }}
    >
      {isDiamond && (
        <h6 className="absolute top-0 right-0 bg-[#FEC458] text-[#000a14] px-4 py-2 rounded-bl-lg text-sm font-semibold">
          Pacchetto più scelto
        </h6>
      )}

      <div className="absolute top-4 right-4 opacity-10">
        <img
          src="assets/images/shapes/price-circle2.png"
          alt="Elemento decorativo pricing"
          className="w-24 h-24 filter invert"
          loading="lazy"
        />
      </div>

      <h5 className="text-2xl font-bold text-white mb-2">{title}</h5>

      <div className="text-white/60 mb-6 text-sm">
        {isCustom ? "Crediti personalizzati" : "Crediti chiamata/min (acquistati separatamente)"}
      </div>

      <div
        ref={listRef}
        className="mb-6"
        style={{
          maxHeight: expanded ? "240px" : "auto",
          overflowY: expanded && hasMoreFeatures ? "auto" : "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        <ul className="space-y-3">
          {Array.isArray(finalFeatures) &&
            finalFeatures
              .slice(0, visibleFeatures)
              .map((feature, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-check text-[#FEC458] mr-2 mt-1"></i>
                  <span className="text-white/90">{feature}</span>
                </li>
              ))}
        </ul>
      </div>

      {features.length > initialVisibleFeatures && (
        <button
          onClick={toggleExpand}
          className="text-[#FEC458] hover:text-[#FEC458]/80 font-medium text-sm flex items-center justify-center mb-4 transition-colors"
        >
          {expanded ? (
            <>
              Mostra meno <i className="fas fa-chevron-up ml-2" />
            </>
          ) : (
            <>
              Mostra di più <i className="fas fa-chevron-down ml-2" />
            </>
          )}
        </button>
      )}

      <hr className="my-6 border-white/10" />

      <div className="text-center mb-6">
        {isCustom ? (
          <span className="text-3xl font-bold text-[#FEC458]">Su misura per le tue esigenze</span>
        ) : (
          <>
            <span className="text-white/60">$</span>
            <span className="text-4xl font-bold text-[#FEC458]">{price}</span>
            <span className="text-white/60">/mese</span>
          </>
        )}
      </div>

      <div className="text-center mb-6">
        <p className="font-bold text-sm text-white mb-1">Ideale per:</p>
        <span className="text-white/80">
          {customText ||
            (title
              ? `Per aziende ${title.split(" ")[0].toLowerCase()}`
              : "Per aziende")}
        </span>
      </div>

      <Link
        href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center ${
          isDiamond
            ? "bg-white text-[#000a14] hover:bg-[#FEC458] hover:text-[#000a14]"
            : "bg-[#FEC458] text-[#000a14] hover:bg-transparent hover:text-[#FEC458] border-2 border-[#FEC458] hover:border-[#FEC458]"
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonText} <i className="far fa-arrow-right ml-2" />
      </Link>
    </div>
  );
};

const PricingSection = ({ showWhitelabelInPrestige = false }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const monthlyPlans = [
    [
      "Piano Essential",
      "497",
      [
        "Dashboard Analytics",
        "Log Chiamate",
        "Prenotazione Appuntamenti",
        "Qualificazione Lead",
        "Trasferimenti in tempo reale",
        "Integrazione CRM",
        "Supporto Slack base",
        "Automazioni di valutazione chiamate",
        "Automazioni per ottimizzare la conversione lead",
        "Personalizzazione voce AI",
        "Conformità & Sicurezza HIPAA e GDPR",
      ],
      "Parliamone",
      false,
      false,
      "Piccole e medie imprese che vogliono automatizzare la comunicazione e semplificare le attività di front-desk.",
    ],
    [
      "Piano Pro",
      "897",
      [
        "Tutto dell’Essential, in più:",
        "Rilevamento emozioni",
        "Supporto prioritario (7/7)",
        "Personalità vocale su misura per il tuo brand",
        "Supporto AI multilingua",
      ],
      "Parliamone",
      false,
      true,
      "Aziende in crescita che vogliono analytics più avanzati, automazioni evolute, multilingua e maggiore personalizzazione.",
    ],
    [
      "Piano Enterprise",
      "Su misura per le tue esigenze",
      [
        "Tutto del Pro, in più:",
        "Gestione & rete AI enterprise",
        "Rete di collaborazione AI (più agent che lavorano insieme)",
        "Global Smart Dialing (dialing geografico intelligente)",
        "AI con memoria (ricorda interazioni precedenti)",
        "Campaign Command Center (gestione multi-campagna)",
        "Suite Analytics avanzata",
        "Analisi del sentiment (traccia emozioni cliente)",
        "Mappatura geografica (analytics visuali chiamate)",
        "Learning Curve (apprendimento continuo guidato dall’AI)",
        "Allocazione crediti flessibile",
        "Miglioramenti performance AI",
        "Funzionalità 100% custom",
      ],
      "Parliamone",
      true,
      false,
      "Enterprise o aziende con alto volume di comunicazioni, use case complessi e requisiti specifici.",
    ],
  ];

  const yearlyPlans = [
    [
      "Piano Essential",
      "449",
      [
        "Dashboard Analytics",
        "Log Chiamate",
        "Prenotazione Appuntamenti",
        "Qualificazione Lead",
        "Trasferimenti in tempo reale",
        "Integrazione CRM",
        "Supporto Slack base",
        "Automazioni di valutazione chiamate",
        "Automazioni per ottimizzare la conversione lead",
        "Personalizzazione voce AI",
        "Conformità & Sicurezza HIPAA e GDPR",
      ],
      "Parliamone",
      false,
      false,
      "Piccole e medie imprese che vogliono automatizzare la comunicazione e semplificare le attività di front-desk.",
    ],
    [
      "Piano Pro",
      "800",
      [
        "Tutto dell’Essential, in più:",
        "Rilevamento emozioni",
        "Supporto prioritario (7/7)",
        "Personalità vocale su misura per il tuo brand",
        "Supporto AI multilingua",
      ],
      "Parliamone",
      false,
      true,
      "Aziende in crescita che vogliono analytics più avanzati, automazioni evolute, multilingua e maggiore personalizzazione.",
    ],
    [
      "Piano Enterprise",
      "Su misura per le tue esigenze",
      [
        "Tutto del Pro, in più:",
        "Gestione & rete AI enterprise",
        "Rete di collaborazione AI (più agent che lavorano insieme)",
        "Global Smart Dialing (dialing geografico intelligente)",
        "AI con memoria (ricorda interazioni precedenti)",
        "Campaign Command Center (gestione multi-campagna)",
        "Suite Analytics avanzata",
        "Analisi del sentiment (traccia emozioni cliente)",
        "Mappatura geografica (analytics visuali chiamate)",
        "Learning Curve (apprendimento continuo guidato dall’AI)",
        "Allocazione crediti flessibile",
        "Miglioramenti performance AI",
        "Funzionalità 100% custom",
      ],
      "Parliamone",
      true,
      false,
      "Enterprise o aziende con alto volume di comunicazioni, use case complessi e requisiti specifici.",
    ],
  ];

  const renderPricingCards = (plans) => (
    <div className="flex flex-wrap -mx-4">
      {plans.map((plan, index) => {
        let colClasses = "px-4 w-full ";
        colClasses += "mb-8 ";

        if (windowWidth >= 768) {
          if (index === 2) {
            colClasses += "md:w-1/2 md:mx-auto ";
          } else {
            colClasses += "md:w-1/2 ";
          }
        }

        if (windowWidth >= 1280) {
          colClasses += "xl:w-1/3 xl:mx-0 ";
        }

        return (
          <div key={index} className={colClasses}>
            <PricingCard
              title={plan[0]}
              price={plan[1]}
              features={plan[2]}
              buttonText={plan[3]}
              isCustom={plan[4]}
              isDiamond={plan[5]}
              customText={plan[6]}
              showWhitelabel={
                plan[0] === "Prestige Plan" ? showWhitelabelInPrestige : false
              }
            />
          </div>
        );
      })}
    </div>
  );

  const [activeTab, setActiveTab] = useState("yearly");

  const handleTabClick = () => {
    setActiveTab(activeTab === "monthly" ? "yearly" : "monthly");
  };

  return (
    <section id="pricing" className="py-20 bg-[#000123ed]">
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <div className="flex flex-wrap -mx-4 justify-between items-center px-6 mb-12">
            <div className="px-4 xl:w-1/2 lg:w-7/12">
              <div className="section-title">
                <span className="text-[#FEC458] font-semibold mb-2 block text-sm">
                  <i className="fas fa-usd-square mr-2" />
                  Pacchetti Prezzi
                </span>
                <h2 className="text-4xl font-bold text-white">
                  Scegli la tua potenza AI
                </h2>
              </div>
            </div>

            <div className="px-4 lg:w-5/12 text-left lg:text-right mt-6 lg:mt-0">
              <span className="inline-block bg-[#FEC458]/20 text-[#FEC458] px-3 py-1 rounded-full text-sm font-semibold mr-4">
                Risparmia 10%
              </span>

              <ul className="inline-flex bg-black/10 rounded-lg p-1" role="tablist">
                <li>
                  <button
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                      activeTab === "monthly"
                        ? "bg-[#FEC458] text-[#000a14] shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                    onClick={handleTabClick}
                  >
                    Mensile
                  </button>
                </li>
                <li>
                  <button
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                      activeTab === "yearly"
                        ? "bg-[#FEC458] text-[#000a14] shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                    onClick={handleTabClick}
                  >
                    Annuale
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            {activeTab === "monthly" && renderPricingCards(monthlyPlans)}
            {activeTab === "yearly" && renderPricingCards(yearlyPlans)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
