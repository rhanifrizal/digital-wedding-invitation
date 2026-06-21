"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { faqConfig } from "@/config/faq.config";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <div>
      <SectionTitle
        eyebrow="Soalan Lazim"
        title="FAQ"
        description="Beberapa maklumat ringkas untuk memudahkan persiapan anda sebelum hadir ke majlis."
      />

      <div className="mt-10 space-y-3">
        {faqConfig.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <motion.div
              key={`${item.question}-${index}`}
              layout
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: index * 0.04,
              }}
              className="overflow-hidden rounded-[1.5rem] border border-[#ead8bc] bg-[#fffaf3]/85 shadow-[0_12px_35px_rgba(88,63,38,0.06)]"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/55"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-white text-[#b58a54]">
                  <HelpCircle className="h-4 w-4" strokeWidth={1.7} />
                </div>

                <div className="flex-1">
                  <p className="font-medium leading-6 text-[#2f2a25]">
                    {item.question}
                  </p>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-[#9c7a4d]"
                >
                  <ChevronDown className="h-5 w-5" strokeWidth={1.7} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[4.75rem] pr-5">
                      <div className="rounded-2xl border border-[#ead8bc]/70 bg-white/65 px-4 py-3">
                        <p className="text-sm leading-7 text-[#7a6b5e]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-[#ead8bc] bg-white/65 p-5 text-center">
        <p className="font-serif text-2xl text-[#2f2a25]">
          Masih ada pertanyaan?
        </p>
        <p className="mt-2 text-sm leading-6 text-[#7a6b5e]">
          Sila hubungi wakil keluarga melalui butang Hubungi di bahagian bawah
          jemputan.
        </p>
      </div>
    </div>
  );
}