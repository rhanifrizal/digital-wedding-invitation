"use client";

import {
  CalendarDays,
  Gift,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { EventDetailsSection } from "@/components/sections/EventDetailsSection";
import { BottomSheet } from "@/components/shared/BottomSheet";
import { LocationSheet } from "@/components/bottom-sheets/LocationSheet";
import { RSVPSheet } from "@/components/bottom-sheets/RSVPSheet";
import { GiftSheet } from "@/components/bottom-sheets/GiftSheet";
import { GuestbookSheet } from "@/components/bottom-sheets/GuestbookSheet";
import { ContactSheet } from "@/components/bottom-sheets/ContactSheet";

type BottomActionKey = "location" | "rsvp" | "gift" | "guestbook" | "contact";

const bottomActions = [
  {
    key: "location",
    label: "Lokasi",
    title: "Lokasi Majlis",
    icon: MapPin,
  },
  {
    key: "rsvp",
    label: "RSVP",
    title: "RSVP Kehadiran",
    icon: CalendarDays,
  },
  {
    key: "gift",
    label: "Gift",
    title: "Money Gift",
    icon: Gift,
  },
  {
    key: "guestbook",
    label: "Ucapan",
    title: "Ucapan Tetamu",
    icon: MessageCircle,
  },
  {
    key: "contact",
    label: "Hubungi",
    title: "Hubungi Wakil",
    icon: Phone,
  },
] as const;

const sheetContent: Record<BottomActionKey, React.ReactNode> = {
  location: <LocationSheet />,
  rsvp: <RSVPSheet />,
  gift: <GiftSheet />,
  guestbook: <GuestbookSheet />,
  contact: <ContactSheet />,
};

export default function Home() {
  const [activeSheet, setActiveSheet] = useState<BottomActionKey | null>(null);

  const activeAction = bottomActions.find((action) => action.key === activeSheet);

  return (
    <main className="min-h-screen bg-[#fdf8f1] pb-28 text-[#2f2a25]">
      <HeroSection />
      <CountdownSection />
      <TimelineSection />
      <EventDetailsSection />

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8d9c4] bg-[#fffaf3]/90 px-4 py-3 shadow-[0_-10px_40px_rgba(88,63,38,0.12)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-2">
          {bottomActions.map((action) => {
            const Icon = action.icon;
            const isActive = activeSheet === action.key;

            return (
              <button
                key={action.key}
                type="button"
                onClick={() => setActiveSheet(action.key)}
                className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 transition ${
                  isActive
                    ? "bg-[#2f2a25] text-white"
                    : "text-[#7a6b5e] hover:bg-[#f3e5d3] hover:text-[#2f2a25]"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.7} />
                <span className="text-[11px] font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <BottomSheet
        isOpen={activeSheet !== null}
        title={activeAction?.title ?? ""}
        onClose={() => setActiveSheet(null)}
      >
        {activeSheet ? sheetContent[activeSheet] : null}
      </BottomSheet>
    </main>
  );
}