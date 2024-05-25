import { client } from '../helpers/fetchClient';
import { Product } from '../types/Product';

export const getProducts = () => {
  return client.get<Product[]>('/products');
};

export const getProductsByCategory = (
  category: string,
  sort?: string | undefined,
  perPage?: string | undefined,
  page?: string | undefined,
  range?: string | undefined,
) => {
  return client.get<Product[]>(
    `/products/${category}?sort=${sort}&perPage=${perPage}&page=${page}&range=${range}`,
  );
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

export const searchProductsByTitle = (name: string) => {
  return client.get<Product[]>(`/products/search?name=${name}`);
};
