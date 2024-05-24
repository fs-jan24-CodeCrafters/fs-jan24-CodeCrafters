import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import './libs/languages/config';
import { App } from './App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <FavoritesProvider>
      <Router>
        <App />
      </Router>
    </FavoritesProvider>
  </CartProvider>,
);
