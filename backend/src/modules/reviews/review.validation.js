import { z } from "zod";

export const getReviewsByProductIdSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    productId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const createReviewSchema = z.object({
  body: z.object({
    orderId: z.string().trim().min(1),
    productId: z.string().trim().min(1),
    mode: z.enum(["retail", "wholesale", "RETAIL", "WHOLESALE"]),
    sellerName: z.string().trim().optional(),
    rating: z.coerce.number().int().min(1).max(5),
    title: z.string().trim().min(2),
    comment: z.string().trim().min(2),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
