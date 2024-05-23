import { client } from '../helpers/fetchClient';
import { Product } from '../types/Product';

export const getProducts = () => {
  return client.get<Product[]>('/products');
};

export const getProductsByCategory = (category: string) => {
  return client.get<Product[]>(`/products/${category}`);
};

export const getRecommendedProducts = (itemId: string) => {
  return client.get<Product[]>(`/products/${itemId}/recommended`);
};

export const getNewProducts = () => {
  return client.get<Product[]>('/products/new');
};

export const getDiscountedProducts = () => {
  return client.get<Product[]>('/products/discount');
};
