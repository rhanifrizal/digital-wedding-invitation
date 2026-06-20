"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

type HeroSectionProps = {
  isOpened: boolean;
  onOpenInvitation: () => void;
};

export function HeroSection({ isOpened, onOpenInvitation }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,122,0.28),_transparent_32%),linear-gradient(180deg,_#fffaf3_0%,_#f8eadc_100%)]" />

      <motion.div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#efd4d0]/50 blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.7, 0.45],
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

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center"
      >
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#9c7a4d] sm:text-sm">
          {weddingConfig.invitation.title}
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-[#d8b989]/70 bg-white/50 shadow-[0_20px_60px_rgba(93,64,37,0.12)] backdrop-blur sm:h-28 sm:w-28"
        >
          <Heart
            className="h-9 w-9 text-[#b58a54] sm:h-10 sm:w-10"
            strokeWidth={1.5}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          className="font-serif text-[3.45rem] leading-none text-[#2f2a25] sm:text-6xl"
        >
          {weddingConfig.couple.displayNames}
        </motion.h1>

        <div className="my-5 h-px w-28 bg-gradient-to-r from-transparent via-[#b58a54] to-transparent" />

        <p className="max-w-sm text-base leading-7 text-[#6f6257]">
          {weddingConfig.invitation.subtitle}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
          className="mt-7 w-full max-w-[19rem] rounded-[1.75rem] border border-[#e5cfaa] bg-white/55 px-5 py-4 shadow-[0_18px_60px_rgba(88,63,38,0.12)] backdrop-blur sm:max-w-sm sm:px-6 sm:py-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#9c7a4d] sm:text-sm">
            {weddingConfig.event.displayDate}
          </p>
          <p className="mt-2 text-xl font-medium text-[#3c332c]">
            {weddingConfig.event.time}
          </p>
          <p className="mt-1 text-sm text-[#7a6b5e]">
            {weddingConfig.event.venueName}
          </p>
        </motion.div>

        {!isOpened ? (
          <motion.button
            type="button"
            onClick={onOpenInvitation}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
            className="mt-8 rounded-full bg-[#2f2a25] px-8 py-4 text-sm font-medium uppercase tracking-[0.25em] text-white shadow-[0_18px_45px_rgba(47,42,37,0.25)] transition hover:bg-[#4a3b31]"
          >
            {weddingConfig.invitation.openingText}
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