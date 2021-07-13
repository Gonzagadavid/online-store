import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import './App.css';
import Main from './components/Main';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Main } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
        <Route path="/productdetails/:id" component={ ProductDetails } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
