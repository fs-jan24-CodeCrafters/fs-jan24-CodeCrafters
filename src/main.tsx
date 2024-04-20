import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { MainContextProvider } from './MainContext/MainContext';
import './index.scss';
import { FavoritesProvider } from './MainContext/FavouritesContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainContextProvider>
      <FavoritesProvider>
        <Router>
          <App />
        </Router>
      </FavoritesProvider>
    </MainContextProvider>
  </React.StrictMode>,
);
