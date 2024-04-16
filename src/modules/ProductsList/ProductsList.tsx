import { Product } from '../../types/Product';
import { Card } from '../Shared/Card';

import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id} className={styles.item}>
          <Card product={product} />
        </li>
      ))}
    </ul>
  );
};
