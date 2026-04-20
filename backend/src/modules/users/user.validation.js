import { z } from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    age: z.coerce.number().int().min(13).max(100).nullable().optional(),
    gender: z.string().trim().min(1).optional().or(z.literal("")),
    phone: z.string().trim().optional().or(z.literal("")),
    storeName: z.string().trim().min(2).optional().or(z.literal("")),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const createAddressSchema = z.object({
  body: z.object({
    label: z.string().trim().min(2),
    fullName: z.string().trim().min(2),
    phone: z.string().trim().min(10),
    addressLine: z.string().trim().min(5),
    city: z.string().trim().min(2),
    state: z.string().trim().min(2),
    pincode: z.string().trim().min(4),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const shippingDraftSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    email: z.string().trim().email(),
    phone: z.string().trim().min(10),
    address: z.string().trim().min(5),
    city: z.string().trim().min(2),
    pincode: z.string().trim().min(4),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const addressIdParamSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    addressId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const upsertWishlistItemSchema = z.object({
  body: z.object({
    productId: z.string().trim().min(1),
    mode: z.enum(["retail", "wholesale", "RETAIL", "WHOLESALE"]),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const deleteWishlistItemSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    productId: z.string().trim().min(1),
  }),
  query: z.object({
    mode: z.enum(["retail", "wholesale", "RETAIL", "WHOLESALE"]).optional(),
  }),
});

export const adminUserListSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({
    search: z.string().trim().optional(),
    role: z.enum(["CUSTOMER", "SELLER", "ADMIN"]).optional(),
    status: z.enum(["ACTIVE", "SUSPENDED"]).optional(),
  }),
});

export const adminUserIdParamSchema = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "SUSPENDED"]),
  }),
  params: z.object({
    userId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const notificationIdParamSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    notificationId: z.string().trim().min(1),
  }),
  query: z.object({}).default({}),
});

export const markAllNotificationsReadSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
