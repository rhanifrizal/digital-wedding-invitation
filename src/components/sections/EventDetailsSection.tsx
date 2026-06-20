import { weddingConfig } from "@/config/wedding.config";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function EventDetailsSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-md rounded-[2rem] border border-[#ead8bc] bg-white/65 p-6 shadow-[0_20px_70px_rgba(88,63,38,0.1)] backdrop-blur">
        <SectionTitle eyebrow="Event Details" title="Jemputan Majlis" />

        <div className="mt-8 space-y-5 text-left">
          <div>
            <p className="text-sm text-[#9c7a4d]">Tarikh</p>
            <p className="text-base font-medium">
              {weddingConfig.event.displayDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#9c7a4d]">Masa</p>
            <p className="text-base font-medium">{weddingConfig.event.time}</p>
          </div>

          <div>
            <p className="text-sm text-[#9c7a4d]">Tempat</p>
            <p className="text-base font-medium">
              {weddingConfig.event.venueName}
            </p>
            <p className="mt-1 text-sm leading-6 text-[#7a6b5e]">
              {weddingConfig.event.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}