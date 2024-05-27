import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { SessionProvider } from './context/SessionContext';
import { App } from './App';
import './libs/languages/config';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SessionProvider>
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <App />
        </Router>
      </FavoritesProvider>
    </CartProvider>
  </SessionProvider>,
);
