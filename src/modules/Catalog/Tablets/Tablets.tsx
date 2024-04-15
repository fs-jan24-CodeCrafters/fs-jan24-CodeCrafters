import { Link } from 'react-router-dom';
import { Container } from '../../Shared/Container';
import { Breadcrumbs } from '../../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../../Shared/Breadcrumbs/BreadcrumbsItem';

import styles from './Tablets.module.scss';

export const Tablets: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">Tablets</BreadcrumbsItem>
      </Breadcrumbs>
      <Link to={'asfaasdasdassfasfa'}>Some Tablets</Link>
    </Container>
  );
};
