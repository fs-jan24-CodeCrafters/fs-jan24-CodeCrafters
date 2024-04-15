import classNames from 'classnames';
import styles from './ShoppingCounter.module.scss';

interface Props {
  productsAmount: number;
  className?: string;
}

export const ShoppingCounter: React.FC<Props> = ({
  productsAmount,
  className,
}) => {
  return (
    <span className={classNames(styles.counter, className)}>
      {productsAmount}
    </span>
  );
};
