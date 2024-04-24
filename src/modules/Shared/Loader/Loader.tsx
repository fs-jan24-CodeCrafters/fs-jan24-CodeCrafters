import classNames from 'classnames';
import styles from './Loader.module.scss';

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => (
  <div className={classNames(styles.loader, className)}>
    <div className={styles.content} />
  </div>
);
