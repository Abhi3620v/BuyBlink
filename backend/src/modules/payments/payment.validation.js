import { z } from "zod";

const checkoutPayloadSchema = z.object({
  paymentMethod: z.enum(["UPI", "CARD"]),
  shipping: z.object({
    name: z.string().trim().min(2),
    email: z.string().trim().email(),
    phone: z.string().trim().min(10),
    address: z.string().trim().min(5),
    city: z.string().trim().min(2),
    pincode: z.string().trim().min(4),
  }),
  items: z
    .array(
      z.object({
        id: z.string().trim().min(1),
        mode: z.enum(["retail", "wholesale", "RETAIL", "WHOLESALE"]),
        quantity: z.coerce.number().int().min(1),
      }),
    )
    .min(1),
});

export const createRazorpayCheckoutSchema = z.object({
  body: checkoutPayloadSchema,
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const verifyRazorpayPaymentSchema = z.object({
  body: z.object({
    razorpayOrderId: z.string().trim().min(1),
    razorpayPaymentId: z.string().trim().min(1),
    razorpaySignature: z.string().trim().min(1),
    email: z.string().trim().email().optional(),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const cancelRazorpayCheckoutSchema = z.object({
  body: z.object({
    razorpayOrderId: z.string().trim().min(1),
    email: z.string().trim().email().optional(),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const retryRazorpayPaymentSchema = z.object({
  body: z.object({
    orderId: z.string().trim().min(1),
    email: z.string().trim().email().optional(),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
