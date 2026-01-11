import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Remove strict mode to prevent double mounting
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);