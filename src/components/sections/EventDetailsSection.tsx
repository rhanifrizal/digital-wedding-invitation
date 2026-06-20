"use client";

import { motion } from "motion/react";
import { CalendarPlus } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { getGoogleCalendarUrl } from "@/lib/calendar";

export function EventDetailsSection() {
  const googleCalendarUrl = getGoogleCalendarUrl();

  return (
    <section className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-md rounded-[2rem] border border-[#ead8bc] bg-white/65 p-6 shadow-[0_20px_70px_rgba(88,63,38,0.1)] backdrop-blur"
      >
        <SectionTitle eyebrow="Event Details" title="Jemputan Majlis" />

        <div className="mt-8 space-y-5 text-left">
          <div>
            <p className="text-sm text-[#9c7a4d]">Tarikh</p>
            <p className="text-base font-medium">
              {weddingConfig.event.displayDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#9c7a4d]">Masa</p>
            <p className="text-base font-medium">{weddingConfig.event.time}</p>
          </div>

          <div>
            <p className="text-sm text-[#9c7a4d]">Tempat</p>
            <p className="text-base font-medium">
              {weddingConfig.event.venueName}
            </p>
            <p className="mt-1 text-sm leading-6 text-[#7a6b5e]">
              {weddingConfig.event.address}
            </p>
          </div>
        </div>

        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-5 py-4 text-sm font-medium text-white shadow-[0_18px_45px_rgba(47,42,37,0.18)] transition hover:-translate-y-0.5 hover:bg-[#4a3b31]"
        >
          <CalendarPlus className="h-4 w-4" />
          Add to Calendar
        </a>
      </motion.div>
    </section>
  );
}