import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';
import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';
import { ProductInfo } from './ProductInfo';

export const ProductDetails: React.FC = () => {
  const { path, categoryName } = getPathAndCategoryNameFromUrl();

  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="Link" path={`/${path}`}>
          {categoryName}
        </BreadcrumbsItem>
        <BreadcrumbsItem tagType="span">Some product name</BreadcrumbsItem>
      </Breadcrumbs>
      <div></div>
      <ProductInfo />
    </Container>
  );
};
