import { FooterNavLink } from '../FooterNavLink/FooterNavLink';
import styles from '../Footer.module.scss';

export const FooterNav: React.FC = () => {
  return (
    <div className={styles.navigation}>
      <FooterNavLink
        to="https://github.com/fs-jan24-CodeCrafters/fs-jan24-CodeCrafters"
        text="github"
      />
      <FooterNavLink to="/contacts" text="contacts" />
      <FooterNavLink to="/rights" text="rights" />
    </div>
  );
};