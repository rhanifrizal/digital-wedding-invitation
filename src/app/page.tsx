"use client";

import {
  CalendarDays,
  Gift,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import { FAQSection } from "@/components/sections/FAQSection";
import { CoupleSlideshowSection } from "@/components/sections/CoupleSlideshowSection";
import { GuestPhotoUploadSection } from "@/components/sections/GuestPhotoUploadSection";
import { MusicPlayer } from "@/components/shared/MusicPlayer";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { DecorativeSection } from "@/components/shared/DecorativeSection";

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
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const countdownRef = useRef<HTMLDivElement | null>(null);

  const activeAction = bottomActions.find((action) => action.key === activeSheet);

  useEffect(() => {
    if (isInvitationOpened) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isInvitationOpened]);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);

    window.setTimeout(() => {
      countdownRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 350);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f1] pb-32 text-[#2f2a25]">
      <HeroSection
        isOpened={isInvitationOpened}
        onOpenInvitation={handleOpenInvitation}
      />
      <MusicPlayer shouldPlay={isInvitationOpened} />

      {isInvitationOpened ? (
        <>
          <div ref={countdownRef}>
            <DecorativeSection className="pt-8 sm:pt-10">
              <CountdownSection />
            </DecorativeSection>
          </div>

          <SectionDivider />

          <DecorativeSection>
            <TimelineSection />
          </DecorativeSection>

          <SectionDivider />

          <DecorativeSection>
            <CoupleSlideshowSection />
          </DecorativeSection>

          <SectionDivider />

          <DecorativeSection>
            <EventDetailsSection />
          </DecorativeSection>

          <SectionDivider />

          <DecorativeSection>
            <GuestPhotoUploadSection />
          </DecorativeSection>

          <SectionDivider />

          <DecorativeSection className="pb-8">
            <FAQSection />
          </DecorativeSection>
        </>
      ) : null}

      {isInvitationOpened ? (
        <nav className="fixed inset-x-0 bottom-4 z-50 px-4">
          <div className="mx-auto max-w-md rounded-[2rem] border border-[#ead8bc] bg-[#fffaf3]/88 p-2 shadow-[0_18px_60px_rgba(47,42,37,0.18)] backdrop-blur-xl">
            <div className="grid grid-cols-5 gap-1.5">
              {bottomActions.map((action) => {
                const Icon = action.icon;
                const isActive = activeSheet === action.key;

                return (
                  <button
                    key={action.key}
                    type="button"
                    onClick={() => setActiveSheet(action.key)}
                    className={`group relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-[1.5rem] px-2 py-2.5 transition ${
                      isActive
                        ? "bg-[#2f2a25] text-white shadow-[0_10px_24px_rgba(47,42,37,0.22)]"
                        : "text-[#7a6b5e] hover:bg-white hover:text-[#2f2a25]"
                    }`}
                  >
                    {isActive ? (
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,185,137,0.28),_transparent_55%)]" />
                    ) : null}

                    <Icon
                      className={`relative h-5 w-5 transition ${
                        isActive ? "scale-105" : "group-hover:-translate-y-0.5"
                      }`}
                      strokeWidth={1.7}
                    />

                    <span className="relative text-[10.5px] font-medium leading-none">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      ) : null}

      <BottomSheet
        isOpen={isInvitationOpened && activeSheet !== null}
        title={activeAction?.title ?? ""}
        onClose={() => setActiveSheet(null)}
      >
        {activeSheet ? sheetContent[activeSheet] : null}
      </BottomSheet>
    </main>
  );
}