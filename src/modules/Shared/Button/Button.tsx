import { ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  maxWidth?: number | 'auto';
  selected?: boolean;
  variant?: 'primary' | 'favorites';
}

export const Button: React.FC<Props> = ({
  children,
  maxWidth = 'auto',
  selected = false,
  variant = 'primary',
}) => {
  return (
    <button
      type="button"
      style={{ maxWidth }}
      className={classNames(styles.button, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'favorites',
        [styles.selected]: selected,
      })}
    >
      {children}
    </button>
  );
};
