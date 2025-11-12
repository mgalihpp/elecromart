import { z } from "zod";

export const orderIdSchema = z.object({
  id: z.string().min(1),
});

export const createOrderSchema = z.object({
  user_id: z.string().min(1),
  address_id: z.number().int().optional().nullable(),
  status: z.string().min(1).optional(),
  subtotal_cents: z.number(),
  shipping_cents: z.number().optional(),
  tax_cents: z.number().optional(),
  discount_cents: z.number().optional(),
  coupon_code: z.string().min(1).optional().nullable(),
  // total_cents is usually computed server-side; include if client may supply it:
  total_cents: z.number().optional(),
});
