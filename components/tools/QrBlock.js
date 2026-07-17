"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrBlock({ value, fileName = "qr-code", downloadLabel }) {
  const ref = useRef(null);

  function download() {
    const canvas = ref.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.png`;
    a.click();
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={ref} className="rounded-xl bg-white p-3">
        <QRCodeCanvas value={value} size={160} />
      </div>
      <button type="button" onClick={download} className="text-sm text-blue-lightest hover:underline">
        {downloadLabel}
      </button>
    </div>
  );
}
