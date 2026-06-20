import { MapPin, Navigation } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export function LocationSheet() {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-[#ead8bc] bg-white/70 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3e5d3] text-[#9c7a4d]">
            <MapPin className="h-5 w-5" />
          </div>

          <div>
            <p className="font-medium text-[#2f2a25]">
              {weddingConfig.event.venueName}
            </p>
            <p className="mt-1 text-sm leading-6 text-[#7a6b5e]">
              {weddingConfig.event.address}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a
          href={weddingConfig.location.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31]"
        >
          <MapPin className="h-4 w-4" />
          Google Maps
        </a>

        <a
          href={weddingConfig.location.wazeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-[#d8b989] bg-white px-4 py-3 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3]"
        >
          <Navigation className="h-4 w-4" />
          Waze
        </a>
      </div>
    </div>
  );
}