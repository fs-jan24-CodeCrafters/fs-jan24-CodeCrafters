import { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../helpers/fetchDataFromApi';
import { Product } from '../types/Product';

export const useProductsApi = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchDataFromApi();
      setProducts(data);
    } catch (error) {
      throw new Error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, fetchData };
};
