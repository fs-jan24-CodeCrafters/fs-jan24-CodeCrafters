import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { Logo } from '../Shared/Logo/Logo';
import { HeaderNav } from './HeaderNav';
import { ShoppingTools } from './ShoppingTools';
import { BurgerButton } from './BurgerButton';
import { Search } from './Search';
import { scrollToTop } from '../../helpers/scrollToTop';
import { ThemeSwitcher } from '../ThemeSwitcher';

import classNames from 'classnames';
import styles from './Header.module.scss';

const tabletBreakPoint = '992px';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const matches = useMediaQuery(`(max-width: ${tabletBreakPoint})`);

  useDisableScroll(
    isMenuOpen && document.documentElement.scrollHeight > window.innerHeight,
  );

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (pathname === '/') {
      scrollToTop();
    }
  };

  return (
    <header className={styles.header}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className={styles.wrapper}>
        <Logo className={styles.logo} onClick={handleLogoClick} />

        {matches && (
          <>
            <ThemeSwitcher />
            <Search />
            <BurgerButton
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
            />
          </>
        )}

        <div
          className={classNames(styles.menu, { [styles.menuOpen]: isMenuOpen })}
        >
          <HeaderNav setIsMenuOpen={setIsMenuOpen} />
          {!matches && (
            <>
              <ThemeSwitcher />
              <Search />
            </>
          )}
          <ShoppingTools setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </header>
  );
};
