import type { Product, ProductColor, ProductStorage } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
  selectedStorage?: ProductStorage;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'cart' | 'wishlist';
  title: string;
  message: string;
}
