import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

function getAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

function isAuthorized(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const requestPassword = request.headers.get("x-admin-password");

  return Boolean(adminPassword && requestPassword === adminPassword);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabase = getAdminSupabaseClient();

  const [rsvpResponse, guestbookResponse] = await Promise.all([
    supabase
      .from("rsvps")
      .select("id, name, phone, attendance_status, pax_count, message, created_at")
      .order("created_at", { ascending: false }),

    supabase
      .from("guestbook_messages")
      .select("id, name, message, is_visible, created_at")
      .order("created_at", { ascending: false }),
  ]);

  if (rsvpResponse.error) {
    return NextResponse.json(
      { message: "Failed to load RSVP data" },
      { status: 500 },
    );
  }

  if (guestbookResponse.error) {
    return NextResponse.json(
      { message: "Failed to load guestbook data" },
      { status: 500 },
    );
  }

  const rsvps = (rsvpResponse.data ?? []) as RSVP[];
  const guestbookMessages = (guestbookResponse.data ?? []) as GuestbookMessage[];

  const totalAttending = rsvps.filter(
    (item) => item.attendance_status === "attending",
  ).length;

  const totalNotAttending = rsvps.filter(
    (item) => item.attendance_status === "not_attending",
  ).length;

  const totalPax = rsvps.reduce((total, item) => total + item.pax_count, 0);

  return NextResponse.json({
    summary: {
      totalRsvp: rsvps.length,
      totalAttending,
      totalNotAttending,
      totalPax,
      totalGuestbookMessages: guestbookMessages.length,
      totalVisibleGuestbookMessages: guestbookMessages.filter(
        (item) => item.is_visible,
      ).length,
    },
    rsvps,
    guestbookMessages,
  });
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const messageId = body.messageId as string | undefined;
  const isVisible = body.isVisible as boolean | undefined;

  if (!messageId || typeof isVisible !== "boolean") {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  const supabase = getAdminSupabaseClient();

  const { error } = await supabase
    .from("guestbook_messages")
    .update({ is_visible: isVisible })
    .eq("id", messageId);

  if (error) {
    return NextResponse.json(
      { message: "Failed to update guestbook message" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}