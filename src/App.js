import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import './App.css';
import Main from './components/Main';
import Checkout from './components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Main } />
      <Route path="/shopping-cart" component={ ShoppingCart } />
      <Route path="/checkout" component={ Checkout } />
    </BrowserRouter>
  );
}

export default App;
