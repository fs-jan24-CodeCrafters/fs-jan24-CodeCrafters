import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './ColorRadioButton.module.scss';

interface Props {
  LINK: string;
  color: string;
  currentColor: string;
}

export const ColorRadioButton: FC<Props> = ({ LINK, color, currentColor }) => (
  <Link to={LINK}>
    <label className={styles.container}>
      <input
        type="radio"
        checked={color === currentColor}
        name="radio-color"
        onChange={() => {}}
      />

      <span
        className={`${styles.checkmark} ${styles[`checkmark--${color}`]}`}
      ></span>
    </label>
  </Link>
);
