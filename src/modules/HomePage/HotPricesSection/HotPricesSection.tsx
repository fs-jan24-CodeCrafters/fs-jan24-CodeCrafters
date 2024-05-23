import { useTranslation } from 'react-i18next';

import { Container } from '../../Shared/Container';
import { ProductsSlider } from '../../Shared/ProductsSlider';
import { useProductsApi } from '../../../hooks/useProductsApi';
import { getDiscountedProducts } from '../../../api/products';
import { Loader } from '../../Shared/Loader';

export const HotPricesSection: React.FC = () => {
  const { t } = useTranslation();
  const { products, loading } = useProductsApi(getDiscountedProducts);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="section">
          <Container>
            <ProductsSlider
              products={products}
              sliderTitle={t(`common:home.slider.hotPrices`)}
            />
          </Container>
        </section>
      )}
    </>
  );
};
