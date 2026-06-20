"use client";

import { Camera, ImagePlus, UploadCloud } from "lucide-react";
import { motion } from "motion/react";
import { weddingConfig } from "@/config/wedding.config";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function GuestPhotoUploadSection() {
  return (
    <div>
      <SectionTitle
        eyebrow="Memori Majlis"
        title="Kongsi Gambar"
        description="Bantu kami kumpulkan kenangan indah daripada pandangan anda sepanjang majlis berlangsung."
      />

      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-[#fffaf3]/85 p-6 text-center shadow-[0_16px_45px_rgba(88,63,38,0.07)]"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#efd4d0]/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-14 -left-14 h-36 w-36 rounded-full bg-[#d8b989]/25 blur-3xl" />

          <div className="relative z-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d8b989]/70 bg-white text-[#b58a54] shadow-[0_14px_35px_rgba(181,138,84,0.16)]">
              <Camera className="h-8 w-8" strokeWidth={1.6} />
            </div>

            <h3 className="mt-6 font-serif text-3xl text-[#2f2a25]">
              Upload Gambar Majlis
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#7a6b5e]">
              Selepas majlis, anda boleh kongsikan gambar atau video yang
              dirakam supaya kami dapat simpan sebagai kenangan bersama.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#ead8bc] bg-white/75 p-4">
                <ImagePlus
                  className="mx-auto h-5 w-5 text-[#b58a54]"
                  strokeWidth={1.7}
                />
                <p className="mt-2 text-sm font-medium text-[#2f2a25]">
                  Gambar & Video
                </p>
                <p className="mt-1 text-xs leading-5 text-[#7a6b5e]">
                  Kongsi detik candid, suasana majlis, dan momen bersama.
                </p>
              </div>

              <div className="rounded-2xl border border-[#ead8bc] bg-white/75 p-4">
                <UploadCloud
                  className="mx-auto h-5 w-5 text-[#b58a54]"
                  strokeWidth={1.7}
                />
                <p className="mt-2 text-sm font-medium text-[#2f2a25]">
                  Google Drive
                </p>
                <p className="mt-1 text-xs leading-5 text-[#7a6b5e]">
                  Fail akan dimuat naik melalui pautan Google Drive.
                </p>
              </div>
            </div>

            <a
              href={weddingConfig.guestPhotos.googleDriveUploadUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31] sm:w-auto"
            >
              <UploadCloud className="h-4 w-4" strokeWidth={1.8} />
              Upload Gambar
            </a>

            <p className="mt-4 text-xs leading-5 text-[#9c7a4d]">
              Terima kasih kerana membantu kami menyimpan memori hari bahagia
              ini.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}