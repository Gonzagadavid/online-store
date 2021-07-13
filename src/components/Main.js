import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './Main.css';
import Card from './Card';

class Main extends Component {
  constructor() {
    super();
    this.apiCategories = this.apiCategories.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.apiItems = this.apiItems.bind(this);
    this.state = {
      categoriesList: [],
      query: '',
      category: false,
      itemList: [],
    };
  }

  componentDidMount() {
    this.apiCategories();
  }

  handlerInput(event) {
    const { value } = event.target;
    this.setState({ query: value });
  }

  async apiItems() {
    const { query, category } = this.state;
    const items = await getProductsFromCategoryAndQuery(category, query);
    const { results } = items;
    this.setState({ itemList: results });
  }

  async apiCategories() {
    const categories = await getCategories();
    this.setState({ categoriesList: categories });
  }

  render() {
    const { categoriesList, query, itemList } = this.state;
    return (
      <div className="Main">
        <nav>
          <ul>
            {categoriesList.map((
              { id, name },
            ) => <li key={ id } id={ id } data-testid="category">{name}</li>)}
          </ul>
        </nav>
        <div className="Main-container">
          <header>
            <label htmlFor="input-search">
              <input
                id="input-search"
                data-testid="query-input"
                value={ query }
                onChange={ this.handlerInput }
              />
            </label>
            <button data-testid="query-button" type="button" onClick={ this.apiItems }>
              <BsSearch />
            </button>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <Link to="/shopping-cart" data-testid="shopping-cart-button">
              <RiShoppingCart2Line />
            </Link>
          </header>
          <main>
            {
              itemList.length
                ? itemList.map((
                  { title, price, thumbnail, id },
                ) => (<Card
                  title={ title }
                  key={ id }
                  imagePath={ thumbnail }
                  price={ price }
                />))
                : <p>Nenhum produto foi encontrado</p>
            }
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
