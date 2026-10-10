"use client";
import { useEffect, useState } from "react";
import "./contact.css";
import BookingEmbed from "@/components/contact/BookingEmbed";
import Icon from "@/components/v2/ui/icons";
import { isProductionHost } from "@/lib/v2/env";
import { nb } from "@/components/v2/ui/nb";

/*
  Il calendario per prenotare la call, con la guardia della preview (brief §8).
  BookingEmbed carica un iframe e uno script di LeadConnector: fuori dai domini veri del sito non deve partire
  nessuna richiesta, e nessuno deve poter prenotare per sbaglio dalla preview. Quindi:
    - sul server e al primo render: un riquadro con «sto caricando…» (stessa altezza del calendario);
    - su automis.ai / voice.automis.ai: BookingEmbed (resta invariato, ha il suo caricamento differito);
    - ovunque altro (preview, localhost): lo stesso riquadro con una riga che spiega perché è spento.
  I testi arrivano dalla pagina (copy), mai scritti qui.
*/
export default function CallBooking({ loadingLabel, previewNote }) {
  const [mode, setMode] = useState("pending");

  useEffect(() => {
    setMode(isProductionHost() ? "live" : "preview");
  }, []);

  if (mode === "live") return <BookingEmbed />;

  return (
    <div className="v2c-ph" role="status">
      <div className="v2c-ph__inner">
        <span className="v2c-ph__icon" aria-hidden="true">
          <Icon name="calendar" size={24} />
        </span>
        <p className="v2c-ph__text">{nb(mode === "preview" ? previewNote : loadingLabel)}</p>
      </div>
    </div>
  );
}
