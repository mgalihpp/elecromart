import { create } from "zustand";
import type { SearchState } from "@/features/search/types/search.types";

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  priceRange: [0, 50000000],
  selectedCategories: [],
  selectedBrands: [],

  setSearchQuery: (value) => set({ searchQuery: value }),
  setPriceRange: (value) => set({ priceRange: value }),

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  toggleBrand: (brand) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter((b) => b !== brand)
        : [...state.selectedBrands, brand],
    })),

  resetFilters: () =>
    set({
      searchQuery: "",
      priceRange: [0, 50000000],
      selectedCategories: [],
      selectedBrands: [],
    }),
}));
