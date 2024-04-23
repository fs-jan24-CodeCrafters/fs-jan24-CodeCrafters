import Select, { SingleValue } from 'react-select';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../../types/Product';

import styles from './Selects.module.scss';

export interface OptionsEntries {
  value: string | number;
  label: string;
}

interface Props {
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  currentSortBy: string;
  itemsPerPage: number;
  products: Product[];
}

const sortByOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'year', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const Selects: React.FC<Props> = ({
  setSearchParams,
  currentSortBy,
  itemsPerPage,
  products,
}) => {
  const perPageOptions = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
    { value: products.length, label: 'All' },
  ];

  const handleOptionChange = (
    newValue: SingleValue<OptionsEntries>,
    paramKey: string,
  ) => {
    if (newValue != null) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set(paramKey, newValue.label);
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
          Sort by
        </span>
        <Select
          className="selectContainer"
          classNamePrefix="reactSelect"
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
