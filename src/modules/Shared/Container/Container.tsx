import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Container.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};
