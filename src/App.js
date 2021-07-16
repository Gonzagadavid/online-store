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
      cartQty: 0,
    };
    this.setQuantity = this.setQuantity.bind(this);
    this.addItemCart = this.addItemCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.setCartQty = this.setCartQty.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  setQuantity(quantity, id) {
    this.setState((prev) => {
      const cartList = prev.cartList.map((item) => {
        if (item.id === id) item.quantity = quantity;
        return item;
      });
      return { cartList };
    }, () => this.setCartQty());
  }

  setCartQty() {
    const { cartList } = this.state;
    const qty = cartList
      .map(({ quantity }) => quantity)
      .reduce((total, qtyItem) => total + qtyItem, 0);

    this.setState({ cartQty: qty }, () => this.saveLocalStorage());
  }

  getLocalStorage() {
    const stateStorageJson = localStorage.getItem('shopping_time') || '{}';
    const stateStorage = JSON.parse(stateStorageJson);
    this.setState({ ...stateStorage });
  }

  saveLocalStorage() {
    localStorage.setItem('shopping_time', JSON.stringify(this.state));
  }

  removeItem(idItem) {
    this.setState((prev) => {
      const clearList = prev.cartList.filter(({ id }) => id !== idItem);
      return { cartList: clearList };
    });
  }

  addItemCart(item) {
    const { id } = item;
    const { cartList } = this.state;
    const includes = cartList.find((itemCart) => itemCart.id === id);
    if (includes) return this.setQuantity(includes.quantity + 1, id);
    item.quantity = 1;
    this.setState((prevState) => ({ cartList: [...prevState.cartList, item] }),
      () => this.setCartQty());
  }

  render() {
    const { cartList, cartQty } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Main
              { ...props }
              addItemCart={ this.addItemCart }
              cartQty={ cartQty }
            />) }
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
            path="/details/:id/:category/:query/:freeShipping"
            render={ (props) => (<ProductDetails
              { ...props }
              addItemCart={ this.addItemCart }
              cartQty={ cartQty }
            />) }
          />
          <Route
            path="/checkout"
            render={ (
              props,
            ) => (<Checkout
              { ...props }
              cartList={ cartList }
              removeItem={ this.removeItem }
              setQuantity={ this.setQuantity }
            />) }
          />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
