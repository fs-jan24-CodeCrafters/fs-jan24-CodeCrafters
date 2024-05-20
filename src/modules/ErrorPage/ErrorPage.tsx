import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { Button } from '../Shared/Button';
import { Title } from '../Shared/Title';
import { Container } from '../Shared/Container';

import styles from './ErrorPage.module.scss';

export const ErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <Helmet>
        <title>{t(`common:error.title`)}</title>
        <meta name="description" content={t(`common:error.title`)} />
      </Helmet>
      <Container className={styles.container}>
        <div className={styles.errorWrapper}>
          <Title titleTag="h1">404</Title>

          <Title titleTag="h2" className={styles.errorName}>
            {t(`common:error.title`)}
          </Title>

          <p className={styles.text}>{t(`common:error.desc`)}</p>

          <div className={styles.button}>
            <Link to={'/'}>
              <Button>{t(`common:error.backHome`)}</Button>
            </Link>
          </div>
        </div>
      </Container>
      <img
        className={styles.image}
        src="img/errorPage/1.png"
        alt="rolling field"
      />
    </section>
  );
};
