"use client";

import { MessageCircle, Phone, UserRound } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

type ContactCardProps = {
  label: string;
  name: string;
  phone: string;
};

function getWhatsAppUrl(phone: string) {
  const normalizedPhone = phone.replace(/\D/g, "");
  const message = encodeURIComponent(
    "Assalamualaikum, saya ingin bertanya berkenaan majlis perkahwinan.",
  );

  return `https://wa.me/${normalizedPhone}?text=${message}`;
}

function ContactCard({ label, name, phone }: ContactCardProps) {
  const normalizedPhone = phone.replace(/\D/g, "");

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-white/75 p-5 shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#efd4d0]/35 blur-2xl" />

      <div className="relative z-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-[#fffaf3] text-[#b58a54] shadow-[0_10px_24px_rgba(181,138,84,0.12)]">
          <UserRound className="h-6 w-6" strokeWidth={1.7} />
        </div>

        <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
          {label}
        </p>

        <h3 className="mt-2 font-serif text-3xl leading-tight text-[#2f2a25]">
          {name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#7a6b5e]">
          +{normalizedPhone}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href={getWhatsAppUrl(phone)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
            WhatsApp
          </a>

          <a
            href={`tel:+${normalizedPhone}`}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#d8b989] bg-white px-5 py-3 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3]"
          >
            <Phone className="h-4 w-4" strokeWidth={1.8} />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}

export function ContactSheet() {
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-[#fffaf3]/85 p-5 text-center shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#efd4d0]/35 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#d8b989]/25 blur-2xl" />

        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-white text-[#b58a54] shadow-[0_10px_24px_rgba(181,138,84,0.12)]">
            <Phone className="h-7 w-7" strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
            Hubungi Wakil
          </p>

          <h3 className="mt-2 font-serif text-3xl leading-tight text-[#2f2a25]">
            Ada Pertanyaan?
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#7a6b5e]">
            Sila hubungi wakil keluarga sekiranya ada sebarang pertanyaan
            berkaitan majlis.
          </p>
        </div>
      </div>

      <ContactCard
        label="Pihak Lelaki"
        name={weddingConfig.contact.groomSide.name}
        phone={weddingConfig.contact.groomSide.phone}
      />

      <ContactCard
        label="Pihak Perempuan"
        name={weddingConfig.contact.brideSide.name}
        phone={weddingConfig.contact.brideSide.phone}
      />
    </div>
  );
}