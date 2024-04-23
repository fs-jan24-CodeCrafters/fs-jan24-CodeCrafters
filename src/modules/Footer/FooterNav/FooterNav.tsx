import { NavLink } from 'react-router-dom';
import styles from '../Footer.module.scss';

export const FooterNav: React.FC = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <NavLink
          className={styles.navLink}
          to="https://github.com/fs-jan24-CodeCrafters/fs-jan24-CodeCrafters"
        >
          github
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to="/contacts">contacts</NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
        >
          rights
        </NavLink>
      </li>
    </ul>
  );
};
