import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { MainContextProvider } from './MainContext/MainContext';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainContextProvider>
      <Router>
        <App />
      </Router>
    </MainContextProvider>
  </React.StrictMode>,
);
