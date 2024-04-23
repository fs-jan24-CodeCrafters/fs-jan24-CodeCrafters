import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';
import styles from './Favorites.module.scss';
import { Card } from '../Shared/Card';
import { Title } from '../Shared/Title';
import { useFavorites } from '../../context/FavoritesContext';

export const Favorites: React.FC = () => {
  const { favorites, countFavorites } = useFavorites();
  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">Favorites</BreadcrumbsItem>
      </Breadcrumbs>
      <Title titleTag="h1" className={styles.title}>
        Favorites
      </Title>
      {countFavorites ? (
        <>
          <span className={`${styles.textItem} ${styles.productsAmountText}`}>
            {`${countFavorites} items`}
          </span>
          <ul className={styles.list}>
            {favorites.map((product) => (
              <li key={product.id} className={styles.item}>
                <Card product={product} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className={styles.wrapper}>
            <Title titleTag="h2" className={styles.pageTitle}>
              {`You don't have any favorite products yet.`}
            </Title>
          </div>
        </>
      )}
    </Container>
  );
};
