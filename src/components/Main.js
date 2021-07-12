import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

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
      </div>
    );
  }
}

export default Main;
