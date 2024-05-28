import { useCallback, useEffect, useState } from 'react';

export const useApiData = <Data, Params extends unknown[]>(
  fetchFunction: (...params: Params) => Promise<Data>,
  ...fetchParams: Params
) => {
  const [data, setData] = useState<Data | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [...fetchParams]);

  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const resData = await fetchFunction(...fetchParams);
      setData(resData);
    } catch (error) {
      setIsError(true);
      throw new Error('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, ...fetchParams]);

  return { data, isError, isLoading, fetchData };
};
