import { useTranslation } from 'react-i18next';

import products from '../../../../public/api/products.json';
import { Container } from '../../Shared/Container';
import { ProductsSlider } from '../../Shared/ProductsSlider';

export const BrandNewModelsSection: React.FC = () => {
  const { t } = useTranslation();
  const productsList = products
    .filter(({ year }) => year === 2022)
    .sort((a, b) => b.price - a.price);

  return (
    <section className="section">
      <Container>
        <ProductsSlider
          hasDiscountPrice={false}
          sliderTitle={t(`common:home.slider.brandNewModels`)}
          products={productsList}
        />
      </Container>
    </section>
  );
};
