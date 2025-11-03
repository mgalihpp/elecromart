"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { FiltersSidebar } from "@/features/search/components/filters-sidebar";
import { ProductGrid } from "@/features/search/components/product-grid";
import { useSearchStore } from "@/features/search/store/useSearchStore";

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(true);

  // ambil filter state dari store
  const {
    searchQuery,
    priceRange,
    selectedCategories,
    selectedBrands,
    setSearchQuery,
  } = useSearchStore();

  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Premium Smartphone Pro Max",
        price: 12999000,
        rating: 4.8,
        reviews: 2847,
        image: "/image/related-1.jpg",
        category: "Smartphone",
        brand: "TechPro",
      },
      {
        id: 2,
        name: "Wireless Earbuds Pro",
        price: 1299000,
        rating: 4.7,
        reviews: 1523,
        image: "/image/related-3.jpg",
        category: "Audio",
        brand: "SoundMax",
      },
      {
        id: 3,
        name: "Smart Watch Ultra",
        price: 3499000,
        rating: 4.9,
        reviews: 892,
        image: "/image/related-4.jpg",
        category: "Wearable",
        brand: "TechPro",
      },
      {
        id: 4,
        name: "Tablet Pro 12.9",
        price: 8999000,
        rating: 4.8,
        reviews: 634,
        image: "/image/related-1.jpg",
        category: "Tablet",
        brand: "TechPro",
      },
      {
        id: 5,
        name: "Laptop Air M2",
        price: 15999000,
        rating: 4.9,
        reviews: 1245,
        image: "/image/related-4.jpg",
        category: "Laptop",
        brand: "ProBook",
      },
      {
        id: 6,
        name: "Premium Headphones",
        price: 2499000,
        rating: 4.6,
        reviews: 734,
        image: "/image/related-3.jpg",
        category: "Audio",
        brand: "SoundMax",
      },
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return matchesSearch && matchesPrice && matchesCategory && matchesBrand;
    });
  }, [products, searchQuery, priceRange, selectedCategories, selectedBrands]);

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">Cari Produk</h1>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <FiltersSidebar showFilters={showFilters} />
        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
}
