import { NavLink } from 'react-router-dom';
import { SpriteIcon } from '../../Shared/SpriteIcon';
import { ShoppingCounter } from '../ShoppingCounter';

import styles from './ShoppingTools.module.scss';
import classNames from 'classnames';
import { useFavorites } from '../../../context/FavoritesContext';
import { useCart } from '../../../context/CartContext';

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShoppingTools: React.FC<Props> = ({ setIsMenuOpen }) => {
  const { countFavorites } = useFavorites();
  const { totalCartQuantity } = useCart();

  const getLinkClassNames = ({
    isActive,
    isFavorite = false,
  }: {
    isActive: boolean;
    isFavorite?: boolean;
  }) =>
    classNames(styles.link, {
      [styles.linkActive]: isActive,
      [styles.linkFavorite]: isFavorite,
    });

  return (
    <div className={styles.wrapper}>
      <NavLink
        onClick={() => setIsMenuOpen(false)}
        to="/favorites"
        className={(props) => getLinkClassNames({ ...props, isFavorite: true })}
      >
        <div className={styles.iconWrapper}>
          <SpriteIcon iconName="icon-Favorites" className={styles.icon} />
          {countFavorites > 0 && (
            <ShoppingCounter
              productsAmount={countFavorites}
              className={styles.shoppingCounter}
            />
          )}
        </div>
      </NavLink>

      <NavLink
        to="/cart"
        className={getLinkClassNames}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className={styles.iconWrapper}>
          <SpriteIcon iconName="icon-Shopping-bag" className={styles.icon} />
          {!!totalCartQuantity && (
            <ShoppingCounter
              className={styles.shoppingCounter}
              productsAmount={totalCartQuantity}
            />
          )}
        </div>
      </NavLink>
    </div>
  );
};
