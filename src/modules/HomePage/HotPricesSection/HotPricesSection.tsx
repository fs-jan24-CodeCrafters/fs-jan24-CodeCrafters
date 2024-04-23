import { getProductsByHighestDiscount } from '../../../helpers/getProductsByHighestDiscount';
import products from '../../../../public/api/products.json';
import { Container } from '../../Shared/Container';
import { ProductsSlider } from '../../Shared/ProductsSlider';

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
