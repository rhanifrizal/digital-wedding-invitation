"use client";

import { motion } from "motion/react";
import { Camera, Upload } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { weddingConfig } from "@/config/wedding.config";

export function GuestPhotoUploadSection() {
  return (
    <section className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-md"
      >
        <SectionTitle
          eyebrow="Share Moments"
          title="Kongsi Gambar Majlis"
          description="Jika anda mengambil gambar semasa majlis, kami sangat menghargai jika anda sudi berkongsi kenangan tersebut bersama kami."
        />

        <div className="mt-8 rounded-[2rem] border border-[#ead8bc] bg-white/70 p-6 text-center shadow-[0_20px_70px_rgba(88,63,38,0.1)] backdrop-blur">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f3e5d3] text-[#9c7a4d]">
            <Camera className="h-7 w-7" strokeWidth={1.6} />
          </div>

          <p className="mt-5 text-sm leading-6 text-[#7a6b5e]">
            Tekan butang di bawah untuk upload gambar ke folder Google Drive
            kami. Tetamu hanya perlu upload gambar tanpa perlu edit atau delete
            apa-apa.
          </p>

          <a
            href={weddingConfig.guestPhotos.googleDriveUploadUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-5 py-4 text-sm font-medium text-white shadow-[0_18px_45px_rgba(47,42,37,0.18)] transition hover:-translate-y-0.5 hover:bg-[#4a3b31]"
          >
            <Upload className="h-4 w-4" />
            Upload Gambar
          </a>

          <p className="mt-4 text-xs leading-5 text-[#9c7a4d]">
            Nota: Buat masa ini, gambar yang diupload akan disimpan di Google
            Drive dan tidak dipaparkan secara automatik di laman ini.
          </p>
        </div>
      </motion.div>
    </section>
  );
}