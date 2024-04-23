import { ReactNode } from 'react';
import classNames from 'classnames';
import { useIntersectionObserver } from 'usehooks-ts';

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
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
    freezeOnceVisible: true,
  });

  const Tag = titleTag;
  return (
    <Tag
      ref={ref}
      className={classNames(styles[titleTag], className, {
        [styles.sectionTitle]: sectionTitle,
        'animate__animated animate__fadeInDown':
          isIntersecting && (titleTag === 'h1' || titleTag === 'h2'),
      })}
    >
      {children}
    </Tag>
  );
};
