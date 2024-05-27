import { useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProductDetails } from './modules/ProductDetails';
import { Favorites } from './modules/Favorites';
import { Cart } from './modules/Cart';
import { ErrorPage } from './modules/ErrorPage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { HomePage } from './modules/HomePage';
import { ContactsPage } from './modules/ContactsPage';
import { AuthScreen } from './modules/AuthScreen';
import { Layout } from './Layout';

import 'animate.css';
import './App.scss';

export const App = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<CatalogPage />} />
          <Route path="/phones/:productId" element={<ProductDetails />} />
          <Route path="/tablets" element={<CatalogPage />} />
          <Route path="/tablets/:productId" element={<ProductDetails />} />
          <Route path="/accessories" element={<CatalogPage />} />
          <Route path="/accessories/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/favorites/:productId" element={<ProductDetails />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/auth-screen" element={<AuthScreen />} />
          <Route path="/not-found" element={<ErrorPage />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};
