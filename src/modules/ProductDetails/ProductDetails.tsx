import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { getProductIdFromUrl } from '../../helpers/getProductIdFromUrl';
import { findProductById } from '../../helpers/findProductById';
import { useProductsApi } from '../../hooks/useProductsApi';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';
import { ProductsSlider } from '../Shared/ProductsSlider';
import { Title } from '../Shared/Title';
import { Loader } from '../Shared/Loader';
import { ProductInfo } from './ProductInfo';
import { VariantsSection } from './VariantsSection';

import styles from './ProductDetails.module.scss';

export const ProductDetails: React.FC = () => {
  const { t } = useTranslation();
  const { path, categoryName } = getPathAndCategoryNameFromUrl();
  const productId = getProductIdFromUrl();
  const navigate = useNavigate();

  const { products, loading } = useProductsApi();

  if (!productId) {
    return;
  }

  const currentProduct = findProductById(path, productId);

  useEffect(() => {
    if (!currentProduct) {
      navigate('/not-found', { replace: true });
    }
  });

  const recommendedProducts = getProductsByCategory(products, path)
    .filter((product) => product.itemId !== productId)
    .slice(0, 10);

  const breadcrumbsNames: Record<string, string> = {
    Phones: t(`common:catalog.phones`),
    Tablets: t(`common:catalog.tablets`),
    Accessories: t(`common:catalog.accessories`),
  };

  const catalogPageBreadcrumb = breadcrumbsNames[categoryName];

  return (
    <>
      <Helmet>
        <title>{currentProduct?.name}</title>
        <meta name="description" content={currentProduct?.name} />
      </Helmet>
      {currentProduct && (
        <Container>
          <Breadcrumbs>
            <BreadcrumbsItem tagType="Link" path={`/${path}`}>
              {catalogPageBreadcrumb}
            </BreadcrumbsItem>
            <BreadcrumbsItem tagType="span">
              {currentProduct.name}
            </BreadcrumbsItem>
          </Breadcrumbs>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Title titleTag="h1" className={styles.productTitle}>
                {currentProduct.name}
              </Title>

              <VariantsSection
                productDetails={currentProduct}
                categoryName={categoryName}
              />

              <ProductInfo product={currentProduct} />

              <section className="section">
                <ProductsSlider
                  sliderTitle={t(`common:product.slider`)}
                  products={recommendedProducts}
                />
              </section>
            </>
          )}
        </Container>
      )}
    </>
  );
};
