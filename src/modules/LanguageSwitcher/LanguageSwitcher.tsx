import { useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import useLocalStorage from '../../hooks/useLocalStorage';

import styles from './LanguageSwitcher.module.scss';

const localStorageKey = 'language';
const DEFAULT_LANGUAGE = 'ua';

export const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [UILanguage, setUILanguage] = useLocalStorage(
    localStorageKey,
    DEFAULT_LANGUAGE,
  );

  const changeLanguage = (language: string) => {
    setUILanguage(language);
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    changeLanguage(UILanguage);
  }, []);

  const languages = [
    {
      label: t('common:languages.ua'),
      value: 'ua',
      name: 'language',
    },
    {
      label: t('common:languages.en'),
      value: 'en',
      name: 'language',
    },
  ];

  return (
    <div className={styles.languageSwitcher}>
      {languages.map(({ value, name }) => (
        <div key={value} className={styles.languageSwitcherItem}>
          <label
            htmlFor={value}
            className={classNames(styles.languageSwitcherLabel, {
              [styles.languageSwitcherInputActive]: UILanguage === value,
            })}
          >
            {value}
          </label>
          <input
            className={styles.languageSwitcherInput}
            type="radio"
            value={value}
            checked={UILanguage === value}
            name={name}
            id={value}
            onChange={(event) => {
              changeLanguage(event.target.value);
            }}
          />
        </div>
      ))}
    </div>
  );
};
