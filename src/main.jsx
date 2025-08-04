import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // or your global styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// ✅ Remove the preloader once React is ready
const preloader = document.getElementById('global-preloader');
if (preloader) {
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.remove();
  }, 400); // Matches transition time
}
