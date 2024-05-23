import { useTranslation } from 'react-i18next';

import { Container } from '../../Shared/Container';
import { ProductsSlider } from '../../Shared/ProductsSlider';
import { useProductsApi } from '../../../hooks/useProductsApi';
import { getNewProducts } from '../../../api/products';
import { Loader } from '../../Shared/Loader';

export const BrandNewModelsSection: React.FC = () => {
  const { t } = useTranslation();
  const { products, loading } = useProductsApi(getNewProducts);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="section">
          <Container>
            <ProductsSlider
              hasDiscountPrice={false}
              sliderTitle={t(`common:home.slider.brandNewModels`)}
              products={products}
            />
          </Container>
        </section>
      )}
    </>
  );
};
