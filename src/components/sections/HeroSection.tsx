
import { Heart } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,122,0.28),_transparent_32%),linear-gradient(180deg,_#fffaf3_0%,_#f8eadc_100%)]" />

      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#efd4d0]/50 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#d9c7a3]/50 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#9c7a4d]">
          {weddingConfig.invitation.title}
        </p>

        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#d8b989]/70 bg-white/50 shadow-[0_20px_60px_rgba(93,64,37,0.12)] backdrop-blur">
          <Heart className="h-10 w-10 text-[#b58a54]" strokeWidth={1.5} />
        </div>

        <h1 className="font-serif text-5xl leading-tight text-[#2f2a25]">
          {weddingConfig.couple.displayNames}
        </h1>

        <div className="my-6 h-px w-28 bg-gradient-to-r from-transparent via-[#b58a54] to-transparent" />

        <p className="max-w-sm text-base leading-7 text-[#6f6257]">
          {weddingConfig.invitation.subtitle}
        </p>

        <div className="mt-8 rounded-3xl border border-[#e5cfaa] bg-white/55 px-6 py-5 shadow-[0_18px_60px_rgba(88,63,38,0.12)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.25em] text-[#9c7a4d]">
            {weddingConfig.event.displayDate}
          </p>
          <p className="mt-2 text-lg font-medium text-[#3c332c]">
            {weddingConfig.event.time}
          </p>
          <p className="mt-1 text-sm text-[#7a6b5e]">
            {weddingConfig.event.venueName}
          </p>
        </div>

        <button className="mt-10 rounded-full bg-[#2f2a25] px-8 py-4 text-sm font-medium uppercase tracking-[0.25em] text-white shadow-[0_18px_45px_rgba(47,42,37,0.25)] transition hover:-translate-y-0.5 hover:bg-[#4a3b31]">
          {weddingConfig.invitation.openingText}
        </button>
      </div>
    </section>
  );
}