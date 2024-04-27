import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { useFavorites } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';
import { Card } from '../Shared/Card';
import { Title } from '../Shared/Title';

import styles from './Favorites.module.scss';
import { ContinueShoppingLink } from '../Shared/ContinueShoppingLink';

export const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const { favorites, countFavorites } = useFavorites();
  return (
    <>
      <Helmet>
        <title>{t(`common:favorites.title`)}</title>
        <meta name="description" content={t(`common:favorites.title`)} />
      </Helmet>
      <Container className="section">
        <Breadcrumbs>
          <BreadcrumbsItem tagType="span">
            {t(`common:favorites.title`)}
          </BreadcrumbsItem>
        </Breadcrumbs>
        <Title titleTag="h1" className={styles.title}>
          {t(`common:favorites.title`)}
        </Title>
        {countFavorites ? (
          <>
            <span className={`${styles.textItem} ${styles.productsAmountText}`}>
              {`${countFavorites} ${t(`common:favorites.items`)}`}
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
                {t(`common:favorites.desc`)}
              </Title>

              <div className={styles.image}>
                <svg className={styles.icon}>
                  <use href={`/icons/symbol-defs.svg#icon-broken-heart`} />
                </svg>
              </div>
              <ContinueShoppingLink />
            </div>
          </>
        )}
      </Container>
    </>
  );
};
