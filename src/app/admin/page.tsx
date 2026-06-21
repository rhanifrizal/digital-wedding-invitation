"use client";

import { AnimatePresence, motion } from "motion/react";
import { RefreshCw, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

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

type RSVPFilter = "all" | "attending" | "not_attending";
type GuestbookFilter = "all" | "visible" | "hidden";

const RSVP_PAGE_SIZE = 8;
const GUESTBOOK_PAGE_SIZE = 8;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ms-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoSyncing, setIsAutoSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [rsvpSearch, setRsvpSearch] = useState("");
  const [rsvpFilter, setRsvpFilter] = useState<RSVPFilter>("all");
  const [rsvpPage, setRsvpPage] = useState(1);

  const [guestbookSearch, setGuestbookSearch] = useState("");
  const [guestbookFilter, setGuestbookFilter] =
    useState<GuestbookFilter>("all");
  const [guestbookPage, setGuestbookPage] = useState(1);

  const loadDashboard = useCallback(
    async (passwordToUse = adminPassword, isSilent = false) => {
      if (!passwordToUse) return;

      if (isSilent) {
        setIsAutoSyncing(true);
      } else {
        setIsLoading(true);
      }

      setErrorMessage("");

      const response = await fetch("/api/admin/dashboard", {
        headers: {
          "x-admin-password": passwordToUse,
        },
      });

      setIsLoading(false);
      setIsAutoSyncing(false);

      if (!response.ok) {
        setErrorMessage("Password salah atau data tidak dapat dimuatkan.");
        return;
      }

      const result = (await response.json()) as AdminData;
      setData(result);
    },
    [adminPassword],
  );

  useEffect(() => {
    if (!adminPassword || !data) return;

    const syncTimer = window.setInterval(() => {
      loadDashboard(adminPassword, true);
    }, 3000);

    return () => {
      window.clearInterval(syncTimer);
    };
  }, [adminPassword, data, loadDashboard]);

  const filteredRsvps = useMemo(() => {
    const keyword = rsvpSearch.trim().toLowerCase();
    const rsvps = data?.rsvps ?? [];

    return rsvps.filter((item) => {
      const matchesFilter =
        rsvpFilter === "all" || item.attendance_status === rsvpFilter;

      const matchesSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword) ||
        item.message?.toLowerCase().includes(keyword);

      return matchesFilter && matchesSearch;
    });
  }, [data?.rsvps, rsvpFilter, rsvpSearch]);

  const filteredGuestbookMessages = useMemo(() => {
    const keyword = guestbookSearch.trim().toLowerCase();
    const messages = data?.guestbookMessages ?? [];

    return messages.filter((item) => {
      const matchesFilter =
        guestbookFilter === "all" ||
        (guestbookFilter === "visible" && item.is_visible) ||
        (guestbookFilter === "hidden" && !item.is_visible);

      const matchesSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.message.toLowerCase().includes(keyword);

      return matchesFilter && matchesSearch;
    });
  }, [data?.guestbookMessages, guestbookFilter, guestbookSearch]);

  const rsvpTotalPages = Math.max(
    1,
    Math.ceil(filteredRsvps.length / RSVP_PAGE_SIZE),
  );

  const guestbookTotalPages = Math.max(
    1,
    Math.ceil(filteredGuestbookMessages.length / GUESTBOOK_PAGE_SIZE),
  );

  const paginatedRsvps = paginate(filteredRsvps, rsvpPage, RSVP_PAGE_SIZE);

  const paginatedGuestbookMessages = paginate(
    filteredGuestbookMessages,
    guestbookPage,
    GUESTBOOK_PAGE_SIZE,
  );

  useEffect(() => {
    setRsvpPage(1);
  }, [rsvpSearch, rsvpFilter]);

  useEffect(() => {
    setGuestbookPage(1);
  }, [guestbookSearch, guestbookFilter]);

  useEffect(() => {
    if (rsvpPage > rsvpTotalPages) {
      setRsvpPage(rsvpTotalPages);
    }
  }, [rsvpPage, rsvpTotalPages]);

  useEffect(() => {
    if (guestbookPage > guestbookTotalPages) {
      setGuestbookPage(guestbookTotalPages);
    }
  }, [guestbookPage, guestbookTotalPages]);

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

      const updatedGuestbookMessages = current.guestbookMessages.map((item) =>
        item.id === messageId
          ? { ...item, is_visible: nextVisibility }
          : item,
      );

      return {
        ...current,
        summary: {
          ...current.summary,
          totalVisibleGuestbookMessages: updatedGuestbookMessages.filter(
            (item) => item.is_visible,
          ).length,
        },
        guestbookMessages: updatedGuestbookMessages,
      };
    });
  };

  if (!data) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#fdf8f1] px-6 text-[#2f2a25]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md rounded-[2rem] border border-[#ead8bc] bg-white/75 p-6 shadow-[0_20px_70px_rgba(88,63,38,0.1)]"
        >
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
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
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#fdf8f1] px-5 py-8 text-[#2f2a25]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#9c7a4d]">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl">Wedding Dashboard</h1>
            <p className="mt-2 text-sm text-[#7a6b5e]">
              RSVP summary, guestbook moderation, search, filter and pagination.
            </p>
            <p className="mt-2 text-xs text-[#9c7a4d]">
              {isAutoSyncing ? "Syncing latest data..." : "Auto-sync enabled"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadDashboard(adminPassword)}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#d8b989] bg-white px-5 py-3 text-sm font-medium transition hover:bg-[#f3e5d3] disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              strokeWidth={1.8}
            />
            {isLoading ? "Refreshing..." : "Refresh Now"}
          </button>
        </div>

        <motion.section
          layout
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
        >
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
        </motion.section>

        {errorMessage ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-[#ead8bc] bg-white/75 p-5 shadow-[0_20px_70px_rgba(88,63,38,0.08)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-2xl">RSVP List</h2>
                <p className="mt-1 text-sm text-[#7a6b5e]">
                  Showing {paginatedRsvps.length} of {filteredRsvps.length}{" "}
                  filtered records.
                </p>
              </div>

              <FilterPills
                value={rsvpFilter}
                options={[
                  { label: "All", value: "all" },
                  { label: "Hadir", value: "attending" },
                  { label: "Tidak Hadir", value: "not_attending" },
                ]}
                onChange={(value) => setRsvpFilter(value as RSVPFilter)}
              />
            </div>

            <SearchInput
              value={rsvpSearch}
              onChange={setRsvpSearch}
              placeholder="Search name, phone, or note..."
            />

            <div className="mt-5 min-h-[36rem] space-y-3">
              {paginatedRsvps.length === 0 ? (
                <EmptyState text="No RSVP found." />
              ) : (
                <AnimatePresence initial={false}>
                  {paginatedRsvps.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                        layout: {
                          duration: 0.25,
                        },
                      }}
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
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            <Pagination
              page={rsvpPage}
              totalPages={rsvpTotalPages}
              onPrevious={() => setRsvpPage((current) => current - 1)}
              onNext={() => setRsvpPage((current) => current + 1)}
            />
          </div>

          <div className="rounded-[2rem] border border-[#ead8bc] bg-white/75 p-5 shadow-[0_20px_70px_rgba(88,63,38,0.08)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-2xl">Guestbook</h2>
                <p className="mt-1 text-sm text-[#7a6b5e]">
                  Showing {paginatedGuestbookMessages.length} of{" "}
                  {filteredGuestbookMessages.length} filtered messages.
                </p>
              </div>

              <FilterPills
                value={guestbookFilter}
                options={[
                  { label: "All", value: "all" },
                  { label: "Visible", value: "visible" },
                  { label: "Hidden", value: "hidden" },
                ]}
                onChange={(value) =>
                  setGuestbookFilter(value as GuestbookFilter)
                }
              />
            </div>

            <SearchInput
              value={guestbookSearch}
              onChange={setGuestbookSearch}
              placeholder="Search name or message..."
            />

            <div className="mt-5 min-h-[36rem] space-y-3">
              {paginatedGuestbookMessages.length === 0 ? (
                <EmptyState text="No guestbook messages found." />
              ) : (
                <AnimatePresence initial={false}>
                  {paginatedGuestbookMessages.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                        layout: {
                          duration: 0.25,
                        },
                      }}
                      className={`rounded-3xl border p-4 transition-colors ${
                        item.is_visible
                          ? "border-[#ead8bc] bg-[#fffaf3]"
                          : "border-neutral-200 bg-neutral-100"
                      }`}
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
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            <Pagination
              page={guestbookPage}
              totalPages={guestbookTotalPages}
              onPrevious={() => setGuestbookPage((current) => current - 1)}
              onNext={() => setGuestbookPage((current) => current + 1)}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-3xl border border-[#ead8bc] bg-white/75 p-5 shadow-[0_16px_50px_rgba(88,63,38,0.08)]"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[#9c7a4d]">
        {label}
      </p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="mt-3 font-serif text-3xl"
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 transition focus-within:border-[#b58a54]">
      <Search className="h-4 w-4 text-[#b58a54]" strokeWidth={1.8} />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}

function FilterPills({
  value,
  options,
  onChange,
}: {
  value: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? "bg-[#2f2a25] text-white"
                : "border border-[#ead8bc] bg-white text-[#7a6b5e] hover:bg-[#f3e5d3] hover:text-[#2f2a25]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#ead8bc] pt-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page <= 1}
        className="rounded-2xl border border-[#d8b989] bg-white px-4 py-2 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <p className="text-sm text-[#7a6b5e]">
        Page {page} of {totalPages}
      </p>

      <button
        type="button"
        onClick={onNext}
        disabled={page >= totalPages}
        className="rounded-2xl border border-[#d8b989] bg-white px-4 py-2 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-[#ead8bc] bg-[#fffaf3] p-5 text-sm text-[#7a6b5e]">
      {text}
    </div>
  );
}