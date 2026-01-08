"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FixedCta() {
  const [showBar, setShowBar] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      if (scrollPosition >= pageHeight - 50) {
        setIsVisible(false);
        setTimeout(() => {
          setShowBar(false);
        }, 200);
      } else {
        setShowBar(true);
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isMounted) return null;

  return (
    showBar && (
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-blue-darkest to-blue-middle shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <span className="text-white font-semibold text-lg">
              Fai crescere il tuo business con l’AI
            </span>

            <div className="flex gap-4">
              <Link
                href="#demo"
                className="bg-yellow-light text-blue-darkest px-6 py-2 rounded-full font-semibold hover:bg-yellow-dark hover:text-white transition-colors inline-flex items-center"
              >
                <i
                  className="far fa-arrow-right mr-2"
                  style={{ transform: "rotate(-30deg)" }}
                />
                Provalo gratis
              </Link>

              <Link
                href="https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF"
                className="bg-transparent text-yellow-light border-2 border-yellow-light px-6 py-2 rounded-full font-semibold hover:bg-yellow-light hover:text-blue-darkest transition-colors inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="far fa-arrow-right mr-2"
                  style={{ transform: "rotate(-30deg)" }}
                />
                Prenota una call conoscitiva
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
