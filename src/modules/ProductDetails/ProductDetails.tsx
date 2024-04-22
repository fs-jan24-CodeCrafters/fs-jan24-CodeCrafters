import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';
import { ProductsSlider } from '../Shared/ProductsSlider';
import { Title } from '../Shared/Title';
import { Loader } from '../Shared/Loader';
import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { getProductIdFromUrl } from '../../helpers/getProductIdFromUrl';
import { findProductById } from '../../helpers/findProductById';
import { useProductsApi } from '../../hooks/useProductsApi';
import { ProductInfo } from './ProductInfo';
import { VariantsSection } from './VariantsSection';
import styles from './ProductDetails.module.scss';

export const ProductDetails: React.FC = () => {
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

  return (
    <>
      {currentProduct && (
        <Container>
          <Breadcrumbs>
            <BreadcrumbsItem tagType="Link" path={`/${path}`}>
              {categoryName}
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

              <VariantsSection productDetails={currentProduct} />

              <ProductInfo product={currentProduct} />

              <ProductsSlider
                sliderTitle="You may also like"
                products={recommendedProducts}
              ></ProductsSlider>
            </>
          )}
        </Container>
      )}
    </>
  );
};
