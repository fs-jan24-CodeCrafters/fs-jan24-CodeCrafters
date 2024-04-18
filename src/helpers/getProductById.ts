import { ProductDetails } from '../types/ProductDetails';

export const getProductById = (
  products: ProductDetails[],
  productId: string,
) => {
  return products.find((product) => product.id === productId);
};
