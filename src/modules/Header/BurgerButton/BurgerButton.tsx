import classNames from 'classnames';

import styles from './BurgerButton.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BurgerButton: React.FC<Props> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => setIsMenuOpen((open: boolean) => !open)}
      type="button"
      className={styles.burger}
    >
      <span className="visually-hidden">{t(`common:header.burgerButton`)}</span>
      <span
        className={classNames(styles.burgerLine, {
          [styles.menuOpen]: isMenuOpen,
        })}
      ></span>
    </button>
  );
};
