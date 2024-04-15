import { NavLink } from 'react-router-dom';

import styles from './HeaderNav.module.scss';
import classNames from 'classnames';

enum Pages {
  Home = '',
  Phones = '/phones',
  Tablets = '/tablets',
  Accessories = '/accessories',
}

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderNav: React.FC<Props> = ({ setIsMenuOpen }) => {
  const setIsActive = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.link, {
      [styles.linkActive]: isActive,
    });

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {Object.entries(Pages).map(([key, path]) => (
          <li className={styles.item} key={key}>
            <NavLink
              to={path}
              className={setIsActive}
              onClick={() => setIsMenuOpen(false)}
            >
              {key}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
