import products from '../../public/api/products.json';
import { Product } from '../types/Product';

export const getProductByItemId = (itemId: string): Product | undefined => {
  return products.find((product) => product.itemId === itemId);
};
