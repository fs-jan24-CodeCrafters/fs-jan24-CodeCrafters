import { Link } from 'react-router-dom';
import { HeaderNav } from './HeaderNav';

import { ShoppingTools } from './ShoppingTools';
import { BurgerButton } from './BurgerButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { MobileMenu } from './MobileMenu';
import { useState } from 'react';

import styles from './Header.module.scss';

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

        {!matches && (
          <>
            <HeaderNav setIsMenuOpen={setIsMenuOpen} />
            <ShoppingTools setIsMenuOpen={setIsMenuOpen} />
          </>
        )}
      </div>
      {matches && (
        <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </header>
  );
};
