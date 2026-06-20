"use client";

import { motion } from "motion/react";

export function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-xs items-center justify-center gap-4 px-6 py-6"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b989] to-[#d8b989]/40" />

      <div className="flex items-center gap-2 text-[#b58a54]">
        <span className="text-xs">✦</span>
        <span className="font-serif text-lg leading-none">❦</span>
        <span className="text-xs">✦</span>
      </div>

      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d8b989] to-[#d8b989]/40" />
    </motion.div>
  );
}