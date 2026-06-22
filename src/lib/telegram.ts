type SendTelegramMessageParams = {
  text: string;
};

export async function sendTelegramRSVPMessage({
  text,
}: SendTelegramMessageParams) {
  const botToken = process.env.TELEGRAM_RSVP_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_RSVP_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram RSVP env variables are missing.");
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to send Telegram RSVP message:", errorText);
  }
}