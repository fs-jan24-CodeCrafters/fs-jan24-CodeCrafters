import { client } from '../helpers/fetchClient';
import { Product } from '../types/Product';
import { ProductsResponse } from '../types/ProductsResponse';

export const getProducts = () => {
  return client.get<Product[]>('/products');
};

export const getProductsByCategory = (
  category: string,
  sort?: string | null,
  perPage?: string | null,
  page?: string | null,
  range?: string | null,
) => {
  return client.get<ProductsResponse>(
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

export const getProductByItemId = (itemId: string) => {
  return client.get<Product>(`/products/${itemId}/itemId`);
};
