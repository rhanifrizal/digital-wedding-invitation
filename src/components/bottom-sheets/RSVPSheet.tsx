"use client";

import { CheckCircle2, UserRound, UsersRound, XCircle } from "lucide-react";
import { useState } from "react";

type AttendanceStatus = "attending" | "not_attending";

type RSVPFormState = {
  name: string;
  phone: string;
  attendanceStatus: AttendanceStatus | "";
  paxCount: string;
  message: string;
};

const initialFormState: RSVPFormState = {
  name: "",
  phone: "",
  attendanceStatus: "",
  paxCount: "1",
  message: "",
};

export function RSVPSheet() {
  const [form, setForm] = useState<RSVPFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateForm = (key: keyof RSVPFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const updateAttendanceStatus = (status: AttendanceStatus) => {
    setForm((current) => ({
      ...current,
      attendanceStatus: status,
      paxCount: status === "attending" ? current.paxCount || "1" : "0",
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    const trimmedName = form.name.trim();
    const normalizedPhone = form.phone.replace(/\D/g, "");
    const trimmedMessage = form.message.trim();
    const paxCount = Number(form.paxCount);

    if (!trimmedName) {
      setErrorMessage("Sila masukkan nama.");
      return;
    }

    if (normalizedPhone.length < 10 || normalizedPhone.length > 11) {
      setErrorMessage("Nombor telefon mesti mempunyai 10 hingga 11 digit.");
      return;
    }

    if (!form.attendanceStatus) {
      setErrorMessage("Sila pilih status kehadiran.");
      return;
    }

    if (form.attendanceStatus === "attending" && (!paxCount || paxCount < 1)) {
      setErrorMessage("Sila masukkan bilangan pax yang betul.");
      return;
    }

    if (paxCount > 20) {
      setErrorMessage("Bilangan pax tidak boleh melebihi 20 orang.");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: trimmedName,
        phone: normalizedPhone,
        attendanceStatus: form.attendanceStatus,
        paxCount: form.attendanceStatus === "attending" ? paxCount : 0,
        message: trimmedMessage || null,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const result = (await response.json()) as {
        error?: string;
      };

      setErrorMessage(
        result.error || "Maaf, RSVP tidak berjaya dihantar. Sila cuba lagi.",
      );
      return;
    }

    setForm(initialFormState);
    setSuccessMessage("Terima kasih. RSVP anda telah direkodkan.");
  };

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-white/75 p-5 shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#efd4d0]/35 blur-2xl" />

        <div className="relative z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-[#fffaf3] text-[#b58a54] shadow-[0_10px_24px_rgba(181,138,84,0.12)]">
            <UsersRound className="h-6 w-6" strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
            Pengesahan Kehadiran
          </p>

          <h3 className="mt-2 font-serif text-3xl leading-tight text-[#2f2a25]">
            RSVP Majlis
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#7a6b5e]">
            Sila maklumkan kehadiran anda supaya pihak keluarga dapat membuat
            persiapan dengan lebih baik.
          </p>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium text-[#2f2a25]">Nama</label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 transition focus-within:border-[#b58a54]">
            <UserRound className="h-4 w-4 text-[#b58a54]" strokeWidth={1.8} />
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Nama anda"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#2f2a25]">
            Nombor Telefon
          </label>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={form.phone}
            onChange={(event) => {
              const digitsOnly = event.target.value.replace(/\D/g, "");
              updateForm("phone", digitsOnly);
            }}
            placeholder="Contoh: 0123456789"
            minLength={10}
            maxLength={11}
            className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
          />
          <p className="mt-1 text-xs text-[#9c7a4d]">
            Masukkan 10 hingga 11 digit sahaja.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-[#2f2a25]">
            Status Kehadiran
          </label>

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => updateAttendanceStatus("attending")}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                form.attendanceStatus === "attending"
                  ? "border-green-300 bg-green-50 text-green-800"
                  : "border-[#ead8bc] bg-white text-[#2f2a25] hover:bg-[#f3e5d3]"
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-medium">Hadir</p>
                  <p className="mt-1 text-xs opacity-75">
                    Akan hadir ke majlis
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => updateAttendanceStatus("not_attending")}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                form.attendanceStatus === "not_attending"
                  ? "border-red-300 bg-red-50 text-red-800"
                  : "border-[#ead8bc] bg-white text-[#2f2a25] hover:bg-[#f3e5d3]"
              }`}
            >
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-medium">Tidak Hadir</p>
                  <p className="mt-1 text-xs opacity-75">
                    Tidak dapat hadir
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {form.attendanceStatus === "attending" ? (
          <div>
            <label className="text-sm font-medium text-[#2f2a25]">
              Bilangan Pax
            </label>
            <select
              value={form.paxCount}
              onChange={(event) => updateForm("paxCount", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const pax = index + 1;

                return (
                  <option key={pax} value={pax}>
                    {pax} orang
                  </option>
                );
              })}
            </select>
          </div>
        ) : null}

        <div>
          <label className="text-sm font-medium text-[#2f2a25]">
            Nota / Pesanan
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(event) => updateForm("message", event.target.value)}
            placeholder="Contoh: Hadir bersama keluarga"
            className="mt-2 w-full resize-none rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
          />
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
            {successMessage}
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-[#2f2a25] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Menghantar..." : "Hantar RSVP"}
        </button>
      </form>
    </div>
  );
}