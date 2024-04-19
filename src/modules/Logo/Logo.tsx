import { Link } from 'react-router-dom';
import logo from './Logo.svg';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <Link className={styles.logo} to="/">
      <img src={logo} className={styles.logo__image} alt="NiceGadgets" />
    </Link>
  );
};