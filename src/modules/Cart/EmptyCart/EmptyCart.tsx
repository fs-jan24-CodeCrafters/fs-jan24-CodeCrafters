import { useTranslation } from 'react-i18next';
import { Title } from '../../Shared/Title';

import styles from './EmptyCart.module.scss';

export const EmptyCart: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.body}>
      <div className={styles.titleBox}>
        <Title titleTag="h2">{t(`common:cart.empty`)}</Title>
        <Title titleTag="h4">{t(`common:cart.emptyDesc`)}</Title>
      </div>
      <div className={styles.image}>
        <svg className={styles.icon}>
          <use href={`/icons/symbol-defs.svg#icon-man-with-cart`} />
        </svg>
      </div>
      <span className={styles.line}></span>
    </div>
  );
};
