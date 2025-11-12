export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  storage?: string;
  color?: string;
}

export interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  readonly totalItems: number;
  readonly totalPrice: number;
}
