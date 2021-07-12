import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import RiShoppingCart2Line from 'react-icons/ri';

import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={ Main } />
      <Route path="/shopping-cart" component={ ShoppingCart } />
      <div className="App">
        <Link to="/shopping-cart"><RiShoppingCart2Line /></Link>
      </div>
    </BrowserRouter>
  );
}

export default App;
