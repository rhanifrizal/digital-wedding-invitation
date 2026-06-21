"use client";

import Image from "next/image";
import { Copy, Gift, Heart, QrCode } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "@/config/wedding.config";

export function GiftSheet() {
  const [copied, setCopied] = useState(false);

  const hasQrImage = Boolean(weddingConfig.moneyGift.qrImageUrl);

  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(weddingConfig.moneyGift.accountNumber);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-white/75 p-5 text-center shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#efd4d0]/35 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#d8b989]/25 blur-2xl" />

        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-[#fffaf3] text-[#b58a54] shadow-[0_10px_24px_rgba(181,138,84,0.12)]">
            <Gift className="h-7 w-7" strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
            Money Gift
          </p>

          <h3 className="mt-2 font-serif text-3xl leading-tight text-[#2f2a25]">
            Tanda Kasih
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#7a6b5e]">
            Doa restu dan kehadiran anda sudah cukup bermakna. Sekiranya ingin
            memberi sumbangan, boleh gunakan maklumat di bawah.
          </p>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-[#ead8bc] bg-[#fffaf3]/85 p-5 shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-white text-[#b58a54]">
            <Heart className="h-5 w-5" strokeWidth={1.7} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
              Maklumat Bank
            </p>

            <div className="mt-4 space-y-4">
              <GiftInfo label="Bank" value={weddingConfig.moneyGift.bankName} />

              <GiftInfo
                label="Nama Akaun"
                value={weddingConfig.moneyGift.accountHolder}
              />

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#9c7a4d]">
                  Nombor Akaun
                </p>

                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#ead8bc] bg-white px-4 py-3">
                  <p className="min-w-0 flex-1 break-all font-serif text-xl text-[#2f2a25]">
                    {weddingConfig.moneyGift.accountNumber}
                  </p>

                  <button
                    type="button"
                    onClick={handleCopyAccountNumber}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3e5d3] text-[#7a6b5e] transition hover:bg-[#ead8bc] hover:text-[#2f2a25]"
                    aria-label="Copy account number"
                  >
                    <Copy className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>

                <p className="mt-2 text-xs text-[#9c7a4d]">
                  {copied ? "Nombor akaun disalin." : "Tekan ikon untuk salin nombor akaun."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-[#ead8bc] bg-white/75 p-5 text-center shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-[#fffaf3] text-[#b58a54]">
          <QrCode className="h-5 w-5" strokeWidth={1.7} />
        </div>

        <p className="mt-4 text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
          QR Code
        </p>

        {hasQrImage ? (
          <div className="relative mx-auto mt-4 h-56 w-56 overflow-hidden rounded-[1.5rem] border border-[#ead8bc] bg-white p-3">
            <Image
              src={weddingConfig.moneyGift.qrImageUrl}
              alt="Money gift QR code"
              fill
              sizes="224px"
              className="object-contain p-3"
            />
          </div>
        ) : (
          <div className="mt-4 rounded-[1.5rem] border border-dashed border-[#d8b989] bg-[#fffaf3] px-5 py-8">
            <p className="text-sm font-medium text-[#2f2a25]">
              QR belum tersedia
            </p>
            <p className="mt-2 text-xs leading-5 text-[#7a6b5e]">
              Letakkan gambar QR di folder public dan masukkan path dalam
              wedding.config.ts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function GiftInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-[#9c7a4d]">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium leading-6 text-[#2f2a25]">
        {value}
      </p>
    </div>
  );
}