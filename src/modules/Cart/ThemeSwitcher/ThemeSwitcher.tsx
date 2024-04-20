import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher: React.FC = () => {
  const switchHandler = () => {
    document.body.classList.toggle('dark-theme');
  };

  return (
    <div className={styles.switchBody}>
      <label className={styles.switch}>
        <input onClick={switchHandler} type="checkbox" />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};
