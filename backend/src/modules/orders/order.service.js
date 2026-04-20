import { prisma } from "../../lib/prisma.js";
import { createAuditLog } from "../../lib/activity.js";
import AppError from "../../utils/app-error.js";
import {
  buildOrderLookupWhere,
  buildSimulationPaymentRecord,
  deriveOrderStatusFromSellerItems,
  orderInclude,
  persistOrderFromPayment,
  prepareOrderDraft,
  sendOrderStatusUpdateForOrder,
} from "./order.shared.js";

export const createOrder = async ({ customer, payload }) => {
  const draft = await prepareOrderDraft(payload);
  const paymentRecord = buildSimulationPaymentRecord({
    paymentMethod: payload.paymentMethod,
    paymentDetails: payload.paymentDetails,
    amount: draft.amount,
  });

  return persistOrderFromPayment({
    customer,
    payload,
    draft,
    paymentInput: paymentRecord,
    sendConfirmation: true,
  });
};

export const getUserOrders = async (user) => {
  if (user.role === "SELLER") {
    return getSellerOrders(user.id);
  }

  return prisma.order.findMany({
    where: {
      OR: [{ customerId: user.id }, { shippingEmail: user.email }],
    },
    include: orderInclude,
    orderBy: {
      placedAt: "desc",
    },
  });
};

export const getOrderHistory = async ({ user, email }) => {
  const lookupEmail = email?.trim().toLowerCase();

  if (!user && !lookupEmail) {
    throw new AppError(400, "Email is required when you are not logged in.");
  }

  if (user?.role === "SELLER") {
    return getSellerOrders(user.id);
  }

  return prisma.order.findMany({
    where: user
      ? {
          OR: [{ customerId: user.id }, { shippingEmail: user.email }],
        }
      : {
          shippingEmail: lookupEmail,
        },
    include: orderInclude,
    orderBy: {
      placedAt: "desc",
    },
  });
};

export const getSellerOrders = async (sellerId) =>
  prisma.order.findMany({
    where: {
      items: {
        some: {
          sellerId,
        },
      },
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        where: {
          sellerId,
        },
      },
      payment: true,
      emailLogs: {
        orderBy: {
          createdAt: "desc",
        },
      },
      smsLogs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      placedAt: "desc",
    },
  });

export const getOrderById = async ({ orderId, user, email }) => {
  const order = await prisma.order.findFirst({
    where: buildOrderLookupWhere(orderId),
    include: orderInclude,
  });

  if (!order) {
    throw new AppError(404, "Order not found.");
  }

  const normalizedEmail = email?.trim().toLowerCase();
  const isCustomerOwner =
    user?.role === "CUSTOMER" &&
    (order.customerId === user.id || order.shippingEmail === user.email);
  const isSellerOwner =
    user?.role === "SELLER" &&
    order.items.some((item) => item.sellerId === user.id);
  const isGuestOwner = !user && normalizedEmail && order.shippingEmail.toLowerCase() === normalizedEmail;

  if (!isGuestOwner && !isCustomerOwner && !isSellerOwner && user?.role !== "ADMIN") {
    throw new AppError(403, "You do not have access to this order.");
  }

  return order;
};

export const updateSellerOrderItemStatus = async ({ orderId, sellerId, nextStatus }) => {
  const order = await prisma.order.findFirst({
    where: buildOrderLookupWhere(orderId),
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new AppError(404, "Order not found.");
  }

  const sellerHasItems = order.items.some((item) => item.sellerId === sellerId);

  if (!sellerHasItems) {
    throw new AppError(403, "You can only update your own order items.");
  }

  const previousStatus = order.status;

  await prisma.orderItem.updateMany({
    where: {
      orderId: order.id,
      sellerId,
    },
    data: {
      sellerStatus: nextStatus,
    },
  });

  const updatedItems = await prisma.orderItem.findMany({
    where: {
      orderId: order.id,
    },
    select: {
      sellerStatus: true,
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: {
      status: deriveOrderStatusFromSellerItems(updatedItems),
    },
  });

  const updatedOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: orderInclude,
  });

  if (updatedOrder && updatedOrder.status !== previousStatus) {
    await createAuditLog({
      actorUserId: sellerId,
      action: "ORDER_STATUS_CHANGED",
      entityType: "ORDER",
      entityId: updatedOrder.id,
      details: {
        previousStatus,
        nextStatus: updatedOrder.status,
        triggeredBySellerStatus: nextStatus,
      },
    });
    return sendOrderStatusUpdateForOrder(updatedOrder.id);
  }

  return updatedOrder;
};

export const cancelCustomerOrder = async ({ orderId, customer }) => {
  const order = await prisma.order.findFirst({
    where: buildOrderLookupWhere(orderId),
    include: {
      items: true,
      payment: true,
    },
  });

  if (!order) {
    throw new AppError(404, "Order not found.");
  }

  const ownsOrder =
    order.customerId === customer.id || order.shippingEmail?.toLowerCase() === customer.email?.toLowerCase();

  if (!ownsOrder) {
    throw new AppError(403, "You do not have access to cancel this order.");
  }

  if (order.status === "CANCELLED") {
    return prisma.order.findUnique({
      where: { id: order.id },
      include: orderInclude,
    });
  }

  const hasShippedItems = order.items.some((item) =>
    ["SHIPPED", "DELIVERED"].includes(item.sellerStatus),
  );

  if (hasShippedItems) {
    throw new AppError(400, "This order can no longer be cancelled because shipment has already started.");
  }

  const shouldSendStatusUpdate = order.status !== "CANCELLED";

  await prisma.$transaction(async (transaction) => {
    for (const item of order.items) {
      if (item.productId) {
        await transaction.product.update({
          where: { id: item.productId },
          data: {
            inventory: {
              increment: item.quantity,
            },
          },
        });
      }
    }

    await transaction.orderItem.updateMany({
      where: {
        orderId: order.id,
      },
      data: {
        sellerStatus: "CANCELLED",
      },
    });

    if (order.payment && order.payment.method !== "COD" && order.payment.status === "CAPTURED") {
      await transaction.payment.update({
        where: { id: order.payment.id },
        data: {
          status: "REFUNDED",
          failureReason: "Order cancelled by customer.",
        },
      });
    }

    await transaction.order.update({
      where: { id: order.id },
      data: {
        status: "CANCELLED",
      },
    });
  });

  const updatedOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: orderInclude,
  });

  if (updatedOrder && shouldSendStatusUpdate) {
    await createAuditLog({
      actorUserId: customer.id,
      action: "ORDER_STATUS_CHANGED",
      entityType: "ORDER",
      entityId: updatedOrder.id,
      details: {
        previousStatus: order.status,
        nextStatus: updatedOrder.status,
        reason: "Customer cancelled order",
      },
    });
    return sendOrderStatusUpdateForOrder(updatedOrder.id);
  }

  return updatedOrder;
};
