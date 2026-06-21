"use client";

import { AnimatePresence, motion } from "motion/react";
import { HeartHandshake, MessageCircleHeart, Send, UserRound } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type GuestbookMessage = {
  id: string;
  name: string;
  message: string;
  is_visible?: boolean;
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

  const fetchMessages = useCallback(async (page = 0, shouldAppend = false) => {
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
  }, []);

  const handleLoadMore = () => {
    if (isLoadingMore || !hasMoreMessages) return;

    fetchMessages(currentPage + 1, true);
  };

  const syncVisibleMessages = useCallback(async () => {
    const currentLimit = Math.max(messages.length, MESSAGE_PAGE_SIZE);

    const { data, error } = await supabase
      .from("guestbook_messages")
      .select("id, name, message, created_at")
      .eq("is_visible", true)
      .order("created_at", { ascending: false })
      .range(0, currentLimit - 1);

    if (error) {
      return;
    }

    setMessages(data ?? []);
    setHasMoreMessages((data ?? []).length === currentLimit);
  }, [messages.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchMessages();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchMessages]);

  useEffect(() => {
    const channel = supabase
      .channel("guestbook-messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "guestbook_messages",
        },
        (payload) => {
          const newMessage = payload.new as GuestbookMessage;

          if (newMessage.is_visible === false) return;

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
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "guestbook_messages",
        },
        (payload) => {
          const updatedMessage = payload.new as GuestbookMessage;

          setMessages((current) => {
            if (updatedMessage.is_visible === false) {
              return current.filter((item) => item.id !== updatedMessage.id);
            }

            const alreadyExists = current.some(
              (item) => item.id === updatedMessage.id,
            );

            if (alreadyExists) {
              return current.map((item) =>
                item.id === updatedMessage.id
                  ? {
                      id: updatedMessage.id,
                      name: updatedMessage.name,
                      message: updatedMessage.message,
                      created_at: updatedMessage.created_at,
                      is_visible: updatedMessage.is_visible,
                    }
                  : item,
              );
            }

            return [updatedMessage, ...current];
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const syncTimer = window.setInterval(() => {
      syncVisibleMessages();
    }, 5000);

    return () => {
      window.clearInterval(syncTimer);
    };
  }, [syncVisibleMessages]);

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
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ead8bc] bg-white/75 p-5 shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#efd4d0]/35 blur-2xl" />

        <div className="relative z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-[#fffaf3] text-[#b58a54] shadow-[0_10px_24px_rgba(181,138,84,0.12)]">
            <MessageCircleHeart className="h-6 w-6" strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#9c7a4d]">
            Ucapan Tetamu
          </p>

          <h3 className="mt-2 font-serif text-3xl leading-tight text-[#2f2a25]">
            Tinggalkan Ucapan
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#7a6b5e]">
            Kongsikan doa, ucapan, atau kata-kata manis buat pasangan pengantin.
            Ucapan anda akan dipaparkan di sini.
          </p>
        </div>
      </div>

      <form className="space-y-4 rounded-[1.75rem] border border-[#ead8bc] bg-[#fffaf3]/85 p-5 shadow-[0_14px_40px_rgba(88,63,38,0.06)]">
        <div>
          <label className="text-sm font-medium text-[#2f2a25]">Nama</label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 transition focus-within:border-[#b58a54]">
            <UserRound className="h-4 w-4 text-[#b58a54]" strokeWidth={1.8} />
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setSuccessMessage("");
                setErrorMessage("");
              }}
              placeholder="Nama anda"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
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
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f2a25] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" strokeWidth={1.8} />
          {isSubmitting ? "Menghantar..." : "Hantar Ucapan"}
        </button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8b989]/70 bg-white text-[#b58a54]">
            <HeartHandshake className="h-4 w-4" strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-sm font-medium text-[#2f2a25]">
              Ucapan Terkini
            </p>
            <p className="text-xs text-[#9c7a4d]">
              Dikemaskini secara langsung
            </p>
          </div>
        </div>

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
            <AnimatePresence initial={false}>
              {messages.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                    layout: {
                      duration: 0.25,
                    },
                  }}
                  className="relative overflow-hidden rounded-3xl border border-[#ead8bc] bg-white/75 p-5 shadow-[0_10px_28px_rgba(88,63,38,0.05)]"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#efd4d0]/30 blur-2xl" />

                  <div className="relative z-10">
                    <p className="font-medium text-[#2f2a25]">{item.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[#7a6b5e]">
                      {item.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div layout>
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
                <p className="rounded-2xl border border-[#ead8bc] bg-[#fffaf3]/80 px-4 py-3 text-center text-xs text-[#9c7a4d]">
                  Semua ucapan telah dipaparkan.
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}