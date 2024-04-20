import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './CapacityRadioButton.module.scss';

interface Props {
  LINK: string;
  capacity: string;
  currentCapacity: string;
}

export const CapacityRadioButton: FC<Props> = ({
  currentCapacity,
  LINK,
  capacity,
}) => {
  const TITLE_SPACE = capacity.slice(0, -2) + ' ' + capacity.slice(-2);

  return (
    <Link to={LINK}>
      <label className={styles.container}>
        <input
          type="radio"
          checked={capacity === currentCapacity}
          name="radio-capacity"
          onChange={() => {}}
        />

        <span className={`${styles.checkmark}`}>{TITLE_SPACE}</span>
      </label>
    </Link>
  );
};
