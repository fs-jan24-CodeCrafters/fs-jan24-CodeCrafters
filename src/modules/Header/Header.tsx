import { Link } from 'react-router-dom';
import { HeaderNav } from './HeaderNav';

import { ShoppingTools } from './ShoppingTools';
import { BurgerButton } from './BurgerButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useState } from 'react';

import styles from './Header.module.scss';
import classNames from 'classnames';

const mobileBreakPoint = '768px';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const matches = useMediaQuery(`(max-width: ${mobileBreakPoint})`);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link
          to="/"
          className={styles.logo}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/icons/Logo.svg" alt="Nice Gadgets Logo" />
        </Link>

        {matches && (
          <BurgerButton setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        )}

        <div
          className={classNames(styles.menu, { [styles.menuOpen]: isMenuOpen })}
        >
          <HeaderNav setIsMenuOpen={setIsMenuOpen} />
          <ShoppingTools setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </header>
  );
};
