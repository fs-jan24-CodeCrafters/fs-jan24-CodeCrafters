import { client } from '../helpers/fetchClient';
import { ProductDetails } from '../types/ProductDetails';

export const getProductItemById = (id: string) => {
  return client.get<ProductDetails>(`/productItem/${id}`);
};
