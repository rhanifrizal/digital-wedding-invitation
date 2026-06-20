"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

type DecorativeSectionProps = {
  children: ReactNode;
  className?: string;
};

export function DecorativeSection({
  children,
  className = "",
}: DecorativeSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative mx-auto w-full max-w-3xl px-5 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-[#ead8bc]/50 bg-white/70 p-6 shadow-[0_20px_70px_rgba(88,63,38,0.08)] backdrop-blur-sm sm:p-8">
        <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#efd4d0]/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#d8b989]/25 blur-3xl" />

        <div className="pointer-events-none absolute right-5 top-5 text-5xl text-[#d8b989]/10">
          ❦
        </div>

        <div className="relative z-10">{children}</div>
      </div>
    </motion.section>
  );
}