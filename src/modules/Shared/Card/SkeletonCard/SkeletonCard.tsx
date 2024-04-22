import styles from './SkeletonCard.module.scss';

export const SkeletonCard: React.FC = () => {
  return (
    <article className={styles.card}>
      <div className={[styles.image, styles.skeleton].join(' ')}></div>
      <div className={styles.cardBody}>
        <div className={[styles.skeletonText, styles.skeleton].join(' ')}></div>
        <div className={styles.priceContainer}>
          <div
            className={[styles.skeletonText, styles.skeleton].join(' ')}
          ></div>
        </div>
        <div className={styles.detailsContainer}>
          <div
            className={[styles.skeletonText, styles.skeleton].join(' ')}
          ></div>
          <div
            className={[styles.skeletonText, styles.skeleton].join(' ')}
          ></div>
          <div
            className={[styles.skeletonText, styles.skeleton].join(' ')}
          ></div>
        </div>
        <div className={styles.buttonsContainer}>
          <div
            className={[styles.skeletonButton, styles.skeleton].join(' ')}
          ></div>
        </div>
      </div>
    </article>
  );
};
