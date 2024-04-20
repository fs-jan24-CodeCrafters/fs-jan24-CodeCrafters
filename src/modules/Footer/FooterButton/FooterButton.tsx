import styles from '../Footer.module.scss';

export const FooterButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.backToTop}>
      <div className={styles.backToTopScrol} onClick={scrollToTop}>
        <span className={styles.backToTopText}>Back to top</span>

        <div className={styles.backToTopImg} />
      </div>
    </div>
  );
};
