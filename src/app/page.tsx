import {
  CalendarDays,
  Gift,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { EventDetailsSection } from "@/components/sections/EventDetailsSection";

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
    <main className="min-h-screen bg-[#fdf8f1] pb-28 text-[#2f2a25]">
      <HeroSection />
      <CountdownSection />
      <EventDetailsSection />

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