"use client";

import {
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  CalendarPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { weddingConfig } from "@/config/wedding.config";
import { getGoogleCalendarUrl } from "@/lib/calendar";
import { SectionTitle } from "@/components/shared/SectionTitle";

const eventDetails = [
  {
    label: "Tarikh",
    value: weddingConfig.event.displayDate,
    icon: CalendarDays,
  },
  {
    label: "Masa",
    value: weddingConfig.event.time,
    icon: Clock,
  },
  {
    label: "Tempat",
    value: weddingConfig.event.venueName,
    description: weddingConfig.event.address,
    icon: MapPin,
  },
];

export function EventDetailsSection() {
  const calendarUrl = getGoogleCalendarUrl();

  return (
    <div>
      <SectionTitle
        eyebrow="Butiran Majlis"
        title="Walimatul Urus"
        description="Dengan penuh kesyukuran, kami menjemput anda hadir meraikan hari bahagia kami."
      />

      <div className="mt-10 space-y-4">
        {eventDetails.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-[#fffaf3]/85 p-5 shadow-[0_14px_40px_rgba(88,63,38,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(88,63,38,0.11)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#efd4d0]/30 blur-2xl transition duration-300 group-hover:bg-[#efd4d0]/45" />

              <div className="relative z-10 flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-white text-[#b58a54] shadow-[0_10px_24px_rgba(181,138,84,0.12)]">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
                    {item.label}
                  </p>

                  <p className="mt-2 font-serif text-2xl leading-tight text-[#2f2a25]">
                    {item.value}
                  </p>

                  {item.description ? (
                    <p className="mt-2 text-sm leading-6 text-[#7a6b5e]">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31]"
        >
          <CalendarPlus className="h-4 w-4" strokeWidth={1.8} />
          Add to Calendar
        </a>

        <a
          href={weddingConfig.location.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-[#d8b989] bg-white px-5 py-3 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3]"
        >
          <Navigation className="h-4 w-4" strokeWidth={1.8} />
          Buka Lokasi
        </a>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-[#ead8bc] bg-white/65 p-5 text-center">
        <p className="font-serif text-2xl text-[#2f2a25]">
          Kehadiran anda amat kami hargai
        </p>
        <p className="mt-2 text-sm leading-6 text-[#7a6b5e]">
          Semoga dengan kehadiran dan doa restu anda, majlis ini diberkati dan
          dirahmati Allah SWT.
        </p>
      </div>
    </div>
  );
}