import { Container } from '../Shared/Container';
import { ProductsSlider } from '../Shared/ProductsSlider';
import products from '../../../public/api/products.json';

export const HomePage: React.FC = () => {
  return (
    <Container>
      <ProductsSlider
        products={products}
        sliderTitle="Brand new models"
      ></ProductsSlider>{' '}
      {/* added for demo */}
    </Container>
  );
};
