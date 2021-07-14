import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import './App.css';
import Main from './components/Main';
import Checkout from './components/Checkout';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };
    this.addItemCart = this.addItemCart.bind(this);
  }

  addItemCart(item) {
    this.setState((prevState) => ({ cartList: [...prevState.cartList, item] }));
  }

  render() {
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => <Main { ...props } addItemCart={ this.addItemCart } /> }
        />
        <Route
          path="/shopping-cart"
          render={ (props) => <ShoppingCart { ...props } cartList={ cartList } /> }
        />
        <Route
          path="/checkout"
          render={ (props) => <Checkout { ...props } cartList={ cartList } /> }
        />
      </BrowserRouter>
    );
  }
}

export default App;
