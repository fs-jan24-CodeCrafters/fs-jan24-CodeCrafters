// import products from '../../public/api/products.json';
import { Product } from '../types/Product';

// const apiData = products as Product[];

export const fetchDataFromApi = async (
  fetchFunction: () => Promise<Product[]>,
): Promise<Product[]> => {
  const result = await fetchFunction();
  return result;
};
