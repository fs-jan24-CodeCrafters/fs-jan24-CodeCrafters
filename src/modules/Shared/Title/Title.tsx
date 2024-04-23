import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Title.module.scss';

type TitleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface Props {
  titleTag: TitleTags;
  children: ReactNode;
  className?: string;
  sectionTitle?: boolean;
}

export const Title: React.FC<Props> = ({
  titleTag,
  children,
  className,
  sectionTitle,
}) => {
  const Tag = titleTag;
  return (
    <Tag
      className={classNames(styles[titleTag], className, {
        [styles.sectionTitle]: sectionTitle,
      })}
    >
      {children}
    </Tag>
  );
};
