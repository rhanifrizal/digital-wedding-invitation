"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { timelineConfig } from "@/config/timeline.config";

export function TimelineSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#efd4d0]/35 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-md"
      >
        <SectionTitle
          eyebrow="Our Story"
          title="Kisah Kami"
          description="Beberapa detik kecil yang menjadi sebahagian daripada perjalanan cinta kami."
        />

        <div className="relative mt-10 space-y-8">
          <div className="absolute left-6 top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#d8b989] via-[#ead8bc] to-transparent" />

          {timelineConfig.map((item, index) => (
            <motion.article
              key={`${item.title}-${item.date}`}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: index * 0.08,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="relative pl-16"
            >
              <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-[#d8b989] bg-[#fffaf3] shadow-[0_12px_35px_rgba(88,63,38,0.12)]">
                <Heart className="h-5 w-5 text-[#b58a54]" strokeWidth={1.6} />
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-white/70 shadow-[0_18px_55px_rgba(88,63,38,0.08)] backdrop-blur">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-[#f8eadc] via-[#fffaf3] to-[#efd4d0]">
                    <div className="rounded-full border border-[#d8b989]/70 bg-white/45 px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#9c7a4d] backdrop-blur">
                      Photo
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#9c7a4d]">
                    {item.date}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl text-[#2f2a25]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#7a6b5e]">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}