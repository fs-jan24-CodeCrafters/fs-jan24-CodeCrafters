import { client } from '../helpers/fetchClient';
import { Product } from '../types/Product';

export const getProducts = () => {
  return client.get<Product[]>('/products');
};

export const getProductsByCategory = (category: string) => {
  return client.get<Product[]>(`/products/${category}`);
};

export const getRecommendedProducts = (id: number) => {
  return client.get<Product[]>(`/products/${id}/recommended`);
};

export const getNewProducts = () => {
  return client.get<Product[]>('/products/new');
};

export const getDiscountedProducts = () => {
  return client.get<Product[]>('/products/discount');
};
