import classNames from 'classnames';

import { scrollToTop } from '../../../helpers/scrollToTop';
import { SearchLink } from '../../Shared/SearchLink';
import { SpriteIcon } from '../../Shared/SpriteIcon';

import styles from './Pagination.module.scss';

const range = (start: number, end: number) => {
  return [...Array(end - start + 1).keys()].map((el) => el + start);
};

interface PagesCutParams {
  pagesCount: number;
  pagesCutCount: number;
  currentPageVal: number;
}

interface Props {
  currentPage: number;
  totalPageNum: number;
}

export const Pagination: React.FC<Props> = ({ currentPage, totalPageNum }) => {
  const getPagesCut = ({
    pagesCount,
    pagesCutCount,
    currentPageVal,
  }: PagesCutParams) => {
    const ceiling = Math.ceil(pagesCutCount / 2);
    const floor = Math.floor(pagesCutCount / 2);

    if (pagesCount <= pagesCutCount) {
      return { start: 1, end: pagesCount };
    } else if (currentPageVal <= ceiling) {
      return { start: 1, end: pagesCutCount };
    } else if (currentPageVal + floor >= pagesCount) {
      return { start: pagesCount - pagesCutCount + 1, end: pagesCount };
    } else {
      return {
        start: currentPageVal - ceiling + 1,
        end: currentPageVal + floor,
      };
    }
  };

  const pagesCut = getPagesCut({
    pagesCount: totalPageNum,
    pagesCutCount: 5,
    currentPageVal: currentPage,
  });

  const pages = range(pagesCut.start, pagesCut.end);

  return (
    <>
      {pages.length > 1 && (
        <div className={styles.linkList}>
          <SearchLink
            onClick={scrollToTop}
            className={classNames(styles.link, styles.linkPrev, {
              [styles.linkDisabled]: currentPage === 1,
            })}
            params={{
              page:
                currentPage !== 1
                  ? (currentPage - 1).toString()
                  : currentPage.toString(),
            }}
          >
            <SpriteIcon iconName="icon-Chevron-Arrow-Left" />
          </SearchLink>
          {pages.map((page) => (
            <SearchLink
              onClick={scrollToTop}
              key={page}
              params={{ page: page.toString() }}
              className={classNames(styles.link, {
                [styles.linkActive]: page === currentPage,
              })}
            >
              {page}
            </SearchLink>
          ))}
          <SearchLink
            onClick={scrollToTop}
            className={classNames(styles.link, styles.linkNext, {
              [styles.linkDisabled]: currentPage === totalPageNum,
            })}
            params={{
              page:
                currentPage !== totalPageNum
                  ? (currentPage + 1).toString()
                  : currentPage.toString(),
            }}
          >
            <SpriteIcon iconName="icon-Chevron-Arrow-Right" />
          </SearchLink>
        </div>
      )}
    </>
  );
};
