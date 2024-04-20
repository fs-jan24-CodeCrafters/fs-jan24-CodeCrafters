import { FooterNavLink } from '../FooterNavLink/FooterNavLink';
import styles from '../Footer.module.scss';

export const FooterNav: React.FC = () => {
  return (
    <ul className={styles.footerNavigation}>
      <li className={styles.footerItem}>
        <FooterNavLink
          to="https://github.com/fs-jan24-CodeCrafters/fs-jan24-CodeCrafters"
          text="github"
        />
      </li>
      <li className={styles.footerItem}>
        <FooterNavLink to="/contacts" text="contacts" />
      </li>
      <li className={styles.footerItem}>
        <FooterNavLink to="/rights" text="rights" />
      </li>
    </ul>
  );
};
