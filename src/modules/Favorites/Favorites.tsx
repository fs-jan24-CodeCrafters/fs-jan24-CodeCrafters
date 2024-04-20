import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';
import { useContext } from 'react';
import { FavoritesContext } from '../../MainContext/FavouritesContext';

export const Favorites: React.FC = () => {
  const { countFavorites } = useContext(FavoritesContext);
  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">Favorites</BreadcrumbsItem>
      </Breadcrumbs>
      <Link to={'asfaasdasdassfasfa'}>Some Item</Link>

      <span>{`${countFavorites} items`}</span>
    </Container>
  );
};
