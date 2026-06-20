"use client";

import { Copy, Gift } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export function GiftSheet() {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(weddingConfig.moneyGift.accountNumber);
    alert("Account number copied");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-[#ead8bc] bg-white/70 p-5 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e5d3] text-[#9c7a4d]">
          <Gift className="h-6 w-6" />
        </div>

        <p className="mt-4 text-sm leading-6 text-[#7a6b5e]">
          Doa restu anda sudah cukup bermakna. Jika ingin memberi hadiah, boleh
          gunakan maklumat di bawah.
        </p>
      </div>

      {weddingConfig.moneyGift.qrImageUrl ? (
        <div className="rounded-3xl border border-[#ead8bc] bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={weddingConfig.moneyGift.qrImageUrl}
            alt="Money gift QR"
            className="mx-auto aspect-square w-full max-w-56 rounded-2xl object-cover"
          />
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#d8b989] bg-white/60 p-8 text-center text-sm text-[#7a6b5e]">
          QR gift image will be added later.
        </div>
      )}

      <div className="rounded-3xl border border-[#ead8bc] bg-white/70 p-5">
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9c7a4d]">
              Bank
            </p>
            <p className="font-medium text-[#2f2a25]">
              {weddingConfig.moneyGift.bankName}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9c7a4d]">
              Account Holder
            </p>
            <p className="font-medium text-[#2f2a25]">
              {weddingConfig.moneyGift.accountHolder}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9c7a4d]">
              Account Number
            </p>
            <p className="font-medium text-[#2f2a25]">
              {weddingConfig.moneyGift.accountNumber}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31]"
        >
          <Copy className="h-4 w-4" />
          Copy Account Number
        </button>
      </div>
    </div>
  );
}