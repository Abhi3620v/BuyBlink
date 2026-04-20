import { Router } from "express";
import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";

const router = Router();

const hasSmtpConfig = () =>
  Boolean(env.smtpHost && env.smtpUser && env.smtpPass);

const hasRazorpayConfig = () =>
  Boolean(env.razorpayKeyId && env.razorpayKeySecret);

const hasRazorpayWebhookConfig = () =>
  Boolean(env.razorpayWebhookSecret);

const hasSmsConfig = () => {
  if (env.smsProvider === "TWILIO") {
    return Boolean(
      env.twilioAccountSid &&
        env.twilioAuthToken &&
        env.smsFromNumber,
    );
  }

  return false;
};

router.get("/", async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    response.json({
      success: true,
      message: "Health check passed.",
      data: {
        database: "connected",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/integrations", async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    response.json({
      success: true,
      message: "Integration status check passed.",
      data: {
        database: "connected",
        razorpay: {
          configured: hasRazorpayConfig(),
          webhookConfigured: hasRazorpayWebhookConfig(),
        },
        email: {
          provider: hasSmtpConfig() ? "SMTP" : "DEV_PREVIEW",
          configured: hasSmtpConfig(),
        },
        sms: {
          provider: env.smsProvider || "DEV_PREVIEW",
          configured: hasSmsConfig(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
