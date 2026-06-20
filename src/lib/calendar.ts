import { weddingConfig } from "@/config/wedding.config";

function formatGoogleCalendarDate(date: string) {
  return new Date(date).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function getGoogleCalendarUrl() {
  const startDate = formatGoogleCalendarDate(weddingConfig.event.date);
  const endDate = formatGoogleCalendarDate(weddingConfig.event.endDate);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: weddingConfig.calendar.title,
    dates: `${startDate}/${endDate}`,
    details: weddingConfig.calendar.description,
    location: `${weddingConfig.event.venueName}, ${weddingConfig.event.address}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}