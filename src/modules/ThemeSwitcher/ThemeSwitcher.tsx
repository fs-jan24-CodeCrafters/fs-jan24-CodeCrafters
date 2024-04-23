import { useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './ThemeSwitcher.module.scss';

const localStorageKey = 'theme-switcher';

export const ThemeSwitcher: React.FC = () => {
  const [checked, setChecked] = useLocalStorage<boolean>(
    localStorageKey,
    false,
  );

  useEffect(() => {
    setChecked(checked);

    const body = document.body;
    if (checked) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }, [checked, setChecked]);

  const switchHandler = () => {
    document.body.classList.toggle('dark-theme');
  };
  return (
    <div className={styles.switchBody}>
      <label className={styles.switch}>
        <input
          checked={checked}
          onChange={() => setChecked(!checked)}
          onClick={switchHandler}
          type="checkbox"
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};
