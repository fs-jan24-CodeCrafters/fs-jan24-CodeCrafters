import { ReactNode } from 'react';
import styles from './Title.module.scss';

type TitleTags = 'h1' | 'h2' | 'h3' | 'h4';

interface Props {
  titleTag: TitleTags;
  children: ReactNode;
}

export const Title: React.FC<Props> = ({ titleTag, children }) => {
  const Tag = titleTag;

  return <Tag className={`${styles[titleTag]}`}>{children}</Tag>;
};
