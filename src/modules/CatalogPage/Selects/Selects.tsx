import { useSearchParams } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import styles from './Selects.module.scss';

export interface OptionsEntries {
  value: string | number;
  label: string;
}

interface Props {
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  currentSortBy: string;
  currentPerPageOptions: string | number;
}

const sortByOptions = [
  { value: 'year', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const perPageOptions = [
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 'all', label: 'all' },
];

export const Selects: React.FC<Props> = ({
  setSearchParams,
  currentSortBy,
  currentPerPageOptions,
}) => {
  const handleOptionChange = (
    newValue: SingleValue<OptionsEntries>,
    paramKey: string,
  ) => {
    if (newValue != null) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set(paramKey, newValue.label);
        return newParams;
      });
    }
  };

  return (
    <div className={styles.selectList}>
      <div className={styles.selectSort}>
        <span className={`${styles.textItem} ${styles.selectTitle}`}>
          Sort by
        </span>
        <Select
          isSearchable={false}
          value={sortByOptions.find((el) => el.label === currentSortBy)}
          onChange={(newValue) => handleOptionChange(newValue, 'sort')}
          options={sortByOptions}
        />
      </div>

      <div className={styles.selectPerPage}>
        <span className={`${styles.textItem} ${styles.selectTitle}`}>
          Items on page
        </span>
        <Select
          isSearchable={false}
          value={perPageOptions.find(
            (el) => el.value.toString() === currentPerPageOptions.toString(),
          )}
          onChange={(newValue) => handleOptionChange(newValue, 'perPage')}
          options={perPageOptions}
        />
      </div>
    </div>
  );
};