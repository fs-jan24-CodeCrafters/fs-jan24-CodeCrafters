import { ReactNode } from 'react';

import styles from './Container.module.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};
