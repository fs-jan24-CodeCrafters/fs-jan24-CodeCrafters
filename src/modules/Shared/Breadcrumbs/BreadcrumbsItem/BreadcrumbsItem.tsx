import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../Breadcrumbs.module.scss';

type TagType = 'Link' | 'span';

interface Props {
  children: ReactNode;
  tagType: TagType;
  path?: string;
}

export const BreadcrumbsItem: React.FC<Props> = ({
  children,
  tagType,
  path,
}) => {
  if (tagType === 'Link' && path) {
    return (
      <li className={styles.item}>
        <NavLink to={path} className={styles.link}>
          {children}
        </NavLink>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <span className={styles.span}>{children}</span>
    </li>
  );
};
