"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import type { Product } from "@/features/search/types/search.types";

export const ProductGrid = memo(function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0)
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">
          Tidak ada produk ditemukan
        </p>
      </div>
    );

  return (
    <div className="lg:col-span-3">
      <p className="text-muted-foreground mb-4">
        {products.length} produk ditemukan
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href="/product"
            className="group relative bg-background border border-border hover:border-foreground transition-all"
          >
            <div className="aspect-square bg-secondary overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-medium text-sm line-clamp-2">{p.name}</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 fill-current" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {p.rating} ({p.reviews})
                </span>
              </div>
              <p className="font-bold text-base">
                Rp {p.price.toLocaleString("id-ID")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});
