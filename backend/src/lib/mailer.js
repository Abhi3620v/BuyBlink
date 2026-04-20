import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let cachedTransport;

const hasSmtpConfig = () =>
  Boolean(env.smtpHost && env.smtpUser && env.smtpPass && !env.smtpPass.includes("dummy"));

const createTransport = () => {
  if (hasSmtpConfig()) {
    return nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    });
  }

  return nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    newline: "unix",
  });
};

const getTransport = () => {
  if (!cachedTransport) {
    cachedTransport = createTransport();
  }

  return cachedTransport;
};

export const sendEmail = async ({ to, subject, text, html }) => {
  const transport = getTransport();
  const info = await transport.sendMail({
    from: env.emailFrom,
    replyTo: env.emailReplyTo || undefined,
    to,
    subject,
    text,
    html,
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted ?? [],
    rejected: info.rejected ?? [],
    usedFallback: !hasSmtpConfig(),
    preview:
      typeof info.message === "string"
        ? info.message
        : Buffer.isBuffer(info.message)
          ? info.message.toString("utf8")
          : "",
  };
};
