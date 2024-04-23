import { useEffect } from 'react';

export const useDisableScroll = (condition: boolean) => {
  useEffect(() => {
    const body = document.body;
    if (condition) {
      body.classList.add('lock');
    } else {
      body.classList.remove('lock');
    }
  }, [condition]);
};
