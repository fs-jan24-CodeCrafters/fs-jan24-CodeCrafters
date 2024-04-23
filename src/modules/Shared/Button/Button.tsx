import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props {
  children: ReactNode;
  maxWidth?: number | 'auto';
  selected?: boolean;
  variant?: 'primary' | 'favorites';
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  maxWidth = 'auto',
  selected = false,
  variant = 'primary',
  onClick = () => {},
  className,
}) => {
  return (
    <button
      type="button"
      style={{ maxWidth }}
      className={classNames(styles.button, className, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'favorites',
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
