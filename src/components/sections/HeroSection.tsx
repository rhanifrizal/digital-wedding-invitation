"use client";

import { motion } from "motion/react";
import { CalendarDays, Heart, MapPin, Sparkles } from "lucide-react";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { weddingConfig } from "@/config/wedding.config";

type HeroSectionProps = {
  isOpened: boolean;
  onOpenInvitation: () => void;
};

export function HeroSection({ isOpened, onOpenInvitation }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(232,183,173,0.34),_transparent_28%),radial-gradient(circle_at_85%_18%,_rgba(216,185,137,0.32),_transparent_30%),linear-gradient(180deg,_#fffaf3_0%,_#f8eadc_55%,_#fdf8f1_100%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,_#9c7a4d_1px,_transparent_0)] [background-size:22px_22px]" />

      <motion.div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#efd4d0]/55 blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.72, 0.45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#d9c7a3]/50 blur-3xl"
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.7, 0.45, 0.7],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingParticles count={36} />

      <div className="pointer-events-none absolute left-5 top-5 h-24 w-24 rounded-tl-[2rem] border-l border-t border-[#d8b989]/35" />
      <div className="pointer-events-none absolute right-5 bottom-8 h-24 w-24 rounded-br-[2rem] border-b border-r border-[#d8b989]/35" />

      <div className="pointer-events-none absolute left-8 top-12 text-5xl text-[#d8b989]/15">
        ❦
      </div>
      <div className="pointer-events-none absolute bottom-16 right-8 text-5xl text-[#e8b7ad]/20">
        ❦
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65, ease: "easeOut" }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ead8bc] bg-white/45 px-4 py-1.5 shadow-[0_12px_35px_rgba(88,63,38,0.08)] backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#b58a54]" strokeWidth={1.7} />
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#9c7a4d] sm:text-xs">
            {weddingConfig.invitation.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#d8b989]/70 bg-white/55 shadow-[0_20px_60px_rgba(93,64,37,0.13)] backdrop-blur sm:h-24 sm:w-24"
        >
          <div className="absolute inset-2 rounded-full border border-[#ead8bc]/80" />
          <div className="absolute -inset-2 rounded-full border border-[#d8b989]/20" />

          <Heart
            className="relative h-8 w-8 fill-[#b58a54]/10 text-[#b58a54] sm:h-9 sm:w-9"            strokeWidth={1.5}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#9c7a4d]">
            Dengan penuh kesyukuran
          </p>

          <h1 className="font-serif text-[3.05rem] leading-[0.92] text-[#2f2a25] drop-shadow-sm sm:text-6xl">
            {weddingConfig.couple.displayNames}
          </h1>
        </motion.div>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#b58a54] to-[#b58a54]" />
          <span className="font-serif text-xl leading-none text-[#b58a54]">
            ❦
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#b58a54] to-[#b58a54]" />
        </div>

        <p className="max-w-sm text-sm leading-6 text-[#6f6257] sm:text-base sm:leading-7">
          {weddingConfig.invitation.subtitle}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
          className="mt-5 w-full max-w-[19.5rem] overflow-hidden rounded-[1.75rem] border border-[#e5cfaa] bg-white/58 shadow-[0_18px_60px_rgba(88,63,38,0.13)] backdrop-blur sm:max-w-sm"
        >
          <div className="h-1 bg-gradient-to-r from-transparent via-[#d8b989] to-transparent" />

          <div className="px-5 py-3.5 sm:px-6 sm:py-4">
            <div className="flex items-start gap-3 text-left">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#d8b989]/60 bg-[#fffaf3] text-[#b58a54]">
                <CalendarDays className="h-4.5 w-4.5" strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#9c7a4d]">
                  {weddingConfig.event.displayDate}
                </p>
                <p className="mt-1 text-lg font-medium text-[#3c332c]">
                  {weddingConfig.event.time}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-3 rounded-2xl border border-[#ead8bc]/80 bg-white/55 px-4 py-2.5 text-left">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-[#b58a54]"
                strokeWidth={1.8}
              />
              <p className="text-sm leading-6 text-[#7a6b5e]">
                {weddingConfig.event.venueName}
              </p>
            </div>
          </div>
        </motion.div>

        {!isOpened ? (
          <motion.button
            type="button"
            onClick={onOpenInvitation}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
            className="group relative mt-6 overflow-hidden rounded-full bg-[#2f2a25] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-white shadow-[0_18px_45px_rgba(47,42,37,0.25)] transition hover:bg-[#4a3b31]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
            <span className="relative">{weddingConfig.invitation.openingText}</span>
          </motion.button>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-sm uppercase tracking-[0.25em] text-[#9c7a4d]"
          >
            Jemputan Dibuka
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}