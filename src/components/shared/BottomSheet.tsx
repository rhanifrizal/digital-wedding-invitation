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

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close bottom sheet overlay"
            className="absolute inset-0 h-full w-full bg-[#2f2a25]/45 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.8 }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 260,
            }}
            className="absolute inset-x-0 bottom-0 mx-auto max-w-md rounded-t-[2rem] border border-[#ead8bc] bg-[#fffaf3] p-5 shadow-[0_-20px_80px_rgba(47,42,37,0.25)]"
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#d8b989]" />

            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-serif text-2xl text-[#2f2a25]">{title}</h2>

              <button
                type="button"
                aria-label="Close bottom sheet"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e5d3] text-[#7a6b5e] transition hover:bg-[#ead8bc] hover:text-[#2f2a25]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pb-4">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}