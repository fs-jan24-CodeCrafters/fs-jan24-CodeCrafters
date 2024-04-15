import { ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  maxWidth?: number;
  selected?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  maxWidth = 160,
  selected = false,
}) => {
  return (
    <button
      type="button"
      style={{ maxWidth }}
      className={classNames(styles.button, { [styles.selected]: selected })}
    >
      {children}
    </button>
  );
};
