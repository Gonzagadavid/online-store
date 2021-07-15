import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import './App.css';
import Main from './components/Main/Main';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
      itemList: [],

    };
    this.setQuantity = this.setQuantity.bind(this);
    this.addItemCart = this.addItemCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addQty = this.addQty.bind(this);
  }

  setQuantity(quantity, id) {
    this.setState((prev) => {
      const cartList = prev.cartList.map((item) => {
        if (item.id === id) item.quantity = quantity;
        return item;
      });
      return { cartList };
    });
  }

  addQty() {
    const { itemList } = this.state;
    const cartList = itemList.reduce((list, item) => {
      const includes = list.some(({ id }) => item.id === id);
      if (includes) return list;
      item.quantity = itemList.filter(({ id }) => id === item.id).length;
      return [...list, item];
    }, []);
    this.setState({ cartList });
  }

  removeItem(idItem) {
    this.setState((prev) => {
      const clearList = prev.itemList.filter(({ id }) => id !== idItem);
      return { itemList: clearList };
    }, () => this.addQty());
  }

  addItemCart(item) {
    this.setState((prevState) => ({ itemList: [...prevState.cartList, item] }),
      () => this.addQty());
  }

  render() {
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Main { ...props } addItemCart={ this.addItemCart } /> }
          />
          <Route
            path="/shopping-cart"
            render={ (
              props,
            ) => (<ShoppingCart
              { ...props }
              cartList={ cartList }
              removeItem={ this.removeItem }
              setQuantity={ this.setQuantity }
            />) }
          />
          <Route
            path="/details/:id/:category/:query"
            render={ (props) => (<ProductDetails
              { ...props }
              addItemCart={ this.addItemCart }
            />) }
          />
          <Route
            path="/checkout"
            render={ (props) => <Checkout { ...props } cartList={ cartList } /> }
          />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
