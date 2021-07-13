import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { getCategories } from '../services/api';
import './Main.css';
//
class Main extends Component {
  constructor() {
    super();
    this.apiCategories = this.apiCategories.bind(this);
    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.apiCategories();
  }

  async apiCategories() {
    const categories = await getCategories();
    this.setState({ categoriesList: categories });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <div className="Main">
        <nav>
          <ul>
            {categoriesList.map((
              { id, name },
            ) => <li key={ id } id={ id } data-testid="category">{name}</li>)}
          </ul>
        </nav>
        <main>
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
        </main>
      </div>
    );
  }
}

export default Main;
