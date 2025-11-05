import type { Prisma } from "@repo/db";

export interface VariantCombination {
  id?: string; // Ada kalo fetch dari data produk
  sku: string;
  option_values: Record<string, string>;
  stock_quantity: number;
  reserved_quantity: number;
  safety_stock: number;
  additional_price_cents: number;
}

export interface VariantOption {
  name: string;
  values: string[];
}

export interface Attachment {
  id?: number; // Unique Indentifier dari fetch
  file: File;
  key?: string;
  url?: string;
  isUploading: boolean;
}

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true;
    product_variants: {
      include: {
        inventory: true;
      };
    };
    product_images: true;
    reviews: true;
  };
}>;
