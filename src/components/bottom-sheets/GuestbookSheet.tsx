"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type GuestbookMessage = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const MESSAGE_PAGE_SIZE = 10;

export function GuestbookSheet() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMessages = async (page = 0, shouldAppend = false) => {
    if (shouldAppend) {
      setIsLoadingMore(true);
    } else {
      setIsLoadingMessages(true);
    }

    setErrorMessage("");

    const from = page * MESSAGE_PAGE_SIZE;
    const to = from + MESSAGE_PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("guestbook_messages")
      .select("id, name, message, created_at")
      .eq("is_visible", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    setIsLoadingMessages(false);
    setIsLoadingMore(false);

    if (error) {
      setErrorMessage("Maaf, ucapan tidak dapat dimuatkan.");
      return;
    }

    const fetchedMessages = data ?? [];

    setHasMoreMessages(fetchedMessages.length === MESSAGE_PAGE_SIZE);
    setCurrentPage(page);

    if (shouldAppend) {
      setMessages((current) => {
        const existingIds = new Set(current.map((item) => item.id));
        const newMessages = fetchedMessages.filter(
          (item) => !existingIds.has(item.id),
        );

        return [...current, ...newMessages];
      });

      return;
    }

    setMessages(fetchedMessages);
  };

  const handleLoadMore = () => {
    if (isLoadingMore || !hasMoreMessages) return;

    fetchMessages(currentPage + 1, true);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("guestbook-messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "guestbook_messages",
          filter: "is_visible=eq.true",
        },
        (payload) => {
          const newMessage = payload.new as GuestbookMessage;

          setMessages((current) => {
            const alreadyExists = current.some(
              (item) => item.id === newMessage.id,
            );

            if (alreadyExists) {
              return current;
            }

            return [newMessage, ...current];
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMessage("Sila masukkan nama.");
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage("Sila masukkan ucapan.");
      return;
    }

    if (trimmedMessage.length > 300) {
      setErrorMessage("Ucapan terlalu panjang. Sila hadkan kepada 300 aksara.");
      return;
    }

    setIsSubmitting(true);

    const { data, error } = await supabase
      .from("guestbook_messages")
      .insert({
        name: trimmedName,
        message: trimmedMessage,
        is_visible: true,
      })
      .select("id, name, message, created_at")
      .single();

    setIsSubmitting(false);

    if (error) {
      setErrorMessage("Maaf, ucapan tidak berjaya dihantar. Sila cuba lagi.");
      return;
    }

    setName("");
    setMessage("");
    setSuccessMessage("Terima kasih. Ucapan anda telah dihantar.");

    if (data) {
      setMessages((current) => {
        const alreadyExists = current.some((item) => item.id === data.id);

        if (alreadyExists) {
          return current;
        }

        return [data, ...current];
      });
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium text-[#2f2a25]">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setSuccessMessage("");
              setErrorMessage("");
            }}
            placeholder="Nama anda"
            className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#2f2a25]">Ucapan</label>
          <textarea
            rows={4}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setSuccessMessage("");
              setErrorMessage("");
            }}
            maxLength={300}
            placeholder="Tulis ucapan anda..."
            className="mt-2 w-full resize-none rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
          />
          <p className="mt-1 text-right text-xs text-[#9c7a4d]">
            {message.length}/300
          </p>
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
          {isSubmitting ? "Menghantar..." : "Hantar Ucapan"}
        </button>
      </form>

      <div className="space-y-3">
        <p className="text-sm font-medium text-[#2f2a25]">Ucapan Terkini</p>

        {isLoadingMessages ? (
          <div className="rounded-3xl border border-[#ead8bc] bg-white/70 p-5 text-sm text-[#7a6b5e]">
            Memuatkan ucapan...
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-3xl border border-[#ead8bc] bg-white/70 p-5 text-sm leading-6 text-[#7a6b5e]">
            Belum ada ucapan. Jadilah yang pertama memberi ucapan.
          </div>
        ) : (
          <>
            {messages.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-[#ead8bc] bg-white/70 p-5"
              >
                <p className="font-medium text-[#2f2a25]">{item.name}</p>
                <p className="mt-2 text-sm leading-6 text-[#7a6b5e]">
                  {item.message}
                </p>
              </div>
            ))}

            {hasMoreMessages ? (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="w-full rounded-2xl border border-[#d8b989] bg-white px-4 py-3 text-sm font-medium text-[#2f2a25] transition hover:bg-[#f3e5d3] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoadingMore ? "Memuatkan..." : "Lihat Lagi Ucapan"}
              </button>
            ) : (
              <p className="text-center text-xs text-[#9c7a4d]">
                Semua ucapan telah dipaparkan.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}