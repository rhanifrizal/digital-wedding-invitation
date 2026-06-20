"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { timelineConfig } from "@/config/timeline.config";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function TimelineSection() {
  return (
    <div>
      <SectionTitle
        eyebrow="Kisah Kami"
        title="Perjalanan Cinta"
        description="Setiap detik membawa kami lebih dekat kepada hari bahagia ini."
      />

      <div className="relative mt-10">
        <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[#d8b989]/20 via-[#d8b989] to-[#d8b989]/20 sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-8">
          {timelineConfig.map((item, index) => {
            const isRight = index % 2 === 1;

            return (
              <motion.div
                key={`${item.title}-${item.date}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                className={`relative flex items-start gap-5 sm:gap-8 ${
                  isRight ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8b989] bg-[#fffaf3] shadow-[0_8px_24px_rgba(181,138,84,0.18)] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  <Heart
                    className="h-3.5 w-3.5 fill-[#b58a54] text-[#b58a54]"
                    strokeWidth={1.6}
                  />
                </div>

                <div
                  className={`ml-0 flex-1 sm:w-[calc(50%-2.5rem)] sm:flex-none ${
                    isRight ? "sm:mr-[calc(50%+2.5rem)]" : "sm:ml-[calc(50%+2.5rem)]"
                  }`}
                >
                  <div className="group relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-[#fffaf3]/85 p-5 shadow-[0_16px_45px_rgba(88,63,38,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(88,63,38,0.12)]">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#efd4d0]/35 blur-2xl transition duration-300 group-hover:bg-[#efd4d0]/50" />

                    {item.imageUrl ? (
                        <div className="relative mb-4 overflow-hidden rounded-[1.25rem] border border-[#ead8bc] bg-white">
                            <div className="relative h-44 w-full overflow-hidden">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 384px"
                                className="object-cover transition duration-500 group-hover:scale-105"
                            />
                            </div>
                        </div>
                    ) : null}

                    <div className="relative z-10">
                      <p className="text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
                        {item.date}
                      </p>

                      <h3 className="mt-3 font-serif text-2xl text-[#2f2a25]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#7a6b5e]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}