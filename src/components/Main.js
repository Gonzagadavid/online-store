import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RiShoppingCart2Line } from 'react-icons/ri';
//
class Main extends Component {
  render() {
    return (
      <div>
        <label htmlFor="input-search">
          <BsSearch />
          <input id="input-search" />
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          <RiShoppingCart2Line />
        </Link>
      </div>
    );
  }
}

export default Main;
