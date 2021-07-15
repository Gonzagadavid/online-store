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
      cartQty: 0,
    };
    this.setQuantity = this.setQuantity.bind(this);
    this.addItemCart = this.addItemCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addQty = this.addQty.bind(this);
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
      console.log(cartList);
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

  addQty() {
    const { itemList } = this.state;
    const cartList = itemList.reduce((list, itemCart) => {
      const includes = list.some(({ id }) => itemCart.id === id);
      if (includes) return list;
      const item = { ...itemCart };
      item.quantity = itemList.filter(({ id }) => id === item.id).length;
      return [...list, item];
    }, []);
    this.setState({ cartList }, () => this.setCartQty());
  }

  removeItem(idItem) {
    this.setState((prev) => {
      const clearList = prev.itemList.filter(({ id }) => id !== idItem);
      return { itemList: clearList };
    }, () => this.addQty());
  }

  addItemCart(item) {
    this.setState((prevState) => ({ itemList: [...prevState.itemList, item] }),
      () => this.addQty());
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
