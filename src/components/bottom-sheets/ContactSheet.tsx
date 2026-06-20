import { Phone, MessageCircle } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export function ContactSheet() {
  const contacts = [
    weddingConfig.contact.groomSide,
    weddingConfig.contact.brideSide,
  ];

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div
          key={contact.phone}
          className="rounded-3xl border border-[#ead8bc] bg-white/70 p-5"
        >
          <p className="font-medium text-[#2f2a25]">{contact.name}</p>
          <p className="mt-1 text-sm text-[#7a6b5e]">+{contact.phone}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={`tel:+${contact.phone}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#d8b989] bg-white px-4 py-3 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3]"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>

            <a
              href={`https://wa.me/${contact.phone}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}