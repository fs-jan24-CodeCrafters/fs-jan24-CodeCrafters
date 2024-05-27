import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';
import { getProductIdFromUrl } from '../../helpers/getProductIdFromUrl';
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
import { getRecommendedProducts } from '../../api/products';
import { getProductItemById } from '../../api/productItem';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const ProductDetails: React.FC = () => {
  const { t } = useTranslation();
  const { path, categoryName } = getPathAndCategoryNameFromUrl();
  const productId = getProductIdFromUrl();
  const navigate = useNavigate();

  const fetchFunction = () => {
    return getRecommendedProducts(productId!);
  };

  const { products, loading } = useProductsApi(fetchFunction);

  const {
    data: currentProduct,
    isError,
    isPlaceholderData: isLoading,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductItemById(productId!),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      navigate('/not-found', { replace: true });
    }
  }, [isError]);

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
                isLoading={isLoading}
              />

              <ProductInfo product={currentProduct} />

              <section className="section">
                <ProductsSlider
                  sliderTitle={t(`common:product.slider`)}
                  products={products}
                />
              </section>
            </>
          )}
        </Container>
      )}
    </>
  );
};
