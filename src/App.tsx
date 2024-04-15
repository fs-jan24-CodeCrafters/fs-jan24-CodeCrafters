import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './modules/HomePage';
import { Phones } from './modules/Catalog/Phones';
import { Tablets } from './modules/Catalog/Tablets';
import { Accessories } from './modules/Catalog/Accessories';
import { ProductDetails } from './modules/ProductDetails';
import { Favorites } from './modules/Favorites';
import { Cart } from './modules/Cart';
import { ErrorPage } from './modules/ErrorPage';

import './App.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/phones/:productId" element={<ProductDetails />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/tablets/:productId" element={<ProductDetails />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/accessories/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favorites/:productId" element={<ProductDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
