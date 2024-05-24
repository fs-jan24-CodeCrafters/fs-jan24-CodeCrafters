import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './ColorRadioButton.module.scss';

interface Props {
  link: string;
  color: string;
  currentColor: string;
}

export const ColorRadioButton: FC<Props> = ({ link, color, currentColor }) => (
  <Link to={link}>
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
