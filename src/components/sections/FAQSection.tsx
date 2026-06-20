"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { faqConfig } from "@/config/faq.config";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-md"
      >
        <SectionTitle
          eyebrow="FAQ"
          title="Soalan Lazim"
          description="Beberapa maklumat ringkas untuk memudahkan tetamu sebelum hadir ke majlis."
        />

        <div className="mt-8 space-y-3">
          {faqConfig.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-3xl border border-[#ead8bc] bg-white/70 shadow-[0_14px_45px_rgba(88,63,38,0.07)] backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium leading-6 text-[#2f2a25]">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#9c7a4d] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.8}
                  />
                </button>

                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm leading-6 text-[#7a6b5e]">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}