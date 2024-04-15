import classNames from 'classnames';
import styles from './BurgerButton.module.scss';

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BurgerButton: React.FC<Props> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <button
      onClick={() => setIsMenuOpen((open: boolean) => !open)}
      type="button"
      className={styles.burger}
    >
      <span className="visually-hidden">Бургер кнопка</span>
      <span
        className={classNames(styles.burgerLine, {
          [styles.menuOpen]: isMenuOpen,
        })}
      ></span>
    </button>
  );
};
