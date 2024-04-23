import { NavLink } from 'react-router-dom';
import { Container } from '../Container';
import styles from './Breadcrumbs.module.scss';
import { SpriteIcon } from '../SpriteIcon';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const Breadcrumbs: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.breadcrumbs}>
      <Container>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink to={'/'} className={styles.link}>
              <SpriteIcon className={styles.icon} iconName={'icon-Home'} />
            </NavLink>
          </li>
          {children}
        </ul>
      </Container>
    </div>
  );
};
