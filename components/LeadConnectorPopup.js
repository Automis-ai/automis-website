"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function LeadConnectorPopup() {
  const [open, setOpen] = useState(false);

  // Auto open when user scrolls 40% down the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.4) {
        setOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        {/* Overlay with subtle dark blur */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm data-[state=open]:animate-fadeIn z-40" />

        {/* Modal content */}
        <Dialog.Content
          className="
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[1100px] h-auto bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-0 overflow-hidden z-50 data-[state=open]:animate-zoomIn
          "
        >
          {/* Close button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 z-50 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow p-2"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </Dialog.Close>

          {/* Iframe form */}
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/OiFmA825z4HK9h6E99ty"
            title="AI ROI Calculator"
            className="w-full h-[700px] md:h-[850px] border-none rounded-3xl bg-transparent"
            allowFullScreen
          ></iframe>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
