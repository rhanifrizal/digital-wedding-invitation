"use client";

import { motion } from "motion/react";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="inline-flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#b58a54]" />

        <p className="text-xs uppercase tracking-[0.35em] text-[#9c7a4d]">
          {eyebrow}
        </p>

        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#b58a54]" />
      </div>

      <h2 className="mt-4 font-serif text-3xl leading-tight text-[#2f2a25] sm:text-5xl">
        {title}
      </h2>

      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#d8b989] to-[#d8b989]" />

        <span className="font-serif text-xl leading-none text-[#b58a54]">
          ❦
        </span>

        <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#d8b989] to-[#d8b989]" />
      </div>

      {description ? (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#7a6b5e] sm:text-base">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}