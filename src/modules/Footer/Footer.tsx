import { Logo } from '../Shared/Logo/Logo';
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
    </footer>
  );
};
