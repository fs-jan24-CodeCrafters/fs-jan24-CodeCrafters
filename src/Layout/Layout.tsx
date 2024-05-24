import { Outlet } from 'react-router-dom';

import { Header } from '../modules/Header';
import { Main } from '../modules/Main';
import { Footer } from '../modules/Footer';
import { AuthScreenButton } from '../modules/AuthScreen/AuthScreenButton';

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
        <AuthScreenButton></AuthScreenButton>
      </Main>
      <Footer />
    </>
  );
};
