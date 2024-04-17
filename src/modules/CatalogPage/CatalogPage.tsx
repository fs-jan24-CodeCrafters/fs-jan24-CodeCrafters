import { Link, useLocation } from 'react-router-dom';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import products from '../../../public/api/products.json';
import { Container } from '../Shared/Container';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { ProductsList } from './ProductsList';

export const CatalogPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter((el) => el !== '')[0];
  const categoryName = path.charAt(0).toUpperCase() + path.slice(1);

  const productsList = getProductsByCategory(products, path);

  console.log(path);

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
