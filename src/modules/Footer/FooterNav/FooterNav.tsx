import { FooterNavLink } from '../FooterNavLink/FooterNavLink';
import styles from '../Footer.module.scss';

export const FooterNav: React.FC = () => {
  return (
    <ul className={styles.footer__navigation}>
      <li className={styles.footer__item}>
        <FooterNavLink
          to="https://github.com/fs-jan24-CodeCrafters/fs-jan24-CodeCrafters"
          text="github"
        />
      </li>
      <li className={styles.footer__item}>
        <FooterNavLink to="/contacts" text="contacts" />
      </li>
      <li className={styles.footer__item}>
        <FooterNavLink to="/rights" text="rights" />
      </li>
    </ul>
  );
};
