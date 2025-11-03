import { z } from "zod";

export const productIdParams = z.object({
  id: z.string().min(1),
});
export const variantIdParams = z.object({
  variantId: z.string().min(1),
});

export const listProductsQuery = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.enum(["newest", "price_asc", "price_desc"]).optional(),
});

export const createProductSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  sku: z.string(),
  status: z.string(),
  description: z.string().optional(),
  price_cents: z.number().int(),
  currency: z.string().optional(),
  category_id: z.number().optional(),
  supplier_id: z.number().optional(),
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
  });

export const createVariantSchema = z.object({
  product_id: z.string(),
  sku: z.string(),
  option_values: z.any().optional(),
  additional_price_cents: z.number().int().optional(),
  stock_quantity: z.number().optional(),
  reserved_quantity: z.number().optional(),
  safety_stock: z.number().optional(),
});

export const updateVariantSchema = createVariantSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
  });

export const createInventorySchema = z.object({
  stock_quantity: z.number(),
  reserved_quantity: z.number().optional(),
  safety_stock: z.number().optional(),
});

export const updateInventorySchema = createInventorySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
  });

export const createProductImagesSchema = z.array(
  z.object({
    product_id: z.string().min(1),
    url: z.url(),
    alt: z.string().optional(),
    sort_order: z.number(),
  })
);

export type ParamsProductId = z.infer<typeof productIdParams>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateVariantInput = z.infer<typeof createVariantSchema>;
export type UpdateVariantInput = z.infer<typeof updateVariantSchema>;
export type CreateInventoryInput = z.infer<typeof createInventorySchema>;
export type UpdateInventoryInput = z.infer<typeof updateInventorySchema>;
export type CreateProductImagesInput = z.infer<
  typeof createProductImagesSchema
>;
