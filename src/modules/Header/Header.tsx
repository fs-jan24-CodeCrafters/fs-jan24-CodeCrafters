import { useState } from 'react';
import classNames from 'classnames';

import { HeaderNav } from './HeaderNav';
import { ShoppingTools } from './ShoppingTools';
import { BurgerButton } from './BurgerButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Search } from './Search';

import styles from './Header.module.scss';
import { useDisableScroll } from '../../hooks/useDisableScroll';
import { Logo } from '../Shared/Logo/Logo';
import { ThemeSwitcher } from '../Cart/ThemeSwitcher';

const mobileBreakPoint = '768px';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const matches = useMediaQuery(`(max-width: ${mobileBreakPoint})`);

  useDisableScroll(isMenuOpen);

  return (
    <header className={styles.header}>
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
