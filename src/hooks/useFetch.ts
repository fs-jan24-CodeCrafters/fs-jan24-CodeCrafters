/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';

export const useFetch = (
  fetchFunction: (...args: any) => Promise<any>,
  ...fetchParams: any[]
) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [...fetchParams]);

  const fetchData = useCallback(async () => {
    setIsError(false);
    try {
      setLoading(true);
      const resData = await fetchFunction(...fetchParams);
      setData(resData);
    } catch (error) {
      setIsError(true);
      throw new Error('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, ...fetchParams]);

  return { data, loading, isError, fetchData };
};
