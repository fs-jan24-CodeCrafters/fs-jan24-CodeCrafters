import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import classNames from 'classnames';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { Logo } from '../Shared/Logo/Logo';
import { ThemeSwitcher } from '../Cart/ThemeSwitcher';
import { HeaderNav } from './HeaderNav';
import { ShoppingTools } from './ShoppingTools';
import { BurgerButton } from './BurgerButton';
import { Search } from './Search';

import styles from './Header.module.scss';

const tabletBreakPoint = '992px';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const matches = useMediaQuery(`(max-width: ${tabletBreakPoint})`);

  useDisableScroll(isMenuOpen);

  return (
    <header className={styles.header}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className={styles.wrapper}>
        <Logo className={styles.logo} onClick={() => setIsMenuOpen(false)} />

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
