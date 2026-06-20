"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

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

  const isNotAttending = form.attendanceStatus === "not_attending";

  const updateForm = (field: keyof RSVPFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "attendanceStatus" && value === "not_attending"
        ? { paxCount: "0" }
        : {}),
      ...(field === "attendanceStatus" && value === "attending"
        ? { paxCount: current.paxCount === "0" ? "1" : current.paxCount }
        : {}),
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    const trimmedName = form.name.trim();
    const trimmedPhone = form.phone.trim();
    const trimmedMessage = form.message.trim();
    const paxCount = Number(form.paxCount);

    if (!trimmedName) {
      setErrorMessage("Sila masukkan nama.");
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

    setIsSubmitting(true);

    const { error } = await supabase.from("rsvps").insert({
      name: trimmedName,
      phone: trimmedPhone || null,
      attendance_status: form.attendanceStatus,
      pax_count: form.attendanceStatus === "attending" ? paxCount : 0,
      message: trimmedMessage || null,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage("Maaf, RSVP tidak berjaya dihantar. Sila cuba lagi.");
      return;
    }

    setForm(initialFormState);
    setSuccessMessage("Terima kasih. RSVP anda telah direkodkan.");
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="text-sm font-medium text-[#2f2a25]">Nama</label>
        <input
          type="text"
          value={form.name}
          onChange={(event) => updateForm("name", event.target.value)}
          placeholder="Nama anda"
          className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[#2f2a25]">
          Nombor Telefon
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(event) => updateForm("phone", event.target.value)}
          placeholder="Contoh: 0123456789"
          className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[#2f2a25]">Kehadiran</label>
        <select
          value={form.attendanceStatus}
          onChange={(event) =>
            updateForm("attendanceStatus", event.target.value)
          }
          className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
        >
          <option value="">Pilih kehadiran</option>
          <option value="attending">Hadir</option>
          <option value="not_attending">Tidak hadir</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-[#2f2a25]">
          Bilangan Pax
        </label>
        <input
          type="number"
          min={isNotAttending ? 0 : 1}
          max={20}
          value={form.paxCount}
          disabled={isNotAttending}
          onChange={(event) => updateForm("paxCount", event.target.value)}
          placeholder="Contoh: 2"
          className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54] disabled:bg-[#f3e5d3] disabled:text-[#9c7a4d]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[#2f2a25]">
          Nota / Pesanan
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(event) => updateForm("message", event.target.value)}
          placeholder="Contoh: InsyaAllah hadir bersama keluarga"
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
  );
}