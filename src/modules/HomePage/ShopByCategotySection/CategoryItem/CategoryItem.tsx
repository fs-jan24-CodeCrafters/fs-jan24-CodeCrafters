import { Link } from 'react-router-dom';

import { Title } from '../../../Shared/Title';
import { CategoryData } from '../ShopByCategorySection';

import styles from './CategoryItem.module.scss';

interface Props {
  categoryData: CategoryData;
}

export const CategoryItem: React.FC<Props> = ({ categoryData }) => {
  const { productsAmount, imgUrl, name, imgBgColor, urlPath } = categoryData;

  return (
    <Link to={`/${urlPath}`} className={styles.categoryItem}>
      <div className={`${styles.imgWrap} ${styles[imgBgColor]}`}>
        <img src={imgUrl} alt={name} />
      </div>
      <Title titleTag="h4" className={styles.title}>
        {name}
      </Title>
      <span className={styles.text}>{`${productsAmount} models`}</span>
    </Link>
  );
};
