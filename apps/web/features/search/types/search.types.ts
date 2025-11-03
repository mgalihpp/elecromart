export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
}

export interface SearchState {
  searchQuery: string;
  priceRange: [number, number];
  selectedCategories: string[];
  selectedBrands: string[];

  setSearchQuery: (value: string) => void;
  setPriceRange: (value: [number, number]) => void;
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  resetFilters: () => void;
}
