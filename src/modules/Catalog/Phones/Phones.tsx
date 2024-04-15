import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../../Shared/Container';

export const Phones: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">Phones</BreadcrumbsItem>
      </Breadcrumbs>
      <Link to={'2asdas'}>Some Phone</Link>
    </Container>
  );
};
