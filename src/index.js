import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"


import { UseContextProvider } from './Component/Context/useContext';
import { CartContextProvider } from './Component/Context/cartContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <CartContextProvider>
<UseContextProvider> 
    <App />
</UseContextProvider>
  </CartContextProvider>

   
  
);
