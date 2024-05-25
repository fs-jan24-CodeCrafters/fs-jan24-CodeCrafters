import { useCallback, useEffect, useState } from 'react';
import { ProductDetails } from '../types/ProductDetails';

export const useProductItemApi = (
  fetchFunction: (id: string) => Promise<ProductDetails>,
  productId: string,
) => {
  const [currentProduct, setCurrentProduct] = useState<ProductDetails | null>(
    null,
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [productId]);

  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const resData = await fetchFunction(productId);
      setCurrentProduct(resData);
    } catch (error) {
      setIsError(true);
      throw new Error('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, productId]);

  return { currentProduct, isError, isLoading, fetchData };
};
