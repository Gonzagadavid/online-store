import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Main } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
