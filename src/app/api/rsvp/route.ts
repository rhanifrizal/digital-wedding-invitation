import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendTelegramRSVPMessage } from "@/lib/telegram";

type RSVPRequestBody = {
  name?: string;
  phone?: string;
  attendanceStatus?: "attending" | "not_attending";
  paxCount?: number;
  message?: string | null;
};

function formatAttendanceStatus(status: "attending" | "not_attending") {
  return status === "attending" ? "Hadir" : "Tidak Hadir";
}

function formatSubmittedTime(date: Date) {
  return new Intl.DateTimeFormat("ms-MY", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kuala_Lumpur",
  }).format(date);
}

function buildTelegramMessage({
  name,
  phone,
  attendanceStatus,
  paxCount,
  message,
  submittedAt,
  totalAttendingRsvp,
  totalAttendingPax,
  totalNotAttending,
}: {
  name: string;
  phone: string | null;
  attendanceStatus: "attending" | "not_attending";
  paxCount: number;
  message: string | null;
  submittedAt: Date;
  totalAttendingRsvp: number;
  totalAttendingPax: number;
  totalNotAttending: number;
}) {
  const phoneText = phone ? `\nTelefon: ${phone}` : "";
  const messageText = message || "-";

  return [
    "🎉 RSVP BARU DITERIMA!",
    "",
    `Nama: ${name.toUpperCase()}`,
    `Status: ${formatAttendanceStatus(attendanceStatus)}`,
    `Jumlah Pax: ${paxCount}`,
    phoneText.trim() ? `Telefon: ${phone}` : null,
    `Masa Submit: ${formatSubmittedTime(submittedAt)}`,
    "",
    "Ucapan:",
    messageText,
    "",
    "--------------------",
    `Jumlah RSVP Hadir: ${totalAttendingRsvp}`,
    `Jumlah Pax Hadir: ${totalAttendingPax}`,
    `Jumlah Tidak Hadir: ${totalNotAttending}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RSVPRequestBody;

    const name = body.name?.trim();
    const phone = body.phone?.replace(/\D/g, "") || null;
    const attendanceStatus = body.attendanceStatus;
    const paxCount = Number(body.paxCount ?? 0);
    const message = body.message?.trim() || null;

    if (!name) {
      return NextResponse.json(
        { error: "Sila masukkan nama." },
        { status: 400 },
      );
    }

    if (!phone || phone.length < 10 || phone.length > 11) {
      return NextResponse.json(
        { error: "Nombor telefon mesti mempunyai 10 hingga 11 digit." },
        { status: 400 },
      );
    }

    if (
      attendanceStatus !== "attending" &&
      attendanceStatus !== "not_attending"
    ) {
      return NextResponse.json(
        { error: "Sila pilih status kehadiran." },
        { status: 400 },
      );
    }

    if (attendanceStatus === "attending" && (!paxCount || paxCount < 1)) {
      return NextResponse.json(
        { error: "Sila masukkan bilangan pax yang betul." },
        { status: 400 },
      );
    }

    if (paxCount > 20) {
      return NextResponse.json(
        { error: "Bilangan pax tidak boleh melebihi 20 orang." },
        { status: 400 },
      );
    }

    const finalPaxCount = attendanceStatus === "attending" ? paxCount : 0;

    const { error: insertError } = await supabaseAdmin.from("rsvps").insert({
      name,
      phone,
      attendance_status: attendanceStatus,
      pax_count: finalPaxCount,
      message,
    });

    if (insertError) {
      console.error("RSVP insert error:", insertError);

      return NextResponse.json(
        { error: "Maaf, RSVP tidak berjaya dihantar. Sila cuba lagi." },
        { status: 500 },
      );
    }

    const { data: rsvpRows, error: totalError } = await supabaseAdmin
      .from("rsvps")
      .select("attendance_status, pax_count");

    if (totalError) {
      console.error("RSVP total fetch error:", totalError);
    }

    const totalAttendingRsvp =
      rsvpRows?.filter((item) => item.attendance_status === "attending")
        .length ?? 0;

    const totalAttendingPax =
      rsvpRows
        ?.filter((item) => item.attendance_status === "attending")
        .reduce((total, item) => total + Number(item.pax_count ?? 0), 0) ?? 0;

    const totalNotAttending =
      rsvpRows?.filter((item) => item.attendance_status === "not_attending")
        .length ?? 0;

    const telegramMessage = buildTelegramMessage({
      name,
      phone,
      attendanceStatus,
      paxCount: finalPaxCount,
      message,
      submittedAt: new Date(),
      totalAttendingRsvp,
      totalAttendingPax,
      totalNotAttending,
    });

    await sendTelegramRSVPMessage({
      text: telegramMessage,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("RSVP API error:", error);

    return NextResponse.json(
      { error: "Maaf, terdapat masalah pada server." },
      { status: 500 },
    );
  }
}