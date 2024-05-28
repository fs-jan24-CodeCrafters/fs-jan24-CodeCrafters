import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSession } from '../../../context/SessionContext';
import { Button } from '../../Shared/Button';

import styles from './AuthScreenButton.module.scss';

interface Props {
  isModalVisible: boolean;
  setModalVisibility: (isModalVisible: boolean) => void;
}

export const AuthScreenButton: React.FC<Props> = ({
  isModalVisible,
  setModalVisibility,
}) => {
  const { t } = useTranslation();
  const { session } = useSession();

  return (
    <>
      {session ? (
        <Button
          className={styles.authButton}
          onClick={() => setModalVisibility(!isModalVisible)}
        >
          {t('common:auth.logout')}
        </Button>
      ) : (
        <Link to="/auth-screen" className={styles.authButton} id="auth-button">
          {t('common:auth.login')}
        </Link>
      )}
    </>
  );
};
