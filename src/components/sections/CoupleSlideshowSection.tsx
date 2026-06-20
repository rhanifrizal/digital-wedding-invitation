"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { coupleSlideshowConfig } from "@/config/gallery.config";

function SlideshowImage({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) {
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [imageUrl]);

  if (!imageUrl || hasImageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f8eadc] via-[#fffaf3] to-[#efd4d0]">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d8b989] bg-white/50 text-[#9c7a4d] backdrop-blur">
            <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#9c7a4d]">
            Couple Photo
          </p>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={title}
      onError={() => setHasImageError(true)}
      className="h-full w-full object-cover"
    />
  );
}

export function CoupleSlideshowSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activePhoto = coupleSlideshowConfig[activeIndex];

  useEffect(() => {
  const timer = window.setInterval(() => {
    setActiveIndex((current) =>
      current === coupleSlideshowConfig.length - 1 ? 0 : current + 1,
    );
  }, 4000);

  return () => window.clearInterval(timer);
}, []);

  const goPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? coupleSlideshowConfig.length - 1 : current - 1,
    );
  };

  const goNext = () => {
    setActiveIndex((current) =>
      current === coupleSlideshowConfig.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="absolute right-0 top-12 h-64 w-64 rounded-full bg-[#efd4d0]/35 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-md"
      >
        <SectionTitle
          eyebrow="Memories"
          title="Galeri Kami"
          description="Beberapa kenangan indah dalam perjalanan kami menuju hari bahagia."
        />

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#ead8bc] bg-white/70 shadow-[0_22px_70px_rgba(88,63,38,0.12)] backdrop-blur">
          <div className="relative h-[28rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="h-full w-full"
              >
                <SlideshowImage imageUrl={activePhoto.imageUrl} title={activePhoto.title} />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2f2a25]/60 to-transparent p-5">
              <p className="font-serif text-2xl text-white">
                {activePhoto.title}
              </p>
            </div>

            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-[#2f2a25] shadow-lg backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-[#2f2a25] shadow-lg backdrop-blur transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 px-5 py-4">
            {coupleSlideshowConfig.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Show photo ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-8 bg-[#9c7a4d]"
                    : "w-2.5 bg-[#d8b989]"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}