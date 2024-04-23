import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { App } from './App';
import './index.scss';
import { FavoritesProvider } from './context/FavoritesContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <App />
        </Router>
      </FavoritesProvider>
    </CartProvider>
  </React.StrictMode>,
);
