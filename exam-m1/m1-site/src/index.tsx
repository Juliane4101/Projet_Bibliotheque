import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/App.css';
import App from './app/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
