import { Product } from './Product';

export interface ProductsResponse {
  products: Product[];
  totalPages: number;
  min: number;
  max: number;
}
