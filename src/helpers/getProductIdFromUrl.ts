import { useParams } from 'react-router-dom';

export const getProductIdFromUrl = () => {
  const { productId } = useParams();

  return productId;
};
