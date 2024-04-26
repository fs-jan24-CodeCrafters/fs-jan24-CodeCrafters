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
  minPrice: number;
  maxPrice: number;
  searchParams: URLSearchParams;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
}

export const RangePriceFilter: React.FC<RangePriceFilterProps> = ({
  value,
  disabled,
  minPrice,
  maxPrice,
  searchParams,
  setSearchParams,
}) => {
  const [inputValue, setInputValue] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

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
    const newFromVal = Math.min(Number(event.target.value), maxPrice);
    setInputValue([newFromVal, inputValue[1]]);
    debouncedUpdateSearchParams([newFromVal, value[1]]);
  };

  const handleToInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newToVal = Math.min(Number(event.target.value), maxPrice);
    setInputValue([inputValue[0], newToVal]);
    debouncedUpdateSearchParams([value[0], newToVal]);
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
              onChange={handleFromInput}
              className={styles.input}
              value={inputValue[0]}
              type="text"
            />
          </label>
          <span>-</span>
          <label className={styles.label}>
            $
            <input
              onChange={handleToInput}
              className={styles.input}
              value={inputValue[1]}
              type="text"
            />
          </label>
        </div>
      )}
      <RangeSlider
        min={minPrice}
        max={maxPrice}
        defaultValue={[minPrice, maxPrice]}
        value={inputValue}
        onInput={handleSetInputValue}
        disabled={disabled}
        thumbsDisabled={disabled}
        rangeSlideDisabled={disabled}
      />
    </div>
  );
};
