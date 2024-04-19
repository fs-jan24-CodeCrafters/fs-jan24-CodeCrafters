import { Container } from '../../Shared/Container';
import { ProductsSlider } from '../../Shared/ProductsSlider';
import products from '../../../../public/api/products.json';
import { getProductsByHighestDiscount } from '../../../helpers/getProductsByHighestDiscount';

export const HotPricesSection: React.FC = () => {
  const productsList = getProductsByHighestDiscount(products);

  return (
    <section className="section">
      <Container>
        <ProductsSlider products={productsList} sliderTitle="Hot prices" />
      </Container>
    </section>
  );
};
