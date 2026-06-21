"use client";

import { CalendarHeart } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { weddingConfig } from "@/config/wedding.config";
import { SectionTitle } from "@/components/shared/SectionTitle";

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const countdownItems = [
  {
    key: "days",
    label: "Hari",
  },
  {
    key: "hours",
    label: "Jam",
  },
  {
    key: "minutes",
    label: "Minit",
  },
  {
    key: "seconds",
    label: "Saat",
  },
] as const;

function getCountdown(): CountdownValue {
  const targetDate = new Date(weddingConfig.event.date).getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function CountdownSection() {
  const [countdown, setCountdown] = useState(() => getCountdown());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <SectionTitle
        eyebrow="Menghitung Hari"
        title="Menuju Hari Bahagia"
        description="Setiap detik membawa kami lebih dekat kepada hari yang penuh makna."
      />

      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-[#fffaf3]/85 p-6 text-center shadow-[0_16px_45px_rgba(88,63,38,0.07)]"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#efd4d0]/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-14 -left-14 h-36 w-36 rounded-full bg-[#d8b989]/25 blur-3xl" />

          <div className="relative z-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b989]/70 bg-white text-[#b58a54] shadow-[0_14px_35px_rgba(181,138,84,0.16)]">
              <CalendarHeart className="h-7 w-7" strokeWidth={1.6} />
            </div>

            <p className="mt-5 text-xs uppercase tracking-[0.32em] text-[#9c7a4d]">
              {weddingConfig.event.displayDate}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {countdownItems.map((item, index) => {
                const value = countdown[item.key];

                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: index * 0.06,
                    }}
                    className="relative overflow-hidden rounded-3xl border border-[#ead8bc] bg-white/75 px-4 py-5 shadow-[0_12px_30px_rgba(88,63,38,0.05)]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#d8b989] to-transparent opacity-70" />

                    <motion.p
                      key={value}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="font-serif text-4xl leading-none text-[#2f2a25]"
                    >
                      {String(value).padStart(2, "0")}
                    </motion.p>

                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#9c7a4d]">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-7 rounded-[1.5rem] border border-[#ead8bc] bg-white/65 px-5 py-4">
              <p className="font-serif text-2xl text-[#2f2a25]">
                Doakan semuanya dipermudahkan
              </p>
              <p className="mt-2 text-sm leading-6 text-[#7a6b5e]">
                Semoga majlis ini berjalan lancar dan menjadi permulaan yang
                diberkati.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}