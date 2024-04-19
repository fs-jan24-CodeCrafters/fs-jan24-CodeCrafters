import styles from '../Footer.module.scss';

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
      className={[styles.link_back_to_top, styles.link].join(' ')}
    >
      Back to top
    </button>
  );
};