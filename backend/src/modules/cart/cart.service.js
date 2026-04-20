import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/app-error.js";
import { normalizeOrderMode } from "../../utils/order-helpers.js";

const cartInclude = {
  product: {
    include: {
      seller: {
        select: {
          id: true,
          name: true,
          storeName: true,
          email: true,
        },
      },
    },
  },
};

const getMinimumQuantity = (product, mode) =>
  mode === "WHOLESALE" ? Number(product.minWholesaleQty) || 1 : 1;

const sanitizeCartItems = async (customerId) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { customerId },
    include: cartInclude,
    orderBy: {
      updatedAt: "desc",
    },
  });

  const staleItemIds = cartItems
    .filter((item) => !item.product || !item.product.isActive)
    .map((item) => item.id);

  if (staleItemIds.length > 0) {
    await prisma.cartItem.deleteMany({
      where: {
        id: {
          in: staleItemIds,
        },
      },
    });
  }

  return cartItems.filter((item) => item.product && item.product.isActive);
};

const getProductOrThrow = async (productId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: cartInclude.product.include,
  });

  if (!product || !product.isActive) {
    throw new AppError(404, "Product not found.");
  }

  return product;
};

const validateRequestedQuantity = (product, mode, quantity) => {
  const minimumQuantity = getMinimumQuantity(product, mode);

  if (quantity < minimumQuantity) {
    throw new AppError(
      400,
      mode === "WHOLESALE"
        ? `${product.name} requires at least ${minimumQuantity} units for wholesale cart.`
        : "Quantity is too low for this product.",
    );
  }

  if (quantity > product.inventory) {
    throw new AppError(400, `${product.name} does not have enough inventory.`);
  }
};

export const getCartItems = async (customerId) => sanitizeCartItems(customerId);

export const addCartItem = async (customerId, payload) => {
  const mode = normalizeOrderMode(payload.mode);
  const product = await getProductOrThrow(payload.productId);
  const quantityToAdd = Number(payload.quantity) || getMinimumQuantity(product, mode);

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      customerId,
      productId: product.id,
      mode,
    },
  });

  const nextQuantity = (existingItem?.quantity || 0) + quantityToAdd;
  validateRequestedQuantity(product, mode, nextQuantity);

  await prisma.cartItem.upsert({
    where: {
      customerId_productId_mode: {
        customerId,
        productId: product.id,
        mode,
      },
    },
    update: {
      quantity: nextQuantity,
    },
    create: {
      customerId,
      productId: product.id,
      mode,
      quantity: nextQuantity,
    },
  });

  return sanitizeCartItems(customerId);
};

export const mergeCartItems = async (customerId, items = []) => {
  for (const item of items) {
    const mode = normalizeOrderMode(item.mode);
    const product = await getProductOrThrow(item.productId);
    const quantityToAdd = Number(item.quantity) || getMinimumQuantity(product, mode);
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        customerId,
        productId: product.id,
        mode,
      },
    });

    const nextQuantity = (existingItem?.quantity || 0) + quantityToAdd;
    validateRequestedQuantity(product, mode, nextQuantity);

    await prisma.cartItem.upsert({
      where: {
        customerId_productId_mode: {
          customerId,
          productId: product.id,
          mode,
        },
      },
      update: {
        quantity: nextQuantity,
      },
      create: {
        customerId,
        productId: product.id,
        mode,
        quantity: nextQuantity,
      },
    });
  }

  return sanitizeCartItems(customerId);
};

export const updateCartItemQuantity = async (customerId, productId, payload) => {
  const mode = normalizeOrderMode(payload.mode);
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      customerId,
      productId,
      mode,
    },
  });

  if (!existingItem) {
    throw new AppError(404, "Cart item not found.");
  }

  const product = await getProductOrThrow(productId);
  validateRequestedQuantity(product, mode, Number(payload.quantity));

  await prisma.cartItem.update({
    where: {
      id: existingItem.id,
    },
    data: {
      quantity: Number(payload.quantity),
    },
  });

  return sanitizeCartItems(customerId);
};

export const deleteCartItem = async (customerId, productId, mode = "retail") => {
  const normalizedMode = normalizeOrderMode(mode);
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      customerId,
      productId,
      mode: normalizedMode,
    },
  });

  if (!existingItem) {
    throw new AppError(404, "Cart item not found.");
  }

  await prisma.cartItem.delete({
    where: {
      id: existingItem.id,
    },
  });

  return sanitizeCartItems(customerId);
};

export const clearCartItems = async (customerId) => {
  await prisma.cartItem.deleteMany({
    where: { customerId },
  });

  return [];
};
