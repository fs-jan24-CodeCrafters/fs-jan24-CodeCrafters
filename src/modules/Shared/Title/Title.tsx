import { ReactNode } from 'react';
import styles from './Title.module.scss';
import classNames from 'classnames';

type TitleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface Props {
  titleTag: TitleTags;
  children: ReactNode;
  className?: string;
}

export const Title: React.FC<Props> = ({ titleTag, children, className }) => {
  const Tag = titleTag;
  return (
    <Tag className={classNames(styles[titleTag], className)}>{children}</Tag>
  );
};
