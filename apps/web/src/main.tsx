import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './App';
import './shared/styles/global.css';
import './shared/styles/reset.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró el elemento root en el DOM.');
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
