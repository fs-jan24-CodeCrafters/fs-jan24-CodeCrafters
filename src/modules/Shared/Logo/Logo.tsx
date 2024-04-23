import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { SpriteIcon } from '../SpriteIcon';

import styles from './Logo.module.scss';

interface Props {
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<Props> = ({ onClick = () => {}, className }) => {
  return (
    <Link
      onClick={onClick}
      className={classNames(styles.logo, className)}
      to="/"
    >
      <SpriteIcon className={styles.logoIconSvg} iconName="icon-Nice-Gadgets" />
    </Link>
  );
};
