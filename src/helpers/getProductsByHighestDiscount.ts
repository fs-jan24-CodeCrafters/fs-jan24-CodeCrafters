import { Product } from '../types/Product';

export const getProductsByHighestDiscount = (products: Product[]) => {
  return products
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);
};
