import { Outlet } from 'react-router';
import { Header } from '../modules/Header';
import { Main } from '../modules/Main';
import { Footer } from '../modules/Footer';

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
