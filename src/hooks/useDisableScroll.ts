import { useEffect } from 'react';
import { getScrollbarWidth } from '../helpers/getScrollbarWidth';

export const useDisableScroll = (condition: boolean) => {
  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();
    const body = document.body;
    document.body.style.paddingRight = scrollbarWidth + 'px';
    if (condition) {
      body.classList.add('lock');
    } else {
      body.classList.remove('lock');
      document.body.style.paddingRight = '0px';
    }
  }, [condition]);
};
