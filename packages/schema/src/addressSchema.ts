import z from "zod";

export const createAddressSchema = z.object({
  user_id: z.string(),
  recipient_name: z.string().max(50),
  label: z.string().max(50).optional().nullable(),
  address_line1: z.string().optional().nullable(),
  address_line2: z.string().optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  province: z.string().max(100).optional().nullable(),
  postal_code: z.string().max(20).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
  is_default: z.boolean().optional().default(false),
});

export const updateAddressSchema = z.object({
  recipient_name: z.string().max(50).optional().nullable(),
  label: z.string().max(50).optional().nullable(),
  address_line1: z.string().optional().nullable(),
  address_line2: z.string().optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  province: z.string().max(100).optional().nullable(),
  postal_code: z.string().max(20).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
  is_default: z.boolean().optional(),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
