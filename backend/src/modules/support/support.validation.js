import { z } from "zod";

const attachmentSchema = z
  .object({
    url: z
      .string()
      .trim()
      .min(5)
      .max(2_000_000)
      .refine(
        (value) => value.startsWith("data:") || /^https?:\/\//i.test(value),
        "Attachment URL must be a valid data URL or HTTP URL.",
      ),
    name: z.string().trim().max(120).optional(),
    mimeType: z.string().trim().max(120).optional(),
    sizeBytes: z.number().int().min(1).max(2_000_000).optional(),
  })
  .optional();

export const getSupportLookupSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({
    email: z.string().trim().email().optional(),
  }),
});

export const createSupportTicketSchema = z.object({
  body: z.object({
    customerName: z.string().trim().min(2),
    customerEmail: z.string().trim().email(),
    customerPhone: z.string().trim().optional().default(""),
    orderId: z.string().trim().optional().default(""),
    category: z.string().trim().min(2),
    priority: z
      .enum(["LOW", "MEDIUM", "HIGH", "Low", "Medium", "High"])
      .transform((value) => value.toUpperCase()),
    subject: z.string().trim().min(2),
    description: z.string().trim().min(5),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const createSupportChatSchema = z.object({
  body: z.object({
    customerName: z.string().trim().min(2),
    customerEmail: z.string().trim().email(),
    orderId: z.string().trim().optional().default(""),
    ticketId: z.string().trim().optional().default(""),
    category: z.string().trim().min(2),
    subject: z.string().trim().min(2),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const sendSupportChatMessageSchema = z.object({
  body: z
    .object({
      text: z.string().trim().optional().default(""),
      customerEmail: z.string().trim().email().optional(),
      senderName: z.string().trim().optional(),
      attachment: attachmentSchema,
    })
    .refine(
      (payload) => Boolean(payload.text?.trim() || payload.attachment?.url),
      "Either a message text or attachment is required.",
    ),
  params: z.object({
    chatId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const adminSupportListSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({
    status: z.string().trim().optional(),
    priority: z.string().trim().optional(),
    search: z.string().trim().optional(),
  }),
});

export const adminTicketIdParamSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    ticketId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const adminChatIdParamSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    chatId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const adminUpdateTicketSchema = z.object({
  body: z.object({
    status: z.enum(["OPEN", "IN_REVIEW", "RESOLVED"]),
    responseEta: z.string().trim().optional(),
  }),
  params: z.object({
    ticketId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const adminUpdateChatSchema = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "IN_REVIEW", "CLOSED"]),
    assignedAgentName: z.string().trim().min(2).optional(),
    assignedAgentId: z.string().trim().min(1).optional(),
  }),
  params: z.object({
    chatId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const adminSendAgentMessageSchema = z.object({
  body: z
    .object({
      text: z.string().trim().optional().default(""),
      senderName: z.string().trim().min(2).optional(),
      senderId: z.string().trim().min(1).optional(),
      closeTicket: z.coerce.boolean().optional().default(false),
      attachment: attachmentSchema,
    })
    .refine(
      (payload) => Boolean(payload.text?.trim() || payload.attachment?.url),
      "Either a message text or attachment is required.",
    ),
  params: z.object({
    chatId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const markSupportChatReadSchema = z.object({
  body: z.object({
    customerEmail: z.string().trim().email().optional(),
  }),
  params: z.object({
    chatId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const markAdminSupportChatReadSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    chatId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});
