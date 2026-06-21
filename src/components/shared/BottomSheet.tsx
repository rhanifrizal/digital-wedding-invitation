"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

type BottomSheetProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function BottomSheet({
  isOpen,
  title,
  children,
  onClose,
}: BottomSheetProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            aria-label="Close bottom sheet"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 bg-[#2f2a25]/45 backdrop-blur-[3px]"
          />

          <motion.div
            initial={{ y: "100%", opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 32,
              mass: 0.9,
            }}
            className="absolute inset-x-0 bottom-0 mx-auto max-h-[86dvh] w-full max-w-lg overflow-hidden rounded-t-[2rem] border border-[#ead8bc] bg-[#fffaf3] shadow-[0_-24px_80px_rgba(47,42,37,0.24)]"
          >
            <div className="sticky top-0 z-20 border-b border-[#ead8bc] bg-[#fffaf3]/95 px-5 pb-4 pt-3 backdrop-blur-xl">
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#d8b989]" />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
                    Menu
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-[#2f2a25]">
                    {title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ead8bc] bg-white text-[#7a6b5e] transition hover:bg-[#f3e5d3] hover:text-[#2f2a25]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" strokeWidth={1.7} />
                </button>
              </div>
            </div>

            <div className="max-h-[calc(86dvh-6.5rem)] overflow-y-auto px-5 py-6">
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}