import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../../Shared/Container';
import { ProductsList } from '../../ProductsList';
import products from '../../../../public/api/products.json';
import { getProductsByCategory } from '../../../helpers/getProductsByCategory';


export const Phones: React.FC = () => {
const phonesList = getProductsByCategory(products, 'phones');

  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">Phones</BreadcrumbsItem>
      </Breadcrumbs>
      <Link to={'2asdas'}>Some Phone</Link>
      <ProductsList products={phonesList} />
    </Container>
  );
};
