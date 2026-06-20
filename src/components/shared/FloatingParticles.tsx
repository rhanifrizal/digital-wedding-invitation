"use client";

import { motion } from "motion/react";

type FloatingParticlesProps = {
  count?: number;
};

const particleTypes = ["petal", "gold", "bokeh"] as const;

function getParticleStyle(index: number) {
  const type = particleTypes[index % particleTypes.length];

  const size =
    type === "petal"
      ? 10 + (index % 4) * 3
      : type === "gold"
        ? 4 + (index % 3) * 2
        : 8 + (index % 4) * 4;

  const top = -10 - (index % 8) * 8;
  const right = -5 + (index % 7) * 14;
  const delay = (index % 10) * 0.8;
  const duration = 9 + (index % 6) * 1.6;
  const driftX = -220 - (index % 5) * 80;
  const driftY = 520 + (index % 6) * 70;

  return {
    type,
    size,
    top,
    right,
    delay,
    duration,
    driftX,
    driftY,
  };
}

export function FloatingParticles({ count = 22 }: FloatingParticlesProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => {
        const particle = getParticleStyle(index);

        return (
          <motion.span
            key={index}
            className={`absolute ${
              particle.type === "petal"
                ? "rounded-[70%_30%_65%_35%] bg-[#e8b7ad]/55"
                : particle.type === "gold"
                  ? "rounded-full bg-[#c9a15f]/70"
                  : "rounded-full bg-white/45"
            }`}
            style={{
              top: `${particle.top}%`,
              right: `${particle.right}%`,
              width: particle.size,
              height:
                particle.type === "petal"
                  ? particle.size * 1.45
                  : particle.size,
              filter:
                particle.type === "bokeh" ? "blur(1px)" : "blur(0.2px)",
              boxShadow:
                particle.type === "gold"
                  ? "0 0 12px rgba(201, 161, 95, 0.45)"
                  : undefined,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              rotate: 0,
              scale: 0.8,
            }}
            animate={{
              x: particle.driftX,
              y: particle.driftY,
              opacity: [0, 0.75, 0.55, 0],
              rotate:
                particle.type === "petal"
                  ? [0, 80, 180, 260]
                  : [0, 20, -20, 0],
              scale: [0.8, 1, 0.95, 0.75],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}