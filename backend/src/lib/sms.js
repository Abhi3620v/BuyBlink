import { env } from "../config/env.js";
import AppError from "../utils/app-error.js";

const hasTwilioConfig = () =>
  env.smsProvider === "TWILIO" &&
  Boolean(
    env.twilioAccountSid &&
      env.twilioAuthToken &&
      env.smsFromNumber &&
      !env.twilioAccountSid.includes("dummy")
  );

const sendWithTwilio = async ({ to, message }) => {
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${env.twilioAccountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${env.twilioAccountSid}:${env.twilioAuthToken}`,
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: to,
        From: env.smsFromNumber,
        Body: message,
      }),
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new AppError(
      502,
      data?.message || "Unable to send an SMS update right now.",
    );
  }

  return {
    provider: "TWILIO",
    externalId: data.sid || "",
    usedFallback: false,
    preview: "",
  };
};

export const sendSms = async ({ to, message }) => {
  if (!to?.trim() || !message?.trim()) {
    throw new AppError(400, "SMS destination and message are required.");
  }

  if (hasTwilioConfig()) {
    return sendWithTwilio({
      to: to.trim(),
      message: message.trim(),
    });
  }

  return {
    provider: env.smsProvider || "DEV_PREVIEW",
    externalId: "",
    usedFallback: true,
    preview: `SMS to ${to.trim()}\n${message.trim()}`,
  };
};
