import { z } from "zod";

const stringArrayField = z
  .array(z.string().trim().min(1))
  .optional()
  .default([])
  .transform((values) =>
    values
      .map((value) => value.trim())
      .filter(Boolean),
  );

const baseProductBody = {
  name: z.string().trim().min(2),
  description: z.string().trim().optional().default(""),
  category: z.string().trim().min(2),
  features: stringArrayField,
  catalogType: z.enum(["retail", "wholesale", "all", "RETAIL", "WHOLESALE", "ALL"]),
  sustainabilityScore: z.coerce.number().int().min(1).max(100),
  retailPrice: z.coerce.number().min(0),
  wholesalePrice: z.coerce.number().min(0),
  minWholesaleQty: z.coerce.number().int().min(1),
  inventory: z.coerce.number().int().min(0),
  image: z.string().trim().optional().or(z.literal("")),
  gallery: stringArrayField,
};

export const createProductSchema = z.object({
  body: z.object(baseProductBody),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const updateProductSchema = z.object({
  body: z.object(baseProductBody),
  params: z.object({
    productId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const productIdParamSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    productId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const listProductsSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({
    section: z
      .enum(["retail", "wholesale", "all", "RETAIL", "WHOLESALE", "ALL"])
      .optional(),
    sellerId: z.string().trim().optional(),
    search: z.string().trim().optional(),
    category: z.string().trim().optional(),
  }),
});

export const landingHighlightsSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
