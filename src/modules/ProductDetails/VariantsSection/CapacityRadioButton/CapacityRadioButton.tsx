import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './CapacityRadioButton.module.scss';

interface Props {
  link: string;
  capacity: string;
  currentCapacity: string;
}

export const CapacityRadioButton: FC<Props> = ({
  link,
  capacity,
  currentCapacity,
}) => {
  const capacityTitle = capacity.slice(0, -2) + ' ' + capacity.slice(-2);

  return (
    <Link to={link}>
      <label className={styles.container}>
        <input
          type="radio"
          checked={capacity === currentCapacity}
          name="radio-capacity"
          onChange={() => {}}
        />

        <span className={`${styles.checkmark}`}>{capacityTitle}</span>
      </label>
    </Link>
  );
};
