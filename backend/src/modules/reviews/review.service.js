import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";
import { normalizeOrderMode } from "../../utils/order-helpers.js";

export const getReviewsByProductId = async (productId) =>
  prisma.productReview.findMany({
    where: { productId },
    orderBy: {
      createdAt: "desc",
    },
  });

export const createReview = async ({ customer, payload }) => {
  const order = await prisma.order.findFirst({
    where: {
      id: payload.orderId,
      OR: [{ customerId: customer.id }, { shippingEmail: customer.email }],
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new AppError(404, "Order not found for this customer.");
  }

  const orderItem = order.items.find(
    (item) =>
      item.productId === payload.productId &&
      (item.sellerStatus === "DELIVERED" || order.status === "DELIVERED"),
  );

  if (!orderItem) {
    throw new AppError(400, "Only delivered items can be reviewed.");
  }

  return prisma.productReview.upsert({
    where: {
      orderId_productId_customerEmail: {
        orderId: payload.orderId,
        productId: payload.productId,
        customerEmail: customer.email,
      },
    },
    update: {
      rating: payload.rating,
      title: payload.title,
      comment: payload.comment,
      updatedAt: new Date(),
    },
    create: {
      orderId: payload.orderId,
      orderItemId: orderItem.id,
      productId: payload.productId,
      customerId: customer.id,
      sellerId: orderItem.sellerId,
      sellerName: payload.sellerName,
      customerEmail: customer.email,
      customerName: customer.name,
      productName: orderItem.productNameSnapshot,
      mode: normalizeOrderMode(payload.mode),
      rating: payload.rating,
      title: payload.title,
      comment: payload.comment,
    },
  });
};
