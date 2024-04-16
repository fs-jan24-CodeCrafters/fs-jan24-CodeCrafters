import { ReactNode } from 'react';
import styles from './Title.module.scss';

type TitleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface Props {
  titleTag: TitleTags;
  children: ReactNode;
  className?: string;
}

export const Title: React.FC<Props> = ({ titleTag, children, className }) => {
  const Tag = titleTag;
  const finalClassName = className || '';
  return <Tag className={`${finalClassName} ${styles[titleTag]}`}>{children}</Tag>;
};
