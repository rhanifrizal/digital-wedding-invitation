"use client";

import { Copy, ExternalLink, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "@/config/wedding.config";

export function LocationSheet() {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${weddingConfig.event.venueName}, ${weddingConfig.event.address}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-white/75 p-5 shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#efd4d0]/35 blur-2xl" />

        <div className="relative z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-[#fffaf3] text-[#b58a54] shadow-[0_10px_24px_rgba(181,138,84,0.12)]">
            <MapPin className="h-6 w-6" strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
            Lokasi Majlis
          </p>

          <h3 className="mt-2 font-serif text-3xl leading-tight text-[#2f2a25]">
            {weddingConfig.event.venueName}
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#7a6b5e]">
            {weddingConfig.event.address}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={weddingConfig.location.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31]"
        >
          <MapPin className="h-4 w-4" strokeWidth={1.8} />
          Google Maps
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
        </a>

        <a
          href={weddingConfig.location.wazeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-[#d8b989] bg-white px-5 py-3 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3]"
        >
          <Navigation className="h-4 w-4" strokeWidth={1.8} />
          Waze
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
        </a>
      </div>

      <button
        type="button"
        onClick={handleCopyAddress}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#ead8bc] bg-white/75 px-5 py-3 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3]"
      >
        <Copy className="h-4 w-4" strokeWidth={1.8} />
        {copied ? "Alamat Disalin" : "Salin Alamat"}
      </button>
    </div>
  );
}