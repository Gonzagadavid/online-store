import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

class HeaderMain extends Component {
  render() {
    const { api, handlerInput, query } = this.props;
    return (
      <header>
        <label htmlFor="input-search">
          <input
            id="input-search"
            data-testid="query-input"
            value={ query }
            onChange={ handlerInput }
          />
        </label>
        <button data-testid="query-button" type="button" onClick={ api }>
          <BsSearch />
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          <RiShoppingCart2Line />
        </Link>
      </header>
    );
  }
}

HeaderMain.propTypes = {
  handlerInput: func.isRequired,
  api: func.isRequired,
  query: string.isRequired,
};

export default HeaderMain;
