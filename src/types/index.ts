export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  // Optional rich fields — populated when REST API is wired
  originalPrice?: number;
  discount?: number;      // percentage e.g. 17
  rating?: number;        // e.g. 4.5
  reviewCount?: number;   // e.g. 1243
  badge?: string;         // "NEW" | "HOT DEAL" | "BEST SELLER"
}

export interface CartItem {
  product: Product;
  quantity: number;
}
