import { Link } from 'react-router-dom';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import products from '../../../public/api/products.json';
import { Container } from '../Shared/Container';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { ProductsList } from './ProductsList';
import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';

export const CatalogPage: React.FC = () => {
  const { path, categoryName } = getPathAndCategoryNameFromUrl();

  const productsList = getProductsByCategory(products, path);

  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">{categoryName}</BreadcrumbsItem>
      </Breadcrumbs>
      <Link to={'2asdas'}>Some Phone</Link>
      <ProductsList products={productsList} />
    </Container>
  );
};
