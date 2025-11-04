interface VariantCombination {
  id?: string; // Ada kalo fetch dari data produk
  sku: string;
  option_values: Record<string, string>;
  stock_quantity: number;
  reserved_quantity: number;
  safety_stock: number;
  additional_price_cents: number;
}

interface VariantOption {
  name: string;
  values: string[];
}

interface Attachment {
  id?: number; // Unique Indentifier dari fetch
  file: File;
  key?: string;
  url?: string;
  isUploading: boolean;
}
