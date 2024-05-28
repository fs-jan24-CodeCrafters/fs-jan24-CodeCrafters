import { Link } from 'react-router-dom';

import { Title } from '../../../Shared/Title';
import { CategoryData } from '../ShopByCategorySection';
import { useTranslation } from 'react-i18next';
import { Loader } from '../../../Shared/Loader';

import styles from './CategoryItem.module.scss';

interface Props {
  categoryData: CategoryData;
  isLoading: boolean;
}

export const CategoryItem: React.FC<Props> = ({ categoryData, isLoading }) => {
  const { t } = useTranslation();
  const { productsAmount, imgUrl, name, imgBgColor, urlPath } = categoryData;

  return (
    <Link to={`/${urlPath}`} className={styles.categoryItem}>
      <div className={`${styles.imgWrap} ${styles[imgBgColor]}`}>
        <img src={imgUrl} alt={name} />
      </div>
      <Title titleTag="h4" className={styles.title}>
        {name}
      </Title>
      {!isLoading && (
        <span
          className={styles.text}
        >{`${productsAmount} ${t(`common:home.models`)}`}</span>
      )}
      {isLoading && <Loader className={styles.textItemLoader} />}
    </Link>
  );
};
