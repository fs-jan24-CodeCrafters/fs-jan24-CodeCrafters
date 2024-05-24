import { useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ProductDetail } from './modules/ProductDetail';
import { Favorites } from './modules/Favorites';
import { Cart } from './modules/Cart';
import { ErrorPage } from './modules/ErrorPage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { HomePage } from './modules/HomePage';
import { Layout } from './Layout';

import 'animate.css';
import './App.scss';
import { ContactsPage } from './modules/ContactsPage';

export const App = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<CatalogPage />} />
        <Route path="/phones/:productId" element={<ProductDetail />} />
        <Route path="/tablets" element={<CatalogPage />} />
        <Route path="/tablets/:productId" element={<ProductDetail />} />
        <Route path="/accessories" element={<CatalogPage />} />
        <Route path="/accessories/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favorites/:productId" element={<ProductDetail />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/not-found" element={<ErrorPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Route>
    </Routes>
  );
};
