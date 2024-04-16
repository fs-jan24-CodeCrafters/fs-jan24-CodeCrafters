import { Product } from '../../types/Product';
import { Card } from '../Shared/Card';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
