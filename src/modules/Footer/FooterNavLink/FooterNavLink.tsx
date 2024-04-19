import { NavLink } from 'react-router-dom';
import styles from '../Footer.module.scss';

type Props = {
  to: string;
  text: string;
};

export const FooterNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink to={to} className={styles.link} target="_blank">
    {text}
  </NavLink>
);
