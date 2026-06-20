"use client";

import { useState } from "react";

type RSVP = {
  id: string;
  name: string;
  phone: string | null;
  attendance_status: "attending" | "not_attending";
  pax_count: number;
  message: string | null;
  created_at: string;
};

type GuestbookMessage = {
  id: string;
  name: string;
  message: string;
  is_visible: boolean;
  created_at: string;
};

type AdminData = {
  summary: {
    totalRsvp: number;
    totalAttending: number;
    totalNotAttending: number;
    totalPax: number;
    totalGuestbookMessages: number;
    totalVisibleGuestbookMessages: number;
  };
  rsvps: RSVP[];
  guestbookMessages: GuestbookMessage[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ms-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboard = async (passwordToUse = adminPassword) => {
    setIsLoading(true);
    setErrorMessage("");

    const response = await fetch("/api/admin/dashboard", {
      headers: {
        "x-admin-password": passwordToUse,
      },
    });

    setIsLoading(false);

    if (!response.ok) {
      setErrorMessage("Password salah atau data tidak dapat dimuatkan.");
      return;
    }

    const result = (await response.json()) as AdminData;
    setData(result);
  };

  const handleLogin = async () => {
    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      setErrorMessage("Sila masukkan password admin.");
      return;
    }

    setAdminPassword(trimmedPassword);
    await loadDashboard(trimmedPassword);
  };

  const toggleGuestbookVisibility = async (
    messageId: string,
    currentVisibility: boolean,
  ) => {
    if (!adminPassword) return;

    const nextVisibility = !currentVisibility;

    const response = await fetch("/api/admin/dashboard", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": adminPassword,
      },
      body: JSON.stringify({
        messageId,
        isVisible: nextVisibility,
      }),
    });

    if (!response.ok) {
      setErrorMessage("Gagal update status ucapan.");
      return;
    }

    setData((current) => {
      if (!current) return current;

      return {
        ...current,
        summary: {
          ...current.summary,
          totalVisibleGuestbookMessages: current.guestbookMessages.filter(
            (item) =>
              item.id === messageId ? nextVisibility : item.is_visible,
          ).length,
        },
        guestbookMessages: current.guestbookMessages.map((item) =>
          item.id === messageId
            ? { ...item, is_visible: nextVisibility }
            : item,
        ),
      };
    });
  };

  if (!data) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#fdf8f1] px-6 text-[#2f2a25]">
        <div className="w-full max-w-md rounded-[2rem] border border-[#ead8bc] bg-white/75 p-6 shadow-[0_20px_70px_rgba(88,63,38,0.1)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9c7a4d]">
            Admin
          </p>

          <h1 className="mt-3 font-serif text-3xl">Wedding Dashboard</h1>

          <p className="mt-3 text-sm leading-6 text-[#7a6b5e]">
            Masukkan password admin untuk lihat RSVP dan guestbook.
          </p>

          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage("");
            }}
            placeholder="Admin password"
            className="mt-6 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
          />

          {errorMessage ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="mt-5 w-full rounded-2xl bg-[#2f2a25] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Loading..." : "Login Admin"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#fdf8f1] px-5 py-8 text-[#2f2a25]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#9c7a4d]">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl">Wedding Dashboard</h1>
            <p className="mt-2 text-sm text-[#7a6b5e]">
              RSVP summary and guestbook management.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadDashboard()}
            disabled={isLoading}
            className="rounded-2xl border border-[#d8b989] bg-white px-5 py-3 text-sm font-medium transition hover:bg-[#f3e5d3] disabled:opacity-60"
          >
            {isLoading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <SummaryCard label="Total RSVP" value={data.summary.totalRsvp} />
          <SummaryCard label="Hadir" value={data.summary.totalAttending} />
          <SummaryCard
            label="Tidak Hadir"
            value={data.summary.totalNotAttending}
          />
          <SummaryCard label="Total Pax" value={data.summary.totalPax} />
          <SummaryCard
            label="Guestbook"
            value={data.summary.totalGuestbookMessages}
          />
          <SummaryCard
            label="Visible"
            value={data.summary.totalVisibleGuestbookMessages}
          />
        </section>

        {errorMessage ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#ead8bc] bg-white/75 p-5 shadow-[0_20px_70px_rgba(88,63,38,0.08)]">
            <h2 className="font-serif text-2xl">RSVP List</h2>

            <div className="mt-5 max-h-[36rem] space-y-3 overflow-y-auto pr-1">
              {data.rsvps.length === 0 ? (
                <p className="text-sm text-[#7a6b5e]">No RSVP yet.</p>
              ) : (
                data.rsvps.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-[#ead8bc] bg-[#fffaf3] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="mt-1 text-xs text-[#9c7a4d]">
                          {formatDate(item.created_at)}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.attendance_status === "attending"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.attendance_status === "attending"
                          ? "Hadir"
                          : "Tidak Hadir"}
                      </span>
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-[#7a6b5e]">
                      <p>Pax: {item.pax_count}</p>
                      {item.phone ? <p>Phone: {item.phone}</p> : null}
                      {item.message ? <p>Note: {item.message}</p> : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ead8bc] bg-white/75 p-5 shadow-[0_20px_70px_rgba(88,63,38,0.08)]">
            <h2 className="font-serif text-2xl">Guestbook</h2>

            <div className="mt-5 max-h-[36rem] space-y-3 overflow-y-auto pr-1">
              {data.guestbookMessages.length === 0 ? (
                <p className="text-sm text-[#7a6b5e]">No guestbook messages yet.</p>
              ) : (
                data.guestbookMessages.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-[#ead8bc] bg-[#fffaf3] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="mt-1 text-xs text-[#9c7a4d]">
                          {formatDate(item.created_at)}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.is_visible
                            ? "bg-green-100 text-green-700"
                            : "bg-neutral-200 text-neutral-600"
                        }`}
                      >
                        {item.is_visible ? "Visible" : "Hidden"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[#7a6b5e]">
                      {item.message}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        toggleGuestbookVisibility(item.id, item.is_visible)
                      }
                      className="mt-4 rounded-2xl border border-[#d8b989] bg-white px-4 py-2 text-sm font-medium transition hover:bg-[#f3e5d3]"
                    >
                      {item.is_visible ? "Hide Message" : "Show Message"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-[#ead8bc] bg-white/75 p-5 shadow-[0_16px_50px_rgba(88,63,38,0.08)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[#9c7a4d]">
        {label}
      </p>
      <p className="mt-3 font-serif text-3xl">{value}</p>
    </div>
  );
}