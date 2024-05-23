import { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useProductsApi = (
  fetchFunction: (id?: string) => Promise<Product[]>,
  skipFetchOnMount?: boolean,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!skipFetchOnMount) {
      fetchData();
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFunction();
      setProducts(data);
    } catch (error) {
      throw new Error('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  return { products, loading, fetchData };
};
