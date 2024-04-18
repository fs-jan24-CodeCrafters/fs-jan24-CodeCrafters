import products from '../../../../public/api/products.json';
import { Container } from '../../Shared/Container';
import { ProductsSlider } from '../../Shared/ProductsSlider';
export const BrandNewModelsSection: React.FC = () => {
  const productsList = products
    .filter(({ year }) => year === 2022)
    .sort((a, b) => b.price - a.price);

  return (
    <section className="section">
      <Container>
        <ProductsSlider
          hasDiscountPrice={false}
          sliderTitle="Brand new models"
          products={productsList}
        />
      </Container>
    </section>
  );
};
