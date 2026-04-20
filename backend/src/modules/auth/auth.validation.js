import { z } from "zod";

const baseRegistrationFields = {
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(6),
  age: z.coerce.number().int().min(13).max(100),
  gender: z.string().trim().min(1),
};

export const registerSellerSchema = z.object({
  body: z.object({
    ...baseRegistrationFields,
    storeName: z.string().trim().min(2),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const registerCustomerSchema = z.object({
  body: z.object(baseRegistrationFields),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email(),
    password: z.string().min(6),
    role: z.enum(["SELLER", "CUSTOMER", "ADMIN"]).optional(),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
