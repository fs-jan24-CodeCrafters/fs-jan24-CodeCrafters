import styles from './FooterButton.module.scss';

export const FooterButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={[styles.linkBackToTop, styles.link].join(' ')}
    >
      Back to top
    </button>
  );
};
