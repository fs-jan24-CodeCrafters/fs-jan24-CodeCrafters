import styles from '../Footer.module.scss';

export const FooterButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles['backToTop']}>
      <div className={styles['backToTop__scroll']} onClick={scrollToTop}>
        <span className={styles['backToTop__text']}>Back to top</span>

        <div className={styles['backToTop__img']} />
      </div>
    </div>
  );
};
