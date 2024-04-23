import { Card } from '../../Shared/Card';
import { SkeletonCard } from '../../Shared/Card/SkeletonCard/SkeletonCard';
import { Product } from '../../../types/Product';

import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
  loading: boolean;
}

export const ProductsList: React.FC<Props> = ({ products, loading }) => {
  const fakeProductsList = [...new Array(10)].map((_i, index) => index);

  return (
    <ul className={styles.list}>
      {!loading
        ? products.map((product, index) => (
            <li key={product.id} className={styles.item}>
              <Card product={product} isLazy={index > 3} />
            </li>
          ))
        : fakeProductsList.map((i) => (
            <li key={i} className={styles.item}>
              <SkeletonCard />
            </li>
          ))}
    </ul>
  );
};
