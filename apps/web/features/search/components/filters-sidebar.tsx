"use client";

import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Slider } from "@repo/ui/components/slider";
import { memo } from "react";
import { useSearchStore } from "@/features/search/store/useSearchStore";

interface Props {
  showFilters: boolean;
}

export const FiltersSidebar = memo(function FiltersSidebar({
  showFilters,
}: Props) {
  const {
    priceRange,
    selectedCategories,
    selectedBrands,
    setPriceRange,
    toggleCategory,
    toggleBrand,
    resetFilters,
  } = useSearchStore();

  const categories = ["Smartphone", "Laptop", "Audio", "Wearable", "Tablet"];
  const brands = ["TechPro", "SoundMax", "ProBook"];

  return (
    <aside className={`space-y-8 ${showFilters ? "block" : "hidden"} lg:block`}>
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Kategori</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
            <label
              htmlFor={category}
              className="text-sm font-medium cursor-pointer"
            >
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Brand</h3>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={brand}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() => toggleBrand(brand)}
            />
            <label
              htmlFor={brand}
              className="text-sm font-medium cursor-pointer"
            >
              {brand}
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Harga</h3>
        <Slider
          min={0}
          max={50000000}
          step={100000}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Rp {priceRange[0].toLocaleString("id-ID")}</span>
          <span>Rp {priceRange[1].toLocaleString("id-ID")}</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset Filter
      </Button>
    </aside>
  );
});
