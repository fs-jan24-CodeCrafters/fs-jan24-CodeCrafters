import { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../helpers/fetchData';
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
      // Error loading data: ' + error.message
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, fetchData };
};
