import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';

import styles from './Favorites.nodule.scss';

export const Favorites: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">Favorites</BreadcrumbsItem>
      </Breadcrumbs>
      <Link to={'asfaasdasdassfasfa'}>Some Item</Link>
    </Container>
  );
};
