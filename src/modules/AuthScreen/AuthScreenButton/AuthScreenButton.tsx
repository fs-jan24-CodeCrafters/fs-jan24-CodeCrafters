import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './AuthScreenButton.module.scss';

export const AuthScreenButton = () => {
  const { t } = useTranslation();

  return (
    <Link to="/auth-screen" className={styles.authButton} id="auth-button">
      {t('common:auth.login')}
    </Link>
  );
};
