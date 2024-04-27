import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './ContinueShoppingLink.module.scss';

export const ContinueShoppingLink: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Link className={styles.link} to="/">
      {t('common:continueShopping.text')}
    </Link>
  );
};
