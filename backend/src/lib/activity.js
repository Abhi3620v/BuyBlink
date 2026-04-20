import { prisma } from "./prisma.js";

export const createNotification = async ({
  userId,
  type,
  title,
  message,
  orderId,
  supportTicketId,
  supportChatId,
  details,
}) => {
  if (!userId) {
    return null;
  }

  return prisma.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      orderId: orderId || null,
      supportTicketId: supportTicketId || null,
      supportChatId: supportChatId || null,
      details: details || undefined,
    },
  });
};

export const createAuditLog = async ({
  actorUserId,
  action,
  entityType,
  entityId,
  details,
}) =>
  prisma.auditLog.create({
    data: {
      actorUserId: actorUserId || null,
      action,
      entityType,
      entityId,
      details: details || undefined,
    },
  });

export const listNotificationsForUser = async (userId, limit = 50) =>
  prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

export const markNotificationAsRead = async ({ userId, notificationId }) =>
  prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
      status: "UNREAD",
    },
    data: {
      status: "READ",
      readAt: new Date(),
    },
  });

export const markAllNotificationsAsRead = async (userId) =>
  prisma.notification.updateMany({
    where: {
      userId,
      status: "UNREAD",
    },
    data: {
      status: "READ",
      readAt: new Date(),
    },
  });
