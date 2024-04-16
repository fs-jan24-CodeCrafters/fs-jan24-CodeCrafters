import { Link } from 'react-router-dom';
import styles from './Phones.modules.scss';
import { Breadcrumbs } from '../../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../../Shared/Container';
import { Card } from '../../Shared/Card/Card';

export const Phones: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">Phones</BreadcrumbsItem>
      </Breadcrumbs>
      <Link to={'2asdas'}>Some Phone</Link>
      <Card />
    </Container>
  );
};
