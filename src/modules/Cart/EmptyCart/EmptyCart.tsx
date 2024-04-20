import { Title } from '../../Shared/Title';

import styles from './EmptyCart.module.scss';

export const EmptyCart: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.titleBox}>
        <Title titleTag="h4">Your basket is lonely</Title>
        <Title titleTag="h5">Add some items to cheer it up</Title>
      </div>
      <div className={styles.image}>
        <img src="/img/cart/1.png" alt="Man with cart" />
      </div>
      <span className={styles.line}></span>
    </div>
  );
};
