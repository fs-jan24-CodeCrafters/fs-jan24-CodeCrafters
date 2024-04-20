import { Link } from 'react-router-dom';
import logo from './Logo.svg';
import styles from './Logo.module.scss';
import classNames from 'classnames';

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
      <img src={logo} alt="NiceGadgets" />
    </Link>
  );
};
