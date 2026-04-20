import { z } from "zod";

const modeSchema = z.enum(["retail", "wholesale", "RETAIL", "WHOLESALE"]);

export const addCartItemSchema = z.object({
  body: z.object({
    productId: z.string().trim().min(1),
    mode: modeSchema,
    quantity: z.coerce.number().int().min(1).optional(),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    mode: modeSchema,
    quantity: z.coerce.number().int().min(1),
  }),
  params: z.object({
    productId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const deleteCartItemSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    productId: z.string().trim().min(1),
  }),
  query: z.object({
    mode: modeSchema.optional(),
  }),
});

export const mergeCartSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          productId: z.string().trim().min(1),
          mode: modeSchema,
          quantity: z.coerce.number().int().min(1),
        }),
      )
      .default([]),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const getCartSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
