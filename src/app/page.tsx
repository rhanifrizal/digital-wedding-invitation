import { CalendarDays, Gift, Heart, MapPin, MessageCircle, Phone } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

const bottomActions = [
  {
    label: "Lokasi",
    icon: MapPin,
  },
  {
    label: "RSVP",
    icon: CalendarDays,
  },
  {
    label: "Gift",
    icon: Gift,
  },
  {
    label: "Ucapan",
    icon: MessageCircle,
  },
  {
    label: "Hubungi",
    icon: Phone,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf8f1] text-[#2f2a25]">
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

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-md rounded-[2rem] border border-[#ead8bc] bg-white/65 p-6 shadow-[0_20px_70px_rgba(88,63,38,0.1)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9c7a4d]">
            Event Details
          </p>

          <h2 className="mt-3 font-serif text-3xl text-[#2f2a25]">
            Jemputan Majlis
          </h2>

          <div className="mt-6 space-y-4 text-left">
            <div>
              <p className="text-sm text-[#9c7a4d]">Tarikh</p>
              <p className="text-base font-medium">{weddingConfig.event.displayDate}</p>
            </div>

            <div>
              <p className="text-sm text-[#9c7a4d]">Masa</p>
              <p className="text-base font-medium">{weddingConfig.event.time}</p>
            </div>

            <div>
              <p className="text-sm text-[#9c7a4d]">Tempat</p>
              <p className="text-base font-medium">{weddingConfig.event.venueName}</p>
              <p className="mt-1 text-sm leading-6 text-[#7a6b5e]">
                {weddingConfig.event.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8d9c4] bg-[#fffaf3]/90 px-4 py-3 shadow-[0_-10px_40px_rgba(88,63,38,0.12)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-2">
          {bottomActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[#7a6b5e] transition hover:bg-[#f3e5d3] hover:text-[#2f2a25]"
              >
                <Icon className="h-5 w-5" strokeWidth={1.7} />
                <span className="text-[11px] font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}