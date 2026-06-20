"use client";

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

function getCountdown(): CountdownValue {
  const eventTime = new Date(weddingConfig.event.date).getTime();
  const now = new Date().getTime();
  const distance = Math.max(eventTime - now, 0);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export function CountdownSection() {
  const [countdown, setCountdown] = useState(() => getCountdown());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = [
    {
      label: "Hari",
      value: countdown.days,
    },
    {
      label: "Jam",
      value: countdown.hours,
    },
    {
      label: "Minit",
      value: countdown.minutes,
    },
    {
      label: "Saat",
      value: countdown.seconds,
    },
  ];

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-md"
      >
        <SectionTitle
          eyebrow="Countdown"
          title="Menghitung Hari"
          description="Detik demi detik menuju hari bahagia kami."
        />

        <div className="mt-8 grid grid-cols-4 gap-3">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="rounded-3xl border border-[#ead8bc] bg-white/70 px-3 py-5 text-center shadow-[0_18px_55px_rgba(88,63,38,0.08)] backdrop-blur"
            >
              <p className="font-serif text-3xl text-[#2f2a25]">
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#9c7a4d]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}