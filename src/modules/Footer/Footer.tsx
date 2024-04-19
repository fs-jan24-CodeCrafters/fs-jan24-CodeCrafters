<<<<<<< Updated upstream
import { Container } from '../Shared/Container';
import { Title } from '../Shared/Title';

export const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <Title titleTag="h4">Footer Waiting For Dima)))</Title>
      </Container>
=======
import { Logo } from '../Logo/Logo';
import { FooterButton } from './FooterButton/FooterButton';
import { FooterNav } from './FooterNav/FooterNav';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logo}>
        <Logo />
      </div>
      <FooterNav />
      <FooterButton />
>>>>>>> Stashed changes
    </footer>
  );
};
