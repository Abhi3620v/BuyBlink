import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    paymentMethod: z.enum(["UPI", "CARD", "COD"]),
    paymentDetails: z
      .object({
        upiId: z.string().trim().min(3).optional(),
        cardholderName: z.string().trim().min(2).optional(),
        cardLast4: z.string().trim().regex(/^\d{4}$/).optional(),
        cardNetwork: z.string().trim().min(2).optional(),
      })
      .optional(),
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
  }).superRefine((body, context) => {
    if (body.paymentMethod === "UPI" && !body.paymentDetails?.upiId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paymentDetails", "upiId"],
        message: "UPI ID is required for UPI payments.",
      });
    }

    if (body.paymentMethod === "CARD") {
      if (!body.paymentDetails?.cardholderName) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["paymentDetails", "cardholderName"],
          message: "Cardholder name is required for card payments.",
        });
      }

      if (!body.paymentDetails?.cardLast4) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["paymentDetails", "cardLast4"],
          message: "Card last four digits are required for card payments.",
        });
      }
    }
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const getOrderHistorySchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({
    email: z.string().trim().email().optional(),
  }),
});

export const getOrderByIdPublicSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    orderId: z.string().trim().min(1),
  }),
  query: z.object({
    email: z.string().trim().email().optional(),
  }),
});

export const updateSellerOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["NEW", "ACCEPTED", "PACKING", "SHIPPED", "DELIVERED", "CANCELLED"]),
  }),
  params: z.object({
    orderId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const cancelCustomerOrderSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    orderId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});
