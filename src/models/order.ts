import { Product } from './product'

export type OrderProduct = {
  id?: number;
  quantity: number;
  orderId: number;
  productId: number;
  products?: Product[];
};

export type Order = {
  id?: number;
  status: string;
  userId: number;
  userName?: string;
  products?: OrderProduct[];
};