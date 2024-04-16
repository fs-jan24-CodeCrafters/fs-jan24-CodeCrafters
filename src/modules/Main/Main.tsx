import { ReactNode } from 'react';
import styles from './Main.module.scss';

interface Props {
  children: ReactNode;
}

export const Main: React.FC<Props> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};
