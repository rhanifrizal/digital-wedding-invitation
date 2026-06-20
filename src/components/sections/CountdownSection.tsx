"use client";

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
  const [countdown, setCountdown] = useState<CountdownValue>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setCountdown(getCountdown());

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
    <section className="px-6 py-16">
      <div className="mx-auto max-w-md">
        <SectionTitle
          eyebrow="Countdown"
          title="Menghitung Hari"
          description="Detik demi detik menuju hari bahagia kami."
        />

        <div className="mt-8 grid grid-cols-4 gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-[#ead8bc] bg-white/70 px-3 py-5 text-center shadow-[0_18px_55px_rgba(88,63,38,0.08)] backdrop-blur"
            >
              <p className="font-serif text-3xl text-[#2f2a25]">
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#9c7a4d]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}