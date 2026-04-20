import { catchAsync } from "../../utils/catch-async.js";
import {
  cancelRazorpayCheckout,
  createRazorpayCheckout,
  processRazorpayWebhook,
  retryRazorpayCheckout,
  verifyRazorpayCheckout,
} from "./payment.service.js";

export const createRazorpayCheckoutHandler = catchAsync(async (request, response) => {
  const checkout = await createRazorpayCheckout({
    customer: request.user?.role === "CUSTOMER" ? request.user : null,
    payload: request.body,
  });

  response.status(201).json({
    success: true,
    message: "Razorpay checkout created successfully.",
    data: checkout,
  });
});

export const verifyRazorpayCheckoutHandler = catchAsync(async (request, response) => {
  const order = await verifyRazorpayCheckout({
    user: request.user,
    email: request.body.email,
    razorpayOrderId: request.body.razorpayOrderId,
    razorpayPaymentId: request.body.razorpayPaymentId,
    razorpaySignature: request.body.razorpaySignature,
  });

  response.json({
    success: true,
    message: "Razorpay payment verified successfully.",
    data: order,
  });
});

export const retryRazorpayCheckoutHandler = catchAsync(async (request, response) => {
  const checkout = await retryRazorpayCheckout({
    user: request.user,
    email: request.body.email,
    orderId: request.body.orderId,
  });

  response.json({
    success: true,
    message: "Razorpay checkout retry created successfully.",
    data: checkout,
  });
});

export const cancelRazorpayCheckoutHandler = catchAsync(async (request, response) => {
  const result = await cancelRazorpayCheckout({
    user: request.user,
    email: request.body.email,
    razorpayOrderId: request.body.razorpayOrderId,
  });

  response.json({
    success: true,
    message: result.cancelled
      ? "Razorpay checkout cancelled successfully."
      : "No pending Razorpay checkout needed cancellation.",
    data: result,
  });
});

export const razorpayWebhookHandler = catchAsync(async (request, response) => {
  const result = await processRazorpayWebhook({
    rawBody: request.body,
    signature: request.headers["x-razorpay-signature"],
  });

  response.json({
    success: true,
    message: "Razorpay webhook processed.",
    data: result,
  });
});
