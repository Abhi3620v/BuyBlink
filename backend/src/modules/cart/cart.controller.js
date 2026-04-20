import { catchAsync } from "../../utils/catch-async.js";
import {
  addCartItem,
  clearCartItems,
  deleteCartItem,
  getCartItems,
  mergeCartItems,
  updateCartItemQuantity,
} from "./cart.service.js";

export const getCartItemsHandler = catchAsync(async (request, response) => {
  const items = await getCartItems(request.user.id);

  response.json({
    success: true,
    data: items,
  });
});

export const mergeCartItemsHandler = catchAsync(async (request, response) => {
  const items = await mergeCartItems(request.user.id, request.body.items);

  response.json({
    success: true,
    message: "Cart synced successfully.",
    data: items,
  });
});

export const addCartItemHandler = catchAsync(async (request, response) => {
  const items = await addCartItem(request.user.id, request.body);

  response.status(201).json({
    success: true,
    message: "Cart updated successfully.",
    data: items,
  });
});

export const updateCartItemQuantityHandler = catchAsync(async (request, response) => {
  const items = await updateCartItemQuantity(request.user.id, request.params.productId, request.body);

  response.json({
    success: true,
    message: "Cart quantity updated successfully.",
    data: items,
  });
});

export const deleteCartItemHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;
  const items = await deleteCartItem(request.user.id, request.params.productId, query.mode);

  response.json({
    success: true,
    message: "Cart item removed successfully.",
    data: items,
  });
});

export const clearCartItemsHandler = catchAsync(async (request, response) => {
  const items = await clearCartItems(request.user.id);

  response.json({
    success: true,
    message: "Cart cleared successfully.",
    data: items,
  });
});
