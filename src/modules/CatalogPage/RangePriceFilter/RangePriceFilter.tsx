import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../../Shared/Loader';

import styles from './RangePriceFilter.module.scss';

interface RangePriceFilterProps {
  value: [number, number];
  disabled: boolean;
  minPrice: number;
  maxPrice: number;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
}

export const RangePriceFilter: React.FC<RangePriceFilterProps> = ({
  value,
  disabled,
  minPrice,
  maxPrice,
  setSearchParams,
}) => {
  const handleRanges = (newValue: [number, number]) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('range', newValue.toString());
      return newParams;
    });
  };

  return (
    <div className={styles.rangePriceFilter}>
      {disabled ? (
        <span className={styles.priceRangeLoader}>
          <Loader />
        </span>
      ) : (
        <span>
          ${value[0]} - ${value[1]}
        </span>
      )}
      <RangeSlider
        min={minPrice}
        max={maxPrice}
        defaultValue={[minPrice, maxPrice]}
        value={value}
        onInput={handleRanges}
        disabled={disabled}
        thumbsDisabled={disabled}
        rangeSlideDisabled={disabled}
      />
    </div>
  );
};
