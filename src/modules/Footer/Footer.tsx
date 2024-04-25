import { useTranslation } from 'react-i18next';

import { scrollToTop } from '../../helpers/scrollToTop';
import { Container } from '../Shared/Container';
import { Logo } from '../Shared/Logo/Logo';
import { FooterNav } from './FooterNav/FooterNav';
import { SpriteIcon } from '../Shared/SpriteIcon';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Logo className={styles.logo} />

        <FooterNav />

        <button onClick={scrollToTop} className={styles.upButton}>
          <span className={styles.buttonText}>
            {t(`common:footer.backToTop`)}
          </span>
          <span className={styles.buttonIcon}>
            <SpriteIcon iconName="icon-Chevron-Arrow-Up" />
          </span>
        </button>
      </Container>
    </footer>
  );
};
