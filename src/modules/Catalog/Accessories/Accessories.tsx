import { Link } from 'react-router-dom';
import { Container } from '../../Shared/Container';
import { Breadcrumbs } from '../../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../../Shared/Breadcrumbs/BreadcrumbsItem';

import styles from './Accessories.module.scss';

export const Accessories: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">Accessories</BreadcrumbsItem>
      </Breadcrumbs>
      <Link to={'asfasfasfa'}>Some Accessories</Link>
    </Container>
  );
};
