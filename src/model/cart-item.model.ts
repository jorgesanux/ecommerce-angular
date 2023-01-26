import { Product } from "./product.model";

export interface CartItem {
  id: string;
  quantity: number;
  product: Product
}
