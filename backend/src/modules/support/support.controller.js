import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { subscribeSupportEvents } from "../../lib/support-events.js";
import AppError from "../../utils/app-error.js";
import { catchAsync } from "../../utils/catch-async.js";
import {
  createSupportTicket,
  getAdminSupportChats,
  getAdminSupportOverview,
  getAdminSupportTickets,
  getOrCreateSupportChat,
  markSupportChatReadForAdmin,
  markSupportChatReadForCustomer,
  getSupportChatsForCustomer,
  getSupportTicketsForCustomer,
  sendAdminSupportChatMessage,
  sendSupportChatMessage,
  updateAdminSupportChat,
  updateAdminSupportTicket,
} from "./support.service.js";

const resolveUserFromQueryToken = async (request) => {
  const token = request.query?.token?.trim();

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.status === "SUSPENDED") {
      return null;
    }

    return user;
  } catch {
    return null;
  }
};

const writeSseHeaders = (response) => {
  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Connection", "keep-alive");
  response.flushHeaders?.();
};

const writeSseEvent = (response, eventName, payload) => {
  response.write(`event: ${eventName}\n`);
  response.write(`data: ${JSON.stringify(payload)}\n\n`);
};

export const getSupportTicketsHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;
  const tickets = await getSupportTicketsForCustomer({
    customer: request.user,
    email: query.email,
  });

  response.json({
    success: true,
    data: tickets,
  });
});

export const createSupportTicketHandler = catchAsync(async (request, response) => {
  const ticket = await createSupportTicket({
    customer: request.user,
    payload: request.body,
  });

  response.status(201).json({
    success: true,
    message: "Support ticket created successfully.",
    data: ticket,
  });
});

export const getSupportChatsHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;
  const chats = await getSupportChatsForCustomer({
    customer: request.user,
    email: query.email,
  });

  response.json({
    success: true,
    data: chats,
  });
});

export const getOrCreateSupportChatHandler = catchAsync(async (request, response) => {
  const chat = await getOrCreateSupportChat({
    customer: request.user,
    payload: request.body,
  });

  response.status(201).json({
    success: true,
    message: "Support chat is ready.",
    data: chat,
  });
});

export const sendSupportChatMessageHandler = catchAsync(async (request, response) => {
  const chat = await sendSupportChatMessage({
    customer: request.user,
    chatId: request.params.chatId,
    messageText: request.body.text,
    email: request.body.customerEmail,
    senderName: request.body.senderName,
    attachment: request.body.attachment,
  });

  response.json({
    success: true,
    message: "Support chat updated successfully.",
    data: chat,
  });
});

export const markSupportChatReadHandler = catchAsync(async (request, response) => {
  const chat = await markSupportChatReadForCustomer({
    customer: request.user,
    chatId: request.params.chatId,
    email: request.body.customerEmail,
  });

  response.json({
    success: true,
    message: "Support chat marked as read.",
    data: chat,
  });
});

export const getAdminSupportOverviewHandler = catchAsync(async (_request, response) => {
  const overview = await getAdminSupportOverview();

  response.json({
    success: true,
    data: overview,
  });
});

export const getAdminSupportTicketsHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;
  const tickets = await getAdminSupportTickets(query);

  response.json({
    success: true,
    data: tickets,
  });
});

export const getAdminSupportChatsHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;
  const chats = await getAdminSupportChats(query);

  response.json({
    success: true,
    data: chats,
  });
});

export const updateAdminSupportTicketHandler = catchAsync(async (request, response) => {
  const ticket = await updateAdminSupportTicket({
    ticketId: request.params.ticketId,
    payload: request.body,
  });

  response.json({
    success: true,
    message: "Support ticket updated successfully.",
    data: ticket,
  });
});

export const updateAdminSupportChatHandler = catchAsync(async (request, response) => {
  const chat = await updateAdminSupportChat({
    chatId: request.params.chatId,
    payload: request.body,
    actorUser: request.user,
  });

  response.json({
    success: true,
    message: "Support chat updated successfully.",
    data: chat,
  });
});

export const sendAdminSupportChatMessageHandler = catchAsync(async (request, response) => {
  const chat = await sendAdminSupportChatMessage({
    chatId: request.params.chatId,
    messageText: request.body.text,
    senderName: request.body.senderName,
    senderId: request.body.senderId || request.user?.id,
    closeTicket: request.body.closeTicket,
    attachment: request.body.attachment,
  });

  response.json({
    success: true,
    message: "Agent reply sent successfully.",
    data: chat,
  });
});

export const markAdminSupportChatReadHandler = catchAsync(async (request, response) => {
  const chat = await markSupportChatReadForAdmin({
    chatId: request.params.chatId,
    adminUser: request.user,
  });

  response.json({
    success: true,
    message: "Support chat marked as read.",
    data: chat,
  });
});

export const streamSupportUpdatesHandler = async (request, response, next) => {
  try {
    const tokenUser = await resolveUserFromQueryToken(request);
    const lookupEmail =
      request.query?.email?.trim().toLowerCase() ||
      tokenUser?.email?.toLowerCase() ||
      request.user?.email?.toLowerCase();
    const lookupCustomerId = tokenUser?.id || request.user?.id || null;

    if (!lookupEmail && !lookupCustomerId) {
      throw new AppError(400, "Email is required to stream customer support updates.");
    }

    writeSseHeaders(response);
    writeSseEvent(response, "connected", { scope: "customer" });

    const unsubscribe = subscribeSupportEvents((eventPayload) => {
      const matchesEmail =
        lookupEmail &&
        eventPayload.customerEmail &&
        lookupEmail === String(eventPayload.customerEmail).toLowerCase();
      const matchesCustomerId =
        lookupCustomerId &&
        eventPayload.customerId &&
        lookupCustomerId === eventPayload.customerId;

      if (!matchesEmail && !matchesCustomerId) {
        return;
      }

      writeSseEvent(response, "support-update", eventPayload);
    });

    const heartbeat = setInterval(() => {
      writeSseEvent(response, "ping", { ts: Date.now() });
    }, 25000);

    request.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
      response.end();
    });
  } catch (error) {
    next(error);
  }
};

export const streamAdminSupportUpdatesHandler = async (request, response, next) => {
  try {
    const tokenUser = await resolveUserFromQueryToken(request);
    const adminUser = request.user || tokenUser;

    if (!adminUser || adminUser.role !== "ADMIN") {
      throw new AppError(401, "Admin authentication is required for this stream.");
    }

    writeSseHeaders(response);
    writeSseEvent(response, "connected", { scope: "admin" });

    const unsubscribe = subscribeSupportEvents((eventPayload) => {
      writeSseEvent(response, "support-update", eventPayload);
    });

    const heartbeat = setInterval(() => {
      writeSseEvent(response, "ping", { ts: Date.now() });
    }, 25000);

    request.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
      response.end();
    });
  } catch (error) {
    next(error);
  }
};
