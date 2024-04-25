import Select, { SingleValue } from 'react-select';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Selects.module.scss';

export interface OptionsEntries {
  value: string | number;
  label: string;
}

interface Props {
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  currentSortBy: string;
  itemsPerPage: number;
}

export const Selects: React.FC<Props> = ({
  setSearchParams,
  currentSortBy,
  itemsPerPage,
}) => {
  const { t } = useTranslation();

  const sortByOptions = [
    { value: 'featured', label: t(`common:catalog.select.featured`) },
    { value: 'year', label: t(`common:catalog.select.newest`) },
    { value: 'name', label: t(`common:catalog.select.alphabetically`) },
    { value: 'price', label: t(`common:catalog.select.cheapest`) },
  ];

  const perPageOptions = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
    { value: 20, label: '20' },
  ];

  const handleOptionChange = (
    newValue: SingleValue<OptionsEntries>,
    paramKey: string,
  ) => {
    if (newValue != null) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set(paramKey, newValue.value.toString());
        if (paramKey === 'perPage') {
          newParams.delete('page');
        }
        return newParams;
      });
    }
  };

  return (
    <div className={styles.selectList}>
      <div className={styles.selectSort}>
        <span className={`${styles.textItem} ${styles.selectTitle}`}>
          {t(`common:catalog.select.title`)}
        </span>
        <Select
          className="selectContainer"
          classNamePrefix="reactSelect"
          isSearchable={false}
          value={sortByOptions.find((el) => el.value === currentSortBy)}
          onChange={(newValue) => handleOptionChange(newValue, 'sort')}
          options={sortByOptions}
        />
      </div>

      <div className={styles.selectPerPage}>
        <span className={`${styles.textItem} ${styles.selectTitle}`}>
          {t(`common:catalog.itemsOnPage`)}
        </span>
        <Select
          className="selectContainer"
          classNamePrefix="reactSelect"
          isSearchable={false}
          value={perPageOptions.find(
            (el) => el.value.toString() === itemsPerPage.toString(),
          )}
          onChange={(newValue) => handleOptionChange(newValue, 'perPage')}
          options={perPageOptions}
        />
      </div>
    </div>
  );
};
