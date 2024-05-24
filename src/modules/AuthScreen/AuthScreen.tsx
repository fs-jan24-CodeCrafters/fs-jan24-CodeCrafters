import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import { Title } from '../Shared/Title';

import styles from './AuthScreen.module.scss';

export const AuthScreen: React.FC = () => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <>
      <div className={styles.authScreen} id="auth-screen">
        <div
          className={`${styles.container} ${isActive ? styles.active : ''}`}
          id="container"
        >
          <div className={`${styles.formContainer} ${styles.signUp}`}>
            <form>
              <Title titleTag="h2">{t('common:auth.createAccount')}</Title>
              <div className={styles.socialIcons}>
                <a href="#" className="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="#" className="icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </form>
          </div>
          <div className={`${styles.formContainer} ${styles.signIn}`}>
            <form>
              <Title titleTag="h2">{t('common:auth.signIn')}</Title>
              <div className={styles.socialIcons}>
                <a href="#" className="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="#" className="icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </form>
          </div>
          <div className={`${styles.main_toggle} ${styles.morph}`}>
            <div className={styles.toggleContainer}>
              <div
                className={`${styles.toggle} ${isActive ? styles.active : ''}`}
              >
                <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                  <Title titleTag="h2">{t('common:auth.welcome')}</Title>
                  <p>{t('common:auth.welcomeDesc')}</p>
                  <button
                    onClick={handleLoginClick}
                    className={styles.hidden}
                    id="login"
                  >
                    {t('common:auth.signIn')}
                  </button>
                </div>
                <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                  <Title titleTag="h2">{t('common:auth.hello')}</Title>
                  <p>{t('common:auth.helloDesc')}</p>
                  <button
                    onClick={handleRegisterClick}
                    className={styles.hidden}
                    id="register"
                  >
                    {t('common:auth.createAccount')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
