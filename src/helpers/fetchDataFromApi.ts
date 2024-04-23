import products from '../../public/api/products.json';
import { Product } from '../types/Product';

const apiData = products as Product[];

export const fetchDataFromApi = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiData);
    }, 500);
  });
};
