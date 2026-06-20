"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { coupleSlideshowConfig } from "@/config/gallery.config";
import { SectionTitle } from "@/components/shared/SectionTitle";

type SlideshowImageProps = {
  imageUrl: string;
  title: string;
};

function SlideshowImage({ imageUrl, title }: SlideshowImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return (
      <div className="flex h-[28rem] w-full items-center justify-center rounded-[1.75rem] border border-dashed border-[#d8b989] bg-[#fffaf3]">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e5d3] text-[#b58a54]">
            <ImageIcon className="h-6 w-6" strokeWidth={1.6} />
          </div>
          <p className="mt-4 text-sm font-medium text-[#2f2a25]">
            Gambar belum tersedia
          </p>
          <p className="mt-1 text-xs text-[#9c7a4d]">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[28rem] w-full overflow-hidden rounded-[1.75rem]">
        <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        onError={() => setHasError(true)}
        className="object-cover"
        />
    </div>
  );
}

export function CoupleSlideshowSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentSlide = coupleSlideshowConfig[activeIndex];

  useEffect(() => {
    if (coupleSlideshowConfig.length <= 1) return;

    const slideTimer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === coupleSlideshowConfig.length - 1 ? 0 : current + 1,
      );
    }, 4000);

    return () => {
      window.clearInterval(slideTimer);
    };
  }, []);

  if (!currentSlide) {
    return null;
  }

  const goToPreviousSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? coupleSlideshowConfig.length - 1 : current - 1,
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((current) =>
      current === coupleSlideshowConfig.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div>
      <SectionTitle
        eyebrow="Galeri"
        title="Kenangan Kami"
        description="Beberapa detik indah yang menjadi sebahagian daripada perjalanan kami."
      />

      <div className="relative mt-10">
        <div className="pointer-events-none absolute -left-3 -top-3 z-10 h-24 w-24 rounded-tl-[2rem] border-l border-t border-[#d8b989]/70" />
        <div className="pointer-events-none absolute -bottom-3 -right-3 z-10 h-24 w-24 rounded-br-[2rem] border-b border-r border-[#d8b989]/70" />

        <div className="relative overflow-hidden rounded-[2rem] border border-[#ead8bc] bg-[#fffaf3] p-3 shadow-[0_22px_70px_rgba(88,63,38,0.12)]">
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.imageUrl || currentSlide.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <SlideshowImage
                  imageUrl={currentSlide.imageUrl}
                  title={currentSlide.title}
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2f2a25]/60 via-[#2f2a25]/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <motion.div
                key={currentSlide.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#f3e5d3]">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(coupleSlideshowConfig.length).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serif text-3xl text-white">
                  {currentSlide.title}
                </h3>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={goToPreviousSlide}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {coupleSlideshowConfig.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={`${item.title}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  isActive
                    ? "w-8 bg-[#b58a54]"
                    : "w-2.5 bg-[#d8b989]/50 hover:bg-[#d8b989]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}