import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from '../Footer.module.scss';

export const FooterNav: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <NavLink
          className={styles.navLink}
          to="https://github.com/fs-jan24-CodeCrafters/fs-jan24-CodeCrafters"
        >
          {t(`common:footer.github`)}
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to="/contacts">{t(`common:footer.contacts`)}</NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
        >
          {t(`common:footer.rights`)}
        </NavLink>
      </li>
    </ul>
  );
};
