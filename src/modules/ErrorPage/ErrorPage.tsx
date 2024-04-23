import { Link } from 'react-router-dom';

import { Button } from '../Shared/Button';
import { Title } from '../Shared/Title';
import { Container } from '../Shared/Container';

import styles from './ErrorPage.module.scss';

export const ErrorPage: React.FC = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.errorWrapper}>
        <Title titleTag="h1">404</Title>

        <Title titleTag="h2" className={styles.errorName}>
          Page not found
        </Title>

        <p>Opps, sorry you&apos;ve to go back. Your page is not found.</p>

        <div className={styles.button}>
          <Link to={'/'}>
            <Button>Back Home</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};
