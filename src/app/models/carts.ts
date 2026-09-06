import { Product } from './products';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ApiCartItem = {
  id: number;
  product: Product;
  quantity: number;
  created_at: string;
  user_id: number;
};
