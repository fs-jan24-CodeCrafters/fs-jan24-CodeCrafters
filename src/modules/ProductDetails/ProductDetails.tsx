import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';
import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';
import { ProductInfo } from './ProductInfo';
import { ProductsSlider } from '../Shared/ProductsSlider';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import products from '../../../public/api/products.json';

export const ProductDetails: React.FC = () => {
  const { path, categoryName } = getPathAndCategoryNameFromUrl();

  const recommendedProducts = getProductsByCategory(products, path).slice(
    0,
    10,
  );

  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="Link" path={`/${path}`}>
          {categoryName}
        </BreadcrumbsItem>
        <BreadcrumbsItem tagType="span">Some product name</BreadcrumbsItem>
      </Breadcrumbs>
      <ProductInfo />
      <ProductsSlider
        sliderTitle="You may also like"
        products={recommendedProducts}
      ></ProductsSlider>
    </Container>
  );
};
