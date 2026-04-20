import { catchAsync } from "../../utils/catch-async.js";
import {
  cancelCustomerOrder,
  createOrder,
  getOrderById,
  getOrderHistory,
  getSellerOrders,
  getUserOrders,
  updateSellerOrderItemStatus,
} from "./order.service.js";

export const createOrderHandler = catchAsync(async (request, response) => {
  const order = await createOrder({
    customer: request.user?.role === "CUSTOMER" ? request.user : null,
    payload: request.body,
  });

  response.status(201).json({
    success: true,
    message: "Order created successfully.",
    data: order,
  });
});

export const getUserOrdersHandler = catchAsync(async (request, response) => {
  const orders = await getUserOrders(request.user);

  response.json({
    success: true,
    data: orders,
  });
});

export const getOrderHistoryHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;
  const orders = await getOrderHistory({
    user: request.user,
    email: query.email,
  });

  response.json({
    success: true,
    data: orders,
  });
});

export const getSellerOrdersHandler = catchAsync(async (request, response) => {
  const orders = await getSellerOrders(request.user.id);

  response.json({
    success: true,
    data: orders,
  });
});

export const getOrderByIdHandler = catchAsync(async (request, response) => {
  const query = request.validatedQuery || request.query;
  const order = await getOrderById({
    orderId: request.params.orderId,
    user: request.user,
    email: query.email,
  });

  response.json({
    success: true,
    data: order,
  });
});

export const updateSellerOrderItemStatusHandler = catchAsync(
  async (request, response) => {
    const order = await updateSellerOrderItemStatus({
      orderId: request.params.orderId,
      sellerId: request.user.id,
      nextStatus: request.body.status,
    });

    response.json({
      success: true,
      message: "Seller item status updated successfully.",
      data: order,
    });
  },
);

export const cancelCustomerOrderHandler = catchAsync(async (request, response) => {
  const order = await cancelCustomerOrder({
    orderId: request.params.orderId,
    customer: request.user,
  });

  response.json({
    success: true,
    message: "Order cancelled successfully.",
    data: order,
  });
});
