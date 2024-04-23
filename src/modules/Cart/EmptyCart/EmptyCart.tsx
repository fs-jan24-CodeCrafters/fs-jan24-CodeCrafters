import { Title } from '../../Shared/Title';

import styles from './EmptyCart.module.scss';

export const EmptyCart: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.titleBox}>
        <Title titleTag="h2">Your basket is lonely</Title>
        <Title titleTag="h4">Add some items to cheer it up</Title>
      </div>
      <div className={styles.image}>
        <svg className={styles.icon}>
          <use href={`/icons/symbol-defs.svg#icon-man-with-cart`} />
        </svg>
      </div>
      <span className={styles.line}></span>
    </div>
  );
};
