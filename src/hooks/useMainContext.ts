import { useContext } from 'react';
import { MainContext } from '../MainContext/MainContext';

export const useMainContext = () => {
  const context = useContext(MainContext);

  if (context === undefined) {
    throw new Error('Error');
  }

  return context;
};
