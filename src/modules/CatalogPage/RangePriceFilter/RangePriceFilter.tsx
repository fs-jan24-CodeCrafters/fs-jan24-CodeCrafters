import RangeSlider from 'react-range-slider-input';
import debounce from 'lodash.debounce';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../../Shared/Loader';

import 'react-range-slider-input/dist/style.css';
import styles from './RangePriceFilter.module.scss';

interface RangePriceFilterProps {
  value: [number, number];
  disabled: boolean;
  searchParams: URLSearchParams;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
}

export const RangePriceFilter: React.FC<RangePriceFilterProps> = ({
  value,
  disabled,
  searchParams,
  setSearchParams,
}) => {
  const [minPrice, maxPrice] = value;

  const [inputValue, setInputValue] = useState<[number, number]>(value);

  const debouncedUpdateSearchParams = useMemo(
    () =>
      debounce((newValue) => {
        setSearchParams((prevParams) => {
          const newParams = new URLSearchParams(prevParams);
          newParams.set('range', newValue.toString());
          return newParams;
        });
      }, 300),
    [setSearchParams],
  );

  const handleSetInputValue = (newValue: [number, number]) => {
    setInputValue(newValue);

    debouncedUpdateSearchParams(newValue);
  };

  const handleFromInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newFromVal = Math.min(Number(newValue), maxPrice);
    setInputValue([newFromVal, inputValue[1]]);
    debouncedUpdateSearchParams([newFromVal, maxPrice]);
  };

  const handleToInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newToVal = Math.min(Number(newValue), maxPrice);
    setInputValue([inputValue[0], newToVal]);
    debouncedUpdateSearchParams([minPrice, newToVal]);
  };

  useEffect(() => {
    const range = searchParams.get('range');
    if (range) {
      const [min, max] = range.split(',').map(Number);
      setInputValue([min, max]);
    } else {
      setInputValue([minPrice, maxPrice]);
    }
  }, [searchParams, minPrice, maxPrice]);

  return (
    <div className={styles.rangePriceFilter}>
      {disabled ? (
        <span className={styles.priceRangeLoader}>
          <Loader />
        </span>
      ) : (
        <div className={styles.inputs}>
          <label className={styles.label}>
            $
            <input
              value={inputValue[0]}
              onChange={handleFromInput}
              className={styles.input}
              type="number"
            />
          </label>
          <span>-</span>
          <label className={styles.label}>
            $
            <input
              value={inputValue[1]}
              onChange={handleToInput}
              className={styles.input}
              type="number"
            />
          </label>
        </div>
      )}
      <RangeSlider
        min={minPrice}
        max={maxPrice}
        defaultValue={value}
        value={inputValue}
        onInput={handleSetInputValue}
        disabled={disabled}
        thumbsDisabled={disabled}
        rangeSlideDisabled={disabled}
      />
    </div>
  );
};
