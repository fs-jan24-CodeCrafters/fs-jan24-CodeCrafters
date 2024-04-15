import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Main: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};
