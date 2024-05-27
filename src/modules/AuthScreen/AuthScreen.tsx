/* eslint-disable no-console */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import { Title } from '../Shared/Title';

import styles from './AuthScreen.module.scss';
import { CreateUserRequest } from '../../types/User';
import { createUser, loginUser as login } from '../../api/user';

export const AuthScreen: React.FC = () => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [registerUser, setRegisterUser] = useState<CreateUserRequest>({
    email: '',
    password: '',
  });
  const [loginUser, setLoginUser] = useState<CreateUserRequest>({
    email: '',
    password: '',
  });

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleRegisterChangeEmail = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setRegisterUser((prev) => ({
      ...prev,
      email: value,
    }));
  };

  const handleRegisterChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setRegisterUser((prev) => ({
      ...prev,
      password: value,
    }));
  };

  const handleLoginChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLoginUser((prev) => ({
      ...prev,
      email: value,
    }));
  };
  const handleLoginChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setLoginUser((prev) => ({
      ...prev,
      password: value,
    }));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(registerUser)
      .then((response) => {
        console.log('User registered successfully:', response);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginUser)
      .then((response) => {
        console.log('User logged in successfully:', response);
      })
      .catch((error) => {
        console.error('Error logging in user:', error);
      });
  };

  return (
    <>
      <div className={styles.authScreen} id="auth-screen">
        <div
          className={`${styles.container} ${isActive ? styles.active : ''}`}
          id="container"
        >
          <div className={`${styles.formContainer} ${styles.signUp}`}>
            <form onSubmit={handleRegisterSubmit}>
              <Title titleTag="h2">{t('common:auth.createAccount')}</Title>
              <div className={styles.socialIcons}>
                <a href="#" className="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="#" className="icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
              <span>or use your email for registeration</span>
              <input
                type="email"
                className={styles.morph_input}
                placeholder="Email"
                value={registerUser.email}
                onChange={handleRegisterChangeEmail}
              />
              <input
                type="password"
                className={styles.morph_input}
                placeholder="Password"
                value={registerUser.password}
                onChange={handleRegisterChangePassword}
              />
              <button className={styles.morph_button}>Sign Up</button>
            </form>
          </div>
          <div className={`${styles.formContainer} ${styles.signIn}`}>
            <form onSubmit={handleLoginSubmit}>
              <Title titleTag="h2">{t('common:auth.signIn')}</Title>
              <div className={styles.socialIcons}>
                <a href="#" className="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="#" className="icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
              <span>or use your email to log in</span>
              <input
                type="email"
                className={styles.morph_input}
                placeholder="Email"
                value={loginUser.email}
                onChange={handleLoginChangeEmail}
              />
              <input
                type="password"
                className={styles.morph_input}
                placeholder="Password"
                value={loginUser.password}
                onChange={handleLoginChangePassword}
              />
              <button className={styles.morph_button}>Log In</button>
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
