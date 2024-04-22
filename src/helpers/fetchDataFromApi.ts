import { Product } from '../types/Product';
import products from '../../public/api/products.json';

const apiData = products as Product[];

export const fetchDataFromApi = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiData);
    }, 500);
  });
};
